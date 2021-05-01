import React, { useState } from 'react'
import { View, Vibration, Dimensions, StyleSheet, } from 'react-native'
import ZikirmatikCom from '../components/zikirmatik';
import SimpleModal from '../components/zModal';
import ButtonVib from '../components/vibButCom';
import MenuBut from '../components/menu';

const { width, height } = Dimensions.get('window');


function HomeScreen({ navigation }) {
    const [modal, setmodal] = useState(false)

    const exit = () => {
        setmodal(false)
    }
    const save = () => {
        setmodal(true)
    }

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
    const page = 'Anasayfa';
    return (
        <View style={{ flex: 1, backgroundColor: '#373737', width: width, height: height }}>
            <MenuBut page={page} navigation={navigation} />
            <ButtonVib vibButton={vibButton} />
            <ZikirmatikCom save={save} vibBool={vibBool} />
            <SimpleModal modal={modal} exit={exit} />
        </View >
    )
}

export default HomeScreen;