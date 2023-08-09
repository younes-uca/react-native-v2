import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {DocumentStateAdminService} from '../../../../../../controller/service/admin/DocumentStateAdminService';
import  {DocumentStateDto}  from '../../../../../../controller/model/DocumentStateDto';
import  {DocumentStateAdminCard}  from './DocumentStateCard';


const DocumentStateAdminList: React.FC = () =>  {

    const [documentStates, setDocumentStates] = useState<DocumentStateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DocumentStateResponse = AxiosResponse<DocumentStateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [documentStateId, setDocumentStateId] = useState(0);

    const handleDeletePress = (id: number) => {
        setDocumentStateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await DocumentStateAdminService.deleteById(documentStateId);
            setDocumentStates((prevDocumentStates) => prevDocumentStates.filter((documentState) => documentState.id !== documentStateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting document state:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<DocumentStateResponse>([
            DocumentStateAdminService.getList(),
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
            const documentStateResponse = await DocumentStateAdminService.findById(id);
            const documentStateData = documentStateResponse.data;
            navigation.navigate('DocumentStateUpdate', { documentState: documentStateData });
        } catch (error) {
            console.error('Error fetching document state data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const documentStateResponse = await DocumentStateAdminService.findById(id);
            const documentStateData = documentStateResponse.data;
            navigation.navigate('documentStateDetails', { documentState: documentStateData });
        } catch (error) {
            console.error('Error fetching document state data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Document state List</Text>

        <View style={{ marginBottom: 100 }}>
            {documentStates && pdocumentStates.length > 0 ? ( documentStates.map((documentState) => (
                <DocumentStateAdminCard key={documentState.id}
                    documentState = {documentState.code}
                    documentState = {documentState.libelle}
                    documentState = {documentState.style}
                    onPressDelete={() => handleDeletePress(documentState.id)}
                    onUpdate={() => handleFetchAndUpdate(documentState.id)}
                    onDetails={() => handleFetchAndDetails(documentState.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No document states found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'DocumentState'} />

    </ScrollView>

);
};

export default DocumentStateAdminList;
