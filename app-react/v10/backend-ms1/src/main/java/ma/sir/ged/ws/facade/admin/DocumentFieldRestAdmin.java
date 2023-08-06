package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.DocumentField;
import ma.sir.ged.bean.history.DocumentFieldHistory;
import ma.sir.ged.dao.criteria.core.DocumentFieldCriteria;
import ma.sir.ged.dao.criteria.history.DocumentFieldHistoryCriteria;
import ma.sir.ged.service.facade.admin.DocumentFieldAdminService;
import ma.sir.ged.ws.converter.DocumentFieldConverter;
import ma.sir.ged.ws.dto.DocumentFieldDto;
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

@Api("Manages documentField services")
@RestController
@RequestMapping("/api/admin/documentField/")
public class DocumentFieldRestAdmin  extends AbstractController<DocumentField, DocumentFieldDto, DocumentFieldHistory, DocumentFieldCriteria, DocumentFieldHistoryCriteria, DocumentFieldAdminService, DocumentFieldConverter> {



    @ApiOperation("upload one documentField")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple documentFields")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all documentFields")
    @GetMapping("")
    public ResponseEntity<List<DocumentFieldDto>> findAll() throws Exception {
        return super.findAll();
    }


    @ApiOperation("Finds a documentField by id")
    @GetMapping("id/{id}")
    public ResponseEntity<DocumentFieldDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  documentField")
    @PostMapping("")
    public ResponseEntity<DocumentFieldDto> save(@RequestBody DocumentFieldDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  documentField")
    @PutMapping("")
    public ResponseEntity<DocumentFieldDto> update(@RequestBody DocumentFieldDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of documentField")
    @PostMapping("multiple")
    public ResponseEntity<List<DocumentFieldDto>> delete(@RequestBody List<DocumentFieldDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified documentField")
    @DeleteMapping("")
    public ResponseEntity<DocumentFieldDto> delete(@RequestBody DocumentFieldDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified documentField")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple documentFields by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("find by field id")
    @GetMapping("field/id/{id}")
    public List<DocumentField> findByFieldId(@PathVariable Long id){
        return service.findByFieldId(id);
    }
    @ApiOperation("delete by field id")
    @DeleteMapping("field/id/{id}")
    public int deleteByFieldId(@PathVariable Long id){
        return service.deleteByFieldId(id);
    }
    @ApiOperation("find by document id")
    @GetMapping("document/id/{id}")
    public List<DocumentField> findByDocumentId(@PathVariable Long id){
        return service.findByDocumentId(id);
    }
    @ApiOperation("delete by document id")
    @DeleteMapping("document/id/{id}")
    public int deleteByDocumentId(@PathVariable Long id){
        return service.deleteByDocumentId(id);
    }
    @ApiOperation("find by documentFieldState id")
    @GetMapping("documentFieldState/id/{id}")
    public List<DocumentField> findByDocumentFieldStateId(@PathVariable Long id){
        return service.findByDocumentFieldStateId(id);
    }
    @ApiOperation("delete by documentFieldState id")
    @DeleteMapping("documentFieldState/id/{id}")
    public int deleteByDocumentFieldStateId(@PathVariable Long id){
        return service.deleteByDocumentFieldStateId(id);
    }
    @ApiOperation("Finds documentFields by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<DocumentFieldDto>> findByCriteria(@RequestBody DocumentFieldCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated documentFields by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody DocumentFieldCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentFields by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody DocumentFieldCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets documentField data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody DocumentFieldCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets documentField history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets documentField paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody DocumentFieldHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentField history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody DocumentFieldHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets documentField history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody DocumentFieldHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public DocumentFieldRestAdmin (DocumentFieldAdminService service, DocumentFieldConverter converter) {
        super(service, converter);
    }


}