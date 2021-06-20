import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert } from 'react-native'
import { addkey, addZikir, editName, resetNum } from '../redux/actions/action';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function editModal({ modal, exit, id, navigation, zikNumber, exName }) {

    const dispatch = useDispatch()
    const [name, setname] = useState(exName)
    const [number, setnumber] = useState(String(zikNumber))


    const editSave = () => {
        if (!name) {
            Alert.alert(
                "Uyarı",
                "Lütfen bir zikir ismi yazınız.",
                [
                    {
                        text: "Tamam",
                        //onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },

                ]
            )
        }
        else {
            dispatch(editName(id, name, parseInt(number)))
            setname('');
            setnumber('')
            exit();
            navigation.navigate('Zikirlerim');
        }
    }

    return (
        <Modal
            transparent={true}
            visible={modal}>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <View style={styles.modal}>
                    <TouchableOpacity
                        style={styles.ex}
                        onPress={exit}>
                        <Image
                            source={require('../../image/remove.png')}
                            style={{ height: height / 25, width: width / 14, resizeMode: 'contain', marginLeft: 5 }} />
                    </TouchableOpacity>
                    <View style={styles.textinput}>
                        <TextInput
                            style={{ marginLeft: width / 40, fontSize: height / 55 }}
                            //placeholder="Zikir Adını Düzenleyiniz"
                            value={name}

                            onChangeText={(val) => setname(val)}
                        ></TextInput>
                    </View>
                    <View style={styles.textinput}>
                        <TextInput
                            style={{ marginLeft: width / 40, fontSize: height / 55 }}
                            //placeholder="Zikir Sayısını Düzenleyiniz"
                            keyboardType='numeric'
                            value={number}

                            onChangeText={(val) => setnumber(val)}
                        ></TextInput>
                    </View>
                    <TouchableOpacity
                        style={styles.button3}
                        onPress={editSave}
                    >

                        <Text style={{ fontSize: height / 32, textAlign: 'center', fontWeight: 'bold' }}>Düzenle</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal >
    )
}

const styles = StyleSheet.create({

    textinput: {
        backgroundColor: 'grey',
        height: height / 20,
        width: width / 2,
        marginTop: height / 15,
        borderRadius: 15,
        justifyContent: 'center',

    },
    ex: {
        height: height / 25,
        width: height / 25,
        borderRadius: 80,
        marginLeft: width * 4 / 5,
        marginTop: width / 80,
        marginRight: width / 9,
    },
    modal: {
        width: width * 12 / 15,
        height: height * 5 / 12,
        backgroundColor: '#4E5555',
        borderRadius: 25,
        alignItems: 'center'
    },
    button3: {
        backgroundColor: '#4B4A4A',
        height: height / 18,
        width: width / 2,
        borderRadius: 20,
        marginTop: height / 20,
        justifyContent: 'center',

    },
});