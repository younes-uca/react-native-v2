package ma.sir.ged.service.impl.agent;

import ma.sir.ged.bean.core.Purchase;
import ma.sir.ged.bean.history.PurchaseHistory;
import ma.sir.ged.dao.criteria.core.PurchaseCriteria;
import ma.sir.ged.dao.criteria.history.PurchaseHistoryCriteria;
import ma.sir.ged.dao.facade.core.PurchaseDao;
import ma.sir.ged.dao.facade.history.PurchaseHistoryDao;
import ma.sir.ged.dao.specification.core.PurchaseSpecification;
import ma.sir.ged.service.facade.agent.PurchaseAgentService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PurchaseAgentServiceImpl extends AbstractServiceImpl<Purchase, PurchaseHistory, PurchaseCriteria, PurchaseHistoryCriteria, PurchaseDao,
        PurchaseHistoryDao> implements PurchaseAgentService {


    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public Purchase create(Purchase t) {
        super.create(t);

        return t;
    }

    public Purchase findWithAssociatedLists(Long id) {
        Purchase result = dao.findById(id).orElse(null);

        return result;
    }

    @Transactional
    public void deleteAssociatedLists(Long id) {

    }


    public void updateWithAssociatedLists(Purchase purchase) {
        if (purchase != null && purchase.getId() != null) {

        }
    }

    public Purchase findByReferenceEntity(Purchase t) {
        return dao.findByReference(t.getReference());
    }

    public List<Purchase> findByClientId(Long id) {
        return dao.findByClientId(id);
    }

    public int deleteByClientId(Long id) {
        return dao.deleteByClientId(id);
    }


    public void configure() {
        super.configure(Purchase.class, PurchaseHistory.class, PurchaseHistoryCriteria.class, PurchaseSpecification.class);
    }


    public PurchaseAgentServiceImpl(PurchaseDao dao, PurchaseHistoryDao historyDao) {
        super(dao, historyDao);
    }

}