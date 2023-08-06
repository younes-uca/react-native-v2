package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.DocumentCategorieField;
import ma.sir.ged.bean.history.DocumentCategorieFieldHistory;
import ma.sir.ged.dao.criteria.core.DocumentCategorieFieldCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieFieldHistoryCriteria;
import ma.sir.ged.service.facade.admin.DocumentCategorieFieldAdminService;
import ma.sir.ged.ws.converter.DocumentCategorieFieldConverter;
import ma.sir.ged.ws.dto.DocumentCategorieFieldDto;
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

@Api("Manages documentCategorieField services")
@RestController
@RequestMapping("/api/admin/documentCategorieField/")
public class DocumentCategorieFieldRestAdmin  extends AbstractController<DocumentCategorieField, DocumentCategorieFieldDto, DocumentCategorieFieldHistory, DocumentCategorieFieldCriteria, DocumentCategorieFieldHistoryCriteria, DocumentCategorieFieldAdminService, DocumentCategorieFieldConverter> {



    @ApiOperation("upload one documentCategorieField")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple documentCategorieFields")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all documentCategorieFields")
    @GetMapping("")
    public ResponseEntity<List<DocumentCategorieFieldDto>> findAll() throws Exception {
        return super.findAll();
    }


    @ApiOperation("Finds a documentCategorieField by id")
    @GetMapping("id/{id}")
    public ResponseEntity<DocumentCategorieFieldDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  documentCategorieField")
    @PostMapping("")
    public ResponseEntity<DocumentCategorieFieldDto> save(@RequestBody DocumentCategorieFieldDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  documentCategorieField")
    @PutMapping("")
    public ResponseEntity<DocumentCategorieFieldDto> update(@RequestBody DocumentCategorieFieldDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of documentCategorieField")
    @PostMapping("multiple")
    public ResponseEntity<List<DocumentCategorieFieldDto>> delete(@RequestBody List<DocumentCategorieFieldDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified documentCategorieField")
    @DeleteMapping("")
    public ResponseEntity<DocumentCategorieFieldDto> delete(@RequestBody DocumentCategorieFieldDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified documentCategorieField")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple documentCategorieFields by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("find by field id")
    @GetMapping("field/id/{id}")
    public List<DocumentCategorieField> findByFieldId(@PathVariable Long id){
        return service.findByFieldId(id);
    }
    @ApiOperation("delete by field id")
    @DeleteMapping("field/id/{id}")
    public int deleteByFieldId(@PathVariable Long id){
        return service.deleteByFieldId(id);
    }
    @ApiOperation("find by documentCategorie id")
    @GetMapping("documentCategorie/id/{id}")
    public List<DocumentCategorieField> findByDocumentCategorieId(@PathVariable Long id){
        return service.findByDocumentCategorieId(id);
    }
    @ApiOperation("delete by documentCategorie id")
    @DeleteMapping("documentCategorie/id/{id}")
    public int deleteByDocumentCategorieId(@PathVariable Long id){
        return service.deleteByDocumentCategorieId(id);
    }
    @ApiOperation("find by documentCategorieFieldRule id")
    @GetMapping("documentCategorieFieldRule/id/{id}")
    public List<DocumentCategorieField> findByDocumentCategorieFieldRuleId(@PathVariable Long id){
        return service.findByDocumentCategorieFieldRuleId(id);
    }
    @ApiOperation("delete by documentCategorieFieldRule id")
    @DeleteMapping("documentCategorieFieldRule/id/{id}")
    public int deleteByDocumentCategorieFieldRuleId(@PathVariable Long id){
        return service.deleteByDocumentCategorieFieldRuleId(id);
    }
    @ApiOperation("Finds documentCategorieFields by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<DocumentCategorieFieldDto>> findByCriteria(@RequestBody DocumentCategorieFieldCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated documentCategorieFields by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody DocumentCategorieFieldCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentCategorieFields by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody DocumentCategorieFieldCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets documentCategorieField data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody DocumentCategorieFieldCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets documentCategorieField history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets documentCategorieField paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody DocumentCategorieFieldHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentCategorieField history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody DocumentCategorieFieldHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets documentCategorieField history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody DocumentCategorieFieldHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public DocumentCategorieFieldRestAdmin (DocumentCategorieFieldAdminService service, DocumentCategorieFieldConverter converter) {
        super(service, converter);
    }


}