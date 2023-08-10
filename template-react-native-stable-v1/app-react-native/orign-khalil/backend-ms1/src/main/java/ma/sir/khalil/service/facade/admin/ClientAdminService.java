package ma.sir.khalil.service.facade.admin;

import java.util.List;
import ma.sir.khalil.bean.core.Client;
import ma.sir.khalil.dao.criteria.core.ClientCriteria;
import ma.sir.khalil.dao.criteria.history.ClientHistoryCriteria;
import ma.sir.khalil.zynerator.service.IService;


public interface ClientAdminService extends  IService<Client,ClientCriteria, ClientHistoryCriteria>  {

    List<Client> findByClientCategoryId(Long id);
    int deleteByClientCategoryId(Long id);



}
