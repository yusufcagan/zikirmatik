import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import MenuBut from '../components/menu';
import { useSelector, useDispatch } from 'react-redux'
import { removeZikir } from '../redux/actions/action';
import { PublisherBanner } from 'react-native-admob'

const { width, height } = Dimensions.get('window');

function zikirs({ navigation }) {

    const zikir = useSelector(state => state.zik)
    const dispatch = useDispatch()

    const page = 'Zikirlerim';
    return (
        <View style={{ flex: 1, backgroundColor: '#5B6A69', width: width, height: height }}>
            <ScrollView>
                <MenuBut page={page} navigation={navigation} />
                {zikir.length === 0 ?
                    <Text
                        style={styles.text}>Daha Zikiriniz yok. Eklemek için
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Anasayfa')}>
                            <Text style={{ fontSize: height / 37, color: '#F95842', marginBottom: -height / 120 }}> buradan </Text>
                        </TouchableOpacity>Anasayfaya gidip bir zikir kaydediniz.</Text> :
                    zikir.map(item => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Zikir', {
                                id: item.key,
                            })}
                            style={styles.card} key={item.key}>
                            <Text style={{ fontSize: height / 30, marginLeft: 10 }}>{item.name}</Text>
                            <View
                                style={{ borderRadius: 15, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#BABFBA', borderRadius: 5, width: width / 6, marginRight: width / 10 }}>
                                    <Text style={{ fontSize: height / 30, textAlign: 'center' }}>{item.zikcount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => dispatch(removeZikir(item.key))}>
                                    <Image
                                        source={require('../../image/remove.png')}
                                        style={{ height: height / 20, width: width / 12, resizeMode: 'contain', marginRight: width / 28 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <View
                style={{ alignItems: 'center' }}>
                <PublisherBanner
                    adSize="banner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    testDevices={[PublisherBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                    onAppEvent={event => console.log(event.name, event.info)}
                />
            </View>

        </View >
    )
}
export default zikirs;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#4E5555',
        margin: 5,
        flexDirection: 'row',
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height / 17
    },
    text: {
        fontSize: height / 37,
        marginLeft: 10,
        marginTop: 20
    }

})