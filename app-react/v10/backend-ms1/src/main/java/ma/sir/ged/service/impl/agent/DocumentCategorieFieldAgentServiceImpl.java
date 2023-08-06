package ma.sir.ged.service.impl.agent;

import ma.sir.ged.bean.core.DocumentCategorieField;
import ma.sir.ged.bean.history.DocumentCategorieFieldHistory;
import ma.sir.ged.dao.criteria.core.DocumentCategorieFieldCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieFieldHistoryCriteria;
import ma.sir.ged.dao.facade.core.DocumentCategorieFieldDao;
import ma.sir.ged.dao.facade.history.DocumentCategorieFieldHistoryDao;
import ma.sir.ged.dao.specification.core.DocumentCategorieFieldSpecification;
import ma.sir.ged.service.facade.agent.DocumentCategorieFieldAgentService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;


import ma.sir.ged.service.facade.agent.DocumentCategorieFieldRuleAgentService ;
import ma.sir.ged.service.facade.agent.FieldAgentService ;
import ma.sir.ged.service.facade.agent.DocumentCategorieAgentService ;



import java.util.List;
@Service
public class DocumentCategorieFieldAgentServiceImpl extends AbstractServiceImpl<DocumentCategorieField,DocumentCategorieFieldHistory, DocumentCategorieFieldCriteria, DocumentCategorieFieldHistoryCriteria, DocumentCategorieFieldDao,
DocumentCategorieFieldHistoryDao> implements DocumentCategorieFieldAgentService {




    public List<DocumentCategorieField> findByFieldId(Long id){
        return dao.findByFieldId(id);
    }
    public int deleteByFieldId(Long id){
        return dao.deleteByFieldId(id);
    }
    public List<DocumentCategorieField> findByDocumentCategorieId(Long id){
        return dao.findByDocumentCategorieId(id);
    }
    public int deleteByDocumentCategorieId(Long id){
        return dao.deleteByDocumentCategorieId(id);
    }
    public List<DocumentCategorieField> findByDocumentCategorieFieldRuleId(Long id){
        return dao.findByDocumentCategorieFieldRuleId(id);
    }
    public int deleteByDocumentCategorieFieldRuleId(Long id){
        return dao.deleteByDocumentCategorieFieldRuleId(id);
    }




    public void configure() {
        super.configure(DocumentCategorieField.class,DocumentCategorieFieldHistory.class, DocumentCategorieFieldHistoryCriteria.class, DocumentCategorieFieldSpecification.class);
    }

    @Autowired
    private DocumentCategorieFieldRuleAgentService documentCategorieFieldRuleService ;
    @Autowired
    private FieldAgentService fieldService ;
    @Autowired
    private DocumentCategorieAgentService documentCategorieService ;

    public DocumentCategorieFieldAgentServiceImpl(DocumentCategorieFieldDao dao, DocumentCategorieFieldHistoryDao historyDao) {
        super(dao, historyDao);
    }

}