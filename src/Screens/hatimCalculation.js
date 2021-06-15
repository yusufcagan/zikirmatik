import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { DrawerActions } from '@react-navigation/native';
import MenuBut from '../components/menu';
import SelectPicker from '../components/SelectPicker';

const { width, height } = Dimensions.get('window');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
function hatim({ navigation }) {
    const page = 'Hatim Hesaplama';
    const [num, setnum] = useState('')
    const [hatim, sethatim] = useState(0)
    const [bool, setBool] = useState(false)

    // console.log('hatim: ' + hatim + '/ typeof: ' + typeof (hatim))

    function ayetelFirst() {
        var result1 = Math.floor(313 / num)
        return result1
    }

    function ayetelSecond() {
        var _result1 = ayetelFirst()
        var result2 = (_result1 * num)
        return result2
    }

    function yasinFirst() {
        var result1 = Math.floor(41 / num)
        return result1
    }

    function yasinSecond() {
        var _result1 = yasinFirst()
        var result2 = (_result1 * num)
        return result2
    }

    function ihlasFirst() {
        var result1 = Math.floor(100 / num)
        return result1
    }

    function ihlasSecond() {
        var _result1 = ihlasFirst()
        var result2 = (_result1 * num)
        return result2
    }

    const renderSwitchCase = (value) => {
        switch (value) {
            case '1':
                if (313 - ayetelSecond() > num - (313 - ayetelSecond())) {
                    return <Text style={styles.textstyle}>{num - (313 - ayetelSecond())} kişi {ayetelFirst()}, geriye kalanlar {ayetelFirst() + 1} okuyacak.</Text>
                }
                else {
                    return <Text style={styles.textstyle}> {313 - ayetelSecond()} kişi {ayetelFirst() + 1}, geriye kalanlar {ayetelFirst()} okuyacak. </Text>
                }

            case '2':
                if (41 - yasinSecond() > num - (41 - yasinSecond())) {
                    return <Text style={styles.textstyle}>{num - (41 - yasinSecond())} kişi {yasinFirst()}, geriye kalanlar {yasinFirst() + 1} okuyacak.</Text>
                }
                else {
                    return <Text style={styles.textstyle}> {41 - yasinSecond()} kişi {yasinFirst() + 1}, geriye kalanlar {yasinFirst()} okuyacak. </Text>
                }


            case '3':
                if (num > 34) {
                    return <Text style={styles.textstyle}>Herkes 3'er okuyacak</Text>
                }
                if ((100 % num) === 0) {
                    return <Text style={styles.textstyle}>Herkes {100 / num} okuyacak.</Text>
                }
                else {
                    if (100 - ihlasSecond() > num - (100 - ihlasSecond())) {
                        return <Text style={styles.textstyle}>{num - (100 - ihlasSecond())} kişi {ihlasFirst()}, geriye kalanlar {ihlasFirst() + 1} okuyacak.</Text>
                    }
                    else {
                        return <Text style={styles.textstyle}> {100 - ihlasSecond()} kişi {ihlasFirst() + 1}, geriyekalanlar {ihlasFirst()} okuyacak. </Text>
                    }

                }

        }
    }

    return (

        <View style={{ flex: 1, backgroundColor: '#373737', width: width, height: height }}>
            <MenuBut page={page} navigation={navigation} />
            <Text style={{ fontSize: 17, marginLeft: width / 20 }}></Text>
            <SelectPicker val={value => sethatim(value)} />

            <View
                style={styles.textwiev}>
                <TextInput
                    placeholder='Kaç kişi olduğunu yazınız'
                    keyboardType='numeric'
                    style={{ marginLeft: 10 }}
                    value={String(num)}
                    onChangeText={(val) => setnum(val)}>

                </TextInput>
            </View>

            <TouchableOpacity
                style={styles.button3}
                onPress={() => setBool(true)}>
                <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Hesapla</Text>
            </TouchableOpacity>
            <View
                style={styles.textwiev2}>

                {bool === true ? renderSwitchCase(hatim) : null}

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    textwiev: {
        backgroundColor: 'grey',
        height: height / 12,
        width: width * 3 / 7,
        marginTop: height / 20,
        borderRadius: 20,
        justifyContent: 'center'
    },
    textwiev2: {
        backgroundColor: 'grey',
        height: height / 7,
        width: width * 7 / 8,
        marginTop: height / 15,
        borderRadius: 20,
        justifyContent: 'center'
    },
    button3: {
        backgroundColor: '#6A886C',
        height: height / 18,
        width: width / 2,
        borderRadius: 20,
        marginTop: height / 20,
        justifyContent: 'center',

    },
    textstyle: {
        fontSize: 18,
        marginLeft: 8
    },
})
export default hatim;