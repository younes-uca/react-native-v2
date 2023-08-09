import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {DocumentCategorieAdminService} from '../../../../../../controller/service/admin/DocumentCategorieAdminService';
import  {DocumentCategorieDto}  from '../../../../../../controller/model/DocumentCategorieDto';
import  {DocumentCategorieAdminCard}  from './DocumentCategorieCard';


const DocumentCategorieAdminList: React.FC = () =>  {

    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DocumentCategorieResponse = AxiosResponse<DocumentCategorieDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [documentCategorieId, setDocumentCategorieId] = useState(0);

    const handleDeletePress = (id: number) => {
        setDocumentCategorieId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await DocumentCategorieAdminService.deleteById(documentCategorieId);
            setDocumentCategories((prevDocumentCategories) => prevDocumentCategories.filter((documentCategorie) => documentCategorie.id !== documentCategorieId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting document categorie:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [fieldsResponse ,documentCategorieFieldRulesResponse ] = await Promise.all<DocumentCategorieResponse>([
            DocumentCategorieAdminService.getList(),
            ]);
            setDocumentCategories(fieldsResponse.data);
            setDocumentCategories(documentCategorieFieldRulesResponse.data);
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
            const documentCategorieResponse = await DocumentCategorieAdminService.findById(id);
            const documentCategorieData = documentCategorieResponse.data;
            navigation.navigate('DocumentCategorieUpdate', { documentCategorie: documentCategorieData });
        } catch (error) {
            console.error('Error fetching document categorie data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const documentCategorieResponse = await DocumentCategorieAdminService.findById(id);
            const documentCategorieData = documentCategorieResponse.data;
            navigation.navigate('documentCategorieDetails', { documentCategorie: documentCategorieData });
        } catch (error) {
            console.error('Error fetching document categorie data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Document categorie List</Text>

        <View style={{ marginBottom: 100 }}>
            {documentCategories && pdocumentCategories.length > 0 ? ( documentCategories.map((documentCategorie) => (
                <DocumentCategorieAdminCard key={documentCategorie.id}
                    documentCategorie = {documentCategorie.code}
                    documentCategorie = {documentCategorie.libelle}
                    onPressDelete={() => handleDeletePress(documentCategorie.id)}
                    onUpdate={() => handleFetchAndUpdate(documentCategorie.id)}
                    onDetails={() => handleFetchAndDetails(documentCategorie.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No document categories found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'DocumentCategorie'} />

    </ScrollView>

);
};

export default DocumentCategorieAdminList;
