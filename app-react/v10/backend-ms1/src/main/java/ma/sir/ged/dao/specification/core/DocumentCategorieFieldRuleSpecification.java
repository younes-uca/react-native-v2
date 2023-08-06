package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.DocumentCategorieFieldRuleCriteria;
import ma.sir.ged.bean.core.DocumentCategorieFieldRule;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class DocumentCategorieFieldRuleSpecification extends  AbstractSpecification<DocumentCategorieFieldRuleCriteria, DocumentCategorieFieldRule>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("code", criteria.getCode(),criteria.getCodeLike());
        addPredicate("libelle", criteria.getLibelle(),criteria.getLibelleLike());
        addPredicate("expresion", criteria.getExpresion(),criteria.getExpresionLike());
    }

    public DocumentCategorieFieldRuleSpecification(DocumentCategorieFieldRuleCriteria criteria) {
        super(criteria);
    }

    public DocumentCategorieFieldRuleSpecification(DocumentCategorieFieldRuleCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
