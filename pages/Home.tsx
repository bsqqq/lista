import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import Botao from '../components/delete_button'
import { useState, useContext, useEffect, useCallback } from 'react';
import ConvidadosContext, { convidado } from '../contexts/convidados';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



export default function Home({ navigation }: any) {
    const { convidados, deletarConvidadoContext } = useContext(ConvidadosContext)
    const [invited, setInvited] = useState<convidado[] | undefined>(convidados)

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                async function rerender() {
                    const storageItems: string | null = await AsyncStorage.getItem('@lista-de-convidados')
                    // console.log('storageItems:', JSON.parse(String(storageItems)))
                    setInvited(JSON.parse(String(storageItems)))
                    // console.log('focus')
                    return true
                }
                rerender()
            }, 100)
        }, [invited])
    )

    const alert = (item: convidado) => Alert.alert(
        "Atencao",
        `Tem certeza que gostaria de apagar ${item.nome} da lista?`,
        [
            {
                text: "Sim",
                onPress: () => {
                    deletarConvidadoContext(item.id)
                    return false
                },
                style: "cancel"
            },
            {
                text: "Nao",
                onPress: () => false
            }
        ]
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu Aniversario</Text>
            <StatusBar style='light' />
            <Button title='+' onPress={() => navigation.navigate('AddInvited')} />
            {
                invited?.length ?
                    <FlatList
                        data={invited}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <View style={styles.block}>
                                    <Text style={{ color: '#fff' }}>{item.nome}</Text>
                                </View>
                                <Botao texto='-' onPress={() => alert(item)} />
                            </View>
                        )}
                        extraData={invited}
                    /> : <View>
                        <Text
                            style={{
                                color: '#777',
                                fontSize: 20,
                                marginTop: 20,
                                alignSelf: 'center'
                            }}>
                            A lista esta vazia...
                        </Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fff',
        marginTop: 40,
        marginBottom: 10
    },
    block: {
        backgroundColor: '#444',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: 300,
        marginTop: 20,
    }
});
