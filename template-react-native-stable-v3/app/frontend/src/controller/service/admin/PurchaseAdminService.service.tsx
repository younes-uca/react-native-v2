import { ADMIN_URL } from '../../../../config/AppConfig';
import AbstractService from "../../../zynerator/service/AbstractService";

import {PurchaseDto} from '../../model/Purchase.model';
import {PurchaseCriteria} from '../../criteria/PurchaseCriteria.model';

export class PurchaseAdminService extends AbstractService<PurchaseDto, PurchaseCriteria>{

    constructor() {
        super(ADMIN_URL , 'purchase/');
    }

};