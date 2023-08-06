/* eslint-disable @next/next/no-img-element */

import AppMenuitem from '/layout/AppMenuitem';
import {MenuProvider} from '/layout/context/menucontext';
import {AppMenuItem} from '/types/types';
import {AuthService} from 'app/zynerator/security/Auth.service';
import React, {useEffect, useState} from 'react';


const AppMenu = () => {

    const [model,setModel] = useState<AppMenuItem[]>([] as AppMenuItem[]);
    const authService = new AuthService();
    <#list roles as role>
    const model${role.name?cap_first}: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard'}]
        },


        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '',
            items: [

                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            to: '/auth/error'
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            to: '/auth/access'
                        }
                    ]
                },
                <#list role.menuRoles as menuRole>
                {
                    label: '${menuRole.menu.libelle}',
                    icon: '${menuRole.menu.pojo.icon}',
                    items: [
                    <#list menuRole.menu.menuItems as menuItem>
                      {
                      label: '${menuItem.libelle}',
                     to: '/${role.name}/view/${menuItem.pojo.subModule.name}/${menuItem.pojo.formatedUrl}/list'
                      },
                    </#list>
                    ]
                    },
                </#list>
            ]
        },

    ];
</#list>

    useEffect(()=>{
        const roleConnectedUser = authService.getRoleConnectedUser();
        <#list roles as role>
        if(roleConnectedUser === 'ROLE_${role.name?upper_case}'){
            setModel(model${role.name?cap_first})
        }
        </#list>
    },[])

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label}/> :
                        <li className="menu-separator"></li>;
                })}


            </ul>
        </MenuProvider>
    );
};


export default AppMenu;
