package ma.sir.ged.service.impl.agent;

import ma.sir.ged.bean.core.DocumentCategorieFieldRule;
import ma.sir.ged.bean.history.DocumentCategorieFieldRuleHistory;
import ma.sir.ged.dao.criteria.core.DocumentCategorieFieldRuleCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieFieldRuleHistoryCriteria;
import ma.sir.ged.dao.facade.core.DocumentCategorieFieldRuleDao;
import ma.sir.ged.dao.facade.history.DocumentCategorieFieldRuleHistoryDao;
import ma.sir.ged.dao.specification.core.DocumentCategorieFieldRuleSpecification;
import ma.sir.ged.service.facade.agent.DocumentCategorieFieldRuleAgentService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;







import java.util.List;
@Service
public class DocumentCategorieFieldRuleAgentServiceImpl extends AbstractServiceImpl<DocumentCategorieFieldRule,DocumentCategorieFieldRuleHistory, DocumentCategorieFieldRuleCriteria, DocumentCategorieFieldRuleHistoryCriteria, DocumentCategorieFieldRuleDao,
DocumentCategorieFieldRuleHistoryDao> implements DocumentCategorieFieldRuleAgentService {



    public DocumentCategorieFieldRule findByReferenceEntity(DocumentCategorieFieldRule t){
        return  dao.findByCode(t.getCode());
    }





    public void configure() {
        super.configure(DocumentCategorieFieldRule.class,DocumentCategorieFieldRuleHistory.class, DocumentCategorieFieldRuleHistoryCriteria.class, DocumentCategorieFieldRuleSpecification.class);
    }


    public DocumentCategorieFieldRuleAgentServiceImpl(DocumentCategorieFieldRuleDao dao, DocumentCategorieFieldRuleHistoryDao historyDao) {
        super(dao, historyDao);
    }

}