import {BaseDto} from 'app/zynerator/dto/BaseDto.model';


export class UtilisateurDto extends BaseDto{

    public email: string;

    public nom: string;

    public prenom: string;



    constructor() {
        super();
        this.email = '';
        this.nom = '';
        this.prenom = '';
        }

}
