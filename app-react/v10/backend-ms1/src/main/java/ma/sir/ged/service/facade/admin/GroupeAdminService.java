package ma.sir.ged.service.facade.admin;

import java.util.List;
import ma.sir.ged.bean.core.Groupe;
import ma.sir.ged.dao.criteria.core.GroupeCriteria;
import ma.sir.ged.dao.criteria.history.GroupeHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface GroupeAdminService extends  IService<Groupe,GroupeCriteria, GroupeHistoryCriteria>  {

    List<Groupe> findByUtilisateurId(Long id);
    int deleteByUtilisateurId(Long id);



}
