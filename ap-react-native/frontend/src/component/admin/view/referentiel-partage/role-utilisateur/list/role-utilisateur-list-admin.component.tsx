import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {RoleUtilisateurAdminService} from '../../../../../../controller/service/admin/RoleUtilisateurAdminService';
import  {RoleUtilisateurDto}  from '../../../../../../controller/model/RoleUtilisateurDto';
import  {RoleUtilisateurAdminCard}  from './RoleUtilisateurCard';


const RoleUtilisateurAdminList: React.FC = () =>  {

    const [roleUtilisateurs, setRoleUtilisateurs] = useState<RoleUtilisateurDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type RoleUtilisateurResponse = AxiosResponse<RoleUtilisateurDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [roleUtilisateurId, setRoleUtilisateurId] = useState(0);

    const handleDeletePress = (id: number) => {
        setRoleUtilisateurId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await RoleUtilisateurAdminService.deleteById(roleUtilisateurId);
            setRoleUtilisateurs((prevRoleUtilisateurs) => prevRoleUtilisateurs.filter((roleUtilisateur) => roleUtilisateur.id !== roleUtilisateurId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting role utilisateur:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<RoleUtilisateurResponse>([
            RoleUtilisateurAdminService.getList(),
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
            const roleUtilisateurResponse = await RoleUtilisateurAdminService.findById(id);
            const roleUtilisateurData = roleUtilisateurResponse.data;
            navigation.navigate('RoleUtilisateurUpdate', { roleUtilisateur: roleUtilisateurData });
        } catch (error) {
            console.error('Error fetching role utilisateur data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const roleUtilisateurResponse = await RoleUtilisateurAdminService.findById(id);
            const roleUtilisateurData = roleUtilisateurResponse.data;
            navigation.navigate('roleUtilisateurDetails', { roleUtilisateur: roleUtilisateurData });
        } catch (error) {
            console.error('Error fetching role utilisateur data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Role utilisateur List</Text>

        <View style={{ marginBottom: 100 }}>
            {roleUtilisateurs && proleUtilisateurs.length > 0 ? ( roleUtilisateurs.map((roleUtilisateur) => (
                <RoleUtilisateurAdminCard key={roleUtilisateur.id}
                    roleUtilisateur = {roleUtilisateur.code}
                    roleUtilisateur = {roleUtilisateur.libelle}
                    onPressDelete={() => handleDeletePress(roleUtilisateur.id)}
                    onUpdate={() => handleFetchAndUpdate(roleUtilisateur.id)}
                    onDetails={() => handleFetchAndDetails(roleUtilisateur.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No role utilisateurs found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'RoleUtilisateur'} />

    </ScrollView>

);
};

export default RoleUtilisateurAdminList;
