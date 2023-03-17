# MyBatis-Plus
[[TOC]]

## 什么是MyBatis Plus 

Mybatis Plus简称MP,是MyBatis的增强版

之所以我们学习MP是因为MP相对于MyBatis拥有更多功能

而我们在项目编写过程中恰好需要这些功能

MP相对于MyBatis多出的功能主要有

1.自动生成基本增删改查方法

2.能够指定一个数据库,按照数据库中的表生成为项目中的结构

## MP核心原理

### 需求

说明: 之前操作数据库采用sql(面向过程的语言)方法进行编辑. 但是如果所有的单表操作都由程序员完成.则开发效率低. 能否开发一种机制可以实现以**面向对象**的方式操作数据库.

### 原理说明

1.对象与数据表进行关联 @TableName

2.MP采用BaseMapper的方式 将公共的接口方法进行了抽取. 采用泛型T的方式进行约束

3.MP将用户操作的对象在底层自动的转化为Sql语句!!!

### 对象转化Sql原理

对象方法: userMapper.insert(User对象);

Sql语句: insert into demo_user(id,name…) value(100,xxx…)

步骤:

1.根据userMapper找到对应的class类型

2.根据userMapper的类型通过反射机制获取父级接口类型BaseMapper

3.找到BaseMapper类型之后,获取泛型类型 User.class

4.获取User.class之后,获取class的注解名@TableName注解.获取注解名称. 至此表名获取成功

5.根据User.class获取其中的属性名称.之后获取属性上的@TableField 获取字段名称.

6.之后利用对象的get方法获取属性的值最终实现了Sql语句的拼接过程.

7.MP将整理好的Sql交给Mybatis(jdbc)去处理. 最终实现了以对象的方式操作数据库.

## MyBatis Plus简介

### 概述

MyBatis-Plus（简称 MP）是一个 MyBatis 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生.简单的SQL几乎是不需要再写了

### 特性

无侵入：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑

损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作

强大的 CRUD 操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求

支持 Lambda 形式调用：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错

支持主键自动生成：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题

支持 ActiveRecord 模式：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作

支持自定义全局通用操作：支持全局通用方法注入（ Write once, use anywhere ）

内置代码生成器：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用

内置分页插件：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询

分页插件支持多种数据库：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库

内置性能分析插件：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询

内置全局拦截插件：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作



### 支持数据库

mysql 、 mariadb 、 oracle 、 db2 、 postgresql 、 sqlserver 等等…

### 常用注解

@TableName(“表名”) ：当表名与实体类名不一致时，可以在实体类上加入@TableName（）声明

@TableId(type = IdType.AUTO)：声明属性为表中的主键（若属性名称不为默认id）

@TableFieId(“字段名”) ：当实体类属性与表字段不一致时，可以用来声明

###  pom坐标

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.2</version>
</dependency>

```

### 入门案例

#### 改造实体类

**使用注解开发,类上,属性上都要用MP提供的注解**

```java
package cn.tedu.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
@Data
@Accessors(chain = true)
@TableName("user") //这是表名,表明实体对象和表之间的映射关系
public class User extends BasePojo implements Serializable {
    @TableId(type = IdType.AUTO) //这是主键,且自增,表明字段和主键的映射关系
    private Integer id;
//    @TableField("user_name") //非主键的字段使用,当属性名和字段名不一样时,要写明字段名,表明字段和属性的映射关系
    @TableField  //非主键的字段使用,如果属性名和字段名能映射成功(驼峰规则)就可以这样简写
    private String username;
    private String password;
    private String phone;
    private String email;
    private Integer status; //1是启动,0是停用

}

```

#### 修改Mapper层接口

**Mapper层的接口,需要继承BaseMapper,并使用泛型!MP简化了单表CRUD的SQL操作,多表最好还是要自己写SQL的**

```java
package cn.tedu.dao;

import cn.tedu.pojo.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.*;

import java.util.List;

