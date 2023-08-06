import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {EtatUtilisateurDto} from 'app/controller/model/EtatUtilisateur.model';
import {EtatUtilisateurCriteria} from 'app/controller/criteria/EtatUtilisateurCriteria.model';



export const EtatUtilisateurAdminService = {

   getList(): Promise<AxiosResponse<EtatUtilisateurDto[]>> {
     return axios.get(ADMIN_URL + 'etatUtilisateur/');
   },

   save(item: EtatUtilisateurDto): Promise<AxiosResponse<EtatUtilisateurDto>> {
     return axios.post(ADMIN_URL + 'etatUtilisateur/', item);
   },

   update(item: EtatUtilisateurDto): Promise<AxiosResponse<EtatUtilisateurDto>> {
      return axios.put(ADMIN_URL + 'etatUtilisateur/', item);
   },

   delete(id: number): Promise<AxiosResponse<EtatUtilisateurDto>> {
      return axios.delete(ADMIN_URL + 'etatUtilisateur/id/'+ id);
   },

   deleteList(items: EtatUtilisateurDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'etatUtilisateur/multiple', items);
   },

   findPaginatedByCriteria(criteria:EtatUtilisateurCriteria):Promise<AxiosResponse<PaginatedList<EtatUtilisateurDto>>> {
     return axios.post<PaginatedList<EtatUtilisateurDto>>(ADMIN_URL + 'etatUtilisateur/find-paginated-by-criteria', criteria);
   }
};

