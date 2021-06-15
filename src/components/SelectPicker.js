import React, { useState } from 'react'
import { View, Text, Dimensions, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

export default function SelectPicker({ val }) {
    const [selectedLanguage, setSelectedLanguage] = useState('Hatim seçiniz');

    const passData = (value) => {
        val(value)
    }
    return (
        <Picker
            selectedValue={selectedLanguage}
            onValueChange={passData}
        >
            <Picker.Item label="Hatim Seçiniz" value="0" />
            <Picker.Item label="Ayetel Kürsi" value='1' />
            <Picker.Item label="Yasin" value="2" />
            <Picker.Item label="İhlas" value="3" />
            <Picker.Item label="Salavat" value="4" />
        </Picker>
    )
}
