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
import  {DocumentCategorieFieldDto}  from 'app/controller/model/DocumentCategorieField.model';
import {TFunction} from "i18next";

type DocumentCategorieFieldViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: DocumentCategorieFieldDto,
    t: TFunction
}

const View: React.FC<DocumentCategorieFieldViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new DocumentCategorieFieldDto();
    const [item, setItem] = useState<DocumentCategorieFieldDto>(selectedItem);
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
<Dialog visible={visible} style={{width: '70vw'}} header={t("documentCategorieFieldTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("documentCategorieFieldTabPan")}>
    <div className="formgrid grid">

                <div className="field col-6">
                    <label htmlFor="field">{t("documentCategorieFieldField")}</label>
                    <InputText  id="fieldDropdown"  value={selectedItem?.field?.libelle}  disabled  />
                </div>
                <div className="field col-6">
                    <label htmlFor="documentCategorie">{t("documentCategorieFieldDocumentCategorie")}</label>
                    <InputText  id="documentCategorieDropdown"  value={selectedItem?.documentCategorie?.libelle}  disabled  />
                </div>
                <div className="field col-6">
                    <label htmlFor="documentCategorieFieldRule">{t("documentCategorieFieldDocumentCategorieFieldRule")}</label>
                    <InputText  id="documentCategorieFieldRuleDropdown"  value={selectedItem?.documentCategorieFieldRule?.libelle}  disabled  />
                </div>
        </div>
</TabPanel>
</TabView>
</Dialog>
);
};
export default View;
