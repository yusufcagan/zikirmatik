import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './src/components/Drawer'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import reducerStore from './src/redux/store/store'

const { store, persistor } = reducerStore();

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}