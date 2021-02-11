import React from 'react';
import {View, ScrollView, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerContent} from '@react-navigation/drawer';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


const cerrarSesion =  async(navigation) =>{
    console.log("cerrando sesion");
    await AsyncStorage.removeItem('token');
    navigation.navigate('SignIn');
};

const Sidebar = (props) => {
  return (
      <ScrollView style={{flex:1}}>
          {/*FONDO*/}
          <ImageBackground source={require('../../assets/images/background-sidebar.png')}
                           style={{width: undefined, padding: 16, paddingTop: 48}}>
              {/*PERFIL FOTO*/}
              <Image source={require('../../assets/images/profile_default.png')}
                     style={styles.profile} />
              <Text style={styles.name}> Nombre de Abogado</Text>

              <View style={{flexDirection: "row"}}>
                  <Text style={styles.nomEmpresa}> Estudio Juridico</Text>
                  <Ionicons name="md-business" size={16} color="rgb(255, 255, 255)" />
              </View>

          </ImageBackground>

          <DrawerContentScrollView style={styles.container} {...props}>
                <View>
                    <DrawerContent {...props} />
                </View>
          </DrawerContentScrollView>

          <View style={styles.bottomDrawerSection}>
              <DrawerItem
                  icon={({color, size}) => (
                      <FontAwesome
                          name="sign-out"
                          color={color}
                          size={size}
                      />
                  )}
                  label="Cerrar Sesión"
                  onPress={() => {cerrarSesion(props.navigation)}}
              />
          </View>

      </ScrollView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#FFF'
    },

    name: {
        color: '#FFF',
        fontSize: 20,
        fontWeight:"800",
        marginVertical: 8
    },

    nomEmpresa: {
        color: 'rgb(255, 255, 255)',
        fontSize: 13,
        marginRight: 4

    },

    drawerSection: {
        marginTop: 15,
    },

    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }

});

export default Sidebar;
