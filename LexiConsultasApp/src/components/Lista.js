import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import moment from "moment";

const Lista = ({item}) => {

    const [itemList, setItemList] = useState([]);
    moment.locale();

    const showDialog = (item) => {
      console.log("escojo question con id:"+ item._id);


    };

    return (
        <ScrollView>
            <View >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => showDialog(item)}>
                        <Text style={styles.textTitle }>{item.title}</Text>
                        <Text style={styles.textDetail}>{item.detail}</Text>
                        <Text style={styles.TextAreas}>Areas: {item.areas}</Text>

                        <View style={styles.footerList}>
                            <Text style={styles.footerListText}> - {item.user.name} | {moment(item.createdAt).fromNow()} </Text>
                        </View>
                    </TouchableOpacity>


                </View>

            </View>
        </ScrollView>

    )
};
const styles = StyleSheet.create({
   container: {
       borderBottomColor: '#101120',
       borderStyle: 'solid',
       borderBottomWidth: 0.5,
       paddingVertical: 40,
       paddingHorizontal: 10,
   },

    textTitle: {
        color: '#101120',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 3
    },

    textDetail: {
       color: '#101120',
        fontSize: 18,
        letterSpacing: 1
    },

    TextAreas: {
      paddingTop: 10,
      fontWeight: 'bold',
      color: 'black'
    },

    footerList: {
        marginTop: 10,
        paddingTop: 10
    },

    footerListText: {
       textAlign: 'right',
        color: 'grey',
        fontWeight: 'bold'
    }
});

export default Lista;
