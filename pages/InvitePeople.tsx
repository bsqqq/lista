import React, { useState, useContext } from 'react'
import { TextInput, Text, Button, StyleSheet, View } from 'react-native'
import ConvidadosContext from '../contexts/convidados'

export default function InvitePeople({ navigation }: any) {
    const [nome, setNome] = useState<string>("")
    function handleNome(value: string) {
        setNome(value)
    }
    const { setConvidadosContext } = useContext(ConvidadosContext)
    const date = new Date()
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Vai chamar quem?</Text>
                <TextInput style={styles.input} onChangeText={handleNome} />
                <Button title='Adicionar' onPress={() => {
                    setConvidadosContext({nome, id: date.getTime()})
                    navigation.navigate('Home')
                }} />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        paddingHorizontal: 40,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fff',
        marginTop: 40
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 30,
        color: "white"
    }
})
