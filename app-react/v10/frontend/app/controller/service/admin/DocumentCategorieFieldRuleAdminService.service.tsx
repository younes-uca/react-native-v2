import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';
import {DocumentCategorieFieldRuleCriteria} from 'app/controller/criteria/DocumentCategorieFieldRuleCriteria.model';



export const DocumentCategorieFieldRuleAdminService = {

   getList(): Promise<AxiosResponse<DocumentCategorieFieldRuleDto[]>> {
     return axios.get(ADMIN_URL + 'documentCategorieFieldRule/');
   },

   save(item: DocumentCategorieFieldRuleDto): Promise<AxiosResponse<DocumentCategorieFieldRuleDto>> {
     return axios.post(ADMIN_URL + 'documentCategorieFieldRule/', item);
   },

   update(item: DocumentCategorieFieldRuleDto): Promise<AxiosResponse<DocumentCategorieFieldRuleDto>> {
      return axios.put(ADMIN_URL + 'documentCategorieFieldRule/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentCategorieFieldRuleDto>> {
      return axios.delete(ADMIN_URL + 'documentCategorieFieldRule/id/'+ id);
   },

   deleteList(items: DocumentCategorieFieldRuleDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentCategorieFieldRule/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentCategorieFieldRuleCriteria):Promise<AxiosResponse<PaginatedList<DocumentCategorieFieldRuleDto>>> {
     return axios.post<PaginatedList<DocumentCategorieFieldRuleDto>>(ADMIN_URL + 'documentCategorieFieldRule/find-paginated-by-criteria', criteria);
   }
};

