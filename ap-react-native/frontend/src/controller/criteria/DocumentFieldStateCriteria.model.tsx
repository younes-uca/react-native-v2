import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';





export class DocumentFieldStateCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public style: string;
    public styleLike: string;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.libelle = '';
        this.libelleLike = '';
        this.style = '';
        this.styleLike = '';
    }

}
