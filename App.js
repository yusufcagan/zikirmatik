import React from 'react'
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import Drawer from './src/components/Drawer'
import { createStore } from 'redux';
import { reducer } from './src/redux/reducers'
import { Provider } from 'react-redux';



const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </Provider>
  )
}