import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//Componentes
import Lista from '../components/Lista';

const Questions = ({navigation}) => {


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

    return (
        <View style={styles.container}>

          <FlatList
              data={questions}

              renderItem={ ({item}) => <Lista item={item} /> }
              keyExtractor = { question => question._id}
          />

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

export default Questions;
