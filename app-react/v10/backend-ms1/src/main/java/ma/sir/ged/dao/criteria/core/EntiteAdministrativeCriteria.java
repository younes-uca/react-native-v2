package  ma.sir.ged.dao.criteria.core;


import ma.sir.ged.zynerator.criteria.BaseCriteria;
import java.util.List;

public class EntiteAdministrativeCriteria extends  BaseCriteria  {

    private String code;
    private String codeLike;
    private String description;
    private String descriptionLike;
    private String libelle;
    private String libelleLike;

    private UtilisateurCriteria utilisateur ;
    private List<UtilisateurCriteria> utilisateurs ;
    private EntiteAdministrativeTypeCriteria entiteAdministrativeType ;
    private List<EntiteAdministrativeTypeCriteria> entiteAdministrativeTypes ;


    public EntiteAdministrativeCriteria(){}

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

    public String getDescription(){
        return this.description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getDescriptionLike(){
        return this.descriptionLike;
    }
    public void setDescriptionLike(String descriptionLike){
        this.descriptionLike = descriptionLike;
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


    public UtilisateurCriteria getUtilisateur(){
        return this.utilisateur;
    }

    public void setUtilisateur(UtilisateurCriteria utilisateur){
        this.utilisateur = utilisateur;
    }
    public List<UtilisateurCriteria> getUtilisateurs(){
        return this.utilisateurs;
    }

    public void setUtilisateurs(List<UtilisateurCriteria> utilisateurs){
        this.utilisateurs = utilisateurs;
    }
    public EntiteAdministrativeTypeCriteria getEntiteAdministrativeType(){
        return this.entiteAdministrativeType;
    }

    public void setEntiteAdministrativeType(EntiteAdministrativeTypeCriteria entiteAdministrativeType){
        this.entiteAdministrativeType = entiteAdministrativeType;
    }
    public List<EntiteAdministrativeTypeCriteria> getEntiteAdministrativeTypes(){
        return this.entiteAdministrativeTypes;
    }

    public void setEntiteAdministrativeTypes(List<EntiteAdministrativeTypeCriteria> entiteAdministrativeTypes){
        this.entiteAdministrativeTypes = entiteAdministrativeTypes;
    }
}
