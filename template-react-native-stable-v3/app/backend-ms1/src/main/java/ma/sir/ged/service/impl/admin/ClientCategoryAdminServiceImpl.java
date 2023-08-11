package ma.sir.ged.service.impl.admin;

import ma.sir.ged.bean.core.ClientCategory;
import ma.sir.ged.bean.history.ClientCategoryHistory;
import ma.sir.ged.dao.criteria.core.ClientCategoryCriteria;
import ma.sir.ged.dao.criteria.history.ClientCategoryHistoryCriteria;
import ma.sir.ged.dao.facade.core.ClientCategoryDao;
import ma.sir.ged.dao.facade.history.ClientCategoryHistoryDao;
import ma.sir.ged.dao.specification.core.ClientCategorySpecification;
import ma.sir.ged.service.facade.admin.ClientCategoryAdminService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
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