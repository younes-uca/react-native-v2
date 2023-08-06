package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.Utilisateur;
import ma.sir.ged.bean.history.UtilisateurHistory;
import ma.sir.ged.dao.criteria.core.UtilisateurCriteria;
import ma.sir.ged.dao.criteria.history.UtilisateurHistoryCriteria;
import ma.sir.ged.service.facade.admin.UtilisateurAdminService;
import ma.sir.ged.ws.converter.UtilisateurConverter;
import ma.sir.ged.ws.dto.UtilisateurDto;
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

@Api("Manages utilisateur services")
@RestController
@RequestMapping("/api/admin/utilisateur/")
public class UtilisateurRestAdmin  extends AbstractController<Utilisateur, UtilisateurDto, UtilisateurHistory, UtilisateurCriteria, UtilisateurHistoryCriteria, UtilisateurAdminService, UtilisateurConverter> {



    @ApiOperation("upload one utilisateur")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple utilisateurs")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all utilisateurs")
    @GetMapping("")
    public ResponseEntity<List<UtilisateurDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all utilisateurs")
    @GetMapping("optimized")
    public ResponseEntity<List<UtilisateurDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a utilisateur by id")
    @GetMapping("id/{id}")
    public ResponseEntity<UtilisateurDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  utilisateur")
    @PostMapping("")
    public ResponseEntity<UtilisateurDto> save(@RequestBody UtilisateurDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  utilisateur")
    @PutMapping("")
    public ResponseEntity<UtilisateurDto> update(@RequestBody UtilisateurDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of utilisateur")
    @PostMapping("multiple")
    public ResponseEntity<List<UtilisateurDto>> delete(@RequestBody List<UtilisateurDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified utilisateur")
    @DeleteMapping("")
    public ResponseEntity<UtilisateurDto> delete(@RequestBody UtilisateurDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified utilisateur")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple utilisateurs by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds utilisateurs by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<UtilisateurDto>> findByCriteria(@RequestBody UtilisateurCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated utilisateurs by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody UtilisateurCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports utilisateurs by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody UtilisateurCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets utilisateur data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody UtilisateurCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets utilisateur history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets utilisateur paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody UtilisateurHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports utilisateur history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody UtilisateurHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets utilisateur history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody UtilisateurHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public UtilisateurRestAdmin (UtilisateurAdminService service, UtilisateurConverter converter) {
        super(service, converter);
    }


}