import {BaseDto} from 'app/zynerator/dto/BaseDto.model';


export class AccessShareDto extends BaseDto{

    public code: string;

    public libelle: string;



    constructor() {
        super();
        this.code = '';
        this.libelle = '';
        }

}
