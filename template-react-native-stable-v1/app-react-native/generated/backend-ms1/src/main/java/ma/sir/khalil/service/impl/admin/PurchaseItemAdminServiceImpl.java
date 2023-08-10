package ma.sir.khalil.service.impl.admin;

import ma.sir.khalil.bean.core.PurchaseItem;
import ma.sir.khalil.bean.history.PurchaseItemHistory;
import ma.sir.khalil.dao.criteria.core.PurchaseItemCriteria;
import ma.sir.khalil.dao.criteria.history.PurchaseItemHistoryCriteria;
import ma.sir.khalil.dao.facade.core.PurchaseItemDao;
import ma.sir.khalil.dao.facade.history.PurchaseItemHistoryDao;
import ma.sir.khalil.dao.specification.core.PurchaseItemSpecification;
import ma.sir.khalil.service.facade.admin.PurchaseItemAdminService;
import ma.sir.khalil.zynerator.service.AbstractServiceImpl;
import ma.sir.khalil.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;


import ma.sir.khalil.service.facade.admin.ProductAdminService ;
import ma.sir.khalil.service.facade.admin.PurchaseAdminService ;



import java.util.List;
@Service
public class PurchaseItemAdminServiceImpl extends AbstractServiceImpl<PurchaseItem,PurchaseItemHistory, PurchaseItemCriteria, PurchaseItemHistoryCriteria, PurchaseItemDao,
PurchaseItemHistoryDao> implements PurchaseItemAdminService {




    public List<PurchaseItem> findByProductId(Long id){
        return dao.findByProductId(id);
    }
    public int deleteByProductId(Long id){
        return dao.deleteByProductId(id);
    }
    public List<PurchaseItem> findByPurchaseId(Long id){
        return dao.findByPurchaseId(id);
    }
    public int deleteByPurchaseId(Long id){
        return dao.deleteByPurchaseId(id);
    }




    public void configure() {
        super.configure(PurchaseItem.class,PurchaseItemHistory.class, PurchaseItemHistoryCriteria.class, PurchaseItemSpecification.class);
    }

    @Autowired
    private ProductAdminService productService ;
    @Autowired
    private PurchaseAdminService purchaseService ;

    public PurchaseItemAdminServiceImpl(PurchaseItemDao dao, PurchaseItemHistoryDao historyDao) {
        super(dao, historyDao);
    }

}