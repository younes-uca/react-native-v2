import { ADMIN_URL } from '../../../../config/AppConfig';
import AbstractService from "../../../zynerator/service/AbstractService";

import {ProductDto} from '../../model/Product.model';
import {ProductCriteria} from '../../criteria/ProductCriteria.model';

export class ProductAdminService extends AbstractService<ProductDto, ProductCriteria>{

    constructor() {
        super(ADMIN_URL , 'product/');
    }

};