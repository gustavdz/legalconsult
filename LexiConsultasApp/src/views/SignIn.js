import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

//import {useNavigation} from '@react-navigation/native';

const SignIn = ({navigation}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [checkTextInput, setCheckTextInput] = useState(false);

    useEffect(() => {
        if(email.length !== 0 ) {
            setCheckTextInput(true);
        }
    },[email]);


    const iniciarSesion = async () => {
        console.log("iniciando sesion");
        // validar
        if(email === '' || password === ''){
            mostrarAlerta();
            return;
        }
        //usuario
        const usuario = {email, password};

        //RUTA
        const url = 'http://192.168.131.103:5000/api/users/login';

        try {
            let token=null;
            const response = await axios.post(url, usuario).then(resp =>{
                //console.log("lo que tiene resp");
                console.log(resp.data.token);
                token = resp.data.token;
                AsyncStorage.setItem('token', token);
                //ya tengo el token
                navigation.navigate('Home');
            }, error => {
                console.log("lo que tiene error");
                console.log(error.response);
                if(error){
                    mostrarAlertaInicioIncorrecto(error.response.data.message);
                }
            });




        } catch (error) {
            console.log(error);
        }




    };

    //muestra la alerta si falla validacion
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK' //arreglo de botones
            }]
        )
    };

    //muestra la alerta si falla validacion
    const mostrarAlertaInicioIncorrecto = (mensaje) => {
        Alert.alert(
            'Error',
            mensaje,
            [{
                text: 'OK' //arreglo de botones
            }]
        )
    };



    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#272b4f', '#003973']} style={styles.container}>
            <Animatable.View animation="fadeIn" duration={1500} style={styles.header}>
                <Text style={styles.textHeader}>Bienvenido a Deckasoft!</Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.textFooter}>E-mail</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#021e02"
                        size={20}
                    />
                    <TextInput
                        placeholder="Ingresa tu email"
                        style={styles.textInput}
                        onChangeText={texto => setEmail(texto)}
                        value={email}
                    />
                    {checkTextInput ?
                        <Animatable.View animation="bounceIn">
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                        </Animatable.View>
                    :null}

                </View>

                <Text style={[styles.textFooter, {marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#021e02"
                        size={20}
                    />
                    <TextInput
                        placeholder="Ingresa tu contraseña"
                        secureTextEntry={secureTextEntry}
                        style={styles.textInput}
                        value={password}
                        onChangeText={texto => setPassword(texto)}
                    />

                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry) }>

                        {!secureTextEntry ?

                            <Feather
                                name="eye"
                                color="gray"
                                size={20}
                            />

                            : <Feather
                                name="eye-off"
                                color="gray"
                                size={20}
                            />

                        }


                    </TouchableOpacity>
                </View>

                <Text style={{color:'#009bd1', marginTop:15 }}>¿Olvidaste Contraseña?</Text>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.8} style={{width:'100%'}} onPress={() => iniciarSesion()}>
                        <LinearGradient colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                            <Text style={[styles.textSignIn, {color:'white'}]}>Iniciar Sesión</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={[styles.signIn, {
                                borderColor: '#4dc2f8',
                                borderWidth: 1,
                                marginTop:15
                        }]}>

                            <Text style={[styles.textSignIn, {color:'#4dc2f8'}]}>Regístrate Aquí</Text>
                    </TouchableOpacity>

                </View>


            </Animatable.View>
            </LinearGradient>
        </ScrollView>
    )

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        //backgroundColor: '#021e02',
    },
    header: {
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#f5f8fb',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30

    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center',
        fontSize: 30
    },
    textFooter: {
        color: '#021e02',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#021e02'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width:'100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSignIn: {
        fontSize: 18,
        fontWeight: 'bold'
    },


});


export default SignIn;
