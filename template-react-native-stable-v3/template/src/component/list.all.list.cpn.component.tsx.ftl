import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';

import {${pojo.name}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${pojo.name}${role.name?cap_first}Service.service';
import  {${pojo.name}Dto}  from '../../../../../../controller/model/${pojo.name}.model';
import ${pojo.name}${role.name?cap_first}Card from "../card/${pojo.formatedUrl}-card-${role.name?uncap_first}.component";


const ${pojo.name}${role.name?cap_first}List: React.FC = () =>  {

    const [${pojo.name?uncap_first}s, set${pojo.name}s] = useState<${pojo.name}Dto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ${pojo.name}Response = AxiosResponse<${pojo.name}Dto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [${pojo.name?uncap_first}Id, set${pojo.name}Id] = useState(0);

    const service = new ${pojo.name}${role.name?cap_first}Service();

    const handleDeletePress = (id: number) => {
        set${pojo.name}Id(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(${pojo.name?uncap_first}Id);
            set${pojo.name}s((prev${pojo.name}s) => prev${pojo.name}s.filter((${pojo.name?uncap_first}) => ${pojo.name?uncap_first}.id !== ${pojo.name?uncap_first}Id));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting ${pojo.formatedName?uncap_first}:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [${pojo.name?uncap_first}Response] = await Promise.all<${pojo.name}Response>([
            service.getList(),
            ]);
            set${pojo.name?cap_first}s(${pojo.name?uncap_first}Response.data);
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
            const ${pojo.name?uncap_first}Response = await service.find(id);
            const ${pojo.name?uncap_first}Data = ${pojo.name?uncap_first}Response.data;
            navigation.navigate('${pojo.name}Update', { ${pojo.name?uncap_first}: ${pojo.name?uncap_first}Data });
        } catch (error) {
            console.error('Error fetching ${pojo.formatedName?uncap_first} data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const ${pojo.name?uncap_first}Response = await service.find(id);
            const ${pojo.name?uncap_first}Data = ${pojo.name?uncap_first}Response.data;
            //navigation.navigate('${pojo.name?uncap_first}Details', { ${pojo.name?uncap_first}: ${pojo.name?uncap_first}Data });
        } catch (error) {
            console.error('Error fetching ${pojo.formatedName?uncap_first} data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

        <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, }} >${pojo.formatedName} List</Text>

        <View style={{ marginBottom: 100 }}>
            {${pojo.name?uncap_first}s && ${pojo.name?uncap_first}s.length > 0 ? ( ${pojo.name?uncap_first}s.map((${pojo.name?uncap_first}) => (
                <${pojo.name}${role.name?cap_first}Card key={${pojo.name?uncap_first}.id}
                    <#list pojo.fields as field>
                        <#if field.simple && field.id == false>
                    ${field.name} = {${pojo.name?uncap_first}.${field.name}}
                        <#elseif field.generic && !field.notVisibleInCreatePage>
                    ${field.name}Name = {${pojo.name?uncap_first}.${field.name}.${field.typeAsPojo.labelOrReferenceOrId.name}}
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
