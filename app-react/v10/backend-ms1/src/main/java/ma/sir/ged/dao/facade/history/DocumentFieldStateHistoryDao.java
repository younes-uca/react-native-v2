package ma.sir.ged.dao.facade.history;

import ma.sir.ged.zynerator.repository.AbstractHistoryRepository;
import ma.sir.ged.bean.history.DocumentFieldStateHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentFieldStateHistoryDao extends AbstractHistoryRepository<DocumentFieldStateHistory,Long> {

}
