package ma.sir.ged.dao.facade.core;

import org.springframework.data.jpa.repository.Query;
import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.DocumentState;
import org.springframework.stereotype.Repository;
import ma.sir.ged.bean.core.DocumentState;
import java.util.List;


@Repository
public interface DocumentStateDao extends AbstractRepository<DocumentState,Long>  {
    DocumentState findByCode(String code);
    int deleteByCode(String code);


    @Query("SELECT NEW DocumentState(item.id,item.libelle) FROM DocumentState item")
    List<DocumentState> findAllOptimized();
}
