import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {DocumentFieldStateDto} from 'app/controller/model/DocumentFieldState.model';
import {DocumentFieldStateCriteria} from 'app/controller/criteria/DocumentFieldStateCriteria.model';

export class DocumentFieldStateAdminService extends AbstractService<DocumentFieldStateDto, DocumentFieldStateCriteria>{

    constructor() {
        super(ADMIN_URL , 'documentFieldState/');
    }

};