//继承BaseMapper,并使用泛型!MP简化了单表CRUD的SQL操作,多表最好还是要自己写SQL的!!!!!
public interface UserMapper extends BaseMapper<User> {
    List<User> findAll();//查找所有用户
    User findByNP(User user);//登录,根据账号密码查用户

    //MP,省略了去mapper.xml文件中,写SQL的过程
    @Select("select count(1) from user")
    Long count();//查询总记录数
    //根据分页条件,查询分页的数据,多个数据,进行封装,@Param,可以把参数自动封装成map结构,key就是括号里的值
    List<User> findUserList(@Param("start") int start,@Param("num")  int num,@Param("query")  String query);

    //删除用户
    @Delete("delete from user where id=#{id}")
    void deleteById(Integer id);
    //添加用户
    @Insert("INSERT INTO USER VALUES(NULL,#{username},#{password},#{phone},#{email},#{status},#{created},#{updated})")
    void addUser(User user);
    //修改用户的 查询回显
    @Select("select * from user where id=#{id}")
    User findById(Integer id);
    /** 修改用户信息--手机号/邮箱/修改时间  */
    @Update("update user set phone=#{phone},email=#{email},updated=now() where id=#{id}")
    void updateUser(User user);
}

```

#### 修改核心配置文件

**当前yml中,配置的是Mybatis的信息,要改成Mybatis-Plus就可以了,就是把mybatis: 改成mybatis-plus:**

```yml
server:
  port: 8091
#SpringBoot配置mysql信息
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql:///cgbtest?useUnicode=true&characterEncoding=utf8&useSSL=false
    username: root
    password: root
