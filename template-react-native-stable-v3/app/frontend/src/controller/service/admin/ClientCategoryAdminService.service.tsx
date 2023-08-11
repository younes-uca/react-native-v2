import { ADMIN_URL } from '../../../../config/AppConfig';
import AbstractService from "../../../zynerator/service/AbstractService";

import {ClientCategoryDto} from '../../model/ClientCategory.model';
import {ClientCategoryCriteria} from '../../criteria/ClientCategoryCriteria.model';

export class ClientCategoryAdminService extends AbstractService<ClientCategoryDto, ClientCategoryCriteria>{

    constructor() {
        super(ADMIN_URL , 'clientCategory/');
    }

};