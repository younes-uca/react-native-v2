package ma.sir.khalil.service.facade.admin;

import java.util.List;
import ma.sir.khalil.bean.core.Purchase;
import ma.sir.khalil.dao.criteria.core.PurchaseCriteria;
import ma.sir.khalil.dao.criteria.history.PurchaseHistoryCriteria;
import ma.sir.khalil.zynerator.service.IService;


public interface PurchaseAdminService extends  IService<Purchase,PurchaseCriteria, PurchaseHistoryCriteria>  {

    List<Purchase> findByClientId(Long id);
    int deleteByClientId(Long id);



}
