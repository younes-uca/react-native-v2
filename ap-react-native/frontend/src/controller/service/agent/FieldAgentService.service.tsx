import { AGENT_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {FieldDto} from 'app/controller/model/Field.model';
import {FieldCriteria} from 'app/controller/criteria/FieldCriteria.model';

export class FieldAgentService extends AbstractService<FieldDto, FieldCriteria>{

    constructor() {
        super(AGENT_URL , 'field/');
    }

};