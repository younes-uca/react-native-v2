package  ma.sir.ged.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ma.sir.ged.bean.core.Document;

import ma.sir.ged.zynerator.util.StringUtil;
import ma.sir.ged.zynerator.converter.AbstractConverter;
import ma.sir.ged.zynerator.util.DateUtil;
import ma.sir.ged.bean.history.DocumentFieldHistory;
import ma.sir.ged.bean.core.DocumentField;
import ma.sir.ged.ws.dto.DocumentFieldDto;

@Component
public class DocumentFieldConverter extends AbstractConverter<DocumentField, DocumentFieldDto, DocumentFieldHistory> {

    @Autowired
    private DocumentFieldStateConverter documentFieldStateConverter ;
    @Autowired
    private DocumentConverter documentConverter ;
    @Autowired
    private FieldConverter fieldConverter ;
    private boolean field;
    private boolean document;
    private boolean documentFieldState;

    public  DocumentFieldConverter(){
        super(DocumentField.class, DocumentFieldDto.class, DocumentFieldHistory.class);
    }

    @Override
    public DocumentField toItem(DocumentFieldDto dto) {
        if (dto == null) {
            return null;
        } else {
        DocumentField item = new DocumentField();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getValue()))
                item.setValue(dto.getValue());
            if(this.field && dto.getField()!=null &&  dto.getField().getId() != null)
                item.setField(fieldConverter.toItem(dto.getField())) ;

            if(dto.getDocument() != null && dto.getDocument().getId() != null){
                item.setDocument(new Document());
                item.getDocument().setId(dto.getDocument().getId());
            }

            if(this.documentFieldState && dto.getDocumentFieldState()!=null &&  dto.getDocumentFieldState().getId() != null)
                item.setDocumentFieldState(documentFieldStateConverter.toItem(dto.getDocumentFieldState())) ;



        return item;
        }
    }

    @Override
    public DocumentFieldDto toDto(DocumentField item) {
        if (item == null) {
            return null;
        } else {
            DocumentFieldDto dto = new DocumentFieldDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getValue()))
                dto.setValue(item.getValue());
        if(this.field && item.getField()!=null) {
            dto.setField(fieldConverter.toDto(item.getField())) ;
        }
        if(this.document && item.getDocument()!=null) {
            dto.setDocument(documentConverter.toDto(item.getDocument())) ;
        }
        if(this.documentFieldState && item.getDocumentFieldState()!=null) {
            dto.setDocumentFieldState(documentFieldStateConverter.toDto(item.getDocumentFieldState())) ;
        }


        return dto;
        }
    }


    public void initObject(boolean value) {
        this.field = value;
        this.document = value;
        this.documentFieldState = value;
    }


    public DocumentFieldStateConverter getDocumentFieldStateConverter(){
        return this.documentFieldStateConverter;
    }
    public void setDocumentFieldStateConverter(DocumentFieldStateConverter documentFieldStateConverter ){
        this.documentFieldStateConverter = documentFieldStateConverter;
    }
    public DocumentConverter getDocumentConverter(){
        return this.documentConverter;
    }
    public void setDocumentConverter(DocumentConverter documentConverter ){
        this.documentConverter = documentConverter;
    }
    public FieldConverter getFieldConverter(){
        return this.fieldConverter;
    }
    public void setFieldConverter(FieldConverter fieldConverter ){
        this.fieldConverter = fieldConverter;
    }
    public boolean  isField(){
        return this.field;
    }
    public void  setField(boolean field){
        this.field = field;
    }
    public boolean  isDocument(){
        return this.document;
    }
    public void  setDocument(boolean document){
        this.document = document;
    }
    public boolean  isDocumentFieldState(){
        return this.documentFieldState;
    }
    public void  setDocumentFieldState(boolean documentFieldState){
        this.documentFieldState = documentFieldState;
    }
}
