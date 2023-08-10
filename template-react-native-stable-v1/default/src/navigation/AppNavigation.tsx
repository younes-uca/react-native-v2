import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../component/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import AboutScreen from '../component/AboutScreen';
import CustomDrawer from '../zynerator/CustomDrawer/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PurchaseAdminView from '../component/admin/view/core/purchase/view/PurchaseAdminView';
import PurchaseAdminList from '../component/admin/view/core/purchase/list/purchase-list-admin.component';
import PurchaseAdminCreate from '../component/admin/view/core/purchase/create/purchase-create-admin.component';
import Purchase from '../component/admin/view/core/purchase/Purchase';
import PurchaseAdminEdit from '../component/admin/view/core/purchase/edit/purchase-edit-admin.component';

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

            <#list role.menuRoles as menuRole>
            <Drawer.Screen name="${menuRole.menu.pojo.name}" component={${menuRole.menu.pojo.name}}  options={{ drawerIcon: ({ color }) => ( <Ionicons name="cart-outline" size={22} color={color} /> ), }}/>
        </#list>

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


                <#list role.menuRoles as menuRole>

                {/*     <Stack.Screen
          name="${menuRole.menu.pojo.name}Details"
          component={${menuRole.menu.pojo.name}AdminView}
          options={({  }) => ({ headerTitle: '${menuRole.menu.pojo.name}Details'  })}
      />*/}

                <Stack.Screen
                    name="${menuRole.menu.pojo.name}List"
                    component={PurchaseAdminList}
                    options={{ title: '${menuRole.menu.pojo.name}List' }}
                />

                <Stack.Screen
                    name="${menuRole.menu.pojo.name}Create"
                    component={PurchaseAdminCreate}
                    options={{ title: '${menuRole.menu.pojo.name}Create' }}
                />

                <Stack.Screen
                    name="${menuRole.menu.pojo.name}Update"
                    component={${menuRole.menu.pojo.name}AdminEdit}
                />
            </#list>


        </Stack.Navigator>
</NavigationContainer>
);
}

export default AppNavigation;