import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieCriteria} from 'app/controller/criteria/DocumentCategorieCriteria.model';



export const DocumentCategorieAdminService = {

   getList(): Promise<AxiosResponse<DocumentCategorieDto[]>> {
     return axios.get(ADMIN_URL + 'documentCategorie/');
   },

   save(item: DocumentCategorieDto): Promise<AxiosResponse<DocumentCategorieDto>> {
     return axios.post(ADMIN_URL + 'documentCategorie/', item);
   },

   update(item: DocumentCategorieDto): Promise<AxiosResponse<DocumentCategorieDto>> {
      return axios.put(ADMIN_URL + 'documentCategorie/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentCategorieDto>> {
      return axios.delete(ADMIN_URL + 'documentCategorie/id/'+ id);
   },

   deleteList(items: DocumentCategorieDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentCategorie/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentCategorieCriteria):Promise<AxiosResponse<PaginatedList<DocumentCategorieDto>>> {
     return axios.post<PaginatedList<DocumentCategorieDto>>(ADMIN_URL + 'documentCategorie/find-paginated-by-criteria', criteria);
   }
};

