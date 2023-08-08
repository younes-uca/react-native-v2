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

    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const [${fieldGeneric.name}s, set${fieldGeneric.name?cap_first}s] = useState<${fieldGeneric.typeAsPojo.name}Dto[]>([]);
    const [${fieldGeneric.name}ModalVisible, set${fieldGeneric.name?cap_first}ModalVisible] = useState(false);
    const [selected${fieldGeneric.name?cap_first}, setSelected${fieldGeneric.name?cap_first}] = useState<${fieldGeneric.name?cap_first}Dto>(
    {
    <#list fieldGeneric.typeAsPojo.fields as innerField>
            <#if innerField.name == innerField.typeAsPojo.labelOrReferenceOrId.name>
                ${innerField.name} : 'select a ${innerField.formatedName}',
            <#elseif innerField.dateTime>
                ${innerField.name} : undefined ,
            <#elseif innerField.pureString || innerField.large>
                ${innerField.name} : '' ,
            <#elseif innerField.simple >
                ${innerField.name} : null ,
            </#if>
    </#list> });

    </#list>

      <#list pojo.fields as field>
        <#if field.list && !field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto>(new ${field.typeAsPojo.name}Dto());
    const [isEditMode${field.name?cap_first}, setIsEditMode${field.name?cap_first}] = useState(false);
    const [editIndex${field.name?cap_first}, setEditIndex${field.name?cap_first}] = useState(null);
        <#elseif field.list && field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto[]>(new Array<${field.typeAsPojo.name}Dto>());
            </#if>
      </#list>

    const { control, handleSubmit, reset } = useForm<${pojo.name}Dto>({
        defaultValues: {
    <#list pojo.fields as field>
        <#if field.generic>
        ${field.name}: undefined,
        <#elseif field.simple && !field.id>
            <#if field.large>
        ${field.name}: '' ,
            <#elseif field.pureString>
        ${field.name}: '' ,
            <#elseif field.nombre>
        ${field.name}: null ,
             </#if>
        </#if>
    </#list>
        },
    });

    const ${pojo.name?uncap_first}Collapsible = () => {
        setIs${pojo.name}Collapsed(!is${pojo.name}Collapsed);
        setIsItemCollapsed(true);
        setIsItemsCollapsed(true);
    };

    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const handleClose${fieldGeneric.name?cap_first}Modal = () => {
        set${fieldGeneric.name?cap_first}ModalVisible(false);
    };

    const on${fieldGeneric.name?cap_first}Select = (item) => {
        console.log('Selected Item:', item);
        setSelected${fieldGeneric.name?cap_first}(item);
        set${fieldGeneric.name?cap_first}ModalVisible(false);
    };
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

    <#list pojo.fields as field>
        <#if field.list && !field.association>
    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<${field.typeAsPojo.name}Dto>({
        defaultValues: {
    <#list field.typeAsPojo.fields as innerField>
        <#if innerField.generic>
            ${innerField.name}: undefined,
        <#elseif innerField.simple && !innerField.id>
            <#if innerField.large || innerField.pureString>
            ${innerField.name}: '' ,
            <#elseif innerField.nombre>
            ${innerField.name}: null ,
            </#if>
        </#if>
    </#list>
        },
    });

    const ${field.name}ItemCollapsible = () => {
        setIsItemCollapsed(!isItemCollapsed);
        setIs${pojo.name}Collapsed(true);
        setIsItemsCollapsed(true);
    };

    const ${field.name}ItemsCollapsible = () => {
        setIsItemsCollapsed(!isItemsCollapsed);
        setIs${pojo.name}Collapsed(true);
        setIsItemCollapsed(true);
    };


    const handleAdd${field.name?cap_first} = (data: ${field.typeAsPojo.name}Dto) => {
        if (data) {
            const new${field.typeAsPojo.name}: ${field.typeAsPojo.name}Dto = { price: data.price, quantity: data.quantity, product: selectedProduct, purchase: undefined };
            set${field.name?cap_first}((prevItems) => [...prevItems, newPurchaseItem]);
            resetItem({ price: null, quantity: null, });
            setSelectedProduct({ code: '', reference: 'Select a Product' });
        }
    };

    const handleDelete${field.name?cap_first} = (index) => {
        const updatedItems = purchaseItems.filter((item, i) => i !== index);
        setPurchaseItems(updatedItems);
    };

    const handleUpdate${field.name?cap_first} = (data: PurchaseItemDto) => {
        if (data) {
            purchaseItems.map((item, i) => {
                if (i === editIndex${field.name?cap_first}) {
                item.price = data.price;
                item.quantity = data.quantity;
                item.product = selectedProduct;
                }
            });
            resetItem({ price: null, quantity: null, });
            setSelectedProduct({ code: '', reference: 'Select a Product' });
            setIsEditMode${field.name?cap_first}(false);
        }
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    }

    const updateFormDefaultValues${field.name?cap_first} = (index: number) => {
        let updatedPurchase: PurchaseItemDto;
        setEditIndex${field.name?cap_first}(index);
        setIsEditMode${field.name?cap_first}(true);
        purchaseItems.map((item, i) => {
            if (i === index) {
                updatedPurchase = item;
            }
        });

    resetItem({ price: updatedPurchase.price, quantity: updatedPurchase.quantity,});
        setSelectedProduct(updatedPurchase.product);
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    };
        </#if>
    </#list>


    const handleSave = async (item: ${pojo.name}Dto) => {
        item.client = selectedClient;
        item.purchaseItems = purchaseItems;
        Keyboard.dismiss();
        try {
            await ${pojo.name}${role.name?cap_first}Service.save( item );
            setIsItemsCollapsed(!isItemsCollapsed);
            reset();
            setSelectedClient({ id: null, fullName: 'Select a Client', email: '' });
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            setPurchaseItems([]);
        } catch (error) {
            console.error('Error saving ${pojo.name?uncap_first}:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

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
                        <Text>{selected${innerField.name}.${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
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
                <TouchableOpacity onPress={ isEdit${field.name?cap_first}Mode ? handleItemSubmit((data) => { handleUpdate${field.name?cap_first}(data); }) : handleItemSubmit(handleAdd${field.name?cap_first}) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditMode${field.name?cap_first} ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
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
                            <Text style={styles.infos}>'${innerField.formatedName}: {item.${innerField.name}.${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
                                 </#if>
                            </#list>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDelete${field.name?cap_first}(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValues(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No ${field.formatedName?uncap_first} yet.</Text>
                    </View>
                )}
            </Collapsible>
            </#if>
            </#list>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save ${pojo.name}"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
        {${fieldGeneric.name}s !== null && ${fieldGeneric.name}s.length > 0 ? ( <FilterModal visibility={${fieldGeneric.name}ModalVisible} placeholder={"Select a ${fieldGeneric.name?cap_first}"} onItemSelect={on${fieldGeneric.name?cap_first}Select} items={${fieldGeneric.name}s} onClose={handleClose${fieldGeneric.name?cap_first}Modal} variable={'${fieldGeneric.typeAsPojo.labelOrReferenceOrId.name}'} /> ) : null}
        </#list>
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
