package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.AccessShare;
import ma.sir.ged.bean.history.AccessShareHistory;
import ma.sir.ged.dao.criteria.core.AccessShareCriteria;
import ma.sir.ged.dao.criteria.history.AccessShareHistoryCriteria;
import ma.sir.ged.service.facade.admin.AccessShareAdminService;
import ma.sir.ged.ws.converter.AccessShareConverter;
import ma.sir.ged.ws.dto.AccessShareDto;
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

@Api("Manages accessShare services")
@RestController
@RequestMapping("/api/admin/accessShare/")
public class AccessShareRestAdmin  extends AbstractController<AccessShare, AccessShareDto, AccessShareHistory, AccessShareCriteria, AccessShareHistoryCriteria, AccessShareAdminService, AccessShareConverter> {



    @ApiOperation("upload one accessShare")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple accessShares")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all accessShares")
    @GetMapping("")
    public ResponseEntity<List<AccessShareDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all accessShares")
    @GetMapping("optimized")
    public ResponseEntity<List<AccessShareDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a accessShare by id")
    @GetMapping("id/{id}")
    public ResponseEntity<AccessShareDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  accessShare")
    @PostMapping("")
    public ResponseEntity<AccessShareDto> save(@RequestBody AccessShareDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  accessShare")
    @PutMapping("")
    public ResponseEntity<AccessShareDto> update(@RequestBody AccessShareDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of accessShare")
    @PostMapping("multiple")
    public ResponseEntity<List<AccessShareDto>> delete(@RequestBody List<AccessShareDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified accessShare")
    @DeleteMapping("")
    public ResponseEntity<AccessShareDto> delete(@RequestBody AccessShareDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified accessShare")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple accessShares by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds accessShares by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<AccessShareDto>> findByCriteria(@RequestBody AccessShareCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated accessShares by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody AccessShareCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports accessShares by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody AccessShareCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets accessShare data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody AccessShareCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets accessShare history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets accessShare paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody AccessShareHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports accessShare history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody AccessShareHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets accessShare history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody AccessShareHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public AccessShareRestAdmin (AccessShareAdminService service, AccessShareConverter converter) {
        super(service, converter);
    }


}