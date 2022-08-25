import React from 'react'
import { ConvidadosProvider } from './convidados'

export const Providers: React.FC = ({ children }: any) => {
    return (
        <ConvidadosProvider>
            {children}
        </ConvidadosProvider>
    )
}