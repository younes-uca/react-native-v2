import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {FieldDto} from 'app/controller/model/Field.model';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';

export class DocumentCategorieFieldDto extends BaseDto{

    public field: FieldDto ;
    public documentCategorie: DocumentCategorieDto ;
    public documentCategorieFieldRule: DocumentCategorieFieldRuleDto ;


    constructor() {
        super();
        this.field = new FieldDto() ;
        this.documentCategorie = new DocumentCategorieDto() ;
        this.documentCategorieFieldRule = new DocumentCategorieFieldRuleDto() ;
        }

}
