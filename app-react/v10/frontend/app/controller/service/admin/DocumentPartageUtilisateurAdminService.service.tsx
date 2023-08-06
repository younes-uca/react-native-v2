import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentPartageUtilisateurDto} from 'app/controller/model/DocumentPartageUtilisateur.model';
import {DocumentPartageUtilisateurCriteria} from 'app/controller/criteria/DocumentPartageUtilisateurCriteria.model';



export const DocumentPartageUtilisateurAdminService = {

   getList(): Promise<AxiosResponse<DocumentPartageUtilisateurDto[]>> {
     return axios.get(ADMIN_URL + 'documentPartageUtilisateur/');
   },

   save(item: DocumentPartageUtilisateurDto): Promise<AxiosResponse<DocumentPartageUtilisateurDto>> {
     return axios.post(ADMIN_URL + 'documentPartageUtilisateur/', item);
   },

   update(item: DocumentPartageUtilisateurDto): Promise<AxiosResponse<DocumentPartageUtilisateurDto>> {
      return axios.put(ADMIN_URL + 'documentPartageUtilisateur/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentPartageUtilisateurDto>> {
      return axios.delete(ADMIN_URL + 'documentPartageUtilisateur/id/'+ id);
   },

   deleteList(items: DocumentPartageUtilisateurDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentPartageUtilisateur/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentPartageUtilisateurCriteria):Promise<AxiosResponse<PaginatedList<DocumentPartageUtilisateurDto>>> {
     return axios.post<PaginatedList<DocumentPartageUtilisateurDto>>(ADMIN_URL + 'documentPartageUtilisateur/find-paginated-by-criteria', criteria);
   }
};

