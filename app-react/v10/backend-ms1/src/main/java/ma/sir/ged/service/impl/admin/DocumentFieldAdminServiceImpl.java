package ma.sir.ged.service.impl.admin;

import ma.sir.ged.bean.core.DocumentField;
import ma.sir.ged.bean.history.DocumentFieldHistory;
import ma.sir.ged.dao.criteria.core.DocumentFieldCriteria;
import ma.sir.ged.dao.criteria.history.DocumentFieldHistoryCriteria;
import ma.sir.ged.dao.facade.core.DocumentFieldDao;
import ma.sir.ged.dao.facade.history.DocumentFieldHistoryDao;
import ma.sir.ged.dao.specification.core.DocumentFieldSpecification;
import ma.sir.ged.service.facade.admin.DocumentFieldAdminService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;


import ma.sir.ged.service.facade.admin.DocumentFieldStateAdminService ;
import ma.sir.ged.service.facade.admin.DocumentAdminService ;
import ma.sir.ged.service.facade.admin.FieldAdminService ;



import java.util.List;
@Service
public class DocumentFieldAdminServiceImpl extends AbstractServiceImpl<DocumentField,DocumentFieldHistory, DocumentFieldCriteria, DocumentFieldHistoryCriteria, DocumentFieldDao,
DocumentFieldHistoryDao> implements DocumentFieldAdminService {




    public List<DocumentField> findByFieldId(Long id){
        return dao.findByFieldId(id);
    }
    public int deleteByFieldId(Long id){
        return dao.deleteByFieldId(id);
    }
    public List<DocumentField> findByDocumentId(Long id){
        return dao.findByDocumentId(id);
    }
    public int deleteByDocumentId(Long id){
        return dao.deleteByDocumentId(id);
    }
    public List<DocumentField> findByDocumentFieldStateId(Long id){
        return dao.findByDocumentFieldStateId(id);
    }
    public int deleteByDocumentFieldStateId(Long id){
        return dao.deleteByDocumentFieldStateId(id);
    }




    public void configure() {
        super.configure(DocumentField.class,DocumentFieldHistory.class, DocumentFieldHistoryCriteria.class, DocumentFieldSpecification.class);
    }

    @Autowired
    private DocumentFieldStateAdminService documentFieldStateService ;
    @Autowired
    private DocumentAdminService documentService ;
    @Autowired
    private FieldAdminService fieldService ;

    public DocumentFieldAdminServiceImpl(DocumentFieldDao dao, DocumentFieldHistoryDao historyDao) {
        super(dao, historyDao);
    }

}