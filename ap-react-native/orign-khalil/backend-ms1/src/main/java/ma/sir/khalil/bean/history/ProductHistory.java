package ma.sir.khalil.bean.history;

import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.khalil.zynerator.history.HistBusinessObject;
import javax.persistence.*;


@Entity
@Table(name = "product")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="product_seq",sequenceName="product_seq",allocationSize=1, initialValue = 1)
public class ProductHistory extends HistBusinessObject  {


    public ProductHistory() {
    super();
    }

    public ProductHistory (Long id) {
    super(id);
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="product_seq")
    public Long getId() {
    return id;
    }
}

