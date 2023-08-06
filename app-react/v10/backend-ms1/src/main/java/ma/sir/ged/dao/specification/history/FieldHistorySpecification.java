package  ma.sir.ged.dao.specification.history;

import ma.sir.ged.zynerator.specification.AbstractHistorySpecification;
import ma.sir.ged.dao.criteria.history.FieldHistoryCriteria;
import ma.sir.ged.bean.history.FieldHistory;


public class FieldHistorySpecification extends AbstractHistorySpecification<FieldHistoryCriteria, FieldHistory> {

    public FieldHistorySpecification(FieldHistoryCriteria criteria) {
        super(criteria);
    }

    public FieldHistorySpecification(FieldHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
