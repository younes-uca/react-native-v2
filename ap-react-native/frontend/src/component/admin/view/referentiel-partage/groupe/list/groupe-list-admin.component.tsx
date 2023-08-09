import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {GroupeAdminService} from '../../../../../../controller/service/admin/GroupeAdminService';
import  {GroupeDto}  from '../../../../../../controller/model/GroupeDto';
import  {GroupeAdminCard}  from './GroupeCard';


const GroupeAdminList: React.FC = () =>  {

    const [groupes, setGroupes] = useState<GroupeDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type GroupeResponse = AxiosResponse<GroupeDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [groupeId, setGroupeId] = useState(0);

    const handleDeletePress = (id: number) => {
        setGroupeId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await GroupeAdminService.deleteById(groupeId);
            setGroupes((prevGroupes) => prevGroupes.filter((groupe) => groupe.id !== groupeId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting groupe:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [etatUtilisateursResponse ,roleUtilisateursResponse ] = await Promise.all<GroupeResponse>([
            GroupeAdminService.getList(),
            ]);
            setGroupes(etatUtilisateursResponse.data);
            setGroupes(roleUtilisateursResponse.data);
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
            const groupeResponse = await GroupeAdminService.findById(id);
            const groupeData = groupeResponse.data;
            navigation.navigate('GroupeUpdate', { groupe: groupeData });
        } catch (error) {
            console.error('Error fetching groupe data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const groupeResponse = await GroupeAdminService.findById(id);
            const groupeData = groupeResponse.data;
            navigation.navigate('groupeDetails', { groupe: groupeData });
        } catch (error) {
            console.error('Error fetching groupe data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Groupe List</Text>

        <View style={{ marginBottom: 100 }}>
            {groupes && pgroupes.length > 0 ? ( groupes.map((groupe) => (
                <GroupeAdminCard key={groupe.id}
                    groupe = {groupe.code}
                    groupe = {groupe.libelle}
                    groupeName = {groupe.nom}
                    onPressDelete={() => handleDeletePress(groupe.id)}
                    onUpdate={() => handleFetchAndUpdate(groupe.id)}
                    onDetails={() => handleFetchAndDetails(groupe.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No groupes found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Groupe'} />

    </ScrollView>

);
};

export default GroupeAdminList;
