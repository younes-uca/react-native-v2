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

import {DocumentCategorieAgentService} from '../../../../../../controller/service/agent/DocumentCategorieAgentService';
import  {DocumentCategorieDto}  from '../../../../../../controller/model/DocumentCategorieDto';

import {FieldDto} from '../../../../../../controller/model/FieldDto';
import {FieldAgentService} from '../../../../../../controller/service/agent/FieldAgentService';
import {DocumentCategorieFieldDto} from '../../../../../../controller/model/DocumentCategorieFieldDto';
import {DocumentCategorieFieldAgentService} from '../../../../../../controller/service/agent/DocumentCategorieFieldAgentService';
import {DocumentCategorieFieldRuleDto} from '../../../../../../controller/model/DocumentCategorieFieldRuleDto';
import {DocumentCategorieFieldRuleAgentService} from '../../../../../../controller/service/agent/DocumentCategorieFieldRuleAgentService';

const DocumentCategorieAgentCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isDocumentCategorieCollapsed, setIsDocumentCategorieCollapsed] = useState(true);
    const [isItemCollapsed, setIsItemCollapsed] = useState(true);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);

    const [fields, setFields] = useState<FieldDto[]>([]);
    const [fieldModalVisible, setFieldModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<FieldDto>(id : null ,code : '' ,libelle : 'select a Field', });

    const [documentCategorieFieldRules, setDocumentCategorieFieldRules] = useState<DocumentCategorieFieldRuleDto[]>([]);
    const [documentCategorieFieldRuleModalVisible, setDocumentCategorieFieldRuleModalVisible] = useState(false);
    const [selectedDocumentCategorieFieldRule, setSelectedDocumentCategorieFieldRule] = useState<DocumentCategorieFieldRuleDto>(id : null ,code : '' ,libelle : 'select a Document categorie field rule',expresion : '' , });


    const fieldAgentService = new FieldAgentService();
    const documentCategorieFieldAgentService = new DocumentCategorieFieldAgentService();
    const documentCategorieFieldRuleAgentService = new DocumentCategorieFieldRuleAgentService();

    const [documentCategorieFields, setDocumentCategorieFields] = useState<DocumentCategorieFieldDto>(new DocumentCategorieFieldDto());
    const [isEditModeDocumentCategorieFields, setIsEditModeDocumentCategorieFields] = useState(false);
    const [editIndexDocumentCategorieFields, setEditIndexDocumentCategorieFields] = useState(null);

    const { control, handleSubmit, reset } = useForm<DocumentCategorieDto>({
        defaultValues: {
        code: '' ,
        libelle: '' ,
        },
    });

    const documentCategorieCollapsible = () => {
        setIsDocumentCategorieCollapsed(!isDocumentCategorieCollapsed);
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


    useEffect(() => {

        fieldAgentService.getList().then(({data}) => setFields(data)).catch(error => console.log(error));
        documentCategorieFieldRuleAgentService.getList().then(({data}) => setDocumentCategorieFieldRules(data)).catch(error => console.log(error));
    }, []);


    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<DocumentCategorieFieldDto>({
        defaultValues: {
            field: undefined,
            documentCategorie: undefined,
            documentCategorieFieldRule: undefined,
        },
    });

    const documentCategorieFieldsItemCollapsible = () => {
        setIsItemCollapsed(!isItemCollapsed);
        setIsDocumentCategorieCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const documentCategorieFieldsItemsCollapsible = () => {
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsDocumentCategorieCollapsed(true);
        setIsItemCollapsed(true);
    };


    const handleAddDocumentCategorieFields = (data: DocumentCategorieFieldDto) => {
        if (data) {
            const newDocumentCategorieField: DocumentCategorieFieldDto = { field: selectedField , documentCategorie: undefined ,documentCategorieFieldRule: selectedDocumentCategorieFieldRule ,  };
            setDocumentCategorieFields((prevItems) => [...prevItems, newDocumentCategorieField]);
            resetItem({});
                setSelectedField({id : null ,code : '' ,libelle : 'select a Field',});
                setSelectedDocumentCategorie({id : null ,code : '' ,libelle : 'select a Document categorie',});
                setSelectedDocumentCategorieFieldRule({id : null ,code : '' ,libelle : 'select a Document categorie field rule',expresion : '' ,});
        }
    };

    const handleDeleteDocumentCategorieFields = (index) => {
        const updatedItems = documentCategorieFields.filter((item, i) => i !== index);
        setDocumentCategorieFields(updatedItems);
    };

    const handleUpdateDocumentCategorieFields = (data: DocumentCategorieFieldDto) => {
        if (data) {
            documentCategorieFields.map((item, i) => {
                if (i === editIndexDocumentCategorieFields) {
                    field: undefined ;
                    item.field = selectedField;
                    documentCategorieFieldRule: undefined ;
                    item.documentCategorieFieldRule = selectedDocumentCategorieFieldRule;
                }
            });
            resetItem({});
            setSelectedField({id : null ,code : '' ,libelle : 'select a Field', });
            setSelectedDocumentCategorieFieldRule({id : null ,code : '' ,libelle : 'select a Document categorie field rule',expresion : '' , });
            setIsEditModeDocumentCategorieFields(false);
        }
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    }

    const updateFormDefaultValuesDocumentCategorieFields = (index: number) => {
        let updatedDocumentCategorieField: DocumentCategorieFieldDto;
        setEditIndexDocumentCategorieFields(index);
        setIsEditModeDocumentCategorieFields(true);
        documentCategorieFields.map((item, i) => {
            if (i === index) {
                updatedDocumentCategorieField = item;
            }
        });
        resetItem({});
        setSelectedField(updatedDocumentCategorieField.field);
        setSelectedDocumentCategorieFieldRule(updatedDocumentCategorieField.documentCategorieFieldRule);
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    };


    const handleSave = async (item: DocumentCategorieDto) => {
        item.documentCategorieFields = documentCategorieFields;
        Keyboard.dismiss();
        try {
            await DocumentCategorieAgentService.save( item );
            setIsItemsCollapsed(!isItemsCollapsed);
            reset();
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            item.documentCategorieFields = documentCategorieFields;
            setDocumentCategorieFields([]);
        } catch (error) {
            console.error('Error saving documentCategorie:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create DocumentCategorie< /Text>

            <TouchableOpacity onPress={documentCategorieCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>DocumentCategorie< /Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDocumentCategorieCollapsed}>
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />
            </Collapsible>
            <TouchableOpacity onPress={documentCategorieFieldsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Document categorie fields</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isdocumentCategorieFieldsCollapsed}>
                <TouchableOpacity onPress={() => setfieldModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedfield.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setdocumentCategorieModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selecteddocumentCategorie.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setdocumentCategorieFieldRuleModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selecteddocumentCategorieFieldRule.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ isEditDocumentCategorieFieldsMode ? handleItemSubmit((data) => { handleUpdateDocumentCategorieFields(data); }) : handleItemSubmit(handleAddDocumentCategorieFields) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditModeDocumentCategorieFields ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>

            <TouchableOpacity onPress={itemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Document categorie fields</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isItemsCollapsed}>
                { documentCategorieFields && documentCategorieFields.length > 0 ? ( documentCategorieFields.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Field: {item.field.libelle}</Text>
                            <Text style={styles.infos}>'Document categorie: {item.documentCategorie.libelle}</Text>
                            <Text style={styles.infos}>'Document categorie field rule: {item.documentCategorieFieldRule.libelle}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteDocumentCategorieFields(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValues(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No document categorie fields yet.</Text>
                    </View>
                )}
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save DocumentCategorie"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {fields !== null && fields.length > 0 ? ( <FilterModal visibility={fieldModalVisible} placeholder={"Select a Field"} onItemSelect={onFieldSelect} items={fields} onClose={handleCloseFieldModal} variable={'libelle'} /> ) : null}
        {documentCategorieFieldRules !== null && documentCategorieFieldRules.length > 0 ? ( <FilterModal visibility={documentCategorieFieldRuleModalVisible} placeholder={"Select a DocumentCategorieFieldRule"} onItemSelect={onDocumentCategorieFieldRuleSelect} items={documentCategorieFieldRules} onClose={handleCloseDocumentCategorieFieldRuleModal} variable={'libelle'} /> ) : null}
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

export default DocumentCategorieAgentCreate;
