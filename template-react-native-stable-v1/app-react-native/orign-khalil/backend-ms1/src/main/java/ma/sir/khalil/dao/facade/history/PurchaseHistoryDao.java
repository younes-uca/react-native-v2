package ma.sir.khalil.dao.facade.history;

import ma.sir.khalil.zynerator.repository.AbstractHistoryRepository;
import ma.sir.khalil.bean.history.PurchaseHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseHistoryDao extends AbstractHistoryRepository<PurchaseHistory,Long> {

}
