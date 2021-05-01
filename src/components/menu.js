import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { DrawerActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function menu({ navigation, page }) {
    return (
        <View style={{ flexDirection: 'row', height: height / 16, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image
                    source={require('../../image/menu.png')}
                    style={{ height: height / 20, width: width / 8, resizeMode: 'contain', }}
                />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, marginLeft: width / 8, fontWeight: 'bold' }}>{page}</Text>
        </View>
    )
}
