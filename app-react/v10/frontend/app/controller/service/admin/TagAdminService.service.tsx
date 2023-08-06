import axios, { AxiosResponse } from "axios";
import { ADMIN_URL } from 'layout/AppConfig';
import {PaginatedList} from 'app/zynerator/dto/PaginatedList.model';
import {TagDto} from 'app/controller/model/Tag.model';
import {TagCriteria} from 'app/controller/criteria/TagCriteria.model';



export const TagAdminService = {

   getList(): Promise<AxiosResponse<TagDto[]>> {
     return axios.get(ADMIN_URL + 'tag/');
   },

   save(item: TagDto): Promise<AxiosResponse<TagDto>> {
     return axios.post(ADMIN_URL + 'tag/', item);
   },

   update(item: TagDto): Promise<AxiosResponse<TagDto>> {
      return axios.put(ADMIN_URL + 'tag/', item);
   },

   delete(id: number): Promise<AxiosResponse<TagDto>> {
      return axios.delete(ADMIN_URL + 'tag/id/'+ id);
   },

   deleteList(items: TagDto[]): Promise<AxiosResponse<string>> {
      return axios.post(ADMIN_URL + 'tag/multiple', items);
   },

   findPaginatedByCriteria(criteria:TagCriteria):Promise<AxiosResponse<PaginatedList<TagDto>>> {
     return axios.post<PaginatedList<TagDto>>(ADMIN_URL + 'tag/find-paginated-by-criteria', criteria);
   }
};

