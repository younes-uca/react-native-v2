import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {EtatUtilisateurAdminService} from '../../../../../../controller/service/admin/EtatUtilisateurAdminService';
import  {EtatUtilisateurDto}  from '../../../../../../controller/model/EtatUtilisateurDto';
import  {EtatUtilisateurAdminCard}  from './EtatUtilisateurCard';


const EtatUtilisateurAdminList: React.FC = () =>  {

    const [etatUtilisateurs, setEtatUtilisateurs] = useState<EtatUtilisateurDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type EtatUtilisateurResponse = AxiosResponse<EtatUtilisateurDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [etatUtilisateurId, setEtatUtilisateurId] = useState(0);

    const handleDeletePress = (id: number) => {
        setEtatUtilisateurId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await EtatUtilisateurAdminService.deleteById(etatUtilisateurId);
            setEtatUtilisateurs((prevEtatUtilisateurs) => prevEtatUtilisateurs.filter((etatUtilisateur) => etatUtilisateur.id !== etatUtilisateurId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting etat utilisateur:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<EtatUtilisateurResponse>([
            EtatUtilisateurAdminService.getList(),
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
            const etatUtilisateurResponse = await EtatUtilisateurAdminService.findById(id);
            const etatUtilisateurData = etatUtilisateurResponse.data;
            navigation.navigate('EtatUtilisateurUpdate', { etatUtilisateur: etatUtilisateurData });
        } catch (error) {
            console.error('Error fetching etat utilisateur data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const etatUtilisateurResponse = await EtatUtilisateurAdminService.findById(id);
            const etatUtilisateurData = etatUtilisateurResponse.data;
            navigation.navigate('etatUtilisateurDetails', { etatUtilisateur: etatUtilisateurData });
        } catch (error) {
            console.error('Error fetching etat utilisateur data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Etat utilisateur List</Text>

        <View style={{ marginBottom: 100 }}>
            {etatUtilisateurs && petatUtilisateurs.length > 0 ? ( etatUtilisateurs.map((etatUtilisateur) => (
                <EtatUtilisateurAdminCard key={etatUtilisateur.id}
                    etatUtilisateur = {etatUtilisateur.code}
                    etatUtilisateur = {etatUtilisateur.libelle}
                    onPressDelete={() => handleDeletePress(etatUtilisateur.id)}
                    onUpdate={() => handleFetchAndUpdate(etatUtilisateur.id)}
                    onDetails={() => handleFetchAndDetails(etatUtilisateur.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No etat utilisateurs found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'EtatUtilisateur'} />

    </ScrollView>

);
};

export default EtatUtilisateurAdminList;
