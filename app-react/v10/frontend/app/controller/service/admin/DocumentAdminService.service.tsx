import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentDto} from 'app/controller/model/Document.model';
import {DocumentCriteria} from 'app/controller/criteria/DocumentCriteria.model';



export const DocumentAdminService = {

   getList(): Promise<AxiosResponse<DocumentDto[]>> {
     return axios.get(ADMIN_URL + 'document/');
   },

   save(item: DocumentDto): Promise<AxiosResponse<DocumentDto>> {
     return axios.post(ADMIN_URL + 'document/', item);
   },

   update(item: DocumentDto): Promise<AxiosResponse<DocumentDto>> {
      return axios.put(ADMIN_URL + 'document/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentDto>> {
      return axios.delete(ADMIN_URL + 'document/id/'+ id);
   },

   deleteList(items: DocumentDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'document/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentCriteria):Promise<AxiosResponse<PaginatedList<DocumentDto>>> {
     return axios.post<PaginatedList<DocumentDto>>(ADMIN_URL + 'document/find-paginated-by-criteria', criteria);
   }
};

