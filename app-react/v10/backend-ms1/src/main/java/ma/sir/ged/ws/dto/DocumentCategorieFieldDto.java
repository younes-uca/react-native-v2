package  ma.sir.ged.ws.dto;

import ma.sir.ged.zynerator.audit.Log;
import ma.sir.ged.zynerator.dto.AuditBaseDto;
import com.fasterxml.jackson.annotation.JsonInclude;



@JsonInclude(JsonInclude.Include.NON_NULL)
public class DocumentCategorieFieldDto  extends AuditBaseDto {


    private FieldDto field ;
    private DocumentCategorieDto documentCategorie ;
    private DocumentCategorieFieldRuleDto documentCategorieFieldRule ;



    public DocumentCategorieFieldDto(){
        super();
    }




    public FieldDto getField(){
        return this.field;
    }

    public void setField(FieldDto field){
        this.field = field;
    }
    public DocumentCategorieDto getDocumentCategorie(){
        return this.documentCategorie;
    }

    public void setDocumentCategorie(DocumentCategorieDto documentCategorie){
        this.documentCategorie = documentCategorie;
    }
    public DocumentCategorieFieldRuleDto getDocumentCategorieFieldRule(){
        return this.documentCategorieFieldRule;
    }

    public void setDocumentCategorieFieldRule(DocumentCategorieFieldRuleDto documentCategorieFieldRule){
        this.documentCategorieFieldRule = documentCategorieFieldRule;
    }




}
