import {BaseDto} from 'app/zynerator/dto/BaseDto.model';


export class RoleUtilisateurDto extends BaseDto{

    public code: string;

    public libelle: string;



    constructor() {
        super();
        this.code = '';
        this.libelle = '';
        }

}
