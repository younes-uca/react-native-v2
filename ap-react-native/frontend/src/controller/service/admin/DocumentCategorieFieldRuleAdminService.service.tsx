import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';
import {DocumentCategorieFieldRuleCriteria} from 'app/controller/criteria/DocumentCategorieFieldRuleCriteria.model';

export class DocumentCategorieFieldRuleAdminService extends AbstractService<DocumentCategorieFieldRuleDto, DocumentCategorieFieldRuleCriteria>{

    constructor() {
        super(ADMIN_URL , 'documentCategorieFieldRule/');
    }

};