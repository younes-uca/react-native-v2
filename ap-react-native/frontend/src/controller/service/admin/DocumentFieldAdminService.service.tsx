import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {DocumentFieldDto} from 'app/controller/model/DocumentField.model';
import {DocumentFieldCriteria} from 'app/controller/criteria/DocumentFieldCriteria.model';

export class DocumentFieldAdminService extends AbstractService<DocumentFieldDto, DocumentFieldCriteria>{

    constructor() {
        super(ADMIN_URL , 'documentField/');
    }

};