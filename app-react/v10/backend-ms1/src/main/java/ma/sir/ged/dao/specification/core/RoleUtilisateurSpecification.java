package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.RoleUtilisateurCriteria;
import ma.sir.ged.bean.core.RoleUtilisateur;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class RoleUtilisateurSpecification extends  AbstractSpecification<RoleUtilisateurCriteria, RoleUtilisateur>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("code", criteria.getCode(),criteria.getCodeLike());
        addPredicate("libelle", criteria.getLibelle(),criteria.getLibelleLike());
    }

    public RoleUtilisateurSpecification(RoleUtilisateurCriteria criteria) {
        super(criteria);
    }

    public RoleUtilisateurSpecification(RoleUtilisateurCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
