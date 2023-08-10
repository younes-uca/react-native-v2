package ma.sir.khalil.zynerator.dto;

import ma.sir.khalil.zynerator.audit.Log;
import ma.sir.khalil.zynerator.dto.AuditBaseDto;
import com.fasterxml.jackson.annotation.JsonInclude;



@JsonInclude(JsonInclude.Include.NON_NULL)
public class EtablissementDto  extends AuditBaseDto {

    private String libelle  ;
    private String code  ;

    public EtablissementDto(){
        super();
    }

    @Log
    public String getLibelle(){
        return this.libelle;
    }
    public void setLibelle(String libelle){
        this.libelle = libelle;
    }

    @Log
    public String getCode(){
        return this.code;
    }
    public void setCode(String code){
        this.code = code;
    }

}
