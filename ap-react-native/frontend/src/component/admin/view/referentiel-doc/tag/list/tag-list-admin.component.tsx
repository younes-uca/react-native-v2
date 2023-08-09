import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {TagAdminService} from '../../../../../../controller/service/admin/TagAdminService';
import  {TagDto}  from '../../../../../../controller/model/TagDto';
import  {TagAdminCard}  from './TagCard';


const TagAdminList: React.FC = () =>  {

    const [tags, setTags] = useState<TagDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type TagResponse = AxiosResponse<TagDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [tagId, setTagId] = useState(0);

    const handleDeletePress = (id: number) => {
        setTagId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await TagAdminService.deleteById(tagId);
            setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting tag:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [] = await Promise.all<TagResponse>([
            TagAdminService.getList(),
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
            const tagResponse = await TagAdminService.findById(id);
            const tagData = tagResponse.data;
            navigation.navigate('TagUpdate', { tag: tagData });
        } catch (error) {
            console.error('Error fetching tag data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const tagResponse = await TagAdminService.findById(id);
            const tagData = tagResponse.data;
            navigation.navigate('tagDetails', { tag: tagData });
        } catch (error) {
            console.error('Error fetching tag data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Tag List</Text>

        <View style={{ marginBottom: 100 }}>
            {tags && ptags.length > 0 ? ( tags.map((tag) => (
                <TagAdminCard key={tag.id}
                    tag = {tag.code}
                    tag = {tag.libelle}
                    onPressDelete={() => handleDeletePress(tag.id)}
                    onUpdate={() => handleFetchAndUpdate(tag.id)}
                    onDetails={() => handleFetchAndDetails(tag.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No tags found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Tag'} />

    </ScrollView>

);
};

export default TagAdminList;
