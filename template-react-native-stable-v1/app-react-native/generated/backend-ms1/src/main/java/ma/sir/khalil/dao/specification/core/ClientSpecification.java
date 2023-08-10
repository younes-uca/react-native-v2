package  ma.sir.khalil.dao.specification.core;

import ma.sir.khalil.zynerator.specification.AbstractSpecification;
import ma.sir.khalil.dao.criteria.core.ClientCriteria;
import ma.sir.khalil.bean.core.Client;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class ClientSpecification extends  AbstractSpecification<ClientCriteria, Client>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("fullName", criteria.getFullName(),criteria.getFullNameLike());
        addPredicate("email", criteria.getEmail(),criteria.getEmailLike());
        addPredicateFk("clientCategory","id", criteria.getClientCategory()==null?null:criteria.getClientCategory().getId());
        addPredicateFk("clientCategory","id", criteria.getClientCategorys());
        addPredicateFk("clientCategory","code", criteria.getClientCategory()==null?null:criteria.getClientCategory().getCode());
    }

    public ClientSpecification(ClientCriteria criteria) {
        super(criteria);
    }

    public ClientSpecification(ClientCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
