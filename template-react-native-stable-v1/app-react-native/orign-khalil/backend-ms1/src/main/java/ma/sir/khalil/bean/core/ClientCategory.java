package ma.sir.khalil.bean.core;

import java.util.Objects;






import com.fasterxml.jackson.annotation.JsonInclude;
import ma.sir.khalil.zynerator.audit.AuditBusinessObject;
import javax.persistence.*;
import java.util.Objects;




@Entity
@Table(name = "client_category")
@JsonInclude(JsonInclude.Include.NON_NULL)
@SequenceGenerator(name="client_category_seq",sequenceName="client_category_seq",allocationSize=1, initialValue = 1)
public class ClientCategory   extends AuditBusinessObject     {

    private Long id;

    @Column(length = 500)
    private String reference;
    @Column(length = 500)
    private String code;



    public ClientCategory(){
        super();
    }

    public ClientCategory(Long id,String reference){
        this.id = id;
        this.reference = reference ;
    }




    @Id
    @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="client_category_seq")
    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getReference(){
        return this.reference;
    }
    public void setReference(String reference){
        this.reference = reference;
    }
    public String getCode(){
        return this.code;
    }
    public void setCode(String code){
        this.code = code;
    }

    @Transient
    public String getLabel() {
        label = reference;
        return label;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientCategory clientCategory = (ClientCategory) o;
        return id != null && id.equals(clientCategory.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}

