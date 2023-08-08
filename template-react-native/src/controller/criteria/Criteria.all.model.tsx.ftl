import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

<#list pojo.types as type>
  <#if pojo.name != type.simpleName>
import {${type.simpleName}Criteria} from './${type.simpleName}Criteria.model';
    </#if>
</#list>




export class ${pojo.name}Criteria  extends  BaseCriteria {

    <#if pojo.id??>
    public ${pojo.id.name?uncap_first}: number;
   </#if>

   <#list pojo.fieldsSimple as fieldSimple>
   <#if fieldSimple.id == false>
   <#if fieldSimple.pureString>
    public ${fieldSimple.name?uncap_first}: string;
    public ${fieldSimple.name?uncap_first}Like: string;
   </#if>
    <#if fieldSimple.nombre>
     public ${fieldSimple.name?uncap_first}: null | number;
     public ${fieldSimple.name?uncap_first}Min: null | number;
     public ${fieldSimple.name?uncap_first}Max: null | number;
   </#if>
   <#if fieldSimple.bool>
    public ${fieldSimple.name?uncap_first}: null | boolean;
   </#if>
      <#if fieldSimple.type.simpleName == "Date" ||  fieldSimple.dateTime>
    public ${fieldSimple.name?uncap_first}: Date;
    public ${fieldSimple.name?uncap_first}From: Date;
    public ${fieldSimple.name?uncap_first}To: Date;
   </#if>
   </#if>
  </#list>
    <#list pojo.fieldsGeneric as fieldGeneric>
    <#if fieldGeneric.pojo??>
  public ${fieldGeneric.name?uncap_first}: ${fieldGeneric.pojo.name}Criteria ;
  public ${fieldGeneric.name?uncap_first}s: Array<${fieldGeneric.pojo.name}Criteria> ;
    </#if>
    </#list>
    <#list pojo.fields as field>
    <#if field.list>
      public ${field.name?uncap_first}: Array<${field.typeAsPojo.name}Criteria>;
    </#if>
    </#list>

    constructor() {
        super();
        <#list pojo.fieldsSimple as fieldSimple>
            <#if fieldSimple.id == false>
                <#if fieldSimple.pureString>
        this.${fieldSimple.name?uncap_first} = '';
        this.${fieldSimple.name?uncap_first}Like = '';
                </#if>
                <#if fieldSimple.nombre>
        this.${fieldSimple.name?uncap_first} = null;
        this.${fieldSimple.name?uncap_first}Min = null;
        this.${fieldSimple.name?uncap_first}Max = null;
                </#if>
                <#if fieldSimple.bool>
        this.${fieldSimple.name?uncap_first} = null;
                </#if>
                <#if fieldSimple.type.simpleName == "Date" ||  fieldSimple.dateTime>
        this.${fieldSimple.name?uncap_first} = null;
        this.${fieldSimple.name?uncap_first}From  = null;
        this.${fieldSimple.name?uncap_first}To = null;
                </#if>
            </#if>
        </#list>
        <#list pojo.fieldsGeneric as fieldGeneric>
            <#if fieldGeneric.pojo??>
        this.${fieldGeneric.name?uncap_first} = new ${fieldGeneric.pojo.name}Criteria() ;
        this.${fieldGeneric.name?uncap_first}s = new Array<${fieldGeneric.pojo.name}Criteria>() ;
            </#if>
        </#list>
    }

}
