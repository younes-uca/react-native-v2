package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.DocumentFieldState;
import ma.sir.ged.bean.history.DocumentFieldStateHistory;
import ma.sir.ged.dao.criteria.core.DocumentFieldStateCriteria;
import ma.sir.ged.dao.criteria.history.DocumentFieldStateHistoryCriteria;
import ma.sir.ged.service.facade.admin.DocumentFieldStateAdminService;
import ma.sir.ged.ws.converter.DocumentFieldStateConverter;
import ma.sir.ged.ws.dto.DocumentFieldStateDto;
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

@Api("Manages documentFieldState services")
@RestController
@RequestMapping("/api/admin/documentFieldState/")
public class DocumentFieldStateRestAdmin  extends AbstractController<DocumentFieldState, DocumentFieldStateDto, DocumentFieldStateHistory, DocumentFieldStateCriteria, DocumentFieldStateHistoryCriteria, DocumentFieldStateAdminService, DocumentFieldStateConverter> {



    @ApiOperation("upload one documentFieldState")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple documentFieldStates")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all documentFieldStates")
    @GetMapping("")
    public ResponseEntity<List<DocumentFieldStateDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all documentFieldStates")
    @GetMapping("optimized")
    public ResponseEntity<List<DocumentFieldStateDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a documentFieldState by id")
    @GetMapping("id/{id}")
    public ResponseEntity<DocumentFieldStateDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  documentFieldState")
    @PostMapping("")
    public ResponseEntity<DocumentFieldStateDto> save(@RequestBody DocumentFieldStateDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  documentFieldState")
    @PutMapping("")
    public ResponseEntity<DocumentFieldStateDto> update(@RequestBody DocumentFieldStateDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of documentFieldState")
    @PostMapping("multiple")
    public ResponseEntity<List<DocumentFieldStateDto>> delete(@RequestBody List<DocumentFieldStateDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified documentFieldState")
    @DeleteMapping("")
    public ResponseEntity<DocumentFieldStateDto> delete(@RequestBody DocumentFieldStateDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified documentFieldState")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple documentFieldStates by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds documentFieldStates by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<DocumentFieldStateDto>> findByCriteria(@RequestBody DocumentFieldStateCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated documentFieldStates by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody DocumentFieldStateCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentFieldStates by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody DocumentFieldStateCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets documentFieldState data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody DocumentFieldStateCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets documentFieldState history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets documentFieldState paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody DocumentFieldStateHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentFieldState history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody DocumentFieldStateHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets documentFieldState history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody DocumentFieldStateHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public DocumentFieldStateRestAdmin (DocumentFieldStateAdminService service, DocumentFieldStateConverter converter) {
        super(service, converter);
    }


}