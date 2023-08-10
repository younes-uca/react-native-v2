package ma.sir.ged.service.facade.agent;

import java.util.List;
import ma.sir.ged.bean.core.Purchase;
import ma.sir.ged.dao.criteria.core.PurchaseCriteria;
import ma.sir.ged.dao.criteria.history.PurchaseHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface PurchaseAgentService extends  IService<Purchase,PurchaseCriteria, PurchaseHistoryCriteria>  {

    List<Purchase> findByClientId(Long id);
    int deleteByClientId(Long id);



}
