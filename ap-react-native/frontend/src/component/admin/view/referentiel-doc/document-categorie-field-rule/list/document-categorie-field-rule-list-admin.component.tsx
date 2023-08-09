import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {DocumentCategorieFieldRuleAdminService} from '../../../../../../controller/service/admin/DocumentCategorieFieldRuleAdminService';
import  {DocumentCategorieFieldRuleDto}  from '../../../../../../controller/model/DocumentCategorieFieldRuleDto';
import  {DocumentCategorieFieldRuleAdminCard}  from './DocumentCategorieFieldRuleCard';


const DocumentCategorieFieldRuleAdminList: React.FC = () =>  {

    const [documentCategorieFieldRules, setDocumentCategorieFieldRules] = useState<DocumentCategorieFieldRuleDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DocumentCategorieFieldRuleResponse = AxiosResponse<DocumentCategorieFieldRuleDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [documentCategorieFieldRuleId, setDocumentCategorieFieldRuleId] = useState(0);

    const handleDeletePress = (id: number) => {
        setDocumentCategorieFieldRuleId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await DocumentCategorieFieldRuleAdminService.deleteById(documentCategorieFieldRuleId);
            setDocumentCategorieFieldRules((prevDocumentCategorieFieldRules) => prevDocumentCategorieFieldRules.filter((documentCategorieFieldRule) => documentCategorieFieldRule.id !== documentCategorieFieldRuleId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting document categorie field rule:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<DocumentCategorieFieldRuleResponse>([
            DocumentCategorieFieldRuleAdminService.getList(),
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
            const documentCategorieFieldRuleResponse = await DocumentCategorieFieldRuleAdminService.findById(id);
            const documentCategorieFieldRuleData = documentCategorieFieldRuleResponse.data;
            navigation.navigate('DocumentCategorieFieldRuleUpdate', { documentCategorieFieldRule: documentCategorieFieldRuleData });
        } catch (error) {
            console.error('Error fetching document categorie field rule data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const documentCategorieFieldRuleResponse = await DocumentCategorieFieldRuleAdminService.findById(id);
            const documentCategorieFieldRuleData = documentCategorieFieldRuleResponse.data;
            navigation.navigate('documentCategorieFieldRuleDetails', { documentCategorieFieldRule: documentCategorieFieldRuleData });
        } catch (error) {
            console.error('Error fetching document categorie field rule data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Document categorie field rule List</Text>

        <View style={{ marginBottom: 100 }}>
            {documentCategorieFieldRules && pdocumentCategorieFieldRules.length > 0 ? ( documentCategorieFieldRules.map((documentCategorieFieldRule) => (
                <DocumentCategorieFieldRuleAdminCard key={documentCategorieFieldRule.id}
                    documentCategorieFieldRule = {documentCategorieFieldRule.code}
                    documentCategorieFieldRule = {documentCategorieFieldRule.libelle}
                    documentCategorieFieldRule = {documentCategorieFieldRule.expresion}
                    onPressDelete={() => handleDeletePress(documentCategorieFieldRule.id)}
                    onUpdate={() => handleFetchAndUpdate(documentCategorieFieldRule.id)}
                    onDetails={() => handleFetchAndDetails(documentCategorieFieldRule.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No document categorie field rules found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'DocumentCategorieFieldRule'} />

    </ScrollView>

);
};

export default DocumentCategorieFieldRuleAdminList;
