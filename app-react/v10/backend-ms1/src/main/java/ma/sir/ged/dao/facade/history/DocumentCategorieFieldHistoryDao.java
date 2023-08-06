package ma.sir.ged.dao.facade.history;

import ma.sir.ged.zynerator.repository.AbstractHistoryRepository;
import ma.sir.ged.bean.history.DocumentCategorieFieldHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentCategorieFieldHistoryDao extends AbstractHistoryRepository<DocumentCategorieFieldHistory,Long> {

}
