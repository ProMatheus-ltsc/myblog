# SpringBoot简介 
[[TOC]]

## 关于SpringBoot
Spring Boot框架主要解决了创建工程后需要进行繁琐的配置的问题，是一个“开箱即用”的框架，其核心思想是“约定大于配置”。
## 创建SpringBoot工程
使用IntelliJ IDEA的创建向导中的`Spring Initializer`即可创建Spring Boot工程。

在创建时，如果 https://start.spring.io 无响应，可尝试替换为 https://start.springboot.io。

在创建过程中，需要填写并关注的几项有：

- Group Id：组Id，通常是公司的域名倒序排列的结果，例如`cn.tedu`
- Artifact Id：坐标Id，应该是此工程的名称，如果名称中有多个单词，应该使用减号分隔，例如`boot-demo`
- Java Version：使用到的Java版本，目前推荐选择`8`
- Package：项目的根包，默认是由以上填写的`Group Id`和`Artifact Id`组成

**注意：如果`Artifact Id`中使用减号分隔了多个单词，在`Package`中默认并没有分开，通常建议手动添加小数点（`.`）进行分隔**

**注意：此处`Package`决定了默认的组件扫描，所以，在后续开发代码时，所有的组件类都必须放在此包或其子孙包下，在开发实践中，其实会把所有创建的类、接口都放在此包或其子孙包下，不是组件的类不添加组件即可**

**注意：当工程已经创建出来后，不要修改包的名称，除非你已经掌握了解决方案！**

在添加依赖项时，首先需要注意的就是Spring Boot的版本号，通常非常不建议使用较新的版本号，建议使用的是半年或1年之内的版本即可！如果在创建向导的界面没有需要的版本号，可以随便选一下，当项目创建成功后，打开`pom.xml`，修改`<parent>`子级的`<version>`节点的值即可。

当项目创建成功后，在`src/main/java`下默认就存在一个包，是由创建项目时填写的`Package`决定的，就是当前项目组件扫描的包，相当于默认就有了`@ComponentScan("cn.tedu.boot.demo")`。

项目中默认就存在`BootDemoApplication`类，此类的名称是由创建项目时填写的`Artifact Id`加上`Application`单词组成的，这个类名称是可以改的，这个类中有`main()`方法，执行此方法就会启动整个项目，将加载项目中所有依赖所需的环境。

在`src/main/resources`下默认存在`application.properties`配置文件，它是项目默认会加载的配置文件。另外，Spring Boot的自动配置机制要求此处的许多配置是使用固定的属性名的！

小结：

- 创建项目后默认的Package不要修改，避免出错
- 在编码过程中，自行创建的所有类、接口均放在默认的Package或其子孙包中
- 在`src\main\java`下默认已存在`XxxApplication`是启动类，执行此类中的`main()`方法就会启动整个项目
- 启动类本身也是配置类
- 配置都应该编写到`src\main\resources`下的`application.properties`中，Spring Boot会自动读取
- 测试类也必须放在`src\test\java`下的默认Package或其子孙包中
- 在测试类上添加`@SpringBootTest`注解，则其中的测试方法执行之前会自动加载Spring环境及当前项目的配置，可以在测试类中使用自动装配
## 当前案例目标
客户端发出请求，最终增加管理员信息。
## 开发数据访问层
### 在Spring Boot工程中使用Mybatis

需要添加相关依赖项：

- `mysql-connector-java`
- `mybatis-spring-boot-starter`

其依赖的代码为：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>
```

说明：在Spring Boot工程，许多依赖项都是不需要显式的指定版本号的，因为在父项目中已经对这些依赖项的版本进行了管理（配置版本号），如果一定需要使用特定的版本，也可以自行添加`<version>`节点进行配置

说明：在依赖项的源代码中，当`<scope>`的值为`runtime`时，表示此依赖项是运行过程中需要的，但是，在编译时并不需要参与编译

需要注意：当添加了以上数据库编程的依赖后，如果启动项目，将失败！

因为添加了数据库编程的依赖项后，Spring Boot就会尝试自动装配数据源（`DataSource`）等对象，装配时所需的连接数据库的配置信息（例如URL、登录数据库的用户名和密码）应该是配置在`application.properties`中的，但是，如果尚未配置，就会导致失败！

关于连接数据库的配置信息，Spring Boot要求对应的属性名是：

```
# 连接数据库的URL
spring.datasource.url=???
# 登录数据库的用户名
spring.datasource.username=???
# 登录数据库的密码
spring.datasource.password=???
```

在配置时，也必须使用以上属性名进行配置，则Spring Boot会自动读取这些属性对应的值，用于创建数据源对象！

例如，配置为：

```
# 连接数据库的URL
spring.datasource.url=jdbc:mysql://localhost:3306/mall_ams?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
# 登录数据库的用户名
spring.datasource.username=root
# 登录数据库的密码
spring.datasource.password=1234
```

由于Spring Boot在启动时只是加载以上配置，并不会实际的连接到数据库，所以，当以上配置存在时，启动就不会报错，但是，无法检验以上配置的值是否正确！

可以在测试类中添加测试方法，尝试连接数据库，以检验以上配置值是否正确：

```java
@SpringBootTest
class BootDemoApplicationTests {

    @Autowired
    DataSource dataSource;

    @Test
    void testGetConnection() throws Exception {
        System.out.println(dataSource.getConnection());
    }

}
```

如果以上测试通过，则表示配置值无误，可以正确连接到数据库，如果测试失败，则表示配置值错误，需检查配置值及本地环境（例如MySQL是否启动、是否已创建对应的数据库等）。


### 关于Profile配置

在实际的开发过程，所使用的配置文件一般是本地的配置，而服务器上面的配置会和本地的配置不同，比如日志输出级别、数据库地址、数据库密码等，在开发环境下的密码可能很简单甚至没有密码，而生产环境不同，生产环境肯定是需要设置密码的，而在开发迭代的过程中，需要不断将更新后的程序部署到服务器，不能每次都将配置文件改过去改过来，当配置文件非常多的时候，麻烦不说，还非常的容易出错，所以需要生产环境一套配置，开发环境一套配置，并且可以很方便的切换。Spring 的配置文件提供了这样的功能。

在Spring Boot中，对Profile配置有很好的支持，开发人员可以在src\main\resources下创建更多的配置文件，这些配置文件的名称应该是application-???.properties（其中的???是某个名称，是自定义的）。

application.properties则提供公共配置，在application.properties中使用spring.profiles.active属性激活，可以激活多个配置，不同配置使用逗号分隔。

例如：
- 仅在开发环境中使用的配置值可以写在application-dev.properties中
- 仅在测试环境中使用的配置值可以写在application-test.properties中
- 仅在生产环境（项目上线的环境）中使用的配置值可以写在application-prod.properties中


当把配置写在以上这类文件后，Spring Boot默认并不会应用以上这些文件中的配置，当需要应用某个配置时，需要在application.properties中激活某个Profile配置，例如：

```xml
# 激活Profile配置
spring.profiles.active=dev
```

提示：以上配置值中的dev是需要激活的配置文件的文件名后缀，当配置为dev时，就会激活application-dev.properties，同理，如果以上配置值为test，就会激活application-test.properties。


### 使用Druid数据库连接池
Druid数据库连接是阿里巴巴团队研发的，在Spring Boot项目中，如果需要显式的指定使用此连接池，首先，需要在项目中添加依赖：
```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.20</version>
</dependency>
```

当添加了此依赖，在项目中需要应用时，需要在配置文件中指定spring.datasource.type属性，取值为以上依赖项的jar包中的DruidDataSource类型的全限定名。

例如，在yml中配置为：
```
# Spring系列框架的配置
spring:
  # 连接数据库的相关配置
  datasource:
    # 使用的数据库连接池类型
    type: com.alibaba.druid.pool.DruidDataSource
