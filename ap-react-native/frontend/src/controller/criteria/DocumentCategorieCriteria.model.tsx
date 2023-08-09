import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {DocumentCategorieFieldCriteria} from './DocumentCategorieFieldCriteria.model';




export class DocumentCategorieCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
      public documentCategorieFields: Array<DocumentCategorieFieldCriteria>;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.libelle = '';
        this.libelleLike = '';
    }

}
