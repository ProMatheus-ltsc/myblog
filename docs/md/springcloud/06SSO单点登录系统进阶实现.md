# 单点登陆系统简介
[[TOC]]

## 背景分析

传统的登录系统中，每个站点都实现了自己的专用登录模块。各站点的登录状态相互不认可，各站点需要逐一手工登录。例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/70cbb47388ed44158f5dafead31af366.png)

这样的系统，我们又称之为多点登陆系统。应用起来相对繁琐（每次访问资源服务都需要重新登陆认证和授权）。与此同时，系统代码的重复也比较高。由此单点登陆系统诞生。

## 单点登陆系统概述

单点登录，英文是 Single Sign On（缩写为 SSO）。即多个站点共用一台认证授权服务器，用户在其中任何一个站点登录后，可以免登录访问其他所有站点。而且，各站点间可以通过该登录状态直接交互。例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/67b8f9f67b2140fc953b172ea91355aa.png)

## 单点登陆系统解决方案设计

- 解决方案1：用户登陆成功以后，将用户登陆状态存储到redis数据库，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/b54807bd4b6d45ce804b0606b938f0f2.png)

> 说明,在这套方案中,用户登录成功后,会基于UUID生成一个token,然后与用户信息绑定在一起存储到数据库.后续用户在访问资源时,基于token从数据库查询用户状态,这种方式因为要基于数据库存储和查询用户状态,所以性能表现一般.

- 解决方案2：用户登陆成功以后，将用户信息存储到token（令牌），然后写到客户端进行存储。（本次设计方案）

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f38c4e19b854294840fcce59f5ab84f.png)

> 说明,在这套方案中,用户登录成功后,会基于JWT技术生成一个token,用户信息可以存储到这个token中.后续用户在访问资源时,对token内容解析,检查登录状态以及权限信息,无须再访问数据库.

## 单点登陆系统初步设计

### 服务设计

基于单点登陆系统中的业务描述，进行初步服务架构设计，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/18f2af95bf6c46f4af8e3ae291cd9095.png)

其中,服务基于业务进行划分,系统(system)服务只提供基础数据(例如用户信息,日志信息等),认证服务(auth)负责完成用户身份的校验,密码的比对,资源服务(resource)代表一些业务服务(例如我的订单,我的收藏等等).

### 工程结构设计

基于服务的划分，设计工程结构如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/4f940e5644794a4abb7275a36993c346.png)

## SSO父工程创建及初始化

### 创建父工程

第一步：创建父工程，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/61f34c0485f04c93b9663b1e52b93550.png)

第二步：删除父工程src目录(可选)。

### 父工程pom文件初始配置

初始化pom文件内容，例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.jt</groupId>
    <artifactId>02-sso</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!--maven父工程的pom文件中一般要定义子模块,
    子工程中所需依赖版本的管理,公共依赖并且父工程的打包方式一般为pom方式-->

    <!--第一步: 定义子工程中核心依赖的版本管理(注意,只是版本管理)-->
    <dependencyManagement>
        <dependencies>
            <!--spring boot 核心依赖版本定义(spring官方定义)-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.3.2.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!--Spring Cloud 微服务规范(由spring官方定义)-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Hoxton.SR9</version>
                <type>pom</type><!--假如scope是import,type必须为pom-->
                <scope>import</scope><!--引入三方依赖的版本设计-->
            </dependency>

            <!--Spring Cloud alibaba 依赖版本管理 (参考官方说明)-->
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>2.2.6.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <!--第二步: 添加子工程的所需要的公共依赖-->
    <dependencies>
        <!--lombok 依赖,子工程中假如需要lombok,不需要再引入-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope><!--provided 表示此依赖仅在编译阶段有效-->
        </dependency>
        <!--单元测试依赖,子工程中需要单元测试时,不需要再次引入此依赖了-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope><!--test表示只能在test目录下使用此依赖-->
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <!--其它依赖...-->
    </dependencies>
    <!--第三步: 定义当前工程模块及子工程的的统一编译和运行版本-->
    <build><!--项目构建配置,我们基于maven完成项目的编译,测试,打包等操作,
    都是基于pom.xml完成这一列的操作,但是编译和打包的配置都是要写到build元素
    内的,而具体的编译和打包配置,又需要plugin去实现,plugin元素不是必须的,maven
    有默认的plugin配置,常用插件可去本地库进行查看-->
        <plugins>
            <!--通过maven-compiler-plugin插件设置项目
            的统一的jdk编译和运行版本-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <!--假如本地库没有这个版本,这里会出现红色字体错误-->
                <version>3.8.1</version>
                <configuration>
                    <source>8</source>
                    <target>8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

## 系统基础服务工程设计及实现

### 业务描述

本次设计系统服务(System)，主要用于提供基础数据服务，例如日志信息，用户信息等。

### 表结构设计

系统服务模块，基本表结构设计，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/aa686ba1fe8445feaf3185a70966b775.png)

### 工程数据初始化

将jt-sso.sql文件在mysql中执行一下,其过程如下:
第一:登录mysql

```bash
mysql -uroot -proot
```

第二:通过source指令执行jt-sso.sql文件

```bash
source d:/jt-sso.sql
```

### 创建系统服务工程并初始化

第一步：创建sso-system工程，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/a705a6b3898448da815afb34b8712730.png?)

第二步：添加项目依赖，例如

```xml
        <!--1.数据库访问相关-->
        <!--1.1 mysql 数据库驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--1.2 mybatis plus 插件-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>
        <!--服务治理相关-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--Web 服务相关-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

第三步：在项目中添加bootstrap.yml文件，其内容如下：

```yaml
server:
  port: 8061
