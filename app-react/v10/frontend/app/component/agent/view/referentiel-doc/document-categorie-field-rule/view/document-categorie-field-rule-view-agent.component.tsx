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
import  {DocumentCategorieFieldRuleDto}  from 'app/controller/model/DocumentCategorieFieldRule.model';
import {TFunction} from "i18next";

type DocumentCategorieFieldRuleViewAgentType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: DocumentCategorieFieldRuleDto,
    t: TFunction
}

const View: React.FC<DocumentCategorieFieldRuleViewAgentType> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new DocumentCategorieFieldRuleDto();
    const [item, setItem] = useState<DocumentCategorieFieldRuleDto>(selectedItem);
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
<Dialog visible={visible} style={{width: '70vw'}} header={t("documentCategorieFieldRuleTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("documentCategorieFieldRuleTabPan")}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="code">{t("documentCategorieFieldRuleCode")}</label>
                <InputText id="code" value={selectedItem?.code} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="libelle">{t("documentCategorieFieldRuleLibelle")}</label>
                <InputText id="libelle" value={selectedItem?.libelle} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="expresion">{t("documentCategorieFieldRuleExpresion")}</label>
                <InputText id="expresion" value={selectedItem?.expresion} disabled   />
            </div>

        </div>
</TabPanel>
</TabView>
</Dialog>
);
};
export default View;
