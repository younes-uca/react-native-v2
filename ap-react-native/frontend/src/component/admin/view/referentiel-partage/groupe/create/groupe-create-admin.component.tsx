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

import {GroupeAdminService} from '../../../../../../controller/service/admin/GroupeAdminService';
import  {GroupeDto}  from '../../../../../../controller/model/GroupeDto';

import {EtatUtilisateurDto} from '../../../../../../controller/model/EtatUtilisateurDto';
import {EtatUtilisateurAdminService} from '../../../../../../controller/service/admin/EtatUtilisateurAdminService';
import {RoleUtilisateurDto} from '../../../../../../controller/model/RoleUtilisateurDto';
import {RoleUtilisateurAdminService} from '../../../../../../controller/service/admin/RoleUtilisateurAdminService';
import {GroupeUtilisateurDto} from '../../../../../../controller/model/GroupeUtilisateurDto';
import {GroupeUtilisateurAdminService} from '../../../../../../controller/service/admin/GroupeUtilisateurAdminService';
import {UtilisateurDto} from '../../../../../../controller/model/UtilisateurDto';
import {UtilisateurAdminService} from '../../../../../../controller/service/admin/UtilisateurAdminService';

const GroupeAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isGroupeCollapsed, setIsGroupeCollapsed] = useState(true);
    const [isItemCollapsed, setIsItemCollapsed] = useState(true);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);

    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const [utilisateurModalVisible, setUtilisateurModalVisible] = useState(false);
    const [selectedUtilisateur, setSelectedUtilisateur] = useState<UtilisateurDto>({id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' , });

    const [etatUtilisateurs, setEtatUtilisateurs] = useState<EtatUtilisateurDto[]>([]);
    const [etatUtilisateurModalVisible, setEtatUtilisateurModalVisible] = useState(false);
    const [selectedEtatUtilisateur, setSelectedEtatUtilisateur] = useState<EtatUtilisateurDto>({id : null ,code : '' ,libelle : 'select a Etat utilisateur', });

    const [roleUtilisateurs, setRoleUtilisateurs] = useState<RoleUtilisateurDto[]>([]);
    const [roleUtilisateurModalVisible, setRoleUtilisateurModalVisible] = useState(false);
    const [selectedRoleUtilisateur, setSelectedRoleUtilisateur] = useState<RoleUtilisateurDto>({id : null ,code : '' ,libelle : 'select a Role utilisateur', });


    const etatUtilisateurAdminService = new EtatUtilisateurAdminService();
    const roleUtilisateurAdminService = new RoleUtilisateurAdminService();
    const groupeUtilisateurAdminService = new GroupeUtilisateurAdminService();
    const utilisateurAdminService = new UtilisateurAdminService();

    const [groupeUtilisateurs, setGroupeUtilisateurs] = useState<GroupeUtilisateurDto>(new GroupeUtilisateurDto());
    const [isEditModeGroupeUtilisateurs, setIsEditModeGroupeUtilisateurs] = useState(false);
    const [editIndexGroupeUtilisateurs, setEditIndexGroupeUtilisateurs] = useState(null);

    const [groupeUtilisateursCollapsible, setGroupeUtilisateursCollapsible] = useState(false);
    const [isGroupeUtilisateursCollapsed, setIsGroupeUtilisateursCollapsed] = useState(false);
    const [isGroupeUtilisateurs, setIsGroupeUtilisateurs] = useState(false);
    const [isEditGroupeUtilisateursMode, setIsEditGroupeUtilisateursMode] = useState(false);


    const { control, handleSubmit, reset } = useForm<GroupeDto>({
        defaultValues: {
        code: '' ,
        libelle: '' ,
        utilisateur: undefined,
        },
    });

    const groupeCollapsible = () => {
        setIsGroupeCollapsed(!isGroupeCollapsed);
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
    const handleCloseEtatUtilisateurModal = () => {
        setEtatUtilisateurModalVisible(false);
    };

    const onEtatUtilisateurSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedEtatUtilisateur(item);
        setEtatUtilisateurModalVisible(false);
    };
    const handleCloseRoleUtilisateurModal = () => {
        setRoleUtilisateurModalVisible(false);
    };

    const onRoleUtilisateurSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedRoleUtilisateur(item);
        setRoleUtilisateurModalVisible(false);
    };


    useEffect(() => {
        utilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));

        utilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        etatUtilisateurAdminService.getList().then(({data}) => setEtatUtilisateurs(data)).catch(error => console.log(error));
        roleUtilisateurAdminService.getList().then(({data}) => setRoleUtilisateurs(data)).catch(error => console.log(error));
    }, []);


    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<GroupeUtilisateurDto>({
        defaultValues: {
            groupe: undefined,
            utilisateur: undefined,
            etatUtilisateur: undefined,
            roleUtilisateur: undefined,
        },
    });

    const groupeUtilisateursItemCollapsible = () => {
        setIsItemCollapsed(!isItemCollapsed);
        setIsGroupeCollapsed(true);
        setIsItemsCollapsed(true);
    };

    const groupeUtilisateursItemsCollapsible = () => {
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsGroupeCollapsed(true);
        setIsItemCollapsed(true);
    };


    const handleAddGroupeUtilisateurs = (data: GroupeUtilisateurDto) => {
        if (data) {
            const newGroupeUtilisateur: GroupeUtilisateurDto = { groupe: undefined ,utilisateur: selectedUtilisateur , dateAjout: data.dateAjout ,etatUtilisateur: selectedEtatUtilisateur , roleUtilisateur: selectedRoleUtilisateur ,  };
            setGroupeUtilisateurs((prevItems) => [...prevItems, newGroupeUtilisateur]);
            resetItem({});
                setSelectedUtilisateur({id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' ,});
                setSelectedEtatUtilisateur({id : null ,code : '' ,libelle : 'select a Etat utilisateur',});
                setSelectedRoleUtilisateur({id : null ,code : '' ,libelle : 'select a Role utilisateur',});
        }
    };

    const handleDeleteGroupeUtilisateurs = (index) => {
        const updatedItems = groupeUtilisateurs.filter((item, i) => i !== index);
        setGroupeUtilisateurs(updatedItems);
    };

    const handleUpdateGroupeUtilisateurs = (data: GroupeUtilisateurDto) => {
        if (data) {
            groupeUtilisateurs.map((item, i) => {
                if (i === editIndexGroupeUtilisateurs) {
                    utilisateur: undefined ;
                    item.utilisateur = selectedUtilisateur;
                    item.dateAjout = data.dateAjout;
                    etatUtilisateur: undefined ;
                    item.etatUtilisateur = selectedEtatUtilisateur;
                    roleUtilisateur: undefined ;
                    item.roleUtilisateur = selectedRoleUtilisateur;
                }
            });
            resetItem({});
            setSelectedUtilisateur({id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' , });
            setSelectedEtatUtilisateur({id : null ,code : '' ,libelle : 'select a Etat utilisateur', });
            setSelectedRoleUtilisateur({id : null ,code : '' ,libelle : 'select a Role utilisateur', });
            setIsEditModeGroupeUtilisateurs(false);
        }
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    }

    const updateFormDefaultValuesGroupeUtilisateurs = (index: number) => {
        let updatedGroupeUtilisateur: GroupeUtilisateurDto;
        setEditIndexGroupeUtilisateurs(index);
        setIsEditModeGroupeUtilisateurs(true);
        groupeUtilisateurs.map((item, i) => {
            if (i === index) {
                updatedGroupeUtilisateur = item;
            }
        });
        resetItem({dateAjout: updatedGroupeUtilisateur.dateAjout ,});
        setSelectedUtilisateur(updatedGroupeUtilisateur.utilisateur);
        setSelectedEtatUtilisateur(updatedGroupeUtilisateur.etatUtilisateur);
        setSelectedRoleUtilisateur(updatedGroupeUtilisateur.roleUtilisateur);
        setIsItemsCollapsed(!isItemsCollapsed);
        setIsItemCollapsed(!isItemCollapsed);
    };


    const handleSave = async (item: GroupeDto) => {
        item.utilisateur = selectedUtilisateur;
        item.groupeUtilisateurs = groupeUtilisateurs;
        Keyboard.dismiss();
        try {
            await GroupeAdminService.save( item );
            setIsItemsCollapsed(!isItemsCollapsed);
            reset();
            setSelectedUtilisateur({ id : null ,email : '' ,nom : 'select a Utilisateur',prenom : '' ,});
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            item.groupeUtilisateurs = groupeUtilisateurs;
            setGroupeUtilisateurs([]);
        } catch (error) {
            console.error('Error saving groupe:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
        <ScrollView style={{ margin: 20, marginBottom: 80 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }} >Create Groupe< /Text>

            <TouchableOpacity onPress={groupeCollapsible} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Groupe< /Text>
            </TouchableOpacity>

            <Collapsible collapsed={isGroupeCollapsed}>
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setUtilisateurModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedUtilisateur.nom}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            </Collapsible>
            <TouchableOpacity onPress={groupeUtilisateursCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Groupe utilisateurs</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isGroupeUtilisateursCollapsed}>
                <TouchableOpacity onPress={() => setGroupeModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedGroupe.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUtilisateurModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedUtilisateur.nom}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEtatUtilisateurModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedEtatUtilisateur.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRoleUtilisateurModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedRoleUtilisateur.libelle}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ isEditGroupeUtilisateursMode ? handleItemSubmit((data) => { handleUpdateGroupeUtilisateurs(data); }) : handleItemSubmit(handleAddGroupeUtilisateurs) } style={{ backgroundColor: '#32cd32', borderRadius: 10, marginBottom: 5, width: '20%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    {isEditModeGroupeUtilisateurs ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>

            <TouchableOpacity onPress={itemsCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Groupe utilisateurs</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isItemsCollapsed}>
                { groupeUtilisateurs && groupeUtilisateurs.length > 0 ? ( groupeUtilisateurs.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Groupe: {item.groupe.libelle}</Text>
                            <Text style={styles.infos}>'Utilisateur: {item.utilisateur.nom}</Text>
                            <Text style={styles.infos}>'Date ajout: {item.dateAjout}</Text>
                            <Text style={styles.infos}>'Etat utilisateur: {item.etatUtilisateur.libelle}</Text>
                            <Text style={styles.infos}>'Role utilisateur: {item.roleUtilisateur.libelle}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteGroupeUtilisateurs(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValuesGroupeUtilisateurs(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.infos}>No groupe utilisateurs yet.</Text>
                    </View>
                )}
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save Groupe"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {utilisateurs !== null && utilisateurs.length > 0 ? ( <FilterModal visibility={utilisateurModalVisible} placeholder={"Select a Utilisateur"} onItemSelect={onUtilisateurSelect} items={utilisateurs} onClose={handleCloseUtilisateurModal} variable={'nom'} /> ) : null}
        {etatUtilisateurs !== null && etatUtilisateurs.length > 0 ? ( <FilterModal visibility={etatUtilisateurModalVisible} placeholder={"Select a EtatUtilisateur"} onItemSelect={onEtatUtilisateurSelect} items={etatUtilisateurs} onClose={handleCloseEtatUtilisateurModal} variable={'libelle'} /> ) : null}
        {roleUtilisateurs !== null && roleUtilisateurs.length > 0 ? ( <FilterModal visibility={roleUtilisateurModalVisible} placeholder={"Select a RoleUtilisateur"} onItemSelect={onRoleUtilisateurSelect} items={roleUtilisateurs} onClose={handleCloseRoleUtilisateurModal} variable={'libelle'} /> ) : null}
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

export default GroupeAdminCreate;
