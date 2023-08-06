import {Button} from 'primereact/button';
import {Column} from 'primereact/column';


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

import {DocumentCategorieFieldAdminService} from 'app/controller/service/admin/DocumentCategorieFieldAdminService.service';
import {DocumentCategorieFieldDto}  from 'app/controller/model/DocumentCategorieField.model';
import {DocumentCategorieFieldCriteria} from 'app/controller/criteria/DocumentCategorieFieldCriteria.model';

import {FieldDto} from 'app/controller/model/Field.model';
import {FieldAdminService} from 'app/controller/service/admin/FieldAdminService.service';
import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';
import {DocumentCategorieFieldRuleAdminService} from 'app/controller/service/admin/DocumentCategorieFieldRuleAdminService.service';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieAdminService} from 'app/controller/service/admin/DocumentCategorieAdminService.service';

import { useTranslation } from 'react-i18next';

import Edit from '../edit/document-categorie-field-edit-admin.component';
import Create from '../create/document-categorie-field-create-admin.component';
import View from '../view/document-categorie-field-view-admin.component';


const List = () => {

    const { t } = useTranslation();

    const emptyItem = new DocumentCategorieFieldDto();
    const [items, setItems] = useState<DocumentCategorieFieldDto[]>([]);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
    const [item, setItem] = useState<DocumentCategorieFieldDto>(emptyItem);
    const [selectedItems, setSelectedItems] = useState<DocumentCategorieFieldDto[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [showViewDialog, setShowViewDialog] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<DocumentCategorieFieldDto>(emptyItem);
    const [rows, setRows] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [criteria, setCriteria] = useState(new DocumentCategorieFieldCriteria());
    const [first, setFirst] = useState(0);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<DocumentCategorieFieldDto[]>>(null);
    const [findByCriteriaShow, setFindByCriteriaShow] = useState(false);
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    const [fields, setFields] = useState<FieldDto[]>([]);
    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);
    const [documentCategorieFieldRules, setDocumentCategorieFieldRules] = useState<DocumentCategorieFieldRuleDto[]>([]);




    const showSearch = () => { setFindByCriteriaShow(!findByCriteriaShow); };

    const handleValidateClick = () => {fetchItems(criteria)};

    const handleCancelClick = () => {
        setCriteria(new DocumentCategorieFieldCriteria());
        fetchItems(new DocumentCategorieFieldCriteria());
        setIsSearchTriggered(false);
    };

    useEffect(() => {

        FieldAdminService.getList().then(({data}) => setFields(data)).catch(error => console.log(error));
        DocumentCategorieAdminService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));
        DocumentCategorieFieldRuleAdminService.getList().then(({data}) => setDocumentCategorieFieldRules(data)).catch(error => console.log(error));

        fetchItems(criteria);
    }, []);




    const fetchItems = (criteria: DocumentCategorieFieldCriteria) => {
        DocumentCategorieFieldAdminService.findPaginatedByCriteria(criteria).then(({data}) => {
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

    const showEditModal = (item: DocumentCategorieFieldDto) => {
        setSelectedItem(item);
        setShowEditDialog(true);
    };

    const showViewModal = (item: DocumentCategorieFieldDto) => {
        setSelectedItem(item);
        setShowViewDialog(true);
    };

    const add = (item: DocumentCategorieFieldDto) => {
        setItems([...items, item]);
    };

    const update = (updatedItem: DocumentCategorieFieldDto) => {
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

    const confirmDeleteItem = (item: DocumentCategorieFieldDto) => {
        setSelectedItem(item);
        setDeleteItemDialog(true);
    };


    const deleteItem = async () => {
        try{
            await DocumentCategorieFieldAdminService.delete(selectedItem?.id);
            setDeleteItemDialog(false);
            setItem(emptyItem);
            let _items = items.filter((val) => val.id !== selectedItem?.id);
            setItems(_items);
            MessageService.showSuccess(toast, 'DocumentCategorieField Deleted');
        } catch (error) {
            MessageService.showError(toast, 'DocumentCategorieField Deletion Prob');
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteItemsDialog(true);
    };

    const deleteSelectedItems = async () => {
        await DocumentCategorieFieldAdminService.deleteList(selectedItems);
        let _items = items.filter((val) => !selectedItems.includes(val));
        setItems(_items);
        setDeleteItemsDialog(false);
        setSelectedItems([]);
        MessageService.showSuccess(toast, 'DocumentCategorieFields Deleted');
    };

   const leftToolbarTemplate = () => {
       return (
           <React.Fragment>
               <div className="my-2">
                   <Button label={t("new")} icon="pi pi-plus" severity="success" className=" mr-2" onClick={ showCreateModal} />
                   <Button label={t("delete")} icon="pi pi-trash" severity="danger" className=" mr-2" onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} />
                   <Button label={t("search")} icon={`pi pi-${findByCriteriaShow ? 'angle-down' : 'angle-right'}`} className=" mr-2" severity="warning" onClick={showSearch} />
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

    const actionBodyTemplate = (rowData: DocumentCategorieFieldDto) => {
       return ( <>
           <Button icon="pi pi-pencil" rounded severity="success" className="mr-1" onClick={() => showEditModal(rowData)} />
           <Button icon="pi pi-trash" rounded  severity="danger" className="mr-1"  onClick={() => confirmDeleteItem(rowData)} />
           <Button icon="pi pi-eye" rounded severity="info" className="mr-1" onClick={() => showViewModal(rowData)} /> </>
       );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5 className="m-0">Manage document categorie fields</h5>
        <span className="block mt-2 md:mt-0 p-input-icon-left"><i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder={t("search")} /> </span>
        </div>
    );

    const deleteItemDialogFooter = ( <>
        <Button label={t("no")} icon="pi pi-times" text onClick={hideDeleteItemDialog} />
        <Button label={t("yes")} icon="pi pi-check" text onClick={deleteItem} />
      </>
    );


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
                            <span className="mr-3 align-search-items mt-4">
                                <Dropdown id="1" value={criteria.field} options={fields} onChange={(e) => setCriteria({ ...criteria, field: e.target.value })} optionLabel="libelle" filter showClear placeholder={t("documentCategorieFieldFieldPlaceHolder")} filterPlaceholder={t("documentCategorieFieldFieldPlaceHolderFilter")} />
                            </span>
                            <span className="mr-3 align-search-items mt-4">
                                <Dropdown id="2" value={criteria.documentCategorie} options={documentCategories} onChange={(e) => setCriteria({ ...criteria, documentCategorie: e.target.value })} optionLabel="libelle" filter showClear placeholder={t("documentCategorieFieldDocumentCategoriePlaceHolder")} filterPlaceholder={t("documentCategorieFieldDocumentCategoriePlaceHolderFilter")} />
                            </span>
                            <span className="mr-3 align-search-items mt-4">
                                <Dropdown id="3" value={criteria.documentCategorieFieldRule} options={documentCategorieFieldRules} onChange={(e) => setCriteria({ ...criteria, documentCategorieFieldRule: e.target.value })} optionLabel="libelle" filter showClear placeholder={t("documentCategorieFieldDocumentCategorieFieldRulePlaceHolder")} filterPlaceholder={t("documentCategorieFieldDocumentCategorieFieldRulePlaceHolderFilter")} />
                            </span>
                        </div>
                        <div style={{ marginTop : '1rem', display: 'flex', justifyContent: 'flex-end' }} >
                            <Button label={t("validate")} icon="pi pi-sort-amount-down" className="p-button-info mr-2" onClick={handleValidateClick} />
                            <Button label={t("cancel")} className="p-button-secondary mr-2"  icon="pi pi-times" onClick={handleCancelClick} />
                        </div>
                    </div>
                </Card>
                )}
                <DataTable ref={dt} value={items} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value as DocumentCategorieFieldDto[])} dataKey="id" className="datatable-responsive" globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                    <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}> </Column>
                    
                    <Column field="field.libelle" header={t("documentCategorieFieldField")} sortable ></Column>
                    
                    
                    <Column field="documentCategorie.libelle" header={t("documentCategorieFieldDocumentCategorie")} sortable ></Column>
                    
                    
                    <Column field="documentCategorieFieldRule.libelle" header={t("documentCategorieFieldDocumentCategorieFieldRule")} sortable ></Column>
                    
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
                    {item && (<span>{t("deleteDocumentCategorieFieldConfirmationMessage")} <b>{item.id}</b>?</span>)}
                    </div>
                </Dialog>

            </div>
        </div>
    </div>
);
};
export default List;

