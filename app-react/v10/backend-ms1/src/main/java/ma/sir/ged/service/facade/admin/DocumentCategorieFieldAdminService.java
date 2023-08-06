package ma.sir.ged.service.facade.admin;

import java.util.List;
import ma.sir.ged.bean.core.DocumentCategorieField;
import ma.sir.ged.dao.criteria.core.DocumentCategorieFieldCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieFieldHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface DocumentCategorieFieldAdminService extends  IService<DocumentCategorieField,DocumentCategorieFieldCriteria, DocumentCategorieFieldHistoryCriteria>  {

    List<DocumentCategorieField> findByFieldId(Long id);
    int deleteByFieldId(Long id);
    List<DocumentCategorieField> findByDocumentCategorieId(Long id);
    int deleteByDocumentCategorieId(Long id);
    List<DocumentCategorieField> findByDocumentCategorieFieldRuleId(Long id);
    int deleteByDocumentCategorieFieldRuleId(Long id);



}
