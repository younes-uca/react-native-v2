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

import {DocumentFieldStateAdminService} from '../../../../../../controller/service/admin/DocumentFieldStateAdminService';
import  {DocumentFieldStateDto}  from '../../../../../../controller/model/DocumentFieldStateDto';


const DocumentFieldStateAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isDocumentFieldStateCollapsed, setIsDocumentFieldStateCollapsed] = useState(true);
    const [isItemCollapsed, setIsItemCollapsed] = useState(true);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);




    const { control, handleSubmit, reset } = useForm<DocumentFieldStateDto>({
        defaultValues: {
        code: '' ,
        libelle: '' ,
        style: '' ,
        },
    });

    const documentFieldStateCollapsible = () => {
        setIsDocumentFieldStateCollapsed(!isDocumentFieldStateCollapsed);
        setIsItemCollapsed(true);
        setIsItemsCollapsed(true);
    };



    useEffect(() => {
    }, []);




    const handleSave = async (item: DocumentFieldStateDto) => {
        Keyboard.dismiss();
        try {
            await DocumentFieldStateAdminService.save( item );
            setIsItemsCollapsed(!isItemsCollapsed);
            reset();
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving documentFieldState:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create DocumentFieldState< /Text>

            <TouchableOpacity onPress={documentFieldStateCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>DocumentFieldState< /Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDocumentFieldStateCollapsed}>
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />
                            <CustomInput control={control} name={'style'} placeholder={'Style'} keyboardT="default" />
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save DocumentFieldState"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
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

export default DocumentFieldStateAdminCreate;