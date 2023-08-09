import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {EntiteAdministrativeTypeAdminService} from '../../../../../../controller/service/admin/EntiteAdministrativeTypeAdminService';
import  {EntiteAdministrativeTypeDto}  from '../../../../../../controller/model/EntiteAdministrativeTypeDto';
import  {EntiteAdministrativeTypeAdminCard}  from './EntiteAdministrativeTypeCard';


const EntiteAdministrativeTypeAdminList: React.FC = () =>  {

    const [entiteAdministrativeTypes, setEntiteAdministrativeTypes] = useState<EntiteAdministrativeTypeDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type EntiteAdministrativeTypeResponse = AxiosResponse<EntiteAdministrativeTypeDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [entiteAdministrativeTypeId, setEntiteAdministrativeTypeId] = useState(0);

    const handleDeletePress = (id: number) => {
        setEntiteAdministrativeTypeId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await EntiteAdministrativeTypeAdminService.deleteById(entiteAdministrativeTypeId);
            setEntiteAdministrativeTypes((prevEntiteAdministrativeTypes) => prevEntiteAdministrativeTypes.filter((entiteAdministrativeType) => entiteAdministrativeType.id !== entiteAdministrativeTypeId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting entite administrative type:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<EntiteAdministrativeTypeResponse>([
            EntiteAdministrativeTypeAdminService.getList(),
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const handleFetchAndUpdate = async (id: number) => {
        try {
            const entiteAdministrativeTypeResponse = await EntiteAdministrativeTypeAdminService.findById(id);
            const entiteAdministrativeTypeData = entiteAdministrativeTypeResponse.data;
            navigation.navigate('EntiteAdministrativeTypeUpdate', { entiteAdministrativeType: entiteAdministrativeTypeData });
        } catch (error) {
            console.error('Error fetching entite administrative type data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const entiteAdministrativeTypeResponse = await EntiteAdministrativeTypeAdminService.findById(id);
            const entiteAdministrativeTypeData = entiteAdministrativeTypeResponse.data;
            navigation.navigate('entiteAdministrativeTypeDetails', { entiteAdministrativeType: entiteAdministrativeTypeData });
        } catch (error) {
            console.error('Error fetching entite administrative type data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Entite administrative type List</Text>

        <View style={{ marginBottom: 100 }}>
            {entiteAdministrativeTypes && pentiteAdministrativeTypes.length > 0 ? ( entiteAdministrativeTypes.map((entiteAdministrativeType) => (
                <EntiteAdministrativeTypeAdminCard key={entiteAdministrativeType.id}
                    entiteAdministrativeType = {entiteAdministrativeType.code}
                    entiteAdministrativeType = {entiteAdministrativeType.libelle}
                    onPressDelete={() => handleDeletePress(entiteAdministrativeType.id)}
                    onUpdate={() => handleFetchAndUpdate(entiteAdministrativeType.id)}
                    onDetails={() => handleFetchAndDetails(entiteAdministrativeType.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No entite administrative types found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'EntiteAdministrativeType'} />

    </ScrollView>

);
};

export default EntiteAdministrativeTypeAdminList;
