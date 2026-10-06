import { Ionicons } from '@expo/vector-icons';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { DrawerParamList, ZikirStackParamList } from '../navigation/types';
import { useZikir, Zikir } from '../store/ZikirContext';
import { colors } from '../theme';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ZikirStackParamList, 'ZikirList'>,
  DrawerScreenProps<DrawerParamList>
>;

function confirmRemove(zikir: Zikir, onRemove: () => void) {
  Alert.alert('Uyarı', `"${zikir.name}" silinsin mi?`, [
    { text: 'Vazgeç', style: 'cancel' },
    { text: 'Sil', style: 'destructive', onPress: onRemove },
  ]);
}

export default function ZikirListScreen({ navigation }: Props) {
  const { state, dispatch } = useZikir();

  if (state.zikirs.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Henüz zikriniz yok.</Text>
        <Text style={styles.emptyText}>
          Eklemek için{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Home')}>
            Anasayfa
          </Text>
          'ya gidip bir zikir kaydediniz.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={state.zikirs}
      keyExtractor={z => String(z.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() => navigation.navigate('ZikirDetail', { id: item.id })}
        >
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.count}>{item.count}</Text>
          </View>
          <Pressable
            onPress={() =>
              confirmRemove(item, () =>
                dispatch({ type: 'zikir/remove', id: item.id }),
              )
            }
            hitSlop={10}
            accessibilityLabel="Sil"
          >
            <Ionicons name="trash-outline" size={22} color={colors.accent} />
          </Pressable>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12, gap: 8 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  pressed: { opacity: 0.8 },
  name: { flex: 1, color: colors.text, fontSize: 18, fontWeight: '600' },
  badge: {
    backgroundColor: colors.muted,
    borderRadius: 8,
    minWidth: 64,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  count: {
    color: colors.textDark,
    fontSize: 18,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  empty: { padding: 24, gap: 8 },
  emptyText: { color: colors.text, fontSize: 17, lineHeight: 24 },
  link: { color: colors.accent, fontWeight: '700' },
});
