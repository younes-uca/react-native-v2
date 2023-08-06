package ma.sir.ged.dao.facade.core;

import org.springframework.data.jpa.repository.Query;
import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.DocumentType;
import org.springframework.stereotype.Repository;
import ma.sir.ged.bean.core.DocumentType;
import java.util.List;


@Repository
public interface DocumentTypeDao extends AbstractRepository<DocumentType,Long>  {
    DocumentType findByCode(String code);
    int deleteByCode(String code);


    @Query("SELECT NEW DocumentType(item.id,item.libelle) FROM DocumentType item")
    List<DocumentType> findAllOptimized();
}
