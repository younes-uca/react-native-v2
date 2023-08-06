package ma.sir.ged.bean.core;

import java.util.Objects;

import java.time.LocalDateTime;


import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;



import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.ged.zynerator.audit.AuditBusinessObject;
import javax.persistence.*;
import java.util.Objects;




@Entity
@Table(name = "document_partage_groupe")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="document_partage_groupe_seq",sequenceName="document_partage_groupe_seq",allocationSize=1, initialValue = 1)
public class DocumentPartageGroupe   extends AuditBusinessObject     {

    private Long id;

    private LocalDateTime dateShare ;

    private Document document ;
    
    private Groupe groupe ;
    
    private AccessShare accessShare ;
    


    public DocumentPartageGroupe(){
        super();
    }





    @Id
    @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="document_partage_groupe_seq")
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public Document getDocument(){
        return this.document;
    }
    public void setDocument(Document document){
        this.document = document;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public Groupe getGroupe(){
        return this.groupe;
    }
    public void setGroupe(Groupe groupe){
        this.groupe = groupe;
    }
    public LocalDateTime getDateShare(){
        return this.dateShare;
    }
    public void setDateShare(LocalDateTime dateShare){
        this.dateShare = dateShare;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public AccessShare getAccessShare(){
        return this.accessShare;
    }
    public void setAccessShare(AccessShare accessShare){
        this.accessShare = accessShare;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentPartageGroupe documentPartageGroupe = (DocumentPartageGroupe) o;
        return id != null && id.equals(documentPartageGroupe.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}

