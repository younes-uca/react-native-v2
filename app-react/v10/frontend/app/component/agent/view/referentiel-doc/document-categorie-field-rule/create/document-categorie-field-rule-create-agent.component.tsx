import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import {InputSwitch, InputSwitchChangeEvent} from 'primereact/inputswitch';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';

import {MessageService} from 'app/zynerator/service/MessageService';

import {DocumentCategorieFieldRuleAgentService} from 'app/controller/service/agent/DocumentCategorieFieldRuleAgentService.service';
import  {DocumentCategorieFieldRuleDto}  from 'app/controller/model/DocumentCategorieFieldRule.model';

import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

type DocumentCategorieFieldRuleCreateAgentType = {
    visible: boolean,
    onClose: () => void,
    add: (item: DocumentCategorieFieldRuleDto) => void,
    showToast: React.Ref<Toast>,
    list: DocumentCategorieFieldRuleDto[],
    t: TFunction
}
const Create: React.FC<DocumentCategorieFieldRuleCreateAgentType> = ({visible, onClose, add, showToast, list, t}) => {

    const emptyItem = new DocumentCategorieFieldRuleDto();
    const [items, setItems] = useState<DocumentCategorieFieldRuleDto[]>(list);
    const [item, setItem] = useState<DocumentCategorieFieldRuleDto>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);



    useEffect(() => {


    }, []);




    const onDropdownChange = (e: DropdownChangeEvent, field: string) => {
        setItem((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onTabChange = (e: { index: number }) => { setActiveIndex(e.index); };

    const hideDialog = () => {
        setSubmitted(false);
        onClose();
    };


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        if(item.code == '')
            errorMessages.push("code is required")
        if(item.libelle == '')
            errorMessages.push("libelle is required")
        if(item.expresion == '')
            errorMessages.push("expresion is required")
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            DocumentCategorieFieldRuleAgentService.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, 'Document categorie field rule Created');
                onClose();
                setSubmitted(false);
                });
        }
    };

    const onInputTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const value = (e.target && e.target.value) || '';
        setItem({ ...item, [name]: value });
    };

    const onInputDateChange = (e: CalendarChangeEvent, name: string) => {
        const value = (e.value) || '';
        setItem({ ...item, [name]: value });
    };

    const onInputNumerChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value === null ? null : +e.value;
        setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onMultiSelectChange = (e: MultiSelectChangeEvent, field: string) => {
        if (e && e.value) {
            setItem(prevState => ({...prevState, [field]: e.value,}));
        }
    };

    const onBooleanInputChange = (e: any, name: string) => {
       const val = e.value;
       setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" text onClick={saveItem} /> </>
    );

return(
        <Dialog visible={visible} style={{width: '70vw'}} header={t("documentCategorieFieldRuleTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("documentCategorieFieldRuleTabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="code">{t("documentCategorieFieldRuleCode")}</label>
                        <InputText id="code" value={item.code} onChange={(e) => onInputTextChange(e, 'code')} required autoFocus className={classNames({'p-invalid': submitted && !item.code})} />
                        {submitted && !item.code && <small className="p-invalid">Code is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="libelle">{t("documentCategorieFieldRuleLibelle")}</label>
                        <InputText id="libelle" value={item.libelle} onChange={(e) => onInputTextChange(e, 'libelle')} required autoFocus className={classNames({'p-invalid': submitted && !item.libelle})} />
                        {submitted && !item.libelle && <small className="p-invalid">Libelle is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="expresion">{t("documentCategorieFieldRuleExpresion")}</label>
                        <InputText id="expresion" value={item.expresion} onChange={(e) => onInputTextChange(e, 'expresion')} required autoFocus className={classNames({'p-invalid': submitted && !item.expresion})} />
                        {submitted && !item.expresion && <small className="p-invalid">Expresion is required.</small>}
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
