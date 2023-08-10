package  ma.sir.khalil.ws.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import ma.sir.khalil.zynerator.util.StringUtil;
import ma.sir.khalil.zynerator.converter.AbstractConverter;
import ma.sir.khalil.zynerator.util.DateUtil;
import ma.sir.khalil.bean.history.ProductHistory;
import ma.sir.khalil.bean.core.Product;
import ma.sir.khalil.ws.dto.ProductDto;

@Component
public class ProductConverter extends AbstractConverter<Product, ProductDto, ProductHistory> {


    public  ProductConverter(){
        super(Product.class, ProductDto.class, ProductHistory.class);
    }

    @Override
    public Product toItem(ProductDto dto) {
        if (dto == null) {
            return null;
        } else {
        Product item = new Product();
            if(StringUtil.isNotEmpty(dto.getId()))
                item.setId(dto.getId());
            if(StringUtil.isNotEmpty(dto.getCode()))
                item.setCode(dto.getCode());
            if(StringUtil.isNotEmpty(dto.getReference()))
                item.setReference(dto.getReference());


        return item;
        }
    }

    @Override
    public ProductDto toDto(Product item) {
        if (item == null) {
            return null;
        } else {
            ProductDto dto = new ProductDto();
            if(StringUtil.isNotEmpty(item.getId()))
                dto.setId(item.getId());
            if(StringUtil.isNotEmpty(item.getCode()))
                dto.setCode(item.getCode());
            if(StringUtil.isNotEmpty(item.getReference()))
                dto.setReference(item.getReference());


        return dto;
        }
    }


    public void initObject(boolean value) {
    }


}
