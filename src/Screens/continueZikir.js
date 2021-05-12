import React, { useState } from 'react'
import { View, Vibration, Dimensions, StyleSheet, ImageBackground, Image, TouchableOpacity, Text, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import MenuBut from '../components/menu';
import ButtonVib from '../components/vibButCom';
import EditModal from '../components/editModal';
import { editNum, editReset } from '../redux/actions/action'

const { width, height } = Dimensions.get('window');

function continueZikir({ navigation, route }) {
    const dispatch = useDispatch()

    const [vibBool, setvibBool] = useState(true);

    const vibButton = () => {
        Vibration.vibrate(300)
        if (vibBool == true) {
            setvibBool(false)
        }
        if (vibBool == false) {
            setvibBool(true)
        }
    }
    const vib = () => {
        if (vibBool == true) {
            Vibration.vibrate(100)
        }
    }

    const res = () => {
        setn1(0);
        setn2(0);
        setn3(0);
        setn4(0);
    }

    const conNum = () => {
        if (n1 == 9) {
            if (n2 == 9) {
                if (n3 == 9) {
                    if (n4 == 9) {
                        setn1(9)
                        setn2(9)
                        setn3(9)
                        setn4(9)
                        return n1, n2, n3, n4
                    }
                    setn4(n4 + 1)
                    setn3(0)
                    setn2(0)
                    setn1(0)
                    return n1, n2, n3, n4
                }
                setn3(n3 + 1)
                setn2(0)
                setn1(0)
                return n1, n2, n3
            }
            setn2(n2 + 1)
            setn1(0)
            return n1, n2
        }
        setn1(n1 + 1)
    }

    const [modal, setmodal] = useState(false)
    const exit = () => {
        setmodal(false)
    }
    const save = () => {
        setmodal(true)
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
                        dispatch(editReset(id))
                        res();
                    }
                }
            ]
        )
    }

    const { id } = route.params;
    const zikir = useSelector(state => state.zik)
    const conZikir = zikir.find(x => x.key === id)

    const [n1, setn1] = useState(Math.floor((conZikir.zikcount) % 10))
    const [n2, setn2] = useState(Math.floor((conZikir.zikcount / 10) % 10))
    const [n3, setn3] = useState(Math.floor((conZikir.zikcount / 100) % 10))
    const [n4, setn4] = useState(Math.floor((conZikir.zikcount / 1000) % 10))

    const page = conZikir.name;

    return (
        <View style={{ flex: 1, backgroundColor: '#373737', width: width, height: height }}>
            <MenuBut page={page} navigation={navigation} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View
                    style={{ marginTop: height / 16, alignSelf: 'center' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#306030', height: height / 18, width: height / 18, borderRadius: 50, }}
                        onPress={save}
                    >
                        <Image
                            source={require('../../image/edit.png')}
                            style={{ height: height / 27, width: width / 9, resizeMode: 'contain', marginTop: 5 }}
                        />
                    </TouchableOpacity>
                </View>
                <ButtonVib vibButton={vibButton} />
            </View>

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
                        onPress={Sure}
                    >

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => {
                            dispatch(editNum(id));
                            conNum();
                            vib();
                        }}
                    >

                    </TouchableOpacity>

                </ImageBackground>

            </View>
            <EditModal modal={modal} exit={exit} id={id} navigation={navigation} />
        </View>
    )
}

export default continueZikir;
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
    textwiev: {
        backgroundColor: 'grey',
        height: height / 12,
        width: width / 2,
        marginTop: height / 10,
        borderRadius: 20,
        justifyContent: 'center'
    },
});