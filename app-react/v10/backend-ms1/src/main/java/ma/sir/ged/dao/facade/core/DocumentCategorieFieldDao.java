package ma.sir.ged.dao.facade.core;

import ma.sir.ged.zynerator.repository.AbstractRepository;
import ma.sir.ged.bean.core.DocumentCategorieField;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface DocumentCategorieFieldDao extends AbstractRepository<DocumentCategorieField,Long>  {

    List<DocumentCategorieField> findByFieldId(Long id);
    int deleteByFieldId(Long id);
    List<DocumentCategorieField> findByDocumentCategorieId(Long id);
    int deleteByDocumentCategorieId(Long id);
    List<DocumentCategorieField> findByDocumentCategorieFieldRuleId(Long id);
    int deleteByDocumentCategorieFieldRuleId(Long id);

}
