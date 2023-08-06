package ma.sir.ged.bean.history;

import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.ged.zynerator.history.HistBusinessObject;
import javax.persistence.*;


@Entity
@Table(name = "document_field")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="document_field_seq",sequenceName="document_field_seq",allocationSize=1, initialValue = 1)
public class DocumentFieldHistory extends HistBusinessObject  {


    public DocumentFieldHistory() {
    super();
    }

    public DocumentFieldHistory (Long id) {
    super(id);
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="document_field_seq")
    public Long getId() {
    return id;
    }
}

