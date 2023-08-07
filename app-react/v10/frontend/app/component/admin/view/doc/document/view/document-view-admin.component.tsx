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
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';
import  {DocumentDto}  from 'app/controller/model/Document.model';
import {TFunction} from "i18next";

type DocumentViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: DocumentDto,
    t: TFunction
}

const View: React.FC<DocumentViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new DocumentDto();
    const [item, setItem] = useState<DocumentDto>(selectedItem);
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
return(
<Dialog visible={visible} style={{width: '70vw'}} header={t("documentTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("documentTabPan")}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="reference">{t("documentReference")}</label>
                <InputText id="reference" value={selectedItem?.reference} disabled   />
            </div>

                <div className="field col-6">
                    <label htmlFor="referenceGed">{t("documentReferenceGed")}</label>
                    <InputNumber id="referenceGed" value={selectedItem.referenceGed} disabled/>
                </div>

        <div className="field col-6">
            <label htmlFor="uploadDate">{t("documentUploadDate")}</label>
            <Calendar id="uploadDate" value={adaptDate(selectedItem?.uploadDate)} disabled dateFormat="dd/mm/yy" showIcon={true}  />
        </div>

        <div className="field col-6">
            <label htmlFor="dateLastUpdate">{t("documentDateLastUpdate")}</label>
            <Calendar id="dateLastUpdate" value={adaptDate(selectedItem?.dateLastUpdate)} disabled dateFormat="dd/mm/yy" showIcon={true}  />
        </div>

            <div className="field col-6">
                <label htmlFor="content">{t("documentContent")}</label>
                <InputText id="content" value={selectedItem?.content} disabled   />
            </div>

        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="folder">{t("documentFolder")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="folder" checked={selectedItem?.folder} disabled />
                    </span>
            </div>
            </div>

                <div className="field col-6">
                    <label htmlFor="size">{t("documentSize")}</label>
                    <InputNumber id="size" value={selectedItem.size} disabled/>
                </div>

                <div className="field col-6">
                    <label htmlFor="documentType">{t("documentDocumentType")}</label>
                    <InputText  id="documentTypeDropdown"  value={selectedItem?.documentType?.libelle}  disabled  />
                </div>
                <div className="field col-6">
                    <label htmlFor="documentState">{t("documentDocumentState")}</label>
                    <InputText  id="documentStateDropdown"  value={selectedItem?.documentState?.libelle}  disabled  />
                </div>
                <div className="field col-6">
                    <label htmlFor="documentCategorie">{t("documentDocumentCategorie")}</label>
                    <InputText  id="documentCategorieDropdown"  value={selectedItem?.documentCategorie?.libelle}  disabled  />
                </div>
            <div className="field col-6">
                <label htmlFor="description">{t("documentDescription")}</label>
                <span className="p-float-label">
                   <InputTextarea id="description" value={selectedItem?.description} disabled rows={5} cols={30} />
                </span>
            </div>

                <div className="field col-6">
                    <label htmlFor="utilisateur">{t("documentUtilisateur")}</label>
                    <InputText  id="utilisateurDropdown"  value={selectedItem?.utilisateur?.nom}  disabled  />
                </div>
        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="archive">{t("documentArchive")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="archive" checked={selectedItem?.archive} disabled />
                    </span>
            </div>
            </div>

        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="versionne">{t("documentVersionne")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="versionne" checked={selectedItem?.versionne} disabled />
                    </span>
            </div>
            </div>

                <div className="field col-6">
                    <label htmlFor="entiteAdministrative">{t("documentEntiteAdministrative")}</label>
                    <InputText  id="entiteAdministrativeDropdown"  value={selectedItem?.entiteAdministrative?.libelle}  disabled  />
                </div>
        </div>
</TabPanel>
    <TabPanel header={t("documentDocumentFields")}>
                <div className="card">
                    <DataTable value={selectedItem?.documentFields} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="field.libelle" header={t("documentFieldField")}></Column>
                                <Column field="value" header={t("documentFieldValue")}   ></Column>
                                <Column field="documentFieldState.libelle" header={t("documentFieldDocumentFieldState")}></Column>
                    </DataTable>
                </div>
        </TabPanel>
    <TabPanel header={t("documentDocumentPartageGroupes")}>
                <div className="card">
                    <DataTable value={selectedItem?.documentPartageGroupes} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="groupe.libelle" header={t("documentPartageGroupeGroupe")}></Column>
                                <Column field="dateShare" header={t("documentPartageGroupeDateShare")}  body={formateDate("dateShare")} ></Column>
                                <Column field="accessShare.libelle" header={t("documentPartageGroupeAccessShare")}></Column>
                    </DataTable>
                </div>
        </TabPanel>
    <TabPanel header={t("documentDocumentPartageUtilisateurs")}>
                <div className="card">
                    <DataTable value={selectedItem?.documentPartageUtilisateurs} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="utilisateur.nom" header={t("documentPartageUtilisateurUtilisateur")}></Column>
                                <Column field="dateShare" header={t("documentPartageUtilisateurDateShare")}  body={formateDate("dateShare")} ></Column>
                                <Column field="accessShare.libelle" header={t("documentPartageUtilisateurAccessShare")}></Column>
                    </DataTable>
                </div>
        </TabPanel>
</TabView>
</Dialog>
);
};
export default View;
