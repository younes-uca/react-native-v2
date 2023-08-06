package  ma.sir.ged.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ma.sir.ged.bean.core.DocumentCategorie;

import ma.sir.ged.zynerator.util.StringUtil;
import ma.sir.ged.zynerator.converter.AbstractConverter;
import ma.sir.ged.zynerator.util.DateUtil;
import ma.sir.ged.bean.history.DocumentCategorieFieldHistory;
import ma.sir.ged.bean.core.DocumentCategorieField;
import ma.sir.ged.ws.dto.DocumentCategorieFieldDto;

@Component
public class DocumentCategorieFieldConverter extends AbstractConverter<DocumentCategorieField, DocumentCategorieFieldDto, DocumentCategorieFieldHistory> {

    @Autowired
    private DocumentCategorieFieldRuleConverter documentCategorieFieldRuleConverter ;
    @Autowired
    private FieldConverter fieldConverter ;
    @Autowired
    private DocumentCategorieConverter documentCategorieConverter ;
    private boolean field;
    private boolean documentCategorie;
    private boolean documentCategorieFieldRule;

    public  DocumentCategorieFieldConverter(){
        super(DocumentCategorieField.class, DocumentCategorieFieldDto.class, DocumentCategorieFieldHistory.class);
    }

    @Override
    public DocumentCategorieField toItem(DocumentCategorieFieldDto dto) {
        if (dto == null) {
            return null;
        } else {
        DocumentCategorieField item = new DocumentCategorieField();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(this.field && dto.getField()!=null &&  dto.getField().getId() != null)
                item.setField(fieldConverter.toItem(dto.getField())) ;

            if(dto.getDocumentCategorie() != null && dto.getDocumentCategorie().getId() != null){
                item.setDocumentCategorie(new DocumentCategorie());
                item.getDocumentCategorie().setId(dto.getDocumentCategorie().getId());
            }

            if(this.documentCategorieFieldRule && dto.getDocumentCategorieFieldRule()!=null &&  dto.getDocumentCategorieFieldRule().getId() != null)
                item.setDocumentCategorieFieldRule(documentCategorieFieldRuleConverter.toItem(dto.getDocumentCategorieFieldRule())) ;



        return item;
        }
    }

    @Override
    public DocumentCategorieFieldDto toDto(DocumentCategorieField item) {
        if (item == null) {
            return null;
        } else {
            DocumentCategorieFieldDto dto = new DocumentCategorieFieldDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
        if(this.field && item.getField()!=null) {
            dto.setField(fieldConverter.toDto(item.getField())) ;
        }
        if(this.documentCategorie && item.getDocumentCategorie()!=null) {
            dto.setDocumentCategorie(documentCategorieConverter.toDto(item.getDocumentCategorie())) ;
        }
        if(this.documentCategorieFieldRule && item.getDocumentCategorieFieldRule()!=null) {
            dto.setDocumentCategorieFieldRule(documentCategorieFieldRuleConverter.toDto(item.getDocumentCategorieFieldRule())) ;
        }


        return dto;
        }
    }


    public void initObject(boolean value) {
        this.field = value;
        this.documentCategorie = value;
        this.documentCategorieFieldRule = value;
    }


    public DocumentCategorieFieldRuleConverter getDocumentCategorieFieldRuleConverter(){
        return this.documentCategorieFieldRuleConverter;
    }
    public void setDocumentCategorieFieldRuleConverter(DocumentCategorieFieldRuleConverter documentCategorieFieldRuleConverter ){
        this.documentCategorieFieldRuleConverter = documentCategorieFieldRuleConverter;
    }
    public FieldConverter getFieldConverter(){
        return this.fieldConverter;
    }
    public void setFieldConverter(FieldConverter fieldConverter ){
        this.fieldConverter = fieldConverter;
    }
    public DocumentCategorieConverter getDocumentCategorieConverter(){
        return this.documentCategorieConverter;
    }
    public void setDocumentCategorieConverter(DocumentCategorieConverter documentCategorieConverter ){
        this.documentCategorieConverter = documentCategorieConverter;
    }
    public boolean  isField(){
        return this.field;
    }
    public void  setField(boolean field){
        this.field = field;
    }
    public boolean  isDocumentCategorie(){
        return this.documentCategorie;
    }
    public void  setDocumentCategorie(boolean documentCategorie){
        this.documentCategorie = documentCategorie;
    }
    public boolean  isDocumentCategorieFieldRule(){
        return this.documentCategorieFieldRule;
    }
    public void  setDocumentCategorieFieldRule(boolean documentCategorieFieldRule){
        this.documentCategorieFieldRule = documentCategorieFieldRule;
    }
}
