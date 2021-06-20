import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import MyPlans from '../Screens/myplans';
import Zikirs from '../Screens/zikirs';
import Hatim from '../Screens/hatimCalculation';
import Settings from '../Screens/settings';
import ContinueZikir from '../Screens/continueZikir'
import { createStackNavigator } from '@react-navigation/stack';

const drawer = createDrawerNavigator();
const stack = createStackNavigator();



function myStack() {

    return (
        <stack.Navigator
            screenOptions={{ headerShown: false }}>
            <stack.Screen name="Zikirlerim" component={Zikirs} />
            <stack.Screen name="Zikir" component={ContinueZikir} />
        </stack.Navigator>
    )
}

export default function Drawer() {

    return (
        <drawer.Navigator drawerType='slide'
            drawerStyle={{ backgroundColor: '#5B6A69' }}
            drawerContentOptions={{
                activeTintColor: 'green',
                activeBackgroundColor: 'grey',
                labelStyle: { color: 'black', fontWeight: 'bold', fontSize: 15 }
            }}
            overlayColor='grey'>
            <drawer.Screen name="Anasayfa" component={HomeScreen} />
            <drawer.Screen name="Zikirlerim" component={myStack} />
            {/* <drawer.Screen name="Planlarım" component={MyPlans} /> */}
            <drawer.Screen name="Hatim Hesaplama" component={Hatim} />
            {/* <drawer.Screen name="Ayarlar" component={Settings} /> */}
        </drawer.Navigator >
    )
}