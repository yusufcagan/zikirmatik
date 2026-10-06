import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { clampCount, decrement, increment } from '../lib/counter';

export interface Zikir {
  id: number;
  name: string;
  count: number;
}

interface State {
  zikirs: Zikir[];
  nextId: number;
  /** Anasayfadaki, henüz kaydedilmemiş sayaç */
  draftCount: number;
  vibration: boolean;
}

type Action =
  | { type: 'hydrate'; state: State }
  | { type: 'draft/increment' }
  | { type: 'draft/decrement' }
  | { type: 'draft/reset' }
  | { type: 'draft/save'; name: string }
  | { type: 'zikir/increment'; id: number }
  | { type: 'zikir/decrement'; id: number }
  | { type: 'zikir/update'; id: number; name: string; count: number }
  | { type: 'zikir/remove'; id: number }
  | { type: 'vibration/toggle' };

const initialState: State = {
  zikirs: [],
  nextId: 1,
  draftCount: 0,
  vibration: true,
};

function mapZikir(
  zikirs: Zikir[],
  id: number,
  fn: (z: Zikir) => Zikir,
): Zikir[] {
  return zikirs.map(z => (z.id === id ? fn(z) : z));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'draft/increment':
      return { ...state, draftCount: increment(state.draftCount) };
    case 'draft/decrement':
      return { ...state, draftCount: decrement(state.draftCount) };
    case 'draft/reset':
      return { ...state, draftCount: 0 };
    case 'draft/save':
      return {
        ...state,
        zikirs: [
          ...state.zikirs,
          { id: state.nextId, name: action.name, count: state.draftCount },
        ],
        nextId: state.nextId + 1,
        draftCount: 0,
      };
    case 'zikir/increment':
      return {
        ...state,
        zikirs: mapZikir(state.zikirs, action.id, z => ({
          ...z,
          count: increment(z.count),
        })),
      };
    case 'zikir/decrement':
      return {
        ...state,
        zikirs: mapZikir(state.zikirs, action.id, z => ({
          ...z,
          count: decrement(z.count),
        })),
      };
    case 'zikir/update':
      return {
        ...state,
        zikirs: mapZikir(state.zikirs, action.id, z => ({
          ...z,
          name: action.name,
          count: clampCount(action.count),
        })),
      };
    case 'zikir/remove':
      return { ...state, zikirs: state.zikirs.filter(z => z.id !== action.id) };
    case 'vibration/toggle':
      return { ...state, vibration: !state.vibration };
  }
}

const STORAGE_KEY = 'zikirmatik/v1';
/** Eski React Native 0.64 uygulamasının redux-persist anahtarı */
const LEGACY_KEY = 'persist:root';

async function loadState(): Promise<State> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) return { ...initialState, ...JSON.parse(raw) };

  const legacy = await AsyncStorage.getItem(LEGACY_KEY);
  if (!legacy) return initialState;
  // redux-persist her üst seviye alanı ayrıca JSON.stringify eder.
  const outer = JSON.parse(legacy) as Record<string, string>;
  const field = (k: string) =>
    outer[k] !== undefined ? JSON.parse(outer[k]) : undefined;
  const oldZik: { key: number; name: string; zikcount: number }[] =
    field('zik') ?? [];
  const digits = ['n4', 'n3', 'n2', 'n1'].map(k => field(k) ?? 0).join('');
  return {
    zikirs: oldZik.map(z => ({
      id: z.key,
      name: z.name,
      count: clampCount(z.zikcount),
    })),
    nextId:
      field('keyid') ?? oldZik.reduce((max, z) => Math.max(max, z.key + 1), 1),
    draftCount: clampCount(parseInt(digits, 10)),
    vibration: field('vibBoolean') ?? true,
  };
}

interface ContextValue {
  state: State;
  loaded: boolean;
  dispatch: (action: Action) => void;
}

const ZikirContext = createContext<ContextValue | null>(null);

export function ZikirProvider({ children }: { children: ReactNode }) {
  const [{ state, loaded }, dispatchInner] = useReducer(
    (s: { state: State; loaded: boolean }, a: Action) => ({
      state: reducer(s.state, a),
      loaded: s.loaded || a.type === 'hydrate',
    }),
    { state: initialState, loaded: false },
  );

  useEffect(() => {
    loadState()
      .catch(() => initialState)
      .then(s => dispatchInner({ type: 'hydrate', state: s }));
  }, []);

  useEffect(() => {
    if (loaded)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, loaded]);

  return (
    <ZikirContext.Provider value={{ state, loaded, dispatch: dispatchInner }}>
      {children}
    </ZikirContext.Provider>
  );
}

export function useZikir() {
  const ctx = useContext(ZikirContext);
  if (!ctx) throw new Error('useZikir must be used inside ZikirProvider');
  return ctx;
}
