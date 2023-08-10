package  ma.sir.khalil.dao.specification.core;

import ma.sir.khalil.zynerator.specification.AbstractSpecification;
import ma.sir.khalil.dao.criteria.core.ClientCategoryCriteria;
import ma.sir.khalil.bean.core.ClientCategory;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class ClientCategorySpecification extends  AbstractSpecification<ClientCategoryCriteria, ClientCategory>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("reference", criteria.getReference(),criteria.getReferenceLike());
        addPredicate("code", criteria.getCode(),criteria.getCodeLike());
    }

    public ClientCategorySpecification(ClientCategoryCriteria criteria) {
        super(criteria);
    }

    public ClientCategorySpecification(ClientCategoryCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