```


### 创建与数据表对应的实体类

在编写POJO类型（包括实体类、VO、DTO等）时，都有统一的编码规范，例如：

- 属性都是私有的
- 所有属性都有对应的Setter & Getter方法
- 应该重写`equals()`和`hashCode()`方法，以保证：如果2个对象的字面值完全相同，则`equals()`对比结果为`true`，且`hashCode()`返回值相同，如果2个对象的字面值不相同，则`equals()`对比结果为`false`，且`hashCode()`返回值不同
- 实现`Serializable`接口

另外，为了便于观察对象的各属性值，通常还会重写`toString()`方法。

由于以上操作方式非常固定，且涉及的代码量虽然不难，但是篇幅较长，并且，当类中的属性需要修改时（包括修改原有属性、或增加新属性、删除原有属性），对应的其它方法都需要修改（或重新生成），管理起来比较麻烦。

使用Lombok框架可以极大的简化这些操作，此框架可以通过注解的方式，在**编译期**来生成Setters & Getters、`equals()`、`hashCode()`、`toString()`，甚至生成构造方法等，所以，一旦使用此框架，开发人员就只需要在类中声明各属性、实现`Serializable`、添加Lombok指定的注解即可。

为了简化编写POJO类，通常会在项目中添加`Lombok`依赖：

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```


提示：当使用了`Lombok`后，应该在开发工具中安装Lombok插件，否则，在编写代码时，所有相关的Setters & Getters都没有自动提示，也会报告语法错误，但是不影响运行。

在插入数据时，需要使用实体类封装即将插入到表中的多个数据，则在`cn.tedu.boot.demo`包下创建`entity`子包，并在其下创建`Admin`类：

```java
@Data
public class Admin implements Serializable {
    
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String avatar;
    private String phone;
    private String email;
    private String description;
    private Integer isEnable;
    private String lastLoginIp;
    private Integer loginCount;
    private LocalDateTime gmtLastLogin;
    private LocalDateTime gmtCreate;
    private LocalDateTime gmtModified;
    
}
```

### 插入管理员数据

要执行的SQL语句大致是：

```mysql
insert into ams_admin (除了id以外的字段列表……) values (值列表)
```

则在`cn.tedu.boot.demo`包下创建`mapper`子包，并在其下创建`AdminMapper`接口，在接口中添加抽象方法：

```java
package cn.tedu.boot.demo.mapper;

import cn.tedu.boot.demo.entity.Admin;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {

    int insert(Admin admin);

}
```

还需要进行配置，使得Mybatis知道这些接口文件在哪里！则在`cn.tedu.boot.demo`下创建`config`包，并在此包下创建`MybatisConfiguration`类，通过`@MapperScan`配置接口文件所在的包：

```java
package cn.tedu.boot.demo.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("cn.tedu.boot.demo.mapper")
public class MybatisConfiguration {
}
```

提示：关于`@MapperScan`注解，还可以配置在项目的启动类上（`BootDemoApplication`），因为启动类上有`@SpringBootApplication`注解，其元注解中有`@SpringBootConfiguration`，其元注解中有`@Configuration`，所以，启动类本身也是配置类！但是，如果项目中的配置较多，不建议全部写在启动类中，所以，可以分为多个配置类，独立配置。

接下来，在`src/main/resources`下创建`mapper`文件夹，并从前序项目中复制粘贴得到`AdminMapper.xml`文件（删除原文件中已经配置的SQL等代码），然后，在此文件中配置抽象方法映射的SQL：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="cn.tedu.boot.demo.mapper.AdminMapper">

    <!-- int insert(Admin admin); -->
    <insert id="insert" useGeneratedKeys="true" keyProperty="id">
        insert into ams_admin (
            username, password, nickname, avatar,
            phone, email, description, is_enable,
            last_login_ip, login_count, gmt_last_login, gmt_create,
            gmt_modified
        ) values (
            #{username}, #{password}, #{nickname}, #{avatar},
            #{phone}, #{email}, #{description}, #{isEnable},
            #{lastLoginIp}, #{loginCount}, #{gmtLastLogin}, #{gmtCreate},
            #{gmtModified}
        )
    </insert>

