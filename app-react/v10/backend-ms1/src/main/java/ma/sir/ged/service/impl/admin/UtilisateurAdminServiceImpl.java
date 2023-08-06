package ma.sir.ged.service.impl.admin;

import ma.sir.ged.bean.core.Utilisateur;
import ma.sir.ged.bean.history.UtilisateurHistory;
import ma.sir.ged.dao.criteria.core.UtilisateurCriteria;
import ma.sir.ged.dao.criteria.history.UtilisateurHistoryCriteria;
import ma.sir.ged.dao.facade.core.UtilisateurDao;
import ma.sir.ged.dao.facade.history.UtilisateurHistoryDao;
import ma.sir.ged.dao.specification.core.UtilisateurSpecification;
import ma.sir.ged.service.facade.admin.UtilisateurAdminService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;







import java.util.List;
@Service
public class UtilisateurAdminServiceImpl extends AbstractServiceImpl<Utilisateur,UtilisateurHistory, UtilisateurCriteria, UtilisateurHistoryCriteria, UtilisateurDao,
UtilisateurHistoryDao> implements UtilisateurAdminService {



    public Utilisateur findByReferenceEntity(Utilisateur t){
        return  dao.findByEmail(t.getEmail());
    }





    public void configure() {
        super.configure(Utilisateur.class,UtilisateurHistory.class, UtilisateurHistoryCriteria.class, UtilisateurSpecification.class);
    }


    public UtilisateurAdminServiceImpl(UtilisateurDao dao, UtilisateurHistoryDao historyDao) {
        super(dao, historyDao);
    }

}