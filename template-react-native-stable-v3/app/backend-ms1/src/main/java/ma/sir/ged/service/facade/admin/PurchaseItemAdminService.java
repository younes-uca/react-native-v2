package ma.sir.ged.service.facade.admin;

import java.util.List;
import ma.sir.ged.bean.core.PurchaseItem;
import ma.sir.ged.dao.criteria.core.PurchaseItemCriteria;
import ma.sir.ged.dao.criteria.history.PurchaseItemHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface PurchaseItemAdminService extends  IService<PurchaseItem,PurchaseItemCriteria, PurchaseItemHistoryCriteria>  {

    List<PurchaseItem> findByProductId(Long id);
    int deleteByProductId(Long id);
    List<PurchaseItem> findByPurchaseId(Long id);
    int deleteByPurchaseId(Long id);



}
