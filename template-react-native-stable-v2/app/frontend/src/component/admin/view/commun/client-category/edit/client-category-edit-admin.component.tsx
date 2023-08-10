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

import {ClientCategoryAdminService} from '../../../../../../controller/service/admin/ClientCategoryAdminService.service';
import  {ClientCategoryDto}  from '../../../../../../controller/model/ClientCategory.model';


type ClientCategoryUpdateScreenRouteProp = RouteProp<{ ClientCategoryUpdate: { clientCategory: ClientCategoryDto } }, 'ClientCategoryUpdate'>;

type Props = { route: ClientCategoryUpdateScreenRouteProp; };

const ClientCategoryAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { clientCategory } = route.params;



    const service = new ClientCategoryAdminService();


    const { control, handleSubmit } = useForm<ClientCategoryDto>({
        defaultValues: {
        id: clientCategory.id ,
            id: clientCategory.id ,
        reference: clientCategory.reference ,
            reference: clientCategory.reference ,
        code: clientCategory.code ,
            code: clientCategory.code ,
        },
    });





    useEffect(() => {
    }, []);



    const handleUpdate = async (item: ClientCategoryDto) => {
        Keyboard.dismiss();
        console.log('Data to be updated:', item);
        try {
            await clientCategoryAdminService.update(item);
            navigation.navigate('ClientCategory');
        } catch (error) {
            console.error('Error saving client category:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Update Client category</Text>

            <CustomInput control={control} name={'reference'} placeholder={'Reference'} keyboardT="default" />
            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Client category"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />


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

export default ClientCategoryAdminEdit;
