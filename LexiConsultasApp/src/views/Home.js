import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//Componentes
import Lista from '../components/Lista';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

const Home = ({navigation}) => {


    const [questions, setQuestions] = useState([]);
    const [consultarAPI, setConsultarAPI] = useState(true);
    useEffect(() => {
        const obtenerTareasAPI = async () => {
            //RUTA
            const url = 'http://192.168.131.103:5000/api/questions';
            const token = await AsyncStorage.getItem('token');

            try {
                const response = await axios.get(url, {headers:{
                    'authorization': 'Bearer '+token
                    }});
                setQuestions(response.data.questions);
                //console.log(response.data.questions);

            } catch (error) {
                console.log(error);
            }
        };
        if(consultarAPI) {
            obtenerTareasAPI();
        }

    },[consultarAPI]);

    const toggleMenu = (navigation) => {
        console.log("aplastando menu");
        navigation.openDrawer();
    };

  return (
      <View style={styles.container}>
          <LinearGradient colors={['#252b40', '#252b40']} style={styles.container}>



          <SafeAreaView style={{flex: 1,}}>
              <TouchableOpacity
                style={{alignItems: "flex-end", margin: 16}}
                onPress={() => toggleMenu(navigation)} >
              <FontAwesome
                  name="bars"
                  color="#f5f8fb"
                  size={24}
              />

              </TouchableOpacity>

              <View style={styles.headerContainer}>
                  <Text style={styles.textHeader}>Casos Disponibles</Text>
              </View>

              <FlatList
                  data={questions}
                  style={styles.questionContainer}
                  renderItem={ ({item}) => <Lista item={item} /> }
                  keyExtractor = { question => question._id}
              />

          </SafeAreaView>


          </LinearGradient>

      </View>
  )
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
       flexDirection: 'row',
       //backgroundColor: '#272b4f'
   },

    headerContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20
    },

    textHeader: {
        color: '#f5f8fb',
        fontWeight: 'bold',
        textAlign:'center',
        fontSize: 30
    },



    questionContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(245, 248, 251, 1)',
        borderRadius: 10,
        margin: 2

    }
});

export default Home;
