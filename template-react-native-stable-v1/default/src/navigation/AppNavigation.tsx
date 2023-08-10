import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../component/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import AboutScreen from '../component/AboutScreen';
import CustomDrawer from '../zynerator/CustomDrawer/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PurchaseAdmin from "../component/admin/view/purchase/purchase/container/purchase-container-admin.component";
import PurchaseAdminList from "../component/admin/view/purchase/purchase/list/purchase-list-admin.component";
import PurchaseAdminCreate from "../component/admin/view/purchase/purchase/create/purchase-create-admin.component";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function DrawerNavigation() {
    return (

        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#ffa500',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontWeight: 'bold',
                    fontSize: 15,
                },
            }}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Purchase"
                component={PurchaseAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
                    ),
                }}
            />

        </Drawer.Navigator>

    );
}

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="DrawerNavigation"
                    component={DrawerNavigation}
                    options={{ headerShown: false }}
                />


                <Stack.Screen
                    name="PurchaseList"
                    component={PurchaseAdminList}
                    options={{ title: 'PurchaseList' }}
                />

                <Stack.Screen
                    name="PurchaseCreate"
                    component={PurchaseAdminCreate}
                    options={{ title: 'PurchaseCreate' }}
                />




            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;