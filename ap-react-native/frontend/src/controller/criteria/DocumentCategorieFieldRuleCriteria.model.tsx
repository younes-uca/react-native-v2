import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';





export class DocumentCategorieFieldRuleCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public expresion: string;
    public expresionLike: string;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.libelle = '';
        this.libelleLike = '';
        this.expresion = '';
        this.expresionLike = '';
    }

}
