import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';

import  {ProductDto}  from '../../../../../../controller/model/Product.model';

type ProductUpdateScreenRouteProp = RouteProp<{ ProductDetails: { product : ProductDto } }, 'ProductDetails'>;

type Props = { route: ProductUpdateScreenRouteProp; };

const ProductAdminEdit: React.FC<Props> = ({ route }) => {

    const { product } = route.params;
    const [isProductCollapsed, setIsProductCollapsed] = useState(false);



    const productCollapsible = () => {
        setIsProductCollapsed(!isProductCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={productCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Product</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isProductCollapsed}>

                <View style={styles.itemCard}>

                    <View>

                        <Text style={styles.infos}>Id: {product.id}</Text>
                        <Text style={styles.infos}>Code: {product.code}</Text>
                        <Text style={styles.infos}>Reference: {product.reference}</Text>

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

export default ProductAdminView;