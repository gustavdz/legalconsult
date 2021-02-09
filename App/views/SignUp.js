import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from 'react-native-animatable';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = ({navigation}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
    const [checkTextInput, setCheckTextInput] = useState(false);

    useEffect(() => {
        if(email.length !== 0 ) {
            setCheckTextInput(true);
        }
    },[email]);


    const iniciarRegistro = async () => {

        // validar
        if(name === ''|| email === '' || password === '' || confirmPassword === ''){
            mostrarAlerta();
            return;
        }
        if( password !== confirmPassword) {
            mostrarAlerta2();
            return;
        }

        //usuario
        const usuario = {name, email, password, confirmPassword};

        //RUTA
        const url = 'http://192.168.131.103:5000/api/users';

        try {
            const response = await axios.post(url, usuario);
            console.log(response.data.token);
            const {token} = response.data;
            await AsyncStorage.setItem('token', token);

        } catch (error) {
            console.log(error);
        }



        //ya tengo el token
        navigation.navigate('Home');


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
    const mostrarAlerta2 = () => {
        Alert.alert(
            'Error',
            'Las contraseñas deben de coincidir',
            [{
                text: 'OK' //arreglo de botones
            }]
        )
    };




    return (
        <ScrollView style={styles.container}>
            <Animatable.View animation="fadeIn" duration={1500} style={styles.header}>
                <Text style={styles.textHeader}>Forma parte de Deckasoft!</Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.textFooter}>Información de Usuario</Text>
                <View style={styles.action}>

                    <FontAwesome
                        name="user-o"
                        color="#021e02"
                        size={20}
                    />
                    <TextInput
                        placeholder="Ingresa tu nombre"
                        style={styles.textInput}
                        onChangeText={texto => setName(texto)}
                        value={name}
                    />


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

                <Text style={[styles.textFooter, {marginTop: 20}]}>Password</Text>
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

                <Text style={[styles.textFooter, {marginTop: 20}]}>Confirmar Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#021e02"
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirma tu contraseña"
                        secureTextEntry={confirmSecureTextEntry}
                        style={styles.textInput}
                        value={confirmPassword}
                        onChangeText={texto => setConfirmPassword(texto)}
                    />

                    <TouchableOpacity onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry) }>

                        {!confirmSecureTextEntry ?

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

                <View style={styles.textPrivate}>
                    <Text style={styles.colorTextPrivate}>Al registrarte aceptas los términos de</Text>
                    <Text>{" "}Nuestros términos</Text>
                    <Text>{" "}y</Text>
                    <Text>{" "}Nuestra política de privacidad</Text>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.8} style={{width:'100%'}} onPress={() => iniciarRegistro()}>
                        <LinearGradient style={{flex:1}} colors={['#5db8fe', '#39cff2']} style={styles.signIn}>
                            <Text style={[styles.textSignIn, {color:'white'}]}>Registrarme</Text>
                        </LinearGradient>
                    </TouchableOpacity>



                </View>


            </Animatable.View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021e02',
    },
    header: {
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 4,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30

    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
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
        marginTop: 30
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    colorTextPrivate: {
        color:'gray'
    }
});


export default SignUp;
