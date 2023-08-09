import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {FieldDto} from 'app/controller/model/Field.model';
import {FieldCriteria} from 'app/controller/criteria/FieldCriteria.model';

export class FieldAdminService extends AbstractService<FieldDto, FieldCriteria>{

    constructor() {
        super(ADMIN_URL , 'field/');
    }

};