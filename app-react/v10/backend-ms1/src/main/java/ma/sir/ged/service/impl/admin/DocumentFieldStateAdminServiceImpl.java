package ma.sir.ged.service.impl.admin;

import ma.sir.ged.bean.core.DocumentFieldState;
import ma.sir.ged.bean.history.DocumentFieldStateHistory;
import ma.sir.ged.dao.criteria.core.DocumentFieldStateCriteria;
import ma.sir.ged.dao.criteria.history.DocumentFieldStateHistoryCriteria;
import ma.sir.ged.dao.facade.core.DocumentFieldStateDao;
import ma.sir.ged.dao.facade.history.DocumentFieldStateHistoryDao;
import ma.sir.ged.dao.specification.core.DocumentFieldStateSpecification;
import ma.sir.ged.service.facade.admin.DocumentFieldStateAdminService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;







import java.util.List;
@Service
public class DocumentFieldStateAdminServiceImpl extends AbstractServiceImpl<DocumentFieldState,DocumentFieldStateHistory, DocumentFieldStateCriteria, DocumentFieldStateHistoryCriteria, DocumentFieldStateDao,
DocumentFieldStateHistoryDao> implements DocumentFieldStateAdminService {



    public DocumentFieldState findByReferenceEntity(DocumentFieldState t){
        return  dao.findByCode(t.getCode());
    }





    public void configure() {
        super.configure(DocumentFieldState.class,DocumentFieldStateHistory.class, DocumentFieldStateHistoryCriteria.class, DocumentFieldStateSpecification.class);
    }


    public DocumentFieldStateAdminServiceImpl(DocumentFieldStateDao dao, DocumentFieldStateHistoryDao historyDao) {
        super(dao, historyDao);
    }

}