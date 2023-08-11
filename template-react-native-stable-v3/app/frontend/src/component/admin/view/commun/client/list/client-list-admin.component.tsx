import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {ClientAdminService} from '../../../../../../controller/service/admin/ClientAdminService.service';
import  {ClientDto}  from '../../../../../../controller/model/Client.model';
import ClientAdminCard from "../card/client-card-admin.component";


const ClientAdminList: React.FC = () =>  {

    const [clients, setClients] = useState<ClientDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ClientResponse = AxiosResponse<ClientDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [clientId, setClientId] = useState(0);

    const service = new ClientAdminService();

    const handleDeletePress = (id: number) => {
        setClientId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(clientId);
            setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting client:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [clientResponse] = await Promise.all<ClientResponse>([
            service.getList(),
            ]);
            setClients(clientResponse.data);
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
            const clientResponse = await service.find(id);
            const clientData = clientResponse.data;
            navigation.navigate('ClientUpdate', { client: clientData });
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const clientResponse = await service.find(id);
            const clientData = clientResponse.data;
            //navigation.navigate('clientDetails', { client: clientData });
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Client List</Text>

        <View style={{ marginBottom: 100 }}>
            {clients && clients.length > 0 ? ( clients.map((client) => (
                <ClientAdminCard key={client.id}
                    fullName = {client.fullName}
                    email = {client.email}
                    clientCategoryName = {client.clientCategory.reference}
                    onPressDelete={() => handleDeletePress(client.id)}
                    onUpdate={() => handleFetchAndUpdate(client.id)}
                    onDetails={() => handleFetchAndDetails(client.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No clients found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Client'} />

    </ScrollView>

);
};

export default ClientAdminList;
