package ma.sir.ged.service.facade.admin;

import java.util.List;
import ma.sir.ged.bean.core.Client;
import ma.sir.ged.dao.criteria.core.ClientCriteria;
import ma.sir.ged.dao.criteria.history.ClientHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface ClientAdminService extends  IService<Client,ClientCriteria, ClientHistoryCriteria>  {

    List<Client> findByClientCategoryId(Long id);
    int deleteByClientCategoryId(Long id);



}
