package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.FieldCriteria;
import ma.sir.ged.bean.core.Field;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class FieldSpecification extends  AbstractSpecification<FieldCriteria, Field>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("code", criteria.getCode(),criteria.getCodeLike());
        addPredicate("libelle", criteria.getLibelle(),criteria.getLibelleLike());
    }

    public FieldSpecification(FieldCriteria criteria) {
        super(criteria);
    }

    public FieldSpecification(FieldCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
