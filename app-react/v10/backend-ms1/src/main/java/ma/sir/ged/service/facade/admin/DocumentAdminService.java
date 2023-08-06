package ma.sir.ged.service.facade.admin;

import java.util.List;
import ma.sir.ged.bean.core.Document;
import ma.sir.ged.dao.criteria.core.DocumentCriteria;
import ma.sir.ged.dao.criteria.history.DocumentHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface DocumentAdminService extends  IService<Document,DocumentCriteria, DocumentHistoryCriteria>  {

    List<Document> findByDocumentTypeId(Long id);
    int deleteByDocumentTypeId(Long id);
    List<Document> findByDocumentStateId(Long id);
    int deleteByDocumentStateId(Long id);
    List<Document> findByDocumentCategorieId(Long id);
    int deleteByDocumentCategorieId(Long id);
    List<Document> findByUtilisateurId(Long id);
    int deleteByUtilisateurId(Long id);
    List<Document> findByEntiteAdministrativeId(Long id);
    int deleteByEntiteAdministrativeId(Long id);



}
