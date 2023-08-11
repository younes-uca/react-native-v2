package  ma.sir.ged;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.util.*;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.cache.annotation.EnableCaching;


import ma.sir.ged.bean.core.*;
import ma.sir.ged.service.facade.admin.*;

import ma.sir.ged.zynerator.security.common.AuthoritiesConstants;
import ma.sir.ged.zynerator.security.bean.User;
import ma.sir.ged.zynerator.security.bean.Permission;
import ma.sir.ged.zynerator.security.bean.Role;
import ma.sir.ged.zynerator.security.service.facade.UserService;
import ma.sir.ged.zynerator.security.service.facade.RoleService;


import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableCaching
//@EnableFeignClients("ma.sir.ged.required.facade")
public class GedApplication {
    public static ConfigurableApplicationContext ctx;

    public static void main(String[] args) {
        ctx=SpringApplication.run(GedApplication.class, args);
    }


    @Bean
    RestTemplate restTemplate(){
        return new RestTemplate();
    }
    @Autowired
    private ObjectMapper objectMapper;

    @Bean
    ObjectMapper objectMapper(){
        return new ObjectMapper();
    }
    public static ConfigurableApplicationContext getCtx() {
        return ctx;
    }

    @Bean
    public CommandLineRunner demo(UserService userService, RoleService roleService) {
    return (args) -> {
        if(false){




    // Role admin

        User userForAdmin = new User("admin");

        Role roleForAdmin = new Role();
        roleForAdmin.setAuthority(AuthoritiesConstants.ADMIN);
        List<Permission> permissionsForAdmin = new ArrayList<>();
        addPermissionForAdmin(permissionsForAdmin);
        roleForAdmin.setPermissions(permissionsForAdmin);
        if(userForAdmin.getRoles()==null)
            userForAdmin.setRoles(new ArrayList<>());

        userForAdmin.getRoles().add(roleForAdmin);
        userService.save(userForAdmin);


    // Role agent

        User userForAgent = new User("agent");

        Role roleForAgent = new Role();
        roleForAgent.setAuthority(AuthoritiesConstants.AGENT);
        List<Permission> permissionsForAgent = new ArrayList<>();
        addPermissionForAgent(permissionsForAgent);
        roleForAgent.setPermissions(permissionsForAgent);
        if(userForAgent.getRoles()==null)
            userForAgent.setRoles(new ArrayList<>());

        userForAgent.getRoles().add(roleForAgent);
        userService.save(userForAgent);
            }
        };
    }




    private static String fakeString(String attributeName, int i) {
        return attributeName + i;
    }

    private static Long fakeLong(String attributeName, int i) {
        return  10L * i;
    }
    private static Integer fakeInteger(String attributeName, int i) {
        return  10 * i;
    }

    private static Double fakeDouble(String attributeName, int i) {
        return 10D * i;
    }

    private static BigDecimal fakeBigDecimal(String attributeName, int i) {
        return  BigDecimal.valueOf(i*1L*10);
    }

    private static Boolean fakeBoolean(String attributeName, int i) {
        return i % 2 == 0 ? true : false;
    }
    private static LocalDateTime fakeLocalDateTime(String attributeName, int i) {
        return LocalDateTime.now().plusDays(i);
    }
    private static void addPermissionForAdmin(List<Permission> permissions){
        permissions.add(new Permission("Purchase.edit"));
        permissions.add(new Permission("Purchase.list"));
        permissions.add(new Permission("Purchase.view"));
        permissions.add(new Permission("Purchase.add"));
        permissions.add(new Permission("Purchase.delete"));
        permissions.add(new Permission("Product.edit"));
        permissions.add(new Permission("Product.list"));
        permissions.add(new Permission("Product.view"));
        permissions.add(new Permission("Product.add"));
        permissions.add(new Permission("Product.delete"));
        permissions.add(new Permission("ClientCategory.edit"));
        permissions.add(new Permission("ClientCategory.list"));
        permissions.add(new Permission("ClientCategory.view"));
        permissions.add(new Permission("ClientCategory.add"));
        permissions.add(new Permission("ClientCategory.delete"));
        permissions.add(new Permission("Client.edit"));
        permissions.add(new Permission("Client.list"));
        permissions.add(new Permission("Client.view"));
        permissions.add(new Permission("Client.add"));
        permissions.add(new Permission("Client.delete"));
        permissions.add(new Permission("PurchaseItem.edit"));
        permissions.add(new Permission("PurchaseItem.list"));
        permissions.add(new Permission("PurchaseItem.view"));
        permissions.add(new Permission("PurchaseItem.add"));
        permissions.add(new Permission("PurchaseItem.delete"));
    }
    private static void addPermissionForAgent(List<Permission> permissions){
        permissions.add(new Permission("Purchase.edit"));
        permissions.add(new Permission("Purchase.list"));
        permissions.add(new Permission("Purchase.view"));
        permissions.add(new Permission("Purchase.add"));
        permissions.add(new Permission("Purchase.delete"));
        permissions.add(new Permission("Product.edit"));
        permissions.add(new Permission("Product.list"));
        permissions.add(new Permission("Product.view"));
        permissions.add(new Permission("Product.add"));
        permissions.add(new Permission("Product.delete"));
        permissions.add(new Permission("ClientCategory.edit"));
        permissions.add(new Permission("ClientCategory.list"));
        permissions.add(new Permission("ClientCategory.view"));
        permissions.add(new Permission("ClientCategory.add"));
        permissions.add(new Permission("ClientCategory.delete"));
        permissions.add(new Permission("Client.edit"));
        permissions.add(new Permission("Client.list"));
        permissions.add(new Permission("Client.view"));
        permissions.add(new Permission("Client.add"));
        permissions.add(new Permission("Client.delete"));
        permissions.add(new Permission("PurchaseItem.edit"));
        permissions.add(new Permission("PurchaseItem.list"));
        permissions.add(new Permission("PurchaseItem.view"));
        permissions.add(new Permission("PurchaseItem.add"));
        permissions.add(new Permission("PurchaseItem.delete"));
    }

}


