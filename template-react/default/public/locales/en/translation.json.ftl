{
    "new" : "New",
    "search": "Search",
    "export": "Export",
    "validate": "Validate",
    "search": "Seach...",
    "delete": "Delete",
    "cancel": "Cancel",
    "save": "Save",
    "next": "Next",
    "yes": "Yes",
    "no": "No",
    "actions": "Actions",
    "confirm": "Confirm",
    "creation": "Creation",
    "list": "List",

<#list 0..pojos?size-1 as i>
    "${pojos[i].name?uncap_first}": "${pojos[i].name}",
    "${pojos[i].tabPanelI18nCreateKey}": "${pojos[i].tabPanelI18nCreateValue}",
    "${pojos[i].listHeaderI18nKey}": "${pojos[i].listHeaderI18nValue}",
    "delete${pojos[i].name}ConfirmationMessage": "Are you sure you want to delete ${pojos[i].formatedName?uncap_first}",
    <#list 0..pojos[i].fields?size-1 as j>
       <#if pojos[i].fields[j].id == false>
    "${pojos[i].fields[j].name18nCreateKey}": "${pojos[i].fields[j].name18nCreateValue}",
            <#if pojos[i].fields[j].nombre ||  pojos[i].fields[j].dateTime>
    "${pojos[i].fields[j].name18nMinCreateKey}": "${pojos[i].fields[j].name18nMinCreateValue}",
    "${pojos[i].fields[j].name18nMaxCreateKey}": "${pojos[i].fields[j].name18nMaxCreateValue}",
            </#if>
       </#if>

    <#if pojos[i].fields[j].generic == true>
    "${pojos[i].fields[j].name18nPlaceHolderCreateKey}": "Select a ${pojos[i].fields[j].name18nPlaceHolderCreateValue}",
    "${pojos[i].fields[j].name18nPlaceHolderFilterCreateKey}": "Search by ${pojos[i].fields[j].name18nPlaceHolderFilterCreateValue}",
     </#if>

    <#if pojos[i].fields[j].list && pojos[i].fields[j].association>
    "${pojos[i].fields[j].name18nPlaceHolderCreateKey}": "Select multiple ${pojos[i].fields[j].name18nPlaceHolderCreateValue}s",
    </#if>

    </#list>
</#list>

    "from-to": "Elements from {first} to {last} (total {totalRecords})"

}


