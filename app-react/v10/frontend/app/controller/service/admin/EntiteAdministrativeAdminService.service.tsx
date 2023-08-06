import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {EntiteAdministrativeDto} from 'app/controller/model/EntiteAdministrative.model';
import {EntiteAdministrativeCriteria} from 'app/controller/criteria/EntiteAdministrativeCriteria.model';



export const EntiteAdministrativeAdminService = {

   getList(): Promise<AxiosResponse<EntiteAdministrativeDto[]>> {
     return axios.get(ADMIN_URL + 'entiteAdministrative/');
   },

   save(item: EntiteAdministrativeDto): Promise<AxiosResponse<EntiteAdministrativeDto>> {
     return axios.post(ADMIN_URL + 'entiteAdministrative/', item);
   },

   update(item: EntiteAdministrativeDto): Promise<AxiosResponse<EntiteAdministrativeDto>> {
      return axios.put(ADMIN_URL + 'entiteAdministrative/', item);
   },

   delete(id: number): Promise<AxiosResponse<EntiteAdministrativeDto>> {
      return axios.delete(ADMIN_URL + 'entiteAdministrative/id/'+ id);
   },

   deleteList(items: EntiteAdministrativeDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'entiteAdministrative/multiple', items);
   },

   findPaginatedByCriteria(criteria:EntiteAdministrativeCriteria):Promise<AxiosResponse<PaginatedList<EntiteAdministrativeDto>>> {
     return axios.post<PaginatedList<EntiteAdministrativeDto>>(ADMIN_URL + 'entiteAdministrative/find-paginated-by-criteria', criteria);
   }
};

