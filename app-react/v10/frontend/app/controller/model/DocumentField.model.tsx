import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {FieldDto} from 'app/controller/model/Field.model';
import {DocumentFieldStateDto} from 'app/controller/model/DocumentFieldState.model';
import {DocumentDto} from 'app/controller/model/Document.model';

export class DocumentFieldDto extends BaseDto{

    public value: string;

    public field: FieldDto ;
    public document: DocumentDto ;
    public documentFieldState: DocumentFieldStateDto ;


    constructor() {
        super();
        this.value = '';
        this.field = new FieldDto() ;
        this.document = new DocumentDto() ;
        this.documentFieldState = new DocumentFieldStateDto() ;
        }

}
