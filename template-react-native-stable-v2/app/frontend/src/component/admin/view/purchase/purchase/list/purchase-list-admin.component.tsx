import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {PurchaseAdminService} from '../../../../../../controller/service/admin/PurchaseAdminService.service';
import  {PurchaseDto}  from '../../../../../../controller/model/Purchase.model';
import PurchaseAdminCard from "../card/purchase-card-admin.component";


const PurchaseAdminList: React.FC = () =>  {

    const [purchases, setPurchases] = useState<PurchaseDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type PurchaseResponse = AxiosResponse<PurchaseDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [purchaseId, setPurchaseId] = useState(0);

    const service = new PurchaseAdminService();

    const handleDeletePress = (id: number) => {
        setPurchaseId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(purchaseId);
            setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== purchaseId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting purchase:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [purchaseResponse] = await Promise.all<PurchaseResponse>([
            service.getList(),
            ]);
            setPurchases(purchaseResponse.data);
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
            const purchaseResponse = await service.find(id);
            const purchaseData = purchaseResponse.data;
            console.log(purchaseResponse)
            navigation.navigate('PurchaseUpdate', { purchase: purchaseData });
        } catch (error) {
            console.error('Error fetching purchase data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const purchaseResponse = await service.find(id);
            const purchaseData = purchaseResponse.data;
            //navigation.navigate('purchaseDetails', { purchase: purchaseData });
        } catch (error) {
            console.error('Error fetching purchase data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Purchase List</Text>

        <View style={{ marginBottom: 100 }}>
            {purchases && purchases.length > 0 ? ( purchases.map((purchase) => (
                <PurchaseAdminCard key={purchase.id}
                    reference = {purchase.reference}
                    purchaseDate = {purchase.purchaseDate}
                    image = {purchase.image}
                    total = {purchase.total}
                    description = {purchase.description}
                    clientName = {purchase.client.fullName}
                    onPressDelete={() => handleDeletePress(purchase.id)}
                    onUpdate={() => handleFetchAndUpdate(purchase.id)}
                    onDetails={() => handleFetchAndDetails(purchase.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No purchases found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Purchase'} />

    </ScrollView>

);
};

export default PurchaseAdminList;
