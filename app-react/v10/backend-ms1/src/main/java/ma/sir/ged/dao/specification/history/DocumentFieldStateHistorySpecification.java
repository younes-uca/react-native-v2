package  ma.sir.ged.dao.specification.history;

import ma.sir.ged.zynerator.specification.AbstractHistorySpecification;
import ma.sir.ged.dao.criteria.history.DocumentFieldStateHistoryCriteria;
import ma.sir.ged.bean.history.DocumentFieldStateHistory;


public class DocumentFieldStateHistorySpecification extends AbstractHistorySpecification<DocumentFieldStateHistoryCriteria, DocumentFieldStateHistory> {

    public DocumentFieldStateHistorySpecification(DocumentFieldStateHistoryCriteria criteria) {
        super(criteria);
    }

    public DocumentFieldStateHistorySpecification(DocumentFieldStateHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
