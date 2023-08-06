import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {DocumentTypeDto} from 'app/controller/model/DocumentType.model';
import {DocumentTypeCriteria} from 'app/controller/criteria/DocumentTypeCriteria.model';



export const DocumentTypeAdminService = {

   getList(): Promise<AxiosResponse<DocumentTypeDto[]>> {
     return axios.get(ADMIN_URL + 'documentType/');
   },

   save(item: DocumentTypeDto): Promise<AxiosResponse<DocumentTypeDto>> {
     return axios.post(ADMIN_URL + 'documentType/', item);
   },

   update(item: DocumentTypeDto): Promise<AxiosResponse<DocumentTypeDto>> {
      return axios.put(ADMIN_URL + 'documentType/', item);
   },

   delete(id: number): Promise<AxiosResponse<DocumentTypeDto>> {
      return axios.delete(ADMIN_URL + 'documentType/id/'+ id);
   },

   deleteList(items: DocumentTypeDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'documentType/multiple', items);
   },

   findPaginatedByCriteria(criteria:DocumentTypeCriteria):Promise<AxiosResponse<PaginatedList<DocumentTypeDto>>> {
     return axios.post<PaginatedList<DocumentTypeDto>>(ADMIN_URL + 'documentType/find-paginated-by-criteria', criteria);
   }
};

