import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {TabView, TabPanel} from 'primereact/tabview';
<#if pojo.hasList>
import {DataTable} from 'primereact/datatable';
</#if>
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import {InputSwitch, InputSwitchChangeEvent} from 'primereact/inputswitch';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
<#if pojo.uploadOne>
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
</#if>

import {MessageService} from 'app/zynerator/service/MessageService';

import {${pojo.name}${role.name?cap_first}Service} from 'app/controller/service/${role.name}/${pojo.name}${role.name?cap_first}Service.service';
import  {${pojo.name?cap_first}Dto}  from 'app/controller/model/${pojo.name?cap_first}.model';

<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name?cap_first}Dto} from 'app/controller/model/${dependency.name?cap_first}.model';
import {${dependency.name?cap_first}${role.name?cap_first}Service} from 'app/controller/service/${role.name}/${dependency.name?cap_first}${role.name?cap_first}Service.service';
        </#if>
    </#list>
</#if>
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

type ${pojo.name?cap_first}Create${role.name?cap_first}Type = {
    visible: boolean,
    onClose: () => void,
    add: (item: ${pojo.name}Dto) => void,
    showToast: React.Ref<Toast>,
    list: ${pojo.name}Dto[],
    t: TFunction
}
const Create: React.FC<${pojo.name?cap_first}Create${role.name?cap_first}Type> = ({visible, onClose, add, showToast, list, t}) => {

    const emptyItem = new ${pojo.name}Dto();
    const [items, setItems] = useState<${pojo.name?cap_first}Dto[]>(list);
    const [item, setItem] = useState<${pojo.name?cap_first}Dto>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);

    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const [${fieldGeneric.name}s, set${fieldGeneric.name?cap_first}s] = useState<${fieldGeneric.typeAsPojo.name}Dto[]>([]);
    </#list>

      <#list pojo.fields as field>
        <#if field.list && !field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto>(new ${field.typeAsPojo.name}Dto());
        <#elseif field.list && field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto[]>(new Array<${field.typeAsPojo.name}Dto>());
            </#if>
      </#list>

    useEffect(() => {

        <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
        ${fieldGeneric.typeAsPojo.name}${role.name?cap_first}Service.getList().then(({data}) => set${fieldGeneric.name?cap_first}s(data)).catch(error => console.log(error));
        </#list>

        <#list pojo.fields as field>
            <#if field.list>
                <#if field.association>
        ${field.fieldOfAssociation.typeAsPojo.name}${role.name?cap_first}Service.getList().then(({data}) => {
            const ${field.name?cap_first} = data?.map(prepare${field.typeAsPojo.name})
            set${field.name?cap_first}(${field.name})
        })
                </#if>

            <#list field.typeAsPojo.fieldsGeneric as fieldGeneric>
                <#if fieldGeneric.typeAsPojo.name != pojo.name>
        ${fieldGeneric.typeAsPojo.name}${role.name?cap_first}Service.getList().then(({data}) => set${fieldGeneric.name?cap_first}s(data)).catch(error => console.log(error));
                </#if>
            </#list>
            <#list field.typeAsPojo.fields as innerField>
                <#if innerField.list && innerField.association>
        ${innerField.fieldOfAssociation.typeAsPojo.name?uncap_first}${role.name?cap_first}Service.getList().then(({data}) => {
            const ${innerField.name?cap_first} = data?.map(prepare${innerField.typeAsPojo.name})
            set${innerField.name?cap_first}(${innerField.name})
        })
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


    const onDropdownChange = (e: DropdownChangeEvent, field: string) => {
        setItem((prevState) => ({ ...prevState, [field]: e.value}));
    };

    <#list pojo.fields as field>
      <#if field.list && !field.association>
    const add${field.name?cap_first} = () => {
        setSubmitted(true);
        if( item.${field.name?uncap_first} == null )
        item.${field.name} = new Array<${field.typeAsPojo.name?cap_first}Dto>();
        let _item = ${field.name};
        if (!_item.id) {
            item.${field.name}.push(_item);
            MessageService.showSuccess(showToast, '${field.name?cap_first} Created');
            setItem((prevState :any) => ({...prevState, ${field.name}: item.${field.name} }));
        } else {
            const updatedItems = item.${field.name}.map((item) => item.id === ${field.name?uncap_first}.id ? {...${field.name?uncap_first}} : item);
            MessageService.showSuccess(showToast,'${field.name?cap_first} Updated');
            setItem((prevState :any) => ({ ...prevState, ${field.name}: updatedItems}));
        }
        set${field.name?cap_first}(new ${field.typeAsPojo.name}Dto());
    };

    const delete${field.name?cap_first} = (rowData: any) => {
        const updatedItems = item.${field.name}.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState,${field.name}: updatedItems }));
        set${field.name?cap_first}(new ${field.typeAsPojo.name}Dto());
        MessageService.showSuccess(showToast, '${pojo.name?cap_first}Item Deleted');
    };

    const edit${field.name?cap_first} = (rowData: any) => {
         setActiveTab(0);
         set${field.name?cap_first}(rowData);

    };

    const onInputNumerChange${field.name?cap_first} = (e: any, name: string) => {
         const val = e.value || 0;
         set${field.name?cap_first}((prev${field.name?cap_first}) => ({...prev${field.name?cap_first}, [name]: val, }));
    };
    const onDropdownChange${field.name?cap_first} = (e: any, field: string) => {
        set${field.name?cap_first}((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onBooleanInputChange${field.name?cap_first} = (e: InputSwitchChangeEvent, name: string) => {
       const val = e.value;
       set${field.name?cap_first}((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChange${field.name?cap_first} = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        set${field.name?cap_first}({ ...${field.name}, [name]:val})
    };

    const onInputTextChange${field.name?cap_first} = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        set${field.name?cap_first}({ ...${field.name}, [name]:val})
    };
      </#if>
</#list>
    <#if pojo.hasDate || pojo.hasDateTime>
    const formateDate = (field: string) => {
        return (rowData: any) => {
            if (rowData[field]) {
            return format(new Date(rowData[field]), "dd/MM/yyyy");
            }
        };
    };
    </#if>
    const onTabChange = (e: { index: number }) => { setActiveIndex(e.index); };

    const hideDialog = () => {
        setSubmitted(false);
        onClose();
    };


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        <#list pojo.fields as field>
            <#if field.requierd>
        if(item.${field.name} == '')
            errorMessages.push("${field.name} is required")
            </#if>
        </#list>
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            ${pojo.name}${role.name?cap_first}Service.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, '${pojo.formatedName} Created');
                onClose();
                setSubmitted(false);
                });
        }
    };

    const onInputTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const value = (e.target && e.target.value) || '';
        setItem({ ...item, [name]: value });
    };

    const onInputDateChange = (e: CalendarChangeEvent, name: string) => {
        const value = (e.value) || '';
        setItem({ ...item, [name]: value });
    };

    const onInputNumerChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value === null ? null : +e.value;
        setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onMultiSelectChange = (e: MultiSelectChangeEvent, field: string) => {
        if (e && e.value) {
            setItem(prevState => ({...prevState, [field]: e.value,}));
        }
    };

    const onBooleanInputChange = (e: any, name: string) => {
       const val = e.value;
       setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" text onClick={saveItem} /> </>
    );

