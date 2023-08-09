import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {DocumentCategorieFieldDto} from 'app/controller/model/DocumentCategorieField.model';
import {DocumentCategorieFieldCriteria} from 'app/controller/criteria/DocumentCategorieFieldCriteria.model';

export class DocumentCategorieFieldAdminService extends AbstractService<DocumentCategorieFieldDto, DocumentCategorieFieldCriteria>{

    constructor() {
        super(ADMIN_URL , 'documentCategorieField/');
    }

};