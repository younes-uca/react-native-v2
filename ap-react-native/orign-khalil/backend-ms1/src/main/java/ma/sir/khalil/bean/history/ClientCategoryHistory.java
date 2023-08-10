package ma.sir.khalil.bean.history;

import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.khalil.zynerator.history.HistBusinessObject;
import javax.persistence.*;


@Entity
@Table(name = "client_category")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="client_category_seq",sequenceName="client_category_seq",allocationSize=1, initialValue = 1)
public class ClientCategoryHistory extends HistBusinessObject  {


    public ClientCategoryHistory() {
    super();
    }

    public ClientCategoryHistory (Long id) {
    super(id);
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="client_category_seq")
    public Long getId() {
    return id;
    }
}

