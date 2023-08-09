import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {DocumentCategorieFieldAgentService} from '../../../../../../controller/service/agent/DocumentCategorieFieldAgentService';
import  {DocumentCategorieFieldDto}  from '../../../../../../controller/model/DocumentCategorieFieldDto';
import  {DocumentCategorieFieldAgentCard}  from './DocumentCategorieFieldCard';


const DocumentCategorieFieldAgentList: React.FC = () =>  {

    const [documentCategorieFields, setDocumentCategorieFields] = useState<DocumentCategorieFieldDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DocumentCategorieFieldResponse = AxiosResponse<DocumentCategorieFieldDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [documentCategorieFieldId, setDocumentCategorieFieldId] = useState(0);

    const handleDeletePress = (id: number) => {
        setDocumentCategorieFieldId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await DocumentCategorieFieldAgentService.deleteById(documentCategorieFieldId);
            setDocumentCategorieFields((prevDocumentCategorieFields) => prevDocumentCategorieFields.filter((documentCategorieField) => documentCategorieField.id !== documentCategorieFieldId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting document categorie field:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [fieldsResponse ,documentCategorieFieldRulesResponse ,documentCategoriesResponse ] = await Promise.all<DocumentCategorieFieldResponse>([
            DocumentCategorieFieldAgentService.getList(),
            ]);
            setDocumentCategorieFields(fieldsResponse.data);
            setDocumentCategorieFields(documentCategorieFieldRulesResponse.data);
            setDocumentCategorieFields(documentCategoriesResponse.data);
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
            const documentCategorieFieldResponse = await DocumentCategorieFieldAgentService.findById(id);
            const documentCategorieFieldData = documentCategorieFieldResponse.data;
            navigation.navigate('DocumentCategorieFieldUpdate', { documentCategorieField: documentCategorieFieldData });
        } catch (error) {
            console.error('Error fetching document categorie field data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const documentCategorieFieldResponse = await DocumentCategorieFieldAgentService.findById(id);
            const documentCategorieFieldData = documentCategorieFieldResponse.data;
            navigation.navigate('documentCategorieFieldDetails', { documentCategorieField: documentCategorieFieldData });
        } catch (error) {
            console.error('Error fetching document categorie field data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Document categorie field List</Text>

        <View style={{ marginBottom: 100 }}>
            {documentCategorieFields && pdocumentCategorieFields.length > 0 ? ( documentCategorieFields.map((documentCategorieField) => (
                <DocumentCategorieFieldAgentCard key={documentCategorieField.id}
                    documentCategorieFieldName = {documentCategorieField.libelle}
                    documentCategorieFieldName = {documentCategorieField.libelle}
                    documentCategorieFieldName = {documentCategorieField.libelle}
                    onPressDelete={() => handleDeletePress(documentCategorieField.id)}
                    onUpdate={() => handleFetchAndUpdate(documentCategorieField.id)}
                    onDetails={() => handleFetchAndDetails(documentCategorieField.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No document categorie fields found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'DocumentCategorieField'} />

    </ScrollView>

);
};

export default DocumentCategorieFieldAgentList;
