package  ma.sir.khalil.dao.specification.history;

import ma.sir.khalil.zynerator.specification.AbstractHistorySpecification;
import ma.sir.khalil.dao.criteria.history.PurchaseItemHistoryCriteria;
import ma.sir.khalil.bean.history.PurchaseItemHistory;


public class PurchaseItemHistorySpecification extends AbstractHistorySpecification<PurchaseItemHistoryCriteria, PurchaseItemHistory> {

    public PurchaseItemHistorySpecification(PurchaseItemHistoryCriteria criteria) {
        super(criteria);
    }

    public PurchaseItemHistorySpecification(PurchaseItemHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
