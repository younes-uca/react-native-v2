package ma.sir.ged.bean.core;

import java.util.Objects;
import java.util.List;

import java.time.LocalDateTime;


import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;



import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.ged.zynerator.audit.AuditBusinessObject;
import javax.persistence.*;
import java.util.Objects;


import java.math.BigDecimal;


@Entity
@Table(name = "document")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="document_seq",sequenceName="document_seq",allocationSize=1, initialValue = 1)
public class Document   extends AuditBusinessObject     {

    private Long id;

    @Column(length = 500)
    private String reference;
    private LocalDateTime uploadDate ;
    private LocalDateTime dateLastUpdate ;
    @Column(length = 500)
    private String content;
    @Column(columnDefinition = "boolean default false")
    private Boolean folder = false;
    private BigDecimal size = BigDecimal.ZERO;
    @Column(length = 500)
    private String description;
    @Column(columnDefinition = "boolean default false")
    private Boolean archive = false;
    @Column(columnDefinition = "boolean default false")
    private Boolean versionne = false;

    private DocumentType documentType ;
    
    private DocumentState documentState ;
    
    private DocumentCategorie documentCategorie ;
    
    private Utilisateur utilisateur ;
    
    private EntiteAdministrative entiteAdministrative ;
    

    private List<DocumentField> documentFields ;
    private List<DocumentPartageGroupe> documentPartageGroupes ;
    private List<DocumentPartageUtilisateur> documentPartageUtilisateurs ;
    private List<DocumentTag> documentTags ;

    public Document(){
        super();
    }

    public Document(Long id,String reference){
        this.id = id;
        this.reference = reference ;
    }




    @Id
    @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="document_seq")
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getReference(){
        return this.reference;
    }
    public void setReference(String reference){
        this.reference = reference;
    }
    public LocalDateTime getUploadDate(){
        return this.uploadDate;
    }
    public void setUploadDate(LocalDateTime uploadDate){
        this.uploadDate = uploadDate;
    }
    public LocalDateTime getDateLastUpdate(){
        return this.dateLastUpdate;
    }
    public void setDateLastUpdate(LocalDateTime dateLastUpdate){
        this.dateLastUpdate = dateLastUpdate;
    }
    public String getContent(){
        return this.content;
    }
    public void setContent(String content){
        this.content = content;
    }
    public Boolean  getFolder(){
        return this.folder;
    }
    public void setFolder(Boolean folder){
        this.folder = folder;
    }
    public BigDecimal getSize(){
        return this.size;
    }
    public void setSize(BigDecimal size){
        this.size = size;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public DocumentType getDocumentType(){
        return this.documentType;
    }
    public void setDocumentType(DocumentType documentType){
        this.documentType = documentType;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public DocumentState getDocumentState(){
        return this.documentState;
    }
    public void setDocumentState(DocumentState documentState){
        this.documentState = documentState;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public DocumentCategorie getDocumentCategorie(){
        return this.documentCategorie;
    }
    public void setDocumentCategorie(DocumentCategorie documentCategorie){
        this.documentCategorie = documentCategorie;
    }
    @OneToMany(mappedBy = "document")
    public List<DocumentField> getDocumentFields(){
        return this.documentFields;
    }
    public void setDocumentFields(List<DocumentField> documentFields){
        this.documentFields = documentFields;
    }
    public String getDescription(){
        return this.description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public Utilisateur getUtilisateur(){
        return this.utilisateur;
    }
    public void setUtilisateur(Utilisateur utilisateur){
        this.utilisateur = utilisateur;
    }
    public Boolean  getArchive(){
        return this.archive;
    }
    public void setArchive(Boolean archive){
        this.archive = archive;
    }
    public Boolean  getVersionne(){
        return this.versionne;
    }
    public void setVersionne(Boolean versionne){
        this.versionne = versionne;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    public EntiteAdministrative getEntiteAdministrative(){
        return this.entiteAdministrative;
    }
    public void setEntiteAdministrative(EntiteAdministrative entiteAdministrative){
        this.entiteAdministrative = entiteAdministrative;
    }
    @OneToMany(mappedBy = "document")
    public List<DocumentPartageGroupe> getDocumentPartageGroupes(){
        return this.documentPartageGroupes;
    }
    public void setDocumentPartageGroupes(List<DocumentPartageGroupe> documentPartageGroupes){
        this.documentPartageGroupes = documentPartageGroupes;
    }
    @OneToMany(mappedBy = "document")
    public List<DocumentPartageUtilisateur> getDocumentPartageUtilisateurs(){
        return this.documentPartageUtilisateurs;
    }
    public void setDocumentPartageUtilisateurs(List<DocumentPartageUtilisateur> documentPartageUtilisateurs){
        this.documentPartageUtilisateurs = documentPartageUtilisateurs;
    }
    @OneToMany(mappedBy = "document")
    public List<DocumentTag> getDocumentTags(){
        return this.documentTags;
    }
    public void setDocumentTags(List<DocumentTag> documentTags){
        this.documentTags = documentTags;
    }

    @Transient
    public String getLabel() {
        label = reference;
        return label;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Document document = (Document) o;
        return id != null && id.equals(document.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}

