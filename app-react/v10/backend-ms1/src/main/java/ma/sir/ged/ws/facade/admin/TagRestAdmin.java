package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.Tag;
import ma.sir.ged.bean.history.TagHistory;
import ma.sir.ged.dao.criteria.core.TagCriteria;
import ma.sir.ged.dao.criteria.history.TagHistoryCriteria;
import ma.sir.ged.service.facade.admin.TagAdminService;
import ma.sir.ged.ws.converter.TagConverter;
import ma.sir.ged.ws.dto.TagDto;
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

@Api("Manages tag services")
@RestController
@RequestMapping("/api/admin/tag/")
public class TagRestAdmin  extends AbstractController<Tag, TagDto, TagHistory, TagCriteria, TagHistoryCriteria, TagAdminService, TagConverter> {



    @ApiOperation("upload one tag")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple tags")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all tags")
    @GetMapping("")
    public ResponseEntity<List<TagDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all tags")
    @GetMapping("optimized")
    public ResponseEntity<List<TagDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a tag by id")
    @GetMapping("id/{id}")
    public ResponseEntity<TagDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  tag")
    @PostMapping("")
    public ResponseEntity<TagDto> save(@RequestBody TagDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  tag")
    @PutMapping("")
    public ResponseEntity<TagDto> update(@RequestBody TagDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of tag")
    @PostMapping("multiple")
    public ResponseEntity<List<TagDto>> delete(@RequestBody List<TagDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified tag")
    @DeleteMapping("")
    public ResponseEntity<TagDto> delete(@RequestBody TagDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified tag")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple tags by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds tags by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<TagDto>> findByCriteria(@RequestBody TagCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated tags by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody TagCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports tags by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody TagCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets tag data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody TagCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets tag history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets tag paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody TagHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports tag history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody TagHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets tag history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody TagHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public TagRestAdmin (TagAdminService service, TagConverter converter) {
        super(service, converter);
    }


}