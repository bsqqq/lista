import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type convidado = {
    nome: string,
    id: number
}

interface convidadosProps {
    convidados: convidado[] | undefined
    setConvidadosContext(convidado: convidado): void
    deletarConvidadoContext(index: number | undefined): void
}

const ConvidadosContext = createContext<convidadosProps>({} as convidadosProps)
export default ConvidadosContext

export const ConvidadosProvider: React.FC = ({ children }: any) => {
    const [convidados, setConvidados] = useState<convidado[]>([])

    async function setConvidadosContext(convidado: convidado) {
        const arrayAux: convidado[] = convidados
        arrayAux.push(convidado)
        // await AsyncStorage.clear()
        await AsyncStorage.setItem('@lista-de-convidados', JSON.stringify(arrayAux))
        setConvidados(arrayAux)
    }

    async function deletarConvidadoContext(index: number) {
        const arrayAux: convidado[] = JSON.parse(await AsyncStorage.getItem('@lista-de-convidados')) // pegando a lista de convidados atualmente
        // console.log(arrayAux)
        // console.log(index)
        const itemEncontrado = arrayAux.find(item => item.id === index) // encontrando quem eu quero deletar

        const getItemAS = await AsyncStorage.getItem('@lista-de-convidados') // busco pelo armazenamento local da lista de convidados
        const lista: convidado[] = JSON.parse(String(getItemAS)) // transformo a lista da linha anterior num array 
        lista.splice(arrayAux?.indexOf(itemEncontrado), 1) // pego esse array e tiro o item que eu quero
        await AsyncStorage.setItem('@lista-de-convidados', JSON.stringify(lista)) // setto novamente o armazenamento local com a nova lista atualizada

        setConvidados(lista) // setto na aplicacao a nova lista
        return
    }

    return (
        <ConvidadosContext.Provider value={{ convidados, setConvidadosContext, deletarConvidadoContext }}>
            {children}
        </ConvidadosContext.Provider>
    )
}