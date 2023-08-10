import { ADMIN_URL } from '../../../../config/AppConfig';
import AbstractService from "../../../zynerator/service/AbstractService";

import {PurchaseItemDto} from '../../model/PurchaseItem.model';
import {PurchaseItemCriteria} from '../../criteria/PurchaseItemCriteria.model';

export class PurchaseItemAdminService extends AbstractService<PurchaseItemDto, PurchaseItemCriteria>{

    constructor() {
        super(ADMIN_URL , 'purchaseItem/');
    }

};