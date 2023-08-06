package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.DocumentCategorie;
import ma.sir.ged.bean.history.DocumentCategorieHistory;
import ma.sir.ged.dao.criteria.core.DocumentCategorieCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieHistoryCriteria;
import ma.sir.ged.service.facade.admin.DocumentCategorieAdminService;
import ma.sir.ged.ws.converter.DocumentCategorieConverter;
import ma.sir.ged.ws.dto.DocumentCategorieDto;
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

@Api("Manages documentCategorie services")
@RestController
@RequestMapping("/api/admin/documentCategorie/")
public class DocumentCategorieRestAdmin  extends AbstractController<DocumentCategorie, DocumentCategorieDto, DocumentCategorieHistory, DocumentCategorieCriteria, DocumentCategorieHistoryCriteria, DocumentCategorieAdminService, DocumentCategorieConverter> {



    @ApiOperation("upload one documentCategorie")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple documentCategories")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all documentCategories")
    @GetMapping("")
    public ResponseEntity<List<DocumentCategorieDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all documentCategories")
    @GetMapping("optimized")
    public ResponseEntity<List<DocumentCategorieDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a documentCategorie by id")
    @GetMapping("id/{id}")
    public ResponseEntity<DocumentCategorieDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  documentCategorie")
    @PostMapping("")
    public ResponseEntity<DocumentCategorieDto> save(@RequestBody DocumentCategorieDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  documentCategorie")
    @PutMapping("")
    public ResponseEntity<DocumentCategorieDto> update(@RequestBody DocumentCategorieDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of documentCategorie")
    @PostMapping("multiple")
    public ResponseEntity<List<DocumentCategorieDto>> delete(@RequestBody List<DocumentCategorieDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified documentCategorie")
    @DeleteMapping("")
    public ResponseEntity<DocumentCategorieDto> delete(@RequestBody DocumentCategorieDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified documentCategorie")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple documentCategories by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds a documentCategorie and associated list by id")
    @GetMapping("detail/id/{id}")
    public ResponseEntity<DocumentCategorieDto> findWithAssociatedLists(@PathVariable Long id) {
        return super.findWithAssociatedLists(id);
    }

    @ApiOperation("Finds documentCategories by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<DocumentCategorieDto>> findByCriteria(@RequestBody DocumentCategorieCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated documentCategories by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody DocumentCategorieCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentCategories by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody DocumentCategorieCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets documentCategorie data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody DocumentCategorieCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets documentCategorie history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets documentCategorie paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody DocumentCategorieHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentCategorie history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody DocumentCategorieHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets documentCategorie history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody DocumentCategorieHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public DocumentCategorieRestAdmin (DocumentCategorieAdminService service, DocumentCategorieConverter converter) {
        super(service, converter);
    }


}