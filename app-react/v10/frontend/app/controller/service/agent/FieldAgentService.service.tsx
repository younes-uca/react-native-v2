import axios, { AxiosResponse } from "axios";
import { AGENT_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {FieldDto} from 'app/controller/model/Field.model';
import {FieldCriteria} from 'app/controller/criteria/FieldCriteria.model';



export const FieldAgentService = {

   getList(): Promise<AxiosResponse<FieldDto[]>> {
     return axios.get(AGENT_URL + 'field/');
   },

   save(item: FieldDto): Promise<AxiosResponse<FieldDto>> {
     return axios.post(AGENT_URL + 'field/', item);
   },

   update(item: FieldDto): Promise<AxiosResponse<FieldDto>> {
      return axios.put(AGENT_URL + 'field/', item);
   },

   delete(id: number): Promise<AxiosResponse<FieldDto>> {
      return axios.delete(AGENT_URL + 'field/id/'+ id);
   },

   deleteList(items: FieldDto[]): Promise<AxiosResponse<string>> {
      return axios.post(AGENT_URL + 'field/multiple', items);
   },

   findPaginatedByCriteria(criteria:FieldCriteria):Promise<AxiosResponse<PaginatedList<FieldDto>>> {
     return axios.post<PaginatedList<FieldDto>>(AGENT_URL + 'field/find-paginated-by-criteria', criteria);
   }
};

