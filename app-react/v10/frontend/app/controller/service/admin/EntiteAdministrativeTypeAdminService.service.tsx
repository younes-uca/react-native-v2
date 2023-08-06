import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {EntiteAdministrativeTypeDto} from 'app/controller/model/EntiteAdministrativeType.model';
import {EntiteAdministrativeTypeCriteria} from 'app/controller/criteria/EntiteAdministrativeTypeCriteria.model';



export const EntiteAdministrativeTypeAdminService = {

   getList(): Promise<AxiosResponse<EntiteAdministrativeTypeDto[]>> {
     return axios.get(ADMIN_URL + 'entiteAdministrativeType/');
   },

   save(item: EntiteAdministrativeTypeDto): Promise<AxiosResponse<EntiteAdministrativeTypeDto>> {
     return axios.post(ADMIN_URL + 'entiteAdministrativeType/', item);
   },

   update(item: EntiteAdministrativeTypeDto): Promise<AxiosResponse<EntiteAdministrativeTypeDto>> {
      return axios.put(ADMIN_URL + 'entiteAdministrativeType/', item);
   },

   delete(id: number): Promise<AxiosResponse<EntiteAdministrativeTypeDto>> {
      return axios.delete(ADMIN_URL + 'entiteAdministrativeType/id/'+ id);
   },

   deleteList(items: EntiteAdministrativeTypeDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'entiteAdministrativeType/multiple', items);
   },

   findPaginatedByCriteria(criteria:EntiteAdministrativeTypeCriteria):Promise<AxiosResponse<PaginatedList<EntiteAdministrativeTypeDto>>> {
     return axios.post<PaginatedList<EntiteAdministrativeTypeDto>>(ADMIN_URL + 'entiteAdministrativeType/find-paginated-by-criteria', criteria);
   }
};

