import {BaseDto} from "../../zynerator/dto/BaseDto.model";

import {PurchaseItemDto} from './PurchaseItem.model';
import {ClientDto} from './Client.model';

export class PurchaseDto extends BaseDto{

    public reference: string;

   public purchaseDate: Date;

    public image: string;

    public total: null | number;

    public description: string;

    public client: ClientDto ;
     public purchaseItems: Array<PurchaseItemDto>;


    constructor() {
        super();
        this.reference = 'select a purchase';
        this.purchaseDate = null;
        this.image = '';
        this.total = null;
        this.description = '';
        this.client = new ClientDto() ;
        this.purchaseItems = new Array<PurchaseItemDto>();
        }

}