#SpringBoot整合Mybatis配置
#mybatis:
# 1. SpringBoot整合MybatisPlus配置!!!!
mybatis-plus:
  #别名包
  type-aliases-package: cn.tedu.pojo
  #指定UserMapper.xml文件的位置
  mapper-locations: classpath:mappers/*.xml
  #开启驼峰映射
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl # 2. 打印MP自动生成的SQL
```

#### 测试MP

**MP最大的优势就是省略了SQL语句的编写,甚至Mapper.xml文件都可以不存在了,直接调用MP提供的接口,MP会自动发起SQL来执行,我们的学习任务就是把MP提供的方法用熟练就可以了.**

```java
package cn.tedu.vo;

import cn.tedu.dao.UserMapper;
import cn.tedu.pojo.User;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class SsmApplicationTests {

    @Autowired
    private UserMapper userMapper;

    //测试mp提供的接口,直接调接口,自动发起SQL,不需要自己写简单的SQL了
    @Test
    void contextLoads() {
        User user1 = new User(null,"haha","123","13233335555","11@qq.com",1);
        userMapper.insert(user1); //新增

        userMapper.deleteById(11);//删除

        User user = userMapper.selectById(2); //查一个
        System.out.println(user+"===========");

        List<User> users = userMapper.selectList(null); //查所有
        for (User u : users) {
            System.out.println(u+"~~~~~~~~~~~~~~");
        }

        //按条件查询= , SELECT * FROM user WHERE email='11@qq.com'
        User uu = new User();
        uu.setEmail("11@qq.com");//set的设置就相当于是=的设置
        //需用一个条件构造器,他会根据不为空的属性,自动发起查询语句(email='11@qq.com')
        QueryWrapper<User> qw = new QueryWrapper(uu);//这里表示where email='11@qq.com'
        userMapper.selectList(qw);//按条件查到多个

        //按条件查询>= , SELECT * FROM user WHERE id>=3
        QueryWrapper<User> qw2 = new QueryWrapper<>();
        //>gt <lt =eq >=ge <=le !=ne
        qw2.ge("id",3);//这里表示where id>=3
        userMapper.selectList(qw2);

        //模糊查询,like
        QueryWrapper<User> qw3 = new QueryWrapper<>();
//        qw3.likeRight("username","a");//这里表示where username like 'a%'
//        qw3.likeLeft("username","a");//这里表示where username like '%a'
        qw3.like("username","a");//这里表示where username like '%a%'
        qw3.orderByDesc("id");//排序,可以升序 降序
        userMapper.selectList(qw3);

        //in查询
        QueryWrapper<User> qw4 = new QueryWrapper<>();
//        int[] arr = {1,2,3}; //要用引用类型
        Integer[] arr = {1,2,3}; //要用引用类型
//        qw4.in("id",arr); //这里表示where id in(1,2,3)
        //也可以添加判断条件,这里表示arr不为空时,才会拼接查询条件
        qw4.in(arr!=null&&arr.length!=0,"id",arr);
        userMapper.selectList(qw4);
       
        //更新操作
        QueryWrapper<User> qw5 = new QueryWrapper<>();
        User uu2 = new User();
        uu2.setId(1).setEmail("11@163.com").setPhone("110");
        userMapper.updateById(uu2);//只会把id的值作为查询条件,其他的都用来set

        //批量删
        List<Integer> list = Arrays.asList(new Integer[]{21,22,23,24,25,26,27,28,29,30,31,32});
        userMapper.deleteBatchIds(list);

    }

}
```

## 添加MyBatisPlus依赖

父项目pom.xml

```xml
<properties>
    <java.version>1.8</java.version>
    <!--  指定MyBatisPlus的版本  -->
    <mybatis.plus.version>3.3.1</mybatis.plus.version>
</properties>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>${mybatis.plus.version}</version>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-extension</artifactId>
            <version>${mybatis.plus.version}</version>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>${mybatis.plus.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

dependencyManagement标签并不是添加依赖 而是管理依赖
 这里主要是管理依赖版本,父项目中管理约定完毕
 子项目在需要这个依赖时就不需要指定版本了

knows-portal子项目pom.xml添加依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

在项目中的resources文件夹中的application.properties文件中编写代码如下

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/konws?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
spring.datasource.username=root
spring.datasource.password=root
```

SpringBoot启动类添加扫描MyBatis的包

```java
@SpringBootApplication
@MapperScan("cn.tedu.knows.portal.mapper")
public class KnowsPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(KnowsPortalApplication.class, args);
    }

}
```

## 测试MyBatisPlus

首先我们添加一个对应数据库的实体类

```java
@Data
public class Tag {

    private Integer id;
    private String name;
    private String createby;
    private LocalDateTime createtime;
}
```

创建mapper包

包中创建新的接口TagMapper

```java
//MybatisPlus新增的功能是继承一个父接口BaseMapper
//继承BaseMapper<Tag>之后,当前TagMapper接口中就会自动
//实现基本的增删改查操作,无需我们编写任何代码
public interface TagMapper extends BaseMapper<Tag> {
}
```

测试代码

```java
@Resource
TagMapper tagMapper;

@Test
public void testTag(){

    //按id查
    /*Tag t1=tagMapper.selectById(1);
    System.out.println(t1);*/

    //新增
    /*Tag tag=new Tag();

    tag.setName("gateway");
    tag.setCreateby("admin");
    //LocalDateTime.now()当前程序运行的时间
    tag.setCreatetime(LocalDateTime.now());
    int num=tagMapper.insert(tag);
    log.debug("影响"+num+"行");
    log.error(tag.toString());
    */

    //按id删除
    int num=tagMapper.deleteById(21);
    int num2=tagMapper.deleteById(22);
    log.debug(num+","+num2);

}
```



日志重要级别

我们可以利用Lombok提供的@Slf4j注解给方法中提供可以记录日志的对象

这个对象记录的日志可以分几个级别

常见的从不重要到重要级别如下

* trace									不重要
* debug                                     ↓
* info                                         ↓
* warn
* error
* fatal                                    重要\严重

可以设置SpringBoot项目中日志的数据级别

application.properties文件新增如下代码

```properties
# SpringBoot默认只输出error级别以上的日志信息到控制台
# 如果我们想将我们日志其它级别的内容显示输出到控制台需要如下设置

