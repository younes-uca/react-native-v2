package ma.sir.ged.service.impl.agent;

import ma.sir.ged.bean.core.Field;
import ma.sir.ged.bean.history.FieldHistory;
import ma.sir.ged.dao.criteria.core.FieldCriteria;
import ma.sir.ged.dao.criteria.history.FieldHistoryCriteria;
import ma.sir.ged.dao.facade.core.FieldDao;
import ma.sir.ged.dao.facade.history.FieldHistoryDao;
import ma.sir.ged.dao.specification.core.FieldSpecification;
import ma.sir.ged.service.facade.agent.FieldAgentService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;







import java.util.List;
@Service
public class FieldAgentServiceImpl extends AbstractServiceImpl<Field,FieldHistory, FieldCriteria, FieldHistoryCriteria, FieldDao,
FieldHistoryDao> implements FieldAgentService {



    public Field findByReferenceEntity(Field t){
        return  dao.findByCode(t.getCode());
    }





    public void configure() {
        super.configure(Field.class,FieldHistory.class, FieldHistoryCriteria.class, FieldSpecification.class);
    }


    public FieldAgentServiceImpl(FieldDao dao, FieldHistoryDao historyDao) {
        super(dao, historyDao);
    }

}