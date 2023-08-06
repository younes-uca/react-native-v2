import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {FieldDto} from 'app/controller/model/Field.model';
import {FieldCriteria} from 'app/controller/criteria/FieldCriteria.model';



export const FieldAdminService = {

   getList(): Promise<AxiosResponse<FieldDto[]>> {
     return axios.get(ADMIN_URL + 'field/');
   },

   save(item: FieldDto): Promise<AxiosResponse<FieldDto>> {
     return axios.post(ADMIN_URL + 'field/', item);
   },

   update(item: FieldDto): Promise<AxiosResponse<FieldDto>> {
      return axios.put(ADMIN_URL + 'field/', item);
   },

   delete(id: number): Promise<AxiosResponse<FieldDto>> {
      return axios.delete(ADMIN_URL + 'field/id/'+ id);
   },

   deleteList(items: FieldDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'field/multiple', items);
   },

   findPaginatedByCriteria(criteria:FieldCriteria):Promise<AxiosResponse<PaginatedList<FieldDto>>> {
     return axios.post<PaginatedList<FieldDto>>(ADMIN_URL + 'field/find-paginated-by-criteria', criteria);
   }
};

