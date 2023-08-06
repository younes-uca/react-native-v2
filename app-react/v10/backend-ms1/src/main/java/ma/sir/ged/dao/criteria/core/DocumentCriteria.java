package  ma.sir.ged.dao.criteria.core;


import ma.sir.ged.zynerator.criteria.BaseCriteria;
import java.util.List;
import java.time.LocalDateTime;
import java.time.LocalDate;

public class DocumentCriteria extends  BaseCriteria  {

    private String reference;
    private String referenceLike;
    private LocalDateTime uploadDate;
    private LocalDateTime uploadDateFrom;
    private LocalDateTime uploadDateTo;
    private LocalDateTime dateLastUpdate;
    private LocalDateTime dateLastUpdateFrom;
    private LocalDateTime dateLastUpdateTo;
    private String content;
    private String contentLike;
    private Boolean folder;
    private String size;
    private String sizeMin;
    private String sizeMax;
    private String description;
    private String descriptionLike;
    private Boolean archive;
    private Boolean versionne;

    private DocumentTypeCriteria documentType ;
    private List<DocumentTypeCriteria> documentTypes ;
    private DocumentStateCriteria documentState ;
    private List<DocumentStateCriteria> documentStates ;
    private DocumentCategorieCriteria documentCategorie ;
    private List<DocumentCategorieCriteria> documentCategories ;
    private UtilisateurCriteria utilisateur ;
    private List<UtilisateurCriteria> utilisateurs ;
    private EntiteAdministrativeCriteria entiteAdministrative ;
    private List<EntiteAdministrativeCriteria> entiteAdministratives ;


    public DocumentCriteria(){}

    public String getReference(){
        return this.reference;
    }
    public void setReference(String reference){
        this.reference = reference;
    }
    public String getReferenceLike(){
        return this.referenceLike;
    }
    public void setReferenceLike(String referenceLike){
        this.referenceLike = referenceLike;
    }

    public LocalDateTime getUploadDate(){
        return this.uploadDate;
    }
    public void setUploadDate(LocalDateTime uploadDate){
        this.uploadDate = uploadDate;
    }
    public LocalDateTime getUploadDateFrom(){
        return this.uploadDateFrom;
    }
    public void setUploadDateFrom(LocalDateTime uploadDateFrom){
        this.uploadDateFrom = uploadDateFrom;
    }
    public LocalDateTime getUploadDateTo(){
        return this.uploadDateTo;
    }
    public void setUploadDateTo(LocalDateTime uploadDateTo){
        this.uploadDateTo = uploadDateTo;
    }
    public LocalDateTime getDateLastUpdate(){
        return this.dateLastUpdate;
    }
    public void setDateLastUpdate(LocalDateTime dateLastUpdate){
        this.dateLastUpdate = dateLastUpdate;
    }
    public LocalDateTime getDateLastUpdateFrom(){
        return this.dateLastUpdateFrom;
    }
    public void setDateLastUpdateFrom(LocalDateTime dateLastUpdateFrom){
        this.dateLastUpdateFrom = dateLastUpdateFrom;
    }
    public LocalDateTime getDateLastUpdateTo(){
        return this.dateLastUpdateTo;
    }
    public void setDateLastUpdateTo(LocalDateTime dateLastUpdateTo){
        this.dateLastUpdateTo = dateLastUpdateTo;
    }
    public String getContent(){
        return this.content;
    }
    public void setContent(String content){
        this.content = content;
    }
    public String getContentLike(){
        return this.contentLike;
    }
    public void setContentLike(String contentLike){
        this.contentLike = contentLike;
    }

    public Boolean getFolder(){
        return this.folder;
    }
    public void setFolder(Boolean folder){
        this.folder = folder;
    }
    public String getSize(){
        return this.size;
    }
    public void setSize(String size){
        this.size = size;
    }   
    public String getSizeMin(){
        return this.sizeMin;
    }
    public void setSizeMin(String sizeMin){
        this.sizeMin = sizeMin;
    }
    public String getSizeMax(){
        return this.sizeMax;
    }
    public void setSizeMax(String sizeMax){
        this.sizeMax = sizeMax;
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

    public Boolean getArchive(){
        return this.archive;
    }
    public void setArchive(Boolean archive){
        this.archive = archive;
    }
    public Boolean getVersionne(){
        return this.versionne;
    }
    public void setVersionne(Boolean versionne){
        this.versionne = versionne;
    }

    public DocumentTypeCriteria getDocumentType(){
        return this.documentType;
    }

    public void setDocumentType(DocumentTypeCriteria documentType){
        this.documentType = documentType;
    }
    public List<DocumentTypeCriteria> getDocumentTypes(){
        return this.documentTypes;
    }

    public void setDocumentTypes(List<DocumentTypeCriteria> documentTypes){
        this.documentTypes = documentTypes;
    }
    public DocumentStateCriteria getDocumentState(){
        return this.documentState;
    }

    public void setDocumentState(DocumentStateCriteria documentState){
        this.documentState = documentState;
    }
    public List<DocumentStateCriteria> getDocumentStates(){
        return this.documentStates;
    }

    public void setDocumentStates(List<DocumentStateCriteria> documentStates){
        this.documentStates = documentStates;
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
    public EntiteAdministrativeCriteria getEntiteAdministrative(){
        return this.entiteAdministrative;
    }

    public void setEntiteAdministrative(EntiteAdministrativeCriteria entiteAdministrative){
        this.entiteAdministrative = entiteAdministrative;
    }
    public List<EntiteAdministrativeCriteria> getEntiteAdministratives(){
        return this.entiteAdministratives;
    }

    public void setEntiteAdministratives(List<EntiteAdministrativeCriteria> entiteAdministratives){
        this.entiteAdministratives = entiteAdministratives;
    }
}
