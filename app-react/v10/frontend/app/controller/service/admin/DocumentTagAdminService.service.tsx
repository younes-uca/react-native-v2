import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentTagDto} from 'app/controller/model/DocumentTag.model';
import {DocumentTagCriteria} from 'app/controller/criteria/DocumentTagCriteria.model';



export const DocumentTagAdminService = {

   getList(): Promise<AxiosResponse<DocumentTagDto[]>> {
     return axios.get(ADMIN_URL + 'documentTag/');
   },

   save(item: DocumentTagDto): Promise<AxiosResponse<DocumentTagDto>> {
     return axios.post(ADMIN_URL + 'documentTag/', item);
   },

   update(item: DocumentTagDto): Promise<AxiosResponse<DocumentTagDto>> {
      return axios.put(ADMIN_URL + 'documentTag/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentTagDto>> {
      return axios.delete(ADMIN_URL + 'documentTag/id/'+ id);
   },

   deleteList(items: DocumentTagDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentTag/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentTagCriteria):Promise<AxiosResponse<PaginatedList<DocumentTagDto>>> {
     return axios.post<PaginatedList<DocumentTagDto>>(ADMIN_URL + 'documentTag/find-paginated-by-criteria', criteria);
   }
};

