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
import  {EntiteAdministrativeDto}  from 'app/controller/model/EntiteAdministrative.model';
import {TFunction} from "i18next";

type EntiteAdministrativeViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: EntiteAdministrativeDto,
    t: TFunction
}

const View: React.FC<EntiteAdministrativeViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new EntiteAdministrativeDto();
    const [item, setItem] = useState<EntiteAdministrativeDto>(selectedItem);
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
<Dialog visible={visible} style={{width: '70vw'}} header={t("entiteAdministrativeTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("entiteAdministrativeTabPan")}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="code">{t("entiteAdministrativeCode")}</label>
                <InputText id="code" value={selectedItem?.code} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="description">{t("entiteAdministrativeDescription")}</label>
                <span className="p-float-label">
                   <InputTextarea id="description" value={selectedItem?.description} disabled rows={5} cols={30} />
                </span>
            </div>

            <div className="field col-6">
                <label htmlFor="libelle">{t("entiteAdministrativeLibelle")}</label>
                <InputText id="libelle" value={selectedItem?.libelle} disabled   />
            </div>

                <div className="field col-6">
                    <label htmlFor="utilisateur">{t("entiteAdministrativeUtilisateur")}</label>
                    <InputText  id="utilisateurDropdown"  value={selectedItem?.utilisateur?.nom}  disabled  />
                </div>
                <div className="field col-6">
                    <label htmlFor="entiteAdministrativeType">{t("entiteAdministrativeEntiteAdministrativeType")}</label>
                    <InputText  id="entiteAdministrativeTypeDropdown"  value={selectedItem?.entiteAdministrativeType?.libelle}  disabled  />
                </div>
        </div>
</TabPanel>
</TabView>
</Dialog>
);
};
export default View;
