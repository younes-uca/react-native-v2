import axios, { AxiosResponse } from "axios";
import { AGENT_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieCriteria} from 'app/controller/criteria/DocumentCategorieCriteria.model';



export const DocumentCategorieAgentService = {

   getList(): Promise<AxiosResponse<DocumentCategorieDto[]>> {
     return axios.get(AGENT_URL + 'documentCategorie/');
   },

   save(item: DocumentCategorieDto): Promise<AxiosResponse<DocumentCategorieDto>> {
     return axios.post(AGENT_URL + 'documentCategorie/', item);
   },

   update(item: DocumentCategorieDto): Promise<AxiosResponse<DocumentCategorieDto>> {
      return axios.put(AGENT_URL + 'documentCategorie/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentCategorieDto>> {
      return axios.delete(AGENT_URL + 'documentCategorie/id/'+ id);
   },

   deleteList(items: DocumentCategorieDto[]): Promise<AxiosResponse<string>> {
      return axios.post(AGENT_URL + 'documentCategorie/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentCategorieCriteria):Promise<AxiosResponse<PaginatedList<DocumentCategorieDto>>> {
     return axios.post<PaginatedList<DocumentCategorieDto>>(AGENT_URL + 'documentCategorie/find-paginated-by-criteria', criteria);
   }
};