spring:
  application:
    name: sso-system
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
      config:
        server-addr: localhost:8848
        file-extension: yml
  datasource:
    url: jdbc:mysql:///jt-sso?serverTimezone=Asia/Shanghai&characterEncoding=utf8
    username: root
    password: root
```

说明，可将连接数据库的配置，添加到配置中心。

第四步：在项目中添加启动类，例如：

```java
package com.jt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(SystemApplication.class,args);
    }
}
```

第五步：在项目中添加单元测试类，测试数据库连接，例如：

```java
package com.jt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@SpringBootTest
public class DataSourceTests {
    @Autowired
    private DataSource dataSource;//HikariDataSource
    @Test
    void testGetConnection() throws SQLException {
        Connection conn=
        dataSource.getConnection();
        System.out.println(conn);
    }
}
```

### Pojo对象逻辑实现

添加项目User对象，用于封装用户信息。

```java
package com.jt.system.pojo;
import lombok.Data;
import java.io.Serializable;

/**
 * 通过此对象封装用户信息
 */
@Data
public class User implements Serializable {
    private static final long serialVersionUID = 4831304712151465443L;
    private Long id;
    private String username;
    private String password;
    private String status;
}
```

### Dao对象逻辑实现

第一步：创建UserMapper接口，并定义基于用户名查询用户信息，基于用户id查询用户权限信息的方法，代码如下：

```java
package com.jt.system.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jt.system.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    /**
     * 基于用户名获取用户信息
     * @param username
     * @return
     */
    @Select("select id,username,password,status " +
            "from tb_users " +
            "where username=#{username}")
    User selectUserByUsername(String username);

    /**
     * 基于用户id查询用户权限
     * @param userId 用户id
     * @return 用户的权限
     * 涉及到的表:tb_user_roles,tb_role_menus,tb_menus
     */
    @Select("select distinct m.permission " +
            "from tb_user_roles ur join tb_role_menus rm on ur.role_id=rm.role_id" +
            "     join tb_menus m on rm.menu_id=m.id " +
            "where ur.user_id=#{userId}")
    List<String> selectUserPermissions(Long userId);

}
```

第二步：创建UserMapperTests类，对业务方法做单元测试，例如：

```java
package com.jt;

import com.jt.system.pojo.User;
import com.jt.system.dao.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class UserMapperTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    void testSelectUserByUsername(){
        User user =
        userMapper.selectUserByUsername("admin");
        System.out.println(user);
    }
    @Test
    void testSelectUserPermissions(){
        List<String> permission=
        userMapper.selectUserPermissions(1L);
        System.out.println(permission);
    }
}
```

### Service对象逻辑实现

创建UserService接口及实现类，定义用户及用户权限查询逻辑，代码如下：

第一步:定义service接口,代码如下:

```java
package com.jt.system.service;

import com.jt.system.pojo.User;

import java.util.List;

public interface UserService {
    User selectUserByUsername(String username);
    List<String> selectUserPermissions(Long userId);
}
```

第二步:定义service接口实现类,代码如下:

```java
package com.jt.system.service.impl;

import com.jt.system.dao.UserMapper;
import com.jt.system.pojo.User;
import com.jt.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public User selectUserByUsername(String username) {
        return userMapper.selectUserByUsername(username);
    }
    @Override
    public List<String> selectUserPermissions(Long userId) {
        return userMapper.selectUserPermissions(userId);
    }
}
```

### Controller对象逻辑实现

```java
package com.jt.system.controller;

import com.jt.system.pojo.User;
import com.jt.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/login/{username}")
    public User doSelectUserByUsername(
            @PathVariable("username") String username){
        return userService.selectUserByUsername(username);
    }
    @GetMapping("/permission/{userId}")
    public List<String> doSelectUserPermissions(
            @PathVariable("userId") Long userId){
        return userService.selectUserPermissions(userId);
    }
}
```

### 启动服务进行访问测试

启动sso-system工程服务，打开浏览器分别对用户及用户权限信息的获取进行访问测试

- 基于用户名查询用户信息，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/5bffa4e4dde8480bb33bd014d203d95e.png)

- 基于用户id（这里假设用户id为1）查询用户权限，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/4dde3f00d1d349f6bb2656fc9dc59396.png)

## 统一认证工程设计及实现

### 业务描述

用户登陆时调用此工程对用户身份进行统一身份认证和授权。

### 创建工程及初始化

第一步：创建sso-auth工程，如图所示

![在这里插入图片描述](https://img-blog.csdnimg.cn/78f297aec8eb45c0a4b1332294269d7a.png)

第二步：打开sso-auth工程中的pom文件，然后添加如下依赖：

```xml
 <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--SSO技术方案:SpringSecurity+JWT+oauth2-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-oauth2</artifactId>
        </dependency>
        <!--open feign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

    </dependencies>
```

第三步：在sso-auth工程中创建bootstrap.yml文件，例如：

```yaml
server:
  port: 8071
spring:
  application:
    name: sso-auth
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
      config:
        server-addr: localhost:8848
```

第四步 添加项目启动类，例如

```java
package com.jt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@EnableFeignClients
@SpringBootApplication
public class AuthApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
```

### 启动并访问项目

项目启动时，系统会默认生成一个登陆密码，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/df585e1bc43946b0b0794b120f3704d6.png)

打开浏览器输入http://localhost:8071呈现登陆页面,例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/f7775fdf7be34ceba94a36033f858ba3.png)

其中，默认用户名为user，密码为系统启动时，在控制台呈现的密码。执行登陆测试,登陆成功进入如下界面（因为没有定义登陆页面，所以会出现404）：

![在这里插入图片描述](https://img-blog.csdnimg.cn/ebcd3cb519a8432389bf1fe2a077ffa7.png)

### 定义用户信息处理对象

第一步：定义User对象，用于封装从数据库查询到的用户信息，例如：

```java
package com.jt.auth.pojo;

