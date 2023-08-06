package ma.sir.ged.dao.facade.core;

import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.DocumentField;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface DocumentFieldDao extends AbstractRepository<DocumentField,Long>  {

    List<DocumentField> findByFieldId(Long id);
    int deleteByFieldId(Long id);
    List<DocumentField> findByDocumentId(Long id);
    int deleteByDocumentId(Long id);
    List<DocumentField> findByDocumentFieldStateId(Long id);
    int deleteByDocumentFieldStateId(Long id);

}
