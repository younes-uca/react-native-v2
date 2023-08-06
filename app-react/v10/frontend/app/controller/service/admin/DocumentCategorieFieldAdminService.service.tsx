import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentCategorieFieldDto} from 'app/controller/model/DocumentCategorieField.model';
import {DocumentCategorieFieldCriteria} from 'app/controller/criteria/DocumentCategorieFieldCriteria.model';



export const DocumentCategorieFieldAdminService = {

   getList(): Promise<AxiosResponse<DocumentCategorieFieldDto[]>> {
     return axios.get(ADMIN_URL + 'documentCategorieField/');
   },

   save(item: DocumentCategorieFieldDto): Promise<AxiosResponse<DocumentCategorieFieldDto>> {
     return axios.post(ADMIN_URL + 'documentCategorieField/', item);
   },

   update(item: DocumentCategorieFieldDto): Promise<AxiosResponse<DocumentCategorieFieldDto>> {
      return axios.put(ADMIN_URL + 'documentCategorieField/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentCategorieFieldDto>> {
      return axios.delete(ADMIN_URL + 'documentCategorieField/id/'+ id);
   },

   deleteList(items: DocumentCategorieFieldDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentCategorieField/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentCategorieFieldCriteria):Promise<AxiosResponse<PaginatedList<DocumentCategorieFieldDto>>> {
     return axios.post<PaginatedList<DocumentCategorieFieldDto>>(ADMIN_URL + 'documentCategorieField/find-paginated-by-criteria', criteria);
   }
};

