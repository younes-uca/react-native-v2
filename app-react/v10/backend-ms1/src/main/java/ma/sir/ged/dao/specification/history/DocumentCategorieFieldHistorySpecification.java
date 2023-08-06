package  ma.sir.ged.dao.specification.history;

import ma.sir.ged.zynerator.specification.AbstractHistorySpecification;
import ma.sir.ged.dao.criteria.history.DocumentCategorieFieldHistoryCriteria;
import ma.sir.ged.bean.history.DocumentCategorieFieldHistory;


public class DocumentCategorieFieldHistorySpecification extends AbstractHistorySpecification<DocumentCategorieFieldHistoryCriteria, DocumentCategorieFieldHistory> {

    public DocumentCategorieFieldHistorySpecification(DocumentCategorieFieldHistoryCriteria criteria) {
        super(criteria);
    }

    public DocumentCategorieFieldHistorySpecification(DocumentCategorieFieldHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
