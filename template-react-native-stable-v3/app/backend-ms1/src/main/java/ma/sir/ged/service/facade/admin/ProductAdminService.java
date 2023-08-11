package ma.sir.ged.service.facade.admin;

import java.util.List;
import ma.sir.ged.bean.core.Product;
import ma.sir.ged.dao.criteria.core.ProductCriteria;
import ma.sir.ged.dao.criteria.history.ProductHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface ProductAdminService extends  IService<Product,ProductCriteria, ProductHistoryCriteria>  {




}
