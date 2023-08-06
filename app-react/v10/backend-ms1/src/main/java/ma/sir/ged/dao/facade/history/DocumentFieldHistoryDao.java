package ma.sir.ged.dao.facade.history;

import ma.sir.ged.zynerator.repository.AbstractHistoryRepository;
import ma.sir.ged.bean.history.DocumentFieldHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentFieldHistoryDao extends AbstractHistoryRepository<DocumentFieldHistory,Long> {

}
