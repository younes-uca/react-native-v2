import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AxiosResponse} from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {PurchaseAdminService} from '../../../../../../controller/service/admin/PurchaseAdminService.service';
import {PurchaseDto} from '../../../../../../controller/model/Purchase.model';

import {ProductDto} from '../../../../../../controller/model/Product.model';
import {ProductAdminService} from '../../../../../../controller/service/admin/ProductAdminService.service';
import {PurchaseItemDto} from '../../../../../../controller/model/PurchaseItem.model';
import {PurchaseItemAdminService} from '../../../../../../controller/service/admin/PurchaseItemAdminService.service';
import {ClientDto} from '../../../../../../controller/model/Client.model';
import {ClientAdminService} from '../../../../../../controller/service/admin/ClientAdminService.service';

type PurchaseUpdateScreenRouteProp = RouteProp<{ PurchaseUpdate: { purchase: PurchaseDto } }, 'PurchaseUpdate'>;

type Props = { route: PurchaseUpdateScreenRouteProp; };

const PurchaseAdminEdit: React.FC<Props> = ({route}) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const {purchase} = route.params;


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


    const {control, handleSubmit} = useForm<PurchaseDto>({
        defaultValues: {
            id: purchase.id,
            reference: purchase.reference,
            purchaseDate: purchase.purchaseDate,
            image: purchase.image,
            total: purchase.total,
            description: purchase.description,
            client: purchase.client,
            purchaseItems: purchase.purchaseItems,
        },
    });


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


    const handleUpdate = async (item: PurchaseDto) => {
        item.client = selectedClient;
        Keyboard.dismiss();
        console.log('Data to be updated:', item);
        try {
            await service.update(item);
            navigation.navigate('Purchase');
        } catch (error) {
            console.error('Error saving purchase:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#e6e8fa'}}>

            <ScrollView style={{margin: 20}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                <Text style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10}}>Update
                    Purchase</Text>

                <CustomInput control={control} name={'reference'} placeholder={'Reference'} keyboardT="default"/>
                <CustomInput control={control} name={'purchaseDate'} placeholder={'Purchase date'} keyboardT="numeric"/>
                <CustomInput control={control} name={'image'} placeholder={'Image'} keyboardT="default"/>
                <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default"/>

                <TouchableOpacity onPress={() => setClientModalVisible(true)} style={styles.placeHolder}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>{selectedClient.fullName}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'}/>
                    </View>

                </TouchableOpacity>

                <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Purchase"} bgColor={'#ffa500'}
                              fgColor={'white'}/>

            </ScrollView>

            <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'}
                               iconColor={'red'}/>

            item.client = selectedClient;
            <FilterModal visibility={clientModalVisible} placeholder={"Select a Client"} onItemSelect={onClientSelect}
                         items={clients} onClose={handleCloseClientModal} variable={'fullName'}/>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15
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
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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
        marginBottom: 10,
    }

});

export default PurchaseAdminEdit;
