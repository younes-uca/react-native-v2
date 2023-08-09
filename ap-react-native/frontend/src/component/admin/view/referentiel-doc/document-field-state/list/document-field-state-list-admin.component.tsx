import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {DocumentFieldStateAdminService} from '../../../../../../controller/service/admin/DocumentFieldStateAdminService';
import  {DocumentFieldStateDto}  from '../../../../../../controller/model/DocumentFieldStateDto';
import  {DocumentFieldStateAdminCard}  from './DocumentFieldStateCard';


const DocumentFieldStateAdminList: React.FC = () =>  {

    const [documentFieldStates, setDocumentFieldStates] = useState<DocumentFieldStateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DocumentFieldStateResponse = AxiosResponse<DocumentFieldStateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [documentFieldStateId, setDocumentFieldStateId] = useState(0);

    const handleDeletePress = (id: number) => {
        setDocumentFieldStateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await DocumentFieldStateAdminService.deleteById(documentFieldStateId);
            setDocumentFieldStates((prevDocumentFieldStates) => prevDocumentFieldStates.filter((documentFieldState) => documentFieldState.id !== documentFieldStateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting document field state:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<DocumentFieldStateResponse>([
            DocumentFieldStateAdminService.getList(),
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
            const documentFieldStateResponse = await DocumentFieldStateAdminService.findById(id);
            const documentFieldStateData = documentFieldStateResponse.data;
            navigation.navigate('DocumentFieldStateUpdate', { documentFieldState: documentFieldStateData });
        } catch (error) {
            console.error('Error fetching document field state data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const documentFieldStateResponse = await DocumentFieldStateAdminService.findById(id);
            const documentFieldStateData = documentFieldStateResponse.data;
            navigation.navigate('documentFieldStateDetails', { documentFieldState: documentFieldStateData });
        } catch (error) {
            console.error('Error fetching document field state data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Document field state List</Text>

        <View style={{ marginBottom: 100 }}>
            {documentFieldStates && pdocumentFieldStates.length > 0 ? ( documentFieldStates.map((documentFieldState) => (
                <DocumentFieldStateAdminCard key={documentFieldState.id}
                    documentFieldState = {documentFieldState.code}
                    documentFieldState = {documentFieldState.libelle}
                    documentFieldState = {documentFieldState.style}
                    onPressDelete={() => handleDeletePress(documentFieldState.id)}
                    onUpdate={() => handleFetchAndUpdate(documentFieldState.id)}
                    onDetails={() => handleFetchAndDetails(documentFieldState.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No document field states found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'DocumentFieldState'} />

    </ScrollView>

);
};

export default DocumentFieldStateAdminList;
