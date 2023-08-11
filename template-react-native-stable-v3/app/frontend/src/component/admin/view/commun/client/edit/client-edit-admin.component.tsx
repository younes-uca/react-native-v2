import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ClientAdminService} from '../../../../../../controller/service/admin/ClientAdminService.service';
import  {ClientDto}  from '../../../../../../controller/model/Client.model';

import {ClientCategoryDto} from '../../../../../../controller/model/ClientCategory.model';
import {ClientCategoryAdminService} from '../../../../../../controller/service/admin/ClientCategoryAdminService.service';

type ClientUpdateScreenRouteProp = RouteProp<{ ClientUpdate: { client: ClientDto } }, 'ClientUpdate'>;

type Props = { route: ClientUpdateScreenRouteProp; };

const ClientAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { client } = route.params;


    const emptyClientCategory = new ClientCategoryDto();
    const [clientCategorys, setClientCategorys] = useState<ClientCategoryDto[]>([]);
    const [clientCategoryModalVisible, setClientCategoryModalVisible] = useState(false);
    const [selectedClientCategory, setSelectedClientCategory] = useState<ClientCategoryDto>(emptyClientCategory);


    const service = new ClientAdminService();
    const clientCategoryAdminService = new ClientCategoryAdminService();


    const { control, handleSubmit } = useForm<ClientDto>({
        defaultValues: {
            id: client.id ,
            fullName: client.fullName ,
            email: client.email ,
        },
    });



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



    const handleUpdate = async (item: ClientDto) => {
        item.clientCategory = selectedClientCategory;
        Keyboard.dismiss();
        console.log('Data to be updated:', item);
        try {
            await service.update(item);
            navigation.navigate('Client');
        } catch (error) {
            console.error('Error saving client:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Update Client</Text>

            <CustomInput control={control} name={'fullName'} placeholder={'Full name'} keyboardT="default" />
            <CustomInput control={control} name={'email'} placeholder={'Email'} keyboardT="default" />

            <TouchableOpacity onPress={() => setClientCategoryModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedClientCategory.reference}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Client"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />

        item.clientCategory = selectedClientCategory;
        <FilterModal visibility={clientCategoryModalVisible} placeholder={"Select a ClientCategory"} onItemSelect={onClientCategorySelect} items={clientCategorys} onClose={handleCloseClientCategoryModal} variable={'reference'} />

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

export default ClientAdminEdit;
