package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.DocumentType;
import ma.sir.ged.bean.history.DocumentTypeHistory;
import ma.sir.ged.dao.criteria.core.DocumentTypeCriteria;
import ma.sir.ged.dao.criteria.history.DocumentTypeHistoryCriteria;
import ma.sir.ged.service.facade.admin.DocumentTypeAdminService;
import ma.sir.ged.ws.converter.DocumentTypeConverter;
import ma.sir.ged.ws.dto.DocumentTypeDto;
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

@Api("Manages documentType services")
@RestController
@RequestMapping("/api/admin/documentType/")
public class DocumentTypeRestAdmin  extends AbstractController<DocumentType, DocumentTypeDto, DocumentTypeHistory, DocumentTypeCriteria, DocumentTypeHistoryCriteria, DocumentTypeAdminService, DocumentTypeConverter> {



    @ApiOperation("upload one documentType")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple documentTypes")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all documentTypes")
    @GetMapping("")
    public ResponseEntity<List<DocumentTypeDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all documentTypes")
    @GetMapping("optimized")
    public ResponseEntity<List<DocumentTypeDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a documentType by id")
    @GetMapping("id/{id}")
    public ResponseEntity<DocumentTypeDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  documentType")
    @PostMapping("")
    public ResponseEntity<DocumentTypeDto> save(@RequestBody DocumentTypeDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  documentType")
    @PutMapping("")
    public ResponseEntity<DocumentTypeDto> update(@RequestBody DocumentTypeDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of documentType")
    @PostMapping("multiple")
    public ResponseEntity<List<DocumentTypeDto>> delete(@RequestBody List<DocumentTypeDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified documentType")
    @DeleteMapping("")
    public ResponseEntity<DocumentTypeDto> delete(@RequestBody DocumentTypeDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified documentType")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple documentTypes by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds documentTypes by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<DocumentTypeDto>> findByCriteria(@RequestBody DocumentTypeCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated documentTypes by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody DocumentTypeCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentTypes by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody DocumentTypeCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets documentType data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody DocumentTypeCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets documentType history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets documentType paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody DocumentTypeHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentType history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody DocumentTypeHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets documentType history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody DocumentTypeHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public DocumentTypeRestAdmin (DocumentTypeAdminService service, DocumentTypeConverter converter) {
        super(service, converter);
    }


}