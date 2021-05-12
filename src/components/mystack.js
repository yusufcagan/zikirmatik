import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ContinueZikir from '../Screens/continueZikir'

const Stack = createStackNavigator();
export default function mystack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Zikir" component={ContinueZikir} />
        </Stack.Navigator>
    )
}
