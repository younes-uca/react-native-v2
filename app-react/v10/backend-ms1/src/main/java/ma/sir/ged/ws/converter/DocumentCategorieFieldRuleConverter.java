package  ma.sir.ged.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import ma.sir.ged.zynerator.util.StringUtil;
import ma.sir.ged.zynerator.converter.AbstractConverter;
import ma.sir.ged.zynerator.util.DateUtil;
import ma.sir.ged.bean.history.DocumentCategorieFieldRuleHistory;
import ma.sir.ged.bean.core.DocumentCategorieFieldRule;
import ma.sir.ged.ws.dto.DocumentCategorieFieldRuleDto;

@Component
public class DocumentCategorieFieldRuleConverter extends AbstractConverter<DocumentCategorieFieldRule, DocumentCategorieFieldRuleDto, DocumentCategorieFieldRuleHistory> {


    public  DocumentCategorieFieldRuleConverter(){
        super(DocumentCategorieFieldRule.class, DocumentCategorieFieldRuleDto.class, DocumentCategorieFieldRuleHistory.class);
    }

    @Override
    public DocumentCategorieFieldRule toItem(DocumentCategorieFieldRuleDto dto) {
        if (dto == null) {
            return null;
        } else {
        DocumentCategorieFieldRule item = new DocumentCategorieFieldRule();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getCode()))
                item.setCode(dto.getCode());
            if(StringUtil.isNotEmpty(dto.getLibelle()))
                item.setLibelle(dto.getLibelle());
            if(StringUtil.isNotEmpty(dto.getExpresion()))
                item.setExpresion(dto.getExpresion());


        return item;
        }
    }

    @Override
    public DocumentCategorieFieldRuleDto toDto(DocumentCategorieFieldRule item) {
        if (item == null) {
            return null;
        } else {
            DocumentCategorieFieldRuleDto dto = new DocumentCategorieFieldRuleDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getCode()))
                dto.setCode(item.getCode());
            if(StringUtil.isNotEmpty(item.getLibelle()))
                dto.setLibelle(item.getLibelle());
            if(StringUtil.isNotEmpty(item.getExpresion()))
                dto.setExpresion(item.getExpresion());


        return dto;
        }
    }


    public void initObject(boolean value) {
    }


}
