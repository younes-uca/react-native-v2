import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {UtilisateurDto} from 'app/controller/model/Utilisateur.model';
import {UtilisateurCriteria} from 'app/controller/criteria/UtilisateurCriteria.model';



export const UtilisateurAdminService = {

   getList(): Promise<AxiosResponse<UtilisateurDto[]>> {
     return axios.get(ADMIN_URL + 'utilisateur/');
   },

   save(item: UtilisateurDto): Promise<AxiosResponse<UtilisateurDto>> {
     return axios.post(ADMIN_URL + 'utilisateur/', item);
   },

   update(item: UtilisateurDto): Promise<AxiosResponse<UtilisateurDto>> {
      return axios.put(ADMIN_URL + 'utilisateur/', item);
   },

   delete(id: number): Promise<AxiosResponse<UtilisateurDto>> {
      return axios.delete(ADMIN_URL + 'utilisateur/id/'+ id);
   },

   deleteList(items: UtilisateurDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'utilisateur/multiple', items);
   },

   findPaginatedByCriteria(criteria:UtilisateurCriteria):Promise<AxiosResponse<PaginatedList<UtilisateurDto>>> {
     return axios.post<PaginatedList<UtilisateurDto>>(ADMIN_URL + 'utilisateur/find-paginated-by-criteria', criteria);
   }
};

