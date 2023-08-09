import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {EntiteAdministrativeAdminService} from '../../../../../../controller/service/admin/EntiteAdministrativeAdminService';
import  {EntiteAdministrativeDto}  from '../../../../../../controller/model/EntiteAdministrativeDto';
import  {EntiteAdministrativeAdminCard}  from './EntiteAdministrativeCard';


const EntiteAdministrativeAdminList: React.FC = () =>  {

    const [entiteAdministratives, setEntiteAdministratives] = useState<EntiteAdministrativeDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type EntiteAdministrativeResponse = AxiosResponse<EntiteAdministrativeDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [entiteAdministrativeId, setEntiteAdministrativeId] = useState(0);

    const handleDeletePress = (id: number) => {
        setEntiteAdministrativeId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await EntiteAdministrativeAdminService.deleteById(entiteAdministrativeId);
            setEntiteAdministratives((prevEntiteAdministratives) => prevEntiteAdministratives.filter((entiteAdministrative) => entiteAdministrative.id !== entiteAdministrativeId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting entite administrative:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [utilisateursResponse ,entiteAdministrativeTypesResponse ] = await Promise.all<EntiteAdministrativeResponse>([
            EntiteAdministrativeAdminService.getList(),
            ]);
            setEntiteAdministratives(utilisateursResponse.data);
            setEntiteAdministratives(entiteAdministrativeTypesResponse.data);
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
            const entiteAdministrativeResponse = await EntiteAdministrativeAdminService.findById(id);
            const entiteAdministrativeData = entiteAdministrativeResponse.data;
            navigation.navigate('EntiteAdministrativeUpdate', { entiteAdministrative: entiteAdministrativeData });
        } catch (error) {
            console.error('Error fetching entite administrative data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const entiteAdministrativeResponse = await EntiteAdministrativeAdminService.findById(id);
            const entiteAdministrativeData = entiteAdministrativeResponse.data;
            navigation.navigate('entiteAdministrativeDetails', { entiteAdministrative: entiteAdministrativeData });
        } catch (error) {
            console.error('Error fetching entite administrative data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Entite administrative List</Text>

        <View style={{ marginBottom: 100 }}>
            {entiteAdministratives && pentiteAdministratives.length > 0 ? ( entiteAdministratives.map((entiteAdministrative) => (
                <EntiteAdministrativeAdminCard key={entiteAdministrative.id}
                    entiteAdministrative = {entiteAdministrative.code}
                    entiteAdministrative = {entiteAdministrative.codeEntiteAdminParent}
                    entiteAdministrative = {entiteAdministrative.referenceGed}
                    entiteAdministrative = {entiteAdministrative.description}
                    entiteAdministrative = {entiteAdministrative.libelle}
                    entiteAdministrativeName = {entiteAdministrative.nom}
                    entiteAdministrativeName = {entiteAdministrative.libelle}
                    onPressDelete={() => handleDeletePress(entiteAdministrative.id)}
                    onUpdate={() => handleFetchAndUpdate(entiteAdministrative.id)}
                    onDetails={() => handleFetchAndDetails(entiteAdministrative.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No entite administratives found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'EntiteAdministrative'} />

    </ScrollView>

);
};

export default EntiteAdministrativeAdminList;
