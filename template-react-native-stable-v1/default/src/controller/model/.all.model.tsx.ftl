import {BaseDto} from "../../zynerator/dto/BaseDto.model";

<#list pojo.types as type>
  <#if pojo.name != type.simpleName>
import {${type.simpleName}Dto} from './${type.simpleName}.model';
    </#if>
</#list>

export class ${pojo.name}Dto extends BaseDto{

   <#list pojo.fieldsSimple as fieldSimple>
   <#if fieldSimple.id == false>
   <#if fieldSimple.pureString>
    public ${fieldSimple.name?uncap_first}: string;
   </#if>
    <#if fieldSimple.nombre>
    public ${fieldSimple.name?uncap_first}: null | number;
   </#if>
   <#if fieldSimple.bool>
   public ${fieldSimple.name?uncap_first}: boolean;
   </#if>
      <#if fieldSimple.type.simpleName == "Date" ||  fieldSimple.dateTime>
   public ${fieldSimple.name?uncap_first}: Date;
   </#if>

   </#if>
  </#list>
    <#list pojo.fieldsGeneric as fieldGeneric>
    <#if fieldGeneric.pojo??>
    public ${fieldGeneric.name?uncap_first}: ${fieldGeneric.pojo.name}Dto ;
    </#if>
    </#list>
    <#list pojo.fields as field>
    <#if field.list>
     public ${field.name?uncap_first}: Array<${field.typeAsPojo.name}Dto>;
    </#if>
    </#list>


    constructor() {
        super();
    <#list pojo.fieldsSimple as fieldSimple>
        <#if fieldSimple.id == false>
            <#if fieldSimple.name == pojo.labelOrReferenceOrId.name>
        this.${fieldSimple.name?uncap_first} = 'select a ${pojo.name?uncap_first}';
            <#elseif fieldSimple.pureString>
        this.${fieldSimple.name?uncap_first} = '';
            </#if>
            <#if fieldSimple.nombre>
        this.${fieldSimple.name?uncap_first} = null;
            </#if>
            <#if fieldSimple.bool>
        this.${fieldSimple.name?uncap_first} = null;
            </#if>
            <#if fieldSimple.type.simpleName == "Date" ||  fieldSimple.dateTime>
        this.${fieldSimple.name?uncap_first} = null;
            </#if>
        </#if>
    </#list>
    <#list pojo.fieldsGeneric as fieldGeneric>
        <#if fieldGeneric.pojo??>
        this.${fieldGeneric.name?uncap_first} = new ${fieldGeneric.pojo.name}Dto() ;
        </#if>
    </#list>
    <#list pojo.fields as field>
    <#if field.list>
        this.${field.name?uncap_first} = new Array<${field.typeAsPojo.name}Dto>();
        </#if>
        </#list>
        }

}
