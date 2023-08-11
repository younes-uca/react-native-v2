import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {ClientCategoryDto}  from '../../../../../../controller/model/ClientCategory.model';

type ClientCategoryUpdateScreenRouteProp = RouteProp<{ ClientCategoryDetails: { clientCategory : ClientCategoryDto } }, 'ClientCategoryDetails'>;

type Props = { route: ClientCategoryUpdateScreenRouteProp; };

const ClientCategoryAdminEdit: React.FC<Props> = ({ route }) => {

    const { clientCategory } = route.params;
    const [isClientCategoryCollapsed, setIsClientCategoryCollapsed] = useState(false);



    const clientCategoryCollapsible = () => {
        setIsClientCategoryCollapsed(!isClientCategoryCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={clientCategoryCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Client category</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isClientCategoryCollapsed}>

                <View style={styles.itemCard}>

                    <View>

                        <Text style={styles.infos}>Id: {clientCategory.id}</Text>
                        <Text style={styles.infos}>Reference: {clientCategory.reference}</Text>
                        <Text style={styles.infos}>Code: {clientCategory.code}</Text>

                    </View>

                </View>

            </Collapsible>


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

export default ClientCategoryAdminView;