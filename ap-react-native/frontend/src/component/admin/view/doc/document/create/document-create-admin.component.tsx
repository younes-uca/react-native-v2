import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {DocumentAdminService} from '../../../../../../controller/service/admin/DocumentAdminService';
import  {DocumentDto}  from '../../../../../../controller/model/DocumentDto';

import {DocumentStateDto} from '../../../../../../controller/model/DocumentStateDto';
import {DocumentStateAdminService} from '../../../../../../controller/service/admin/DocumentStateAdminService';
import {DocumentTypeDto} from '../../../../../../controller/model/DocumentTypeDto';
import {DocumentTypeAdminService} from '../../../../../../controller/service/admin/DocumentTypeAdminService';
import {EntiteAdministrativeDto} from '../../../../../../controller/model/EntiteAdministrativeDto';
import {EntiteAdministrativeAdminService} from '../../../../../../controller/service/admin/EntiteAdministrativeAdminService';
import {DocumentPartageUtilisateurDto} from '../../../../../../controller/model/DocumentPartageUtilisateurDto';
import {DocumentPartageUtilisateurAdminService} from '../../../../../../controller/service/admin/DocumentPartageUtilisateurAdminService';
import {AccessShareDto} from '../../../../../../controller/model/AccessShareDto';
import {AccessShareAdminService} from '../../../../../../controller/service/admin/AccessShareAdminService';
import {FieldDto} from '../../../../../../controller/model/FieldDto';
import {FieldAdminService} from '../../../../../../controller/service/admin/FieldAdminService';
import {DocumentFieldStateDto} from '../../../../../../controller/model/DocumentFieldStateDto';
import {DocumentFieldStateAdminService} from '../../../../../../controller/service/admin/DocumentFieldStateAdminService';
import {DocumentTagDto} from '../../../../../../controller/model/DocumentTagDto';
import {DocumentTagAdminService} from '../../../../../../controller/service/admin/DocumentTagAdminService';
import {TagDto} from '../../../../../../controller/model/TagDto';
import {TagAdminService} from '../../../../../../controller/service/admin/TagAdminService';
import {DocumentCategorieDto} from '../../../../../../controller/model/DocumentCategorieDto';
import {DocumentCategorieAdminService} from '../../../../../../controller/service/admin/DocumentCategorieAdminService';
import {DocumentPartageGroupeDto} from '../../../../../../controller/model/DocumentPartageGroupeDto';
import {DocumentPartageGroupeAdminService} from '../../../../../../controller/service/admin/DocumentPartageGroupeAdminService';
import {DocumentFieldDto} from '../../../../../../controller/model/DocumentFieldDto';
import {DocumentFieldAdminService} from '../../../../../../controller/service/admin/DocumentFieldAdminService';
import {UtilisateurDto} from '../../../../../../controller/model/UtilisateurDto';
import {UtilisateurAdminService} from '../../../../../../controller/service/admin/UtilisateurAdminService';
import {GroupeDto} from '../../../../../../controller/model/GroupeDto';
import {GroupeAdminService} from '../../../../../../controller/service/admin/GroupeAdminService';

const DocumentAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isDocumentCollapsed, setIsDocumentCollapsed] = useState(true);
    const [isItemCollapsed, setIsItemCollapsed] = useState(true);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);

    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const [utilisateurModalVisible, setUtilisateurModalVisible] = useState(false);
    const [selectedUtilisateur, setSelectedUtilisateur] = useState<UtilisateurDto>({id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' , });

    const [entiteAdministratives, setEntiteAdministratives] = useState<EntiteAdministrativeDto[]>([]);
    const [entiteAdministrativeModalVisible, setEntiteAdministrativeModalVisible] = useState(false);
    const [selectedEntiteAdministrative, setSelectedEntiteAdministrative] = useState<EntiteAdministrativeDto>({id : null ,code : '' ,codeEntiteAdminParent : '' ,referenceGed : '' ,description : '' ,libelle : 'select a Entite administrative', });

    const [groupes, setGroupes] = useState<GroupeDto[]>([]);
    const [groupeModalVisible, setGroupeModalVisible] = useState(false);
    const [selectedGroupe, setSelectedGroupe] = useState<GroupeDto>({id : null ,code : '' ,libelle : 'select a Groupe', });

    const [fields, setFields] = useState<FieldDto[]>([]);
    const [fieldModalVisible, setFieldModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<FieldDto>({id : null ,code : '' ,libelle : 'select a Field', });

    const [documentFieldStates, setDocumentFieldStates] = useState<DocumentFieldStateDto[]>([]);
    const [documentFieldStateModalVisible, setDocumentFieldStateModalVisible] = useState(false);
    const [selectedDocumentFieldState, setSelectedDocumentFieldState] = useState<DocumentFieldStateDto>({id : null ,code : '' ,libelle : 'select a Document field state',style : '' , });

    const [documentTypes, setDocumentTypes] = useState<DocumentTypeDto[]>([]);
    const [documentTypeModalVisible, setDocumentTypeModalVisible] = useState(false);
    const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentTypeDto>({id : null ,code : '' ,libelle : 'select a Document type', });

    const [accessShares, setAccessShares] = useState<AccessShareDto[]>([]);
    const [accessShareModalVisible, setAccessShareModalVisible] = useState(false);
    const [selectedAccessShare, setSelectedAccessShare] = useState<AccessShareDto>({id : null ,code : '' ,libelle : 'select a Access share', });

    const [tags, setTags] = useState<TagDto[]>([]);
    const [tagModalVisible, setTagModalVisible] = useState(false);
    const [selectedTag, setSelectedTag] = useState<TagDto>({id : null ,code : '' ,libelle : 'select a Tag', });

    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);
    const [documentCategorieModalVisible, setDocumentCategorieModalVisible] = useState(false);
    const [selectedDocumentCategorie, setSelectedDocumentCategorie] = useState<DocumentCategorieDto>({id : null ,code : '' ,libelle : 'select a Document categorie', });

    const [documentStates, setDocumentStates] = useState<DocumentStateDto[]>([]);
    const [documentStateModalVisible, setDocumentStateModalVisible] = useState(false);
    const [selectedDocumentState, setSelectedDocumentState] = useState<DocumentStateDto>({id : null ,code : '' ,libelle : 'select a Document state',style : '' , });


    const documentStateAdminService = new DocumentStateAdminService();
    const documentTypeAdminService = new DocumentTypeAdminService();
    const entiteAdministrativeAdminService = new EntiteAdministrativeAdminService();
    const documentPartageUtilisateurAdminService = new DocumentPartageUtilisateurAdminService();
    const accessShareAdminService = new AccessShareAdminService();
    const fieldAdminService = new FieldAdminService();
    const documentFieldStateAdminService = new DocumentFieldStateAdminService();
    const documentTagAdminService = new DocumentTagAdminService();
    const tagAdminService = new TagAdminService();
    const documentCategorieAdminService = new DocumentCategorieAdminService();
    const documentPartageGroupeAdminService = new DocumentPartageGroupeAdminService();
    const documentFieldAdminService = new DocumentFieldAdminService();
    const utilisateurAdminService = new UtilisateurAdminService();
    const groupeAdminService = new GroupeAdminService();

    const [documentFields, setDocumentFields] = useState<DocumentFieldDto>(new DocumentFieldDto());
    const [isEditModeDocumentFields, setIsEditModeDocumentFields] = useState(false);
    const [editIndexDocumentFields, setEditIndexDocumentFields] = useState(null);

    const [documentFieldsCollapsible, setDocumentFieldsCollapsible] = useState(false);
    const [isDocumentFieldsCollapsed, setIsDocumentFieldsCollapsed] = useState(false);
    const [isDocumentFields, setIsDocumentFields] = useState(false);
    const [isEditDocumentFieldsMode, setIsEditDocumentFieldsMode] = useState(false);

    const [documentPartageGroupes, setDocumentPartageGroupes] = useState<DocumentPartageGroupeDto>(new DocumentPartageGroupeDto());
    const [isEditModeDocumentPartageGroupes, setIsEditModeDocumentPartageGroupes] = useState(false);
    const [editIndexDocumentPartageGroupes, setEditIndexDocumentPartageGroupes] = useState(null);

    const [documentPartageGroupesCollapsible, setDocumentPartageGroupesCollapsible] = useState(false);
    const [isDocumentPartageGroupesCollapsed, setIsDocumentPartageGroupesCollapsed] = useState(false);
    const [isDocumentPartageGroupes, setIsDocumentPartageGroupes] = useState(false);
    const [isEditDocumentPartageGroupesMode, setIsEditDocumentPartageGroupesMode] = useState(false);

    const [documentPartageUtilisateurs, setDocumentPartageUtilisateurs] = useState<DocumentPartageUtilisateurDto>(new DocumentPartageUtilisateurDto());
    const [isEditModeDocumentPartageUtilisateurs, setIsEditModeDocumentPartageUtilisateurs] = useState(false);
    const [editIndexDocumentPartageUtilisateurs, setEditIndexDocumentPartageUtilisateurs] = useState(null);

    const [documentPartageUtilisateursCollapsible, setDocumentPartageUtilisateursCollapsible] = useState(false);
    const [isDocumentPartageUtilisateursCollapsed, setIsDocumentPartageUtilisateursCollapsed] = useState(false);
    const [isDocumentPartageUtilisateurs, setIsDocumentPartageUtilisateurs] = useState(false);
    const [isEditDocumentPartageUtilisateursMode, setIsEditDocumentPartageUtilisateursMode] = useState(false);

    const [documentTags, setDocumentTags] = useState<DocumentTagDto[]>(new Array<DocumentTagDto>());

    const { control, handleSubmit, reset } = useForm<DocumentDto>({
        defaultValues: {
        reference: '' ,
        content: '' ,
        size: null ,
        documentType: undefined,
        documentState: undefined,
        documentCategorie: undefined,
        description: '' ,
        utilisateur: undefined,
        entiteAdministrative: undefined,
        },
    });

    const documentCollapsible = () => {
        setIsDocumentCollapsed(!isDocumentCollapsed);
        setIsItemCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const handleCloseUtilisateurModal = () => {
        setUtilisateurModalVisible(false);
    };

    const onUtilisateurSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedUtilisateur(item);
        setUtilisateurModalVisible(false);
    };
    const handleCloseEntiteAdministrativeModal = () => {
        setEntiteAdministrativeModalVisible(false);
    };

    const onEntiteAdministrativeSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedEntiteAdministrative(item);
        setEntiteAdministrativeModalVisible(false);
    };
    const handleCloseGroupeModal = () => {
        setGroupeModalVisible(false);
    };

    const onGroupeSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedGroupe(item);
        setGroupeModalVisible(false);
    };
    const handleCloseFieldModal = () => {
        setFieldModalVisible(false);
    };

    const onFieldSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedField(item);
        setFieldModalVisible(false);
    };
    const handleCloseDocumentFieldStateModal = () => {
        setDocumentFieldStateModalVisible(false);
    };

    const onDocumentFieldStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedDocumentFieldState(item);
        setDocumentFieldStateModalVisible(false);
    };
    const handleCloseDocumentTypeModal = () => {
        setDocumentTypeModalVisible(false);
    };

    const onDocumentTypeSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedDocumentType(item);
        setDocumentTypeModalVisible(false);
    };
    const handleCloseAccessShareModal = () => {
        setAccessShareModalVisible(false);
    };

    const onAccessShareSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedAccessShare(item);
        setAccessShareModalVisible(false);
    };
    const handleCloseTagModal = () => {
        setTagModalVisible(false);
    };

    const onTagSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedTag(item);
        setTagModalVisible(false);
    };
    const handleCloseDocumentCategorieModal = () => {
        setDocumentCategorieModalVisible(false);
    };

    const onDocumentCategorieSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedDocumentCategorie(item);
        setDocumentCategorieModalVisible(false);
    };
    const handleCloseDocumentStateModal = () => {
        setDocumentStateModalVisible(false);
    };

    const onDocumentStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedDocumentState(item);
        setDocumentStateModalVisible(false);
    };


    useEffect(() => {
        documentTypeAdminService.getList().then(({data}) => setDocumentTypes(data)).catch(error => console.log(error));
        documentStateAdminService.getList().then(({data}) => setDocumentStates(data)).catch(error => console.log(error));
        documentCategorieAdminService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));
        utilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        entiteAdministrativeAdminService.getList().then(({data}) => setEntiteAdministratives(data)).catch(error => console.log(error));

        fieldAdminService.getList().then(({data}) => setFields(data)).catch(error => console.log(error));
        documentFieldStateAdminService.getList().then(({data}) => setDocumentFieldStates(data)).catch(error => console.log(error));

        groupeAdminService.getList().then(({data}) => setGroupes(data)).catch(error => console.log(error));
        accessShareAdminService.getList().then(({data}) => setAccessShares(data)).catch(error => console.log(error));

        utilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        accessShareAdminService.getList().then(({data}) => setAccessShares(data)).catch(error => console.log(error));
        tagAdminService.getList().then(({data}) => {
            const DocumentTags = data?.map(prepareDocumentTag)
            setDocumentTags(documentTags)
        })

    }, []);

    const prepareDocumentTag = (tag: TagDto) => {
        const documentTag = new DocumentTagDto();
        documentTag.tag = tag;
        return documentTag;
    }

    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<DocumentFieldDto>({
        defaultValues: {
            field: undefined,
            document: undefined,
            value: '' ,
            documentFieldState: undefined,
        },
    });

    const documentFieldsItemCollapsible = () => {
        setIsItemCollapsed(!isItemCollapsed);
        setIsDocumentCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const documentFieldsItemsCollapsible = () => {
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsDocumentCollapsed(true);
        setIsItemCollapsed(true);
    };


    const handleAddDocumentFields = (data: DocumentFieldDto) => {
        if (data) {
            const newDocumentField: DocumentFieldDto = { field: selectedField , document: undefined ,value: data.value ,documentFieldState: selectedDocumentFieldState ,  };
            setDocumentFields((prevItems) => [...prevItems, newDocumentField]);
            resetItem({value: '' ,});
                setSelectedField({id : null ,code : '' ,libelle : 'select a Field',});
                setSelectedDocumentFieldState({id : null ,code : '' ,libelle : 'select a Document field state',style : '' ,});
        }
    };

    const handleDeleteDocumentFields = (index) => {
        const updatedItems = documentFields.filter((item, i) => i !== index);
        setDocumentFields(updatedItems);
    };

    const handleUpdateDocumentFields = (data: DocumentFieldDto) => {
        if (data) {
            documentFields.map((item, i) => {
                if (i === editIndexDocumentFields) {
                    field: undefined ;
                    item.field = selectedField;
                    item.value = data.value;
                    documentFieldState: undefined ;
                    item.documentFieldState = selectedDocumentFieldState;
                }
            });
            resetItem({value: '' ,});
            setSelectedField({id : null ,code : '' ,libelle : 'select a Field', });
            setSelectedDocumentFieldState({id : null ,code : '' ,libelle : 'select a Document field state',style : '' , });
            setIsEditModeDocumentFields(false);
        }
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    }

    const updateFormDefaultValuesDocumentFields = (index: number) => {
        let updatedDocumentField: DocumentFieldDto;
        setEditIndexDocumentFields(index);
        setIsEditModeDocumentFields(true);
        documentFields.map((item, i) => {
            if (i === index) {
                updatedDocumentField = item;
            }
        });
        resetItem({value: updatedDocumentField.value ,});
        setSelectedField(updatedDocumentField.field);
        setSelectedDocumentFieldState(updatedDocumentField.documentFieldState);
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    };
    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<DocumentPartageGroupeDto>({
        defaultValues: {
            document: undefined,
            groupe: undefined,
            accessShare: undefined,
        },
    });

    const documentPartageGroupesItemCollapsible = () => {
        setIsItemCollapsed(!isItemCollapsed);
        setIsDocumentCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const documentPartageGroupesItemsCollapsible = () => {
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsDocumentCollapsed(true);
        setIsItemCollapsed(true);
    };


    const handleAddDocumentPartageGroupes = (data: DocumentPartageGroupeDto) => {
        if (data) {
            const newDocumentPartageGroupe: DocumentPartageGroupeDto = { document: undefined ,groupe: selectedGroupe , dateShare: data.dateShare ,accessShare: selectedAccessShare ,  };
            setDocumentPartageGroupes((prevItems) => [...prevItems, newDocumentPartageGroupe]);
            resetItem({});
                setSelectedGroupe({id : null ,code : '' ,libelle : 'select a Groupe',});
                setSelectedAccessShare({id : null ,code : '' ,libelle : 'select a Access share',});
        }
    };

    const handleDeleteDocumentPartageGroupes = (index) => {
        const updatedItems = documentPartageGroupes.filter((item, i) => i !== index);
        setDocumentPartageGroupes(updatedItems);
    };

    const handleUpdateDocumentPartageGroupes = (data: DocumentPartageGroupeDto) => {
        if (data) {
            documentPartageGroupes.map((item, i) => {
                if (i === editIndexDocumentPartageGroupes) {
                    groupe: undefined ;
                    item.groupe = selectedGroupe;
                    item.dateShare = data.dateShare;
                    accessShare: undefined ;
                    item.accessShare = selectedAccessShare;
                }
            });
            resetItem({});
            setSelectedGroupe({id : null ,code : '' ,libelle : 'select a Groupe', });
            setSelectedAccessShare({id : null ,code : '' ,libelle : 'select a Access share', });
            setIsEditModeDocumentPartageGroupes(false);
        }
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    }

    const updateFormDefaultValuesDocumentPartageGroupes = (index: number) => {
        let updatedDocumentPartageGroupe: DocumentPartageGroupeDto;
        setEditIndexDocumentPartageGroupes(index);
        setIsEditModeDocumentPartageGroupes(true);
        documentPartageGroupes.map((item, i) => {
            if (i === index) {
                updatedDocumentPartageGroupe = item;
            }
        });
        resetItem({dateShare: updatedDocumentPartageGroupe.dateShare ,});
        setSelectedGroupe(updatedDocumentPartageGroupe.groupe);
        setSelectedAccessShare(updatedDocumentPartageGroupe.accessShare);
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    };
    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<DocumentPartageUtilisateurDto>({
        defaultValues: {
            document: undefined,
            utilisateur: undefined,
            accessShare: undefined,
        },
    });

    const documentPartageUtilisateursItemCollapsible = () => {
        setIsItemCollapsed(!isItemCollapsed);
        setIsDocumentCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const documentPartageUtilisateursItemsCollapsible = () => {
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsDocumentCollapsed(true);
        setIsItemCollapsed(true);
    };


    const handleAddDocumentPartageUtilisateurs = (data: DocumentPartageUtilisateurDto) => {
        if (data) {
            const newDocumentPartageUtilisateur: DocumentPartageUtilisateurDto = { document: undefined ,utilisateur: selectedUtilisateur , dateShare: data.dateShare ,accessShare: selectedAccessShare ,  };
            setDocumentPartageUtilisateurs((prevItems) => [...prevItems, newDocumentPartageUtilisateur]);
            resetItem({});
                setSelectedUtilisateur({id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' ,});
                setSelectedAccessShare({id : null ,code : '' ,libelle : 'select a Access share',});
        }
    };

    const handleDeleteDocumentPartageUtilisateurs = (index) => {
        const updatedItems = documentPartageUtilisateurs.filter((item, i) => i !== index);
        setDocumentPartageUtilisateurs(updatedItems);
    };

    const handleUpdateDocumentPartageUtilisateurs = (data: DocumentPartageUtilisateurDto) => {
        if (data) {
            documentPartageUtilisateurs.map((item, i) => {
                if (i === editIndexDocumentPartageUtilisateurs) {
                    utilisateur: undefined ;
                    item.utilisateur = selectedUtilisateur;
                    item.dateShare = data.dateShare;
                    accessShare: undefined ;
                    item.accessShare = selectedAccessShare;
                }
            });
            resetItem({});
            setSelectedUtilisateur({id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' , });
            setSelectedAccessShare({id : null ,code : '' ,libelle : 'select a Access share', });
            setIsEditModeDocumentPartageUtilisateurs(false);
        }
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    }

    const updateFormDefaultValuesDocumentPartageUtilisateurs = (index: number) => {
        let updatedDocumentPartageUtilisateur: DocumentPartageUtilisateurDto;
        setEditIndexDocumentPartageUtilisateurs(index);
        setIsEditModeDocumentPartageUtilisateurs(true);
        documentPartageUtilisateurs.map((item, i) => {
            if (i === index) {
                updatedDocumentPartageUtilisateur = item;
            }
        });
        resetItem({dateShare: updatedDocumentPartageUtilisateur.dateShare ,});
        setSelectedUtilisateur(updatedDocumentPartageUtilisateur.utilisateur);
        setSelectedAccessShare(updatedDocumentPartageUtilisateur.accessShare);
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    };


    const handleSave = async (item: DocumentDto) => {
        item.documentType = selectedDocumentType;
        item.documentState = selectedDocumentState;
        item.documentCategorie = selectedDocumentCategorie;
        item.documentFields = documentFields;
        item.utilisateur = selectedUtilisateur;
        item.entiteAdministrative = selectedEntiteAdministrative;
        item.documentPartageGroupes = documentPartageGroupes;
        item.documentPartageUtilisateurs = documentPartageUtilisateurs;
        Keyboard.dismiss();
        try {
            await DocumentAdminService.save( item );
            setIsItemsCollapsed(!isItemsCollapsed);
            reset();
            setSelectedDocumentType({ id : null ,code : '' ,libelle : 'select a Document type',});
            setSelectedDocumentState({ id : null ,code : '' ,libelle : 'select a Document state',style : '' ,});
            setSelectedDocumentCategorie({ id : null ,code : '' ,libelle : 'select a Document categorie',});
            setSelectedUtilisateur({ id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' ,});
            setSelectedEntiteAdministrative({ id : null ,code : '' ,codeEntiteAdminParent : '' ,referenceGed : '' ,description : '' ,libelle : 'select a Entite administrative',});
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            item.documentFields = documentFields;
            setDocumentFields([]);
            item.documentPartageGroupes = documentPartageGroupes;
            setDocumentPartageGroupes([]);
            item.documentPartageUtilisateurs = documentPartageUtilisateurs;
            setDocumentPartageUtilisateurs([]);
        } catch (error) {
            console.error('Error saving document:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create Document< /Text>

            <TouchableOpacity onPress={documentCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Document< /Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDocumentCollapsed}>
                            <CustomInput control={control} name={'reference'} placeholder={'Reference'} keyboardT="default" />
                            <CustomInput control={control} name={'referenceGed'} placeholder={'Reference ged'} keyboardT="numeric" />
                            <CustomInput control={control} name={'uploadDate'} placeholder={'Upload date'} keyboardT="numeric" />
                            <CustomInput control={control} name={'dateLastUpdate'} placeholder={'Date last update'} keyboardT="numeric" />
                            <CustomInput control={control} name={'content'} placeholder={'Content'} keyboardT="default" />
                            <CustomInput control={control} name={'folder'} placeholder={'Folder'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setDocumentTypeModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedDocumentType.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDocumentStateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedDocumentState.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDocumentCategorieModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedDocumentCategorie.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setUtilisateurModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedUtilisateur.nom}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                            <CustomInput control={control} name={'archive'} placeholder={'Archive'} keyboardT="numeric" />
                            <CustomInput control={control} name={'versionne'} placeholder={'Versionne'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setEntiteAdministrativeModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedEntiteAdministrative.libelle}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            </Collapsible>
            <TouchableOpacity onPress={documentFieldsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Document fields</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDocumentFieldsCollapsed}>
                <TouchableOpacity onPress={() => setFieldModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedField.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDocumentModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedDocument.reference}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                            <CustomInput control={itemControl} name={'value'} placeholder={'Value'} keyboardT="default" />
                <TouchableOpacity onPress={() => setDocumentFieldStateModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedDocumentFieldState.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ isEditDocumentFieldsMode ? handleItemSubmit((data) => { handleUpdateDocumentFields(data); }) : handleItemSubmit(handleAddDocumentFields) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditModeDocumentFields ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>

            <TouchableOpacity onPress={itemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Document fields</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isItemsCollapsed}>
                { documentFields && documentFields.length > 0 ? ( documentFields.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Field: {item.field.libelle}</Text>
                            <Text style={styles.infos}>'Document: {item.document.reference}</Text>
                            <Text style={styles.infos}>'Value: {item.value}</Text>
                            <Text style={styles.infos}>'Document field state: {item.documentFieldState.libelle}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteDocumentFields(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValuesDocumentFields(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No document fields yet.</Text>
                    </View>
                )}
            </Collapsible>
            <TouchableOpacity onPress={documentPartageGroupesCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Document partage groupes</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDocumentPartageGroupesCollapsed}>
                <TouchableOpacity onPress={() => setDocumentModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedDocument.reference}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGroupeModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedGroupe.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAccessShareModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedAccessShare.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ isEditDocumentPartageGroupesMode ? handleItemSubmit((data) => { handleUpdateDocumentPartageGroupes(data); }) : handleItemSubmit(handleAddDocumentPartageGroupes) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditModeDocumentPartageGroupes ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>

            <TouchableOpacity onPress={itemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Document partage groupes</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isItemsCollapsed}>
                { documentPartageGroupes && documentPartageGroupes.length > 0 ? ( documentPartageGroupes.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Document: {item.document.reference}</Text>
                            <Text style={styles.infos}>'Groupe: {item.groupe.libelle}</Text>
                            <Text style={styles.infos}>'Date share: {item.dateShare}</Text>
                            <Text style={styles.infos}>'Access share: {item.accessShare.libelle}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteDocumentPartageGroupes(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValuesDocumentPartageGroupes(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No document partage groupes yet.</Text>
                    </View>
                )}
            </Collapsible>
            <TouchableOpacity onPress={documentPartageUtilisateursCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Document partage utilisateurs</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDocumentPartageUtilisateursCollapsed}>
                <TouchableOpacity onPress={() => setDocumentModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedDocument.reference}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUtilisateurModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedUtilisateur.nom}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAccessShareModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedAccessShare.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ isEditDocumentPartageUtilisateursMode ? handleItemSubmit((data) => { handleUpdateDocumentPartageUtilisateurs(data); }) : handleItemSubmit(handleAddDocumentPartageUtilisateurs) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditModeDocumentPartageUtilisateurs ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>

            <TouchableOpacity onPress={itemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Document partage utilisateurs</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isItemsCollapsed}>
                { documentPartageUtilisateurs && documentPartageUtilisateurs.length > 0 ? ( documentPartageUtilisateurs.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Document: {item.document.reference}</Text>
                            <Text style={styles.infos}>'Utilisateur: {item.utilisateur.nom}</Text>
                            <Text style={styles.infos}>'Date share: {item.dateShare}</Text>
                            <Text style={styles.infos}>'Access share: {item.accessShare.libelle}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteDocumentPartageUtilisateurs(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValuesDocumentPartageUtilisateurs(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No document partage utilisateurs yet.</Text>
                    </View>
                )}
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save Document"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {utilisateurs !== null && utilisateurs.length > 0 ? ( <FilterModal visibility={utilisateurModalVisible} placeholder={"Select a Utilisateur"} onItemSelect={onUtilisateurSelect} items={utilisateurs} onClose={handleCloseUtilisateurModal} variable={'nom'} /> ) : null}
        {entiteAdministratives !== null && entiteAdministratives.length > 0 ? ( <FilterModal visibility={entiteAdministrativeModalVisible} placeholder={"Select a EntiteAdministrative"} onItemSelect={onEntiteAdministrativeSelect} items={entiteAdministratives} onClose={handleCloseEntiteAdministrativeModal} variable={'libelle'} /> ) : null}
        {groupes !== null && groupes.length > 0 ? ( <FilterModal visibility={groupeModalVisible} placeholder={"Select a Groupe"} onItemSelect={onGroupeSelect} items={groupes} onClose={handleCloseGroupeModal} variable={'libelle'} /> ) : null}
        {fields !== null && fields.length > 0 ? ( <FilterModal visibility={fieldModalVisible} placeholder={"Select a Field"} onItemSelect={onFieldSelect} items={fields} onClose={handleCloseFieldModal} variable={'libelle'} /> ) : null}
        {documentFieldStates !== null && documentFieldStates.length > 0 ? ( <FilterModal visibility={documentFieldStateModalVisible} placeholder={"Select a DocumentFieldState"} onItemSelect={onDocumentFieldStateSelect} items={documentFieldStates} onClose={handleCloseDocumentFieldStateModal} variable={'libelle'} /> ) : null}
        {documentTypes !== null && documentTypes.length > 0 ? ( <FilterModal visibility={documentTypeModalVisible} placeholder={"Select a DocumentType"} onItemSelect={onDocumentTypeSelect} items={documentTypes} onClose={handleCloseDocumentTypeModal} variable={'libelle'} /> ) : null}
        {accessShares !== null && accessShares.length > 0 ? ( <FilterModal visibility={accessShareModalVisible} placeholder={"Select a AccessShare"} onItemSelect={onAccessShareSelect} items={accessShares} onClose={handleCloseAccessShareModal} variable={'libelle'} /> ) : null}
        {tags !== null && tags.length > 0 ? ( <FilterModal visibility={tagModalVisible} placeholder={"Select a Tag"} onItemSelect={onTagSelect} items={tags} onClose={handleCloseTagModal} variable={'libelle'} /> ) : null}
        {documentCategories !== null && documentCategories.length > 0 ? ( <FilterModal visibility={documentCategorieModalVisible} placeholder={"Select a DocumentCategorie"} onItemSelect={onDocumentCategorieSelect} items={documentCategories} onClose={handleCloseDocumentCategorieModal} variable={'libelle'} /> ) : null}
        {documentStates !== null && documentStates.length > 0 ? ( <FilterModal visibility={documentStateModalVisible} placeholder={"Select a DocumentState"} onItemSelect={onDocumentStateSelect} items={documentStates} onClose={handleCloseDocumentStateModal} variable={'libelle'} /> ) : null}
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        //paddingHorizontal: 5,
        marginTop: 15,
        marginBottom: 10
    },

    input: {
        height: 50,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        flexDirection: 'row'
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 10
    },

    itemInput: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15,
        height: 50,
    },

    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5,
        fontSize: 15,
        fontWeight: 'bold'
    },

    itemCard: {
        marginVertical: 5,
        backgroundColor: '#f8f8ff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    placeHolder: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        padding: 15,
        marginTop: 15,
    }
});

export default DocumentAdminCreate;
