package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.DocumentFieldCriteria;
import ma.sir.ged.bean.core.DocumentField;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class DocumentFieldSpecification extends  AbstractSpecification<DocumentFieldCriteria, DocumentField>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("value", criteria.getValue(),criteria.getValueLike());
        addPredicateFk("field","id", criteria.getField()==null?null:criteria.getField().getId());
        addPredicateFk("field","id", criteria.getFields());
        addPredicateFk("field","code", criteria.getField()==null?null:criteria.getField().getCode());
        addPredicateFk("document","id", criteria.getDocument()==null?null:criteria.getDocument().getId());
        addPredicateFk("document","id", criteria.getDocuments());
        addPredicateFk("document","reference", criteria.getDocument()==null?null:criteria.getDocument().getReference());
        addPredicateFk("documentFieldState","id", criteria.getDocumentFieldState()==null?null:criteria.getDocumentFieldState().getId());
        addPredicateFk("documentFieldState","id", criteria.getDocumentFieldStates());
        addPredicateFk("documentFieldState","code", criteria.getDocumentFieldState()==null?null:criteria.getDocumentFieldState().getCode());
    }

    public DocumentFieldSpecification(DocumentFieldCriteria criteria) {
        super(criteria);
    }

    public DocumentFieldSpecification(DocumentFieldCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
