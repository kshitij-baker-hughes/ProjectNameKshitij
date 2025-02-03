import React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from "react-native";
import style from './style';
import { func } from 'prop-types';

const MyText = ({name}) => {

    function handleClick() {
        alert("You just pressed the text component");
    }

    return <Text  style={styles.text_color} onPress={handleClick}>Hello {name}</Text>

};




const styles = StyleSheet.create({
    text_color:{
        color:'red'
    },
    text_font_size:{
        fontSize:4
    }
})
export default MyText;