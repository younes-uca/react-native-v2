import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {EntiteAdministrativeAdminService} from '../../../../../../controller/service/admin/EntiteAdministrativeAdminService';
import  {EntiteAdministrativeDto}  from '../../../../../../controller/model/EntiteAdministrativeDto';

import {UtilisateurDto} from '../../../../../../controller/model/UtilisateurDto';
import {UtilisateurAdminService} from '../../../../../../controller/service/admin/UtilisateurAdminService';
import {EntiteAdministrativeTypeDto} from '../../../../../../controller/model/EntiteAdministrativeTypeDto';
import {EntiteAdministrativeTypeAdminService} from '../../../../../../controller/service/admin/EntiteAdministrativeTypeAdminService';

const EntiteAdministrativeAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isEntiteAdministrativeCollapsed, setIsEntiteAdministrativeCollapsed] = useState(true);
    const [isItemCollapsed, setIsItemCollapsed] = useState(true);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);

    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const [utilisateurModalVisible, setUtilisateurModalVisible] = useState(false);
    const [selectedUtilisateur, setSelectedUtilisateur] = useState<UtilisateurDto>(id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' , });

    const [entiteAdministrativeTypes, setEntiteAdministrativeTypes] = useState<EntiteAdministrativeTypeDto[]>([]);
    const [entiteAdministrativeTypeModalVisible, setEntiteAdministrativeTypeModalVisible] = useState(false);
    const [selectedEntiteAdministrativeType, setSelectedEntiteAdministrativeType] = useState<EntiteAdministrativeTypeDto>(id : null ,code : '' ,libelle : 'select a Entite administrative type', });


    const utilisateurAdminService = new UtilisateurAdminService();
    const entiteAdministrativeTypeAdminService = new EntiteAdministrativeTypeAdminService();


    const { control, handleSubmit, reset } = useForm<EntiteAdministrativeDto>({
        defaultValues: {
        code: '' ,
        codeEntiteAdminParent: '' ,
        referenceGed: '' ,
        description: '' ,
        libelle: '' ,
        utilisateur: undefined,
        entiteAdministrativeType: undefined,
        },
    });

    const entiteAdministrativeCollapsible = () => {
        setIsEntiteAdministrativeCollapsed(!isEntiteAdministrativeCollapsed);
        setIsItemCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const handleCloseUtilisateurModal = () => {
        setUtilisateurModalVisible(false);
    };

    const onUtilisateurSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedUtilisateur(item);
        setUtilisateurModalVisible(false);
    };
    const handleCloseEntiteAdministrativeTypeModal = () => {
        setEntiteAdministrativeTypeModalVisible(false);
    };

    const onEntiteAdministrativeTypeSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedEntiteAdministrativeType(item);
        setEntiteAdministrativeTypeModalVisible(false);
    };


    useEffect(() => {
        utilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        entiteAdministrativeTypeAdminService.getList().then(({data}) => setEntiteAdministrativeTypes(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: EntiteAdministrativeDto) => {
        item.utilisateur = selectedUtilisateur;
        item.entiteAdministrativeType = selectedEntiteAdministrativeType;
        Keyboard.dismiss();
        try {
            await EntiteAdministrativeAdminService.save( item );
            setIsItemsCollapsed(!isItemsCollapsed);
            reset();
            setSelectedUtilisateur({ id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' ,});
            setSelectedEntiteAdministrativeType({ id : null ,code : '' ,libelle : 'select a Entite administrative type',});
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving entiteAdministrative:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create EntiteAdministrative< /Text>

            <TouchableOpacity onPress={entiteAdministrativeCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>EntiteAdministrative< /Text>
            </TouchableOpacity>

            <Collapsible collapsed={isEntiteAdministrativeCollapsed}>
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'codeEntiteAdminParent'} placeholder={'Code entite admin parent'} keyboardT="default" />
                            <CustomInput control={control} name={'referenceGed'} placeholder={'Reference ged'} keyboardT="default" />
                            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setUtilisateurModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedUtilisateur.nom}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEntiteAdministrativeTypeModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedEntiteAdministrativeType.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save EntiteAdministrative"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {utilisateurs !== null && utilisateurs.length > 0 ? ( <FilterModal visibility={utilisateurModalVisible} placeholder={"Select a Utilisateur"} onItemSelect={onUtilisateurSelect} items={utilisateurs} onClose={handleCloseUtilisateurModal} variable={'nom'} /> ) : null}
        {entiteAdministrativeTypes !== null && entiteAdministrativeTypes.length > 0 ? ( <FilterModal visibility={entiteAdministrativeTypeModalVisible} placeholder={"Select a EntiteAdministrativeType"} onItemSelect={onEntiteAdministrativeTypeSelect} items={entiteAdministrativeTypes} onClose={handleCloseEntiteAdministrativeTypeModal} variable={'libelle'} /> ) : null}
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        //paddingHorizontal: 5,
        marginTop: 15,
        marginBottom: 10
    },

    input: {
        height: 50,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        flexDirection: 'row'
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 10
    },

    itemInput: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15,
        height: 50,
    },

    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5,
        fontSize: 15,
        fontWeight: 'bold'
    },

    itemCard: {
        marginVertical: 5,
        backgroundColor: '#f8f8ff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    placeHolder: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        padding: 15,
        marginTop: 15,
    }
});

export default EntiteAdministrativeAdminCreate;
