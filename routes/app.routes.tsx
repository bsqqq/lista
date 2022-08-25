import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home'
import InvitePeople from '../pages/InvitePeople';

const Stack = createNativeStackNavigator()

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name='Home' component={Home} options={{
                    headerStyle: {
                        backgroundColor: "#333",
                    },
                    headerBackground: () => <></>,
                    headerTintColor: '#333'
                }} />
                <Stack.Screen name='AddInvited' component={InvitePeople} options={{
                    headerStyle: {
                        backgroundColor: "#333",
                    },
                    headerBackground: () => <></>,
                    headerTintColor: '#333'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}