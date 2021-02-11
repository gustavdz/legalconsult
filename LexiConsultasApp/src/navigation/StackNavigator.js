import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from '../views/Splash';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';

const Stack = createStackNavigator();

const InitialStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor : '#e1e1e1'
                },
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >

            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />



        </Stack.Navigator>
    )
};

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
};


export { InitialStackNavigator, HomeStackNavigator };
