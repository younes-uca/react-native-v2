import { AGENT_URL } from '../../../../config/AppConfig';
import AbstractService from "../../../zynerator/service/AbstractService";

import {PurchaseDto} from '../../model/Purchase.model';
import {PurchaseCriteria} from '../../criteria/PurchaseCriteria.model';

export class PurchaseAgentService extends AbstractService<PurchaseDto, PurchaseCriteria>{

    constructor() {
        super(AGENT_URL , 'purchase/');
    }

};