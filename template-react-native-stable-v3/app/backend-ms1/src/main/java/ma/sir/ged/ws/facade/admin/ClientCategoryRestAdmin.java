package  ma.sir.ged.ws.facade.admin;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ma.sir.ged.bean.core.ClientCategory;
import ma.sir.ged.bean.history.ClientCategoryHistory;
import ma.sir.ged.dao.criteria.core.ClientCategoryCriteria;
import ma.sir.ged.dao.criteria.history.ClientCategoryHistoryCriteria;
import ma.sir.ged.service.facade.admin.ClientCategoryAdminService;
import ma.sir.ged.ws.converter.ClientCategoryConverter;
import ma.sir.ged.ws.dto.ClientCategoryDto;
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

@Api("Manages clientCategory services")
@RestController
@RequestMapping("/api/admin/clientCategory/")
public class ClientCategoryRestAdmin  extends AbstractController<ClientCategory, ClientCategoryDto, ClientCategoryHistory, ClientCategoryCriteria, ClientCategoryHistoryCriteria, ClientCategoryAdminService, ClientCategoryConverter> {



    @ApiOperation("upload one clientCategory")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @ApiOperation("upload multiple clientCategorys")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @ApiOperation("Finds a list of all clientCategorys")
    @GetMapping("")
    public ResponseEntity<List<ClientCategoryDto>> findAll() throws Exception {
        return super.findAll();
    }

    @ApiOperation("Finds an optimized list of all clientCategorys")
    @GetMapping("optimized")
    public ResponseEntity<List<ClientCategoryDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @ApiOperation("Finds a clientCategory by id")
    @GetMapping("id/{id}")
    public ResponseEntity<ClientCategoryDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @ApiOperation("Saves the specified  clientCategory")
    @PostMapping("")
    public ResponseEntity<ClientCategoryDto> save(@RequestBody ClientCategoryDto dto) throws Exception {
        return super.save(dto);
    }

    @ApiOperation("Updates the specified  clientCategory")
    @PutMapping("")
    public ResponseEntity<ClientCategoryDto> update(@RequestBody ClientCategoryDto dto) throws Exception {
        return super.update(dto);
    }

    @ApiOperation("Delete list of clientCategory")
    @PostMapping("multiple")
    public ResponseEntity<List<ClientCategoryDto>> delete(@RequestBody List<ClientCategoryDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @ApiOperation("Delete the specified clientCategory")
    @DeleteMapping("")
    public ResponseEntity<ClientCategoryDto> delete(@RequestBody ClientCategoryDto dto) throws Exception {
            return super.delete(dto);
    }

    @ApiOperation("Delete the specified clientCategory")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @ApiOperation("Delete multiple clientCategorys by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @ApiOperation("Finds clientCategorys by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<ClientCategoryDto>> findByCriteria(@RequestBody ClientCategoryCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @ApiOperation("Finds paginated clientCategorys by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody ClientCategoryCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports clientCategorys by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody ClientCategoryCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @ApiOperation("Gets clientCategory data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody ClientCategoryCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @ApiOperation("Gets clientCategory history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @ApiOperation("Gets clientCategory paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody ClientCategoryHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @ApiOperation("Exports clientCategory history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody ClientCategoryHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @ApiOperation("Gets clientCategory history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody ClientCategoryHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }
    public ClientCategoryRestAdmin (ClientCategoryAdminService service, ClientCategoryConverter converter) {
        super(service, converter);
    }


}