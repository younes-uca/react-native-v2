package ma.sir.khalil.service.impl.admin;

import ma.sir.khalil.bean.core.ClientCategory;
import ma.sir.khalil.bean.history.ClientCategoryHistory;
import ma.sir.khalil.dao.criteria.core.ClientCategoryCriteria;
import ma.sir.khalil.dao.criteria.history.ClientCategoryHistoryCriteria;
import ma.sir.khalil.dao.facade.core.ClientCategoryDao;
import ma.sir.khalil.dao.facade.history.ClientCategoryHistoryDao;
import ma.sir.khalil.dao.specification.core.ClientCategorySpecification;
import ma.sir.khalil.service.facade.admin.ClientCategoryAdminService;
import ma.sir.khalil.zynerator.service.AbstractServiceImpl;
import ma.sir.khalil.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;







import java.util.List;
@Service
public class ClientCategoryAdminServiceImpl extends AbstractServiceImpl<ClientCategory,ClientCategoryHistory, ClientCategoryCriteria, ClientCategoryHistoryCriteria, ClientCategoryDao,
ClientCategoryHistoryDao> implements ClientCategoryAdminService {



    public ClientCategory findByReferenceEntity(ClientCategory t){
        return  dao.findByCode(t.getCode());
    }





    public void configure() {
        super.configure(ClientCategory.class,ClientCategoryHistory.class, ClientCategoryHistoryCriteria.class, ClientCategorySpecification.class);
    }


    public ClientCategoryAdminServiceImpl(ClientCategoryDao dao, ClientCategoryHistoryDao historyDao) {
        super(dao, historyDao);
    }

}