import lombok.Data;
import java.io.Serializable;
@Data
public class User implements Serializable {
    private static final long serialVersionUID = 4831304712151465443L;
    private Long id;
    private String username;
    private String password;
    private String status;
}
```

第二步：定义远程Service对象，用于实现远程用户信息调用，例如：

```java
package com.jt.auth.service;

import com.jt.auth.pojo.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(value = "sso-system", contextId ="remoteUserService" )
public interface RemoteUserService {

    @GetMapping("/user/login/{username}")
    User selectUserByUsername( @PathVariable("username") String username);

    @GetMapping("/user/permission/{userId}")
    List<String> selectUserPermissions(@PathVariable("userId") Long userId);
}
```

第三步：定义用户登陆业务逻辑处理对象，例如：

```java
package com.jt.auth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private RemoteUserService remoteUserService;
    /**
     * 基于用户名获取数据库中的用户信息
     * @param username 这个username来自客户端
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        //基于feign方式获取远程数据并封装
        //1.基于用户名获取用户信息
        com.jt.auth.pojo.User user=
        remoteUserService.selectUserByUsername(username);
        if(user==null)
            throw new UsernameNotFoundException("用户不存在");
        //2.基于用于id查询用户权限
        List<String> permissions=
        remoteUserService.selectUserPermissions(user.getId());
        log.info("permissions {}",permissions);
        //3.对查询结果进行封装并返回
        User userInfo= new User(username,
                user.getPassword(),
                AuthorityUtils.createAuthorityList(permissions.toArray(new String[]{})));
        //......
        return userInfo;
        //返回给认证中心,认证中心会基于用户输入的密码以及数据库的密码做一个比对
    }
}
```

### 定义Security配置类

定义Spring Security配置类，在此类中配置认证规则，例如：

```java
package com.jt.auth.config;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * 当我们在执行登录操作时,底层逻辑(了解):
 * 1)Filter(过滤器)
 * 2)AuthenticationManager (认证管理器)
 * 3)AuthenticationProvider(认证服务处理器)
 * 4)UserDetailsService(负责用户信息的获取及封装)
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

     /**
     * 初始化加密对象
     * 此对象提供了一种不可逆的加密方式,相对于md5方式会更加安全
     * @return
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    /**
     * 定义认证管理器对象，这个对象负责完成用户信息的认证，
     * 即判定用户身份信息的合法性，在基于oauth2协议完成认
     * 证时，需要此对象，所以这里讲此对象拿出来交给spring管理
     * @return
     * @throws Exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean()
            throws Exception {
      return super.authenticationManagerBean();
    }

  
}
```

配置写好后，可启动服务进行登录访问测试。

### Security 认证流程分析（了解）

目前的登陆操作，也就是用户的认证操作，其实现主要基于Spring Security框架，其认证简易流程如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/ed9f36125aac4a4e817d743af27f4996.png)

### 构建令牌生成及配置对象

本次我们借助JWT(Json Web Token-是一种json格式）方式将用户相关信息进行组织和加密,并作为响应令牌(Token),从服务端响应到客户端,客户端接收到这个JWT令牌之后,将其保存在客户端(例如localStorage),然后携带令牌访问资源服务器,资源服务器获取并解析令牌的合法性,基于解析结果判定是否允许用户访问资源.

```java
package com.jt.auth.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;


/**
 * 在此配置类中配置令牌的生成，存储策略，验签方式(令牌合法性)。
 */
@Configuration
public class TokenConfig {

    /**
     * 配置令牌的存储策略,对于oauth2规范中提供了这样的几种策略
     * 1)JdbcTokenStore(这里是要将token存储到关系型数据库)
     * 2)RedisTokenStore(这是要将token存储到redis数据库-key/value)
     * 3)JwtTokenStore(这里是将产生的token信息存储客户端，并且token
     * 中可以以自包含的形式存储一些用户信息)
     * 4)....
     */
    @Bean
    public TokenStore tokenStore(){
        //这里采用JWT方式生成和存储令牌信息
        return new JwtTokenStore(jwtAccessTokenConverter());
    }
    /**
     * 配置令牌的创建及验签方式
     * 基于此对象创建的令牌信息会封装到OAuth2AccessToken类型的对象中
     * 然后再存储到TokenStore对象，外界需要时，会从tokenStore进行获取。
     */
    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter(){
        JwtAccessTokenConverter jwtAccessTokenConverter=
                new JwtAccessTokenConverter();
        //JWT令牌构成：header(签名算法，令牌类型),payload(数据部分),Signing(签名)
        //这里的签名可以简单理解为加密，加密时会使用header中算法以及我们自己提供的密钥，
        //这里加密的目的是为了防止令牌被篡改。（这里密钥要保管好，要存储在服务端）
        jwtAccessTokenConverter.setSigningKey(SIGNING_KEY);//设置密钥
        return jwtAccessTokenConverter;
    }

    /**
     * JWT 令牌签名时使用的密钥(可以理解为盐值加密中的盐)
     * 1)生成的令牌需要这个密钥进行签名
     * 2)获取的令牌需要使用这个密钥进行验签(校验令牌合法性，是否被篡改过)
     */
    private static final String SIGNING_KEY="auth";
}

```

### 定义Oauth2认证授权配置

第一步：所有零件准备好了开始拼装最后的主体部分，这个主体部分就是授权服务器的核心配置.

```java
package com.jt.auth.config;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

import java.util.UUID;

