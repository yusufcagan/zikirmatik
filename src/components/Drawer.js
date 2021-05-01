import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import MyPlans from '../Screens/myplans';
import Zikirs from '../Screens/zikirs';
import Hatim from '../Screens/hatimCalculation';
import Settings from '../Screens/settings';
import { NavigationContainer } from '@react-navigation/native';

const drawer = createDrawerNavigator();

export default function Drawer() {
    return (
        <drawer.Navigator drawerType='slide'
            drawerStyle={{ backgroundColor: '#373737' }}
            drawerContentOptions={{
                activeTintColor: 'green',
                activeBackgroundColor: 'grey',
                labelStyle: { color: 'black', fontWeight: 'bold', fontSize: 15 }
            }}
            overlayColor='grey'>
            <drawer.Screen name="Anasayfa" component={HomeScreen} />
            <drawer.Screen name="Zikirlerim" component={Zikirs} />
            <drawer.Screen name="Planlarım" component={MyPlans} />
            <drawer.Screen name="Hatim Hesaplama" component={Hatim} />
            <drawer.Screen name="Ayarlar" component={Settings} />
        </drawer.Navigator >
    )
}