package  ma.sir.ged.dao.criteria.core;


import ma.sir.ged.zynerator.criteria.BaseCriteria;
import java.util.List;

public class DocumentCategorieFieldCriteria extends  BaseCriteria  {


    private FieldCriteria field ;
    private List<FieldCriteria> fields ;
    private DocumentCategorieCriteria documentCategorie ;
    private List<DocumentCategorieCriteria> documentCategories ;
    private DocumentCategorieFieldRuleCriteria documentCategorieFieldRule ;
    private List<DocumentCategorieFieldRuleCriteria> documentCategorieFieldRules ;


    public DocumentCategorieFieldCriteria(){}


    public FieldCriteria getField(){
        return this.field;
    }

    public void setField(FieldCriteria field){
        this.field = field;
    }
    public List<FieldCriteria> getFields(){
        return this.fields;
    }

    public void setFields(List<FieldCriteria> fields){
        this.fields = fields;
    }
    public DocumentCategorieCriteria getDocumentCategorie(){
        return this.documentCategorie;
    }

    public void setDocumentCategorie(DocumentCategorieCriteria documentCategorie){
        this.documentCategorie = documentCategorie;
    }
    public List<DocumentCategorieCriteria> getDocumentCategories(){
        return this.documentCategories;
    }

    public void setDocumentCategories(List<DocumentCategorieCriteria> documentCategories){
        this.documentCategories = documentCategories;
    }
    public DocumentCategorieFieldRuleCriteria getDocumentCategorieFieldRule(){
        return this.documentCategorieFieldRule;
    }

    public void setDocumentCategorieFieldRule(DocumentCategorieFieldRuleCriteria documentCategorieFieldRule){
        this.documentCategorieFieldRule = documentCategorieFieldRule;
    }
    public List<DocumentCategorieFieldRuleCriteria> getDocumentCategorieFieldRules(){
        return this.documentCategorieFieldRules;
    }

    public void setDocumentCategorieFieldRules(List<DocumentCategorieFieldRuleCriteria> documentCategorieFieldRules){
        this.documentCategorieFieldRules = documentCategorieFieldRules;
    }
}
