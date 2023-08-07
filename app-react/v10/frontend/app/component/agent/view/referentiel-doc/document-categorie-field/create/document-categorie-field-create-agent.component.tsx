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
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {MessageService} from 'app/zynerator/service/MessageService';

import {DocumentCategorieFieldAgentService} from 'app/controller/service/agent/DocumentCategorieFieldAgentService.service';
import  {DocumentCategorieFieldDto}  from 'app/controller/model/DocumentCategorieField.model';

import {FieldDto} from 'app/controller/model/Field.model';
import {FieldAgentService} from 'app/controller/service/agent/FieldAgentService.service';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieAgentService} from 'app/controller/service/agent/DocumentCategorieAgentService.service';
import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';
import {DocumentCategorieFieldRuleAgentService} from 'app/controller/service/agent/DocumentCategorieFieldRuleAgentService.service';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

type DocumentCategorieFieldCreateAgentType = {
    visible: boolean,
    onClose: () => void,
    add: (item: DocumentCategorieFieldDto) => void,
    showToast: React.Ref<Toast>,
    list: DocumentCategorieFieldDto[],
    t: TFunction
}
const Create: React.FC<DocumentCategorieFieldCreateAgentType> = ({visible, onClose, add, showToast, list, t}) => {

    const emptyItem = new DocumentCategorieFieldDto();
    const [items, setItems] = useState<DocumentCategorieFieldDto[]>(list);
    const [item, setItem] = useState<DocumentCategorieFieldDto>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);


    const [fields, setFields] = useState<FieldDto[]>([]);
    const [documentCategorieFieldRules, setDocumentCategorieFieldRules] = useState<DocumentCategorieFieldRuleDto[]>([]);
    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);


    useEffect(() => {

        FieldAgentService.getList().then(({data}) => setFields(data)).catch(error => console.log(error));
        DocumentCategorieAgentService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));
        DocumentCategorieFieldRuleAgentService.getList().then(({data}) => setDocumentCategorieFieldRules(data)).catch(error => console.log(error));

    }, []);





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
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            DocumentCategorieFieldAgentService.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, 'Document categorie field Created');
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
        <Dialog visible={visible} style={{width: '70vw'}} header={t("documentCategorieFieldTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("documentCategorieFieldTabPan")}>
                <div className="formgrid grid">
                    <div className="field col-5">
                        <label htmlFor="field">{t("documentCategorieFieldField")}</label>
                        <Dropdown  id="fieldDropdown"  value={item.field} options={fields} onChange={(e) => onDropdownChange(e, 'field')}   placeholder={t("documentCategorieFieldFieldPlaceHolder")} filter filterPlaceholder={t("documentCategorieFieldFieldPlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                    <div className="field col-5">
                        <label htmlFor="documentCategorie">{t("documentCategorieFieldDocumentCategorie")}</label>
                        <Dropdown  id="documentCategorieDropdown"  value={item.documentCategorie} options={documentCategories} onChange={(e) => onDropdownChange(e, 'documentCategorie')}   placeholder={t("documentCategorieFieldDocumentCategoriePlaceHolder")} filter filterPlaceholder={t("documentCategorieFieldDocumentCategoriePlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                    <div className="field col-5">
                        <label htmlFor="documentCategorieFieldRule">{t("documentCategorieFieldDocumentCategorieFieldRule")}</label>
                        <Dropdown  id="documentCategorieFieldRuleDropdown"  value={item.documentCategorieFieldRule} options={documentCategorieFieldRules} onChange={(e) => onDropdownChange(e, 'documentCategorieFieldRule')}   placeholder={t("documentCategorieFieldDocumentCategorieFieldRulePlaceHolder")} filter filterPlaceholder={t("documentCategorieFieldDocumentCategorieFieldRulePlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
