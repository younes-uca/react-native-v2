package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.GroupeUtilisateur;
import ma.sir.ged.bean.history.GroupeUtilisateurHistory;
import ma.sir.ged.dao.criteria.core.GroupeUtilisateurCriteria;
import ma.sir.ged.dao.criteria.history.GroupeUtilisateurHistoryCriteria;
import ma.sir.ged.service.facade.admin.GroupeUtilisateurAdminService;
import ma.sir.ged.ws.converter.GroupeUtilisateurConverter;
import ma.sir.ged.ws.dto.GroupeUtilisateurDto;
import ma.sir.ged.zynerator.controller.AbstractController;
import ma.sir.ged.zynerator.dto.AuditEntityDto;
import ma.sir.ged.zynerator.util.PaginatedList;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import ma.sir.ged.zynerator.process.Result;


import org.springframework.web.multipart.MultipartFile;
import ma.sir.ged.zynerator.dto.FileTempDto;

@Api("Manages groupeUtilisateur services")
@RestController
@RequestMapping("/api/admin/groupeUtilisateur/")
public class GroupeUtilisateurRestAdmin  extends AbstractController<GroupeUtilisateur, GroupeUtilisateurDto, GroupeUtilisateurHistory, GroupeUtilisateurCriteria, GroupeUtilisateurHistoryCriteria, GroupeUtilisateurAdminService, GroupeUtilisateurConverter> {



    @ApiOperation("upload one groupeUtilisateur")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple groupeUtilisateurs")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all groupeUtilisateurs")
    @GetMapping("")
    public ResponseEntity<List<GroupeUtilisateurDto>> findAll() throws Exception {
        return super.findAll();
    }


    @ApiOperation("Finds a groupeUtilisateur by id")
    @GetMapping("id/{id}")
    public ResponseEntity<GroupeUtilisateurDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  groupeUtilisateur")
    @PostMapping("")
    public ResponseEntity<GroupeUtilisateurDto> save(@RequestBody GroupeUtilisateurDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  groupeUtilisateur")
    @PutMapping("")
    public ResponseEntity<GroupeUtilisateurDto> update(@RequestBody GroupeUtilisateurDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of groupeUtilisateur")
    @PostMapping("multiple")
    public ResponseEntity<List<GroupeUtilisateurDto>> delete(@RequestBody List<GroupeUtilisateurDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified groupeUtilisateur")
    @DeleteMapping("")
    public ResponseEntity<GroupeUtilisateurDto> delete(@RequestBody GroupeUtilisateurDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified groupeUtilisateur")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple groupeUtilisateurs by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("find by groupe id")
    @GetMapping("groupe/id/{id}")
    public List<GroupeUtilisateur> findByGroupeId(@PathVariable Long id){
        return service.findByGroupeId(id);
    }
    @ApiOperation("delete by groupe id")
    @DeleteMapping("groupe/id/{id}")
    public int deleteByGroupeId(@PathVariable Long id){
        return service.deleteByGroupeId(id);
    }
    @ApiOperation("find by utilisateur id")
    @GetMapping("utilisateur/id/{id}")
    public List<GroupeUtilisateur> findByUtilisateurId(@PathVariable Long id){
        return service.findByUtilisateurId(id);
    }
    @ApiOperation("delete by utilisateur id")
    @DeleteMapping("utilisateur/id/{id}")
    public int deleteByUtilisateurId(@PathVariable Long id){
        return service.deleteByUtilisateurId(id);
    }
    @ApiOperation("find by etatUtilisateur id")
    @GetMapping("etatUtilisateur/id/{id}")
    public List<GroupeUtilisateur> findByEtatUtilisateurId(@PathVariable Long id){
        return service.findByEtatUtilisateurId(id);
    }
    @ApiOperation("delete by etatUtilisateur id")
    @DeleteMapping("etatUtilisateur/id/{id}")
    public int deleteByEtatUtilisateurId(@PathVariable Long id){
        return service.deleteByEtatUtilisateurId(id);
    }
    @ApiOperation("find by roleUtilisateur id")
    @GetMapping("roleUtilisateur/id/{id}")
    public List<GroupeUtilisateur> findByRoleUtilisateurId(@PathVariable Long id){
        return service.findByRoleUtilisateurId(id);
    }
    @ApiOperation("delete by roleUtilisateur id")
    @DeleteMapping("roleUtilisateur/id/{id}")
    public int deleteByRoleUtilisateurId(@PathVariable Long id){
        return service.deleteByRoleUtilisateurId(id);
    }
    @ApiOperation("Finds groupeUtilisateurs by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<GroupeUtilisateurDto>> findByCriteria(@RequestBody GroupeUtilisateurCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated groupeUtilisateurs by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody GroupeUtilisateurCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports groupeUtilisateurs by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody GroupeUtilisateurCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets groupeUtilisateur data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody GroupeUtilisateurCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets groupeUtilisateur history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets groupeUtilisateur paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody GroupeUtilisateurHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports groupeUtilisateur history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody GroupeUtilisateurHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets groupeUtilisateur history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody GroupeUtilisateurHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public GroupeUtilisateurRestAdmin (GroupeUtilisateurAdminService service, GroupeUtilisateurConverter converter) {
        super(service, converter);
    }


}