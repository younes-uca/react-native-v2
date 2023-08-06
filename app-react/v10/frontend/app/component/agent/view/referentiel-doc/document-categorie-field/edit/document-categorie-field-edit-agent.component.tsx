import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import {MultiSelect} from 'primereact/multiselect';

import {MessageService} from 'app/zynerator/service/MessageService';

import {DocumentCategorieFieldAgentService} from 'app/controller/service/agent/DocumentCategorieFieldAgentService.service';
import  {DocumentCategorieFieldDto}  from 'app/controller/model/DocumentCategorieField.model';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

import {FieldDto} from 'app/controller/model/Field.model';
import {FieldAgentService} from 'app/controller/service/agent/FieldAgentService.service';
import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';
import {DocumentCategorieFieldRuleAgentService} from 'app/controller/service/agent/DocumentCategorieFieldRuleAgentService.service';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieAgentService} from 'app/controller/service/agent/DocumentCategorieAgentService.service';
type DocumentCategorieFieldEditAgentType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: DocumentCategorieFieldDto
    update: (item: DocumentCategorieFieldDto) => void,
    t: TFunction
}
const Edit: React.FC<DocumentCategorieFieldEditAgentType> = ({visible, onClose, showToast, selectedItem, update, t}) => {

    const emptyItem = new DocumentCategorieFieldDto();
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);
    const [item, setItem] = useState<DocumentCategorieFieldDto>(selectedItem);
    const [fields, setFields] = useState<FieldDto[]>([]);
    const [documentCategorieFieldRules, setDocumentCategorieFieldRules] = useState<DocumentCategorieFieldRuleDto[]>([]);
    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);




    useEffect(() => {

        FieldAgentService.getList().then(({data}) => setFields(data)).catch(error => console.log(error));
        DocumentCategorieFieldRuleAgentService.getList().then(({data}) => setDocumentCategorieFieldRules(data)).catch(error => console.log(error));
        DocumentCategorieAgentService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));

    }, []);





    const onDropdownChange = (e: any, field: string) => {
        setItem((prevState) => ({ ...prevState, [field]: e.value, }));
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
    const editItem = async () => {
        setSubmitted(true);
        if (isFormValid()) {
            const response = await DocumentCategorieFieldAgentService.update(item);
            update(response.data);
            MessageService.showSuccess(showToast, 'DocumentCategorieField Updated');
            onClose();
            setSubmitted(false);
    }
};

    const onInputTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const value = (e.target && e.target.value) || '';
        setItem({ ...item, [name]: value });
        };
    const onInputDateChange = (e: CalendarChangeEvent, name: string) => {
        const value = e.value || '';
        setItem({ ...item, [name]: value });
    };

    const onInputNumerChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value === null ? null : +e.value;
        setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onMultiSelectChange = (e: any, field: string) => {
        if (e && e.value && Array.isArray(e.value)) {
            const selectedValues = e.value.map(option => option && option.value);
            setItem(prevState => ({ ...prevState, [field]: selectedValues, }));
        }
    };

    const onBooleanInputChange = (e: any, name: string) => {
        const val = e.value;
        setItem((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const itemDialogFooter = ( <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" text onClick={editItem} /> </>
    );



    return(
    <Dialog visible={visible} style={{width: '70vw'}} header={t("documentCategorieFieldTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("documentCategorieFieldTabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="field">{t("documentCategorieFieldField")}</label>
                        <Dropdown  id="fieldDropdown"  value={item ? item.field : ''} options={fields} onChange={(e) => onDropdownChange(e, 'field')}   placeholder="Sélectionnez un field" filter filterPlaceholder="Rechercher un field" optionLabel="libelle" />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="documentCategorie">{t("documentCategorieFieldDocumentCategorie")}</label>
                        <Dropdown  id="documentCategorieDropdown"  value={item ? item.documentCategorie : ''} options={documentCategories} onChange={(e) => onDropdownChange(e, 'documentCategorie')}   placeholder="Sélectionnez un documentCategorie" filter filterPlaceholder="Rechercher un documentCategorie" optionLabel="libelle" />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="documentCategorieFieldRule">{t("documentCategorieFieldDocumentCategorieFieldRule")}</label>
                        <Dropdown  id="documentCategorieFieldRuleDropdown"  value={item ? item.documentCategorieFieldRule : ''} options={documentCategorieFieldRules} onChange={(e) => onDropdownChange(e, 'documentCategorieFieldRule')}   placeholder="Sélectionnez un documentCategorieFieldRule" filter filterPlaceholder="Rechercher un documentCategorieFieldRule" optionLabel="libelle" />
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Edit;


