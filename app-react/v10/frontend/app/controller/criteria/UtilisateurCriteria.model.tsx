import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';





export class UtilisateurCriteria  extends  BaseCriteria {

    public id: number;

    public email: string;
    public emailLike: string;
    public nom: string;
    public nomLike: string;
    public prenom: string;
    public prenomLike: string;

    constructor() {
        super();
        this.email = '';
        this.emailLike = '';
        this.nom = '';
        this.nomLike = '';
        this.prenom = '';
        this.prenomLike = '';
    }

}
