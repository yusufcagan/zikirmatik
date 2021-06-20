import React from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, Vibration, Alert, Image } from 'react-native'
import { resetNum, countNum, undo } from '../redux/actions/action'
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

    const Sure = () => {
        Alert.alert(
            "Uyarı",
            "Sayacı sıfırlamak istediğinizden emin misiniz ?",
            [
                {
                    text: "Hayır",
                    //onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Evet Sıfırla",
                    onPress: () => {
                        Alert.alert("Sayaç Sıfırlandı")
                        dispatch(resetNum())
                    }
                }
            ]
        )
    }

    const dispatch = useDispatch()
    return (

        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: height / 15 }}>
            <ImageBackground
                source={require('../../image/zikirmatik2.png')}
                style={{ height: height / 2, width: width * 3 / 4, alignItems: 'center' }}>

                <View
                    style={styles.textwiev}>
                    <Text style={{ fontSize: height / 16, textAlign: 'center', fontFamily: 'digital-7' }}
                    >{n4} {n3} {n2} {n1}</Text>
                </View>

                <View
                    style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => dispatch(undo())}>
                        <Image
                            source={require('../../image/undo.png')}
                            style={{ height: height / 25, width: width / 19, resizeMode: 'contain', marginLeft: width / 70 }} />
                        {/* <Text
                            style={{ fontSize: 40, textAlign: 'center', marginTop: -height / 60 }}>-</Text> */}

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonRemove}
                        onPress={Sure}>

                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    style={styles.buttonC}
                    onPress={() => {
                        dispatch(countNum())
                        vib();
                    }}
                >

                </TouchableOpacity>

            </ImageBackground>
            <TouchableOpacity
                style={styles.buttonSave}
                onPress={save}>
                <Text style={{ fontSize: height / 32, textAlign: 'center', fontWeight: 'bold' }}>KAYDET</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    buttonC: {
        backgroundColor: '#373737',
        height: height / 6,
        width: height / 6,
        borderRadius: 70,
        marginTop: height / 50

    },
    buttonRemove: {
        backgroundColor: '#773636',
        height: height / 25,
        width: height / 25,
        borderRadius: 45,
        marginLeft: width / 3,
        marginTop: height / 20
    },
    buttonSave: {
        backgroundColor: '#4B4A4A',
        height: height / 18,
        width: width / 2,
        borderRadius: 20,
        marginTop: height / 20,
        justifyContent: 'center',

    },
    buttonBack: {
        backgroundColor: '#98ABA9',
        height: height / 25,
        width: height / 25,
        borderRadius: 45,
        marginLeft: width / 50,
        marginTop: height / 20,
    },
    textwiev: {
        backgroundColor: '#AAAAAA',
        height: height / 12,
        width: width / 2,
        marginTop: height / 10,
        borderRadius: 20,
        justifyContent: 'center'
    },
});