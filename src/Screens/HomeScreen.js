import React, { useState } from 'react'
import { View, Vibration, Dimensions, StyleSheet, ScrollView, } from 'react-native'
import ZikirmatikCom from '../components/zikirmatik';
import SimpleModal from '../components/zModal';
import ButtonVib from '../components/vibButCom';
import MenuBut from '../components/menu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { turnBool } from '../redux/actions/action'
import { PublisherBanner } from 'react-native-admob'

const { width, height } = Dimensions.get('window');


function HomeScreen({ navigation }) {
    const dispatch = useDispatch()

    const [modal, setmodal] = useState(false)

    const exit = () => {
        setmodal(false)
    }
    const save = () => {
        setmodal(true)
    }

    const a = useSelector(state => state.vibBoolean)
    const [vibBool, setvibBool] = useState(a);
    const vibButton = () => {
        Vibration.vibrate(400)
        if (vibBool == true) {
            setvibBool(false)
            dispatch(turnBool())
        }
        if (vibBool == false) {
            setvibBool(true)
            dispatch(turnBool())
        }
    }
    const page = 'Anasayfa';
    return (
        <View style={{ flex: 1, backgroundColor: '#5B6A69', width: width, height: height }}>
            <ScrollView>
                <MenuBut page={page} navigation={navigation} />
                <ButtonVib vibButton={vibButton} vibBool={vibBool} />
                <ZikirmatikCom save={save} vibBool={vibBool} />
                <SimpleModal modal={modal} exit={exit} />
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

export default HomeScreen;