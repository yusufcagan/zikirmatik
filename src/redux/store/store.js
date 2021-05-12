import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from '../reducers/index'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return { store, persistor };
}