import {Button} from 'primereact/button';
import {Column} from 'primereact/column';

<#if pojo.hasTagInGenericField>
import {Tag} from 'primereact/tag';
</#if>

import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {FileUpload} from 'primereact/fileupload';
import {InputText} from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import {Toolbar} from 'primereact/toolbar';
import React, {useEffect, useRef, useState} from 'react';
import {Paginator, PaginatorPageChangeEvent} from 'primereact/paginator';
import {Card} from 'primereact/card';
import {Calendar} from 'primereact/calendar';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {format} from "date-fns";

import {MessageService} from 'app/zynerator/service/MessageService';

import {${pojo.name}${role.name?cap_first}Service} from 'app/controller/service/${role.name}/${pojo.name?cap_first}${role.name?cap_first}Service.service';
import {${pojo.name?cap_first}Dto}  from 'app/controller/model/${pojo.name?cap_first}.model';
import {${pojo.name?cap_first}Criteria} from 'app/controller/criteria/${pojo.name?cap_first}Criteria.model';

<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name?cap_first}Dto} from 'app/controller/model/${dependency.name?cap_first}.model';
import {${dependency.name?cap_first}${role.name?cap_first}Service} from 'app/controller/service/${role.name}/${dependency.name?cap_first}${role.name?cap_first}Service.service';
        </#if>
    </#list>
</#if>

import { useTranslation } from 'react-i18next';

import Edit from '../edit/${pojo.formatedUrl}-edit-${role.name}.component';
import Create from '../create/${pojo.formatedUrl}-create-${role.name}.component';
import View from '../view/${pojo.formatedUrl}-view-${role.name}.component';


