package  ma.sir.ged.dao.criteria.core;


import ma.sir.ged.zynerator.criteria.BaseCriteria;
import java.util.List;

public class DocumentCategorieFieldRuleCriteria extends  BaseCriteria  {

    private String code;
    private String codeLike;
    private String libelle;
    private String libelleLike;
    private String expresion;
    private String expresionLike;



    public DocumentCategorieFieldRuleCriteria(){}

    public String getCode(){
        return this.code;
    }
    public void setCode(String code){
        this.code = code;
    }
    public String getCodeLike(){
        return this.codeLike;
    }
    public void setCodeLike(String codeLike){
        this.codeLike = codeLike;
    }

    public String getLibelle(){
        return this.libelle;
    }
    public void setLibelle(String libelle){
        this.libelle = libelle;
    }
    public String getLibelleLike(){
        return this.libelleLike;
    }
    public void setLibelleLike(String libelleLike){
        this.libelleLike = libelleLike;
    }

    public String getExpresion(){
        return this.expresion;
    }
    public void setExpresion(String expresion){
        this.expresion = expresion;
    }
    public String getExpresionLike(){
        return this.expresionLike;
    }
    public void setExpresionLike(String expresionLike){
        this.expresionLike = expresionLike;
    }


}
