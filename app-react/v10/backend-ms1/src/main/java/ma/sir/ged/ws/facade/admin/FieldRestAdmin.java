package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.Field;
import ma.sir.ged.bean.history.FieldHistory;
import ma.sir.ged.dao.criteria.core.FieldCriteria;
import ma.sir.ged.dao.criteria.history.FieldHistoryCriteria;
import ma.sir.ged.service.facade.admin.FieldAdminService;
import ma.sir.ged.ws.converter.FieldConverter;
import ma.sir.ged.ws.dto.FieldDto;
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

@Api("Manages field services")
@RestController
@RequestMapping("/api/admin/field/")
public class FieldRestAdmin  extends AbstractController<Field, FieldDto, FieldHistory, FieldCriteria, FieldHistoryCriteria, FieldAdminService, FieldConverter> {



    @ApiOperation("upload one field")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple fields")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all fields")
    @GetMapping("")
    public ResponseEntity<List<FieldDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all fields")
    @GetMapping("optimized")
    public ResponseEntity<List<FieldDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a field by id")
    @GetMapping("id/{id}")
    public ResponseEntity<FieldDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  field")
    @PostMapping("")
    public ResponseEntity<FieldDto> save(@RequestBody FieldDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  field")
    @PutMapping("")
    public ResponseEntity<FieldDto> update(@RequestBody FieldDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of field")
    @PostMapping("multiple")
    public ResponseEntity<List<FieldDto>> delete(@RequestBody List<FieldDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified field")
    @DeleteMapping("")
    public ResponseEntity<FieldDto> delete(@RequestBody FieldDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified field")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple fields by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds fields by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<FieldDto>> findByCriteria(@RequestBody FieldCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated fields by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody FieldCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports fields by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody FieldCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets field data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody FieldCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets field history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets field paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody FieldHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports field history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody FieldHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets field history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody FieldHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public FieldRestAdmin (FieldAdminService service, FieldConverter converter) {
        super(service, converter);
    }


}