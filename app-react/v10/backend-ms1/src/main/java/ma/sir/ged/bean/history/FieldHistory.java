package ma.sir.ged.bean.history;

import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.ged.zynerator.history.HistBusinessObject;
import javax.persistence.*;


@Entity
@Table(name = "field")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="field_seq",sequenceName="field_seq",allocationSize=1, initialValue = 1)
public class FieldHistory extends HistBusinessObject  {


    public FieldHistory() {
    super();
    }

    public FieldHistory (Long id) {
    super(id);
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="field_seq")
    public Long getId() {
    return id;
    }
}

