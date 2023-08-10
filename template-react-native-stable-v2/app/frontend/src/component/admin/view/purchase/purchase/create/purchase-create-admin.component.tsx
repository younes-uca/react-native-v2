import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {PurchaseAdminService} from '../../../../../../controller/service/admin/PurchaseAdminService.service';
import  {PurchaseDto}  from '../../../../../../controller/model/Purchase.model';

import {ProductDto} from '../../../../../../controller/model/Product.model';
import {ProductAdminService} from '../../../../../../controller/service/admin/ProductAdminService.service';
import {PurchaseItemDto} from '../../../../../../controller/model/PurchaseItem.model';
import {PurchaseItemAdminService} from '../../../../../../controller/service/admin/PurchaseItemAdminService.service';
import {ClientDto} from '../../../../../../controller/model/Client.model';
import {ClientAdminService} from '../../../../../../controller/service/admin/ClientAdminService.service';

const PurchaseAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isPurchaseCollapsed, setIsPurchaseCollapsed] = useState(true);


    const emptyProduct = new ProductDto();
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDto>(emptyProduct);

    const emptyClient = new ClientDto();
    const [clients, setClients] = useState<ClientDto[]>([]);
    const [clientModalVisible, setClientModalVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientDto>(emptyClient);


    const service = new PurchaseAdminService();
    const productAdminService = new ProductAdminService();
    const purchaseItemAdminService = new PurchaseItemAdminService();
    const clientAdminService = new ClientAdminService();

    const [purchaseItemsElements, setPurchaseItemsElements] = useState<PurchaseItemDto[]>([]);
    const [purchaseItems, setPurchaseItems] = useState<PurchaseItemDto>(new PurchaseItemDto());
    const [isEditModePurchaseItems, setIsEditModePurchaseItems] = useState(false);
    const [editIndexPurchaseItems, setEditIndexPurchaseItems] = useState(null);

    const [isPurchaseItemsElementCollapsed, setIsPurchaseItemsElementCollapsed] = useState(true);
    const [isPurchaseItemsElementsCollapsed, setIsPurchaseItemsElementsCollapsed] = useState(true);
    const [isPurchaseItems, setIsPurchaseItems] = useState(false);
    const [isEditPurchaseItemsMode, setIsEditPurchaseItemsMode] = useState(false);


    const { control, handleSubmit, reset } = useForm<PurchaseDto>({
        defaultValues: {
        reference: '' ,
        image: '' ,
        total: null ,
        description: '' ,
        client: undefined,
        },
    });

    const purchaseCollapsible = () => {
        setIsPurchaseCollapsed(!isPurchaseCollapsed);
    };

    const handleCloseProductModal = () => {
        setProductModalVisible(false);
    };

    const onProductSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedProduct(item);
        setProductModalVisible(false);
    };
    const handleCloseClientModal = () => {
        setClientModalVisible(false);
    };

    const onClientSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedClient(item);
        setClientModalVisible(false);
    };


    useEffect(() => {
        clientAdminService.getList().then(({data}) => setClients(data)).catch(error => console.log(error));

        productAdminService.getList().then(({data}) => setProducts(data)).catch(error => console.log(error));
    }, []);


    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<PurchaseItemDto>({
        defaultValues: {
            product: undefined,
            price: null ,
            quantity: null ,
            purchase: undefined,
        },
    });

    const purchaseItemsElementCollapsible = () => {
        setIsPurchaseItemsElementCollapsed(!isPurchaseItemsElementCollapsed);
    };

    const purchaseItemsElementsCollapsible = () => {
        setIsPurchaseItemsElementsCollapsed(!isPurchaseItemsElementsCollapsed);
    };

    const handleAddPurchaseItems = (data: PurchaseItemDto) => {
        if (data) {
            const newPurchaseItem: PurchaseItemDto = { id: null  , product: selectedProduct, price: data.price ,quantity: data.quantity ,purchase: undefined , };
            setPurchaseItemsElements((prevItems) => [...prevItems, newPurchaseItem]);
            resetItem({price: null ,quantity: null ,});
                setSelectedProduct(emptyProduct);
        }
    };

    const handleDeletePurchaseItems = (index) => {
        const updatedItems = purchaseItemsElements.filter((item, i) => i !== index);
        setPurchaseItemsElements(updatedItems);
    };

    const handleUpdatePurchaseItems = (data: PurchaseItemDto) => {
        if (data) {
            purchaseItemsElements.map((item, i) => {
                if (i === editIndexPurchaseItems) {
                    product: undefined ;
                    item.product = selectedProduct;
                    item.price = data.price;
                    item.quantity = data.quantity;
                }
            });
            resetItem({price: null ,quantity: null ,});
            setSelectedProduct(emptyProduct);
            setIsEditModePurchaseItems(false);
        }
        setIsPurchaseItemsElementCollapsed(!isPurchaseItemsElementCollapsed);
        setIsPurchaseItemsElementsCollapsed(!isPurchaseItemsElementsCollapsed);
    }

    const updateFormDefaultValuesPurchaseItems = (index: number) => {
        let updatedPurchaseItem: PurchaseItemDto;
        setEditIndexPurchaseItems(index);
        setIsEditModePurchaseItems(true);
        purchaseItemsElements.map((item, i) => {
            if (i === index) {
                updatedPurchaseItem = item;
            }
        });
        resetItem({price: updatedPurchaseItem.price ,quantity: updatedPurchaseItem.quantity ,});
        setSelectedProduct(updatedPurchaseItem.product);
        setIsPurchaseItemsElementCollapsed(!isPurchaseItemsElementCollapsed);
        setIsPurchaseItemsElementsCollapsed(!isPurchaseItemsElementsCollapsed);
    };


    const handleSave = async (item: PurchaseDto) => {
        item.client = selectedClient;
        item.purchaseItems = purchaseItemsElements;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedClient(emptyClient);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            item.purchaseItems = purchaseItemsElements;
            setPurchaseItemsElements([]);
        } catch (error) {
            console.error('Error saving purchase:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create Purchase</Text>

            <TouchableOpacity onPress={purchaseCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Purchase</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPurchaseCollapsed}>
                            <CustomInput control={control} name={'reference'} placeholder={'Reference'} keyboardT="default" />
                            <CustomInput control={control} name={'purchaseDate'} placeholder={'Purchase date'} keyboardT="numeric" />
                            <CustomInput control={control} name={'image'} placeholder={'Image'} keyboardT="default" />
                            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setClientModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedClient.fullName}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            </Collapsible>
            <TouchableOpacity onPress={purchaseItemsElementCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Purchase items</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPurchaseItemsElementCollapsed}>
                <TouchableOpacity onPress={() => setProductModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedProduct.reference}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                            <CustomInput control={itemControl} name={'price'} placeholder={'Price'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'quantity'} placeholder={'Quantity'} keyboardT="numeric" />
                <TouchableOpacity onPress={ isEditPurchaseItemsMode ? handleItemSubmit((data) => { handleUpdatePurchaseItems(data); }) : handleItemSubmit(handleAddPurchaseItems) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditModePurchaseItems ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>
            <TouchableOpacity onPress={purchaseItemsElementsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Purchase items</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isPurchaseItemsElementsCollapsed}>
                { purchaseItems && purchaseItemsElements.length > 0 ? ( purchaseItemsElements.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Product: {item.product.reference}</Text>
                            <Text style={styles.infos}>'Price: {item.price}</Text>
                            <Text style={styles.infos}>'Quantity: {item.quantity}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeletePurchaseItems(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValuesPurchaseItems(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No purchase items yet.</Text>
                    </View>
                )}
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save Purchase"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {products !== null && products.length > 0 ? ( <FilterModal visibility={productModalVisible} placeholder={"Select a Product"} onItemSelect={onProductSelect} items={products} onClose={handleCloseProductModal} variable={'reference'} /> ) : null}
        {clients !== null && clients.length > 0 ? ( <FilterModal visibility={clientModalVisible} placeholder={"Select a Client"} onItemSelect={onClientSelect} items={clients} onClose={handleCloseClientModal} variable={'fullName'} /> ) : null}
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        //paddingHorizontal: 5,
        marginTop: 15,
        marginBottom: 10
    },

    input: {
        height: 50,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        flexDirection: 'row'
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 10
    },

    itemInput: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15,
        height: 50,
    },

    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5,
        fontSize: 15,
        fontWeight: 'bold'
    },

    itemCard: {
        marginVertical: 5,
        backgroundColor: '#f8f8ff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    placeHolder: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        padding: 15,
        marginTop: 15,
    }
});

export default PurchaseAdminCreate;
