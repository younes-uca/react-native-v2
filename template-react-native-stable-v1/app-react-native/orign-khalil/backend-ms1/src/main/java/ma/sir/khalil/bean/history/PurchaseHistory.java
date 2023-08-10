package ma.sir.khalil.bean.history;

import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.khalil.zynerator.history.HistBusinessObject;
import javax.persistence.*;


@Entity
@Table(name = "purchase")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="purchase_seq",sequenceName="purchase_seq",allocationSize=1, initialValue = 1)
public class PurchaseHistory extends HistBusinessObject  {


    public PurchaseHistory() {
    super();
    }

    public PurchaseHistory (Long id) {
    super(id);
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="purchase_seq")
    public Long getId() {
    return id;
    }
}