# cn.tedu.knows.portal包中的所有类以及子包中的所有类
# 日志输出debug以及debug以上级别的日志信息会显示在控制台(门槛)
logging.level.cn.tedu.knows.portal=debug
```

## MyBatis代码生成器

代码生成器的作用

能够按照指定的数据库中的表的格式

生成这个表对应的java项目需要的基本结构

简化程序员开发的流程,提高开发效率

为了不将生成过程的内容和我们编写具体项目业务混在一起

我们新建一个聚合项目,专用于生成需要的代码

这样生成代码的步骤就和正常业务分离开了

创建项目knows-generator

父子相认

```xml
<module>knows-generator</module>
```

子项目pom.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>cn.tedu</groupId>
        <artifactId>knows</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.tedu</groupId>
    <artifactId>knows-generator</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>knows-generator</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-freemarker</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-extension</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

</project>
```

后面的步骤参考苍老师网站上的资料即可



将生成出来的内容赋值到portal项目的对应位置

之后generator项目中生成的内就可以删除了!

## 生成代码的测试

测试Mapper

测试类中编写代码如下

```java
@Resource
UserMapper userMapper;
@Test
public void testUser(){

    List<User> list=userMapper.selectList(null);
    for(User user:list){
        log.debug(user.toString());
    }

}
```

测试控制器

在UserController类中编写如下代码

```java
@RestController
@RequestMapping("/v1/users")
public class UserController {

    //之前我们都是控制器调用mapper
    //现在要求要企业项目中的格式
    //controller调用service,service内部调用mapper
    @Autowired
    private IUserService userService;
    //根据类上的既有路径,我们下面的控制器方法访问的url为
    //  http://localhost:8080/v1/users/get?id=3
    @GetMapping("/get")
    public User get(Integer id){
        //MybatisPlus也在service中提供了一些常用的数据库操作方法
        //基本的数据库操作直接自动调用Mapper无需我们编写代码
        User user=userService.getById(id);
        return user;
    }
}
```

重启服务输入地址

http://localhost:8080/v1/users/get?id=3

浏览器上会看到这个用户的信息(json)

idea启动项中残留了代码生成器项目的启动选项

我们可以删除它

选中启动项中的第一项Edit.....

然后再窗口中删除即可

## MybatisPlus案例



### MP常规操作

#### 添加日志打印

```yml
server:
  port: 8090

#SpringBoot 开箱即用
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/jtadmin?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true
    username: root
    #检查密码是否正确
    password: root

#SpringBoot整合MybatisPlus配置
mybatis-plus:
  #定义别名包
  type-aliases-package: com.jt.pojo
  mapper-locations: classpath:/mappers/*.xml
  #开启驼峰映射
  configuration:
    map-underscore-to-camel-case: true

#添加MP日志  打印执行的sql
logging:
  level:
    com.jt.mapper: debug

```

#### 测试入库操作

```java
package com.jt;

import com.jt.mapper.DemoUserMapper;
import com.jt.pojo.DemoUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestMP {

    @Autowired
    private DemoUserMapper userMapper;

    @Test
    public void insert(){
        DemoUser user = new DemoUser();
        user.setName("MP测试").setSex("男").setAge(19);
        userMapper.insert(user);
    }

}

```

#### 测试更新操作

```java
 //测试更新操作 修改id=231的数据 name="中午吃什么" age=18
    //原则: 根据对象中不为null的属性当做set条件. set name="xxx"
    //      如果ById的操作,则Id必须赋值 并且ID当做唯一where条件
    @Test
    public void updateById(){
        DemoUser user = new DemoUser();
        user.setName("中午吃什么").setAge(18).setId(231);
        userMapper.updateById(user);
    }

```

### 切换Maven工具

#### 关于Maven说明

程序员操守:

1.Maven不要放到C的系统盘中 不要有中文目录 空格

2.在D盘中复制maven工具 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429140932938.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

3.配置settings文件

3.1 切换 自己的本地库
${user.home}/.m5/repository

3.2 切换私服镜像

```xml
		 
	<mirror>
	<id>aliyun</id>
	<name>aliyun for maven</name>
	<mirrorOf>*</mirrorOf>
	<url>https://maven.aliyun.com/repository/public</url>
   </mirror>
```

3.3 切换JDK版本

