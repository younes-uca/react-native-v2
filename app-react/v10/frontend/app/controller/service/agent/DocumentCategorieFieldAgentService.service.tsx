import axios, { AxiosResponse } from "axios";
import { AGENT_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentCategorieFieldDto} from 'app/controller/model/DocumentCategorieField.model';
import {DocumentCategorieFieldCriteria} from 'app/controller/criteria/DocumentCategorieFieldCriteria.model';



export const DocumentCategorieFieldAgentService = {

   getList(): Promise<AxiosResponse<DocumentCategorieFieldDto[]>> {
     return axios.get(AGENT_URL + 'documentCategorieField/');
   },

   save(item: DocumentCategorieFieldDto): Promise<AxiosResponse<DocumentCategorieFieldDto>> {
     return axios.post(AGENT_URL + 'documentCategorieField/', item);
   },

   update(item: DocumentCategorieFieldDto): Promise<AxiosResponse<DocumentCategorieFieldDto>> {
      return axios.put(AGENT_URL + 'documentCategorieField/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentCategorieFieldDto>> {
      return axios.delete(AGENT_URL + 'documentCategorieField/id/'+ id);
   },

   deleteList(items: DocumentCategorieFieldDto[]): Promise<AxiosResponse<string>> {
      return axios.post(AGENT_URL + 'documentCategorieField/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentCategorieFieldCriteria):Promise<AxiosResponse<PaginatedList<DocumentCategorieFieldDto>>> {
     return axios.post<PaginatedList<DocumentCategorieFieldDto>>(AGENT_URL + 'documentCategorieField/find-paginated-by-criteria', criteria);
   }
};

