import { ADMIN_URL } from '../../../../config/AppConfig';
import AbstractService from "../../../zynerator/service/AbstractService";

import {ClientDto} from '../../model/Client.model';
import {ClientCriteria} from '../../criteria/ClientCriteria.model';

export class ClientAdminService extends AbstractService<ClientDto, ClientCriteria>{

    constructor() {
        super(ADMIN_URL , 'client/');
    }

};