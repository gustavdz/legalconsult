import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//Componentes
import Lista from '../components/Lista';

const Profile = ({navigation}) => {

    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity
                    style={{alignItems: "flex-end", margin: 16}}
                    onPress={navigation.openDrawer} >
                    <FontAwesome
                        name="bars"
                        color="#fff"
                        size={24}
                    />

                </TouchableOpacity>

                <Text style={{color:'#fff', fontSize:40}}> VISTA DE PERFIL</Text>

            </SafeAreaView>
        </View>


    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#021e02'
    }
});

export default Profile;
