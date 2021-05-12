import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native'
import { addkey, addZikir, editName, resetNum } from '../redux/actions/action';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function editModal({ modal, exit, id, navigation }) {

    const dispatch = useDispatch()
    const [name, setname] = useState()
    const [number, setnumber] = useState()



    return (
        <Modal
            transparent={true}
            visible={modal}>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <View style={styles.modal}>
                    <TouchableOpacity
                        style={styles.ex}
                        onPress={exit}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>X</Text>
                    </TouchableOpacity>
                    <View style={styles.textinput}>
                        <TextInput
                            style={{ marginLeft: width / 40 }}
                            placeholder="Zikir Adını Düzenleyiniz"
                            value={name}
                            onChangeText={(val) => setname(val)}
                        ></TextInput>
                    </View>
                    <View style={styles.textinput}>
                        <TextInput
                            style={{ marginLeft: width / 40 }}
                            placeholder="Zikir Sayısını Düzenleyiniz"
                            value={number}
                            onChangeText={(val) => setnumber(val)}
                        ></TextInput>
                    </View>
                    <TouchableOpacity
                        style={styles.button3}
                        onPress={() => {
                            dispatch(editName(id, name, number))
                            setname('');
                            exit();
                            navigation.navigate('Zikirlerim');

                        }}
                    >

                        <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Ekle</Text>
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
        backgroundColor: 'red',
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
        backgroundColor: '#545E54',
        borderRadius: 25,
        alignItems: 'center'
    },
    button3: {
        backgroundColor: '#6A886C',
        height: height / 18,
        width: width / 2,
        borderRadius: 20,
        marginTop: height / 20,
        justifyContent: 'center',

    },
});