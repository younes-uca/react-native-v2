import {BaseCriteria} from "../../zynerator/criteria/BaseCriteria.model";

import {ClientCategoryCriteria} from './ClientCategoryCriteria.model';




export class ClientCriteria  extends  BaseCriteria {

    public id: number;

    public fullName: string;
    public fullNameLike: string;
    public email: string;
    public emailLike: string;
  public clientCategory: ClientCategoryCriteria ;
  public clientCategorys: Array<ClientCategoryCriteria> ;

    constructor() {
        super();
        this.fullName = '';
        this.fullNameLike = '';
        this.email = '';
        this.emailLike = '';
        this.clientCategory = new ClientCategoryCriteria() ;
        this.clientCategorys = new Array<ClientCategoryCriteria>() ;
    }

}
