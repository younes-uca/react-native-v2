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
import  {DocumentCategorieDto}  from 'app/controller/model/DocumentCategorie.model';
import {TFunction} from "i18next";

type DocumentCategorieViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: DocumentCategorieDto,
    t: TFunction
}

const View: React.FC<DocumentCategorieViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const emptyItem = new DocumentCategorieDto();
    const [item, setItem] = useState<DocumentCategorieDto>(selectedItem);
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
<Dialog visible={visible} style={{width: '70vw'}} header={t("documentCategorieTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("documentCategorieTabPan")}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="code">{t("documentCategorieCode")}</label>
                <InputText id="code" value={selectedItem?.code} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="libelle">{t("documentCategorieLibelle")}</label>
                <InputText id="libelle" value={selectedItem?.libelle} disabled   />
            </div>

        </div>
</TabPanel>
    <TabPanel header={t("documentCategorieDocumentCategorieFields")}>
                <div className="card">
                    <DataTable value={selectedItem?.documentCategorieFields} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="field.libelle" header={t("documentCategorieFieldField")}></Column>
                                <Column field="documentCategorieFieldRule.libelle" header={t("documentCategorieFieldDocumentCategorieFieldRule")}></Column>
                    </DataTable>
                </div>
        </TabPanel>
</TabView>
</Dialog>
);
};
export default View;
