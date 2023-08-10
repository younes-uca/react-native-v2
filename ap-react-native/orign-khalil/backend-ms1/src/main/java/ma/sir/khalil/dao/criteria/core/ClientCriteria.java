package  ma.sir.khalil.dao.criteria.core;


import ma.sir.khalil.zynerator.criteria.BaseCriteria;
import java.util.List;

public class ClientCriteria extends  BaseCriteria  {

    private String fullName;
    private String fullNameLike;
    private String email;
    private String emailLike;

    private ClientCategoryCriteria clientCategory ;
    private List<ClientCategoryCriteria> clientCategorys ;


    public ClientCriteria(){}

    public String getFullName(){
        return this.fullName;
    }
    public void setFullName(String fullName){
        this.fullName = fullName;
    }
    public String getFullNameLike(){
        return this.fullNameLike;
    }
    public void setFullNameLike(String fullNameLike){
        this.fullNameLike = fullNameLike;
    }

    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getEmailLike(){
        return this.emailLike;
    }
    public void setEmailLike(String emailLike){
        this.emailLike = emailLike;
    }


    public ClientCategoryCriteria getClientCategory(){
        return this.clientCategory;
    }

    public void setClientCategory(ClientCategoryCriteria clientCategory){
        this.clientCategory = clientCategory;
    }
    public List<ClientCategoryCriteria> getClientCategorys(){
        return this.clientCategorys;
    }

    public void setClientCategorys(List<ClientCategoryCriteria> clientCategorys){
        this.clientCategorys = clientCategorys;
    }
}
