package ma.sir.khalil.service.facade.admin;

import java.util.List;
import ma.sir.khalil.bean.core.ClientCategory;
import ma.sir.khalil.dao.criteria.core.ClientCategoryCriteria;
import ma.sir.khalil.dao.criteria.history.ClientCategoryHistoryCriteria;
import ma.sir.khalil.zynerator.service.IService;


public interface ClientCategoryAdminService extends  IService<ClientCategory,ClientCategoryCriteria, ClientCategoryHistoryCriteria>  {




}
