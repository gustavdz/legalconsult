import React from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
const Splash = () => {

    //react navigation
    const navigation = useNavigation();

    const validaInicioSesion = async () => {
        let token = await AsyncStorage.getItem('token');

        if(!token){
            console.log("no tiene token");
            navigation.navigate('SignIn');
        } else {
            navigation.navigate('Home');
        }


    };

   return (
       <View style={styles.container}>
           <LinearGradient colors={['#272b4f', '#003973']} style={styles.container}>
           <StatusBar barStyle="light-content" />
           <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode={"stretch"}
                />
           </View>
           <Animatable.View
               animation="fadeInUpBig"
               duration={1000}
               style={styles.footer}>
                <Text style={styles.title}>Desarrollo y Soluciones Web!</Text>
               <Text style={styles.text}>Ingresa con tu cuenta</Text>

               {/*Buttons Container */}
               <View style={styles.button}>
                    <TouchableOpacity onPress={() => validaInicioSesion() }>
                       <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                            <Text style={styles.textSignIn}>Get Started</Text>
                            <MaterialIcons
                                color="white"
                                name="navigate-next"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
               </View>
           </Animatable.View>
           </LinearGradient>
       </View>
   )

};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#021e02',
    },
    header: {
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex:1,
        backgroundColor: '#f5f8fb',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: '#021e02',
        fontWeight: 'bold',
        fontSize: 30
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSignIn: {
        color: 'white',
        fontWeight: 'bold',
    }
});


export default Splash;
