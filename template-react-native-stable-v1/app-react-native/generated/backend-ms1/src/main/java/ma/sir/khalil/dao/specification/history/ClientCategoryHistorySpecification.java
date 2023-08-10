package  ma.sir.khalil.dao.specification.history;

import ma.sir.khalil.zynerator.specification.AbstractHistorySpecification;
import ma.sir.khalil.dao.criteria.history.ClientCategoryHistoryCriteria;
import ma.sir.khalil.bean.history.ClientCategoryHistory;


public class ClientCategoryHistorySpecification extends AbstractHistorySpecification<ClientCategoryHistoryCriteria, ClientCategoryHistory> {

    public ClientCategoryHistorySpecification(ClientCategoryHistoryCriteria criteria) {
        super(criteria);
    }

    public ClientCategoryHistorySpecification(ClientCategoryHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
