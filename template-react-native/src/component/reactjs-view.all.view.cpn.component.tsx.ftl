import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import {TabView, TabPanel} from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import {MultiSelect} from 'primereact/multiselect';
import  {${pojo.name?cap_first}Dto}  from 'app/controller/model/${pojo.name?cap_first}.model';
import {TFunction} from "i18next";

type ${pojo.name?cap_first}View${role.name?cap_first}Type = {
    visible: boolean,
    onClose: () => void,
    selectedItem: ${pojo.name?cap_first}Dto,
    t: TFunction
}

const View: React.FC<${pojo.name?cap_first}View${role.name?cap_first}Type> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new ${pojo.name}Dto();
    const [item, setItem] = useState<${pojo.name}Dto>(selectedItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const onTabChange = (e: { index: number }) => {
        setActiveIndex(e.index);
    };

    const hideDialog = () => {
        setSubmitted(false);
        onClose();
    };

    const itemDialogFooter = ( <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} /></>
    );

    <#if pojo.hasDate || pojo.hasDateTime>
    const formateDate = (field: string) => {
        return (rowData: any) => {
            if (rowData[field]) {
                return format(new Date(rowData[field]), "dd/MM/yyyy");
            }
        };
    };

    const parseToIsoFormat =(date: Date) => {
        return parse(date.toISOString(),"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date())
    };

    const adaptDate = (field: null | Date) => {
        return field == null? null: new Date(field)
    };
    </#if>
return(
<Dialog visible={visible} style={{width: '70vw'}} header=${pojo.tabPanelI18nCreate} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header=${pojo.tabPanelI18nCreate}>
    <div className="formgrid grid">
        <#list pojo.fields as field>
        <#if field.simple && !field.notVisibleInCreatePage>
        <#if  field.type.simpleName == "Date" || field.dateTime>
        <div className="field col-6">
            <label htmlFor="${field.name}">${field.name18nCreate}</label>
            <Calendar id="${field.name}" value={adaptDate(selectedItem?.${field.name})} disabled dateFormat="dd/mm/yy" showIcon={true}  />
        </div>
        <#elseif  field.large>
            <div className="field col-6">
                <label htmlFor="${field.name}">${field.name18nCreate}</label>
                <span className="p-float-label">
                   <InputTextarea id="${field.name?uncap_first}" value={selectedItem?.${field.name}} disabled rows={5} cols={30} />
                </span>
            </div>
        <#elseif field.pureString>
            <div className="field col-6">
                <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                <InputText id="${field.name?uncap_first}" value={selectedItem?.${field.name?uncap_first}} disabled   />
            </div>
        <#elseif field.type.simpleName == "Boolean">
        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="${field.name}" checked={selectedItem?.${field.name}} disabled />
                    </span>
            </div>
            </div>
            <#elseif field.id == false>
                <div className="field col-6">
                    <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                    <InputNumber id="${field.name?uncap_first}" value={item.${field.name?uncap_first}} disabled/>
                </div>
            </#if>

            <#elseif field.generic && !field.notVisibleInCreatePage>
                <div className="field col-6">
                    <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                    <InputText  id="${field.name?uncap_first}Dropdown"  value={<#if field.typeAsPojo??>selectedItem?.${field.name}?.${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>}  disabled  />
                </div>
            </#if>
            </#list>
        </div>
</TabPanel>
<#list pojo.fields as field>
    <#if field.list && (field.associationComplex || field.fakeAssociation)>
    <TabPanel header=${field.name18nCreate}>
                <div className="card">
                    <DataTable value={selectedItem?.${field.name?uncap_first}} tableStyle={{minWidth: '50rem'}} dataKey="id">
                    <#list field.typeAsPojo.fields as myField>
                        <#if myField.simple && !myField.notVisibleInCreatePage>
                            <#if !myField.id>
                                <Column field="${myField.name}" header=${myField.name18nCreate}  <#if myField.dateTime>body={formateDate("${myField.name}")}</#if> ></Column>
                            </#if>
                        <#elseif myField.generic && !myField.notVisibleInCreatePage>
                            <#if myField.typeAsPojo.name != pojo.name>
                                <Column field="${myField.name}.${myField.typeAsPojo.labelOrReferenceOrId.name!'walo'}" header=${myField.name18nCreate}></Column>
                            </#if>
                        <#else>
                        </#if>
                    </#list>
                    </DataTable>
                </div>
        </TabPanel>
    </#if>
</#list>
</TabView>
</Dialog>
);
};
export default View;
