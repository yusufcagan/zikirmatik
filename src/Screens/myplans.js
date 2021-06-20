import React, { useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from '@react-navigation/native';
import MenuBut from '../components/menu';

const { width, height } = Dimensions.get('window');

function MyPlans({ navigation }) {
    const page = 'Planlarım'
    return (
        <View style={{ flex: 1, backgroundColor: '#5B6A69', width: width, height: height }}>
            <MenuBut page={page} navigation={navigation} />
        </View>
    )
}
export default MyPlans;