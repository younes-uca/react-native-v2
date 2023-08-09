import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ${pojo.name}${role.name?cap_first}Card = ({ <#list pojo.fields as field><#if field.simple  && !field.id>${field.name} ,<#elseif field.generic>${field.name}Name ,</#if></#list> onPressDelete, onUpdate, onDetails }) =>{

return (

    <SafeAreaView>

        <View style={{ flexDirection: 'row', width: '100%' }} >

            <TouchableOpacity onPress={onDetails} style={{ height: 170, marginHorizontal: 10, borderRadius: 15, marginVertical: 10, elevation: 13, backgroundColor: 'white', width: '95%', flexDirection: 'row', justifyContent: 'space-between' }} >

                <View style={{ marginLeft: 15, marginVertical: 10 }}>

            <#list pojo.fields as field>
                <#if field.simple  && !field.id>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- ${field.formatedName}: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{${field.name}}</Text>
                    </View>
                <#elseif field.generic>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- ${field.formatedName}: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{${field.name}Name}</Text>
                    </View>
                </#if>
            </#list>

                </View>


                <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => onPressDelete()} style={styles.deleteButton}>
                        <Ionicons name="trash-outline" size={25} color={'red'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onUpdate()} style={styles.updateButton}>
                        <Ionicons name="pencil-outline" size={25} color={'blue'} />
                    </TouchableOpacity>

                </View>

            </TouchableOpacity>

        </View>

    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    card: {
        height: 170,
        marginHorizontal: 10,
        borderRadius: 15,
        marginVertical: 10,
        elevation: 13,
        backgroundColor: 'white',
        width: '90%',
        flexDirection: 'row',
        marginRight: '25%',
    },

    deleteButton: {
        margin: 15
    },

    updateButton: {
        margin: 15
    },

    buttons: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        right: '10%'
    },

    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5
    }
});

export default ${pojo.name}${role.name?cap_first}Card;
