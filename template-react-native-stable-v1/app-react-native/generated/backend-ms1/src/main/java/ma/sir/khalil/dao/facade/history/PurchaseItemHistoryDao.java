package ma.sir.khalil.dao.facade.history;

import ma.sir.khalil.zynerator.repository.AbstractHistoryRepository;
import ma.sir.khalil.bean.history.PurchaseItemHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseItemHistoryDao extends AbstractHistoryRepository<PurchaseItemHistory,Long> {

}
