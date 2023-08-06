import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {FieldCriteria} from './FieldCriteria.model';
import {DocumentCategorieCriteria} from './DocumentCategorieCriteria.model';
import {DocumentCategorieFieldRuleCriteria} from './DocumentCategorieFieldRuleCriteria.model';




export class DocumentCategorieFieldCriteria  extends  BaseCriteria {

    public id: number;

  public field: FieldCriteria ;
  public fields: Array<FieldCriteria> ;
  public documentCategorie: DocumentCategorieCriteria ;
  public documentCategories: Array<DocumentCategorieCriteria> ;
  public documentCategorieFieldRule: DocumentCategorieFieldRuleCriteria ;
  public documentCategorieFieldRules: Array<DocumentCategorieFieldRuleCriteria> ;

    constructor() {
        super();
        this.field = new FieldCriteria() ;
        this.fields = new Array<FieldCriteria>() ;
        this.documentCategorie = new DocumentCategorieCriteria() ;
        this.documentCategories = new Array<DocumentCategorieCriteria>() ;
        this.documentCategorieFieldRule = new DocumentCategorieFieldRuleCriteria() ;
        this.documentCategorieFieldRules = new Array<DocumentCategorieFieldRuleCriteria>() ;
    }

}
