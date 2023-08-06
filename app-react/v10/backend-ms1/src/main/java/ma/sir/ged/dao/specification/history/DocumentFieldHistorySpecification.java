package  ma.sir.ged.dao.specification.history;

import ma.sir.ged.zynerator.specification.AbstractHistorySpecification;
import ma.sir.ged.dao.criteria.history.DocumentFieldHistoryCriteria;
import ma.sir.ged.bean.history.DocumentFieldHistory;


public class DocumentFieldHistorySpecification extends AbstractHistorySpecification<DocumentFieldHistoryCriteria, DocumentFieldHistory> {

    public DocumentFieldHistorySpecification(DocumentFieldHistoryCriteria criteria) {
        super(criteria);
    }

    public DocumentFieldHistorySpecification(DocumentFieldHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
