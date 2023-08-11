import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {PurchaseDto}  from '../../../../../../controller/model/Purchase.model';

type PurchaseViewScreenRouteProp = RouteProp<{ PurchaseDetails: { purchase : PurchaseDto } }, 'PurchaseDetails'>;

type Props = { route: PurchaseViewScreenRouteProp; };

const PurchaseAdminView : React.FC<Props> = ({ route }) => {

    const { purchase } = route.params;
    const [isPurchaseCollapsed, setIsPurchaseCollapsed] = useState(false);

    const [isPurchaseItemsCollapsed, setIsPurchaseItemsCollapsed] = useState(true);

    const purchaseItemsCollapsible = () => {
        setIsPurchaseItemsCollapsed(!isPurchaseItemsCollapsed);
    };

    const purchaseCollapsible = () => {
        setIsPurchaseCollapsed(!isPurchaseCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={purchaseCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Purchase</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPurchaseCollapsed}>

                <View style={styles.itemCard}>

                    <View>

                        <Text style={styles.infos}>Id: {purchase.id}</Text>
                        <Text style={styles.infos}>Reference: {purchase.reference}</Text>
                        <Text style={styles.infos}>Image: {purchase.image}</Text>
                        <Text style={styles.infos}>Total: {purchase.total}</Text>
                        <Text style={styles.infos}>Description: {purchase.description}</Text>
                        <Text style={styles.infos}>Client: {purchase.client.fullName}</Text>

                    </View>

                </View>

            </Collapsible>

            <TouchableOpacity onPress={purchaseItemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Purchase items</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPurchaseItemsCollapsed}>

                {purchase.purchaseItems && purchase.purchaseItems.length > 0 ? ( purchase.purchaseItems.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>Product: {item.product.reference}</Text>
                            <Text style={styles.infos}>Price : {item.price}</Text>
                            <Text style={styles.infos}>Quantity : {item.quantity}</Text>

                        </View>
                    </View>
                    )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No purchase items</Text>
                    </View>
                )}

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

export default PurchaseAdminView;