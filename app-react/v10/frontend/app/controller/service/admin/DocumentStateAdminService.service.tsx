import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentStateDto} from 'app/controller/model/DocumentState.model';
import {DocumentStateCriteria} from 'app/controller/criteria/DocumentStateCriteria.model';



export const DocumentStateAdminService = {

   getList(): Promise<AxiosResponse<DocumentStateDto[]>> {
     return axios.get(ADMIN_URL + 'documentState/');
   },

   save(item: DocumentStateDto): Promise<AxiosResponse<DocumentStateDto>> {
     return axios.post(ADMIN_URL + 'documentState/', item);
   },

   update(item: DocumentStateDto): Promise<AxiosResponse<DocumentStateDto>> {
      return axios.put(ADMIN_URL + 'documentState/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentStateDto>> {
      return axios.delete(ADMIN_URL + 'documentState/id/'+ id);
   },

   deleteList(items: DocumentStateDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentState/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentStateCriteria):Promise<AxiosResponse<PaginatedList<DocumentStateDto>>> {
     return axios.post<PaginatedList<DocumentStateDto>>(ADMIN_URL + 'documentState/find-paginated-by-criteria', criteria);
   }
};

