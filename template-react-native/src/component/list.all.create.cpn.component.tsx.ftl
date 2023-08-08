import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {${pojo.name}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${pojo.name}${role.name?cap_first}Service';
import  {${pojo.name}Dto}  from '../../../../../../controller/model/${pojo.name}Dto';
import  {${pojo.name}Card}  from '../../../../../../zynerator/${pojo.name}Card';


const ${pojo.name}${role.name?cap_first}List: React.FC = () =>  {

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

    <#list pojo.fields as field>
        <#if field.list && !field.association>
    const handleAdd${field.name?cap_first} = (data: PurchaseItemDto) => {
        if (data && selectedProduct.code) {
            const newPurchaseItem: PurchaseItemDto = { price: data.price, quantity: data.quantity, product: selectedProduct, purchase: undefined
            };
            setPurchaseItems((prevItems) => [...prevItems, newPurchaseItem]);
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
                if (i === editIndex) {
                item.price = data.price;
                item.quantity = data.quantity;
                item.product = selectedProduct;
                }
            });
            resetItem({ price: null, quantity: null, });
            setSelectedProduct({ code: '', reference: 'Select a Product' });
            setIsEditMode(false);
        }
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    }
        </#if>
    </#list>



return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >${pojo.name} List</Text>

        <View style={{ marginBottom: 100 }}>
            {${pojo.name?uncap_first}s && p${pojo.name?uncap_first}s.length > 0 ? ( ${pojo.name?uncap_first}s.map((${pojo.name?uncap_first}) => (
                <${pojo.name}Card key={${pojo.name?uncap_first}.id}
                    <#list pojo.fields as field>
                        <#if field.simple && field.id == false>
                    ${pojo.name?uncap_first} = {${pojo.name?uncap_first}.${field.name}}
                        <#elseif field.generic && !field.notVisibleInCreatePage>
                    ${pojo.name?uncap_first} = {${pojo.name?uncap_first}.<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>}
                        </#if>
                    </#list>
                    onPressDelete={() => handleDeletePress(${pojo.name?uncap_first}.id)}
                    onUpdate={() => handleFetchAndUpdate(${pojo.name?uncap_first}.id)}
                    onDetails={() => handleFetchAndDetails(${pojo.name?uncap_first}.id)}
                />
                )) ) : (
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No ${pojo.name?uncap_first}s found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'${pojo.name}'} />

    </ScrollView>

);
};

export default ${pojo.name}${role.name?cap_first}List;
