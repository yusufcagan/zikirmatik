import React from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import { resetNum, countNum } from '../redux/actions/action'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function zikirmatik({ save, vibBool }) {
    const n1 = useSelector(state => state.n1);
    const n2 = useSelector(state => state.n2);
    const n3 = useSelector(state => state.n3);
    const n4 = useSelector(state => state.n4);

    const vib = () => {
        if (vibBool == true) {
            Vibration.vibrate(100)
        }
    }

    const dispatch = useDispatch()
    return (

        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: height / 15 }}>
            <ImageBackground
                source={require('../../image/zikirmatik.png')}
                style={{ height: height / 2, width: width * 3 / 4, alignItems: 'center' }}>

                <View
                    style={styles.textwiev}>
                    <Text style={{ fontSize: 50, textAlign: 'center', fontFamily: 'digital-7' }}
                    >{n4} {n3} {n2} {n1}</Text>
                </View>

                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => dispatch(resetNum())}>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => {
                        dispatch(countNum())
                        vib();
                    }}
                >

                </TouchableOpacity>

            </ImageBackground>
            <TouchableOpacity
                style={styles.button3}
                onPress={save}>
                <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>KAYDET</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    button1: {
        backgroundColor: '#3F4C40',
        height: height / 6,
        width: height / 6,
        borderRadius: 70,
        marginTop: height / 50

    },
    button2: {
        backgroundColor: '#3F4C40',
        height: height / 25,
        width: height / 25,
        borderRadius: 45,
        marginLeft: width / 3,
        marginTop: height / 20
    },
    button3: {
        backgroundColor: '#6A886C',
        height: height / 18,
        width: width / 2,
        borderRadius: 20,
        marginTop: height / 20,
        justifyContent: 'center',

    },
    textwiev: {
        backgroundColor: 'grey',
        height: height / 12,
        width: width / 2,
        marginTop: height / 10,
        borderRadius: 20,
        justifyContent: 'center'
    },
});