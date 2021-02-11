import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';


const ButtonShowSidebar = ({navigation}) => {


    return (

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

            </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#021e02',
    }
});

export default ButtonShowSidebar;