```xml
	 <profile>
   <id>jdk-1.8</id>
   <activation>
	<activeByDefault>true</activeByDefault>
      <jdk>1.8</jdk>
   </activation>
   <properties>
	   <maven.compiler.source>1.8</maven.compiler.source>
	   <maven.compiler.target>1.8</maven.compiler.target>
	   <maven.compiler.compilerVersion>
        1.8
       </maven.compiler.compilerVersion>
	 </properties>
   </profile>	 
```

#### 配置IDEA

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429141331328.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### MP常规操作

#### 根据对象查询

```java
    /**
     * 1.查询id=21的用户  根据ID查询数据   1条记录
     * 2.查询name="白骨精" sex=女 的用户   List
     * 知识点:
     *      1.queryWrapper  条件构造器  拼接where条件的.
     *      原则: 根据对象中不为null的属性拼接where条件
     */
    @Test
    public void testSelect(){
        //1.根据ID查询
        DemoUser user = userMapper.selectById(21);
        System.out.println(user);
        //2.根据属性查询
        DemoUser user2 = new DemoUser();
        user2.setName("白骨精").setSex("女");
        QueryWrapper<DemoUser> queryWrapper = new QueryWrapper<>(user2);
        List<DemoUser> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

```

#### 条件构造器查询

说明: 如果查询条件中有特殊关系符,则使用特殊转义字符查询 代码如下.

```java
/**
     * 需求: 查询age>18岁  并且性别为女的用户
     * Sql: select * from demo_user where age > 18 and sex="女"
     * 特殊字符:  > gt   < lt   = eq
     *           >= ge  <= le
     * 默认链接符: and
     *
     * */
    @Test
    public void testSelect2(){
        QueryWrapper<DemoUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.gt("age", 18)
                    .eq("sex", "女");
        List<DemoUser> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

```

#### 关键字like查询

```java
 /**
     * 练习like关键字
     *      查询name中包含"精"字的数据
     * Sql: like "%精%"
     *      以精开头    like "精%"   likeRight
     *      以精结尾    like "%精"   likeleft
      */
    @Test
    public void testSelect3(){
        QueryWrapper<DemoUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("name", "精");
        List<DemoUser> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

```

#### 关键字OrderBy

```java
 /**
     * 查询sex=男的数据,以id倒序排列
     * Sql: select * from demo_user where sex='男' order by id desc
     */
    @Test
    public void testSelect4(){
        QueryWrapper<DemoUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("sex", "男")
                    .orderByDesc("id");
        List<DemoUser> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

```

#### In关键字

```java
/**
     * 5.查询id= 1,3,5,6,7的用户
     * Sql: select * from demo_user where id in (xxx,xx,xx)
     */
    @Test
    public void testSelect5(){
        //数组使用包装类型
        Integer[] ids = {1,3,5,6,7};
        //需要将数组转化为集合
        List idList = Arrays.asList(ids);
        QueryWrapper<DemoUser> queryWrapper = new QueryWrapper<>();
        //queryWrapper.in("id", idList);    //根据list查询 list集合功能丰富
        queryWrapper.in("id", ids); //数组必须包装类型
        List<DemoUser> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

```

#### 带判断条件的查询

```java
 /**
     * 需求: 如果根据name属性和age属性查询数据. 有时某个数据可能为null,
     *      要求动态查询!!!
     *      where name=xxx age>xxxx
     * 伪Sql: select * from demo_user
     *              where name!=null name=xxx and age!=null age>xxx
     * condition: 内部编辑一个判断的条件
     *                      如果返回值结果为true 则拼接该字段.
     *                      如果为false 则不拼接该字段
     * StringUtils.hasLength(name) 判断字符串是否有效
     */
    @Test
    public void testSelect6(){
        QueryWrapper<DemoUser> queryWrapper = new QueryWrapper<>();
        String name = "";
        int age = 18;
        queryWrapper.eq(StringUtils.hasLength(name),"name",name)
                    .gt(age>0, "age",age);
        List<DemoUser> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

```

#### 查询第一列数据