</mapper>
```

完成后，还是应该配置这些XML文件的位置，需要在`application.properties`中添加配置：

```
mybatis.mapper-locations=classpath:mapper/*.xml
```

接下来，应该通过测试检验以上代码是否可以正确运行，为了保证测试时可以正确的断言，应该在`src/test`下创建`resources`文件夹，并从前序项目中复制脚本文件，至少包含清空并还原数据表、插入测试数据这2个脚本文件。

然后，在`src/test/java`下的`cn.tedu.boot.demo`包下创建`mapper`子包，并在其下创建`AdminMapperTests`测试类，在类上添加`@SpringBootTest`注解，在类中自动装配`AdminMapper`类型的对象，并编写、执行测试：

```java
package cn.tedu.boot.demo.mapper;

import cn.tedu.boot.demo.entity.Admin;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
public class AdminMapperTests {

    @Autowired
    AdminMapper mapper;

    // 测试插入数据是成功的
    @Test
    @Sql(scripts = {"classpath:truncate.sql"})
    @Sql(scripts = {"classpath:truncate.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testInsertSuccessfully() {
        // 准备测试数据
        String username = "admin001";
        String password = "000000";
        Admin admin = new Admin();
        admin.setUsername(username);
        admin.setPassword(password);
        // 断言测试过程中不会抛出异常
        Assertions.assertDoesNotThrow(() -> {
            // 执行测试
            int rows = mapper.insert(admin);
            // 断言结果
            Assertions.assertEquals(1, rows);
            Assertions.assertEquals(1L, admin.getId());
        });
    }

}
```
## 业务逻辑层

### 关于业务逻辑层
业务逻辑层是制定数据访问规则的层，此前的数据访问层只有功能，没有规则，例如执行“插入管理员数据”，则对应的方法就一定会执行，并不考虑是否合理，有关“合理”、“是否允许”等这样规则都是通过业务逻辑层来实现的。

业务逻辑层是数据访问层的调用者，通过调用相关的功能来保证规则的合理性、完整性、有效性！例如，在业务逻辑层中，可以先调用“根据用户名查询管理员信息”，再根据调用的返回值来决定是否执行“插入管理员数据”，就可以保证“每个管理员的用户名都是唯一的”这样的规则。

另外，业务逻辑层还需要考虑数据的完整性，因为在执行数据访问时，并不是所有必须的数据都会由客户端提交过来，在这样的过程中，业务逻辑层就需要补全一些数据，例如在“增加管理员”时，“是否启用”可能不会设计为客户端提交的数据，则业务逻辑层就可以补全此属性再调用数据访问进行插入数据操作。

对于一些特殊的数据，可能还需要在业务逻辑层中进行特殊的处理，以保证数据的合理性或有效性，典型的例如各用户的密码，由客户端提交过来的密码通常是明文，在业务逻辑层就应该对密码进行加密处理，并得到密文，然后再向数据库中写入。

在实际编写代码时，业务逻辑层的关键字是`Service`，通常业务逻辑层的类或接口名中都有此关键字。

业务逻辑层通常有2个部分，一个是接口，另一个是此接口的实现类。

**注意：强烈建议在业务逻辑层先定义接口，再编写实现类！这样做是一种基于接口编程的做法，是提倡的，并且，在后续使用基于Spring JDBC的事务管理中，也要求业务逻辑层必须有接口！**

在编写业务逻辑层，所有视为“失败”的情况都应该将异常抛出，而不要处理！

### 自定义异常
为了更好的在业务逻辑层表现“错误”（操作失败，例如增加管理员时，用户名已存在，即视为错误），应该自定义一些异常类型，并在处理业务逻辑的过程中，当出现错误时抛出异常！

则在`cn.tedu.boot.demo`下创建`ex`子包，并在其下创建`ServiceException`异常类，继承自`RuntimeException`，并且，至少添加带`String`参数的构造方法，便于抛出异常时可以快捷封装错误的描述文本。

```java
package cn.tedu.boot.demo.ex;

public class ServiceException extends RuntimeException {
    
    public ServiceException() {
    }

    public ServiceException(String message) {
        super(message);
    }
    
}
```

提示：自定义的业务异常应该继承自`RuntimeException`，因为当抛出`RuntimeException`对象时，不需要在方法的声明上使用`throws`声明抛出，并且，此方法的调用者还必须通过`try...catch`或`throws`解决语法问题，同时，由于业务逻辑层不适合处理异常，应该始终抛出，并且，业务逻辑层的调用者是控制器层，在Spring MVC中有统一处理异常的机制，所以在控制器中也应该是始终抛出即可，那么，对于异常的语法使用是固定的，而使用`RuntimeException`就可以避免受到语法的约束！另外，在后续基于Spring JDBC的事务管理中，默认也是根据`RuntimeException`进行失败的处理的！

### 业务接口与抽象方法

需要自定义类型将“增加管理员”的各数据封装起来，则在`cn.tedu.boot.demo`下创建`dto`子包，并在其下创建`AdminAddNewDTO`类，并在这个类中声明各属性：

```java
@Data
public class AdminAddNewDTO implements Serializable {
    private String username;
    private String password;
    private String nickname;
}
```

在`cn.tedu.boot.demo`包下创建`service`子包，并在其下创建`IAdminService`接口，并在接口中声明“增加管理员”的抽象方法：

```java
public interface IAdminService {
    
    void addNew(AdminAddNewDTO adminAddNewDTO);
    
}
```

提示：在业务逻辑层的抽象方法中，设计返回值时，仅以操作成功为前提来设计即可，因为所有的失败都会通过抛出异常的方式来表现。

提示：关于抽象方法的参数，如果参数的数量较少，直接声明即可，如果参数数量较多，则应该封装，在封装时，应该注意“将客户端会提交的数据封装在一起，如果某些数据不是客户端提交过来的，则不要封装在一起”。

### 关于SLF4j

在开发实践中，**不允许**使用`System.out.println()`或类似的输出语句来输出显示关键数据（核心数据、敏感数据等），因为，如果是这样使用，无论是在开发环境，还是测试环境，还是生产环境中，这些输出语句都将输出相关信息，而删除或添加这些输出语句的操作成本比较高，操作可行性低。

推荐的做法是使用日志框架来输出相关信息！

当添加了Lombok依赖后，可以在需要使用日志的类上添加`@Slf4j`注解，然后，在类的任意中，均可使用名为`log`的变量，且调用其方法来输出日志（名为`log`的变量也是Lombok框架在编译期自动补充的声明并创建对象）！

SLF4j是一款主流的日志框架，用于在代码中添加一些输出日志的语句，最终这些日志可以输出到控制台，或文件，甚至数据库中。

在SLF4j日志框架中，会将日志的重要程度分为几个级别，常用级别中，从不重要到非常重要，依次是：

- trace：跟踪
- debug：调试
- info：一般信息（默认）
- warn：警告
- error：错误

在使用时，可以控制日志的显示级别，较低级别的将不会被显示，例如：

- 当显示级别为`info`时，只会显示`info`、`warn`、`error`
- 当显示级别为`debug`时，只会显示`debug`、`info`、`warn`、`error`
- 当显示级别为`trace`时，会显示所有级别的日志

**在开发实践中，关键数据和敏感数据都应该通过`trace()`或`debug()`进行输出，在开发环境中，可以将日志的显示级别设置为`trace`，则会显示所有日志，当需要交付到生产环境中时，只需要将日志的显示级别调整为`info`即可！**

在Spring Boot项目中，在`spring-boot-starter`中已经集成了日志的依赖项，是可以直接使用的！在`application.properties`中添加配置，可以控制日志的显示级别，例如：

```
logging.level.cn.tedu.boot.demo.service.impl=info
```

在以上属性名中，配置的包是“根包”，例如配置为`cn.tedu`时，其子孙包中都会应用此配置。

当项目中已经添加了Lombok依赖后，可以在需要输出日志的类上添加`@Slf4j`注解，然后，在类中就可以使用名为`log`的变量来输出日志！

输出日志的示例代码：

```java
log.trace("输出trace级别的日志");
log.debug("输出debug级别的日志");
log.info("输出info级别的日志");
log.warn("输出warn级别的日志");
log.error("输出error级别的日志");
```

在开发实践中，应该根据要输出的内容的敏感程度、重要性来选择调用某个方法，以输出对应级别的日志，例如涉及关键数据的应该使用`trace`或`debug`级别，这样的话，当交付项目时，将设置日志显示级别的配置删除，或显式的配置为`info`级别，则`trace`、`debug`级别的日志将不会被输出。

另外，`warn`和`error`级别的日志不受显示级别的限制。

关于输出日志的方法，都是被重载了多次的！如果输出的内容只是1个字符串，应该使用例如：

```java
public void debug(String msg);
```

如果这个字符串中需要拼接多个变量的值，则应该使用：

```java
public void debug(String format, Object... arguments);
```

使用示例如下：

```java
log.debug("已经对密码进行加密处理，原文={}，密文={}", rawPassword, encodedPassword);
```

以上这种做法会缓存、预编译字符串，再将值代入去执行，所以执行效率还远高于`System.out.println()`的输出语句！

默认情况下，日志的显示级别是`info`，所以，即使没有在配置文件中进行正确的配置，所有info、warn、error级别的日志都会输出显示。

在配置时，属性名称中的`logging.level`部分是必须的，在其后，必须写至少1级包名，例如：

```yml
logging.level.cn: trace
```

以上配置表示`cn`包及其子孙包下的所有类中的日志都按照`trace`级别进行显示！

在开发实践中，属性名称通常配置为`logging.level.项目根包`，例如：

```yml
logging.level.cn.tedu.boot.demo: trace
```

在使用Slf4j时，通过`log`调用的每种级别的方法都被重载了多次（各级别对应除了方法名称不同，重载的次数和参数列表均相同），推荐使用的方法是参数列表为`(String format, Object... arguments)`的，例如：

```java
public void trace(String format, Object... arguments);
public void debug(String format, Object... arguments);
public void info(String format, Object... arguments);
public void warn(String format, Object... arguments);
public void error(String format, Object... arguments);
```

以上方法中，第1个参数是将要输出的字符串的模式（模版），在此字符串中，如果需要包含某个变量值，则使用`{}`表示，如果有多个变量值，均是如此，然后，再通过第2个参数（是可变参数）依次表示各`{}`对应的值，例如：

```java
log.debug("加密前的密码：{}，加密后的密码：{}", password, encodedPassword);
```

使用这种做法，可以避免多变量时频繁的拼接字符串，另外，日志框架会将第1个参数进行缓存，以此提高后续每一次的执行效率。

另外，需要注意的是，SLF4j只是一个日志框架，它提供了使用日志的标准，并没有实现输出日志的具体功能，在现行版本的Spring Boot中，还依赖了SLF4j的具体实现，默认是`logback`框架。

### 业务实现
通常，会在`service`包下再创建`impl`子包，用于存放业务接口的实现类，并且，实现类的名称通常是“接口名（不包含首字母`I`） + `Impl`”。

业务实现类应该实现业务接口，并且，还应该添加`@Service`注解。

所以，在`cn.tedu.boot.demo.service.impl`中创建`AdminServiceImpl`类，实现`IAdminService`接口，在类上添加`@Service`注解，并重写接口中的抽象方法：

```java
package cn.tedu.boot.demo.service.impl;

import cn.tedu.boot.demo.dto.AdminAddNewDTO;
import cn.tedu.boot.demo.service.IAdminService;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements IAdminService {

    @Override
    public void addNew(AdminAddNewDTO adminAddNewDTO) {

    }
    
}
```

接下来，在编写业务方法（实现接口中的抽象方法）之前，应该整理此业务的编写思路：

```java
package cn.tedu.boot.demo.service.impl;

import cn.tedu.boot.demo.dto.AdminAddNewDTO;
import cn.tedu.boot.demo.entity.Admin;
import cn.tedu.boot.demo.ex.ServiceException;
import cn.tedu.boot.demo.mapper.AdminMapper;
import cn.tedu.boot.demo.service.IAdminService;
import cn.tedu.boot.demo.util.GlobalPasswordEncoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
public class AdminServiceImpl implements IAdminService {

    // 自动装配AdminMapper
    @Autowired
    private AdminMapper adminMapper;

    @Override
    public void addNew(AdminAddNewDTO adminAddNewDTO) {
        // 通过参数adminAddNewDTO中的username，调用AdminMapper的Admin getByUsername(String username)执行查询，并获取查询结果
        log.debug("即将增加管理员：{}", adminAddNewDTO);
        String username = adminAddNewDTO.getUsername();
        Admin queryResult = adminMapper.getByUsername(username);
        // 判断查询结果是否【不为null】
        if (queryResult != null) {
            // 是：表示用户名已经被占用，抛出ServiceException：增加管理员失败，用户名已经被占用
            log.warn("增加管理员失败，用户名（{}）已经被占用！", username);
            throw new ServiceException("增加管理员失败，用户名已经被占用！");
        }

        // 以参数adminAddNewDTO中的password作为明文，执行加密，得到密文密码
        String rawPassword = adminAddNewDTO.getPassword();
        String encodedPassword = GlobalPasswordEncoder.encode(rawPassword);
        log.debug("已经对密码进行加密处理，原文={}，密文={}", rawPassword, encodedPassword);

        // 创建新的Admin对象
        Admin admin = new Admin();
        // 为Admin对象的属性赋值：username,nickname来自参数adminAddNewDTO
        admin.setUsername(username);
        admin.setNickname(adminAddNewDTO.getNickname());
        // 为Admin对象的属性赋值：password > 密文密码
        admin.setPassword(encodedPassword);
        // 为Admin对象的属性赋值：avatar, phone, email, description保持为null
        // 为Admin对象的属性赋值：isEnable > 1
        admin.setIsEnable(1);
        // 为Admin对象的属性赋值：lastLoginIp > null
        // 为Admin对象的属性赋值：loginCount > 0
        admin.setLoginCount(0);
        // 为Admin对象的属性赋值：gmtLastLogin > null
        // 为Admin对象的属性赋值：gmtCreate, gmtModified > LocalDateTime.now()
        LocalDateTime now = LocalDateTime.now();
        admin.setGmtCreate(now);
        admin.setGmtModified(now);
        // 调用AdminMapper对象的int insert(Admin admin)方法插入管理员数据，并获取返回值
        log.debug("即将执行插入管理员数据：{}", admin);
        int rows = adminMapper.insert(admin);
        // 判断返回值是否不为1
        if (rows != 1) {
            // 抛出ServiceException：服务器忙，请稍后再次尝试
            log.warn("服务器忙，请稍后再次尝试！");
            throw new ServiceException("服务器忙，请稍后再次尝试！");
        }
    }

}
```

完成后，在`src/test/java`下的`cn.tedu.boot.demo`下创建`service`子包，并在其下创建`AdminServiceTests`测试类，编写并执行测试：

```java
package cn.tedu.boot.demo.service;

import cn.tedu.boot.demo.dto.AdminAddNewDTO;
import cn.tedu.boot.demo.ex.ServiceException;
import cn.tedu.boot.demo.service.impl.AdminServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
public class AdminServiceTests {

    @Autowired
    IAdminService service;

    @Test
    @Sql(scripts = {"classpath:truncate.sql"})
    @Sql(scripts = {"classpath:truncate.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testAddNewSuccessfully() {
        // 测试数据
        String username = "admin001";
        String password = "123456";
        String nickname = "管理员";
        AdminAddNewDTO adminAddNewDTO = new AdminAddNewDTO()
                .setUsername(username)
                .setPassword(password)
                .setNickname(nickname);
        // 断言不会抛出异常
        Assertions.assertDoesNotThrow(() -> {
            // 执行测试
            service.addNew(adminAddNewDTO);
        });
    }

    @Test
    @Sql(scripts = {"classpath:truncate.sql", "classpath:insert_data.sql"})
    @Sql(scripts = {"classpath:truncate.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testAddNewFailBecauseUsernameConflict() {
        // 测试数据
        String username = "admin001";
        String password = "123456";
        String nickname = "管理员";
        AdminAddNewDTO adminAddNewDTO = new AdminAddNewDTO()
                .setUsername(username)
                .setPassword(password)
                .setNickname(nickname);
        // 断言不会抛出异常
        Assertions.assertThrows(ServiceException.class, () -> {
            // 执行测试
            service.addNew(adminAddNewDTO);
        });
    }

}
```

## 控制器
### 处理依赖项

当需要开发控制器时，需要在项目中存在`spring-boot-starter-web`的依赖项，此依赖项将包含此前学习时涉及的`spring-webmvc`、`jackson-databind`等依赖项。

在具体操作方面，并不需要追加添加这个依赖项，只需要将`spring-boot-starter`改为`spring-boot-starter-web`即可，并且，在`spring-boot-starter-web`中也包含了`spring-boot-starter`，所以，对此项目原本的依赖也不产生影响。

### 简单开发

在`cn.tedu.boot.demo`下创建`controller`子包，并在其下创建`AdminController`类，作为处理“管理员”数据相关请求的控制器类，并在这个类中处理“增加管理员”的请求：

```java
package cn.tedu.boot.demo.controller;

import cn.tedu.boot.demo.dto.AdminAddNewDTO;
import cn.tedu.boot.demo.service.IAdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private IAdminService adminService;
    
    // http://localhost:8080/admin/add-new?username=admin001&password=1234&nickname=a001
    @RequestMapping("/add-new")
    public String addNew(AdminAddNewDTO adminAddNewDTO) {
        adminService.addNew(adminAddNewDTO);
        return "OK";
    }
    
}
```

因为`spring-boot-starter-web`中依赖了Tomcat，相当于每个Spring Boot工程都有一个内置的Tomcat，并且将Context Path配置为空字符串，所以在URL上并不需要添加其它路径，最后，启动项目时，就会自动打包部署此项目到内置的Tomcat上。

所以，执行`BootDemoApplication`，打开浏览器，通过 http://localhost:8080/admin/add-new?username=admin001&password=1234&nickname=a001 即可增加管理员。

以上只是简单的实现了数据访问，还需要解决的问题有：

- 响应的结果不是JSON格式
- 没有处理异常
- 需要提供在线API文档
- 没有对参数的基本格式进行检查

### 响应JSON格式的数据

将此前学习Spring MVC时设计的`JsonResult`复制到此项目的`cn.tedu.boot.demo.web`包中，并且将处理请求的方法的返回值类型改为`JsonResult`类型：

```java
// http://localhost:8080/admin/add-new?username=admin001&password=1234&nickname=a001
@RequestMapping("/add-new")
public JsonResult<Void> addNew(AdminAddNewDTO adminAddNewDTO) {
    adminService.addNew(adminAddNewDTO);
	return JsonResult.ok();
}
```

完成后，重启项目，通过正确的参数即可成功增加管理员，并且可以看到响应的结果是JSON格式的数据，例如：

```json
{"state":20000,"message":null,"data":null}
```

以上数据中，`message`和`data`都没有数据，是多余的！可以在`application.properties`中添加配置，以去除JSON数据中为`null`的部分：

```
spring.jackson.default-property-inclusion=non_null
```

重启服务后，响应的JSON数据中将不再包含为`null`的部分！

### 处理异常

目前，在业务逻辑层抛出了2种不同原因导致的异常，异常的类型是完全相同的，会导致处理异常时，无法判断是哪种情况导致的异常，所以，应该先改造异常类，在类中添加`State`属性，并要求通过构造方法传入，则每个异常对象中都会包含异常的状态码和错误时的文本描述：

```java
package cn.tedu.boot.demo.ex;

import cn.tedu.boot.demo.web.JsonResult;

public class ServiceException extends RuntimeException {

    private JsonResult.State state;

    public ServiceException() {
    }

    public ServiceException(JsonResult.State state, String message) {
        super(message);
        this.state = state;
    }

    public JsonResult.State getState() {
        return state;
    }

}
```

由于抛出异常时既包含了状态码，又包含了错误的描述文本，在`JsonResult`中还可以添加一个更加便捷的静态方法：

```java
public static JsonResult<Void> fail(ServiceException e) {
    return fail(e.getState(), e.getMessage());
}
```

为了保证能够对当前已分析的2种错误进行区分，应该在`State`枚举中添加对应的状态码：

```java
public enum State {
   OK(20000),
   ERR_CONFLICT(40900),
   ERR_INTERNAL_ERROR(50000);

   Integer value;

   State(Integer value) {
       this.value = value;
   }

   public Integer getValue() {
       return value;
   }
}
```

经过以上调整，原本的业务逻辑层的实现类将会报告错误，需要在创建并抛出异常时，除了传入错误的描述文本，还需要传入状态码

```java
@Override
public void addNew(AdminAddNewDTO adminAddNewDTO) {
    // 忽略此次不需要调整的代码... ...
    // 判断查询结果是否【不为null】
    if (queryResult != null) {
        // 是：表示用户名已经被占用，抛出ServiceException：增加管理员失败，用户名已经被占用
        log.warn("增加管理员失败，用户名（{}）已经被占用！", username);
        throw new ServiceException(JsonResult.State.ERR_CONFLICT, "增加管理员失败，用户名已经被占用！");
    }

    // 忽略此次不需要调整的代码... ...
    // 判断返回值是否不为1
    if (rows != 1) {
        // 抛出ServiceException：服务器忙，请稍后再次尝试
        log.warn("服务器忙，请稍后再次尝试！");
        throw new ServiceException(JsonResult.State.ERR_INTERNAL_ERROR, "服务器忙，请稍后再次尝试！");
    }
}
```

在`cn.tedu.boot.demo.controller`包下创建`handler`子包，并在其下创建`GlobalExceptionHandler`统一处理异常的类，在类上添加`@RestControllerAdvice`注解，并在类中处理异常。

```java
@RestControllerAdvicd
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ServiceException.class)
    public JsonResult<Void> handleServiceException(ServiceException e) {
        return JsonResult.fail(state, e.getMessage());
    }
    
}
```

### Validation框架


当客户端向服务器提交请求时，如果请求数据出现明显的问题（例如关键数据为`null`、字符串的长度不在可接受范围内、其它格式错误），应该直接响应错误，而不是将明显错误的请求参数传递到Service！

> 关于判断错误，只有涉及数据库中的数据才能判断出结果的，都由Service进行判断，而基本的格式判断，都由Controller进行判断。

Validation框架是专门用于解决**检查数据基本格式有效性**的，最早并不是Spring系列的框架，目前，Spring Boot提供了更好的支持，所以，通常结合在一起使用。

在Spring Boot项目中，需要添加`spring-boot-starter-validation`依赖项，例如：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
然后，在封装的POJO类的属性上配置检查相关注解，例如：

```java
@Data
@Accessors(chain = true)
public class AdminAddNewDTO implements Serializable {

    @NotNull(message = "增加管理员失败，必须提交用户名！")
    private String username;

    @NotNull(message = "增加管理员失败，必须提交密码！")
    private String password;

    @NotNull(message = "增加管理员失败，必须提交昵称！")
    private String nickname;

}
```

在控制器中，首先，对需要检查数据格式的请求参数添加`@Valid`或`@Validated`注解（这2个注解没有区别），例如：

```java
@RequestMapping("/add-new")
public JsonResult<Void> addNew(@Validated AdminAddNewDTO adminAddNewDTO) {
    adminService.addNew(adminAddNewDTO);
    return JsonResult.ok();
}
```

真正需要检查的是`AdminAddNewDTO`中各属性的值，所以，接下来需要在此类的各属性上通过注解来配置检查的规则，例如：

```java
@Data
public class AdminAddNewDTO implements Serializable {

    @NotNull // 验证规则为：不允许为null
    private String username;
    
    // ===== 原有其它代码 =====
    
}
```

重启项目，通过不提交用户名的URL（例如：http://localhost:8080/admins/add-new）进行访问，在浏览器上会出现400错误页面，并且，在IntelliJ IDEA的控制台会出现以下警告：

```
2022-06-07 11:37:53.424  WARN 6404 --- [nio-8080-exec-8] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [
org.springframework.validation.BindException: 
org.springframework.validation.BeanPropertyBindingResult: 1 errors<EOL>Field error in object 'adminAddNewDTO' on field 'username': rejected value [null]; codes [NotNull.adminAddNewDTO.username,NotNull.username,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.username,username]; arguments []; default message [username]]; default message [不能为null]]
```

从警告信息中可以看到，当验证失败时（不符合所使用的注解对应的规则时），会出现`org.springframework.validation.BindException`异常，则自行处理此异常即可！

如果有多个属性需要验证，则多个属性都需要添加注解，例如：

```java
@Data
public class AdminAddNewDTO implements Serializable {

    @NotNull
    private String username;

    @NotNull
    private String password;
    
    // ===== 原有其它代码 =====
    
}
```
由于Validation框架在验证不通过时会抛出`BindException`，则可以使用Spring MVC统一处理异常的机制进行处理！


首先，在`State`中添加新的枚举：

```java
public enum State {

    OK(200),
    ERR_USERNAME(201),
    ERR_PASSWORD(202),
    ERR_BAD_REQUEST(400), // 新增
    ERR_INSERT(500);
 
    // ===== 原有其它代码 =====
}
```

然后，在`GlobalExceptionHandler`中添加新的处理异常的方法：

```java
@ExceptionHandler(BindException.class)
public JsonResult<Void> handleBindException(BindException e) {
    return JsonResult.fail(State.ERR_BAD_REQUEST, e.getMessage());
}
```

完成后，再次重启项目，继续使用为`null`的用户名提交请求时，可以看到异常已经被处理，此时，响应的JSON数据例如：

```json
{
    "state":400,
    "message":"org.springframework.validation.BeanPropertyBindingResult: 2 errors\nField error in object 'adminAddNewDTO' on field 'username': rejected value [null]; codes [NotNull.adminAddNewDTO.username,NotNull.username,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.username,username]; arguments []; default message [username]]; default message [不能为null]\nField error in object 'adminAddNewDTO' on field 'password': rejected value [null]; codes [NotNull.adminAddNewDTO.password,NotNull.password,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.password,password]; arguments []; default message [password]]; default message [不能为null]"
}
```

关于错误提示信息，以上内容中出现了`不能为null`的字样，是默认的提示文本，可以通过`@NotNull`注解的`message`属性进行配置，例如：

```java
@Data
public class AdminAddNewDTO implements Serializable {

    @NotNull(message = "添加管理员失败，请提交用户名！")
    private String username;

    @NotNull(message = "添加管理员失败，请提交密码！")
    private String password;
    
    // ===== 原有其它代码 =====
    
}
```

然后，在处理异常时，通过异常信息获取自定义的提示文本：

```java
@ExceptionHandler(BindException.class)
public JsonResult<Void> handleBindException(BindException e) {
    BindingResult bindingResult = e.getBindingResult();
    String defaultMessage = bindingResult.getFieldError().getDefaultMessage();
    return JsonResult.fail(State.ERR_BAD_REQUEST, defaultMessage);
}
```

重启项目后，再次故意不提交某些请求参数，将响应类似以下结果：

```json
{
  "state": 40000,
  "message": "增加管理员失败，必须提交用户名！"
}
```

提示：当验证请求参数出现多种错误时，以上语句仅会随机的显示其中1个错误的描述文本。


再次运行，在不提交用户名和密码的情况下，会随机的提示用户名或密码验证失败的提示文本中的某1条。

在Validation框架中，还有其它许多注解，用于进行不同格式的验证，例如：

- `@NotEmpty`：只能添加在`String`类型上，不许为空字符串，例如`""`即视为空字符串
- `@NotBlank`：只能添加在`String`类型上，不允许为空白，例如普通的空格可视为空白，使用TAB键输入的内容也是空白，（虽然不太可能在此处出现）换行产生的空白区域也是空白
- `@Size`：限制大小
- `@Min`：限制最小值
- `@Max`：限制最大值
- `@Range`：可以配置`min`和`max`属性，同时限制最小值和最大值
- `@Pattern`：只能添加在`String`类型上，自行指定正则表达式进行验证
- 其它

以上注解，包括`@NotNull`是允许叠加使用的，即允许在同一个参数属性上添加多个注解！

以上注解均可以配置`message`属性，用于指定验证失败的提示文本。

通常：

- 对于必须提交的属性，都会添加`@NotNull`
- 对于数值类型的，需要考虑是否添加`@Range`（则不需要使用`@Min`和`@Max`）
- 对于字符串类型，都添加`@Pattern`注解进行验证


Spring MVC是用于处理控制器层开发的，在使用Spring Boot时，在`pom.xml`中添加`spring-boot-starter-web`即可整合Spring MVC框架及相关的常用依赖项（包含`jackson-databind`），可以将已存在的`spring-boot-starter`直接改为`spring-boot-starter-web`，因为在`spring-boot-starter-web`中已经包含了`spring-boot-starter`。

先在项目的根包下创建`controller`子包，并在此子包下创建`AdminController`，此类应该添加`@RestController`和`@RequestMapping(value = "/admins", produces = "application/json; charset=utf-8")`注解，例如：

```java
@RestController
@RequestMapping(values = "/admins", produces = "application/json; charset=utf-8")
public class AdminController {
    
}
```

由于已经决定了服务器端响应时，将响应JSON格式的字符串，为保证能够响应JSON格式的结果，处理请求的方法返回值应该是自定义的数据类型，则从此前学习的`spring-mvc`项目中找到`JsonResult`类及相关类型，复制到当前项目中来。

接下来，即可在`AdminController`中添加处理“增加管理员”的请求：

```java
@Autowired
private IAdminService adminService;

// 注意：暂时使用@RequestMapping，不要使用@PostMapping，以便于直接在浏览器中测试
// http://localhost:8080/admins/add-new?username=root&password=1234
@RequestMapping("/add-new") 
public JsonResult<Void> addNew(AdminAddNewDTO adminAddNewDTO) {
    adminService.addNew(adminAddNewDTO);
    return JsonResult.ok();
}
```

完成后，运行启动类，即可启动整个项目，在`spring-boot-starter-web`中，包含了Tomcat的依赖项，在启动时，会自动将当前项目打包并部署到此Tomcat上，所以，执行启动类时，会执行此Tomcat，同时，因为是内置的Tomcat，只为当前项目服务，所以，在将项目部署到Tomcat时，默认已经将Context Path（例如spring_mvc_war_exploded）配置为空字符串，所以，在启动项目后，访问的URL中并没有此前遇到的Context Path值。

当项目启动成功后，即可在浏览器的地址栏中输入网址进行测试访问！

**注意：如果是未添加的管理员账号，可以成功执行结束，如果管理员账号已经存在，由于尚未处理异常，会提示500错误。**

关于处理异常，应该先在`State`中确保有每种异常对应的枚举值，例如本次需要补充`InsertException`对应的枚举值：

```java
public enum State {

    OK(200),
    ERR_USERNAME(201),
    ERR_PASSWORD(202),
    ERR_INSERT(500); // 新增的枚举值

    // 原有其它代码

}
```

然后，在`cn.tedu.boot.demo.controller`下创建`handler.GlobalExceptionHandler`类，用于统一处理异常，例如：

```java
package cn.tedu.boot.demo.controller.handler;

import cn.tedu.boot.demo.ex.ServiceException;
import cn.tedu.boot.demo.ex.UsernameDuplicateException;
import cn.tedu.boot.demo.web.JsonResult;
import cn.tedu.boot.demo.web.State;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public JsonResult<Void> handleServiceException(ServiceException e) {
        if (e instanceof UsernameDuplicateException) {
            return JsonResult.fail(State.ERR_USERNAME, "用户名错误！");
        } else {
            return JsonResult.fail(State.ERR_INSERT, "插入数据失败！");
        }
    }

}
```

完成后，重新启动项目，当添加管理员时的用户名没有被占用时，将正常添加，当用户名已经被占用时，会根据处理异常的结果进行响应！

由于在统一处理异常的机制下，同一种异常，无论是在哪种业务中出现，处理异常时的描述信息都是完全相同的，也无法精准的表达错误信息，这是不合适的！另外，基于面向对象的“分工”思想，关于错误信息（异常对应的描述信息），应该是由Service来描述，即“谁抛出谁描述”，因为抛出异常的代码片段是最了解、最明确出现异常的原因的！

为了更好的描述异常的原因，应该在自定义的`ServiceException`和其子孙类异常中添加基于父类的全部构造方法（5个），然后，在`AdminServiceImpl`中，当抛出异常时，可以在异常的构造方法中添加`String`类型的参数，对异常发生的原因进行描述，例如：

```java
@Override
public void addNew(AdminAddNewDTO adminAddNewDTO) {
    // ===== 原有其它代码 =====
    
    // 判断查询结果是否不为null
    if (queryResult != null) {
        // 是：表示用户名已经被占用，则抛出UsernameDuplicateException
        log.error("此账号已经被占用，将抛出异常");
        throw new UsernameDuplicateException("添加管理员失败，用户名（" + username + "）已经被占用！");
    }

    // ===== 原有其它代码 =====

    // 判断以上返回的结果是否不为1，抛出InsertException异常
    if (rows != 1) {
        throw new InsertException("添加管理员失败，服务器忙，请稍后再次尝试！");
    }
}
```

最后，在处理异常时，可以调用异常对象的`getMessage()`方法获取抛出时封装的描述信息，例如：

```java
@ExceptionHandler(ServiceException.class)
public JsonResult<Void> handleServiceException(ServiceException e) {
    if (e instanceof UsernameDuplicateException) {
        return JsonResult.fail(State.ERR_USERNAME, e.getMessage());
    } else {
        return JsonResult.fail(State.ERR_INSERT, e.getMessage());
    }
}
```

完成后，再次重启项目，当用户名已经存在时，可以显示在Service中描述的错误信息！

最后，当添加成功时，响应的JSON数据例如：

```json
{
    "state":200,
    "message":null,
    "data":null
}
```

当用户名冲突，添加失败时，响应的JSON数据例如：

```json
{
    "state":201,
    "message":"添加管理员失败，用户名（liuguobin）已经被占用！",
    "data":null
}
```

可以看到，无论是成功还是失败，响应的JSON中都包含了不必要的数据（为`null`的数据），这些数据属性是没有必要响应到客户端的，如果需要去除这些不必要的值，可以在对应的属性上使用注解进行配置，例如：

```java
@Data
public class JsonResult<T> implements Serializable {

    // 状态码，例如：200
    private Integer state;
    // 消息，例如："登录失败，用户名不存在"
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String message;
    // 数据
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;
    
    // ===== 原有其它代码 =====
    
}
```

则响应的JSON中只会包含不为`null`的部分。

此注解还可以添加在类上，则作用于当前类中所有的属性，例如：

```java
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JsonResult<T> implements Serializable {

    // ===== 原有其它代码 =====
    
}
```

即使添加在类上，也只对当前类的3个属性有效，后续，当响应某些数据时，`data`属性可能是用户、商品、订单等类型，这些类型的数据中为`null`的部分依然会被响应到客户端去，所以，还需要对这些类型也添加相同的注解配置！

以上做法相对比较繁琐，可以在`application.properties` / `application.yml`中添加全局配置，则作用于当前项目中所有响应时涉及的类，例如在`properties`中配置为：

```properties
spring.jackson.default-property-inclusion=non_null
```

在`yml`中配置为：

```yml
spring:
  jackson:
    default-property-inclusion: non_null
```

注意：当你需要在`yml`中添加以上配置时，前缀属性名可能已经存在，则不允许出现重复的前缀属性名，例如以下配置就是错误的：

```yml
spring:
  profiles:
    active: dev
spring: # 此处就出现了相同的前缀属性名，是错误的
  jackson:
    default-property-inclusion: non_null
```

正确的配置例如：

```yml
spring:
  profiles:
    active: dev
  jackson:
    default-property-inclusion: non_null
```

最后，以上配置只是“默认”配置，如果在某些类型中还有不同的配置需求，仍可以在类或属性上通过`@JsonInclude`进行配置。

### 解决跨域问题

在使用前后端分离的开发模式下，前端项目和后端项目可能是2个完全不同的项目，并且，各自己独立开发，独立部署，在这种做法中，如果前端直接向后端发送异步请求，默认情况下，在前端会出现类似以下错误：

```
Access to XMLHttpRequest at 'http://localhost:8080/admins/add-new' from origin 'http://localhost:8081' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

以上错误信息的关键字是`CORS`，通常称之为“跨域问题”。

在基于Spring MVC框架的项目中，当需要解决跨域问题时，需要一个Spring MVC的配置类（实现了`WebMvcConfigurer`接口的类），并重写其中的方法，以允许指定条件的跨域访问，例如：

```java
package cn.tedu.boot.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

}
```
### 在线API文档框架

Knife4j是国人开发一个基于Swagger2的在线API文档的框架，它可以扫描控制器所在的包，并解析每一个控制器及其内部的处理请求的方法，生成在线API文档，为前后端的开发人员的沟通提供便利。

在`pom.xml`中添加依赖：

```xml
<!-- https://mvnrepository.com/artifact/com.github.xiaoymin/knife4j-spring-boot-starter -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>2.0.9</version>
</dependency>
```

然后，需要在`application.properties`中添加配置：

```
knife4j.enable=true
```

并且，需要在`cn.tedu.boot.demo.config`下创建`Knife4jConfiguration`配置类：

```java
/**
 * Knife4j（Swagger2）的配置
 */
