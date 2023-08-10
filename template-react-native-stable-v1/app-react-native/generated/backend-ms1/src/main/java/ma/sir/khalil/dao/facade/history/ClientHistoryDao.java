package ma.sir.khalil.dao.facade.history;

import ma.sir.khalil.zynerator.repository.AbstractHistoryRepository;
import ma.sir.khalil.bean.history.ClientHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientHistoryDao extends AbstractHistoryRepository<ClientHistory,Long> {

}
