import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {TabView, TabPanel} from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
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

import {GroupeAdminService} from 'app/controller/service/admin/GroupeAdminService.service';
import  {GroupeDto}  from 'app/controller/model/Groupe.model';

import {UtilisateurDto} from 'app/controller/model/Utilisateur.model';
import {UtilisateurAdminService} from 'app/controller/service/admin/UtilisateurAdminService.service';
import {EtatUtilisateurDto} from 'app/controller/model/EtatUtilisateur.model';
import {EtatUtilisateurAdminService} from 'app/controller/service/admin/EtatUtilisateurAdminService.service';
import {GroupeUtilisateurDto} from 'app/controller/model/GroupeUtilisateur.model';
import {GroupeUtilisateurAdminService} from 'app/controller/service/admin/GroupeUtilisateurAdminService.service';
import {RoleUtilisateurDto} from 'app/controller/model/RoleUtilisateur.model';
import {RoleUtilisateurAdminService} from 'app/controller/service/admin/RoleUtilisateurAdminService.service';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

type GroupeCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: GroupeDto) => void,
    showToast: React.Ref<Toast>,
    list: GroupeDto[],
    t: TFunction
}
const Create: React.FC<GroupeCreateAdminType> = ({visible, onClose, add, showToast, list, t}) => {

    const emptyItem = new GroupeDto();
    const [items, setItems] = useState<GroupeDto[]>(list);
    const [item, setItem] = useState<GroupeDto>(emptyItem);
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(0);

    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const [etatUtilisateurs, setEtatUtilisateurs] = useState<EtatUtilisateurDto[]>([]);
    const [roleUtilisateurs, setRoleUtilisateurs] = useState<RoleUtilisateurDto[]>([]);

    const [groupeUtilisateurs, setGroupeUtilisateurs] = useState<GroupeUtilisateurDto>(new GroupeUtilisateurDto());

    useEffect(() => {

        UtilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        EtatUtilisateurAdminService.getList().then(({data}) => setEtatUtilisateurs(data)).catch(error => console.log(error));
        RoleUtilisateurAdminService.getList().then(({data}) => setRoleUtilisateurs(data)).catch(error => console.log(error));


        UtilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        EtatUtilisateurAdminService.getList().then(({data}) => setEtatUtilisateurs(data)).catch(error => console.log(error));
        RoleUtilisateurAdminService.getList().then(({data}) => setRoleUtilisateurs(data)).catch(error => console.log(error));

    }, []);




    const onDropdownChange = (e: DropdownChangeEvent, field: string) => {
        setItem((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const addGroupeUtilisateurs = () => {
        setSubmitted(true);
        if( item.groupeUtilisateurs == null )
        item.groupeUtilisateurs = new Array<GroupeUtilisateurDto>();
        let _item = groupeUtilisateurs;
        if (!_item.id) {
            item.groupeUtilisateurs.push(_item);
            MessageService.showSuccess(showToast, 'GroupeUtilisateurs Created');
            setItem((prevState :any) => ({...prevState, groupeUtilisateurs: item.groupeUtilisateurs }));
        } else {
            const updatedItems = item.groupeUtilisateurs.map((item) => item.id === groupeUtilisateurs.id ? {...groupeUtilisateurs} : item);
            MessageService.showSuccess(showToast,'GroupeUtilisateurs Updated');
            setItem((prevState :any) => ({ ...prevState, groupeUtilisateurs: updatedItems}));
        }
        setGroupeUtilisateurs(new GroupeUtilisateurDto());
    };

    const deleteGroupeUtilisateurs = (rowData: any) => {
        const updatedItems = item.groupeUtilisateurs.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState,groupeUtilisateurs: updatedItems }));
        setGroupeUtilisateurs(new GroupeUtilisateurDto());
        MessageService.showSuccess(showToast, 'GroupeItem Deleted');
    };

    const editGroupeUtilisateurs = (rowData: any) => {
         setActiveTab(0);
         setGroupeUtilisateurs(rowData);

    };

    const onInputNumerChangeGroupeUtilisateurs = (e: any, name: string) => {
         const val = e.value || 0;
         setGroupeUtilisateurs((prevGroupeUtilisateurs) => ({...prevGroupeUtilisateurs, [name]: val, }));
    };
    const onDropdownChangeGroupeUtilisateurs = (e: any, field: string) => {
        setGroupeUtilisateurs((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onBooleanInputChangeGroupeUtilisateurs = (e: InputSwitchChangeEvent, name: string) => {
       const val = e.value;
       setGroupeUtilisateurs((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangeGroupeUtilisateurs = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setGroupeUtilisateurs({ ...groupeUtilisateurs, [name]:val})
    };

    const onInputTextChangeGroupeUtilisateurs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setGroupeUtilisateurs({ ...groupeUtilisateurs, [name]:val})
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
        return errorMessages.length == 0 ;
    }
    const saveItem = () => {
        setSubmitted(true);
        if (isFormValid()) {
            GroupeAdminService.save(item).then(({data}) =>{
                add(data);
                MessageService.showSuccess(showToast, 'Groupe Created');
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
        <Dialog visible={visible} style={{width: '70vw'}} header={t("groupeTabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("groupeTabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="code">{t("groupeCode")}</label>
                        <InputText id="code" value={item.code} onChange={(e) => onInputTextChange(e, 'code')} required autoFocus className={classNames({'p-invalid': submitted && !item.code})} />
                        {submitted && !item.code && <small className="p-invalid">Code is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="libelle">{t("groupeLibelle")}</label>
                        <InputText id="libelle" value={item.libelle} onChange={(e) => onInputTextChange(e, 'libelle')} required autoFocus className={classNames({'p-invalid': submitted && !item.libelle})} />
                        {submitted && !item.libelle && <small className="p-invalid">Libelle is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="utilisateur">{t("groupeUtilisateur")}</label>
                        <Dropdown  id="utilisateurDropdown"  value={item.utilisateur} options={utilisateurs} onChange={(e) => onDropdownChange(e, 'utilisateur')}   placeholder={t("groupeUtilisateurPlaceHolder")} filter filterPlaceholder={t("groupeUtilisateurPlaceHolderFilter")} optionLabel="nom" />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header={t("groupeGroupeUtilisateurs")}>
                <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                    <TabPanel header={t("creation")}>
                        <div className="grid">
                            <div className="field col-6">
                                <label htmlFor="utilisateur">{t("groupeUtilisateurUtilisateur")}</label>
                                <Dropdown id="utilisateurDropdown" value={groupeUtilisateurs.utilisateur} options={utilisateurs} onChange={(e) => onDropdownChangeGroupeUtilisateurs(e, 'utilisateur')}    placeholder={t("groupeUtilisateurUtilisateurPlaceHolder")} filter filterPlaceholder={t("groupeUtilisateurUtilisateurPlaceHolderFilter")}  optionLabel="nom" />
                             </div>
                            <div className="field col-6">
                                <label htmlFor="dateAjout">{t("groupeUtilisateurDateAjout")}</label>
                                <Calendar id="dateAjout" value={groupeUtilisateurs.dateAjout}  onChange={(e) => onInputDateChangeGroupeUtilisateurs(e, 'dateAjout')} dateFormat="dd/mm/yy"  showIcon={true} />
                            </div>
                            <div className="field col-5">
                                <label htmlFor="etatUtilisateur">{t("groupeUtilisateurEtatUtilisateur")}</label>
                                <Dropdown id="etatUtilisateurDropdown" value={groupeUtilisateurs.etatUtilisateur} options={etatUtilisateurs} onChange={(e) => onDropdownChangeGroupeUtilisateurs(e, 'etatUtilisateur')}    placeholder={t("groupeUtilisateurEtatUtilisateurPlaceHolder")} filter filterPlaceholder={t("groupeUtilisateurEtatUtilisateurPlaceHolderFilter")}  optionLabel="libelle" />
                             </div>
                            <div className="field col-5">
                                <label htmlFor="roleUtilisateur">{t("groupeUtilisateurRoleUtilisateur")}</label>
                                <Dropdown id="roleUtilisateurDropdown" value={groupeUtilisateurs.roleUtilisateur} options={roleUtilisateurs} onChange={(e) => onDropdownChangeGroupeUtilisateurs(e, 'roleUtilisateur')}    placeholder={t("groupeUtilisateurRoleUtilisateurPlaceHolder")} filter filterPlaceholder={t("groupeUtilisateurRoleUtilisateurPlaceHolderFilter")}  optionLabel="libelle" />
                             </div>
                            <div className="field col-1">
                                <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addGroupeUtilisateurs} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={t("list")}>
                    <div className="card">
                    <DataTable value={item.groupeUtilisateurs} tableStyle={{minWidth: '50rem'}} dataKey="id">
                        <Column field="utilisateur.nom" header={t("groupeUtilisateurUtilisateur")}></Column>
                        <Column field="dateAjout" header={t("groupeUtilisateurDateAjout")} body={formateDate("dateAjout")}></Column>
                        <Column field="etatUtilisateur.libelle" header={t("groupeUtilisateurEtatUtilisateur")}></Column>
                        <Column field="roleUtilisateur.libelle" header={t("groupeUtilisateurRoleUtilisateur")}></Column>
                        <Column header={t("actions")} body={(rowData)=> (<div>
                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={()=> deleteGroupeUtilisateurs(rowData)} />
                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={()=> editGroupeUtilisateurs(rowData)} /> </div>)}></Column>
                    </DataTable>
                    </div>
                    </TabPanel>
                </TabView>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