/**
 * Oauth2 是一种认证授权规范，它基于认证和授权定义了一套规则，在这套规则中规定了
 * 实现一套认证授权系统需要哪些对象：
 * 1)系统资源(数据)
 * 2)资源拥有者(用户)
 * 3)管理资源的服务器
 * 4)对用户进行认证和授权的服务器
 * 5)客户端系统(负责提交用户身份信息的系统)
 *
 * 思考：对于一个认证授权系统来讲，需要什么？：
 * 1)提供一个认证的入口？(客户端去哪里认证)
 * 2)客户端应该携带什么信息去认证？(username,password,....)
 * 3)服务端通过谁去对客户端进行认证(一个负责认证的对象)？
 */
@AllArgsConstructor
@Configuration
@EnableAuthorizationServer //在oauth2规范中启动认证和授权
public class Oauth2Config extends AuthorizationServerConfigurerAdapter {
    //@Autowired
    private AuthenticationManager authenticationManager;
    //@Autowired
    private BCryptPasswordEncoder passwordEncoder;
    //@Autowired
    private JwtAccessTokenConverter jwtAccessTokenConverter;
    //@Autowired
    private TokenStore tokenStore;

    //提供一个认证的入口(客户端去哪里认证)？(http://ip:port/.....)
    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        //super.configure(security);
        //对外发布认证入口(/oauth/token),认证通过服务端会生成一个令牌
        security.tokenKeyAccess("permitAll()")
        //对外发布检查令牌的入口(/oauth/check_token)
        .checkTokenAccess("permitAll()")
        //允许用户通过表单方式提交认证,完成认证
        .allowFormAuthenticationForClients();
    }
    //定义客户端应该携带什么信息去认证？
    //指明哪些对象可以到这里进行认证(哪个客户端对象需要什么特点)。
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        //super.configure(clients);
        clients.inMemory()
                //客户端标识
                .withClient("gateway-client")
                //客户端密钥(随意)
                .secret(passwordEncoder.encode("123456"))
                //指定认证类型(码密,刷新令牌，三方令牌，...)
                .authorizedGrantTypes("password","refresh_token")
                //作用域(在这里可以理解为只要包含我们规定信息的客户端都可以进行认证)
                .scopes("all");
    }
    //提供一个负责认证授权的对象？(完成客户端认证后会颁发令牌，默认令牌格式是uuid方式的)
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        //super.configure(endpoints);
        //设置认证授权对象
        endpoints.authenticationManager(authenticationManager)
        //设置令牌业务对象(此对象提供令牌创建及有效机制设置)
        .tokenServices(tokenService())//不写，默认是uuid
        //设置允许对哪些请求方式进行认证(默认支支持post):可选
        .allowedTokenEndpointRequestMethods(HttpMethod.GET,HttpMethod.POST);
    }

    @Bean
    public AuthorizationServerTokenServices tokenService(){
        //1.构建token业务对象
        DefaultTokenServices ts=new DefaultTokenServices();
        //2.设置令牌生成机制(创建令牌的方式，存储用户状态信息的方式)
        ts.setTokenStore(tokenStore);
        //3.设置令牌增强(改变默认令牌创建方式，没有这句话默认是UUID)
        ts.setTokenEnhancer(jwtAccessTokenConverter);
        //4.设置令牌有效时长(可选)
        ts.setAccessTokenValiditySeconds(3600);
        //5.设置刷新令牌以及它的有效时时长(可选)
        ts.setSupportRefreshToken(true);
        ts.setRefreshTokenValiditySeconds(3600*24);
        return ts;
    }

}

