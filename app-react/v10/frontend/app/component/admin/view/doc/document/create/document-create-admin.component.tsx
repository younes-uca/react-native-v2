import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {TabView, TabPanel} from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import {InputSwitch, InputSwitchChangeEvent} from 'primereact/inputswitch';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import {MessageService} from 'app/zynerator/service/MessageService';

import {DocumentAdminService} from 'app/controller/service/admin/DocumentAdminService.service';
import  {DocumentDto}  from 'app/controller/model/Document.model';

import {UtilisateurDto} from 'app/controller/model/Utilisateur.model';
import {UtilisateurAdminService} from 'app/controller/service/admin/UtilisateurAdminService.service';
import {FieldDto} from 'app/controller/model/Field.model';
import {FieldAdminService} from 'app/controller/service/admin/FieldAdminService.service';
import {DocumentTypeDto} from 'app/controller/model/DocumentType.model';
import {DocumentTypeAdminService} from 'app/controller/service/admin/DocumentTypeAdminService.service';
import {DocumentStateDto} from 'app/controller/model/DocumentState.model';
import {DocumentStateAdminService} from 'app/controller/service/admin/DocumentStateAdminService.service';
import {DocumentFieldDto} from 'app/controller/model/DocumentField.model';
import {DocumentFieldAdminService} from 'app/controller/service/admin/DocumentFieldAdminService.service';
import {DocumentFieldStateDto} from 'app/controller/model/DocumentFieldState.model';
import {DocumentFieldStateAdminService} from 'app/controller/service/admin/DocumentFieldStateAdminService.service';
import {DocumentPartageUtilisateurDto} from 'app/controller/model/DocumentPartageUtilisateur.model';
import {DocumentPartageUtilisateurAdminService} from 'app/controller/service/admin/DocumentPartageUtilisateurAdminService.service';
import {DocumentTagDto} from 'app/controller/model/DocumentTag.model';
import {DocumentTagAdminService} from 'app/controller/service/admin/DocumentTagAdminService.service';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieAdminService} from 'app/controller/service/admin/DocumentCategorieAdminService.service';
import {DocumentPartageGroupeDto} from 'app/controller/model/DocumentPartageGroupe.model';
import {DocumentPartageGroupeAdminService} from 'app/controller/service/admin/DocumentPartageGroupeAdminService.service';
import {TagDto} from 'app/controller/model/Tag.model';
import {TagAdminService} from 'app/controller/service/admin/TagAdminService.service';
import {EntiteAdministrativeDto} from 'app/controller/model/EntiteAdministrative.model';
import {EntiteAdministrativeAdminService} from 'app/controller/service/admin/EntiteAdministrativeAdminService.service';
import {AccessShareDto} from 'app/controller/model/AccessShare.model';
import {AccessShareAdminService} from 'app/controller/service/admin/AccessShareAdminService.service';
import {GroupeDto} from 'app/controller/model/Groupe.model';
import {GroupeAdminService} from 'app/controller/service/admin/GroupeAdminService.service';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';

type DocumentCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: DocumentDto) => void,
    showToast: React.Ref<Toast>,
    list: DocumentDto[],
    t: TFunction
}
const Create: React.FC<DocumentCreateAdminType> = ({visible, onClose, add, showToast, list, t}) => {

    const emptyItem = new DocumentDto();
    const [items, setItems] = useState<DocumentDto[]>(list);
    const [item, setItem] = useState<DocumentDto>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);


    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const [entiteAdministratives, setEntiteAdministratives] = useState<EntiteAdministrativeDto[]>([]);
    const [groupes, setGroupes] = useState<GroupeDto[]>([]);
    const [fields, setFields] = useState<FieldDto[]>([]);
    const [documentFieldStates, setDocumentFieldStates] = useState<DocumentFieldStateDto[]>([]);
    const [documentTypes, setDocumentTypes] = useState<DocumentTypeDto[]>([]);
    const [accessShares, setAccessShares] = useState<AccessShareDto[]>([]);
    const [tags, setTags] = useState<TagDto[]>([]);
    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);
    const [documentStates, setDocumentStates] = useState<DocumentStateDto[]>([]);

    const [documentFields, setDocumentFields] = useState<DocumentFieldDto>(new DocumentFieldDto());
    const [documentPartageGroupes, setDocumentPartageGroupes] = useState<DocumentPartageGroupeDto>(new DocumentPartageGroupeDto());
    const [documentPartageUtilisateurs, setDocumentPartageUtilisateurs] = useState<DocumentPartageUtilisateurDto>(new DocumentPartageUtilisateurDto());
    const [documentTags, setDocumentTags] = useState<DocumentTagDto>(new DocumentTagDto());

    useEffect(() => {

        DocumentTypeAdminService.getList().then(({data}) => setDocumentTypes(data)).catch(error => console.log(error));
        DocumentStateAdminService.getList().then(({data}) => setDocumentStates(data)).catch(error => console.log(error));
        DocumentCategorieAdminService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));
        UtilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        EntiteAdministrativeAdminService.getList().then(({data}) => setEntiteAdministratives(data)).catch(error => console.log(error));


        FieldAdminService.getList().then(({data}) => setFields(data)).catch(error => console.log(error));
        DocumentFieldStateAdminService.getList().then(({data}) => setDocumentFieldStates(data)).catch(error => console.log(error));



        GroupeAdminService.getList().then(({data}) => setGroupes(data)).catch(error => console.log(error));
        AccessShareAdminService.getList().then(({data}) => setAccessShares(data)).catch(error => console.log(error));



        UtilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        AccessShareAdminService.getList().then(({data}) => setAccessShares(data)).catch(error => console.log(error));


        TagAdminService.getList().then(({data}) => {
            const DocumentTags = data?.map(prepareDocumentTag)
            setDocumentTags(documentTags)
        })



    }, []);


    const prepareDocumentTag = (tag: TagDto) => {
        const documentTag = new DocumentTagDto();
        documentTag.tag = tag;
        return documentTag;
    }


    const addDocumentFields = () => {
        setSubmitted(true);
        if( item.documentFields == null )
        item.documentFields = new Array<DocumentFieldDto>();
        let _item = documentFields;
        if (!_item.id) {
            item.documentFields.push(_item);
            MessageService.showSuccess(showToast, 'DocumentFields Created');
            setItem((prevState :any) => ({...prevState, documentFields: item.documentFields }));
        } else {
            const updatedItems = item.documentFields.map((item) => item.id === documentFields.id ? {...documentFields} : item);
            MessageService.showSuccess(showToast,'DocumentFields Updated');
            setItem((prevState :any) => ({ ...prevState, documentFields: updatedItems}));
        }
        setDocumentFields(new DocumentFieldDto());
    };

    const deleteDocumentFields = (rowData: any) => {
        const updatedItems = item.documentFields.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState,documentFields: updatedItems }));
        setDocumentFields(new DocumentFieldDto());
        MessageService.showSuccess(showToast, 'DocumentItem Deleted');
    };

    const editDocumentFields = (rowData: any) => {
         setActiveTab(0);
         setDocumentFields(rowData);

    };

    const onInputNumerChangeDocumentFields = (e: any, name: string) => {
         const val = e.value || 0;
         setDocumentFields((prevDocumentFields) => ({...prevDocumentFields, [name]: val, }));
    };
    const onDropdownChangeDocumentFields = (e: any, field: string) => {
        setDocumentFields((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onBooleanInputChangeDocumentFields = (e: InputSwitchChangeEvent, name: string) => {
       const val = e.value;
       setDocumentFields((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangeDocumentFields = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentFields({ ...documentFields, [name]:val})
    };

    const onInputTextChangeDocumentFields = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentFields({ ...documentFields, [name]:val})
    };
    const addDocumentPartageGroupes = () => {
        setSubmitted(true);
        if( item.documentPartageGroupes == null )
        item.documentPartageGroupes = new Array<DocumentPartageGroupeDto>();
        let _item = documentPartageGroupes;
        if (!_item.id) {
            item.documentPartageGroupes.push(_item);
            MessageService.showSuccess(showToast, 'DocumentPartageGroupes Created');
            setItem((prevState :any) => ({...prevState, documentPartageGroupes: item.documentPartageGroupes }));
        } else {
            const updatedItems = item.documentPartageGroupes.map((item) => item.id === documentPartageGroupes.id ? {...documentPartageGroupes} : item);
            MessageService.showSuccess(showToast,'DocumentPartageGroupes Updated');
            setItem((prevState :any) => ({ ...prevState, documentPartageGroupes: updatedItems}));
        }
        setDocumentPartageGroupes(new DocumentPartageGroupeDto());
    };

    const deleteDocumentPartageGroupes = (rowData: any) => {
        const updatedItems = item.documentPartageGroupes.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState,documentPartageGroupes: updatedItems }));
        setDocumentPartageGroupes(new DocumentPartageGroupeDto());
        MessageService.showSuccess(showToast, 'DocumentItem Deleted');
    };

    const editDocumentPartageGroupes = (rowData: any) => {
         setActiveTab(0);
         setDocumentPartageGroupes(rowData);

    };

    const onInputNumerChangeDocumentPartageGroupes = (e: any, name: string) => {
         const val = e.value || 0;
         setDocumentPartageGroupes((prevDocumentPartageGroupes) => ({...prevDocumentPartageGroupes, [name]: val, }));
    };
    const onDropdownChangeDocumentPartageGroupes = (e: any, field: string) => {
        setDocumentPartageGroupes((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onBooleanInputChangeDocumentPartageGroupes = (e: InputSwitchChangeEvent, name: string) => {
       const val = e.value;
       setDocumentPartageGroupes((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangeDocumentPartageGroupes = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentPartageGroupes({ ...documentPartageGroupes, [name]:val})
    };

    const onInputTextChangeDocumentPartageGroupes = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentPartageGroupes({ ...documentPartageGroupes, [name]:val})
    };
    const addDocumentPartageUtilisateurs = () => {
        setSubmitted(true);
        if( item.documentPartageUtilisateurs == null )
        item.documentPartageUtilisateurs = new Array<DocumentPartageUtilisateurDto>();
        let _item = documentPartageUtilisateurs;
        if (!_item.id) {
            item.documentPartageUtilisateurs.push(_item);
            MessageService.showSuccess(showToast, 'DocumentPartageUtilisateurs Created');
            setItem((prevState :any) => ({...prevState, documentPartageUtilisateurs: item.documentPartageUtilisateurs }));
        } else {
            const updatedItems = item.documentPartageUtilisateurs.map((item) => item.id === documentPartageUtilisateurs.id ? {...documentPartageUtilisateurs} : item);
            MessageService.showSuccess(showToast,'DocumentPartageUtilisateurs Updated');
            setItem((prevState :any) => ({ ...prevState, documentPartageUtilisateurs: updatedItems}));
        }
        setDocumentPartageUtilisateurs(new DocumentPartageUtilisateurDto());
    };

    const deleteDocumentPartageUtilisateurs = (rowData: any) => {
        const updatedItems = item.documentPartageUtilisateurs.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState,documentPartageUtilisateurs: updatedItems }));
        setDocumentPartageUtilisateurs(new DocumentPartageUtilisateurDto());
        MessageService.showSuccess(showToast, 'DocumentItem Deleted');
    };

    const editDocumentPartageUtilisateurs = (rowData: any) => {
         setActiveTab(0);
         setDocumentPartageUtilisateurs(rowData);

    };

    const onInputNumerChangeDocumentPartageUtilisateurs = (e: any, name: string) => {
         const val = e.value || 0;
         setDocumentPartageUtilisateurs((prevDocumentPartageUtilisateurs) => ({...prevDocumentPartageUtilisateurs, [name]: val, }));
    };
    const onDropdownChangeDocumentPartageUtilisateurs = (e: any, field: string) => {
        setDocumentPartageUtilisateurs((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onBooleanInputChangeDocumentPartageUtilisateurs = (e: InputSwitchChangeEvent, name: string) => {
       const val = e.value;
       setDocumentPartageUtilisateurs((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangeDocumentPartageUtilisateurs = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentPartageUtilisateurs({ ...documentPartageUtilisateurs, [name]:val})
    };

    const onInputTextChangeDocumentPartageUtilisateurs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentPartageUtilisateurs({ ...documentPartageUtilisateurs, [name]:val})
    };
    const formateDate = (field: string) => {
        return (rowData: any) => {
            if (rowData[field]) {
            return format(new Date(rowData[field]), "dd/MM/yyyy");
            }
        };
    };

    const onInputTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const value = (e.target && e.target.value) || '';
        setItem({...item, [name]: value});
    };

    const onInputDateChange = (e: CalendarChangeEvent, name: string) => {
        const value = (e.value) || '';
        setItem({...item, [name]: value});
    };

    const onInputNumerChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value === null ? null : +e.value;
        setItem((prevItem) => ({...prevItem, [name]: val,}));
    };

    const onMultiSelectChange = (e: MultiSelectChangeEvent, field: string) => {
        if (e && e.value) {
            setItem(prevState => ({...prevState, [field]: e.value,}));
        }
    };

    const onBooleanInputChange = (e: any, name: string) => {
        const val = e.value;
        setItem((prevItem) => ({...prevItem, [name]: val,}));
        };

    const onDropdownChange = (e: DropdownChangeEvent, field: string) => {
        setItem((prevState) => ({...prevState, [field]: e.value}));
    };

    const onTabChange = (e: { index: number }) => {
        setActiveIndex(e.index);
    };

    const hideDialog = () => {
        setSubmitted(false);
        onClose();
    };


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        if(item.reference == '')
            errorMessages.push("reference is required")
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            DocumentAdminService.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, 'Document Created');
                onClose();
                setSubmitted(false);
                });
        }
    };

    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" text onClick={saveItem} /> </>
    );

