package  ma.sir.khalil.dao.specification.history;

import ma.sir.khalil.zynerator.specification.AbstractHistorySpecification;
import ma.sir.khalil.dao.criteria.history.ClientHistoryCriteria;
import ma.sir.khalil.bean.history.ClientHistory;


public class ClientHistorySpecification extends AbstractHistorySpecification<ClientHistoryCriteria, ClientHistory> {

    public ClientHistorySpecification(ClientHistoryCriteria criteria) {
        super(criteria);
    }

    public ClientHistorySpecification(ClientHistoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
