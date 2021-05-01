import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from '@react-navigation/native';
import MenuBut from '../components/menu';

const { width, height } = Dimensions.get('window');

function settings({ navigation }) {
    const page = 'Ayarlar'
    return (
        <View style={{ flex: 1, backgroundColor: '#373737', width: width, height: height }}>
            <MenuBut page={page} navigation={navigation} />
            <Text></Text>
        </View>
    )
}
export default settings;