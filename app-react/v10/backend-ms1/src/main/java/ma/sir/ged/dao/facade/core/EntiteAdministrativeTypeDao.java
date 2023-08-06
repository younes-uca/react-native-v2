package ma.sir.ged.dao.facade.core;

import org.springframework.data.jpa.repository.Query;
import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.EntiteAdministrativeType;
import org.springframework.stereotype.Repository;
import ma.sir.ged.bean.core.EntiteAdministrativeType;
import java.util.List;


@Repository
public interface EntiteAdministrativeTypeDao extends AbstractRepository<EntiteAdministrativeType,Long>  {
    EntiteAdministrativeType findByCode(String code);
    int deleteByCode(String code);


    @Query("SELECT NEW EntiteAdministrativeType(item.id,item.libelle) FROM EntiteAdministrativeType item")
    List<EntiteAdministrativeType> findAllOptimized();
}
