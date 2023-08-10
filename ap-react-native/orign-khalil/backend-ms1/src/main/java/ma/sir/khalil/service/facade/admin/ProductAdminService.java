package ma.sir.khalil.service.facade.admin;

import java.util.List;
import ma.sir.khalil.bean.core.Product;
import ma.sir.khalil.dao.criteria.core.ProductCriteria;
import ma.sir.khalil.dao.criteria.history.ProductHistoryCriteria;
import ma.sir.khalil.zynerator.service.IService;


public interface ProductAdminService extends  IService<Product,ProductCriteria, ProductHistoryCriteria>  {




}
