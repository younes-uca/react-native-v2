import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {DocumentAdminService} from '../../../../../../controller/service/admin/DocumentAdminService';
import  {DocumentDto}  from '../../../../../../controller/model/DocumentDto';
import  {DocumentAdminCard}  from './DocumentCard';


const DocumentAdminList: React.FC = () =>  {

    const [documents, setDocuments] = useState<DocumentDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DocumentResponse = AxiosResponse<DocumentDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [documentId, setDocumentId] = useState(0);

    const handleDeletePress = (id: number) => {
        setDocumentId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await DocumentAdminService.deleteById(documentId);
            setDocuments((prevDocuments) => prevDocuments.filter((document) => document.id !== documentId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting document:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<DocumentResponse>([
            DocumentAdminService.getList(),
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
            const documentResponse = await DocumentAdminService.findById(id);
            const documentData = documentResponse.data;
            navigation.navigate('DocumentUpdate', { document: documentData });
        } catch (error) {
            console.error('Error fetching document data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const documentResponse = await DocumentAdminService.findById(id);
            const documentData = documentResponse.data;
            navigation.navigate('documentDetails', { document: documentData });
        } catch (error) {
            console.error('Error fetching document data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Document List</Text>

        <View style={{ marginBottom: 100 }}>
            {documents && pdocuments.length > 0 ? ( documents.map((document) => (
                <DocumentAdminCard key={document.id}
                    document = {document.reference}
                    document = {document.referenceGed}
                    document = {document.uploadDate}
                    document = {document.dateLastUpdate}
                    document = {document.content}
                    document = {document.folder}
                    document = {document.size}
                    documentName = {document.libelle}
                    documentName = {document.libelle}
                    documentName = {document.libelle}
                    document = {document.description}
                    documentName = {document.nom}
                    document = {document.archive}
                    document = {document.versionne}
                    documentName = {document.libelle}
                    onPressDelete={() => handleDeletePress(document.id)}
                    onUpdate={() => handleFetchAndUpdate(document.id)}
                    onDetails={() => handleFetchAndDetails(document.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No documents found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Document'} />

    </ScrollView>

);
};

export default DocumentAdminList;
