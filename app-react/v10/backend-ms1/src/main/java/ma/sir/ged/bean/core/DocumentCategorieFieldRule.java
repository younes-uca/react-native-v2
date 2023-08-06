package ma.sir.ged.bean.core;

import java.util.Objects;






import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.ged.zynerator.audit.AuditBusinessObject;
import javax.persistence.*;
import java.util.Objects;




@Entity
@Table(name = "document_categorie_field_rule")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="document_categorie_field_rule_seq",sequenceName="document_categorie_field_rule_seq",allocationSize=1, initialValue = 1)
public class DocumentCategorieFieldRule   extends AuditBusinessObject     {

    private Long id;

    @Column(length = 500)
    private String code;
    @Column(length = 500)
    private String libelle;
    @Column(length = 500)
    private String expresion;



    public DocumentCategorieFieldRule(){
        super();
    }

    public DocumentCategorieFieldRule(Long id,String libelle){
        this.id = id;
        this.libelle = libelle ;
    }




    @Id
    @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="document_categorie_field_rule_seq")
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getCode(){
        return this.code;
    }
    public void setCode(String code){
        this.code = code;
    }
    public String getLibelle(){
        return this.libelle;
    }
    public void setLibelle(String libelle){
        this.libelle = libelle;
    }
    public String getExpresion(){
        return this.expresion;
    }
    public void setExpresion(String expresion){
        this.expresion = expresion;
    }

    @Transient
    public String getLabel() {
        label = libelle;
        return label;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentCategorieFieldRule documentCategorieFieldRule = (DocumentCategorieFieldRule) o;
        return id != null && id.equals(documentCategorieFieldRule.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}

