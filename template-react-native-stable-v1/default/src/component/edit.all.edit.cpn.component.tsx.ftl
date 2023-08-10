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

import {${pojo.name}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${pojo.name}${role.name?cap_first}Service.service';
import  {${pojo.name?cap_first}Dto}  from '../../../../../../controller/model/${pojo.name?cap_first}.model';

<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name?cap_first}Dto} from '../../../../../../controller/model/${dependency.name?cap_first}.model';
import {${dependency.name?cap_first}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${dependency.name?cap_first}${role.name?cap_first}Service.service';
        </#if>
    </#list>
</#if>

type ${pojo.name}UpdateScreenRouteProp = RouteProp<{ ${pojo.name}Update: { ${pojo.name?uncap_first}: ${pojo.name}Dto } }, '${pojo.name}Update'>;

type Props = { route: ${pojo.name}UpdateScreenRouteProp; };

const ${pojo.name}${role.name?cap_first}Edit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { ${pojo.name?uncap_first} } = route.params;


    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const empty${fieldGeneric.name?cap_first} = new ${fieldGeneric.typeAsPojo.name}Dto();
    const [${fieldGeneric.name}s, set${fieldGeneric.name?cap_first}s] = useState<${fieldGeneric.typeAsPojo.name}Dto[]>([]);
    const [${fieldGeneric.name}ModalVisible, set${fieldGeneric.name?cap_first}ModalVisible] = useState(false);
    const [selected${fieldGeneric.name?cap_first}, setSelected${fieldGeneric.name?cap_first}] = useState<${fieldGeneric.name?cap_first}Dto>(empty${fieldGeneric.name?cap_first});

    </#list>

    const service = new ${pojo.name}${role.name?cap_first}Service();
    <#if  pojo.dependencies??>
        <#list pojo.dependencies as dependency>
            <#if dependency?? && dependency.name??>
    const ${dependency.name?uncap_first}${role.name?cap_first}Service = new ${dependency.name}${role.name?cap_first}Service();
            </#if>
        </#list>
    </#if>

      <#list pojo.fields as field>
        <#if field.list && !field.association>
    const [${field.name?uncap_first}Elements, set${field.name?cap_first}Elements] = useState<${field.typeAsPojo.name}Dto[]>([]);
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto>(new ${field.typeAsPojo.name}Dto());
    const [isEditMode${field.name?cap_first}, setIsEditMode${field.name?cap_first}] = useState(false);
    const [editIndex${field.name?cap_first}, setEditIndex${field.name?cap_first}] = useState(null);

    const [is${field.name?cap_first}ElementCollapsed, setIs${field.name?cap_first}ElementCollapsed] = useState(true);
    const [is${field.name?cap_first}ElementsCollapsed, setIs${field.name?cap_first}ElementsCollapsed] = useState(true);
    const [is${field.name?cap_first}, setIs${field.name?cap_first}] = useState(false);
    const [isEdit${field.name?cap_first}Mode, setIsEdit${field.name?cap_first}Mode] = useState(false);

        <#elseif field.list && field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto[]>(new Array<${field.typeAsPojo.name}Dto>());
            </#if>
      </#list>

    const { control, handleSubmit } = useForm<${pojo.name}Dto>({
        defaultValues: {
    <#list pojo.fields as field>
        ${field.name}: ${pojo.name?uncap_first}.${field.name} ,
        <#elseif field.simple && !field.id>
            ${field.name}: ${pojo.name?uncap_first}.${field.name} ,
        </#if>
    </#list>
        },
    });



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


    const handleUpdate = async (item: ${pojo.name}Dto) => {
    <#list pojo.fields as field>
        <#if field.generic>
        item.${field.name} = selected${field.name?cap_first};
        </#if>
    </#list>
        Keyboard.dismiss();
        console.log('Data to be updated:', item);
        try {
            await ${pojo.name?uncap_first}${role.name?cap_first}Service.update(item);
            navigation.navigate('${pojo.name}');
        } catch (error) {
            console.error('Error saving ${pojo.formatedName?uncap_first}:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Update ${pojo.formatedName?cap_first}</Text>

    <#list pojo.fields as field>
        <#if field.simple && !field.notVisibleInCreatePage>
            <#if  field.large>
            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="default" />
            <#elseif field.pureString>
            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="default" />
            <#elseif field.nombre == false>
            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="numeric" />
            </#if>
        <#elseif field.generic && !field.notVisibleInCreatePage && field.typeAsPojo.name != pojo.name>

            <TouchableOpacity onPress={() => set${field.name?cap_first}ModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selected${field.name?cap_first}.<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>
        </#if>
    </#list>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update ${pojo.formatedName?cap_first}"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />

    <#list pojo.fields as field>
        <#if field.generic>
        item.${field.name} = selected${field.name?cap_first};
        <FilterModal visibility={${field.name}ModalVisible} placeholder={"Select a ${field.name?cap_first}"} onItemSelect={on${field.name?cap_first}Select} items={${field.name}s} onClose={handleCloseModal} variable={'<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>'} />
        </#if>
    </#list>

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

export default ${pojo.name}${role.name?cap_first}Edit;
