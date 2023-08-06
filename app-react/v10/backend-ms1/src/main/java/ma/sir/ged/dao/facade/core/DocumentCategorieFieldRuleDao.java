package ma.sir.ged.dao.facade.core;

import org.springframework.data.jpa.repository.Query;
import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.DocumentCategorieFieldRule;
import org.springframework.stereotype.Repository;
import ma.sir.ged.bean.core.DocumentCategorieFieldRule;
import java.util.List;


@Repository
public interface DocumentCategorieFieldRuleDao extends AbstractRepository<DocumentCategorieFieldRule,Long>  {
    DocumentCategorieFieldRule findByCode(String code);
    int deleteByCode(String code);


    @Query("SELECT NEW DocumentCategorieFieldRule(item.id,item.libelle) FROM DocumentCategorieFieldRule item")
    List<DocumentCategorieFieldRule> findAllOptimized();
}
