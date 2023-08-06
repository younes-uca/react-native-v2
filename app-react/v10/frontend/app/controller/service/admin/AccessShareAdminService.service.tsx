import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {AccessShareDto} from 'app/controller/model/AccessShare.model';
import {AccessShareCriteria} from 'app/controller/criteria/AccessShareCriteria.model';



export const AccessShareAdminService = {

   getList(): Promise<AxiosResponse<AccessShareDto[]>> {
     return axios.get(ADMIN_URL + 'accessShare/');
   },

   save(item: AccessShareDto): Promise<AxiosResponse<AccessShareDto>> {
     return axios.post(ADMIN_URL + 'accessShare/', item);
   },

   update(item: AccessShareDto): Promise<AxiosResponse<AccessShareDto>> {
      return axios.put(ADMIN_URL + 'accessShare/', item);
   },

   delete(id: number): Promise<AxiosResponse<AccessShareDto>> {
      return axios.delete(ADMIN_URL + 'accessShare/id/'+ id);
   },

   deleteList(items: AccessShareDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'accessShare/multiple', items);
   },

   findPaginatedByCriteria(criteria:AccessShareCriteria):Promise<AxiosResponse<PaginatedList<AccessShareDto>>> {
     return axios.post<PaginatedList<AccessShareDto>>(ADMIN_URL + 'accessShare/find-paginated-by-criteria', criteria);
   }
};