return(
        <Dialog visible={visible} style={{width: '70vw'}} header={t("documentTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("documentTabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="reference">{t("documentReference")}</label>
                        <InputText id="reference" value={item.reference} onChange={(e) => onInputTextChange(e, 'reference')} required autoFocus className={classNames({'p-invalid': submitted && !item.reference})} />
                        {submitted && !item.reference && <small className="p-invalid">Reference is required.</small>}
                    </div>
                        <div className="field col-6">
                            <FileUpload name="file" url={"http://localhost:8037/minio/upload/file/ged"}
                                        maxFileSize={1000000} emptyTemplate={<p className="m-0">vous pouvez glisser deposer votre document</p>} />
                        </div>
                    <div className="field col-6">
                        <label htmlFor="uploadDate">{t("documentUploadDate")}</label>
                        <Calendar id="uploadDate" value={item.uploadDate} onChange={(e) => onInputDateChange(e, 'uploadDate')} dateFormat="dd/mm/yy"  showIcon={true} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="dateLastUpdate">{t("documentDateLastUpdate")}</label>
                        <Calendar id="dateLastUpdate" value={item.dateLastUpdate} onChange={(e) => onInputDateChange(e, 'dateLastUpdate')} dateFormat="dd/mm/yy"  showIcon={true} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="content">{t("documentContent")}</label>
                        <InputText id="content" value={item.content} onChange={(e) => onInputTextChange(e, 'content')} required autoFocus className={classNames({'p-invalid': submitted && !item.content})} />
                        {submitted && !item.content && <small className="p-invalid">Content is required.</small>}
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="folder">{t("documentFolder")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="folder" checked={item.folder} onChange={(e) => onBooleanInputChange(e, 'folder')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="size">{t("documentSize")}</label>
                        <InputNumber id="size" value={item.size} onChange={(e) => onInputNumerChange(e, 'size')} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="documentType">{t("documentDocumentType")}</label>
                        <Dropdown  id="documentTypeDropdown"  value={item.documentType} options={documentTypes} onChange={(e) => onDropdownChange(e, 'documentType')}   placeholder={t("documentDocumentTypePlaceHolder")} filter filterPlaceholder={t("documentDocumentTypePlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="documentState">{t("documentDocumentState")}</label>
                        <Dropdown  id="documentStateDropdown"  value={item.documentState} options={documentStates} onChange={(e) => onDropdownChange(e, 'documentState')}   placeholder={t("documentDocumentStatePlaceHolder")} filter filterPlaceholder={t("documentDocumentStatePlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="documentCategorie">{t("documentDocumentCategorie")}</label>
                        <Dropdown  id="documentCategorieDropdown"  value={item.documentCategorie} options={documentCategories} onChange={(e) => onDropdownChange(e, 'documentCategorie')}   placeholder={t("documentDocumentCategoriePlaceHolder")} filter filterPlaceholder={t("documentDocumentCategoriePlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="description">{t("documentDescription")}</label>
                        <span className="p-float-label">
                        <InputTextarea id="description" value={item.description} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30}/>
                    </span>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="utilisateur">{t("documentUtilisateur")}</label>
                        <Dropdown  id="utilisateurDropdown"  value={item.utilisateur} options={utilisateurs} onChange={(e) => onDropdownChange(e, 'utilisateur')}   placeholder={t("documentUtilisateurPlaceHolder")} filter filterPlaceholder={t("documentUtilisateurPlaceHolderFilter")} optionLabel="nom" />
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="archive">{t("documentArchive")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="archive" checked={item.archive} onChange={(e) => onBooleanInputChange(e, 'archive')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="versionne">{t("documentVersionne")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="versionne" checked={item.versionne} onChange={(e) => onBooleanInputChange(e, 'versionne')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="entiteAdministrative">{t("documentEntiteAdministrative")}</label>
                        <Dropdown  id="entiteAdministrativeDropdown"  value={item.entiteAdministrative} options={entiteAdministratives} onChange={(e) => onDropdownChange(e, 'entiteAdministrative')}   placeholder={t("documentEntiteAdministrativePlaceHolder")} filter filterPlaceholder={t("documentEntiteAdministrativePlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="documentTags">{t("documentTagTag")}</label>
                       {/*
                        <MultiSelect value={item.documentTags} options={documentTags}  optionLabel="tag.libelle" display="chip" placeholder={t("documentDocumentTagsPlaceHolder")}  maxSelectedLabels={3}  onChange={(e) => onMultiSelectChange(e, 'documentTags')} />
                    */}
                    </div>
                </div>
            </TabPanel>
            <TabPanel header={t("documentDocumentFields")}>
                <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                    <TabPanel header={t("creation")}>
                        <div className="grid">
                            <div className="field col-5">
                                <label htmlFor="field">{t("documentFieldField")}</label>
                                <Dropdown id="fieldDropdown" value={documentFields.field} options={fields} onChange={(e) => onDropdownChangeDocumentFields(e, 'field')}    placeholder={t("documentFieldFieldPlaceHolder")} filter filterPlaceholder={t("documentFieldFieldPlaceHolderFilter")}  optionLabel="libelle" />
                             </div>
                            <div className="field col-6">
                                <label htmlFor="value">{t("documentFieldValue")}</label>
                                <InputText id="value" value={documentFields.value} onChange={(e) => onInputTextChangeDocumentFields(e, 'value')} required autoFocus className={classNames({'p-invalid': submitted && !item.documentFields})}/>
                            </div>
                            <div className="field col-5">
                                <label htmlFor="documentFieldState">{t("documentFieldDocumentFieldState")}</label>
                                <Dropdown id="documentFieldStateDropdown" value={documentFields.documentFieldState} options={documentFieldStates} onChange={(e) => onDropdownChangeDocumentFields(e, 'documentFieldState')}    placeholder={t("documentFieldDocumentFieldStatePlaceHolder")} filter filterPlaceholder={t("documentFieldDocumentFieldStatePlaceHolderFilter")}  optionLabel="libelle" />
                             </div>
                            <div className="field col-1">
                                <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addDocumentFields} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={t("list")}>
                    <div className="card">
                    <DataTable value={item.documentFields} tableStyle={{minWidth: '50rem'}} dataKey="id">
                        <Column field="field.libelle" header={t("documentFieldField")}></Column>
                        <Column field="value" header={t("documentFieldValue")} ></Column>
                        <Column field="documentFieldState.libelle" header={t("documentFieldDocumentFieldState")}></Column>
                        <Column header={t("actions")} body={(rowData)=> (<div>
                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={()=> deleteDocumentFields(rowData)} />
                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={()=> editDocumentFields(rowData)} /> </div>)}></Column>
                    </DataTable>
                    </div>
                    </TabPanel>
                </TabView>
            </TabPanel>
            <TabPanel header={t("documentDocumentPartageGroupes")}>
                <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                    <TabPanel header={t("creation")}>
                        <div className="grid">
                            <div className="field col-6">
                                <label htmlFor="groupe">{t("documentPartageGroupeGroupe")}</label>
                                <Dropdown id="groupeDropdown" value={documentPartageGroupes.groupe} options={groupes} onChange={(e) => onDropdownChangeDocumentPartageGroupes(e, 'groupe')}    placeholder={t("documentPartageGroupeGroupePlaceHolder")} filter filterPlaceholder={t("documentPartageGroupeGroupePlaceHolderFilter")}  optionLabel="libelle" />
                             </div>
                            <div className="field col-6">
                                <label htmlFor="dateShare">{t("documentPartageGroupeDateShare")}</label>
                                <Calendar id="dateShare" value={documentPartageGroupes.dateShare}  onChange={(e) => onInputDateChangeDocumentPartageGroupes(e, 'dateShare')} dateFormat="dd/mm/yy"  showIcon={true} />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="accessShare">{t("documentPartageGroupeAccessShare")}</label>
                                <Dropdown id="accessShareDropdown" value={documentPartageGroupes.accessShare} options={accessShares} onChange={(e) => onDropdownChangeDocumentPartageGroupes(e, 'accessShare')}    placeholder={t("documentPartageGroupeAccessSharePlaceHolder")} filter filterPlaceholder={t("documentPartageGroupeAccessSharePlaceHolderFilter")}  optionLabel="libelle" />
                             </div>
                            <div className="field col-1">
                                <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addDocumentPartageGroupes} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={t("list")}>
                    <div className="card">
                    <DataTable value={item.documentPartageGroupes} tableStyle={{minWidth: '50rem'}} dataKey="id">
                        <Column field="groupe.libelle" header={t("documentPartageGroupeGroupe")}></Column>
                        <Column field="dateShare" header={t("documentPartageGroupeDateShare")} body={formateDate("dateShare")}></Column>
                        <Column field="accessShare.libelle" header={t("documentPartageGroupeAccessShare")}></Column>
                        <Column header={t("actions")} body={(rowData)=> (<div>
                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={()=> deleteDocumentPartageGroupes(rowData)} />
                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={()=> editDocumentPartageGroupes(rowData)} /> </div>)}></Column>
                    </DataTable>
                    </div>
                    </TabPanel>
                </TabView>
            </TabPanel>
            <TabPanel header={t("documentDocumentPartageUtilisateurs")}>
                <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                    <TabPanel header={t("creation")}>
                        <div className="grid">
                            <div className="field col-6">
                                <label htmlFor="utilisateur">{t("documentPartageUtilisateurUtilisateur")}</label>
                                <Dropdown id="utilisateurDropdown" value={documentPartageUtilisateurs.utilisateur} options={utilisateurs} onChange={(e) => onDropdownChangeDocumentPartageUtilisateurs(e, 'utilisateur')}    placeholder={t("documentPartageUtilisateurUtilisateurPlaceHolder")} filter filterPlaceholder={t("documentPartageUtilisateurUtilisateurPlaceHolderFilter")}  optionLabel="nom" />
                             </div>
                            <div className="field col-6">
                                <label htmlFor="dateShare">{t("documentPartageUtilisateurDateShare")}</label>
                                <Calendar id="dateShare" value={documentPartageUtilisateurs.dateShare}  onChange={(e) => onInputDateChangeDocumentPartageUtilisateurs(e, 'dateShare')} dateFormat="dd/mm/yy"  showIcon={true} />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="accessShare">{t("documentPartageUtilisateurAccessShare")}</label>
                                <Dropdown id="accessShareDropdown" value={documentPartageUtilisateurs.accessShare} options={accessShares} onChange={(e) => onDropdownChangeDocumentPartageUtilisateurs(e, 'accessShare')}    placeholder={t("documentPartageUtilisateurAccessSharePlaceHolder")} filter filterPlaceholder={t("documentPartageUtilisateurAccessSharePlaceHolderFilter")}  optionLabel="libelle" />
                             </div>
                            <div className="field col-1">
                                <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addDocumentPartageUtilisateurs} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={t("list")}>
                    <div className="card">
                    <DataTable value={item.documentPartageUtilisateurs} tableStyle={{minWidth: '50rem'}} dataKey="id">
                        <Column field="utilisateur.nom" header={t("documentPartageUtilisateurUtilisateur")}></Column>
                        <Column field="dateShare" header={t("documentPartageUtilisateurDateShare")} body={formateDate("dateShare")}></Column>
                        <Column field="accessShare.libelle" header={t("documentPartageUtilisateurAccessShare")}></Column>
                        <Column header={t("actions")} body={(rowData)=> (<div>
                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={()=> deleteDocumentPartageUtilisateurs(rowData)} />
                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={()=> editDocumentPartageUtilisateurs(rowData)} /> </div>)}></Column>
                    </DataTable>
                    </div>
                    </TabPanel>
                </TabView>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
