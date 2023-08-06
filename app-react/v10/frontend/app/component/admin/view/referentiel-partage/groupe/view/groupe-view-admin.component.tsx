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
import  {GroupeDto}  from 'app/controller/model/Groupe.model';
import {TFunction} from "i18next";

type GroupeViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: GroupeDto,
    t: TFunction
}

const View: React.FC<GroupeViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new GroupeDto();
    const [item, setItem] = useState<GroupeDto>(selectedItem);
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

return(
<Dialog visible={visible} style={{width: '70vw'}} header={t("groupeTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("groupeTabPan")}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="code">{t("groupeCode")}</label>
                <InputText id="code" value={selectedItem?.code} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="libelle">{t("groupeLibelle")}</label>
                <InputText id="libelle" value={selectedItem?.libelle} disabled   />
            </div>

                <div className="field col-6">
                    <label htmlFor="utilisateur">{t("groupeUtilisateur")}</label>
                    <InputText  id="utilisateurDropdown"  value={selectedItem?.utilisateur?.nom}  disabled  />
                </div>
        </div>
</TabPanel>
    <TabPanel header={t("groupeGroupeUtilisateurs")}>
                <div className="card">
                    <DataTable value={selectedItem?.groupeUtilisateurs} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="utilisateur.nom" header={t("groupeUtilisateurUtilisateur")}></Column>
                                <Column field="dateAjout" header={t("groupeUtilisateurDateAjout")}  body={formateDate("dateAjout")} ></Column>
                                <Column field="etatUtilisateur.libelle" header={t("groupeUtilisateurEtatUtilisateur")}></Column>
                                <Column field="roleUtilisateur.libelle" header={t("groupeUtilisateurRoleUtilisateur")}></Column>
                    </DataTable>
                </div>
        </TabPanel>
</TabView>
</Dialog>
);
};
export default View;
