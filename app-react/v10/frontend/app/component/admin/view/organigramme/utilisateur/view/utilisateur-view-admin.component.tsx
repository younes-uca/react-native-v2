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
import  {UtilisateurDto}  from 'app/controller/model/Utilisateur.model';
import {TFunction} from "i18next";

type UtilisateurViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: UtilisateurDto,
    t: TFunction
}

const View: React.FC<UtilisateurViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new UtilisateurDto();
    const [item, setItem] = useState<UtilisateurDto>(selectedItem);
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
<Dialog visible={visible} style={{width: '70vw'}} header={t("utilisateurTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("utilisateurTabPan")}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="email">{t("utilisateurEmail")}</label>
                <InputText id="email" value={selectedItem?.email} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="nom">{t("utilisateurNom")}</label>
                <InputText id="nom" value={selectedItem?.nom} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="prenom">{t("utilisateurPrenom")}</label>
                <InputText id="prenom" value={selectedItem?.prenom} disabled   />
            </div>

        </div>
</TabPanel>
</TabView>
</Dialog>
);
};
export default View;
