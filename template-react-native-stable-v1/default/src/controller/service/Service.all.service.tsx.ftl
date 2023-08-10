import { ${role.name?upper_case}_URL } from '../../../../config/AppConfig';
import AbstractService from "../../../zynerator/service/AbstractService";

import {${pojo.name}Dto} from '../../model/${pojo.name}.model';
import {${pojo.name?cap_first}Criteria} from '../../criteria/${pojo.name?cap_first}Criteria.model';

export class ${pojo.name}${role.name?cap_first}Service extends AbstractService<${pojo.name}Dto, ${pojo.name}Criteria>{

    constructor() {
        super(${role.name?upper_case}_URL , '${pojo.name?uncap_first}/');
    }

};