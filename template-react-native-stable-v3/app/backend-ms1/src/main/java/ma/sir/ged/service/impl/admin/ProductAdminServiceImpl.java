package ma.sir.ged.service.impl.admin;

import ma.sir.ged.bean.core.Product;
import ma.sir.ged.bean.history.ProductHistory;
import ma.sir.ged.dao.criteria.core.ProductCriteria;
import ma.sir.ged.dao.criteria.history.ProductHistoryCriteria;
import ma.sir.ged.dao.facade.core.ProductDao;
import ma.sir.ged.dao.facade.history.ProductHistoryDao;
import ma.sir.ged.dao.specification.core.ProductSpecification;
import ma.sir.ged.service.facade.admin.ProductAdminService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
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