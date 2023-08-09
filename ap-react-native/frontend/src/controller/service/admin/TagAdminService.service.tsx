import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {TagDto} from 'app/controller/model/Tag.model';
import {TagCriteria} from 'app/controller/criteria/TagCriteria.model';

export class TagAdminService extends AbstractService<TagDto, TagCriteria>{

    constructor() {
        super(ADMIN_URL , 'tag/');
    }

};