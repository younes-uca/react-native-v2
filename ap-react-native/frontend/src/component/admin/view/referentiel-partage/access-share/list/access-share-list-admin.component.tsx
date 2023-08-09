import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {AccessShareAdminService} from '../../../../../../controller/service/admin/AccessShareAdminService';
import  {AccessShareDto}  from '../../../../../../controller/model/AccessShareDto';
import  {AccessShareAdminCard}  from './AccessShareCard';


const AccessShareAdminList: React.FC = () =>  {

    const [accessShares, setAccessShares] = useState<AccessShareDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type AccessShareResponse = AxiosResponse<AccessShareDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [accessShareId, setAccessShareId] = useState(0);

    const handleDeletePress = (id: number) => {
        setAccessShareId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await AccessShareAdminService.deleteById(accessShareId);
            setAccessShares((prevAccessShares) => prevAccessShares.filter((accessShare) => accessShare.id !== accessShareId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting access share:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<AccessShareResponse>([
            AccessShareAdminService.getList(),
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
            const accessShareResponse = await AccessShareAdminService.findById(id);
            const accessShareData = accessShareResponse.data;
            navigation.navigate('AccessShareUpdate', { accessShare: accessShareData });
        } catch (error) {
            console.error('Error fetching access share data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const accessShareResponse = await AccessShareAdminService.findById(id);
            const accessShareData = accessShareResponse.data;
            navigation.navigate('accessShareDetails', { accessShare: accessShareData });
        } catch (error) {
            console.error('Error fetching access share data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Access share List</Text>

        <View style={{ marginBottom: 100 }}>
            {accessShares && paccessShares.length > 0 ? ( accessShares.map((accessShare) => (
                <AccessShareAdminCard key={accessShare.id}
                    accessShare = {accessShare.code}
                    accessShare = {accessShare.libelle}
                    onPressDelete={() => handleDeletePress(accessShare.id)}
                    onUpdate={() => handleFetchAndUpdate(accessShare.id)}
                    onDetails={() => handleFetchAndDetails(accessShare.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No access shares found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'AccessShare'} />

    </ScrollView>

);
};

export default AccessShareAdminList;
