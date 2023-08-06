package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.EtatUtilisateur;
import ma.sir.ged.bean.history.EtatUtilisateurHistory;
import ma.sir.ged.dao.criteria.core.EtatUtilisateurCriteria;
import ma.sir.ged.dao.criteria.history.EtatUtilisateurHistoryCriteria;
import ma.sir.ged.service.facade.admin.EtatUtilisateurAdminService;
import ma.sir.ged.ws.converter.EtatUtilisateurConverter;
import ma.sir.ged.ws.dto.EtatUtilisateurDto;
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

@Api("Manages etatUtilisateur services")
@RestController
@RequestMapping("/api/admin/etatUtilisateur/")
public class EtatUtilisateurRestAdmin  extends AbstractController<EtatUtilisateur, EtatUtilisateurDto, EtatUtilisateurHistory, EtatUtilisateurCriteria, EtatUtilisateurHistoryCriteria, EtatUtilisateurAdminService, EtatUtilisateurConverter> {



    @ApiOperation("upload one etatUtilisateur")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple etatUtilisateurs")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all etatUtilisateurs")
    @GetMapping("")
    public ResponseEntity<List<EtatUtilisateurDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all etatUtilisateurs")
    @GetMapping("optimized")
    public ResponseEntity<List<EtatUtilisateurDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a etatUtilisateur by id")
    @GetMapping("id/{id}")
    public ResponseEntity<EtatUtilisateurDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  etatUtilisateur")
    @PostMapping("")
    public ResponseEntity<EtatUtilisateurDto> save(@RequestBody EtatUtilisateurDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  etatUtilisateur")
    @PutMapping("")
    public ResponseEntity<EtatUtilisateurDto> update(@RequestBody EtatUtilisateurDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of etatUtilisateur")
    @PostMapping("multiple")
    public ResponseEntity<List<EtatUtilisateurDto>> delete(@RequestBody List<EtatUtilisateurDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified etatUtilisateur")
    @DeleteMapping("")
    public ResponseEntity<EtatUtilisateurDto> delete(@RequestBody EtatUtilisateurDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified etatUtilisateur")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple etatUtilisateurs by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds etatUtilisateurs by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<EtatUtilisateurDto>> findByCriteria(@RequestBody EtatUtilisateurCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated etatUtilisateurs by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody EtatUtilisateurCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports etatUtilisateurs by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody EtatUtilisateurCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets etatUtilisateur data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody EtatUtilisateurCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets etatUtilisateur history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets etatUtilisateur paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody EtatUtilisateurHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports etatUtilisateur history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody EtatUtilisateurHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets etatUtilisateur history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody EtatUtilisateurHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public EtatUtilisateurRestAdmin (EtatUtilisateurAdminService service, EtatUtilisateurConverter converter) {
        super(service, converter);
    }


}