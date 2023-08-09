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

import {DocumentCategorieFieldAdminService} from '../../../../../../controller/service/admin/DocumentCategorieFieldAdminService';
import  {DocumentCategorieFieldDto}  from '../../../../../../controller/model/DocumentCategorieFieldDto';

import {FieldDto} from '../../../../../../controller/model/FieldDto';
import {FieldAdminService} from '../../../../../../controller/service/admin/FieldAdminService';
import {DocumentCategorieDto} from '../../../../../../controller/model/DocumentCategorieDto';
import {DocumentCategorieAdminService} from '../../../../../../controller/service/admin/DocumentCategorieAdminService';
import {DocumentCategorieFieldRuleDto} from '../../../../../../controller/model/DocumentCategorieFieldRuleDto';
import {DocumentCategorieFieldRuleAdminService} from '../../../../../../controller/service/admin/DocumentCategorieFieldRuleAdminService';

const DocumentCategorieFieldAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isDocumentCategorieFieldCollapsed, setIsDocumentCategorieFieldCollapsed] = useState(true);
    const [isItemCollapsed, setIsItemCollapsed] = useState(true);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);

    const [fields, setFields] = useState<FieldDto[]>([]);
    const [fieldModalVisible, setFieldModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<FieldDto>(id : null ,code : '' ,libelle : 'select a Field', });

    const [documentCategorieFieldRules, setDocumentCategorieFieldRules] = useState<DocumentCategorieFieldRuleDto[]>([]);
    const [documentCategorieFieldRuleModalVisible, setDocumentCategorieFieldRuleModalVisible] = useState(false);
    const [selectedDocumentCategorieFieldRule, setSelectedDocumentCategorieFieldRule] = useState<DocumentCategorieFieldRuleDto>(id : null ,code : '' ,libelle : 'select a Document categorie field rule',expresion : '' , });

    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);
    const [documentCategorieModalVisible, setDocumentCategorieModalVisible] = useState(false);
    const [selectedDocumentCategorie, setSelectedDocumentCategorie] = useState<DocumentCategorieDto>(id : null ,code : '' ,libelle : 'select a Document categorie', });


    const fieldAdminService = new FieldAdminService();
    const documentCategorieAdminService = new DocumentCategorieAdminService();
    const documentCategorieFieldRuleAdminService = new DocumentCategorieFieldRuleAdminService();


    const { control, handleSubmit, reset } = useForm<DocumentCategorieFieldDto>({
        defaultValues: {
        field: undefined,
        documentCategorie: undefined,
        documentCategorieFieldRule: undefined,
        },
    });

    const documentCategorieFieldCollapsible = () => {
        setIsDocumentCategorieFieldCollapsed(!isDocumentCategorieFieldCollapsed);
        setIsItemCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const handleCloseFieldModal = () => {
        setFieldModalVisible(false);
    };

    const onFieldSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedField(item);
        setFieldModalVisible(false);
    };
    const handleCloseDocumentCategorieFieldRuleModal = () => {
        setDocumentCategorieFieldRuleModalVisible(false);
    };

    const onDocumentCategorieFieldRuleSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedDocumentCategorieFieldRule(item);
        setDocumentCategorieFieldRuleModalVisible(false);
    };
    const handleCloseDocumentCategorieModal = () => {
        setDocumentCategorieModalVisible(false);
    };

    const onDocumentCategorieSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedDocumentCategorie(item);
        setDocumentCategorieModalVisible(false);
    };


    useEffect(() => {
        fieldAdminService.getList().then(({data}) => setFields(data)).catch(error => console.log(error));
        documentCategorieAdminService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));
        documentCategorieFieldRuleAdminService.getList().then(({data}) => setDocumentCategorieFieldRules(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: DocumentCategorieFieldDto) => {
        item.field = selectedField;
        item.documentCategorie = selectedDocumentCategorie;
        item.documentCategorieFieldRule = selectedDocumentCategorieFieldRule;
        Keyboard.dismiss();
        try {
            await DocumentCategorieFieldAdminService.save( item );
            setIsItemsCollapsed(!isItemsCollapsed);
            reset();
            setSelectedField({ id : null ,code : '' ,libelle : 'select a Field',});
            setSelectedDocumentCategorie({ id : null ,code : '' ,libelle : 'select a Document categorie',});
            setSelectedDocumentCategorieFieldRule({ id : null ,code : '' ,libelle : 'select a Document categorie field rule',expresion : '' ,});
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving documentCategorieField:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create DocumentCategorieField< /Text>

            <TouchableOpacity onPress={documentCategorieFieldCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>DocumentCategorieField< /Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDocumentCategorieFieldCollapsed}>
                        <TouchableOpacity onPress={() => setFieldModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedField.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDocumentCategorieModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedDocumentCategorie.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDocumentCategorieFieldRuleModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedDocumentCategorieFieldRule.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save DocumentCategorieField"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {fields !== null && fields.length > 0 ? ( <FilterModal visibility={fieldModalVisible} placeholder={"Select a Field"} onItemSelect={onFieldSelect} items={fields} onClose={handleCloseFieldModal} variable={'libelle'} /> ) : null}
        {documentCategorieFieldRules !== null && documentCategorieFieldRules.length > 0 ? ( <FilterModal visibility={documentCategorieFieldRuleModalVisible} placeholder={"Select a DocumentCategorieFieldRule"} onItemSelect={onDocumentCategorieFieldRuleSelect} items={documentCategorieFieldRules} onClose={handleCloseDocumentCategorieFieldRuleModal} variable={'libelle'} /> ) : null}
        {documentCategories !== null && documentCategories.length > 0 ? ( <FilterModal visibility={documentCategorieModalVisible} placeholder={"Select a DocumentCategorie"} onItemSelect={onDocumentCategorieSelect} items={documentCategories} onClose={handleCloseDocumentCategorieModal} variable={'libelle'} /> ) : null}
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

export default DocumentCategorieFieldAdminCreate;
