package  ma.sir.ged.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import ma.sir.ged.zynerator.util.StringUtil;
import ma.sir.ged.zynerator.converter.AbstractConverter;
import ma.sir.ged.zynerator.util.DateUtil;
import ma.sir.ged.bean.history.FieldHistory;
import ma.sir.ged.bean.core.Field;
import ma.sir.ged.ws.dto.FieldDto;

@Component
public class FieldConverter extends AbstractConverter<Field, FieldDto, FieldHistory> {


    public  FieldConverter(){
        super(Field.class, FieldDto.class, FieldHistory.class);
    }

    @Override
    public Field toItem(FieldDto dto) {
        if (dto == null) {
            return null;
        } else {
        Field item = new Field();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getCode()))
                item.setCode(dto.getCode());
            if(StringUtil.isNotEmpty(dto.getLibelle()))
                item.setLibelle(dto.getLibelle());


        return item;
        }
    }

    @Override
    public FieldDto toDto(Field item) {
        if (item == null) {
            return null;
        } else {
            FieldDto dto = new FieldDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getCode()))
                dto.setCode(item.getCode());
            if(StringUtil.isNotEmpty(item.getLibelle()))
                dto.setLibelle(item.getLibelle());


        return dto;
        }
    }


    public void initObject(boolean value) {
    }


}
