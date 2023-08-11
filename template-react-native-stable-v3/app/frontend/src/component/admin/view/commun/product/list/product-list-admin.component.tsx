import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {ProductAdminService} from '../../../../../../controller/service/admin/ProductAdminService.service';
import  {ProductDto}  from '../../../../../../controller/model/Product.model';
import ProductAdminCard from "../card/product-card-admin.component";


const ProductAdminList: React.FC = () =>  {

    const [products, setProducts] = useState<ProductDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ProductResponse = AxiosResponse<ProductDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [productId, setProductId] = useState(0);

    const service = new ProductAdminService();

    const handleDeletePress = (id: number) => {
        setProductId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting product:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [productResponse] = await Promise.all<ProductResponse>([
            service.getList(),
            ]);
            setProducts(productResponse.data);
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
            const productResponse = await service.find(id);
            const productData = productResponse.data;
            navigation.navigate('ProductUpdate', { product: productData });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const productResponse = await service.find(id);
            const productData = productResponse.data;
            //navigation.navigate('productDetails', { product: productData });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >Product List</Text>

        <View style={{ marginBottom: 100 }}>
            {products && products.length > 0 ? ( products.map((product) => (
                <ProductAdminCard key={product.id}
                    code = {product.code}
                    reference = {product.reference}
                    onPressDelete={() => handleDeletePress(product.id)}
                    onUpdate={() => handleFetchAndUpdate(product.id)}
                    onDetails={() => handleFetchAndDetails(product.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No products found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Product'} />

    </ScrollView>

);
};

export default ProductAdminList;
