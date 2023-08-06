package ma.sir.ged.bean.core;

import java.util.Objects;






import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.ged.zynerator.audit.AuditBusinessObject;
import javax.persistence.*;
import java.util.Objects;




@Entity
@Table(name = "document_categorie_field")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="document_categorie_field_seq",sequenceName="document_categorie_field_seq",allocationSize=1, initialValue = 1)
public class DocumentCategorieField   extends AuditBusinessObject     {

    private Long id;


    private Field field ;
    
    private DocumentCategorie documentCategorie ;
    
    private DocumentCategorieFieldRule documentCategorieFieldRule ;
    


    public DocumentCategorieField(){
        super();
    }





    @Id
    @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="document_categorie_field_seq")
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public Field getField(){
        return this.field;
    }
    public void setField(Field field){
        this.field = field;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public DocumentCategorie getDocumentCategorie(){
        return this.documentCategorie;
    }
    public void setDocumentCategorie(DocumentCategorie documentCategorie){
        this.documentCategorie = documentCategorie;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public DocumentCategorieFieldRule getDocumentCategorieFieldRule(){
        return this.documentCategorieFieldRule;
    }
    public void setDocumentCategorieFieldRule(DocumentCategorieFieldRule documentCategorieFieldRule){
        this.documentCategorieFieldRule = documentCategorieFieldRule;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentCategorieField documentCategorieField = (DocumentCategorieField) o;
        return id != null && id.equals(documentCategorieField.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}

