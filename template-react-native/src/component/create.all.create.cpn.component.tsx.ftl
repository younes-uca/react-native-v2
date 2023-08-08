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

import {${pojo.name}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${pojo.name}${role.name?cap_first}Service';
import  {${pojo.name?cap_first}Dto}  from '../../../../../../controller/model/${pojo.name?cap_first}Dto';

<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name?cap_first}Dto} from '../../../../../../controller/model/${dependency.name?cap_first}Dto';
import {${dependency.name?cap_first}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${dependency.name?cap_first}${role.name?cap_first}Service';
        </#if>
    </#list>
</#if>

const ${pojo.name}${role.name?cap_first}Create = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [is${pojo.name}Collapsed, setIs${pojo.name}Collapsed] = useState(true);
    const [isItemCollapsed, setIsItemCollapsed] = useState(true);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const [${fieldGeneric.name}s, set${fieldGeneric.name?cap_first}s] = useState<${fieldGeneric.typeAsPojo.name}Dto[]>([]);
    const [${fieldGeneric.name}ModalVisible, set${fieldGeneric.name?cap_first}ModalVisible] = useState(false);
    type ${fieldGeneric.name?cap_first}Response = AxiosResponse<${fieldGeneric.name?cap_first}Dto[]>;
    const [selected${fieldGeneric.name?cap_first}, setSelected${fieldGeneric.name?cap_first}] = useState<${fieldGeneric.name?cap_first}Dto>(
    {
    <#list fieldGeneric.typeAsPojo.fields as innerField>
            <#if innerField.dateTime>
                ${innerField.name} : undefined ,
            <#elseif innerField.pureString>
                ${innerField.name} : '' ,
            <#elseif innerField.typeAsPojo.labelOrReferenceOrId>
                ${innerField.name} : null ,
            <#elseif innerField.simple >
                ${innerField.name} : null ,
            </#if>
    </#list> });

    </#list>

      <#list pojo.fields as field>
        <#if field.list && !field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto>(new ${field.typeAsPojo.name}Dto());
        <#elseif field.list && field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto[]>(new Array<${field.typeAsPojo.name}Dto>());
            </#if>
      </#list>


    useEffect(() => {
    <#list pojo.fieldsGeneric as fieldGeneric>
        ${fieldGeneric.typeAsPojo.name?uncap_first}${role.name?cap_first}Service.getList().then(({data}) => set${fieldGeneric.name?cap_first}s(data)).catch(error => console.log(error));
    </#list>
    <#list pojo.fields as field>
        <#if field.list>
            <#if field.association>
        ${field.fieldOfAssociation.typeAsPojo.name?uncap_first}${role.name?cap_first}Service.getList().then(({data}) => {
        const ${field.name?cap_first} = data?.map(prepare${field.typeAsPojo.name})
        set${field.name?cap_first}(${field.name})
        })
            </#if>

            <#list field.typeAsPojo.fieldsGeneric as fieldGeneric>
                <#if fieldGeneric.typeAsPojo.name != pojo.name && !field.association>
        ${fieldGeneric.typeAsPojo.name?uncap_first}${role.name?cap_first}Service.getList().then(({data}) => set${fieldGeneric.name?cap_first}s(data)).catch(error => console.log(error));
                </#if>
            </#list>
        </#if>
    </#list>
    }, []);

    <#list pojo.fields as field>
    <#if field.list && field.association>
    const prepare${field.typeAsPojo.name?cap_first} = (${field.fieldOfAssociation.typeAsPojo.name?uncap_first}: ${field.fieldOfAssociation.typeAsPojo.name}Dto) => {
        const ${field.typeAsPojo.name?uncap_first} = new ${field.typeAsPojo.name?cap_first}Dto();
        ${field.typeAsPojo.name?uncap_first}.${field.fieldOfAssociation.name?uncap_first} = ${field.fieldOfAssociation.typeAsPojo.name?uncap_first};
        return ${field.typeAsPojo.name?uncap_first};
    }
    <#elseif field.list && (field.associationComplex || field.fakeAssociation)>
    <#list field.typeAsPojo.fields as innerField>
    <#if innerField.list && innerField.association>
    const prepare${innerField.typeAsPojo.name?cap_first} =  (${innerField.fieldOfAssociation.typeAsPojo.name?uncap_first}: ${innerField.fieldOfAssociation.typeAsPojo.name}Dto) => {
        ${innerField.fieldOfAssociation.typeAsPojo.name?uncap_first}s.forEach(e => {
        const ${innerField.typeAsPojo.name?uncap_first} = new ${innerField.typeAsPojo.name?cap_first}Dto();
        ${innerField.typeAsPojo.name?uncap_first}.${innerField.fieldOfAssociation.name?uncap_first} = ${innerField.fieldOfAssociation.typeAsPojo.name?uncap_first};
        return ${innerField.typeAsPojo.name?uncap_first};
    }
        </#if>
        </#list>
        </#if>
        </#list>

    const onDropdownChange = (e: DropdownChangeEvent, field: string) => {
        setItem((prevState) => ({ ...prevState, [field]: e.value}));
    };

    <#list pojo.fields as field>
      <#if field.list && !field.association>
    const add${field.name?cap_first} = () => {
        setSubmitted(true);
        if( item.${field.name?uncap_first} == null )
        item.${field.name} = new Array<${field.typeAsPojo.name?cap_first}Dto>();
        let _item = ${field.name};
        if (!_item.id) {
            item.${field.name}.push(_item);
            MessageService.showSuccess(showToast, '${field.name?cap_first} Created');
            setItem((prevState :any) => ({...prevState, ${field.name}: item.${field.name} }));
        } else {
            const updatedItems = item.${field.name}.map((item) => item.id === ${field.name?uncap_first}.id ? {...${field.name?uncap_first}} : item);
            MessageService.showSuccess(showToast,'${field.name?cap_first} Updated');
            setItem((prevState :any) => ({ ...prevState, ${field.name}: updatedItems}));
        }
        set${field.name?cap_first}(new ${field.typeAsPojo.name}Dto());
    };

    const delete${field.name?cap_first} = (rowData: any) => {
        const updatedItems = item.${field.name}.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState,${field.name}: updatedItems }));
        set${field.name?cap_first}(new ${field.typeAsPojo.name}Dto());
        MessageService.showSuccess(showToast, '${pojo.name?cap_first}Item Deleted');
    };

    const edit${field.name?cap_first} = (rowData: any) => {
         setActiveTab(0);
         set${field.name?cap_first}(rowData);

    };

    const onInputNumerChange${field.name?cap_first} = (e: any, name: string) => {
         const val = e.value || 0;
         set${field.name?cap_first}((prev${field.name?cap_first}) => ({...prev${field.name?cap_first}, [name]: val, }));
    };
    const onDropdownChange${field.name?cap_first} = (e: any, field: string) => {
        set${field.name?cap_first}((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onBooleanInputChange${field.name?cap_first} = (e: InputSwitchChangeEvent, name: string) => {
       const val = e.value;
       set${field.name?cap_first}((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChange${field.name?cap_first} = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        set${field.name?cap_first}({ ...${field.name}, [name]:val})
    };

    const onInputTextChange${field.name?cap_first} = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        set${field.name?cap_first}({ ...${field.name}, [name]:val})
    };
      </#if>
</#list>
    <#if pojo.hasDate || pojo.hasDateTime>
    const formateDate = (field: string) => {
        return (rowData: any) => {
            if (rowData[field]) {
            return format(new Date(rowData[field]), "dd/MM/yyyy");
            }
        };
    };
    </#if>
    const onTabChange = (e: { index: number }) => { setActiveIndex(e.index); };

    const hideDialog = () => {
        setSubmitted(false);
        onClose();
    };


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        <#list pojo.fields as field>
            <#if field.requierd>
        if(item.${field.name} == '')
            errorMessages.push("${field.name} is required")
            </#if>
        </#list>
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            ${pojo.name}${role.name?cap_first}Service.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, '${pojo.formatedName} Created');
                onClose();
                setSubmitted(false);
                });
        }
    };

    const onInputTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const value = (e.target && e.target.value) || '';
        setItem({ ...item, [name]: value });
    };

    const onInputDateChange = (e: CalendarChangeEvent, name: string) => {
        const value = (e.value) || '';
        setItem({ ...item, [name]: value });
    };

    const onInputNumerChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value === null ? null : +e.value;
        setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onMultiSelectChange = (e: MultiSelectChangeEvent, field: string) => {
        if (e && e.value) {
            setItem(prevState => ({...prevState, [field]: e.value,}));
        }
    };

    const onBooleanInputChange = (e: any, name: string) => {
       const val = e.value;
       setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" text onClick={saveItem} /> </>
    );

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create ${pojo.name}< /Text>

            <TouchableOpacity onPress={${pojo.name?uncap_first}Collapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>${pojo.name}< /Text>
            </TouchableOpacity>

            <Collapsible collapsed={is${pojo.name}Collapsed}>
                <#list pojo.fields as field>
                    <#if field.simple && !field.notVisibleInCreatePage>
                        <#if  field.large>
                            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="default" />
                        <#elseif field.pureString>
                            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="default" />
                        <#elseif field.nombre == false>
                            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="numeric" />
                        </#if>
                    <#elseif field.generic && !field.notVisibleInCreatePage>
                        <TouchableOpacity onPress={() => set${field.name?cap_first}ModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selected${field.name?cap_first}.<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                    </#if>
                </#list>
            </Collapsible>
            <#list pojo.fields as field>
            <#if  field.list && !field.association>
            <TouchableOpacity onPress={${field.name}Collapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add ${field.formatedName}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={is${field.name}Collapsed}>
                <#list field.typeAsPojo.fields as innerField>
                    <#if innerField.generic>
                <TouchableOpacity onPress={() => set${innerField.name}ModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selected${innerField.name}.${innerField.labelOrReferenceOrId.name}}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                    </#if>
                    <#if innerField.simple && !innerField.id>
                        <#if innerField.large>
                            <CustomInput control={itemControl} name={'${innerField.name}'} placeholder={'${innerField.formatedName}'} keyboardT="default" />
                        <#elseif innerField.pureString>
                            <CustomInput control={itemControl} name={'${innerField.name}'} placeholder={'${innerField.formatedName}'} keyboardT="default" />
                        <#elseif innerField.nombre>
                            <CustomInput control={itemControl} name={'${innerField.name}'} placeholder={'${innerField.formatedName}'} keyboardT="numeric" />
                        </#if>
                    </#if>
                 </#list>
                <TouchableOpacity onPress={ isEdit${field.name?cap_first}Mode ? handleItemSubmit((data) => { handleUpdateItem(data); }) : handleItemSubmit(handleAdd${field.name?cap_first}) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditMode ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>

            <TouchableOpacity onPress={itemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Purchase Item</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isItemsCollapsed}>
                { purchaseItems && purchaseItems.length > 0 ? ( purchaseItems.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                             <#list field.typeAsPojo.fields as innerField>
                                 <#if innerField.simple && !innerField.id>
                            <Text style={styles.infos}>'${innerField.formatedName}: {item.${innerField.name}}</Text>
                                 <#elseif innerField.generic>
                            <Text style={styles.infos}>'${innerField.formatedName}: {item.${innerField.name}${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
                                 </#if>
                            </#list>
                            <Text style={styles.infos}>Price: {item.price}</Text>
                            <Text style={styles.infos}>Quantity: {item.quantity}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValues(index)}>
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
            </#if>
            </#list>
            <CustomButton onPress={handleSubmit(handleSave)} text={"Save Purchase"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {products !== null && products.length > 0 ? (
            <FilterModal visibility={productModalVisible} placeholder={"Select a Product"} onItemSelect={onProductSelect} items={products} onClose={handleCloseModal} variable={'reference'} />
        ) : null}
        {clients !== null && clients.length > 0 ? (
            <FilterModal visibility={clientModalVisible} placeholder={"Select a Client"} onItemSelect={onClientSelect} items={clients} onClose={handleCloseModal} variable={'fullName'} />
        ) : null}
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

export default ${pojo.name}${role.name?cap_first}Create;
