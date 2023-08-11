import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {ClientCategoryAdminService} from '../../../../../../controller/service/admin/ClientCategoryAdminService.service';
import  {ClientCategoryDto}  from '../../../../../../controller/model/ClientCategory.model';
import ClientCategoryAdminCard from "../card/client-category-card-admin.component";


const ClientCategoryAdminList: React.FC = () =>  {

    const [clientCategorys, setClientCategorys] = useState<ClientCategoryDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ClientCategoryResponse = AxiosResponse<ClientCategoryDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [clientCategoryId, setClientCategoryId] = useState(0);

    const service = new ClientCategoryAdminService();

    const handleDeletePress = (id: number) => {
        setClientCategoryId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(clientCategoryId);
            setClientCategorys((prevClientCategorys) => prevClientCategorys.filter((clientCategory) => clientCategory.id !== clientCategoryId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting client category:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [clientCategoryResponse] = await Promise.all<ClientCategoryResponse>([
            service.getList(),
            ]);
            setClientCategorys(clientCategoryResponse.data);
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
            const clientCategoryResponse = await service.find(id);
            const clientCategoryData = clientCategoryResponse.data;
            navigation.navigate('ClientCategoryUpdate', { clientCategory: clientCategoryData });
        } catch (error) {
            console.error('Error fetching client category data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const clientCategoryResponse = await service.find(id);
            const clientCategoryData = clientCategoryResponse.data;
            //navigation.navigate('clientCategoryDetails', { clientCategory: clientCategoryData });
        } catch (error) {
            console.error('Error fetching client category data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Client category List</Text>

        <View style={{ marginBottom: 100 }}>
            {clientCategorys && clientCategorys.length > 0 ? ( clientCategorys.map((clientCategory) => (
                <ClientCategoryAdminCard key={clientCategory.id}
                    reference = {clientCategory.reference}
                    code = {clientCategory.code}
                    onPressDelete={() => handleDeletePress(clientCategory.id)}
                    onUpdate={() => handleFetchAndUpdate(clientCategory.id)}
                    onDetails={() => handleFetchAndDetails(clientCategory.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No client categorys found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'ClientCategory'} />

    </ScrollView>

);
};

export default ClientCategoryAdminList;
