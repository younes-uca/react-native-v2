import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {${pojo.name}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${pojo.name}${role.name?cap_first}Service';
import  {${pojo.name}Dto}  from '../../../../../../controller/model/${pojo.name}Dto';
import  {${pojo.name}${role.name?cap_first}Card}  from './${pojo.name}Card';


const ${pojo.name}${role.name?cap_first}List: React.FC = () =>  {

    const [${pojo.name?uncap_first}s, set${pojo.name}s] = useState<${pojo.name}Dto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ${pojo.name}Response = AxiosResponse<${pojo.name}Dto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [${pojo.name?uncap_first}Id, set${pojo.name}Id] = useState(0);

    const handleDeletePress = (id: number) => {
        set${pojo.name}Id(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await ${pojo.name}${role.name?cap_first}Service.deleteById(${pojo.name?uncap_first}Id);
            set${pojo.name}s((prev${pojo.name}s) => prev${pojo.name}s.filter((${pojo.name?uncap_first}) => ${pojo.name?uncap_first}.id !== ${pojo.name?uncap_first}Id));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting ${pojo.formatedName?uncap_first}:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [<#list pojo.fieldsGenericIncludingInnerTypeInListFieldWithCondition as fieldGeneric>${fieldGeneric.name?uncap_first}sResponse <#if fieldGeneric?index != pojo.fieldsGenericIncludingInnerTypeInListFieldWithCondition?size -1>,</#if></#list>] = await Promise.all<${pojo.name}Response>([
            ${pojo.name}${role.name?cap_first}Service.getList(),
            ]);
        <#list pojo.fieldsGenericIncludingInnerTypeInListFieldWithCondition as fieldGeneric>
            set${pojo.name}s(${fieldGeneric.name?uncap_first}sResponse.data);
        </#list>
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const handleFetchAndUpdate = async (id: number) => {
        try {
            const ${pojo.name?uncap_first}Response = await ${pojo.name}${role.name?cap_first}Service.findById(id);
            const ${pojo.name?uncap_first}Data = ${pojo.name?uncap_first}Response.data;
            navigation.navigate('${pojo.name}Update', { ${pojo.name?uncap_first}: ${pojo.name?uncap_first}Data });
        } catch (error) {
            console.error('Error fetching ${pojo.formatedName?uncap_first} data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const ${pojo.name?uncap_first}Response = await ${pojo.name}${role.name?cap_first}Service.findById(id);
            const ${pojo.name?uncap_first}Data = ${pojo.name?uncap_first}Response.data;
            navigation.navigate('${pojo.name?uncap_first}Details', { ${pojo.name?uncap_first}: ${pojo.name?uncap_first}Data });
        } catch (error) {
            console.error('Error fetching ${pojo.formatedName?uncap_first} data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >${pojo.formatedName} List</Text>

        <View style={{ marginBottom: 100 }}>
            {${pojo.name?uncap_first}s && p${pojo.name?uncap_first}s.length > 0 ? ( ${pojo.name?uncap_first}s.map((${pojo.name?uncap_first}) => (
                <${pojo.name}${role.name?cap_first}Card key={${pojo.name?uncap_first}.id}
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
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No ${pojo.formatedName?uncap_first}s found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'${pojo.name}'} />

    </ScrollView>

);
};

export default ${pojo.name}${role.name?cap_first}List;