@Configuration
@EnableSwagger2WebMvc
public class Knife4jConfiguration {

    /**
     * 【重要】指定Controller包路径
     */
    private String basePackage = "cn.tedu.boot.demo.controller";
    /**
     * 分组名称
     */
    private String groupName = "xxx";
    /**
     * 主机名
     */
    private String host = "xxx";
    /**
     * 标题
     */
    private String title = "xxx";
    /**
     * 简介
     */
    private String description = "xxx";
    /**
     * 服务条款URL
     */
    private String termsOfServiceUrl = "http://www.apache.org/licenses/LICENSE-2.0";
    /**
     * 联系人
     */
    private String contactName = "xxx";
    /**
     * 联系网址
     */
    private String contactUrl = "xxx";
    /**
     * 联系邮箱
     */
    private String contactEmail = "xxx";
    /**
     * 版本号
     */
    private String version = "1.0.0";

    @Autowired
    private OpenApiExtensionResolver openApiExtensionResolver;

    @Bean
    public Docket docket() {
        String groupName = "1.0.0";
        Docket docket = new Docket(DocumentationType.SWAGGER_2)
                .host(host)
                .apiInfo(apiInfo())
                .groupName(groupName)
                .select()
                .apis(RequestHandlerSelectors.basePackage(basePackage))
                .paths(PathSelectors.any())
                .build()
                .extensions(openApiExtensionResolver.buildExtensions(groupName));
        return docket;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(title)
                .description(description)
                .termsOfServiceUrl(termsOfServiceUrl)
                .contact(new Contact(contactName, contactUrl, contactEmail))
                .version(version)
                .build();
    }

}
```

完成后，启动项目，通过 http://localhost:8080/doc.html 即可访问在线API文档。

在开发实践中，每个处理请求的方法应该限定为某1种请求方式，如果允许多种请求方式，则在API文档的菜单中会有多项。

在API文档中，菜单中的各名称默认是根据控制器类名、方法名转换得到的，通常，应该通过配置改为更加易于阅读理解的名称：

- `@Api`：是添加在控制器类上的注解，通过此注解的`tags`属性可以修改原本显示控制器类名称的位置的文本，通常，建议在配置的`tags`值上添加序号，例如：`"1. 管理员模块"`、`"2. 商品模块"`，则框架会根据值进行排序
- `@ApiOperation`：是添加在控制器类中处理请求的方法上的注解，用于配置此方法处理的请求在API文档中显示的文本
- `@ApiOperationSupport`：是添加在控制器类中处理请求的方法上的注解，通过配置其`order`属性可以指定各方法在API文档中的显示顺序
- `@ApiModelProperty`：是添加在POJO类的属性上的注解，用于对请求参数或响应结果中的某个属性进行说明，主要通过其`value`属性配置描述文本，并可通过`example`属性配置示例值，还可在响应结果时通过`position`属性指定顺序
- `@ApiImplicitParam`：是添加在控制器类中处理请求的方法上的注解，也可以作为`@ApiImplicitParams`注解的参数值，主要用于配置非封装的参数，主要配置`name`、`value`、`example`、`required`、`dataType`属性
- `@ApiImplicitParams`：是添加在控制器类中处理请求的方法上的注解，当方法有多个非封装的参数时，在方法上添加此注解，并在注解内部通过`@ApiImplicitParam`数组配置多个参数

提示：以上`@ApiImplicitParams`、`@ApiImplicitParam`和`@ApiModelProperty`可以组合使用。

配置示例--控制器类：

```java
@Api(tags = "1. 管理员模块")
@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {

    @ApiOperationSupport(order = 10)
    @ApiOperation("增加管理员")
    @PostMapping("/add-new")
    public JsonResult<Void> addNew(AdminAddNewDTO adminAddNewDTO) {
        throw new RuntimeException("此功能尚未实现");
    }

    @ApiOperationSupport(order = 40)
    @ApiOperation("根据id查询管理员详情")
    @ApiImplicitParam(name = "id", value = "管理员id", example = "1",
            required = true, dataType = "long")
    @GetMapping("/{id:[0-9]+}")
    public JsonResult<Admin> getById(@PathVariable Long id) {
        throw new RuntimeException("此功能尚未实现");
    }

    @ApiOperationSupport(order = 41)
    @ApiOperation("根据角色类型查询管理员列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "roleId", value = "角色id", example = "1",
                required = true, dataType = "long"),
            @ApiImplicitParam(name = "page", value = "页码", example = "1",
                dataType = "int")
    })
    @GetMapping("/list-by-role")
    public JsonResult<Admin> listByRole(Long roleId, Integer page) {
        throw new RuntimeException("此功能尚未实现");
    }

}
```

配置示例--封装的POJO类：

```java
@Data
@Accessors(chain = true)
public class AdminAddNewDTO implements Serializable {

