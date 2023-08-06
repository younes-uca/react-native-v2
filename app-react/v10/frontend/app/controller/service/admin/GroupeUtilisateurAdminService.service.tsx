import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {GroupeUtilisateurDto} from 'app/controller/model/GroupeUtilisateur.model';
import {GroupeUtilisateurCriteria} from 'app/controller/criteria/GroupeUtilisateurCriteria.model';



export const GroupeUtilisateurAdminService = {

   getList(): Promise<AxiosResponse<GroupeUtilisateurDto[]>> {
     return axios.get(ADMIN_URL + 'groupeUtilisateur/');
   },

   save(item: GroupeUtilisateurDto): Promise<AxiosResponse<GroupeUtilisateurDto>> {
     return axios.post(ADMIN_URL + 'groupeUtilisateur/', item);
   },

   update(item: GroupeUtilisateurDto): Promise<AxiosResponse<GroupeUtilisateurDto>> {
      return axios.put(ADMIN_URL + 'groupeUtilisateur/', item);
   },

   delete(id: number): Promise<AxiosResponse<GroupeUtilisateurDto>> {
      return axios.delete(ADMIN_URL + 'groupeUtilisateur/id/'+ id);
   },

   deleteList(items: GroupeUtilisateurDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'groupeUtilisateur/multiple', items);
   },

   findPaginatedByCriteria(criteria:GroupeUtilisateurCriteria):Promise<AxiosResponse<PaginatedList<GroupeUtilisateurDto>>> {
     return axios.post<PaginatedList<GroupeUtilisateurDto>>(ADMIN_URL + 'groupeUtilisateur/find-paginated-by-criteria', criteria);
   }
};

