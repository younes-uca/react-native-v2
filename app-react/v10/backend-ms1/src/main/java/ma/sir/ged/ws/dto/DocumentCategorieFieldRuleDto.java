package  ma.sir.ged.ws.dto;

import ma.sir.ged.zynerator.audit.Log;
import ma.sir.ged.zynerator.dto.AuditBaseDto;
import com.fasterxml.jackson.annotation.JsonInclude;



@JsonInclude(JsonInclude.Include.NON_NULL)
public class DocumentCategorieFieldRuleDto  extends AuditBaseDto {

    private String code  ;
    private String libelle  ;
    private String expresion  ;




    public DocumentCategorieFieldRuleDto(){
        super();
    }



    @Log
    public String getCode(){
        return this.code;
    }
    public void setCode(String code){
        this.code = code;
    }

    @Log
    public String getLibelle(){
        return this.libelle;
    }
    public void setLibelle(String libelle){
        this.libelle = libelle;
    }

    @Log
    public String getExpresion(){
        return this.expresion;
    }
    public void setExpresion(String expresion){
        this.expresion = expresion;
    }






}
