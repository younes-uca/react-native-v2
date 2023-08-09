import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {DocumentTypeAdminService} from '../../../../../../controller/service/admin/DocumentTypeAdminService';
import  {DocumentTypeDto}  from '../../../../../../controller/model/DocumentTypeDto';
import  {DocumentTypeAdminCard}  from './DocumentTypeCard';


const DocumentTypeAdminList: React.FC = () =>  {

    const [documentTypes, setDocumentTypes] = useState<DocumentTypeDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DocumentTypeResponse = AxiosResponse<DocumentTypeDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [documentTypeId, setDocumentTypeId] = useState(0);

    const handleDeletePress = (id: number) => {
        setDocumentTypeId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await DocumentTypeAdminService.deleteById(documentTypeId);
            setDocumentTypes((prevDocumentTypes) => prevDocumentTypes.filter((documentType) => documentType.id !== documentTypeId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting document type:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<DocumentTypeResponse>([
            DocumentTypeAdminService.getList(),
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
            const documentTypeResponse = await DocumentTypeAdminService.findById(id);
            const documentTypeData = documentTypeResponse.data;
            navigation.navigate('DocumentTypeUpdate', { documentType: documentTypeData });
        } catch (error) {
            console.error('Error fetching document type data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const documentTypeResponse = await DocumentTypeAdminService.findById(id);
            const documentTypeData = documentTypeResponse.data;
            navigation.navigate('documentTypeDetails', { documentType: documentTypeData });
        } catch (error) {
            console.error('Error fetching document type data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Document type List</Text>

        <View style={{ marginBottom: 100 }}>
            {documentTypes && pdocumentTypes.length > 0 ? ( documentTypes.map((documentType) => (
                <DocumentTypeAdminCard key={documentType.id}
                    documentType = {documentType.code}
                    documentType = {documentType.libelle}
                    onPressDelete={() => handleDeletePress(documentType.id)}
                    onUpdate={() => handleFetchAndUpdate(documentType.id)}
                    onDetails={() => handleFetchAndDetails(documentType.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No document types found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'DocumentType'} />

    </ScrollView>

);
};

export default DocumentTypeAdminList;
