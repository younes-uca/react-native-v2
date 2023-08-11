import {BaseDto} from "../../zynerator/dto/BaseDto.model";

import {ClientCategoryDto} from './ClientCategory.model';

export class ClientDto extends BaseDto{

    public fullName: string;

    public email: string;

    public clientCategory: ClientCategoryDto ;


    constructor() {
        super();
        this.fullName = 'select a client';
        this.email = '';
        this.clientCategory = new ClientCategoryDto() ;
        }

}