```

### 启动postman进行访问测试

- 登陆访问测试，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/8c8001d2e8da4af98e7632bbd9013e45.png)

登陆成功以后，会在postman控制台显示如下格式信息，例如：

```bash
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU2ODAwMjMsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsic3lzOnJlczpjcmVhdGUiLCJzeXM6cmVzOmxpc3QiLCJzeXM6cmVzOmRlbGV0ZSJdLCJqdGkiOiJjZTRhYWVlOC0wMzFmLTRmZjgtYTBmZS1lMGNkOTNlOGYzNzQiLCJjbGllbnRfaWQiOiJnYXRld2F5LWNsaWVudCIsInNjb3BlIjpbImFsbCJdfQ.gr3FxM0RdiEbmmHIdLi234kwPHRAFm02xNH9EnqEpbY",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJhdGkiOiJjZTRhYWVlOC0wMzFmLTRmZjgtYTBmZS1lMGNkOTNlOGYzNzQiLCJleHAiOjE2MzU5MzU2MjMsImF1dGhvcml0aWVzIjpbInN5czpyZXM6Y3JlYXRlIiwic3lzOnJlczpsaXN0Iiwic3lzOnJlczpkZWxldGUiXSwianRpIjoiZjllYjZhOTAtNGQ3MC00OGZhLTgzMzktMmFiZGUwYmJmOTQ5IiwiY2xpZW50X2lkIjoiZ2F0ZXdheS1jbGllbnQifQ.c-MrRMNYtI9C9RnX0LchwJ-gLxeFZscpU2VM97vv-7A",
    "expires_in": 3599,
    "scope": "all",
    "jti": "ce4aaee8-031f-4ff8-a0fe-e0cd93e8f374"
}
```

- 检查token信息，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/1cd2eb58c1f64b21a4d1b5e9b375a002.png)

  假如，请求访问ok，在postman控制台会显示如下格式信息，例如：

```bash
{
    "user_name": "admin",
    "scope": [
        "all"
    ],
    "active": true,
    "exp": 1635680023,
    "authorities": [
        "sys:res:create",
        "sys:res:list",
        "sys:res:delete"
    ],
    "jti": "ce4aaee8-031f-4ff8-a0fe-e0cd93e8f374",
    "client_id": "gateway-client"
}
```

- 刷新令牌应用测试，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/512da92c2555432db80438d78fed6d62.png)

  假如，请求访问ok，在postman控制台会显示如下格式信息，例如：

```bash
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU2ODA3NzAsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsic3lzOnJlczpjcmVhdGUiLCJzeXM6cmVzOmxpc3QiLCJzeXM6cmVzOmRlbGV0ZSJdLCJqdGkiOiI5MzIzNzI1MC05NzQxLTQ0MjAtOWI3OS04NGZkODg0MDM4ZTUiLCJjbGllbnRfaWQiOiJnYXRld2F5LWNsaWVudCIsInNjb3BlIjpbImFsbCJdfQ.6zcw0tuAM0wlBvjBHxzk1JqFLweBU9p6uB720pdwWxs",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJhdGkiOiI5MzIzNzI1MC05NzQxLTQ0MjAtOWI3OS04NGZkODg0MDM4ZTUiLCJleHAiOjE2MzU5MzU2MjMsImF1dGhvcml0aWVzIjpbInN5czpyZXM6Y3JlYXRlIiwic3lzOnJlczpsaXN0Iiwic3lzOnJlczpkZWxldGUiXSwianRpIjoiZjllYjZhOTAtNGQ3MC00OGZhLTgzMzktMmFiZGUwYmJmOTQ5IiwiY2xpZW50X2lkIjoiZ2F0ZXdheS1jbGllbnQifQ.6KJOryS6j78Edk-8N4MWAIKifyRYbH5MvEO-mHRWW6w",
    "expires_in": 3599,
    "scope": "all",
    "jti": "93237250-9741-4420-9b79-84fd884038e5"
}
```

## 资源服务工程设计及实现

### 业务描述

资源服务工程为一个业务数据工程，在访问从工程中的资源时时,通常情要考虑,哪些资源可以匿名访问,也就是不需要登录就可以访问，哪些资源必须认证才可访问，哪些资源必须认证后，有权限才可以访问。

### 业务设计架构

用户访问资源时的认证，授权流程设计如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/fc8aae0e7bd64efc93673a9ebce14221.png)

### 项目创建及初始化

第一步：创建工程，例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/1d77b8c0e8bc46ddba3102d3a02c679b.png)

第二步：初始化pom文件依赖，例如：

```xml
   <dependencies>
        <!--spring boot web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--nacos discovery-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--nacos config-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--sentinel-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>

        <!--在资源服务器添加此依赖,只做授权,不做认证,添加完此依赖以后,
        在项目中我们要做哪些事情?对受限访问的资源可以先判断是否登录了,
        已经认证用户还要判断是否有权限?
        -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-oauth2</artifactId>
        </dependency>
    </dependencies>
```

第三步：创建bootstrap.yml配置文件，例如：

```yaml
server:
  port: 8881
spring:
  application:
    name: sso-resource
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
      config:
        server-addr: localhost:8848
        file-extension: yml
```

第四步：创建启动类，代码如下：

```java
package com.jt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResourceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ResourceApplication.class,args);
    }
}
```

### 创建资源Controller对象

```java
package com.jt.resource.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/resource")
public class ResourceController {

    /**
     * 查询资源
     * @return
     */
    @PreAuthorize("hasAuthority('sys:res:list')")
    @GetMapping
    public String doSelect(){
        return "Select Resource ok";
    }
    /**
     * 创建资源
     * @return
     */
    @PreAuthorize("hasAuthority('sys:res:create')")
    @PostMapping
    public String doCreate(){
        return "Create Resource OK";
    }
    /**
     * 修改资源
     * @return
     */
    @PreAuthorize("hasAuthority('sys:res:update')")
    @PutMapping
    public String doUpdate(){
        return "Update Resource OK";
    }
    /**
     * 删除资源
     * @return
     */
    @DeleteMapping
    public String doDelete(){
        return "Delete resource ok";
    }
}
```

### 配置令牌解析器对象

```java
package com.jt;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;


/**
 * 在此配置类中配置令牌的生成，存储策略，验签方式(令牌合法性)。
 */
@Configuration
public class TokenConfig {

    /**
     * 配置令牌的存储策略,对于oauth2规范中提供了这样的几种策略
     * 1)JdbcTokenStore(这里是要将token存储到关系型数据库)
     * 2)RedisTokenStore(这是要将token存储到redis数据库-key/value)
     * 3)JwtTokenStore(这里是将产生的token信息存储客户端，并且token
     * 中可以以自包含的形式存储一些用户信息)
     * 4)....
     */
    @Bean
    public TokenStore tokenStore(){
        //这里采用JWT方式生成和存储令牌信息
        return new JwtTokenStore(jwtAccessTokenConverter());
    }
    /**
     * 配置令牌的创建及验签方式
     * 基于此对象创建的令牌信息会封装到OAuth2AccessToken类型的对象中
     * 然后再存储到TokenStore对象，外界需要时，会从tokenStore进行获取。
     */
    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter(){
        JwtAccessTokenConverter jwtAccessTokenConverter=
                new JwtAccessTokenConverter();
        //JWT令牌构成：header(签名算法，令牌类型),payload(数据部分),Signing(签名)
        //这里的签名可以简单理解为加密，加密时会使用header中算法以及我们自己提供的密钥，
        //这里加密的目的是为了防止令牌被篡改。（这里密钥要保管好，要存储在服务端）
        jwtAccessTokenConverter.setSigningKey(SIGNING_KEY);//设置密钥
        return jwtAccessTokenConverter;
    }

