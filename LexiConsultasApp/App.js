import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {InitialStackNavigator} from './src/navigation/StackNavigator';
import ProfiledrawerNavigator from './src/navigation/DrawerNavigator';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Views
import Splash from './src/views/Splash';
import SignIn from './src/views/SignIn';
import SignUp from './src/views/SignUp';
import Home from './src/views/Home';

//sidebar
import Sidebar from "./src/components/SideBar";

const App = () => {

  return (
      <>
        <NavigationContainer>

            <ProfiledrawerNavigator/>
        </NavigationContainer>
      </>
  );
};


export default App;
