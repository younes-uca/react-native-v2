import {BaseDto} from 'app/zynerator/dto/BaseDto.model';


export class EntiteAdministrativeTypeDto extends BaseDto{

    public code: string;

    public libelle: string;



    constructor() {
        super();
        this.code = '';
        this.libelle = '';
        }

}