    /**
     * JWT 令牌签名时使用的密钥(可以理解为盐值加密中的盐)
     * 1)生成的令牌需要这个密钥进行签名
     * 2)获取的令牌需要使用这个密钥进行验签(校验令牌合法性，是否被篡改过)
     */
    private static final String SIGNING_KEY="auth";
}
```

### 配置资源认证授权规则

```java
package com.jt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;

/**
 * 思考?对于一个系统而言,它资源的访问权限你是如何进行分类设计的
 * 1)不需要登录就可以访问(例如12306查票)
 * 2)登录以后才能访问(例如12306的购票)
 * 3)登录以后没有权限也不能访问(例如会员等级不够不让执行一些相关操作)
 */
@Configuration
@EnableResourceServer
//启动方法上的权限控制,需要授权才可访问的方法上添加@PreAuthorize等相关注解
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        //super.configure(http);
        //1.关闭跨域攻击
        http.csrf().disable();
        //2.放行相关请求
        http.authorizeRequests()
                .antMatchers("/resource/**")
                .authenticated()
                .anyRequest().permitAll();
    }
}
```

### 启动Postman进行访问测试

- 不携带令牌访问，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/84c95d209eee468681f497441cd927b0.png)

- 携带令牌访问，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/77bd6b65d5b04497a31398f966260153.png)

- 没有访问权限，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2e1cc7da024345cfa3c380bd123fd7cf.png)

## 网关工程设计及实现

### 业务描述

本次设计中，API网关是服务访问入口，身份认证，资源访问都通过网关进行资源统一转发。

### 项目创建及初始化

第一步：创建项目，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/11afdb3cdfc9440ea4b702154e0a387d.png)

第二步：初始化pom文件内容，例如：

```xml
 <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--假如网关层面进行限流,添加如下依赖-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
        </dependency>
    </dependencies>

```

第三步：创建bootstrap.yml配置文件并进行路由定义，例如：

```yml
server:
  port: 9000
