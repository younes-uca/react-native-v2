package ma.sir.ged.dao.facade.history;

import ma.sir.ged.zynerator.repository.AbstractHistoryRepository;
import ma.sir.ged.bean.history.EntiteAdministrativeTypeHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface EntiteAdministrativeTypeHistoryDao extends AbstractHistoryRepository<EntiteAdministrativeTypeHistory,Long> {

}
