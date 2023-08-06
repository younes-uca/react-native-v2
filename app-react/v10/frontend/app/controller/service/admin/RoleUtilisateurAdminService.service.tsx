import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {RoleUtilisateurDto} from 'app/controller/model/RoleUtilisateur.model';
import {RoleUtilisateurCriteria} from 'app/controller/criteria/RoleUtilisateurCriteria.model';



export const RoleUtilisateurAdminService = {

   getList(): Promise<AxiosResponse<RoleUtilisateurDto[]>> {
     return axios.get(ADMIN_URL + 'roleUtilisateur/');
   },

   save(item: RoleUtilisateurDto): Promise<AxiosResponse<RoleUtilisateurDto>> {
     return axios.post(ADMIN_URL + 'roleUtilisateur/', item);
   },

   update(item: RoleUtilisateurDto): Promise<AxiosResponse<RoleUtilisateurDto>> {
      return axios.put(ADMIN_URL + 'roleUtilisateur/', item);
   },

   delete(id: number): Promise<AxiosResponse<RoleUtilisateurDto>> {
      return axios.delete(ADMIN_URL + 'roleUtilisateur/id/'+ id);
   },

   deleteList(items: RoleUtilisateurDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'roleUtilisateur/multiple', items);
   },

   findPaginatedByCriteria(criteria:RoleUtilisateurCriteria):Promise<AxiosResponse<PaginatedList<RoleUtilisateurDto>>> {
     return axios.post<PaginatedList<RoleUtilisateurDto>>(ADMIN_URL + 'roleUtilisateur/find-paginated-by-criteria', criteria);
   }
};

