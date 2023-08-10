package ma.sir.khalil.dao.facade.history;

import ma.sir.khalil.zynerator.repository.AbstractHistoryRepository;
import ma.sir.khalil.bean.history.ClientCategoryHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientCategoryHistoryDao extends AbstractHistoryRepository<ClientCategoryHistory,Long> {

}
