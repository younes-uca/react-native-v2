package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.DocumentCategorieFieldCriteria;
import ma.sir.ged.bean.core.DocumentCategorieField;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class DocumentCategorieFieldSpecification extends  AbstractSpecification<DocumentCategorieFieldCriteria, DocumentCategorieField>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicateFk("field","id", criteria.getField()==null?null:criteria.getField().getId());
        addPredicateFk("field","id", criteria.getFields());
        addPredicateFk("field","code", criteria.getField()==null?null:criteria.getField().getCode());
        addPredicateFk("documentCategorie","id", criteria.getDocumentCategorie()==null?null:criteria.getDocumentCategorie().getId());
        addPredicateFk("documentCategorie","id", criteria.getDocumentCategories());
        addPredicateFk("documentCategorie","code", criteria.getDocumentCategorie()==null?null:criteria.getDocumentCategorie().getCode());
        addPredicateFk("documentCategorieFieldRule","id", criteria.getDocumentCategorieFieldRule()==null?null:criteria.getDocumentCategorieFieldRule().getId());
        addPredicateFk("documentCategorieFieldRule","id", criteria.getDocumentCategorieFieldRules());
        addPredicateFk("documentCategorieFieldRule","code", criteria.getDocumentCategorieFieldRule()==null?null:criteria.getDocumentCategorieFieldRule().getCode());
    }

    public DocumentCategorieFieldSpecification(DocumentCategorieFieldCriteria criteria) {
        super(criteria);
    }

    public DocumentCategorieFieldSpecification(DocumentCategorieFieldCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
