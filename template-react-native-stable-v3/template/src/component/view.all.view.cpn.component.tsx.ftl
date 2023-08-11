import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {${pojo.name}Dto}  from '../../../../../../controller/model/${pojo.name?cap_first}.model';

type ${pojo.name}ViewScreenRouteProp = RouteProp<{ ${pojo.name}Details: { ${pojo.name?uncap_first} : ${pojo.name}Dto } }, '${pojo.name}Details'>;

type Props = { route: ${pojo.name}ViewScreenRouteProp; };

const ${pojo.name}${role.name?cap_first}View: React.FC<Props> = ({ route }) => {

    const { ${pojo.name?uncap_first} } = route.params;
    const [is${pojo.name}Collapsed, setIs${pojo.name}Collapsed] = useState(false);

    <#list pojo.fields as field>
        <#if field.list && !field.association>
    const [is${field.name?cap_first}Collapsed, setIs${field.name?cap_first}Collapsed] = useState(true);
        </#if>
    </#list>

    <#list pojo.fields as field>
        <#if field.list && !field.association>
    const ${field.name}Collapsible = () => {
        setIs${field.name?cap_first}Collapsed(!is${field.name?cap_first}Collapsed);
    };
        </#if>
    </#list>

    const ${pojo.name?uncap_first}Collapsible = () => {
        setIs${pojo.name}Collapsed(!is${pojo.name}Collapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={${pojo.name?uncap_first}Collapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>${pojo.formatedName?cap_first}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={is${pojo.name}Collapsed}>

                <View style={styles.itemCard}>

                    <View>

            <#list pojo.fields as field>
                <#if field.simple && !field.notVisibleInCreatePage>
                        <Text style={styles.infos}>${field.formatedName?cap_first}: {${pojo.name?uncap_first}.${field.name}}</Text>
                <#elseif field.generic && !field.notVisibleInCreatePage && field.typeAsPojo.name != pojo.name>
                        <Text style={styles.infos}>${field.formatedName?cap_first}: {${pojo.name?uncap_first}.${field.name}.<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>}</Text>
                </#if>
            </#list>

                    </View>

                </View>

            </Collapsible>

            <#list pojo.fields as field>
            <#if  field.list && !field.association>
            <TouchableOpacity onPress={${field.name}Collapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>${field.formatedName?cap_first}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={is${field.name?cap_first}Collapsed}>

                {${pojo.name?uncap_first}.${field.name} && ${pojo.name?uncap_first}.${field.name}.length > 0 ? ( ${pojo.name?uncap_first}.${field.name}.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                    <#list field.typeAsPojo.fields as innerField>
                        <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
                            <Text style={styles.infos}>${innerField.formatedName}: {item.${innerField.name}.${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
                        </#if>
                        <#if innerField.simple && !innerField.id>
                            <Text style={styles.infos}>${innerField.formatedName} : {item.${innerField.name}}</Text>
                        </#if>
                    </#list>

                        </View>
                    </View>
                    )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No ${field.formatedName?uncap_first}</Text>
                    </View>
                )}

            </Collapsible>
            </#if>
            </#list>

        </ScrollView>

    </View>
);
};

const styles = StyleSheet.create({
    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5,
        fontSize: 15,
        fontWeight: 'bold',
    },

    itemCard: {
        marginVertical: 5,
        backgroundColor: '#f8f8ff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ${pojo.name}${role.name?cap_first}View;