```java
/**
     * 需求: 只想查询第一列数据   selectObjs
     * 说明: queryWrapper=null 不需要where条件
     * selectObjs:
     *      1.一般根据条件查询Id的值,查询之后为后续的sql提供数据支持
     *      2. 有时用户只需要查询ID的值,并不需要其他数据项时 使用objs.
    */
    @Test
    public void testSelect7(){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("sex","男");
        List objs = userMapper.selectObjs(queryWrapper);
        System.out.println(objs);
    }

```

#### 查询指定字段的数据

```java
/**
     * 需求: 想查询name/sex字段
     *  queryWrapper.select("name","sex"); 挑选执行字段
     */
    @Test
    public void testSelect8(){
        QueryWrapper<DemoUser> queryWrapper = new QueryWrapper();
        queryWrapper.select("name","sex");
        List objs = userMapper.selectList(queryWrapper);
        System.out.println(objs);
    }

```

#### 更新数据

```java
package com.jt;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.jt.mapper.UserMapper;
import com.jt.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestUpdate {

    @Autowired
    private UserMapper userMapper;

    /**
     * 1.将ID=231的数据 name改为 "xx"
     * Sql: update demo_user set name="xx" where id=231

     */
    @Test
    public void testUpdate(){
        User user = new User();
        user.setId(231).setName("中秋节快乐").setAge(10).setSex("男");
        //byId 表示ID只当作where条件.
        //其它不为null的属性 当作set条件
        userMapper.updateById(user);
    }

    /**
     * 2.将name="中秋节快乐" 改为 name="国庆快乐" age=40 sex="男"
     *  .update(arg1,arg2)
     *   arg1: 实体对象  set条件的数据
     *   arg2: updateWrapper 动态拼接where条件
     */
    @Test
    public void testUpdate2(){
        User user = new User();
        user.setName("国庆快乐").setAge(40).setSex("男");
        UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("name","中秋节快乐");
        userMapper.update(user,updateWrapper);
        System.out.println("更新操作成功!!!!");
    }
}
```



```java
 /**
     * 更新数据
     *      将name="中午吃什么" 改为name="晚上吃什么"
     *      性别: 改为 其他
     * Sql:
     *      update demo_user set name="xxx",sex="其他"
     *          where name="xxxx"
     * 参数说明:
     *      1.entity 实体对象  需要修改的数据进行封装
     *      2.updateWrapper 条件构造器
     */
    @Test
    public void testSelect10(){
        DemoUser user = new DemoUser();
        user.setName("晚上吃什么").setSex("其他");
        UpdateWrapper updateWrapper = new UpdateWrapper();
        updateWrapper.eq("name", "中午吃什么");
        userMapper.update(user,updateWrapper);
    }

```

### 关于查询总结

1.MP核心: 以对象的方式操作数据库

2.条件构造器: new QueryWrapper<>(); 动态拼接where条件.

3.拼接规则: 根据对象中不为null的属性充当where条件.

4.特殊转义字符: = eq, > gt, < lt, >= ge, <= le,!= ne

5.xml文件中的万能的转义字符: `<![CDATA[ sql语句 ]]>`

6.关键字: like order by in

7.动态Sql语法:
condition: true 拼接where条件
false 不拼接where条件

### MP入门案例

