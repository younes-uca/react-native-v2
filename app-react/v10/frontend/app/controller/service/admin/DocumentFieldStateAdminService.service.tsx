import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentFieldStateDto} from 'app/controller/model/DocumentFieldState.model';
import {DocumentFieldStateCriteria} from 'app/controller/criteria/DocumentFieldStateCriteria.model';



export const DocumentFieldStateAdminService = {

   getList(): Promise<AxiosResponse<DocumentFieldStateDto[]>> {
     return axios.get(ADMIN_URL + 'documentFieldState/');
   },

   save(item: DocumentFieldStateDto): Promise<AxiosResponse<DocumentFieldStateDto>> {
     return axios.post(ADMIN_URL + 'documentFieldState/', item);
   },

   update(item: DocumentFieldStateDto): Promise<AxiosResponse<DocumentFieldStateDto>> {
      return axios.put(ADMIN_URL + 'documentFieldState/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentFieldStateDto>> {
      return axios.delete(ADMIN_URL + 'documentFieldState/id/'+ id);
   },

   deleteList(items: DocumentFieldStateDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentFieldState/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentFieldStateCriteria):Promise<AxiosResponse<PaginatedList<DocumentFieldStateDto>>> {
     return axios.post<PaginatedList<DocumentFieldStateDto>>(ADMIN_URL + 'documentFieldState/find-paginated-by-criteria', criteria);
   }
};

