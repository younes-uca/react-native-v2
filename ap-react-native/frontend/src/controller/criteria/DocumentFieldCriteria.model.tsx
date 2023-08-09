import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {FieldCriteria} from './FieldCriteria.model';
import {DocumentFieldStateCriteria} from './DocumentFieldStateCriteria.model';
import {DocumentCriteria} from './DocumentCriteria.model';




export class DocumentFieldCriteria  extends  BaseCriteria {

    public id: number;

    public value: string;
    public valueLike: string;
  public field: FieldCriteria ;
  public fields: Array<FieldCriteria> ;
  public document: DocumentCriteria ;
  public documents: Array<DocumentCriteria> ;
  public documentFieldState: DocumentFieldStateCriteria ;
  public documentFieldStates: Array<DocumentFieldStateCriteria> ;

    constructor() {
        super();
        this.value = '';
        this.valueLike = '';
        this.field = new FieldCriteria() ;
        this.fields = new Array<FieldCriteria>() ;
        this.document = new DocumentCriteria() ;
        this.documents = new Array<DocumentCriteria>() ;
        this.documentFieldState = new DocumentFieldStateCriteria() ;
        this.documentFieldStates = new Array<DocumentFieldStateCriteria>() ;
    }

}
