package  ma.sir.khalil.dao.specification.history;

import ma.sir.khalil.zynerator.specification.AbstractHistorySpecification;
import ma.sir.khalil.dao.criteria.history.PurchaseHistoryCriteria;
import ma.sir.khalil.bean.history.PurchaseHistory;


public class PurchaseHistorySpecification extends AbstractHistorySpecification<PurchaseHistoryCriteria, PurchaseHistory> {

    public PurchaseHistorySpecification(PurchaseHistoryCriteria criteria) {
        super(criteria);
    }

    public PurchaseHistorySpecification(PurchaseHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
