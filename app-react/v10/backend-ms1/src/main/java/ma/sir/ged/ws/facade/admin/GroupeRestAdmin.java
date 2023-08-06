package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.Groupe;
import ma.sir.ged.bean.history.GroupeHistory;
import ma.sir.ged.dao.criteria.core.GroupeCriteria;
import ma.sir.ged.dao.criteria.history.GroupeHistoryCriteria;
import ma.sir.ged.service.facade.admin.GroupeAdminService;
import ma.sir.ged.ws.converter.GroupeConverter;
import ma.sir.ged.ws.dto.GroupeDto;
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

@Api("Manages groupe services")
@RestController
@RequestMapping("/api/admin/groupe/")
public class GroupeRestAdmin  extends AbstractController<Groupe, GroupeDto, GroupeHistory, GroupeCriteria, GroupeHistoryCriteria, GroupeAdminService, GroupeConverter> {



    @ApiOperation("upload one groupe")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple groupes")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all groupes")
    @GetMapping("")
    public ResponseEntity<List<GroupeDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all groupes")
    @GetMapping("optimized")
    public ResponseEntity<List<GroupeDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a groupe by id")
    @GetMapping("id/{id}")
    public ResponseEntity<GroupeDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  groupe")
    @PostMapping("")
    public ResponseEntity<GroupeDto> save(@RequestBody GroupeDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  groupe")
    @PutMapping("")
    public ResponseEntity<GroupeDto> update(@RequestBody GroupeDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of groupe")
    @PostMapping("multiple")
    public ResponseEntity<List<GroupeDto>> delete(@RequestBody List<GroupeDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified groupe")
    @DeleteMapping("")
    public ResponseEntity<GroupeDto> delete(@RequestBody GroupeDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified groupe")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple groupes by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("find by utilisateur id")
    @GetMapping("utilisateur/id/{id}")
    public List<Groupe> findByUtilisateurId(@PathVariable Long id){
        return service.findByUtilisateurId(id);
    }
    @ApiOperation("delete by utilisateur id")
    @DeleteMapping("utilisateur/id/{id}")
    public int deleteByUtilisateurId(@PathVariable Long id){
        return service.deleteByUtilisateurId(id);
    }
    @ApiOperation("Finds a groupe and associated list by id")
    @GetMapping("detail/id/{id}")
    public ResponseEntity<GroupeDto> findWithAssociatedLists(@PathVariable Long id) {
        return super.findWithAssociatedLists(id);
    }

    @ApiOperation("Finds groupes by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<GroupeDto>> findByCriteria(@RequestBody GroupeCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated groupes by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody GroupeCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports groupes by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody GroupeCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets groupe data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody GroupeCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets groupe history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets groupe paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody GroupeHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports groupe history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody GroupeHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets groupe history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody GroupeHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public GroupeRestAdmin (GroupeAdminService service, GroupeConverter converter) {
        super(service, converter);
    }


}