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

const ${pojo.name}${role.name?cap_first}Create = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [is${pojo.name}Collapsed, setIs${pojo.name}Collapsed] = useState(true);

    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const [${fieldGeneric.name}s, set${fieldGeneric.name?cap_first}s] = useState<${fieldGeneric.typeAsPojo.name}Dto[]>([]);
    const [${fieldGeneric.name}ModalVisible, set${fieldGeneric.name?cap_first}ModalVisible] = useState(false);
    const [selected${fieldGeneric.name?cap_first}, setSelected${fieldGeneric.name?cap_first}] = useState<${fieldGeneric.name?cap_first}Dto>({<#list fieldGeneric.typeAsPojo.fields as innerField><#if innerField.name == fieldGeneric.typeAsPojo.labelOrReferenceOrId.name>${innerField.name} : 'select a ${fieldGeneric.formatedName}',<#elseif innerField.dateTime>${innerField.name} : undefined ,<#elseif innerField.pureString || innerField.large>${innerField.name} : '' ,<#elseif innerField.simple >${innerField.name} : null ,</#if></#list> });

    </#list>

    <#if  pojo.dependencies??>
        <#list pojo.dependencies as dependency>
            <#if dependency?? && dependency.name??>
    const ${dependency.name?uncap_first}${role.name?cap_first}Service = new ${dependency.name}${role.name?cap_first}Service();
            </#if>
        </#list>
    </#if>

      <#list pojo.fields as field>
        <#if field.list && !field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto>(new ${field.typeAsPojo.name}Dto());
    const [isEditMode${field.name?cap_first}, setIsEditMode${field.name?cap_first}] = useState(false);
    const [editIndex${field.name?cap_first}, setEditIndex${field.name?cap_first}] = useState(null);

    const [is${field.name?cap_first}ItemCollapsed, setIs${field.name?cap_first}ItemCollapsed] = useState(false);
    const [is${field.name?cap_first}ItemsCollapsed, setIs${field.name?cap_first}ItemsCollapsed] = useState(false);
    const [is${field.name?cap_first}, setIs${field.name?cap_first}] = useState(false);
    const [isEdit${field.name?cap_first}Mode, setIsEdit${field.name?cap_first}Mode] = useState(false);

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
<#list pojo.fields as field>
    <#if field.list && !field.association>
        setIs${field.name?cap_first}ItemCollapsed(true);
        setIs${field.name?cap_first}ItemsCollapsed(true);
    </#if>
</#list>
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
        setIs${field.name?cap_first}ItemCollapsed(!is${field.name?cap_first}ItemCollapsed);
        setIs${pojo.name}Collapsed(true);
        setIs${field.name?cap_first}ItemsCollapsed(true);
    };

    const ${field.name}ItemsCollapsible = () => {
        setIs${field.name?cap_first}ItemsCollapsed(!is${field.name?cap_first}ItemsCollapsed);
        setIs${pojo.name}Collapsed(true);
        setIs${field.name?cap_first}ItemCollapsed(true);
    };


    const handleAdd${field.name?cap_first} = (data: ${field.typeAsPojo.name}Dto) => {
        if (data) {
            const new${field.typeAsPojo.name}: ${field.typeAsPojo.name}Dto = { <#list field.typeAsPojo.fields as innerField><#if innerField.generic && innerField.typeAsPojo.name == pojo.name >${innerField.name}: undefined ,<#elseif innerField.generic && innerField.name != pojo.name?uncap_first>${innerField.name}: selected${innerField.name?cap_first} , <#elseif innerField.simple && !innerField.id>${innerField.name}: data.${innerField.name} ,</#if></#list> };
            set${field.name?cap_first}((prevItems) => [...prevItems, new${field.typeAsPojo.name}]);
            resetItem({<#list field.typeAsPojo.fields as innerField><#if innerField.simple && !innerField.id><#if innerField.large || innerField.pureString>${innerField.name}: '' ,<#elseif innerField.nombre>${innerField.name}: null ,</#if></#if></#list>});
        <#list field.typeAsPojo.fields as innerField>
            <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
                setSelected${innerField.name?cap_first}({<#list innerField.typeAsPojo.fields as innerInnerField><#if innerInnerField.name == innerField.typeAsPojo.labelOrReferenceOrId.name>${innerInnerField.name} : 'select a ${innerField.formatedName}',<#elseif innerInnerField.dateTime>${innerInnerField.name} : undefined ,<#elseif innerInnerField.pureString || innerInnerField.large>${innerInnerField.name} : '' ,<#elseif innerInnerField.simple >${innerInnerField.name} : null ,</#if></#list>});
            </#if>
        </#list>
        }
    };

    const handleDelete${field.name?cap_first} = (index) => {
        const updatedItems = ${field.name}.filter((item, i) => i !== index);
        set${field.name?cap_first}(updatedItems);
    };

    const handleUpdate${field.name?cap_first} = (data: ${field.typeAsPojo.name?cap_first}Dto) => {
        if (data) {
            ${field.name}.map((item, i) => {
                if (i === editIndex${field.name?cap_first}) {
                    <#list field.typeAsPojo.fields as innerField>
                        <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
                    ${innerField.name}: undefined ;
                    item.${innerField.name} = selected${innerField.name?cap_first};
                        <#elseif innerField.simple && !innerField.id>
                    item.${innerField.name} = data.${innerField.name};
                        </#if>
                    </#list>
                }
            });
            resetItem({<#list field.typeAsPojo.fields as innerField><#if innerField.simple && !innerField.id><#if innerField.large || innerField.pureString>${innerField.name}: '' ,<#elseif innerField.nombre>${innerField.name}: null ,</#if></#if></#list>});
    <#list field.typeAsPojo.fields as innerField>
        <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
            setSelected${innerField.name?cap_first}({<#list innerField.typeAsPojo.fields as innerInnerField><#if innerInnerField.name == innerField.typeAsPojo.labelOrReferenceOrId.name>${innerInnerField.name} : 'select a ${innerField.formatedName}',<#elseif innerInnerField.dateTime>${innerInnerField.name} : undefined ,<#elseif innerInnerField.pureString || innerInnerField.large>${innerInnerField.name} : '' ,<#elseif innerInnerField.simple >${innerInnerField.name} : null ,</#if></#list> });
        </#if>
    </#list>
            setIsEditMode${field.name?cap_first}(false);
        }
        setIsI${field.name?cap_first}ItemsCollapsed(!is${field.name?cap_first}ItemsCollapsed);
        setIs${field.name?cap_first}ItemCollapsed(!is${field.name?cap_first}ItemCollapsed);
    }

    const updateFormDefaultValues${field.name?cap_first} = (index: number) => {
        let updated${field.typeAsPojo.name?cap_first}: ${field.typeAsPojo.name?cap_first}Dto;
        setEditIndex${field.name?cap_first}(index);
        setIsEditMode${field.name?cap_first}(true);
        ${field.name}.map((item, i) => {
            if (i === index) {
                updated${field.typeAsPojo.name?cap_first} = item;
            }
        });
        resetItem({<#list field.typeAsPojo.fields as innerField><#if innerField.simple && !innerField.id>${innerField.name}: updated${field.typeAsPojo.name?cap_first}.${innerField.name} ,</#if></#list>});
    <#list field.typeAsPojo.fields as innerField>
        <#if innerField.generic  && innerField.typeAsPojo.name != pojo.name>
        setSelected${innerField.name?cap_first}(updated${field.typeAsPojo.name?cap_first}.${innerField.name});
        </#if>
    </#list>
        setIs${field.name?cap_first}ItemsCollapsed(!is${field.name?cap_first}ItemsCollapsed);
        setIs${field.name?cap_first}ItemCollapsed(!is${field.name?cap_first}ItemCollapsed);
    };
        </#if>
    </#list>


    const handleSave = async (item: ${pojo.name}Dto) => {
    <#list pojo.fields as field>
        <#if field.list && !field.association>
        item.${field.name} = ${field.name};
        <#elseif field.generic>
        item.${field.name} = selected${field.name?cap_first};
        </#if>
    </#list>
        Keyboard.dismiss();
        try {
            await ${pojo.name}${role.name?cap_first}Service.save( item );
    <#list pojo.fields as field>
        <#if field.list && !field.association>
            setIs${field.name?cap_first}ItemsCollapsed(!is${field.name?cap_first}ItemsCollapsed);
        </#if>
    </#list>
            reset();
    <#list pojo.fields as field>
        <#if field.generic>
            setSelected${field.name?cap_first}({ <#list field.typeAsPojo.fields as innerField><#if innerField.name == field.typeAsPojo.labelOrReferenceOrId.name>${innerField.name} : 'select a ${field.formatedName}',<#elseif innerField.dateTime>${innerField.name} : undefined ,<#elseif innerField.pureString || innerField.large>${innerField.name} : '' ,<#elseif innerField.simple >${innerField.name} : null ,</#if></#list>});
        </#if>
    </#list>
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
    <#list pojo.fields as field>
        <#if field.list && !field.association>
            item.${field.name} = ${field.name};
            set${field.name?cap_first}([]);
        </#if>
    </#list>
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
                    <#elseif field.generic && !field.notVisibleInCreatePage && field.typeAsPojo.name != pojo.name>
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
            <TouchableOpacity onPress={${field.name}ItemCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add ${field.formatedName}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={is${field.name?cap_first}Collapsed}>
                <#list field.typeAsPojo.fields as innerField>
                    <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
                <TouchableOpacity onPress={() => set${innerField.name?cap_first}ModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selected${innerField.name?cap_first}.${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
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
            <TouchableOpacity onPress={${field.name}ItemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List ${field.formatedName}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={is${field.name?cap_first}ItemsCollapsed}>
                { ${field.name} && ${field.name}.length > 0 ? ( ${field.name}.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                             <#list field.typeAsPojo.fields as innerField>
                                 <#if innerField.simple && !innerField.id>
                            <Text style={styles.infos}>'${innerField.formatedName}: {item.${innerField.name}}</Text>
                                 <#elseif innerField.generic && innerField.typeAsPojo != pojo.name>
                            <Text style={styles.infos}>'${innerField.formatedName}: {item.${innerField.name}.${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
                                 </#if>
                            </#list>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDelete${field.name?cap_first}(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValues${field.name?cap_first}(index)}>
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
