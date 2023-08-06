package  ma.sir.ged.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import ma.sir.ged.zynerator.util.StringUtil;
import ma.sir.ged.zynerator.converter.AbstractConverter;
import ma.sir.ged.zynerator.util.DateUtil;
import ma.sir.ged.bean.history.DocumentFieldStateHistory;
import ma.sir.ged.bean.core.DocumentFieldState;
import ma.sir.ged.ws.dto.DocumentFieldStateDto;

@Component
public class DocumentFieldStateConverter extends AbstractConverter<DocumentFieldState, DocumentFieldStateDto, DocumentFieldStateHistory> {


    public  DocumentFieldStateConverter(){
        super(DocumentFieldState.class, DocumentFieldStateDto.class, DocumentFieldStateHistory.class);
    }

    @Override
    public DocumentFieldState toItem(DocumentFieldStateDto dto) {
        if (dto == null) {
            return null;
        } else {
        DocumentFieldState item = new DocumentFieldState();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getCode()))
                item.setCode(dto.getCode());
            if(StringUtil.isNotEmpty(dto.getLibelle()))
                item.setLibelle(dto.getLibelle());
            if(StringUtil.isNotEmpty(dto.getStyle()))
                item.setStyle(dto.getStyle());


        return item;
        }
    }

    @Override
    public DocumentFieldStateDto toDto(DocumentFieldState item) {
        if (item == null) {
            return null;
        } else {
            DocumentFieldStateDto dto = new DocumentFieldStateDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getCode()))
                dto.setCode(item.getCode());
            if(StringUtil.isNotEmpty(item.getLibelle()))
                dto.setLibelle(item.getLibelle());
            if(StringUtil.isNotEmpty(item.getStyle()))
                dto.setStyle(item.getStyle());


        return dto;
        }
    }


    public void initObject(boolean value) {
    }


}
