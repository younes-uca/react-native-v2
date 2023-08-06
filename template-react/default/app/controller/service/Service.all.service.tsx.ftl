import axios, { AxiosResponse } from "axios";
import { ${role.name?upper_case}_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {${pojo.name}Dto} from 'app/controller/model/${pojo.name}.model';
import {${pojo.name?cap_first}Criteria} from 'app/controller/criteria/${pojo.name?cap_first}Criteria.model';



export const ${pojo.name}${role.name?cap_first}Service = {

   getList(): Promise<AxiosResponse<${pojo.name}Dto[]>> {
     return axios.get(${role.name?upper_case}_URL + '${pojo.name?uncap_first}/');
   },

   save(item: ${pojo.name}Dto): Promise<AxiosResponse<${pojo.name}Dto>> {
     return axios.post(${role.name?upper_case}_URL + '${pojo.name?uncap_first}/', item);
   },

   update(item: ${pojo.name}Dto): Promise<AxiosResponse<${pojo.name}Dto>> {
      return axios.put(${role.name?upper_case}_URL + '${pojo.name?uncap_first}/', item);
   },

   delete(id: number): Promise<AxiosResponse<${pojo.name}Dto>> {
      return axios.delete(${role.name?upper_case}_URL + '${pojo.name?uncap_first}/id/'+ id);
   },

   deleteList(items: ${pojo.name}Dto[]): Promise<AxiosResponse<string>> {
      return axios.post(${role.name?upper_case}_URL + '${pojo.name?uncap_first}/multiple', items);
   },

   findPaginatedByCriteria(criteria:${pojo.name}Criteria):Promise<AxiosResponse<PaginatedList<${pojo.name}Dto>>> {
     return axios.post<PaginatedList<${pojo.name}Dto>>(${role.name?upper_case}_URL + '${pojo.name?uncap_first}/find-paginated-by-criteria', criteria);
   }
};

