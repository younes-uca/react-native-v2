import { AGENT_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';
import {DocumentCategorieFieldRuleCriteria} from 'app/controller/criteria/DocumentCategorieFieldRuleCriteria.model';

export class DocumentCategorieFieldRuleAgentService extends AbstractService<DocumentCategorieFieldRuleDto, DocumentCategorieFieldRuleCriteria>{

    constructor() {
        super(AGENT_URL , 'documentCategorieFieldRule/');
    }

};