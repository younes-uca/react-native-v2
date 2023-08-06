package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.DocumentCategorieFieldRule;
import ma.sir.ged.bean.history.DocumentCategorieFieldRuleHistory;
import ma.sir.ged.dao.criteria.core.DocumentCategorieFieldRuleCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieFieldRuleHistoryCriteria;
import ma.sir.ged.service.facade.admin.DocumentCategorieFieldRuleAdminService;
import ma.sir.ged.ws.converter.DocumentCategorieFieldRuleConverter;
import ma.sir.ged.ws.dto.DocumentCategorieFieldRuleDto;
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

@Api("Manages documentCategorieFieldRule services")
@RestController
@RequestMapping("/api/admin/documentCategorieFieldRule/")
public class DocumentCategorieFieldRuleRestAdmin  extends AbstractController<DocumentCategorieFieldRule, DocumentCategorieFieldRuleDto, DocumentCategorieFieldRuleHistory, DocumentCategorieFieldRuleCriteria, DocumentCategorieFieldRuleHistoryCriteria, DocumentCategorieFieldRuleAdminService, DocumentCategorieFieldRuleConverter> {



    @ApiOperation("upload one documentCategorieFieldRule")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple documentCategorieFieldRules")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all documentCategorieFieldRules")
    @GetMapping("")
    public ResponseEntity<List<DocumentCategorieFieldRuleDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all documentCategorieFieldRules")
    @GetMapping("optimized")
    public ResponseEntity<List<DocumentCategorieFieldRuleDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a documentCategorieFieldRule by id")
    @GetMapping("id/{id}")
    public ResponseEntity<DocumentCategorieFieldRuleDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  documentCategorieFieldRule")
    @PostMapping("")
    public ResponseEntity<DocumentCategorieFieldRuleDto> save(@RequestBody DocumentCategorieFieldRuleDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  documentCategorieFieldRule")
    @PutMapping("")
    public ResponseEntity<DocumentCategorieFieldRuleDto> update(@RequestBody DocumentCategorieFieldRuleDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of documentCategorieFieldRule")
    @PostMapping("multiple")
    public ResponseEntity<List<DocumentCategorieFieldRuleDto>> delete(@RequestBody List<DocumentCategorieFieldRuleDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified documentCategorieFieldRule")
    @DeleteMapping("")
    public ResponseEntity<DocumentCategorieFieldRuleDto> delete(@RequestBody DocumentCategorieFieldRuleDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified documentCategorieFieldRule")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple documentCategorieFieldRules by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds documentCategorieFieldRules by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<DocumentCategorieFieldRuleDto>> findByCriteria(@RequestBody DocumentCategorieFieldRuleCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated documentCategorieFieldRules by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody DocumentCategorieFieldRuleCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentCategorieFieldRules by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody DocumentCategorieFieldRuleCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets documentCategorieFieldRule data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody DocumentCategorieFieldRuleCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets documentCategorieFieldRule history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets documentCategorieFieldRule paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody DocumentCategorieFieldRuleHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentCategorieFieldRule history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody DocumentCategorieFieldRuleHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets documentCategorieFieldRule history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody DocumentCategorieFieldRuleHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public DocumentCategorieFieldRuleRestAdmin (DocumentCategorieFieldRuleAdminService service, DocumentCategorieFieldRuleConverter converter) {
        super(service, converter);
    }


}