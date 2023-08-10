package ma.sir.khalil.service.impl.admin;

import ma.sir.khalil.bean.core.Product;
import ma.sir.khalil.bean.history.ProductHistory;
import ma.sir.khalil.dao.criteria.core.ProductCriteria;
import ma.sir.khalil.dao.criteria.history.ProductHistoryCriteria;
import ma.sir.khalil.dao.facade.core.ProductDao;
import ma.sir.khalil.dao.facade.history.ProductHistoryDao;
import ma.sir.khalil.dao.specification.core.ProductSpecification;
import ma.sir.khalil.service.facade.admin.ProductAdminService;
import ma.sir.khalil.zynerator.service.AbstractServiceImpl;
import ma.sir.khalil.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;







import java.util.List;
@Service
public class ProductAdminServiceImpl extends AbstractServiceImpl<Product,ProductHistory, ProductCriteria, ProductHistoryCriteria, ProductDao,
ProductHistoryDao> implements ProductAdminService {



    public Product findByReferenceEntity(Product t){
        return  dao.findByCode(t.getCode());
    }





    public void configure() {
        super.configure(Product.class,ProductHistory.class, ProductHistoryCriteria.class, ProductSpecification.class);
    }


    public ProductAdminServiceImpl(ProductDao dao, ProductHistoryDao historyDao) {
        super(dao, historyDao);
    }

}