spring:
  application:
    name: sso-gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
      config:
        server-addr: localhost:8848
        file-extension: yml
    sentinel:
      transport:
        dashboard: localhost:8180
      eager: true
    gateway:
      routes:
        - id: router01
          uri: lb://sso-resource
          predicates:
            - Path=/sso/resource/**
          filters:
            - StripPrefix=1
        - id: router02
          uri: lb://sso-auth
          predicates:
            - Path=/sso/oauth/**
          filters:
            - StripPrefix=1
      globalcors: #跨域配置(写到配置文件的好处是可以将其配置写到配置中心)
        corsConfigurations:
          '[/**]':
            allowedOrigins: "*"
            allowedHeaders: "*"
            allowedMethods: "*"
            allowCredentials: true

```

第四步：定义启动类，例如：

```java
package com.jt;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}

```

### 启动postman进行访问测试

- 基于网关进行登陆访问测试，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/755482013f494c349401f1fbce4a1494.png)

- 基于网关进行资源访问测试，例如：
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/50a9b5dc717f42f88af00d04634f1492.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/76f16b4513fc4a31a26ac72605a98c25.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f2334bef7d2442bb2cd5eacf965719f.png)

## 客户端UI工程设计及实现

### 业务描述

本次项目设计采用前后端分离架构设计，前端工程服务基于springboot web服务进行实现。

### 项目创建及初始化

第一步：创建项目，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/31f6a305e0db49ea83862f1a4093a96f.png)

第二步:项目中添加如下依赖,例如:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

第三步：创建启动类，例如：

```java
package com.jt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UIApplication {
    public static void main(String[] args) {
        SpringApplication.run(UIApplication.class, args);
    }
}
```

### 创建UI工程登陆页面

第一步：在resource目录下创建static目录
第二步:在static目录下创建登陆页面login.html,例如：

```html
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>login</title>
</head>
<body>
<div class="container"id="app">
    <h3>Please Login</h3>
    <form>
        <div class="mb-3">
            <label for="usernameId" class="form-label">Username</label>
            <input type="text" v-model="username" class="form-control" id="usernameId" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="passwordId" class="form-label">Password</label>
            <input type="password" v-model="password" class="form-control" id="passwordId">
        </div>
        <button type="button" @click="doLogin()" class="btn btn-primary">Submit</button>
    </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm=new Vue({
        el:"#app",//定义监控点，vue底层会基于此监控点在内存中构建dom树
        data:{ //此对象中定义页面上要操作的数据
            username:"",
            password:""
        },
        methods: {//此位置定义所有业务事件处理函数
            doLogin() {
                //1.定义url
                let url = "http://localhost:9000/sso/oauth/token"
                //2.定义参数
                let params = new URLSearchParams()
                params.append('username',this.username);
                params.append('password',this.password);
                params.append('client_id',"gateway-client");
                params.append('client_secret',"123456");
                params.append('grant_type',"password");
                //3.发送异步请求
                axios.post(url, params)
                    .then((response) => {//ok
                         alert("login ok")
                         let result=response.data;
                         console.log("result",result);
                         //将返回的访问令牌存储到浏览器本地对象中
                         localStorage.setItem("accessToken",result.access_token);
                         location.href="/resource.html";
                         //启动一个定时器,一个小时以后,向认证中心发送刷新令牌
                     })
                    .catch((e)=>{
                        console.log(e);
                    })
            }
        }
    });
</script>
</body>
</html>

```

第三步：打开浏览器进行访问测试，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/b054ae4cbc0540d5ba2b3209828838cb.png)

### 创建资源展现页面

第一步：在UI工程的static目录下创建resource.html，例如：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div>
    <h1>The Resource Page</h1>
    <button onclick="doSelect()">查询我的资源</button>
    <button onclick="doUpdate()">修改我的资源</button>
</div>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    function doSelect(){
        let url="http://localhost:9000/sso/resource";
        //获取登录后,存储到浏览器客户端的访问令牌
        let token=localStorage.getItem("accessToken");
        //发送请求时,携带访问令牌
        axios.get(url,{headers:{"Authorization":"Bearer "+token}})
            .then(function (response){
                alert("select ok")
                console.log(response.data);
            })
            .catch(function (e){//失败时执行catch代码块
                if(e.response.status==401){
                    alert("请先登录");
                    location.href="/login.html";
                }else if(e.response.status==403){
                    alert("您没有权限")
                }
                console.log("error",e);
            })
    }
    function doUpdate(){
        let url="http://localhost:9000/sso/resource";
        //获取登录后,存储到浏览器客户端的访问令牌
        let token=localStorage.getItem("accessToken");
        console.log("token",token);
        //发送请求时,携带访问令牌
        axios.put(url,"",{headers:{"Authorization":"Bearer "+token}})
            .then(function (response){
                alert("update ok")
                console.log(response.data);
            })
            .catch(function (e){//失败时执行catch代码块
                console.log(e);
                if(e.response.status==401){
                    alert("请先登录");
                    location.href="/login.html";
                }else if(e.response.status==403){
                    alert("您没有权限")
                }
                console.log("error",e);
            })
    }
</script>
</body>
</html>

```

第二步：打开浏览器进行访问测试（登陆前和登陆后检查点击如下按钮检测结果），例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2c72f473153b4ca58c0b891e060341cb.png)

## 技术摘要应用实践说明

### 背景分析

企业中数据是最重要的资源,对于这些数据而言,有些可以直接匿名访问,有些只能登录以后才能访问,还有一些你登录成功以后,权限不够也不能访问.总之这些规则都是保护系统资源不被破坏的一种手段.几乎每个系统中都需要这样的措施对数据(资源)进行保护.我们通常会通过软件技术对这样业务进行具体的设计和实现.早期没有统一的标准,每个系统都有自己独立的设计实现,但是对于这个业务又是一个共性,后续市场上就基于共性做了具体的落地实现,例如Spring Security,Apache shiro，JWT，Oauth2等技术诞生了.

### Spring Security 技术

Spring Security 是一个企业级安全框架,由spring官方推出,它对软件系统中的认证,授权,加密等功能进行封装,并在springboot技术推出以后,配置方面做了很大的简化.现在市场上分布式架构中的安全控制，正在逐步的转向Spring Security。Spring Security 在企业中实现认证和授权业务时,底层构建了大量的过滤器，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/15d6c54ad7d64099a792a1b8d4742550.png)

其中:
图中绿色部分为认证过滤器,黄色部分为授权过滤器。Spring Security就是通过这些过滤器然后调用相关对象一起完成认证和授权操作.

- 关于Bcrypt算法

Spring Security推荐使用Bcrypt算法来实现对密码原文的加密处理，在框架中有BcryptPasswordEncoder类，此类可以实现加密、判断密码是否匹配等功能。

在密码加密器（PasswordEncoder）中需要关注的方法有：

```
// 使用原文作为参数，将返回密文
public String encode(CharSequence rawPassword);

// 使用原文作为第1个参数，使用密文作为第2个参数，将返回是否匹配
public boolean matches(CharSequence rawPassword, String encodedPassword)
```

提示：Bcrypt算法对于同一个原文反复做加密处理时，每次得到的密文都是不同的，是因为在加密处理过程中使用了随机盐，所以可以得到不同的密文，同时，由于盐值被保存在密文中了，所以也是可以正常验证的。

```
public class BcryptTests {
    @Test
    public void testEncode() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPassword = "123456";
        for (int i = 0; i < 10; i++) {
            String encodedPassword = passwordEncoder.encode(rawPassword);
            System.out.println("原密码=" + rawPassword + "，密文=" + encodedPassword);
        }
    }

    @Test
    public void testMatch() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPassword = "123456";
        String[] encodedPasswords = {
                "$2a$10$WeuikNbKuRCkqr8JrpC75uIa6lYhJ5fuBtWGnGMpJK7MQ8EKLaICa",
                "$2a$10$Jm6fOxg4g4mH.FZ8xXO2OOeTqHAVe6fN/6IATox0NXO1wcW3wq.Q6",
                "$2a$10$EbSsOZUg7F3EMEbgXTHXxuRSbjSxOker.aTjdI1h/zz4SCRNVuDvm"
        };
        for (int i = 0; i < encodedPasswords.length; i++) {
            boolean result = passwordEncoder.matches(rawPassword, encodedPasswords[i]);
            System.out.println("原密码=" + rawPassword + "，密文=" + encodedPasswords[i] + "，验证结果=" + result);
        }
    }


}
```

### Jwt 数据规范

JWT(JSON WEB Token)是一个标准，采用数据自包含方式进行json格式数据设计，实现各方安全的信息传输，其官方网址为：https://jwt.io/。官方JWT规范定义，它构成有三部分，分别为Header(头部)，Payload(负载)，Signature(签名),其格式如下：

```bash
xxxxx.yyyyy.zzzzz
```

> Header部分

Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

上面代码中，alg属性表示签名的算法（algorithm），默认是 HMAC SHA256（简写HS256）；typ属性表示这个令牌（token）的类型（type），JWT 令牌统一写为JWT。最后，将这个 JSON 对象使用 Base64URL 算法（详见后文）转成字符串。

> Payload部分

Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT规范中规定了7个官方字段，供选用（了解）。

- iss (issuer)：签发人
- exp (expiration time)：过期时间
- sub (subject)：主题
- aud (audience)：受众
- nbf (Not Before)：生效时间
- iat (Issued At)：签发时间
- jti (JWT ID)：编号
  除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子。

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

注意，JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。

这个 JSON 对象也要使用 Base64URL 算法转成字符串。

> Signature部分

Signature 部分是对前两部分的签名，其目的是防止数据被篡改。

首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

```json
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（.）分隔，就可以返回给用户。

### Oauth2规范

oauth2定义了一种认证授权协议，一种规范，此规范中定义了四种类型的角色：

1)资源有者(User)

2)认证授权服务器(jt-auth)

3)资源服务器(jt-resource)

4)客户端应用(jt-ui)

同时，在这种协议中规定了认证授权时的几种模式：

1)密码模式 (基于用户名和密码进行认证)

2)授权码模式(就是我们说的三方认证：QQ，微信，微博，。。。。)

3)…

## 总结（Summary）

### 重难点分析

- 单点登陆系统的设计架构（微服务架构）
- 服务的设计及划分(资源服务器，认证服务器，网关服务器，客户端服务）
- 认证及资源访问的流程(资源访问时要先认证再访问)
- 认证和授权时的一些关键技术(Spring Security,Jwt,Oauth2)

### FAQ 分析

- 为什么要单点登陆（分布式系统，再访问不同服务资源时，不要总是要登陆，进而改善用户体验）
- 单点登陆解决方案？(市场常用两种: spring security+jwt+oauth2,spring securit+redis+oauth2)
- Spring Security 是什么？（spring框架中的一个安全默认，实现了认证和授权操作, 一个spring认证和授权框架,可以基于Oauth2协议进行认证和授权的落地实现）
- JWT是什么？（是JSON WEB TOKEN这几个单词的缩写，描述的是web应用中的一种令牌格式, 一种令牌格式，一种令牌规范，通过对JSON数据采用一定的编码，加密进行令牌设计）
- Oauth2是什么?(协议,定义了完成认证和授权操作时所需要的一些对象以及这些对象应用方式)
- JWT有几部分构成？(头:令牌类型，签名算法，负载:允许包含用户登录状态 ，签名:防止令牌被篡改)
- 为什么要采用JWT令牌?(可以存储用户登录状态信息，避免访问资源时从数据库查询认证信息)
- 基于Oauth2协议的认证服务器默认的令牌生成策略是什么?(UUID.randomUUID())
- 认证服务器中常见令牌相关设计中对应的存储方案有哪些?(Mysql,Redis,Jwt)
- 认证服务器对用户进行认证时,客户端提交了哪些关键信息?(username,password,client_id,grant_type,client_secret)
- 认证服务器完成认证操作后,服务端返回哪些信息?(访问令牌,刷新令牌,令牌类型,作用域,编号)
- 认证服务器中完成认证业务的关键对象有哪些?(Filter,AutenticationManager,UserDetailService,.)
- 资源服务器如何设计的认证,授权规则?(三个维度：匿名,登录,授权)
- 访问令牌与刷新令牌有什么不一样?(客户端是要携带访问令牌访问资源的，刷新令牌是为了再次生成访问令牌)
- 访问令牌，刷新令牌有有效时长吗？(刷新令牌有效时长一般要大于访问令牌有效时长)
- 为什么网关层面要做跨域设计?(Ajax技术不支持跨域请求，将所有服务的跨域共性提取到网关层面)
- UI工程中用户端如何提交ajax请求的?(axios，底层ajax对象为XMLHttpRequest)
- @EnableAuthorizationServer注解的作用是什么?(描述认证服务中的配置类,开启认证服务)
- @EnableResourceServer注解的作用是什么?(描述资源服务器中的配置类,开启资源鉴权服务)
- @EnableGlobalMethodSecurity注解的作用?(描述资源服务中的配置,开启访问层面的访问拦截)
- @PreAuthorize注解的作用?(描述资源访问方法,定义鉴权切入点方法,例如controller中方法)

- 单点登录系统中你的服务是如何设计的,工程结构是怎样的?
- 项目中使用的连接池什么？(HikariCP）
- Java中连接池设计需要遵循的数据源规范是谁？（javax.sql.DataSource）
- 连接池这块你能想到的设计模式有哪些？（单例，享元，桥接，slf4j门面）
- 如何基于用户id查询用户权限,你有什么方案?（3种）
- 为什么定义RemoteUserService 接口(Feign)?(基于此接口调用远程sso-system服务)
- 用户登录时,需要从数据库查询哪些信息?(用户信息以及用户的权限信息)
- sso-auth服务中用户业务数据的获取在哪里?(客户端提交的用户名，sso-system服务提供的数据库数据)
- 为什么要构建SecurityConfig对象?（配置加密算法，提供认证管理器对象）
- 为什么要让SecurityConfig类要继承WebSecurityConfigurerAdapter类型?（重写默认的认证规则）
- 认证过程中使用的密码加密对象是谁?（BCryptPasswordEncoder，不可逆加密对象）
- 基于idea的为类自动生成序列化id?
第一步：修改idea中的配置。

![](https://img-blog.csdnimg.cn/3f4e29df7fd844e597874245f75391cf.png)

第二步：在User类上按alt+enter，例如：

![](https://img-blog.csdnimg.cn/9f161b74219743ebad6558b9714a6773.png)

@Autowired注解描述的Mapper对象有红色波浪线，但运行没有错误，如何去除红色波浪线。

![](https://img-blog.csdnimg.cn/6eafe6f045324e1e9c72a9cf2ae698b6.png)

### Bug 分析

- 401 : 访问资源时没有认证。
- 403 : 访问资源时没有权限。
- 404：访问的资源找不到（一定要检查你访问资源的url）
- 405: 请求方式不匹配（客户端请求方式是GET，服务端处理请求是Post就是这个问题）
- 500: 不看后台无法解决？（error,warn）
- …