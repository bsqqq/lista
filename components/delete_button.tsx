import React from 'react'
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
    texto: string
}

export default function Button({ texto, ...resto }: ButtonProps) {
    return(
        <TouchableOpacity style={style.button} {...resto}>
            <Text style={style.buttonText}>
                { texto }
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        justifyContent: 'center',
        width: 30,
        height:58,
        marginTop: 20
    },
    buttonText: {
        color: "white",
        fontSize: 25,
        paddingHorizontal: 10
    }
})