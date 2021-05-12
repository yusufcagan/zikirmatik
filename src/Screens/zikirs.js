import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MenuBut from '../components/menu';
import { useSelector, useDispatch } from 'react-redux'
import { removeZikir } from '../redux/actions/action';

const { width, height } = Dimensions.get('window');

function zikirs({ navigation }) {

    const zikir = useSelector(state => state.zik)
    const dispatch = useDispatch()

    const page = 'Zikirlerim';
    return (
        <View style={{ flex: 1, backgroundColor: '#373737', width: width, height: height }}>
            <MenuBut page={page} navigation={navigation} />
            {zikir.map(item => (
                <View style={style.card} key={item.key}>
                    <Text style={{ fontSize: 25, marginLeft: 10 }}>{item.name}</Text>
                    <View
                        style={{ borderRadius: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#BABFBA', borderRadius: 5, width: width / 7, marginRight: width / 15 }}>
                            <Text style={{ fontSize: 25, textAlign: 'center' }}>{item.zikcount}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Zikir', {
                                id: item.key,
                            })}>
                            <Image
                                source={require('../../image/continue.png')}
                                style={{ height: height / 26, width: width / 15, resizeMode: 'contain', marginRight: width / 30 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => dispatch(removeZikir(item.key))}>
                            <Image
                                source={require('../../image/trash.png')}
                                style={{ height: height / 26, width: width / 15, resizeMode: 'contain', marginRight: width / 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ))
            }

        </View >
    )
}
export default zikirs;

const style = StyleSheet.create({
    card: {
        backgroundColor: '#899689',
        margin: 5,
        flexDirection: 'row',
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height / 17
    },

})