```java
package com.jt;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.jt.mapper.UserMapper;
import com.jt.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class TestMP {

    @Autowired
    private UserMapper userMapper;

    /**
     * 完成数据的入库操作
     * 新增user数据(name="中秋",age=40,sex="厉害")
     * Sql: insert into demo_user value(xx,xx,xx,xx)
     * 思考: MP实现入库流程!!!
     * 选择A: 讲mp入库流程 理论为主.
     */
    @Test
    public void test01(){
        User user = new User();
        user.setName("中秋").setAge(40)
                .setSex("厉害");
        //以对象的方式操作数据!!!
        userMapper.insert(user);
        System.out.println("入库操作成功!!!!");
    }

    /**
     * 以mybatis的方式实现数据库查询
     * 1.实现user入库操作   insert into
     * 2.update  将name="国庆" 改为 name="中秋"
     * 3.delete  将name="国庆"数据删除.
     * 4.select  查询 name="小乔" 并且 性别 ="女"
     * 5.select  查询age < 18岁  性别="女"
     * 6.select  查询  name包含 '君'字的数据
     * 7.select  查询  sex="女"  按照年龄倒序排列.
     * 8.根据 name/sex 不为null的数据查询. 动态Sql!!
     *   name="xxx" sex=null
     *   name="xxx" sex="xx"
     *   name=null  sex=null
     */

    //1.查询ID查询数据库 id=231  主键查询
    @Test
    public void selectById(){
        int id = 231;   //模拟用户参数.
        User user = userMapper.selectById(id);
        System.out.println(user);
    }

    /**
     * 2.查询 name="小乔" 并且 性别 ="女"
     * 思路: 如果将来有多个结果 则使用List进行接收.
     * Sql: select * from demo_user where name="小乔" and sex="女"
     * 注意事项: 默认的连接符  and
     */
    @Test
    public void select01(){
        //1.通过对象封装数据
        User user = new User();
        user.setName("小乔").setSex("女");
        //2.构建条件构造器 根据对象中不为null的属性充当where条件!
        QueryWrapper<User> queryWrapper = new QueryWrapper(user);
        //3.根据条件构造器 实现数据查询
        List<User> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

    /**
     * 3.查询 name="小乔" 并且 性别 ="女"
     * 逻辑运算符:  = eq, > gt, < lt
     *            >= ge, <= le
     *            != ne
     */
    @Test
    public void select02(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name","小乔")
                    .eq("sex","女");
        List<User> userList =
                userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

    /**
     * 4.案例: select  查询age < 18岁  性别="女"
     * 方式1: 利用mybatis方式实现
     * 方式2: 利用MP方式实现
     */
    @Test
    public void select03(){
        //1.mybatis写法
        List<User> userList = userMapper.findList(18,"女");
        System.out.println(userList);

        //2.mp写法
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.lt("age",18)
                        .eq("sex","女");
        List<User> userList2 = userMapper.selectList(queryWrapper);
        System.out.println(userList2);
    }


    /**
     * 5.select  查询  name包含 '君'字的数据
     * 关键字:  like "%xxx%"
     *         以君开头:  likeRight "君%"
     *         以君结尾:  likeLeft  "%君"
     */
    @Test
    public void select04(){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like("name","君");
        List<User> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

    /**
     * 6.select  查询  sex="女"  按照年龄倒序排列.
     */
    @Test
    public void select05(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("sex","女")
                    .orderByDesc("age");
        List<User> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

    /**
     *  7.需求: 动态Sql查询. 如果数据有值 则拼接where条件.
     *                   如果数据为null 则不拼接where条件
     *  语法: condition: true  拼接where条件
     *                  false 不拼接where条件
     */
    @Test
    public void select06(){
        String name = "貂蝉";
        int age = 19;
        boolean nameFlag = name == null ? false : true;
        boolean ageFlag = age == 0 ? false : true;
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq(nameFlag,"name",name)
                    .eq(ageFlag,"age",age);
        List<User> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);
    }

    /**
     * 8.批量查询  查询id= 1,4,5,6......的数据
     */
    @Test
    public void selectIn(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.in("id",1,4,5,6);
        List<User> userList = userMapper.selectList(queryWrapper);
        System.out.println(userList);

        //数组在未来由用户负责传递. 注意使用包装类型
        Integer[] array = new Integer[]{1,4,5,6};
        //数组转化为List集合
        List ids = Arrays.asList(array);
        List<User> userList2 = userMapper.selectBatchIds(ids);
        System.out.println(userList2);
    }

    /**
     * 9.查询性别为男的用户,只查询ID字段
     *  selectObjs(); 只查询第一列字段(主键)
     *  实际用途:  根据业务只需要主键的查询
     */
    @Test
    public void selectObjs(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("sex","男");
        List<Object> ids = userMapper.selectObjs(queryWrapper);
        System.out.println(ids);
    }
}
```

## 解决自动注入警告问题

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429171503517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

