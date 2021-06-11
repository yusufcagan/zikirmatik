import React, { useState } from 'react'
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
    const [num, setnum] = useState()
    const [hatim, sethatim] = useState(0)
    const [first, setfirst] = useState(0)
    const [second, setsecond] = useState(0)
    const [result1, setresult1] = useState(0)
    const [result2, setresult2] = useState(0)

    const process = (value) => {

        switch (value) {
            case "1":
                setresult1(Math.floor(313 / num))
                setresult2(313 - (result1 * num))
                setfirst(result1)
                setsecond(result2)
                setresult1(0)
                setresult2(0)
                break;

            case "yasin":
                break;

            case "ihlas":
                break;

            case "salavat":
                break;
        }
        console.log(result1)
    }

    return (
        <DismissKeyboard>
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
                        value={num}
                        onChangeText={(val) => setnum(val)}>

                    </TextInput>
                </View>

                <TouchableOpacity
                    style={styles.button3}
                    onPress={() => process(hatim)}>
                    <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Hesapla</Text>
                </TouchableOpacity>
                <View
                    style={styles.textwiev2}>
                    <Text> {second} kişi {first + 1}, {num - second} kişi {first} okuyacak. </Text>
                </View>
            </View>
        </DismissKeyboard >
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
})
export default hatim;