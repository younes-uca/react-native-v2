import axios, { AxiosResponse } from "axios";
import { AGENT_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentCategorieFieldRuleDto} from 'app/controller/model/DocumentCategorieFieldRule.model';
import {DocumentCategorieFieldRuleCriteria} from 'app/controller/criteria/DocumentCategorieFieldRuleCriteria.model';



export const DocumentCategorieFieldRuleAgentService = {

   getList(): Promise<AxiosResponse<DocumentCategorieFieldRuleDto[]>> {
     return axios.get(AGENT_URL + 'documentCategorieFieldRule/');
   },

   save(item: DocumentCategorieFieldRuleDto): Promise<AxiosResponse<DocumentCategorieFieldRuleDto>> {
     return axios.post(AGENT_URL + 'documentCategorieFieldRule/', item);
   },

   update(item: DocumentCategorieFieldRuleDto): Promise<AxiosResponse<DocumentCategorieFieldRuleDto>> {
      return axios.put(AGENT_URL + 'documentCategorieFieldRule/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentCategorieFieldRuleDto>> {
      return axios.delete(AGENT_URL + 'documentCategorieFieldRule/id/'+ id);
   },

   deleteList(items: DocumentCategorieFieldRuleDto[]): Promise<AxiosResponse<string>> {
      return axios.post(AGENT_URL + 'documentCategorieFieldRule/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentCategorieFieldRuleCriteria):Promise<AxiosResponse<PaginatedList<DocumentCategorieFieldRuleDto>>> {
     return axios.post<PaginatedList<DocumentCategorieFieldRuleDto>>(AGENT_URL + 'documentCategorieFieldRule/find-paginated-by-criteria', criteria);
   }
};

