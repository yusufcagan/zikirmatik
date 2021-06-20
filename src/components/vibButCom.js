import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export default function vibButCom({ vibButton, vibBool }) {
    return (
        <View
            style={{ marginTop: height / 16, alignSelf: 'center', marginLeft: width * 2 / 3 }}>
            <TouchableOpacity
                style={{ backgroundColor: '#4B4A4A', height: height / 18, width: height / 18, borderRadius: 50 }}
                onPress={vibButton}>
                {vibBool === true ? <Image

                    source={require('../../image/vibrate_on.png')}
                    style={{ height: height / 24, width: width / 9, resizeMode: 'contain', marginTop: height / 120 }} />
                    : <Image

                        source={require('../../image/vibrate_off.png')}
                        style={{ height: height / 24, width: width / 9, resizeMode: 'contain', marginTop: height / 120 }} />}

            </TouchableOpacity>
        </View>
    )
}
