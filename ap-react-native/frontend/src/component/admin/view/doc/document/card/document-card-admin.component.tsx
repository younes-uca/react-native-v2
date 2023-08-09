import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DocumentAdminCard = ({ reference ,referenceGed ,uploadDate ,dateLastUpdate ,content ,folder ,size ,documentTypeName ,documentStateName ,documentCategorieName ,description ,utilisateurName ,archive ,versionne ,entiteAdministrativeName , onPressDelete, onUpdate, onDetails }) =>{

return (

    <SafeAreaView>

        <View style={{ flexDirection: 'row', width: '100%' }} >

            <TouchableOpacity onPress={onDetails} style={{ height: 170, marginHorizontal: 10, borderRadius: 15, marginVertical: 10, elevation: 13, backgroundColor: 'white', width: '95%', flexDirection: 'row', justifyContent: 'space-between' }} >

                <View style={{ marginLeft: 15, marginVertical: 10 }}>

                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Reference: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{reference}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Reference ged: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{referenceGed}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Upload date: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{uploadDate}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Date last update: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{dateLastUpdate}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Content: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{content}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Folder: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{folder}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Size: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{size}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Document type: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{documentTypeName}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Document state: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{documentStateName}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Document categorie: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{documentCategorieName}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Description: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{description}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Utilisateur: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{utilisateurName}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Archive: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{archive}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Versionne: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{versionne}</Text>
                    </View>
                    <View style={styles.infos}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Entite administrative: </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{entiteAdministrativeName}</Text>
                    </View>

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

export default DocumentAdminCard;
