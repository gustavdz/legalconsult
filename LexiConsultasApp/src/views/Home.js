import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//Componentes
import Lista from '../components/Lista';

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

          <SafeAreaView style={{flex: 1}}>
              <TouchableOpacity
                style={{alignItems: "flex-end", margin: 16}}
                onPress={() => toggleMenu(navigation)} >
              <FontAwesome
                  name="bars"
                  color="#fff"
                  size={24}
              />

              </TouchableOpacity>

              <FlatList
                  data={questions}

                  renderItem={ ({item}) => <Lista item={item} /> }
                  keyExtractor = { question => question._id}
              />

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

export default Home;
