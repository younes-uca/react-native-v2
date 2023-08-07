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

import {UtilisateurAdminService} from 'app/controller/service/admin/UtilisateurAdminService.service';
import  {UtilisateurDto}  from 'app/controller/model/Utilisateur.model';

import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

type UtilisateurCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: UtilisateurDto) => void,
    showToast: React.Ref<Toast>,
    list: UtilisateurDto[],
    t: TFunction
}
const Create: React.FC<UtilisateurCreateAdminType> = ({visible, onClose, add, showToast, list, t}) => {

    const emptyItem = new UtilisateurDto();
    const [items, setItems] = useState<UtilisateurDto[]>(list);
    const [item, setItem] = useState<UtilisateurDto>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);




    useEffect(() => {


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
        if(item.email == '')
            errorMessages.push("email is required")
        if(item.nom == '')
            errorMessages.push("nom is required")
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            UtilisateurAdminService.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, 'Utilisateur Created');
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
        <Dialog visible={visible} style={{width: '70vw'}} header={t("utilisateurTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("utilisateurTabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="email">{t("utilisateurEmail")}</label>
                        <InputText id="email" value={item.email} onChange={(e) => onInputTextChange(e, 'email')} required autoFocus className={classNames({'p-invalid': submitted && !item.email})} />
                        {submitted && !item.email && <small className="p-invalid">Email is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="nom">{t("utilisateurNom")}</label>
                        <InputText id="nom" value={item.nom} onChange={(e) => onInputTextChange(e, 'nom')} required autoFocus className={classNames({'p-invalid': submitted && !item.nom})} />
                        {submitted && !item.nom && <small className="p-invalid">Nom is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="prenom">{t("utilisateurPrenom")}</label>
                        <InputText id="prenom" value={item.prenom} onChange={(e) => onInputTextChange(e, 'prenom')} required autoFocus className={classNames({'p-invalid': submitted && !item.prenom})} />
                        {submitted && !item.prenom && <small className="p-invalid">Prenom is required.</small>}
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
