import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import { InitialStackNavigator, HomeStackNavigator } from "./StackNavigator";
import Feather from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();

//Views
import Splash from '../views/Splash';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import Profile from "../views/Profile";

//sidebar
import Sidebar from "../components/SideBar";

const ProfiledrawerNavigator = () => {

    return (
        <>
                <Drawer.Navigator drawerContent={props => <Sidebar {...props}/> }>

                    <Drawer.Screen name="Home" component={InitialStackNavigator}
                                   options={{title: "Home", drawerIcon: ({tintColor}) => <Feather name="home" size={16} color={tintColor} />}
                                   }
                    />



                    <Drawer.Screen name="Profile" component={Profile}
                                   options={{title: "Profile", drawerIcon: ({tintColor}) => <Feather name="user" size={16} color={tintColor} />}
                                   }
                    />



                </Drawer.Navigator>
        </>
    );
};


export default ProfiledrawerNavigator;
