package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.DocumentPartageGroupe;
import ma.sir.ged.bean.history.DocumentPartageGroupeHistory;
import ma.sir.ged.dao.criteria.core.DocumentPartageGroupeCriteria;
import ma.sir.ged.dao.criteria.history.DocumentPartageGroupeHistoryCriteria;
import ma.sir.ged.service.facade.admin.DocumentPartageGroupeAdminService;
import ma.sir.ged.ws.converter.DocumentPartageGroupeConverter;
import ma.sir.ged.ws.dto.DocumentPartageGroupeDto;
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

@Api("Manages documentPartageGroupe services")
@RestController
@RequestMapping("/api/admin/documentPartageGroupe/")
public class DocumentPartageGroupeRestAdmin  extends AbstractController<DocumentPartageGroupe, DocumentPartageGroupeDto, DocumentPartageGroupeHistory, DocumentPartageGroupeCriteria, DocumentPartageGroupeHistoryCriteria, DocumentPartageGroupeAdminService, DocumentPartageGroupeConverter> {



    @ApiOperation("upload one documentPartageGroupe")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple documentPartageGroupes")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all documentPartageGroupes")
    @GetMapping("")
    public ResponseEntity<List<DocumentPartageGroupeDto>> findAll() throws Exception {
        return super.findAll();
    }


    @ApiOperation("Finds a documentPartageGroupe by id")
    @GetMapping("id/{id}")
    public ResponseEntity<DocumentPartageGroupeDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  documentPartageGroupe")
    @PostMapping("")
    public ResponseEntity<DocumentPartageGroupeDto> save(@RequestBody DocumentPartageGroupeDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  documentPartageGroupe")
    @PutMapping("")
    public ResponseEntity<DocumentPartageGroupeDto> update(@RequestBody DocumentPartageGroupeDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of documentPartageGroupe")
    @PostMapping("multiple")
    public ResponseEntity<List<DocumentPartageGroupeDto>> delete(@RequestBody List<DocumentPartageGroupeDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified documentPartageGroupe")
    @DeleteMapping("")
    public ResponseEntity<DocumentPartageGroupeDto> delete(@RequestBody DocumentPartageGroupeDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified documentPartageGroupe")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple documentPartageGroupes by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("find by document id")
    @GetMapping("document/id/{id}")
    public List<DocumentPartageGroupe> findByDocumentId(@PathVariable Long id){
        return service.findByDocumentId(id);
    }
    @ApiOperation("delete by document id")
    @DeleteMapping("document/id/{id}")
    public int deleteByDocumentId(@PathVariable Long id){
        return service.deleteByDocumentId(id);
    }
    @ApiOperation("find by groupe id")
    @GetMapping("groupe/id/{id}")
    public List<DocumentPartageGroupe> findByGroupeId(@PathVariable Long id){
        return service.findByGroupeId(id);
    }
    @ApiOperation("delete by groupe id")
    @DeleteMapping("groupe/id/{id}")
    public int deleteByGroupeId(@PathVariable Long id){
        return service.deleteByGroupeId(id);
    }
    @ApiOperation("find by accessShare id")
    @GetMapping("accessShare/id/{id}")
    public List<DocumentPartageGroupe> findByAccessShareId(@PathVariable Long id){
        return service.findByAccessShareId(id);
    }
    @ApiOperation("delete by accessShare id")
    @DeleteMapping("accessShare/id/{id}")
    public int deleteByAccessShareId(@PathVariable Long id){
        return service.deleteByAccessShareId(id);
    }
    @ApiOperation("Finds documentPartageGroupes by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<DocumentPartageGroupeDto>> findByCriteria(@RequestBody DocumentPartageGroupeCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated documentPartageGroupes by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody DocumentPartageGroupeCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentPartageGroupes by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody DocumentPartageGroupeCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets documentPartageGroupe data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody DocumentPartageGroupeCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets documentPartageGroupe history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets documentPartageGroupe paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody DocumentPartageGroupeHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports documentPartageGroupe history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody DocumentPartageGroupeHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets documentPartageGroupe history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody DocumentPartageGroupeHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public DocumentPartageGroupeRestAdmin (DocumentPartageGroupeAdminService service, DocumentPartageGroupeConverter converter) {
        super(service, converter);
    }


}