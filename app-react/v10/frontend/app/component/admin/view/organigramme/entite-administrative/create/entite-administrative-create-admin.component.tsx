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

import {EntiteAdministrativeAdminService} from 'app/controller/service/admin/EntiteAdministrativeAdminService.service';
import  {EntiteAdministrativeDto}  from 'app/controller/model/EntiteAdministrative.model';

import {UtilisateurDto} from 'app/controller/model/Utilisateur.model';
import {UtilisateurAdminService} from 'app/controller/service/admin/UtilisateurAdminService.service';
import {EntiteAdministrativeTypeDto} from 'app/controller/model/EntiteAdministrativeType.model';
import {EntiteAdministrativeTypeAdminService} from 'app/controller/service/admin/EntiteAdministrativeTypeAdminService.service';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

type EntiteAdministrativeCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: EntiteAdministrativeDto) => void,
    showToast: React.Ref<Toast>,
    list: EntiteAdministrativeDto[],
    t: TFunction
}
const Create: React.FC<EntiteAdministrativeCreateAdminType> = ({visible, onClose, add, showToast, list, t}) => {

    const emptyItem = new EntiteAdministrativeDto();
    const [items, setItems] = useState<EntiteAdministrativeDto[]>(list);
    const [item, setItem] = useState<EntiteAdministrativeDto>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);


    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const [entiteAdministrativeTypes, setEntiteAdministrativeTypes] = useState<EntiteAdministrativeTypeDto[]>([]);


    useEffect(() => {

        UtilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        EntiteAdministrativeTypeAdminService.getList().then(({data}) => setEntiteAdministrativeTypes(data)).catch(error => console.log(error));

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
        if(item.code == '')
            errorMessages.push("code is required")
        if(item.libelle == '')
            errorMessages.push("libelle is required")
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            EntiteAdministrativeAdminService.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, 'Entite administrative Created');
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
        <Dialog visible={visible} style={{width: '70vw'}} header={t("entiteAdministrativeTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("entiteAdministrativeTabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="code">{t("entiteAdministrativeCode")}</label>
                        <InputText id="code" value={item.code} onChange={(e) => onInputTextChange(e, 'code')} required autoFocus className={classNames({'p-invalid': submitted && !item.code})} />
                        {submitted && !item.code && <small className="p-invalid">Code is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="description">{t("entiteAdministrativeDescription")}</label>
                        <span className="p-float-label">
                        <InputTextarea id="description" value={item.description} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30}/>
                    </span>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="libelle">{t("entiteAdministrativeLibelle")}</label>
                        <InputText id="libelle" value={item.libelle} onChange={(e) => onInputTextChange(e, 'libelle')} required autoFocus className={classNames({'p-invalid': submitted && !item.libelle})} />
                        {submitted && !item.libelle && <small className="p-invalid">Libelle is required.</small>}
                    </div>
                    <div className="field col-5">
                        <label htmlFor="utilisateur">{t("entiteAdministrativeUtilisateur")}</label>
                        <Dropdown  id="utilisateurDropdown"  value={item.utilisateur} options={utilisateurs} onChange={(e) => onDropdownChange(e, 'utilisateur')}   placeholder={t("entiteAdministrativeUtilisateurPlaceHolder")} filter filterPlaceholder={t("entiteAdministrativeUtilisateurPlaceHolderFilter")} optionLabel="nom" />
                    </div>
                    <div className="field col-5">
                        <label htmlFor="entiteAdministrativeType">{t("entiteAdministrativeEntiteAdministrativeType")}</label>
                        <Dropdown  id="entiteAdministrativeTypeDropdown"  value={item.entiteAdministrativeType} options={entiteAdministrativeTypes} onChange={(e) => onDropdownChange(e, 'entiteAdministrativeType')}   placeholder={t("entiteAdministrativeEntiteAdministrativeTypePlaceHolder")} filter filterPlaceholder={t("entiteAdministrativeEntiteAdministrativeTypePlaceHolderFilter")} optionLabel="libelle" />
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