    @ApiModelProperty(value = "用户名", example = "admin001")
    private String username;

    @ApiModelProperty(value = "密码", example = "123456")
    private String password;

    @ApiModelProperty(value = "昵称", example = "管理员1号")
    private String nickname;

}
```



## 关于客户端提交请求参数的格式

通常，客户端向服务器端发送请求时，请求参数可以有2种形式，第1种是直接通过`&`拼接各参数与值，例如：

```javascript
// username=root&password=123456&nickname=jackson&phone=13800138001&email=jackson@baidu.com&description=none
let data = 'username=' + this.ruleForm.username
              + '&password=' + this.ruleForm.password
              + '&nickname=' + this.ruleForm.nickname
              + '&phone=' + this.ruleForm.phone
              + '&email=' + this.ruleForm.email
              + '&description=' + this.ruleForm.description;
```

第2种方式是使用JSON语法来组织各参数与值，例如：

```javascript
let data = {
    'username': this.ruleForm.username, // 'root'
    'password': this.ruleForm.password, // '123456'
    'nickname': this.ruleForm.nickname, // 'jackson'
    'phone': this.ruleForm.phone, // '13800138001'
    'email': this.ruleForm.email, // 'jackson@baidu.com'
    'description': this.ruleForm.description // 'none'
};
```

具体使用哪种做法，取决于服务器端的设计：

- 如果服务器端处理请求的方法中，在参数前添加了`@RequestBody`，则允许使用以上第2种做法（JSON数据）提交请求参数，不允许使用以上第1种做法（使用`&`拼接）
- 如果没有使用`@RequestBody`，则只能使用以上第1种做法

## 关于Spring Boot的其它

### 关于静态资源

在Spring Boot工程中，在`src/main/resources`下的`static`文件夹是默认存放静态资源的文件夹，如果创建工程时直接添加了`spring-boot-starter-web`，则此文件夹默认已经存在，否则，可能需要自行创建。

静态资源指的是不会发生变化的资源，例如`.html`、`.css`、`.js`、图片文件等。

在Spring Boot工程中，在静态资源文件夹下的资源是可以直接通过GET请求进行访问的，例如在`static`下存入一张`a.jpg`，则通过 http://localhost:8080/a.jpg 即可访问到此资源。

在静态资源中，`index.html`是默认的资源，如果在`static`下创建`index.html`，将可以直接通过 http://localhost:8080 进行访问，与 http://localhost:8080/index.html 是完全等效的！

另外，可以通过配置指定其它位置作为静态资源文件夹：

```
spring.web.resources.static-locations=file:f:/static-resource
```

需要注意，一定通过以上配置指定了静态资源文件夹，原有的`static`文件夹就不再是静态资源文件夹了，如果有必要的话，可以同时指定多个位置，例如：

```
spring.web.resources.static-locations=classpath:/static/, file:f:/static-resource
```

当指定了多个静态资源文件夹时，请务必保证每个静态资源文件夹下的子级文件夹及名称不会发生冲突！

### 关于application.properties

在Spring Boot工程里，在`src/main/resources`下的`application.properties`是默认的配置文件，Spring Boot在加载Spring环境时会自动读取此文件。

其实，在项目的开发、测试、生产环节中，所需的配置极有可能是不同的，典型的例如数据库的配置、显示日志的级别等！为了避免频繁修改配置值，Spring框架允许采取Profile配置，即允许创建多个配置文件，并选择性的激活某个配置文件！在Spring Boot中进一步简化了Profile配置的使用，你只需要自定义新的配置文件，文件名为`application-???.properties`，在这样的文件中配置不同环境中的属性。

示例：**application-dev.properties**

```
# 以下是【开发环境】下的配置信息
spring.datasource.url=jdbc:mysql://localhost:3306/mall_ams
spring.datasource.username=root
spring.datasource.password=root
logging.level.cn.tedu.boot.demo=trace
```

示例：**application-test.properties**

```
# 以下是【测试环境】下的配置信息
spring.datasource.url=jdbc:mysql://192.168.1.199:3306/mall_ams
spring.datasource.username=test-user
spring.datasource.password=test001
logging.level.cn.tedu.boot.demo=debug
```

示例：**application-prod.properties**

```
# 以下是【生产环境】下的配置信息
spring.datasource.url=jdbc:mysql://202.103.0.117:3306/mall_ams
spring.datasource.username=admin
spring.datasource.password=s3cret001
logging.level.cn.tedu.boot.demo=info
```

另外，原本的**application.properties**是默认始终加载的，所以，无论什么环境下都需要加载的配置应该配置在这里，例如：

```
mybatis.mapper-locations=classpath:mapper/*.xml
```

最后，在**application.properties**再添加一项配置`spring.profiles.active`用于激活某个Profile配置，例如：

```
# 激活某个Profile配置，此属性的值就是Profile配置文件的文件名中 application- 右侧的值 
spring.profiles.active=dev # 测试环境中将此值改为test，生产环境中将此值改为prod
```

另外，这些配置文件是可以外部化的，Spring Boot的项目最终是可以编译打包成一个独立的jar文件的，并且，在查找配置文件时，会优先从jar文件所在的目录来查找配置文件，所以，只需要将配置文件放在和jar文件同一个文件夹下即可！

### 关于YAML配置文件

YAML是一种编写配置文件的语法，表现为以`.yml`作为扩展名的文件，Spring Boot支持使用这种文件进行配置（如果在Spring框架中读取这种文件，需要另外添加依赖项）。

在YAML配置中，原本在.properties的配置表现为使用多个小数点分隔的配置将改为换行并使用2个空格缩进的语法，换行前的部分使用冒号表示结束，最后的属性名与值之间使用冒号和1个空格进行分隔，如果有多条属性在.properties文件中属性名有重复的前缀，在yml中不必也不能重复写。

关于YAML配置，其语法特别是”分层级“，例如：

```
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mall_ams
    username: root
    password: root
```

以上配置等效于在`.properties`里配置为：

```
spring.datasource.url=jdbc:mysql://localhost:3306/mall_ams
spring.datasource.username=root
spring.datasource.password=root
```

在YAML的语法中：

- 多层级的配置，相比原`.properties`使用小数点分隔，而YAML使用冒号分隔，如果分隔的右侧不是属性值，而是下一个层级，则冒号右侧回车
- 下一个层级的属性名需要右侧缩进2个空格位置，在使用IntelliJ IDEA时，会自动在编辑`.yml`时将TAB键的效果转换成2个空格
- 如果某个层级的属性名将对应属性值，则在冒号的右侧添加1个空格，然后再填写属性值

通常，在同一个工程中，不应该同时使用`.properties`和`.yml`，应该只使用其中的1种。

### 关于SpringBoot部署

部署 SpringBoot 之前，需要先将 SpringBoot 打包成可执行的 Jar 包,进入目录/home/project/springboot,然后使用 maven 将其打包成 jar 文件

```
cd /home/project/springboot
mvn package
```

出现 build success 就说明打包成功，jar 文件会生成在 target 目录中。

打包完成之后，可以在 target 目录中找到 jar 包，进入 target 目录，使用命令

```
java -jar springboot-0.0.1-SNAPSHOT.jar
```

就可以运行 jar 包了。接着点击右上角工具--web服务访问https://****\**\***.simplelab.cn/shiyanlou

可以访问，部署成功。

如果需要使用 war 的方式部署到外部 tomcat 容器中，修改 pom.xml 文件的配置，将打包方式修改为 war

```
    <packaging>war</packaging>
```

接着修改SpringbootApplication.java

```
package com.shiyanlou.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SpringbootApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(SpringbootApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }
}
```

因为没有 web.xml 文件，所以需要继承SpringBootServletInitializer并且覆盖configure(SpringApplicationBuilder builder)方法

接下来的步骤和打包 jar 文件是一样的。打包好了之后将 war 文件放到 tomcat 的 webapps 目录中就可以了。