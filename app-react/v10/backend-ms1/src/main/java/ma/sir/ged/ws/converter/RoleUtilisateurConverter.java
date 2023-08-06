package  ma.sir.ged.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import ma.sir.ged.zynerator.util.StringUtil;
import ma.sir.ged.zynerator.converter.AbstractConverter;
import ma.sir.ged.zynerator.util.DateUtil;
import ma.sir.ged.bean.history.RoleUtilisateurHistory;
import ma.sir.ged.bean.core.RoleUtilisateur;
import ma.sir.ged.ws.dto.RoleUtilisateurDto;

@Component
public class RoleUtilisateurConverter extends AbstractConverter<RoleUtilisateur, RoleUtilisateurDto, RoleUtilisateurHistory> {


    public  RoleUtilisateurConverter(){
        super(RoleUtilisateur.class, RoleUtilisateurDto.class, RoleUtilisateurHistory.class);
    }

    @Override
    public RoleUtilisateur toItem(RoleUtilisateurDto dto) {
        if (dto == null) {
            return null;
        } else {
        RoleUtilisateur item = new RoleUtilisateur();
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
    public RoleUtilisateurDto toDto(RoleUtilisateur item) {
        if (item == null) {
            return null;
        } else {
            RoleUtilisateurDto dto = new RoleUtilisateurDto();
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
