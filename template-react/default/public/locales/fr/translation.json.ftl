{
    "new" : "Nouveau",
    "search": "Chercher",
    "export": "Exporter",
    "validate": "Valider",
    "search": "Recherche...",
    "delete": "Supprimer",
    "cancel": "Annuler",
    "next": "Suivant",

<#list 0..pojos?size-1 as i>
    "${pojos[i].name?uncap_first}": "${pojos[i].name}",
    "${pojos[i].tabPanelI18nCreateKey}": "${pojos[i].tabPanelI18nCreateValue}",
    "${pojos[i].listHeaderI18nKey}": "${pojos[i].listHeaderI18nValue}",
    <#list 0..pojos[i].fields?size-1 as j>
        <#if pojos[i].fields[j].id == false>
    "${pojos[i].fields[j].name18nCreateKey}": "${pojos[i].fields[j].name18nCreateValue}",
        </#if>
    </#list>
</#list>

"from-to": "les element de {first} a {last} (total {totalRecords})"

}


