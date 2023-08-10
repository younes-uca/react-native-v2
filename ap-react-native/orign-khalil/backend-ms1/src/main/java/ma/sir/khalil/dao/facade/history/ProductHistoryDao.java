package ma.sir.khalil.dao.facade.history;

import ma.sir.khalil.zynerator.repository.AbstractHistoryRepository;
import ma.sir.khalil.bean.history.ProductHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductHistoryDao extends AbstractHistoryRepository<ProductHistory,Long> {

}
