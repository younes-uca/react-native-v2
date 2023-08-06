package ma.sir.ged.service.facade.admin;

import java.util.List;
import ma.sir.ged.bean.core.DocumentField;
import ma.sir.ged.dao.criteria.core.DocumentFieldCriteria;
import ma.sir.ged.dao.criteria.history.DocumentFieldHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface DocumentFieldAdminService extends  IService<DocumentField,DocumentFieldCriteria, DocumentFieldHistoryCriteria>  {

    List<DocumentField> findByFieldId(Long id);
    int deleteByFieldId(Long id);
    List<DocumentField> findByDocumentId(Long id);
    int deleteByDocumentId(Long id);
    List<DocumentField> findByDocumentFieldStateId(Long id);
    int deleteByDocumentFieldStateId(Long id);



}
