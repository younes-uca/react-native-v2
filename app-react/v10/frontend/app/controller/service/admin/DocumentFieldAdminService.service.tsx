import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentFieldDto} from 'app/controller/model/DocumentField.model';
import {DocumentFieldCriteria} from 'app/controller/criteria/DocumentFieldCriteria.model';



export const DocumentFieldAdminService = {

   getList(): Promise<AxiosResponse<DocumentFieldDto[]>> {
     return axios.get(ADMIN_URL + 'documentField/');
   },

   save(item: DocumentFieldDto): Promise<AxiosResponse<DocumentFieldDto>> {
     return axios.post(ADMIN_URL + 'documentField/', item);
   },

   update(item: DocumentFieldDto): Promise<AxiosResponse<DocumentFieldDto>> {
      return axios.put(ADMIN_URL + 'documentField/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentFieldDto>> {
      return axios.delete(ADMIN_URL + 'documentField/id/'+ id);
   },

   deleteList(items: DocumentFieldDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentField/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentFieldCriteria):Promise<AxiosResponse<PaginatedList<DocumentFieldDto>>> {
     return axios.post<PaginatedList<DocumentFieldDto>>(ADMIN_URL + 'documentField/find-paginated-by-criteria', criteria);
   }
};

