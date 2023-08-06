package ma.sir.ged.dao.facade.history;

import ma.sir.ged.zynerator.repository.AbstractHistoryRepository;
import ma.sir.ged.bean.history.FieldHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface FieldHistoryDao extends AbstractHistoryRepository<FieldHistory,Long> {

}
