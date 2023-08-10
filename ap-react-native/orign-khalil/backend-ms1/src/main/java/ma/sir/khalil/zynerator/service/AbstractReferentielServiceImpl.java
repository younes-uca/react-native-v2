package ma.sir.khalil.zynerator.service;

import ma.sir.khalil.zynerator.audit.AuditBusinessObjectEnhanced;
import ma.sir.khalil.zynerator.criteria.BaseCriteria;
import ma.sir.khalil.zynerator.history.HistBusinessObject;
import ma.sir.khalil.zynerator.history.HistCriteria;
import ma.sir.khalil.zynerator.repository.AbstractHistoryRepository;
import ma.sir.khalil.zynerator.repository.AbstractRepository;

public abstract class AbstractReferentielServiceImpl<T extends AuditBusinessObjectEnhanced, H extends HistBusinessObject, CRITERIA extends BaseCriteria, HC extends HistCriteria, REPO extends AbstractRepository<T, Long>, HISTREPO extends AbstractHistoryRepository<H, Long>> extends AbstractServiceImpl<T, H, CRITERIA, HC, REPO, HISTREPO> {

    public AbstractReferentielServiceImpl(REPO dao, HISTREPO historyRepository) {
    super(dao, historyRepository);
    }

}