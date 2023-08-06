package ma.sir.ged.dao.facade.core;

import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.DocumentTag;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface DocumentTagDao extends AbstractRepository<DocumentTag,Long>  {

    List<DocumentTag> findByDocumentId(Long id);
    int deleteByDocumentId(Long id);
    List<DocumentTag> findByTagId(Long id);
    int deleteByTagId(Long id);

}
