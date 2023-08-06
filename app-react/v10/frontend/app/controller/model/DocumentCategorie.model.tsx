import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {DocumentCategorieFieldDto} from 'app/controller/model/DocumentCategorieField.model';

export class DocumentCategorieDto extends BaseDto{

    public code: string;

    public libelle: string;

     public documentCategorieFields: Array<DocumentCategorieFieldDto>;


    constructor() {
        super();
        this.code = '';
        this.libelle = '';
        this.documentCategorieFields = new Array<DocumentCategorieFieldDto>();
        }

}
