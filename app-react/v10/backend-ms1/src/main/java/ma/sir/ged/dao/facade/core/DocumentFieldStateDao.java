package ma.sir.ged.dao.facade.core;

import org.springframework.data.jpa.repository.Query;
import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.DocumentFieldState;
import org.springframework.stereotype.Repository;
import ma.sir.ged.bean.core.DocumentFieldState;
import java.util.List;


@Repository
public interface DocumentFieldStateDao extends AbstractRepository<DocumentFieldState,Long>  {
    DocumentFieldState findByCode(String code);
    int deleteByCode(String code);


    @Query("SELECT NEW DocumentFieldState(item.id,item.libelle) FROM DocumentFieldState item")
    List<DocumentFieldState> findAllOptimized();
}
