import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {UtilisateurAdminService} from '../../../../../../controller/service/admin/UtilisateurAdminService';
import  {UtilisateurDto}  from '../../../../../../controller/model/UtilisateurDto';
import  {UtilisateurAdminCard}  from './UtilisateurCard';


const UtilisateurAdminList: React.FC = () =>  {

    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type UtilisateurResponse = AxiosResponse<UtilisateurDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [utilisateurId, setUtilisateurId] = useState(0);

    const handleDeletePress = (id: number) => {
        setUtilisateurId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await UtilisateurAdminService.deleteById(utilisateurId);
            setUtilisateurs((prevUtilisateurs) => prevUtilisateurs.filter((utilisateur) => utilisateur.id !== utilisateurId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting utilisateur:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<UtilisateurResponse>([
            UtilisateurAdminService.getList(),
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
            const utilisateurResponse = await UtilisateurAdminService.findById(id);
            const utilisateurData = utilisateurResponse.data;
            navigation.navigate('UtilisateurUpdate', { utilisateur: utilisateurData });
        } catch (error) {
            console.error('Error fetching utilisateur data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const utilisateurResponse = await UtilisateurAdminService.findById(id);
            const utilisateurData = utilisateurResponse.data;
            navigation.navigate('utilisateurDetails', { utilisateur: utilisateurData });
        } catch (error) {
            console.error('Error fetching utilisateur data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Utilisateur List</Text>

        <View style={{ marginBottom: 100 }}>
            {utilisateurs && putilisateurs.length > 0 ? ( utilisateurs.map((utilisateur) => (
                <UtilisateurAdminCard key={utilisateur.id}
                    utilisateur = {utilisateur.email}
                    utilisateur = {utilisateur.nom}
                    utilisateur = {utilisateur.prenom}
                    onPressDelete={() => handleDeletePress(utilisateur.id)}
                    onUpdate={() => handleFetchAndUpdate(utilisateur.id)}
                    onDetails={() => handleFetchAndDetails(utilisateur.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No utilisateurs found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Utilisateur'} />

    </ScrollView>

);
};

export default UtilisateurAdminList;
