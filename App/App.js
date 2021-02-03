import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

//Views
import Splash from './views/Splash';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Home from './views/Home';

const App = () => {

  return (
      <>
        <NavigationContainer>
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
        </NavigationContainer>
      </>
  );
};

const styles = StyleSheet.create({

});

export default App;
