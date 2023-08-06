package  ma.sir.ged.dao.specification.history;

import ma.sir.ged.zynerator.specification.AbstractHistorySpecification;
import ma.sir.ged.dao.criteria.history.DocumentCategorieFieldRuleHistoryCriteria;
import ma.sir.ged.bean.history.DocumentCategorieFieldRuleHistory;


public class DocumentCategorieFieldRuleHistorySpecification extends AbstractHistorySpecification<DocumentCategorieFieldRuleHistoryCriteria, DocumentCategorieFieldRuleHistory> {

    public DocumentCategorieFieldRuleHistorySpecification(DocumentCategorieFieldRuleHistoryCriteria criteria) {
        super(criteria);
    }

    public DocumentCategorieFieldRuleHistorySpecification(DocumentCategorieFieldRuleHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
