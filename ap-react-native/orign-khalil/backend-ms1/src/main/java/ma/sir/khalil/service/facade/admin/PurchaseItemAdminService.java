package ma.sir.khalil.service.facade.admin;

import java.util.List;
import ma.sir.khalil.bean.core.PurchaseItem;
import ma.sir.khalil.dao.criteria.core.PurchaseItemCriteria;
import ma.sir.khalil.dao.criteria.history.PurchaseItemHistoryCriteria;
import ma.sir.khalil.zynerator.service.IService;


public interface PurchaseItemAdminService extends  IService<PurchaseItem,PurchaseItemCriteria, PurchaseItemHistoryCriteria>  {

    List<PurchaseItem> findByProductId(Long id);
    int deleteByProductId(Long id);
    List<PurchaseItem> findByPurchaseId(Long id);
    int deleteByPurchaseId(Long id);



}
