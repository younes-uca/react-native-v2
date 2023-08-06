package ma.sir.ged.service.impl.agent;

import ma.sir.ged.bean.core.DocumentCategorie;
import ma.sir.ged.bean.history.DocumentCategorieHistory;
import ma.sir.ged.dao.criteria.core.DocumentCategorieCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieHistoryCriteria;
import ma.sir.ged.dao.facade.core.DocumentCategorieDao;
import ma.sir.ged.dao.facade.history.DocumentCategorieHistoryDao;
import ma.sir.ged.dao.specification.core.DocumentCategorieSpecification;
import ma.sir.ged.service.facade.agent.DocumentCategorieAgentService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ma.sir.ged.bean.core.DocumentCategorieField;

import ma.sir.ged.service.facade.agent.DocumentCategorieFieldAgentService ;



import java.util.List;
@Service
public class DocumentCategorieAgentServiceImpl extends AbstractServiceImpl<DocumentCategorie,DocumentCategorieHistory, DocumentCategorieCriteria, DocumentCategorieHistoryCriteria, DocumentCategorieDao,
DocumentCategorieHistoryDao> implements DocumentCategorieAgentService {


    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public DocumentCategorie create(DocumentCategorie t) {
        super.create(t);
        if (t.getDocumentCategorieFields() != null) {
                t.getDocumentCategorieFields().forEach(element-> {
                    element.setDocumentCategorie(t);
                    documentCategorieFieldService.create(element);
            });
        }
        return t;
    }

    public DocumentCategorie findWithAssociatedLists(Long id){
        DocumentCategorie result = dao.findById(id).orElse(null);
        if(result!=null && result.getId() != null) {
            result.setDocumentCategorieFields(documentCategorieFieldService.findByDocumentCategorieId(id));
        }
        return result;
    }
    @Transactional
    public void deleteAssociatedLists(Long id) {
        documentCategorieFieldService.deleteByDocumentCategorieId(id);
    }


    public void updateWithAssociatedLists(DocumentCategorie documentCategorie){
    if(documentCategorie !=null && documentCategorie.getId() != null){
            List<List<DocumentCategorieField>> resultDocumentCategorieFields= documentCategorieFieldService.getToBeSavedAndToBeDeleted(documentCategorieFieldService.findByDocumentCategorieId(documentCategorie.getId()),documentCategorie.getDocumentCategorieFields());
            documentCategorieFieldService.delete(resultDocumentCategorieFields.get(1));
            ListUtil.emptyIfNull(resultDocumentCategorieFields.get(0)).forEach(e -> e.setDocumentCategorie(documentCategorie));
            documentCategorieFieldService.update(resultDocumentCategorieFields.get(0),true);
    }
    }

    public DocumentCategorie findByReferenceEntity(DocumentCategorie t){
        return  dao.findByCode(t.getCode());
    }





    public void configure() {
        super.configure(DocumentCategorie.class,DocumentCategorieHistory.class, DocumentCategorieHistoryCriteria.class, DocumentCategorieSpecification.class);
    }

    @Autowired
    private DocumentCategorieFieldAgentService documentCategorieFieldService ;

    public DocumentCategorieAgentServiceImpl(DocumentCategorieDao dao, DocumentCategorieHistoryDao historyDao) {
        super(dao, historyDao);
    }

}