package  ma.sir.khalil.dao.specification.history;

import ma.sir.khalil.zynerator.specification.AbstractHistorySpecification;
import ma.sir.khalil.dao.criteria.history.ProductHistoryCriteria;
import ma.sir.khalil.bean.history.ProductHistory;


public class ProductHistorySpecification extends AbstractHistorySpecification<ProductHistoryCriteria, ProductHistory> {

    public ProductHistorySpecification(ProductHistoryCriteria criteria) {
        super(criteria);
    }

    public ProductHistorySpecification(ProductHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
