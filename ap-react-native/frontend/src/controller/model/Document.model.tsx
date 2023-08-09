import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {DocumentStateDto} from 'app/controller/model/DocumentState.model';
import {DocumentPartageGroupeDto} from 'app/controller/model/DocumentPartageGroupe.model';
import {DocumentTagDto} from 'app/controller/model/DocumentTag.model';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentFieldDto} from 'app/controller/model/DocumentField.model';
import {DocumentPartageUtilisateurDto} from 'app/controller/model/DocumentPartageUtilisateur.model';
import {DocumentTypeDto} from 'app/controller/model/DocumentType.model';
import {EntiteAdministrativeDto} from 'app/controller/model/EntiteAdministrative.model';
import {UtilisateurDto} from 'app/controller/model/Utilisateur.model';

export class DocumentDto extends BaseDto{

    public reference: string;


   public uploadDate: Date;

   public dateLastUpdate: Date;

    public content: string;

   public folder: boolean;

    public size: null | number;

    public description: string;

   public archive: boolean;

   public versionne: boolean;

    public documentType: DocumentTypeDto ;
    public documentState: DocumentStateDto ;
    public documentCategorie: DocumentCategorieDto ;
    public utilisateur: UtilisateurDto ;
    public entiteAdministrative: EntiteAdministrativeDto ;
     public documentFields: Array<DocumentFieldDto>;
     public documentPartageGroupes: Array<DocumentPartageGroupeDto>;
     public documentPartageUtilisateurs: Array<DocumentPartageUtilisateurDto>;
     public documentTags: Array<DocumentTagDto>;


    constructor() {
        super();
        this.reference = '';
        this.uploadDate = null;
        this.dateLastUpdate = null;
        this.content = '';
        this.folder = null;
        this.size = null;
        this.description = '';
        this.archive = null;
        this.versionne = null;
        this.documentType = new DocumentTypeDto() ;
        this.documentState = new DocumentStateDto() ;
        this.documentCategorie = new DocumentCategorieDto() ;
        this.utilisateur = new UtilisateurDto() ;
        this.entiteAdministrative = new EntiteAdministrativeDto() ;
        this.documentFields = new Array<DocumentFieldDto>();
        this.documentPartageGroupes = new Array<DocumentPartageGroupeDto>();
        this.documentPartageUtilisateurs = new Array<DocumentPartageUtilisateurDto>();
        this.documentTags = new Array<DocumentTagDto>();
        }

}
