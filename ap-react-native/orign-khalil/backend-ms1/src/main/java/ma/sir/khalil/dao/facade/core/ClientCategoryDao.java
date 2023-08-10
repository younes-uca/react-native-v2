package ma.sir.khalil.dao.facade.core;

import org.springframework.data.jpa.repository.Query;
import ma.sir.khalil.zynerator.repository.AbstractRepository;
import ma.sir.khalil.bean.core.ClientCategory;
import org.springframework.stereotype.Repository;
import ma.sir.khalil.bean.core.ClientCategory;
import java.util.List;


@Repository
public interface ClientCategoryDao extends AbstractRepository<ClientCategory,Long>  {
    ClientCategory findByCode(String code);
    int deleteByCode(String code);


    @Query("SELECT NEW ClientCategory(item.id,item.reference) FROM ClientCategory item")
    List<ClientCategory> findAllOptimized();
}
