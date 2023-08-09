import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {FieldAgentService} from '../../../../../../controller/service/agent/FieldAgentService';
import  {FieldDto}  from '../../../../../../controller/model/FieldDto';
import  {FieldAgentCard}  from './FieldCard';


const FieldAgentList: React.FC = () =>  {

    const [fields, setFields] = useState<FieldDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type FieldResponse = AxiosResponse<FieldDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [fieldId, setFieldId] = useState(0);

    const handleDeletePress = (id: number) => {
        setFieldId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await FieldAgentService.deleteById(fieldId);
            setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting field:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<FieldResponse>([
            FieldAgentService.getList(),
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
            const fieldResponse = await FieldAgentService.findById(id);
            const fieldData = fieldResponse.data;
            navigation.navigate('FieldUpdate', { field: fieldData });
        } catch (error) {
            console.error('Error fetching field data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const fieldResponse = await FieldAgentService.findById(id);
            const fieldData = fieldResponse.data;
            navigation.navigate('fieldDetails', { field: fieldData });
        } catch (error) {
            console.error('Error fetching field data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Field List</Text>

        <View style={{ marginBottom: 100 }}>
            {fields && pfields.length > 0 ? ( fields.map((field) => (
                <FieldAgentCard key={field.id}
                    field = {field.code}
                    field = {field.libelle}
                    onPressDelete={() => handleDeletePress(field.id)}
                    onUpdate={() => handleFetchAndUpdate(field.id)}
                    onDetails={() => handleFetchAndDetails(field.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No fields found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Field'} />

    </ScrollView>

);
};

export default FieldAgentList;
