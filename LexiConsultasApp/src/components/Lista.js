import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const Lista = ({item}) => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={[styles.textTarea, {fontWeight: 'bold'}]}>{item.title}</Text>
                    <Text style={styles.textTarea}>{item.detail}</Text>
                </View>
            </View>
        </ScrollView>

    )
};
const styles = StyleSheet.create({
   container: {
       borderBottomColor: '#e1e1e1',
       borderStyle: 'solid',
       borderBottomWidth: 0.5,
       paddingVertical: 20,
       paddingHorizontal: 10,
   },
    textTarea: {
       color: 'white',
        fontSize: 18
    }
});

export default Lista;