const List = () => {

    const { t } = useTranslation();

    const emptyItem = new ${pojo.name}Dto();
    const [items, setItems] = useState<${pojo.name}Dto[]>([]);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
    const [item, setItem] = useState<${pojo.name}Dto>(emptyItem);
    const [selectedItems, setSelectedItems] = useState<${pojo.name}Dto[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [showViewDialog, setShowViewDialog] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<${pojo.name}Dto>(emptyItem);
    const [rows, setRows] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [criteria, setCriteria] = useState(new ${pojo.name}Criteria());
    const [first, setFirst] = useState(0);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<${pojo.name}Dto[]>>(null);
    const [findByCriteriaShow, setFindByCriteriaShow] = useState(false);
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    <#list pojo.fieldsGeneric as fieldGeneric>
    const [${fieldGeneric.name}s, set${fieldGeneric.name?cap_first}s] = useState<${fieldGeneric.typeAsPojo.name}Dto[]>([]);
     </#list>




    const showSearch = () => { setFindByCriteriaShow(!findByCriteriaShow); };

    const handleValidateClick = () => {fetchItems(criteria)};

    const handleCancelClick = () => {
        setCriteria(new ${pojo.name}Criteria());
        fetchItems(new ${pojo.name}Criteria());
        setIsSearchTriggered(false);
    };

    useEffect(() => {

    <#list pojo.fieldsGeneric as fieldGeneric>
        ${fieldGeneric.typeAsPojo.name}${role.name?cap_first}Service.getList().then(({data}) => set${fieldGeneric.name?cap_first}s(data)).catch(error => console.log(error));
    </#list>

        fetchItems(criteria);
    }, []);




    const fetchItems = (criteria: ${pojo.name}Criteria) => {
        ${pojo.name}${role.name?cap_first}Service.findPaginatedByCriteria(criteria).then(({data}) => {
            setTotalRecords(data.dataSize);
            setItems(data.list);
        }).catch(error => console.log(error));
    };

    const onPage = (event: PaginatorPageChangeEvent) => {
        const updatedCriteria = { ...criteria, page: event.page,maxResults: event.rows };
        setCriteria(updatedCriteria);
        setFirst(event.first);
        fetchItems(updatedCriteria);
    };

    const showCreateModal = (): void => {
        setShowCreateDialog(true);
    };

    const showEditModal = (item: ${pojo.name?cap_first}Dto) => {
        setSelectedItem(item);
        setShowEditDialog(true);
    };

    const showViewModal = (item: ${pojo.name?cap_first}Dto) => {
        setSelectedItem(item);
        setShowViewDialog(true);
    };

    const add = (item: ${pojo.name?cap_first}Dto) => {
        setItems([...items, item]);
    };

    const update = (updatedItem: ${pojo.name?cap_first}Dto) => {
        const updatedList = items.map((item) => {
            if (item.id === updatedItem.id) { return updatedItem; }
            return item;
        });
        setItems(updatedList);
    };

   const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
   };

   const hideDeleteItemsDialog = () => {
        setDeleteItemsDialog(false);
   };

    const confirmDeleteItem = (item: ${pojo.name?cap_first}Dto) => {
        setSelectedItem(item);
        setDeleteItemDialog(true);
    };

    <#if pojo.hasTagInGenericField>
        const statusBodyTemplate = (val: string, style: any) => {
        return <Tag value={val} severity={style} />;
    };
    </#if>

    const deleteItem = async () => {
        try{
            await ${pojo.name?cap_first}${role.name?cap_first}Service.delete(selectedItem?.id);
            setDeleteItemDialog(false);
            setItem(emptyItem);
            let _items = items.filter((val) => val.id !== selectedItem?.id);
            setItems(_items);
            MessageService.showSuccess(toast, '${pojo.name} Deleted');
        } catch (error) {
            MessageService.showError(toast, '${pojo.name} Deletion Prob');
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteItemsDialog(true);
    };

    const deleteSelectedItems = async () => {
        await ${pojo.name?cap_first}${role.name?cap_first}Service.deleteList(selectedItems);
        let _items = items.filter((val) => !selectedItems.includes(val));
        setItems(_items);
        setDeleteItemsDialog(false);
        setSelectedItems([]);
        MessageService.showSuccess(toast, '${pojo.name}s Deleted');
    };

   const leftToolbarTemplate = () => {
       return (
           <React.Fragment>
               <div className="my-2">
                   <Button label={t("new")} icon="pi pi-plus" severity="success" className=" mr-2" onClick={ showCreateModal} />
                   <Button label={t("delete")} icon="pi pi-trash" severity="danger" className=" mr-2" onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} />
                   <Button label={t("search")} icon={`pi pi-<#noparse>${findByCriteriaShow ? 'angle-down' : 'angle-right'}</#noparse>`} className=" mr-2" severity="warning" onClick={showSearch} />
               </div>
           </React.Fragment>
       );
   };

    const CustomBooleanCell = ({value}: {value: boolean}) => {
        return value ? <i className="pi pi-check-circle" style={{ color: 'green' }}></i> : <i className="pi pi-times-circle" style={{ color: 'red' }}></i>;
    };
   const rightToolbarTemplate = () => {
       return (
           <React.Fragment>
               <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
               <Button label={t("export")} icon="pi pi-upload" severity="help" onClick={exportCSV} />
           </React.Fragment>
       );
   };

    const actionBodyTemplate = (rowData: ${pojo.name?cap_first}Dto) => {
       return ( <>
           <Button icon="pi pi-pencil" rounded severity="success" className="mr-1" onClick={() => showEditModal(rowData)} />
           <Button icon="pi pi-trash" rounded  severity="danger" className="mr-1"  onClick={() => confirmDeleteItem(rowData)} />
           <Button icon="pi pi-eye" rounded severity="info" className="mr-1" onClick={() => showViewModal(rowData)} /> </>
       );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5 className="m-0">Manage ${pojo.formatedNameLowerCase}s</h5>
        <span className="block mt-2 md:mt-0 p-input-icon-left"><i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder={t("search")} /> </span>
        </div>
    );

    const deleteItemDialogFooter = ( <>
        <Button label={t("no")} icon="pi pi-times" text onClick={hideDeleteItemDialog} />
        <Button label={t("yes")} icon="pi pi-check" text onClick={deleteItem} />
      </>
    );


    <#if pojo.hasDate || pojo.hasDateTime>
        const formateDate = (field: string) => {
            return (rowData: any) => {
                if (rowData[field]) {
                    return format(new Date(rowData[field]), "dd/MM/yyyy");
                }
            };
        };
    </#if>
    return (
    <div className="grid crud-demo">
        <div className="col-12">
            <div className="card">
                <Toast ref={toast} />
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                {findByCriteriaShow && (
                <Card>
                    <div className="search-container">
                        <div className="grid">
                            <#list pojo.fields as field>
                                <#if field.simple  && !field.notIncluded  && !field.password>
                                    <#if field.dateTime>
                            <span className="p-float-label mr-3 align-search-items mt-4">
                                <Calendar id="${field?index}-1" value={criteria.${field.name}From} onChange={(e) => setCriteria({ ...criteria, ${field.name}From: e.value as Date })} dateFormat="dd-MM-yy" />
                                <label htmlFor="${field?index}-1">${field.name18nMinCreate}</label>
                            </span>
                            <span className="p-float-label mr-3 align-search-items mt-4">
                                <Calendar id="${field?index}-2" value={criteria.${field.name}To} onChange={(e) => setCriteria({ ...criteria, ${field.name}To: e.value as Date })} dateFormat="dd-MM-yy" />
                                <label htmlFor="${field?index}-2">${field.name18nMaxCreate}</label>
                            </span>
                                    <#elseif field.pureString>
                            <span className="p-float-label mr-3 align-search-items mt-4">
                                <InputText id="${field?index}" value={criteria.${field.name}} onChange={(e) => setCriteria({ ...criteria, ${field.name}: e.target.value })} />
                                <label htmlFor="${field?index}">${field.name18nCreate}</label>
                            </span>
                                    <#elseif field.nombre == true>
                                        <#if field.name != pojo.id.name>
                            <span className="p-float-label mr-3 align-search-items mt-4">
                                <InputNumber id="${field?index}-1" value={criteria.${field.name}Min} onChange={(e) => setCriteria({ ...criteria, ${field.name}Min: e.value })} mode="decimal" />
                                <label htmlFor="${field?index}-1">${field.name18nMinCreate}</label>
                            </span>
                            <span className="p-float-label mr-3 align-search-items mt-4">
                                <InputNumber id="${field?index}-2" value={criteria.${field.name}Max} onChange={(e) => setCriteria({ ...criteria, ${field.name}Max: e.value })} mode="decimal" />
                                <label htmlFor="${field?index}-2">${field.name18nMaxCreate}  </label>
                            </span>
                                        </#if>
                                    </#if>
                                </#if>
                                <#if field.generic == true>
                            <span className="mr-3 align-search-items mt-4">
                                <Dropdown id="${field?index}" value={criteria.${field.name}} options={${field.name}s} onChange={(e) => setCriteria({ ...criteria, ${field.name}: e.target.value })} optionLabel="${field.typeAsPojo.labelOrReferenceOrId.name}" filter showClear placeholder=${field.name18nPlaceHolderCreate} filterPlaceholder=${field.name18nPlaceHolderFilterCreate} />
                            </span>
                                </#if>
                            </#list>
                        </div>
                        <div style={{ marginTop : '1rem', display: 'flex', justifyContent: 'flex-end' }} >
                            <Button label={t("validate")} icon="pi pi-sort-amount-down" className="p-button-info mr-2" onClick={handleValidateClick} />
                            <Button label={t("cancel")} className="p-button-secondary mr-2"  icon="pi pi-times" onClick={handleCancelClick} />
                        </div>
                    </div>
                </Card>
                )}
                <DataTable ref={dt} value={items} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value as ${pojo.name}Dto[])} dataKey="id" className="datatable-responsive" globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                    <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}> </Column>
                    <#assign i=0>
                    <#list pojo.fields as field>
                    <#if field.name != pojo.id.name && !field.large && !field.list>
                    <#assign i++>
                    <#if i &gt; 9> {/* </#if>
                    <#if field.simple && !field.notIncluded  && !field.password>
                        <#if field.dateTime>
                    <Column field="${field.name}" header=${field.name18nCreate} sortable body={formateDate("${field.name}")}></Column>
                        <#elseif field.bool>
                    <Column field="${field.name}" header=${field.name18nCreate} body={CustomBooleanCell} sortable></Column>
                        <#else>
                    <Column field="${field.name}" header=${field.name18nCreate} sortable></Column>
                        </#if>
                    <#elseif field.generic>
                    <Column field="${field.name}.${field.typeAsPojo.labelOrReferenceOrId.name}" header=${field.name18nCreate} sortable <#if field.typeAsPojo.hasTag>body={(rowData)=>statusBodyTemplate(rowData.${field.name}?.${field.typeAsPojo.labelOrReferenceOrId.name},rowData.${field.name}?.${field.typeAsPojo.tagField.name})}</#if>></Column>
                    </#if>
                    <#if i &gt; 9> */} </#if>
                    </#if>
                    </#list>
                    <Column header={t("actions")} body={actionBodyTemplate}></Column>
                </DataTable>
                <div className="p-d-flex p-ai-center p-jc-between">
                    <Paginator onPageChange={onPage} first={first} rows={rows} totalRecords={totalRecords} />
                </div>
                {showCreateDialog && <Create visible={showCreateDialog} onClose={() => setShowCreateDialog(false)} add={add} showToast={toast} list={items}  t={t} />}
                {showEditDialog && <Edit  visible={showEditDialog} onClose={() =>  { setShowEditDialog(false); setSelectedItem(emptyItem); }} showToast={toast} selectedItem={selectedItem} update={update}   t={t} />}
                {showViewDialog && <View visible={showViewDialog} onClose={() =>  { setShowViewDialog(false); setSelectedItem(emptyItem); }} selectedItem={selectedItem}   t={t} />}
                <Dialog visible={deleteItemDialog} style={{width: '450px'}} header={t("confirm")} modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                    <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {item && (<span>{t("delete${pojo.name}ConfirmationMessage")} <b>{item.${pojo.labelOrReferenceOrId.name}}</b>?</span>)}
                    </div>
                </Dialog>

            </div>
        </div>
    </div>
);
};
export default List;