return(
    <#if pojo.createUpdateConfounded>
    <p-toast></p-toast>
    <div className="card">
        <message severity="{{info}}" text="{{msgsContents}}"></message>
    </div>
    <div className="p-fluid">
    <#else>
        <Dialog visible={visible} style={{width: '70vw'}} header=${pojo.tabPanelI18nCreate} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
    </#if>
    <#if pojo.steps>
    <div className="card">
        <p-toast></p-toast>
        <p-steps [model]="steps" [(activeIndex)]="next" [readonly]="true">
        </p-steps>
    </div>
    </#if>
    <#if pojo.steps>
    <#list pojo.steper.steps as myStep>
    <div *ngIf="next == ${myStep?index}">
    <div className="grid">
    <#list myStep.fields as field>
    <#if field.list && field.association>
    <div className="field col-12  md:col-${field.columnStyle}">
    <label>${field.fieldOfAssociation.name18nCreate}</label>
    <p-multiSelect [options]="${field.name}" [(ngModel)]="item.${field.name}" itemSize="30" [virtualScroll]="true"
    defaultLabel="Select un ${field.fieldOfAssociation.name}" optionLabel="${field.fieldOfAssociation.name}.${field.fieldOfAssociation.typeAsPojo.labelOrReferenceOrId.name}"  display="chip"></p-multiSelect>
    </div>
    <#elseif field.simple && !field.notVisibleInCreatePage>
    <#if  field.type.simpleName == "Date" || field.dateTime>
    <div className="field col-12 md:col-${field.columnStyle}">
    <label for="${field?index}">${field.name18nCreate!'walo'}<#if field.requierd><span style="color: red;">*</span></#if></label>
    <p-calendar appendTo="body" id="${field?index}"  showIcon={true} [showSeconds]="false" placeholder=${field.name18nCreate!'walo'}"  [(ngModel)]="item.${field.name}"
    dateFormat="{{dateFormat}}" <#if field.requierd>[ngClass]="{'ng-invalid ng-dirty' : !valid${pojo.name?cap_first}${field.name?cap_first}}" </#if> >
    </p-calendar>
    <#if field.requierd><small class='p-error' *ngIf='!valid${pojo.name?cap_first}${field.name?cap_first}'>${field.name?cap_first} est obligatoire.</small></#if>
    </div>
    <#elseif  field.large>
    <div className="field col-12 md:col-${field.columnStyle}">
    <label for="${field?index}">${field.name18nCreate!'walo'}<#if field.requierd><span style="color: red;">*</span></#if></label>
    <textarea id="${field?index}" pInputTextarea rows="5" cols="30" placeholder=${field.name18nCreate!'walo'}  [(ngModel)]="item.${field.name}"
    <#if field.requierd>[ngClass]="{'ng-invalid ng-dirty' : !valid${pojo.name?cap_first}${field.name?cap_first}}" </#if> ></textarea>
    <#if field.requierd><small class='p-error' *ngIf='!valid${pojo.name?cap_first}${field.name?cap_first}'>${field.name?cap_first} est obligatoire.</small></#if>
    </div>
    <#elseif field.pureString>
    <div className="field col-12 md:col-${field.columnStyle}">
    <label for="${field?index}">${field.name18nCreate!'walo'}<#if field.requierd><span style="color: red;">*</span></#if></label>
    <input className="mb-2 mr-2" type="text" pInputText  placeholder=${field.name18nCreate!'walo'} id="${field?index}" [(ngModel)]="item.${field.name}"
    <#if field.requierd>[ngClass]="{'ng-invalid ng-dirty' : !valid${pojo.name?cap_first}${field.name?cap_first}}" </#if> />
    <#if field.requierd><small class='p-error' *ngIf='!valid${pojo.name?cap_first}${field.name?cap_first}'>${field.name?cap_first} est obligatoire.</small></#if>
    </div>
    <#elseif field.uploadOne>
    <div className="field col-12 md:col-${field.columnStyle}">
    <label for="${field?index}">${field.name18nCreate!'walo'}<#if field.requierd><span style="color: red;">*</span></#if></label>
    <p-fileUpload name="files" [customUpload]="true" (uploadHandler)="uploadOne($event, 0)" [auto]="true" ></p-fileUpload>
    <#if field.requierd><small class='p-error' *ngIf='!valid${pojo.name?cap_first}${field.name?cap_first}'>${field.name?cap_first} est obligatoire.</small></#if>
    </div>
    <#elseif field.bool>
    <div className="field align-inputswitch col-12  md:col-${field.columnStyle}">
    <div  className="label-inputswitch">
    <label for="${field?index}">${field.name18nCreate!'walo'}<#if field.requierd><span style="color: red;">*</span></#if></label>
    </div>
    <div className="input-switch">
    <p-inputSwitch id="${field?index}"  [(ngModel)]="item.${field.name}"
    <#if field.requierd>[ngClass]="{'ng-invalid ng-dirty' : !valid${pojo.name?cap_first}${field.name?cap_first}}" </#if> >
    </p-inputSwitch>
    <#if field.requierd><small class='p-error' *ngIf='!valid${pojo.name?cap_first}${field.name?cap_first}'>${field.name?cap_first} est obligatoire.</small></#if>
    </div>
    </div>
    <#elseif field.id == false>
    <div className="field col-12 md:col-${field.columnStyle}">
    <label for="${field?index}">${field.name18nCreate!'walo'}<#if field.requierd><span style="color: red;">*</span></#if></label>
    <p-inputNumber className="mb-2 mr-2" id="${field?index}" placeholder=${field.name18nCreate!'walo'} [(ngModel)]="item.${field.name}" <#if field.requierd>[ngClass]="{'ng-invalid ng-dirty' : !valid${pojo.name?cap_first}${field.name?cap_first}}" </#if> >
    </p-inputNumber>
    <#if field.requierd><small class='p-error' *ngIf='!valid${pojo.name?cap_first}${field.name?cap_first}'>${field.name?cap_first} est obligatoire.</small></#if>
    </div>
    </#if>
    <#elseif field.generic && !field.notVisibleInCreatePage>
    <div className="field col-11 md:col-${field.columnStyle}">
    <label for="${field?index}">${field.name18nCreate!'walo'}<#if field.requierd><span style="color: red;">*</span></#if></label>
    <p-dropdown  appendTo="body"  [options]="${field.name}s" [(ngModel)]="item.${field.name}" id="${field?index}" [filter]="true" filterMatchMode="contains"
    [showClear]="true" optionLabel="<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>" placeholder=${field.name18nCreate!'walo'} <#if field.requierd>[ngClass]="{'ng-invalid ng-dirty' : !valid${pojo.name?cap_first}${field.name?cap_first}}" </#if> >
    </p-dropdown>
    <#if field.requierd><small class='p-error' *ngIf='!valid${pojo.name?cap_first}${field.name?cap_first}'>${field.name?cap_first} est obligatoire.</small></#if>
    </div>
    <#if !field.hidePlusButton>
    <div className="col-1">
    <label></label>
    <button pButton pRipple type="button" icon="pi pi-plus" (click)="openCreate${field.typeAsPojo.name?cap_first}('${field.name?cap_first}')" className="p-button-success one-colonne-btn-success-align"></button>
    </div>
    </#if>
    </#if>
    </#list>
    </div>
    </div>
    </#list>
    <#else>
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header=${pojo.tabPanelI18nCreate}>
                <div className="formgrid grid">
                    <#list pojo.fields as field>
                    <#if field.list && field.association>
                    <div className="field col-${field.columnStyle}">
                        <label htmlFor="${field.name}">${field.fieldOfAssociation.name18nCreate}</label>
                        <MultiSelect value={item.${field.name}} options={${field.name}}  optionLabel="${field.fieldOfAssociation.name}.${field.fieldOfAssociation.typeAsPojo.labelOrReferenceOrId.name}" display="chip" placeholder=${field.name18nPlaceHolderCreate}  maxSelectedLabels={3}  onChange={(e) => onMultiSelectChange(e, '${field.name}')} />
                    </div>
                    <#elseif field.simple && !field.notVisibleInCreatePage>
                    <#if  field.uploadOne>
                        <div className="field col-${field.columnStyle}">
                            <FileUpload name="${field.name}" url={"http://localhost:8037/minio/upload/file/ged"}
                                        maxFileSize={1000000} emptyTemplate={<p className="m-0">vous pouvez glisser deposer votre document</p>} />
                        </div>
                    <#elseif  field.type.simpleName == "Date" || field.dateTime>
                    <div className="field col-${field.columnStyle}">
                        <label htmlFor="${field.name}">${field.name18nCreate}</label>
                        <Calendar id="${field.name}" value={item.${field.name}} onChange={(e) => onInputDateChange(e, '${field.name}')} dateFormat="dd/mm/yy"  showIcon={true} />
                    </div>
                    <#elseif  field.large>
                    <div className="field col-${field.columnStyle}">
                        <label htmlFor="${field.name}">${field.name18nCreate}</label>
                        <span className="p-float-label">
                        <InputTextarea id="${field.name?uncap_first}" value={item.${field.name}} onChange={(e) => onInputTextChange(e, '${field.name}')} rows={5} cols={30}/>
                    </span>
                    </div>
                    <#elseif field.pureString>
                    <div className="field col-${field.columnStyle}">
                        <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                        <InputText id="${field.name?uncap_first}" value={item.${field.name?uncap_first}} onChange={(e) => onInputTextChange(e, '${field.name?uncap_first}')} required autoFocus className={classNames({'p-invalid': submitted && !item.${field.name?uncap_first}})} />
                        {submitted && !item.${field.name?uncap_first} && <small className="p-invalid">${field.name?cap_first} is required.</small>}
                    </div>
                    <#elseif field.bool>
                    <div className="field col-${field.columnStyle}">
                    <div  className="label-inputswitch">
                        <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="${field.name}" checked={item.${field.name}} onChange={(e) => onBooleanInputChange(e, '${field.name}')} />
                        </span>
                    </div>
                    </div>
                    <#elseif field.id == false>
                    <div className="field col-${field.columnStyle}">
                        <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                        <InputNumber id="${field.name?uncap_first}" value={item.${field.name?uncap_first}} onChange={(e) => onInputNumerChange(e, '${field.name?uncap_first}')} />
                    </div>
                    </#if>
                    <#elseif field.generic && !field.notVisibleInCreatePage>
                    <div className="field col-${field.columnStyle}">
                        <label htmlFor="${field.name?uncap_first}">${field.name18nCreate}</label>
                        <Dropdown  id="${field.name?uncap_first}Dropdown"  value={item.${field.name}} options={${field.name}s} onChange={(e) => onDropdownChange(e, '${field.name}')}   placeholder=${field.name18nPlaceHolderCreate} filter filterPlaceholder=${field.name18nPlaceHolderFilterCreate} optionLabel="<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>" />
                    </div>
                    </#if>
                    </#list>
                </div>
            </TabPanel>
            <#list pojo.fields as field>
            <#if field.list && (field.associationComplex || field.fakeAssociation)>
            <TabPanel header=${field.name18nCreate}>
            <#if !field.createAndListPageInOneTab>
                <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                    <TabPanel header={t("creation")}>
                    </#if>
                        <div className="grid">
                            <#list field.typeAsPojo.fields as innerField>
                            <#if  !innerField.notVisibleInCreatePage>
                            <#if innerField.dateTime>
                            <div className="field col-${innerField.columnStyle}">
                                <label htmlFor="${innerField.name}">${innerField.name18nCreate}</label>
                                <Calendar id="${innerField.name}" value={${field.name}.${innerField.name}}  onChange={(e) => onInputDateChange${field.name?cap_first}(e, '${innerField.name?uncap_first}')} dateFormat="dd/mm/yy"  showIcon={true} />
                            </div>
                            <#elseif innerField.pureString>
                            <div className="field col-${innerField.columnStyle}">
                                <label htmlFor="${innerField.name}">${innerField.name18nCreate}</label>
                                <InputText id="${innerField.name}" value={${field.name}.${innerField.name}} onChange={(e) => onInputTextChange${field.name?cap_first}(e, '${innerField.name?uncap_first}')} required autoFocus className={classNames({'p-invalid': submitted && !item.${field.name?uncap_first}})}/>
                            </div>
                            <#elseif innerField.bool>
                            <div className="field col-${innerField.columnStyle}">
                                <label htmlFor="${innerField.name}">${innerField.name18nCreate}</label>
                                <span className="p-float-label">
                                <InputSwitch  id="${innerField.name}" checked={${field.name}.${innerField.name}} onChange={(e) => onBooleanInputChange${field.name?cap_first}(e, '${innerField.name?uncap_first}')} />
                            </span>
                            </div>
                            <#elseif innerField.simple && innerField.id == false>
                            <div className="field col-${innerField.columnStyle}">
                                <label htmlFor="${innerField.name?uncap_first}">${innerField.name18nCreate}</label>
                                <InputNumber id="${innerField.name}" value={${field.name?uncap_first}.${innerField.name}}  onValueChange={(e) => onInputNumerChange${field.name?cap_first}(e, '${innerField.name?uncap_first}')}/>
                            </div>
                            <#elseif innerField.generic && innerField.typeAsPojo.name != pojo.name>
                            <div className="field col-${innerField.columnStyle}">
                                <label htmlFor="${innerField.name}">${innerField.name18nCreate}</label>
                                <Dropdown id="${innerField.name?uncap_first}Dropdown" value={${field.name?uncap_first}.${innerField.name}} options={${innerField.name?uncap_first}s} onChange={(e) => onDropdownChange${field.name?cap_first}(e, '${innerField.name}')}    placeholder=${innerField.name18nPlaceHolderCreate} filter filterPlaceholder=${innerField.name18nPlaceHolderFilterCreate}  optionLabel="${innerField.typeAsPojo.labelOrReferenceOrId.name!'walo'}" />
                             </div>
                            <#elseif innerField.list && innerField.association>
                            <div className="field col-${innerField.columnStyle}">
                                <label htmlFor="${innerField.name}">${innerField.fieldOfAssociation.name18nCreate}</label>
                                <MultiSelect value={${field.name}.${innerField.name}} options={${innerField.name}}  optionLabel="$${innerField.fieldOfAssociation.name}.${innerField.fieldOfAssociation.typeAsPojo.labelOrReferenceOrId.name}" display="chip" placeholder=${innerField.name18nPlaceHolderCreate}  maxSelectedLabels={3}  onChange={(e) => onMultiSelectChange${field.name?cap_first}(e, '${innerField.name}')} />
                            </div>
                            </#if>
                            </#if>
                            </#list>
                            <div className="field col-1">
                                <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={add${field.name?cap_first}} />
                            </div>
                        </div>
                    <#if !field.createAndListPageInOneTab>
                    </TabPanel>
                    <TabPanel header={t("list")}>
                    </#if>
                    <#if field.createAndListPageInOneTab>
                    <div className="p-col">
                    </#if>
                    <div className="card">
                    <DataTable value={item.${field.name?uncap_first}} tableStyle={{minWidth: '50rem'}} dataKey="id">
                        <#list field.typeAsPojo.fields as myField>
                        <#if myField.simple && !myField.notVisibleInCreatePage>
                        <#if !myField.id>
                        <Column field="${myField.name}" header=${myField.name18nCreate} <#if myField.dateTime>body={formateDate("${myField.name}")}</#if>></Column>
                        </#if>
                        <#elseif myField.generic && !myField.notVisibleInCreatePage>
                        <#if myField.typeAsPojo.name != pojo.name>
                        <Column field="${myField.name}.${myField.typeAsPojo.labelOrReferenceOrId.name!'walo'}" header=${myField.name18nCreate}></Column>
                        </#if>
                        <#else>
                        </#if>
                        </#list>
                        <Column header={t("actions")} body={(rowData)=> (<div>
                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={()=> delete${field.name?cap_first}(rowData)} />
                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={()=> edit${field.name?cap_first}(rowData)} /> </div>)}></Column>
                    </DataTable>
                    </div>
                    <#if field.createAndListPageInOneTab>
                    </div>
                    <#else>
                    </TabPanel>
                </TabView>
            </#if>
            </TabPanel>
            </#if>
            </#list>
        </TabView>
    </#if>
    <#if pojo.createUpdateConfounded>
     </div>
    <#else>
    </Dialog>
    </#if>
);
};
export default Create;
