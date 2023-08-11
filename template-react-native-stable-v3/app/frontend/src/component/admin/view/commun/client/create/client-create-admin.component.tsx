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

import {ClientAdminService} from '../../../../../../controller/service/admin/ClientAdminService.service';
import  {ClientDto}  from '../../../../../../controller/model/Client.model';

import {ClientCategoryDto} from '../../../../../../controller/model/ClientCategory.model';
import {ClientCategoryAdminService} from '../../../../../../controller/service/admin/ClientCategoryAdminService.service';

const ClientAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isClientCollapsed, setIsClientCollapsed] = useState(true);


    const emptyClientCategory = new ClientCategoryDto();
    const [clientCategorys, setClientCategorys] = useState<ClientCategoryDto[]>([]);
    const [clientCategoryModalVisible, setClientCategoryModalVisible] = useState(false);
    const [selectedClientCategory, setSelectedClientCategory] = useState<ClientCategoryDto>(emptyClientCategory);


    const service = new ClientAdminService();
    const clientCategoryAdminService = new ClientCategoryAdminService();


    const { control, handleSubmit, reset } = useForm<ClientDto>({
        defaultValues: {
        fullName: '' ,
        email: '' ,
        clientCategory: undefined,
        },
    });

    const clientCollapsible = () => {
        setIsClientCollapsed(!isClientCollapsed);
    };

    const handleCloseClientCategoryModal = () => {
        setClientCategoryModalVisible(false);
    };

    const onClientCategorySelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedClientCategory(item);
        setClientCategoryModalVisible(false);
    };


    useEffect(() => {
        clientCategoryAdminService.getList().then(({data}) => setClientCategorys(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: ClientDto) => {
        item.clientCategory = selectedClientCategory;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedClientCategory(emptyClientCategory);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving client:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create Client</Text>

            <TouchableOpacity onPress={clientCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Client</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isClientCollapsed}>
                            <CustomInput control={control} name={'fullName'} placeholder={'Full name'} keyboardT="default" />
                            <CustomInput control={control} name={'email'} placeholder={'Email'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setClientCategoryModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedClientCategory.reference}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save Client"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {clientCategorys !== null && clientCategorys.length > 0 ? ( <FilterModal visibility={clientCategoryModalVisible} placeholder={"Select a ClientCategory"} onItemSelect={onClientCategorySelect} items={clientCategorys} onClose={handleCloseClientCategoryModal} variable={'reference'} /> ) : null}
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

export default ClientAdminCreate;
