import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export default function vibButCom({ vibButton }) {
    return (
        <View
            style={{ marginTop: height / 16, alignSelf: 'center', marginLeft: width * 2 / 3 }}>
            <TouchableOpacity
                style={{ backgroundColor: '#306030', height: height / 18, width: height / 18, borderRadius: 50 }}
                onPress={vibButton}>
                <Image
                    source={require('../../image/vibimage.png')}
                    style={{ height: height / 24, width: width / 9, resizeMode: 'contain', marginTop: 5 }}
                />
            </TouchableOpacity>
        </View>
    )
}
