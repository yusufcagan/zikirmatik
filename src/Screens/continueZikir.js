import React, { useState } from 'react'
import { View, Vibration, Dimensions, StyleSheet, ImageBackground, Image, TouchableOpacity, Text, Alert, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import MenuBut from '../components/menu';
import ButtonVib from '../components/vibButCom';
import EditModal from '../components/editModal';
import { editNum, editReset, editUndoNum, turnBool } from '../redux/actions/action'
import { set } from 'react-native-reanimated';
import { PublisherBanner } from 'react-native-admob'

const { width, height } = Dimensions.get('window');

function continueZikir({ navigation, route }) {
    const dispatch = useDispatch()

    const a = useSelector(state => state.vibBoolean)
    const [vibBool, setvibBool] = useState(a);

    const vibButton = () => {
        Vibration.vibrate(300)
        if (vibBool == true) {
            setvibBool(false)
            dispatch(turnBool())
        }
        if (vibBool == false) {
            setvibBool(true)
            dispatch(turnBool())
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

    const undoNum = () => {
        if (n1 == 0) {
            if (n2 == 0) {
                if (n3 == 0) {
                    if (n4 == 0) {
                        setn1(0)
                        setn2(0)
                        setn3(0)
                        setn4(0)
                    }
                    else {
                        setn1(9)
                        setn2(9)
                        setn3(9)
                        setn4(n4 - 1)
                    }
                }
                else {
                    setn1(9)
                    setn2(9)
                    setn3(n3 - 1)
                }
            }
            else {
                setn1(9)
                setn2(n2 - 1)
            }
        }
        else {
            setn1(n1 - 1)
        }
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
    const zikNumber = parseInt(String(n4) + String(n3) + String(n2) + String(n1))

    const page = conZikir.name;

    return (
        <View style={{ flex: 1, backgroundColor: '#5B6A69', width: width, height: height }}>
            <ScrollView>
                <MenuBut page={page} navigation={navigation} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View
                        style={{ marginTop: height / 16, alignSelf: 'center' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#4B4A4A', height: height / 18, width: height / 18, borderRadius: 50, }}
                            onPress={save}
                        >
                            <Image
                                source={require('../../image/edit.png')}
                                style={{ height: height / 27, width: width / 9, resizeMode: 'contain', marginTop: height / 120 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <ButtonVib vibButton={vibButton} vibBool={vibBool} />
                </View>

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
                                onPress={() => {
                                    dispatch(editUndoNum(id));
                                    undoNum()
                                }}>
                                <Image
                                    source={require('../../image/undo.png')}
                                    style={{ height: height / 25, width: width / 19, resizeMode: 'contain', marginLeft: width / 75 }} />

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.buttonRemove}
                                onPress={Sure}>

                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity
                            style={styles.buttonC}
                            onPress={() => {
                                dispatch(editNum(id));
                                conNum();
                                vib();
                            }}
                        >

                        </TouchableOpacity>

                    </ImageBackground>

                </View>
                <EditModal modal={modal} exit={exit} id={id} navigation={navigation} zikNumber={zikNumber} exName={page} />
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

        </View>
    )
}

export default continueZikir;
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