package ma.sir.khalil.dao.facade.core;

import org.springframework.data.jpa.repository.Query;
import ma.sir.khalil.zynerator.repository.AbstractRepository;
import ma.sir.khalil.bean.core.Product;
import org.springframework.stereotype.Repository;
import ma.sir.khalil.bean.core.Product;
import java.util.List;


@Repository
public interface ProductDao extends AbstractRepository<Product,Long>  {
    Product findByCode(String code);
    int deleteByCode(String code);


    @Query("SELECT NEW Product(item.id,item.reference) FROM Product item")
    List<Product> findAllOptimized();
}
