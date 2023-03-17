# MyBatis框架
[[TOC]]

# 1. Mybatis入门

## 1.0 JDBC代码

```java
 //利用jdbc,完成新增的功能
    private static void method2() throws Exception{
        //1,注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        //2,获取数据库的连接
        //数据传输协议   数据库的ip 端口号 数据库名
        String url = "jdbc:mysql://localhost:3306/cgb2107";
        Connection c = DriverManager.getConnection(url,"root","root");
        //3,获取传输器
        Statement s = c.createStatement();
        //4,利用传输器执行  增删改的SQL
        //executeUpdate()用来执行增删改的SQL,只返回影响行数
        int rows = s.executeUpdate(
                "INSERT INTO emp(ename,job) VALUES('rose','副总')");
        //5,释放资源
        //r.close();//结果集
        s.close();//传输器
        c.close();//连接
    }
```

从中可以看出JDBC的开发效率很低.

## 1.1 Mybatis介绍

官网地址: https://mybatis.org/mybatis-3/zh/index.html

- MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。
- MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。
- MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。
- MyBatis 本是apache的一个开源项目iBatis, 2010年这个项目由apache software foundation 迁移到了google code，并且改名为MyBatis 。
- 2013年11月迁移到Github。

## 1.2 Mybatis源码

[mybatis源码](https://github.com/mybatis/mybatis-3)

## 1.3 Mybatis特点

- 简单易学：本身就很小且简单。没有任何第三方依赖，最简单安装只要两个jar文件+配置几个sql映射文件易于学习，易于使用，通过文档和源代码，可以比较完全的掌握它的设计思路和实现。
- 灵活：mybatis不会对应用程序或者数据库的现有设计强加任何影响。
  sql写在xml里，便于统一管理和优化。通过sql语句可以满足操作数据库的所有需求。
- 解除sql与程序代码的耦合：通过提供DAO层，将业务逻辑和数据访问逻辑分离，使系统的设计更清晰，更易维护，更易单元测试。sql和代码的分离，提高了可维护性。
- 提供映射标签，支持对象与数据库的orm字段关系映射
- 提供对象关系映射标签，支持对象关系组建维护
- 提供xml标签，支持编写动态sql。

## 1.4 Mybatis入门案例

### 1.4.1 导入jar包

```xml
 		<!--mybatis依赖包-->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.0</version>
        </dependency>

        <!--jdbc依赖包-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
```

全部Mybaits的jar包文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>mybatis</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mybatis</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.4.1</spring-boot.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!--mybatis依赖包-->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.0</version>
        </dependency>

        <!--jdbc依赖包-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!--添加lombok依赖-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.4.1</version>
                <configuration>
                    <mainClass>com.jt.MybatisApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>

```

### 1.4.2 编辑User POJO对象

说明:MP要求以面向对象的方式操作数据库.其中对象与表 属性与字段必须映射!!!
实现方式: 利用注解进行绑定.

![在这里插入图片描述](https://img-blog.csdnimg.cn/59195c7bf84c46a782e854bd66e73b3f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

```java
@Data
@Accessors(chain = true)
public class User implements Serializable {
    private Integer id;
    private String name;
    private Integer age;
    private String sex;
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042910370647.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 1.4.3 编辑mybaits-config.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!--核心配置文件-->
<configuration>

    <!--环境配置标签-->
    <environments default="development">

        <!--编辑开发环境-->
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://127.0.0.1:3306/jt?serverTimezone=GMT%2B8&amp;useUnicode=true&amp;characterEncoding=utf8&amp;autoReconnect=true&amp;allowMultiQueries=true"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
            </dataSource>
        </environment>
    </environments>

    <!--Mybatis加载Mapper映射文件-->
    <mappers>
        <mapper resource="mybatis/mappers/UserMapper.xml"/>
    </mappers>
</configuration>
```

### 1.4.4 编辑UserMapper接口

```java
public interface UserMapper {
    //查询所有的User列表信息
    List<User> findAll();
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429104337856.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 1.4.5 编辑接口实现类Mapper映射文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!--namespace是mybaits映射文件的唯一标识,与接口对应-->
<mapper namespace="com.jt.mapper.UserMapper">
    <!--id 表示接口方法
        resultType 返回值结果类型
    -->
    <select id="findAll" resultType="com.jt.pojo.User">
        select * from demo_user
    </select>
</mapper>
```

### 1.4.6 mybatis关联映射文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/1aaaccfbe3f54296a1e793cff0ef6ce5.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 1.4.7 编辑SqlSessionFactory

每个基于 MyBatis 的应用都是以一个 SqlSessionFactory 的实例为核心的。SqlSessionFactory 的实例可以通过 SqlSessionFactoryBuilder 获得。而 SqlSessionFactoryBuilder 则可以从 XML 配置文件或一个预先配置的 Configuration 实例来构建出 SqlSessionFactory 实例。

```java
	 	/*创建SqlSessionFactory*/
        String resource = "mybatis/mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

### 1.4.8 从 SqlSessionFactory 中获取 SqlSession

既然有了 SqlSessionFactory，顾名思义，我们可以从中获得 SqlSession 的实例。SqlSession 提供了在数据库执行 SQL 命令所需的所有方法。你可以通过 SqlSession 实例来直接执行已映射的 SQL 语句。

```java
	@Test
    public void testDemo1() throws IOException {
        /*创建SqlSessionFactory*/
        String resource = "mybatis/mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        /*从SqlSessionFactory中获取sqlSession*/
        SqlSession sqlSession = sqlSessionFactory.openSession();
    }
```

### 1.4.9 执行业务调用

```java
 @Test
    public void testDemo1() throws IOException {

        /*创建SqlSessionFactory*/
        String resource = "mybatis/mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        /*从SqlSessionFactory中获取sqlSession*/
        SqlSession sqlSession = sqlSessionFactory.openSession();

        /*获取mapper接口,执行接口方法*/
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        List<User> userList = userMapper.findAll();
        System.out.println(userList);
    }
```

### 1.4.10 mybatis入门案例总结

Mysql入门实现步骤:

1.编辑mybatis-config.xml核心配置文件

1.1执行数据源配置

2.编辑POJO实体对象.要求与数据库表中的字段一一对应

3.编辑Mapper接口. 添加接口方法

4.编辑接口的实现类(配置文件方式) 要求namespace id resultType

5.mybatis加载指定的mapper映射文件

6.创建SqlSessionFactory工厂对象

7.获取SqlSession,开启数据库链接

8.获取接口对象(代理对象)

9.调用接口方法,获取返回值结果

10.关闭sqlSession链接.

## 1.5 Mybatis常见错误

### 1.5.1 BindingException异常说明

报错说明1:

org.apache.ibatis.binding.BindingException: Type interface com.jt.mapper.UserMapper is not known to the MapperRegistry.

解决方案1:
检查namespace命名是否与接口一致

报错说明2:

org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.jt.mapper.UserMapper.findAll

解决方案2:
检查xml映射文件中的ID是否与接口方法一致.

报错说明3:

The error may exist in mybatis/mappers/UserMapper2.xml

解决方案3:
检查mybatis核心文件加载mapper映射文件的路径是否正确.

## 1.6 SqlSession 简化操作

```java
package com.jt;

import com.jt.mapper.UserMapper;
import com.jt.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

class MybatisApplicationTests {

    private SqlSessionFactory sqlSessionFactory;

    @BeforeEach
    public void init() throws IOException {
        /*创建SqlSessionFactory*/
        String resource = "mybatis/mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
    }
    
    @Test
    public void testDemo2() {
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        List<User> userList = userMapper.findAll();
        System.out.println(userList);
        sqlSession.close();
    }
}

```

## 1.7 SqlSession扩展方法(过时不建议使用)

说明: 可以通过namespace名称.ID的方式直接调用sql

![在这里插入图片描述](https://img-blog.csdnimg.cn/5781f9b008904ff79d575166ed3ad388.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

```java
 //知识扩展,利用namespace获取数据
    @Test
    public void testDemo3() {
        SqlSession sqlSession = sqlSessionFactory.openSession();
        List<User> userList = sqlSession.selectList("com.jt.mapper.UserMapper.findAll");
        System.out.println(userList);
        sqlSession.close();
    }

```

# 2. Mybatis 单表CURD操作

## 2.1 根据ID查询数据

### 2.1.1 需求说明

查询id=1的用户数据

### 2.1.2 编辑接口方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/6a151800c5c84ff8bb23407587ca47a3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 2.1.3 编辑UserMapper.xml 映射文件

```java
    <!--根据ID查询用户数据
        语法: 动态获取数据 #{属性名称}
        #号效果: 有预编译的效果  防止Sql注入攻击问题
                所以以后取值使用#号-->
    <!-- 所有select节点必须配置resultType或resultMap这2个属性中的其中1个 -->
    <select id="findUserById" parameterType="Integer" resultType="com.jt.pojo.User">
        select * from demo_user where id = #{id}
    </select>

```

### 2.1.4 编辑单元测试方法

```java
 @Test
    public void testUserById(){
        int id = 1;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        User user = userMapper.findUserById(id);
        System.out.println(user);
        sqlSession.close();
    }

```

## 2.2 测试新增/修改/删除

### 2.2.1 编辑业务接口

```java
public interface UserMapper {
    //查询所有的User列表信息
    List<User> findAll();
    User findUserById(Integer id);
    //实现数据新增
    int saveUser(User user);

    int updateUser(User user);

    int deleteUserById(Integer id);
}

```

### 2.2.2 编辑Mapper映射文件

规则:
             1.如果接口方法中,有int类型的返回值,则入库之后,mybatis自动回传数据
             2.如果接口中传递的是POJO对象.则通过`#{属性}`取值

大小问题:
              1.windows系统中程序运行不区分大小写.
              2.Linux系统 严格区分大小写.
              3.程序猿口头禅:  我在我本机上没问题呀!!!!

```java
<!--实现数据新增 新增成功之后自动返回影响的行数
        数据取值时 使用#{属性名} 获取数据
    -->
    <insert id="saveUser" parameterType="com.jt.pojo.User">
        insert into demo_user(id,name,age,sex) value (null,#{name},#{age},#{sex})
    </insert>
    
    <update id="updateUser" parameterType="com.jt.pojo.User">
        update demo_user set name = #{name}, age = #{age}, sex = #{sex} where id = #{id}
    </update>

    <delete id="deleteUserById" parameterType="Integer">
        delete from demo_user where id = #{id}
    </delete>

```

### 2.2.3 编辑测试方法

```java
@Test
    public void testSaveUser(){
        User user = new User(null,"中秋节",2021,"女");
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        int rows = userMapper.saveUser(user);
        if(rows > 0 ){
            System.out.println("事物提交");
            sqlSession.commit();
        }
        System.out.println(rows);
        sqlSession.close();
    }

    @Test
    public void testUpdateUser(){
        User user = new User(234,"中秋节BBBB",2021,"女");
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        int rows = userMapper.updateUser(user);
        if(rows > 0 ){
            System.out.println("事物提交");
            sqlSession.commit();
        }
        System.out.println(rows);
        sqlSession.close();
    }

    @Test
    public void testDeleteUserById(){
        int id = 237;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        int rows = userMapper.deleteUserById(id);
        if(rows > 0 ){
            System.out.println("事物提交");
            sqlSession.commit();
        }
        System.out.println(rows);
        sqlSession.close();
    }
```
### 2.2.4 查询数据-1
目标：根据id查询管理员信息

要实现此目标，需要执行的SQL语句大致是：

```mysql
select * from ams_admin where id=?
```

然后，在`AdminMapper`接口中添加抽象方法：

```java
Admin getById(Long id);
```

接下来，在`AdminMapper.xml`中配置以上抽象方法映射的SQL语句：

```xml
<!-- Admin getById(Long id); -->
<select id="getById" resultType="cn.tedu.mybatis.Admin">
    select * from ams_admin where id=#{id}
</select>
```

最后，编写并执行测试：

```java
@Test
public void testGetById() {
    AnnotationConfigApplicationContext ac
            = new AnnotationConfigApplicationContext(SpringConfig.class);

    AdminMapper adminMapper = ac.getBean(AdminMapper.class);

    Long id = 3L;
    Admin admin = adminMapper.getById(id);
    System.out.println("查询结果：" + admin);

    ac.close();
}
```

通过测试可以发现：当存在匹配的数据时，将可以查询到数据，当不存在匹配的数据时，将返回`null`。

需要注意，如果查询结果集中的列名与类的属性名不匹配时，默认将放弃处理这些结果数据，则返回的对象中对应的属性值为`null`，为了解决此问题，可以在查询时使用自定义的别名，使得名称保持一致，不过，更推荐配置`<resultMap>`以指导Mybatis封装查询结果，例如：

```xml
<!-- Admin getById(Long id); -->
<select id="getById" resultMap="BaseResultMap">
    select * from ams_admin where id=#{id}
</select>

<!-- resultMap节点的作用是：指导Mybatis如何将结果集中的数据封装到返回的对象中 -->
<!-- id属性：自定义名称 -->
<!-- type属性：将结果集封装到哪种类型的对象中 -->
<resultMap id="BaseResultMap" type="cn.tedu.mybatis.Admin">
    <!-- 使用若干个result节点配置名称不统一的对应关系 -->
    <!-- 在不是“一对多”的查询时，名称本来就一致的是不需要配置的 -->
    <!-- column属性：列名 -->
    <!-- property属性：属性名 -->
    <result column="is_enable" property="isEnable" />
    <result column="last_login_ip" property="lastLoginIp" />
    <result column="login_count" property="loginCount" />
    <result column="gmt_last_login" property="gmtLastLogin" />
    <result column="gmt_create" property="gmtCreate" />
    <result column="gmt_modified" property="gmtModified" />
</resultMap>
```

注意：在后续的应用中，凡是可以通过`resultMap`处理结果的，都不要使用`resultType`。
### 2.2.5 查询数据-2
目标：查询所有管理员的信息

要实现此目标，需要执行的SQL语句大致是：

```mysql
select * from ams_admin order by id
```

**注意：(1) 查询时，结果集中可能超过1条数据时，必须显式的使用`ORDER BY`子句对结果集进行排序；(2) 查询时，结果集中可能超过1条数据时，应该考虑是否需要分页。**

然后，在`AdminMapper`接口中添加抽象方法：

```java
List<Admin> list();
```

接下来，在`AdminMapper.xml`中配置以上抽象方法映射的SQL语句：

```xml
<!-- List<Admin> list(); -->
<select id="list" resultMap="BaseResultMap">
    select * from ams_admin order by id
</select>
```

最后，编写并执行测试：

```java
@Test
public void testList() {
    AnnotationConfigApplicationContext ac
            = new AnnotationConfigApplicationContext(SpringConfig.class);

    AdminMapper adminMapper = ac.getBean(AdminMapper.class);

    List<Admin> list = adminMapper.list();
    for (Admin admin : list) {
        System.out.println(admin);
    }

    ac.close();
}
```



## 2.3 利用Map查询数据

1. mybatis的参数可以是基本类型或者字符串.
2. 如果遇到多个参数,应该使用对象(POJO)进行封装.
3.  如果通过pojo封装不方便.则使用功能最为强大的Map进行封装
4. Mybatis的接口方法中只允许传递单值

### 2.3.1 业务需求

需求: 查询age >= 18岁 age<= 100岁的用户

### 2.3.2 编辑业务接口

![在这里插入图片描述](https://img-blog.csdnimg.cn/44ccd04beb4647319f5012b8577df3a0.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 2.3.3 编辑映射文件

**通过 #{参数名称/对象中的属性/Map中的key}**

```java
<!--特殊转义字符
        > &gt;
        < &lt;
        & &amp;
        万能转义标签   <![CDATA[ 需要转义的内容 ]]>
    -->
    <select id="findUserListByAge" parameterType="map" resultType="com.jt.pojo.User">
        select * from demo_user where age >= #{minAge} and age &lt;= #{maxAge}
    </select>
```

### 2.3.4 编辑测试代码

```java
/**
     * 查询age>=18 age<=100岁的用户
     */
    @Test
    public void testSelectUserListByAge(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        Map map = new HashMap();
        map.put("minAge",18);
        map.put("maxAge",100);
        List<User> userList = userMapper.findUserListByAge(map);
        System.out.println(userList);
    }
```

## 2.4 模糊查询用法

### 2.4.1 业务需求

查询name属性中包含"君"的数据

### 2.4.2 业务接口

```java
 List<User> selectUserListByLike(Map map);
```

### 2.4.3 编辑xml映射文件

```xml
 <!--<select id="selectUserListByLike" resultType="com.jt.pojo.User">
        select * from demo_user where name like "%"#{name}"%"
    </select>-->
       <!--
        知识点1: 通过 #{参数名称/对象中的属性/Map中的key}
        知识点2: xml文件中有些字符需要转义
                > &gt;   < &lt;
                & &amp;
    -->
    <select id="selectUserListByLike" resultType="com.jt.pojo.User">
        select * from demo_user where name like #{name}
    </select>
        

```

### 2.4.4 编辑测试方法

```java
/**
     * 查询 name中包含'君'字的数据
     */
    @Test
    public void testSelectUserListByLike(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        Map map = new HashMap();
        //map.put("name","君");
        map.put("name","%君%");
        List<User> userList = userMapper.selectUserListByLike(map);
        System.out.println(userList);
    }
```

## 2.5 Mybatis属性优化

### 2.5.1 别名定义

可以通过别名配置简化返回值操作

其中resultType中的属性com.jt.pojo.User 定义别名.简化其操作.

```xml
 	<select id="findByLike" resultType="com.jt.pojo.User">
        select * from demo_user where name like "%"#{key}"%"
    </select>
```

1. 标识注解
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/c245267f221648008d49ffa75b195048.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

2. 使用别名
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/7907854b404b42b783abba8402e45fde.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

3. 定义别名包 定义别名包之后,以后的数据只需要写类名即可,使用时会自动的拼接前缀

```yml
#3.配置Mybatis
mybatis:
  #定义别名包
  type-aliases-package: com.jt.pojo
```

### 2.5.2 Sql标签

可以通过Sql标签简化程序调用.**抽取公共的部分,可以被其它的Sql引用**

```java
 <sql id="select_demo_user">
        select * from demo_user
    </sql>

    <select id="selectUserListByLike" resultType="user">
        <include refid="select_demo_user"/> where name like #{name}
    </select>
```

## 2.6 Mybatis 集合参数写法 list/array/map

### 2.6.1 业务说明

当mybaits需要批量操作时,需要使用list/array/或者map进行数据封装



### 2.6.2 Array类型的参数说明

说明: 一般业务逻辑可能会用到array进行数据的封装. 问题: xml映射文件中如何解析数组
格式如下: Integer[] ids = {1,3,4,5,6};

Mybatis中的动态SQL表现为：根据参数不同，生成不同的SQL语句

目标：根据若干个id一次性删除若干条管理数据

要实现此目标，需要执行的SQL语句大致是：

```mysql
delete from ams_admin where id in (?,?)
```

以上SQL语句中，id值的数量（以上`?`的数量）对于开发人员而言是未知的！

然后，在`AdminMapper`接口中添加抽象方法：

```java
int deleteByIds(Long... ids);
```

或

```java
int deleteByIds(Long[] ids);
```

或

```java
int deleteByIds(List<Long> ids);
```

接下来，在`AdminMapper.xml`中配置以上抽象方法映射的SQL语句：

```xml
<!-- int deleteByIds(List<Long> ids); -->
<delete id="deleteByIds">
    delete from ams_admin where id in (
    	<foreach collection="list" item="id" separator=",">
          #{id}
    	</foreach>
    )
</delete>
```

以上代码中：

- `<foreach>`标签：用于遍历集合或数组类型的参数对象
- `collection`属性：被遍历的参数对象，当抽象方法的参数只有1个且没有添加`@Param`注解时，如果参数是`List`类型则此属性值为`list`，如果参数是数组类型（包括可变参数）则此属性值为`array`；当抽象方法的参数有多个或添加了`@Param`注解时，则此属性值为`@Param`注解中配置的值
- `item`属性：自定义的名称，表示遍历过程中每个元素的变量名，可在`<foreach>`子级使用`#{变量名}`表示数据
- `separator`属性：分隔符号，会自动添加在遍历到的各元素之间

最后，编写并执行测试：

```java
@Test
public void testDeleteByIds() {
    AnnotationConfigApplicationContext ac
            = new AnnotationConfigApplicationContext(SpringConfig.class);

    AdminMapper adminMapper = ac.getBean(AdminMapper.class);

    List<Long> ids = new ArrayList<>();
    ids.add(16L);
    ids.add(18L);
    ids.add(19L);
    int rows = adminMapper.deleteByIds(ids);
    System.out.println("受影响的行数为：" + rows);

    ac.close();
}
```



####  测试代码

```java
/**
     * 业务说明: 集合参数的用法
     * 需求: 查询id=1,3,4,5,6的数据
     * Sql:  where id in (1,3,4,5,6)
     */
    @Test
    public void findIn(){
        Integer[] ids = {1,3,4,5,6};
        List<User> list = userMapper.findIn(ids);
        System.out.println(list);
    }
```

####  编辑Mapper接口

```java
	List<User> findIn(Integer[] ids);
```

#### 编辑Mapper 映射文件

```xml
<!--
        需求: Integer[] ids 中的数据一个一个取出来.拼接Sql
        知识点: mybatis中如何遍历数组
        foreach标签用法:
            1. collection:需要遍历的集合的类型
                1.1 数组类型  关键字:array
                1.2 list类型 关键字:list
                1.3 map类型  关键字:Map中的key
            2. open/close 循环开始和结束标签,一般自己写
            3. item 遍历数据的变量名称
            4. separator 参数之间的分隔符
    -->
    <select id="findIn" resultType="User">
        select * from demo_user where id in (
            <foreach collection="array" item="id" separator=",">
                #{id}
            </foreach>
        )
    </select>
```

### 2.6.3 Mybatis中集合参数用法Map封装

####  测试代码

```java
@Test
    public void findInMap(){
        //准备2个集合,测试map集合封装
        Integer[] ids1 = {1,3,4,5,6};
        Integer[] ids2 = {1,3,4,5,6};
        List<User> list = userMapper.findInMap(ids1,ids2);
        System.out.println(list);
    }

```

#### 编辑Mapper接口

```java
 List<User> findInMap(@Param("ids1") Integer[] ids1,
                         @Param("ids2") Integer[] ids2);
```

#### 编辑Mapper映射文件

```xml
 	<!--参数传递是Map集合,所以关键字使用key-ids1 -->
    <select id="findInMap" resultType="User">
        select * from demo_user where id in (
            <foreach collection="ids1" item="id" separator=",">
                #{id}
            </foreach>
        )
    </select>
```

## 2.7 动态Sql-where条件

### 2.7.1 编辑测试方法

```java
package com.jt;

import com.jt.mapper.UserMapper2;
import com.jt.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TestMybatis2 {

    @Autowired
    private UserMapper2 userMapper;

    /**
     * 需求: 根据用户不为null的属性充当where条件
     */
    @Test
    public void testSqlWhere(){
        User user = new User();
        user.setAge(3000).setSex("男");
        List<User> userList = userMapper.findSqlWhere(user);
        System.out.println(userList);
    }

}


```

### 2.7.2 编辑Mapper映射文件

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jt.mapper.UserMapper2">

    <!--
        问题说明: 前端数据传递时可能会有null数据.
                如果数据为null则不能充当where条件
        解决方案: 动态Sql实现
        语法:
            <if test="判断条件"> id = #{id}</if>
                true:   则拼接标签内容
                false:  则不拼接标签内容
           <where>标签: 去除where后边多余的and/or
    -->
    <select id="findSqlWhere" resultType="User">
        select * from demo_user
            <where>
                <if test="id != null"> id = #{id}</if>
                <if test="name !=null">and name = #{name}</if>
                <if test="age !=null"> and age = #{age}</if>
                <if test="sex !=null"> and sex = #{sex}</if>
            </where>
    </select>
</mapper>

```

### 2.7.3 编辑Mapper接口

```java
@Mapper //将接口的代理对象交给Spring容器管理
public interface UserMapper2 {
    List<User> findSqlWhere(User user);
}

```

## 2.8 动态Sql-set条件

### 2.8.1 编辑测试方法

```java
/**
     * 需求: 修改id=1 的数据 name="北极熊",age=4000 sex="男"
     */
    @Test
    public void testUpdateUser(){
        User user = new User();
        user.setId(1).setAge(5000);
        userMapper.updateUser(user);
        System.out.println("更新成功!!!");
    }

```

### 2.8.2 编辑Mapper.xml映射文件

```java
 <!--根据对象中不为null的属性 当做set条件
        语法: set标签 去除多余1个,号
    -->
    <update id="updateUser">
        update demo_user
            <set>
                <if test="name !=null">name=#{name},</if>
                <if test="age !=null"> age=#{age},</if>
                <if test="sex !=null"> sex=#{sex},</if>
            </set>
            where id = #{id}
    </update>

```

### 2.8.3 编辑Mapper接口

```java
 void updateUser(User user);
```

## 2.9 动态Sql-choose、when、otherwise

### 2.9.1 业务需求说明

说明: 如果不想使用所有的条件可以使用choose 类似于java中的switch 语法
如果name有值,则按照name查询,否则按照sex查询数据.

### 2.9.2 编辑测试类

```java
 /**
     * 如果name有值,则根据name查询.
     * 如果name没有值,则根据age查询.
     * 如果name/age都没有值,则根据sex查询
     */
    @Test
    public void testChoose(){
        User user = new User();
        user.setSex("男");
        List<User> userList = userMapper.findChoose(user);
        System.out.println(userList);
    }

```

### 2.9.3 编辑xml映射文件

```xml
<!--
     * 如果name有值,则根据name查询.
     * 如果name没有值,则根据age查询.
     * 如果name/age都没有值,则根据sex查询
       语法类似: if->else-if->else
    -->
    <select id="findChoose" resultType="User">
        select * from demo_user
        <where>
            <choose>
                <when test="name !=null"> name=#{name}</when>
                <when test="age !=null"> age = #{age}</when>
                <!--必须保证sex必须有值 -->
                <otherwise>sex=#{sex}</otherwise>
           </choose>
       </where>
   </select>

```

### 2.9.4 编辑接口

```java
List<User> findChoose(User user);
```



## 2.10 resultMap介绍

### 2.10.1 需求说明

1.经过demo_user测试,发现如果字段名称与对象属性的名称一致,Mybatis可以实现自动化的映射

2.如果遇到字段名称与属性的名称不一致的现象,则mybatis如何映射!!!

### 2.10.2 表设计说明

![在这里插入图片描述](https://img-blog.csdnimg.cn/f0e89e726ffb4a3689457ccfa872be36.png)

### 2.10.3 编辑POJO对象

```java
package com.jt.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Dog implements Serializable {

    private Integer dogId;
    private String  dogName;
    private Integer age;

}


```



### 2.10.4 编辑测试方法

```java
package com.jt;

import com.jt.mapper.DogMapper;
import com.jt.pojo.Dog;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TestMybatis3 {

    @Autowired
    private DogMapper dogMapper;

    @Test
    public void testFindAll(){
        List<Dog> dogList = dogMapper.findAll();
        System.out.println(dogList);
    }
}


```

### 2.10.5 编辑xml映射文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/32d0ba469833433faf4146d0d986dd0a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_18,color_FFFFFF,t_70,g_se,x_16)

```java
 <!--
        autoMapping: 如果字段与名称相同,是否自动映射,  默认值为true 旧版本为false
        id: resultMap的主键标识 可以复用
    -->
    <?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jt.mapper.DogMapper">

    <!--
        规则:
            1.如果数据库中的表字段名称与POJO属性的名称不一致
            则mybatis无法自动完成映射.
            2.Mybatis提供了一个属性resultMap(使用最多的).
              支持用户手动映射.
    -->
    <select id="findAll" resultMap="dogRM">
        select * from dog
    </select>

    <!--
        属性说明:  id="唯一标识,不能重复"
                  type="映射的POJO对象的类型"
        简化说明:  如果字段名称与属性名称一致则可以省略
                  autoMapping="true" 开启自动映射
    -->
    <resultMap id="dogRM" type="Dog" autoMapping="true">
        <!--1.标识主键-->
        <id column="dog_id" property="dogId"/>
        <!--2.映射结果集-->
        <result column="dog_name" property="dogName"/>
        <!--<result column="age" property="age"/>-->
    </resultMap>
</mapper>

```

### 2.10.6 编辑Mapper接口

```java
@Mapper
public interface DogMapper {

    List<Dog> findAll();
}

```



## 2.11 Mybatis注解开发(扩展)

### 2.11.1 注解开发

使用注解来映射简单语句会使代码显得更加简洁，但对于稍微复杂一点的语句，Java 注解不仅力不从心，还会让你本就复杂的 SQL 语句更加混乱不堪。 因此，如果你需要做一些很复杂的操作，最好用 XML 来映射语句。

### 2.11.2 常用注解

@Select(“select * from demo_user”)
@Update()
@Delete()
@Insert()
List findAll()

### 2.11.3 Mybatis的注解形式

**HeroMapper接口**

```java
@Mapper
public interface HeroMapper {
    //#{xxx}会从下面方法的参数列表中找到同名的变量,如果找不到同名变量则进入到对象里面查找
    //同名的get方法 Mybatis框架会根据此方法声明生成具体的实现类实现此方法,方法内部就是jdbc代码
    @Insert("insert into hero values(null,#{name},#{money})")
    void insert(Hero hero);

}
```

**封装实体对象Hero**

```java
public class Hero {
    private Integer id;
    private String name;
    private Integer money;

    @Override
    public String toString() {
        return "Hero{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", money=" + money +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMoney() {
        return money;
    }

    public void setMoney(Integer money) {
        this.money = money;
    }
}

```

**HeroController**

```java
@Controller
public class HeroController {
    //自动装配注解的作用: Spring框架结合Mybatis框架会自动将HeroMapper生成一个实现类和实现里面的方法
    //而且会自动实例化该对象   required = false告诉idea编译器此对象是非必须的
    @Autowired(required = false)
    HeroMapper mapper;


    @RequestMapping("/add")
    @ResponseBody
    public String add(Hero hero){
        System.out.println("hero = " + hero);
        mapper.insert(hero);
        return "添加完成!";
    }
}

```



```java
	//鸡肋: 1.大公司一般不用,  2.只适用于单表操作.多表操作必须写映射文件
    // 注解和映射文件二选一
    @Select("select * from dept")
    List<Dept> selectAll();
	//#{xxx}会从下面方法的参数列表中找到同名的变量,如果找不到同名变量则进入到对象里面查找
    //同名的get方法 Mybatis框架会根据此方法声明生成具体的实现类实现此方法,方法内部就是jdbc代码
    @Insert("insert into dept values (null,#{deptName})")
    void saveDept(Dept dept);
```



### 2.11.4 Mybatis绑定Mapper接口

![在这里插入图片描述](https://img-blog.csdnimg.cn/96f6f28848a145bfb98543fc2054bbd7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 2.11.5 单元测试

```java
@Test
    public void selectAnno(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper2 userMapper2 = sqlSession.getMapper(UserMapper2.class);
        System.out.println(userMapper2.findAll());
    }
```

注意事项: 多个参数调用时注意数据封装

```java
    @Select("select * from demo_user where name = #{name} and sex = #{sex}")
    List<User> findUserByNS(@Param("name") String name,@Param("sex") String sex);

```

## 2.12 @Param注解

### 2.12.1 需求说明

说明: 根据下列的代码,不能非常直观去了解业务. 能否优化该操作.

```java
List<User> findUserByAge(Map<String, Object> map);
```

### 2.12.2 编辑测试类

```java
 @Test
    public void testFindUserByAge2(){
        int minAge = 18;
        int maxAge = 100;
        List<User> userList = userMapper.findUserByAge2(minAge,maxAge);
        System.out.println(userList);
    }
```

### 2.12.3 编辑Mapper接口

```java
	//如果参数是多值,则需要封装为单值Map
    //@Param将参数封装为Map集合
    List<User> findUserByAge2(@Param("minAge") int minAge,
                              @Param("maxAge") int maxAge);
                            
```

### 2.12.4 编辑Mapper映射文件

```xml
 	<select id="findUserByAge2" resultType="com.jt.pojo.User">
        select * from demo_user where age>#{minAge} and age &lt; #{maxAge}
    </select>
```

## 2.13 驼峰映射规则

Mybatis中的结果集的字段名称如果与属性的名称**满足驼峰映射的规则**. 如果开启驼峰映射.,则可以实现自动化的映射.

字段: dog_id, dog_name
属性: dogId, dogName 满足驼峰规则.
配置信息:

```yml
#3.配置Mybatis
mybatis:
  #定义别名包
  type-aliases-package: com.jt.pojo
  #将所有的映射文件全部加载
  mapper-locations: classpath:/mappers/*.xml
  #开启驼峰映射
  configuration:
    map-underscore-to-camel-case: true
```

## 2.14 关于`#{}`和`${}`格式的占位符
在Mybatis中，配置SQL语句时，参数可以使用`#{}`或`${}`格式的占位符。

例如存在需求：分页查询表中的所有数据。

需要执行的SQL语句大致是：

```mysql
select * from ams_admin order by id limit ?, ?
```

则此功能的抽象方法应该是：

```java
List<Admin> listPage(@Param("offset") Integer offset, @Param("size") Integer size);
```

配置SQL语句：

```xml
<!-- List<Admin> listPage(@Param("offset") Integer offset, 
								@Param("size") Integer size); -->
<select id="listPage" resultMap="BaseResultMap">
    select 
    	<include refid="BaseQueryFields" />
    from ams_admin 
    order by id 
    limit #{offset}, #{size}
</select>
```

最后，执行测试：

```java
@Test
@Sql(scripts = {"classpath:truncate.sql", "classpath:insert_data.sql"})
@Sql(scripts = {"classpath:truncate.sql"}, 
     executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public void testListPage() {
    // 准备测试数据
    Integer offset = 0;
    Integer size = 3;
    // 断言不会抛出异常
    Assertions.assertDoesNotThrow(() -> {
        // 执行测试
    	List<Admin> adminList = adminMapper.listPage(offset, size);
        // 观察结果（通过输出语句）
        System.out.println("查询到的记录数：" + adminList.size());
        for (Admin admin : adminList) {
            System.out.println(admin);
        }
    });
}
```

以上代码可以正常通过测试，并且观察结果也都是符合预期的，即使把SQL语句中的`#{}`换成`${}`格式，也是完全没有问题的！

例如还存在需求：根据用户名查询此用户的详情。

在“根据用户名查询用户详情”时，如果将`username=#{username}`换成`username=${username}`会出现错误！

**其实，使用`#{}`格式的占位符时，Mybatis在处理时会使用预编译的做法，所以，在编写SQL语句时不必关心数据类型的问题（例如字符串值不需要添加单引号），也不存在SQL注入的风险！这种占位符只能用于表示某个值，而不能表示SQL语句片段！**

**当使用`${}`格式的占位符时，Mybatis在处理时会先将参数值代入到SQL语句中，然后再执行编译相关过程，所以需要关心某些值的数据类型问题（例如涉及字符串值时，需要在编写SQL语句时添加一对单引号框住字符串），并且，存在SQL注入的风险！其优点是可以表示SQL语句中的任何片段！**

**在一般情况下，应该尽可能的使用`#{}`格式的占位符，并不推荐使用`${}`格式的占位符，即使它可以实现“泛用”的效果！在一些特殊的情况下，如果一定要使用`${}`格式的占位符，必须考虑SQL注入的风险，应该使用正则表达式或其它做法避免出现SQL注入问题！**
# 3. Mybatis 关联关系

## 3.1 常见关联关系

**思路:看问题从一头出发看向另一头**

1.一对一 一个员工对应一个部门
2.一对多 一个部门对应多个员工
3.多对多 一个学生对应多个老师, 一个老师对应多个学生,**双向的一对多**

4.多对一 本质是一对一

## 3.2 一对一封装

### 3.2.1 表结构封装

1. 表名 dept
   字段: dept_id, int 主键 自增
   dept_name, varchar(40)
2. 表名 emp
   字段: emp_id, int 主键 自增
   emp_name, varchar(40)
   dept_id int
3. 造表数据
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/565bb159c36d4f2cb2b089c7f012aa2a.png)

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/f0549219a986407d9d62a685fe506775.png)

### 3.2.2 POJO对象封装

表关系: 一个员工对应一个部门.
需求: 将部门信息与员工信息绑定

```java
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Emp implements Serializable {
    private Integer empId;
    private String empName;
    //一对一封装
    private Dept dept;
}

```

### 3.2.3 封装测试方法

```java
package com.jt;

import com.jt.mapper.DeptMapper;
import com.jt.mapper.DogMapper;
import com.jt.mapper.EmpMapper;
import com.jt.pojo.Dog;
import com.jt.pojo.Emp;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TestMybatis4 {

    @Autowired
    private DeptMapper deptMapper;
    @Autowired
    private EmpMapper empMapper;

    //完成一对一测试
    @Test
    public void testEmp(){
        List<Emp> empList = empMapper.findAll();
        System.out.println(empList);
    }
}


```

### 3.2.4 编辑xml映射文件

```java
 <!--
        知识点:
            1.如果单表查询首选resultType
            2.如果进行关联查询 首选resultMap
            3.如果sql的结果集出现了重名字段,则mybatis映射必然报错.
    -->
    <select id="findAll" resultMap="empRM">
        SELECT emp.*,dept.dept_name FROM emp,dept
        WHERE emp.dept_id = dept.dept_id
    </select>

    <!-- 完成一对一封装
        目的: 一个员工中封装一个部门对象
        语法:
            1.association 表示一对一封装
            2.property  当前主对象的属性名称
            3.javaType  指定属性的类型
    -->
    <resultMap id="empRM" type="Emp" autoMapping="true">
        <!-- 标识主键信息 -->
        <id column="emp_id" property="empId"/>
        <!--<result column="emp_name" property="empName"/>-->

        <!--完成一对一映射-->
        <!--结果集自动映射-->
        <association property="dept" javaType="Dept" autoMapping="true">
            <id column="dept_id" property="deptId"/>
        </association>
    </resultMap>

```

### 3.2.5 文件目录

根据表 创建POJO/Mapper接口/xml映射文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/ea59e13885904912ae9101c16614c806.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_12,color_FFFFFF,t_70,g_se,x_16)

### 3.2.6 关联查询方式

1. 笛卡尔积的形式
2. 连接查询 左连接,右连接,内连接
3. 子查询

首先，请准备一些测试数据，使得：存在若干条用户数据，存在若干条角色数据，某个用户存在与角色的关联，最好有些用户有多个关联，又有些用户只有1个关联，还有些用户没有关联。

假设存在需求：根据id查询某用户信息时，也查出该用户归属于哪几种角色。

**测试数据参考：**

```mysql
truncate ams_admin;
truncate ams_admin_role;
truncate ams_role;
truncate ams_permission;

insert into ams_admin (username, password) values ('admin001', '123456');
insert into ams_admin (username, password) values ('admin002', '123456');
insert into ams_admin (username, password) values ('admin003', '123456');
insert into ams_admin (username, password) values ('admin004', '123456');
insert into ams_admin (username, password) values ('admin005', '123456');
insert into ams_admin (username, password) values ('admin006', '123456');
insert into ams_admin (username, password) values ('admin007', '123456');
insert into ams_admin (username, password) values ('admin008', '123456');
insert into ams_admin (username, password) values ('admin009', '123456');
insert into ams_admin (username, password) values ('admin010', '123456');
insert into ams_admin (username, password) values ('admin011', '123456');
insert into ams_admin (username, password) values ('admin012', '123456');
insert into ams_admin (username, password) values ('admin013', '123456');
insert into ams_admin (username, password) values ('admin014', '123456');
insert into ams_admin (username, password) values ('admin015', '123456');
insert into ams_admin (username, password) values ('admin016', '123456');
insert into ams_admin (username, password) values ('admin017', '123456');
insert into ams_admin (username, password) values ('admin018', '123456');
insert into ams_admin (username, password) values ('admin019', '123456');
insert into ams_admin (username, password) values ('admin020', '123456');

insert into ams_permission (name, value, description) values
('商品-商品管理-读取', '/pms/product/read', '读取商品数据，含列表、详情、查询等'),
('商品-商品管理-编辑', '/pms/product/update', '修改商品数据'),
('商品-商品管理-删除', '/pms/product/delete', '删除商品数据'),
('后台管理-管理员-读取', '/ams/admin/read', '读取管理员数据，含列表、详情、查询等'),
('后台管理-管理员-编辑', '/ams/admin/update', '编辑管理员数据'),
('后台管理-管理员-删除', '/ams/admin/delete', '删除管理员数据');

insert into ams_role (name) values
('超级管理员'), ('系统管理员'), ('商品管理员'), ('订单管理员');

insert into ams_admin_role (admin_id, role_id) values
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 2),
(4, 1);
```

本次查询需要执行的SQL语句大致是：

```mysql
select *
from ams_admin
left join ams_admin_role on ams_admin.id=ams_admin_role.admin_id
left join ams_role on ams_admin_role.role_id=ams_role.id
where ams_admin.id=?
```

通过测试运行，可以发现（必须基于以上测试数据）：

- 当使用的id值为1时，共查询到4条记录，并且用户的基本信息是相同的，只是与角色关联的数据不同
- 当使用的id值为2时，共查询到3条记录
- 当使用的id值为3时，共查询到2条记录
- 当使用其它有效用户的id时，共查询到1条记录

其实，这种查询期望的结果应该是：

```java
public class xxx {
    // 用户基本信息的若干个属性，例如用户名、密码等
    // 此用户的若干个角色数据，可以使用 List<?>
}
```

则可以先创建“角色”对应的数据类型：

```java
public class Role {
    private Long id;
    private String name;
    private String description;
    private Integer sort;
    private LocalDateTime gmtCreate;
    private LocalDateTime gmtModified;
    // Setters & Getterss
    // toString()
}
```

再创建用于封装此次查询结果的类型：

```java
public class AdminDetailsVO {
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
    private List<Role> roles;
    // Setters & Getterss
    // toString()
}
```

接下来，可以在`AdminMapper`接口中添加抽象方法：

```java
AdminDetailsVO getDetailsById(Long id);
```

需要注意，由于此次关联了3张表一起查询，结果集中必然出现某些列的名称是完全相同的，所以，在查询时，不可以使用星号表示字段列表（因为这样的结果集中的列名就是字段名，会出现相同的列名），而是应该至少为其中的一部分相同名称的列定义别名，例如：

```mysql
select
    ams_admin.id,
       ams_admin.username,
       ams_admin.password,
       ams_admin.nickname,
       ams_admin.avatar,
       ams_admin.phone,
       ams_admin.email,
       ams_admin.description,
       ams_admin.is_enable,
       ams_admin.last_login_ip,
       ams_admin.login_count,
       ams_admin.gmt_last_login,
       ams_admin.gmt_create,
       ams_admin.gmt_modified,

       ams_role.id AS role_id,
       ams_role.name AS role_name,
       ams_role.description AS role_description,
       ams_role.sort AS role_sort,
       ams_role.gmt_create AS role_gmt_create,
       ams_role.gmt_modified AS role_gmt_modified
from ams_admin
left join ams_admin_role on ams_admin.id=ams_admin_role.admin_id
left join ams_role on ams_admin_role.role_id=ams_role.id
where ams_admin.id=1;
```

在Mybatis处理中此查询时，并不会那么智能的完成结果集的封装，所以，必须自行配置`<resultMap>`用于指导Mybatis完成封装！

```xml
<resultMap id="DetailsResultMap" type="xx.xx.xx.xx.AdminDetailsVO">
    <!-- 在1对多、多对多的查询中，即使名称匹配的结果，也必须显式的配置 -->
    <!-- 主键字段的结果必须使用id节点进行配置，配置方式与result节点完全相同 -->
    <id column="id" property="id" />
	<result column="gmt_create" property="gmtCreate" />
    <!-- 需要使用collection节点配置1对多中“多”的数据 -->
    <collection property="roles" ofType="xx.xx.xx.Role">
        <id column="role_id" property="id" />
        <result column="gmt_create" property="gmtCreate" />
    </collection>
</resultMap>
```

最后，使用以上的查询SQL语句，并使用以上的`<resultMap>`封装结果即可！

```xml
<sql id="DetailsQueryFields">
    <if test="true">
       ams_admin.id,
       ams_admin.username,
       ams_admin.password,
       ams_admin.nickname,
       ams_admin.avatar,
       ams_admin.phone,
       ams_admin.email,
       ams_admin.description,
       ams_admin.is_enable,
       ams_admin.last_login_ip,
       ams_admin.login_count,
       ams_admin.gmt_last_login,
       ams_admin.gmt_create,
       ams_admin.gmt_modified,

       ams_role.id AS role_id,
       ams_role.name AS role_name,
       ams_role.description AS role_description,
       ams_role.sort AS role_sort,
       ams_role.gmt_create AS role_gmt_create,
       ams_role.gmt_modified AS role_gmt_modified
    </if>
</sql>

<resultMap id="DetailsResultMap" type="cn.tedu.mybatis.AdminDetailsVO">
    <!-- 在1对多、多对多的查询中，即使名称匹配的结果，也必须显式的配置 -->
    <!-- 主键字段的结果必须使用id节点进行配置，配置方式与result节点完全相同 -->
    <id column="id" property="id" />
    <result column="username" property="username" />
    <result column="password" property="password" />
    <result column="nickname" property="nickname" />
    <result column="avatar" property="avatar" />
    <result column="phone" property="phone" />
    <result column="email" property="email" />
    <result column="description" property="description" />
    <result column="is_enable" property="isEnable" />
    <result column="last_login_ip" property="lastLoginIp" />
    <result column="login_count" property="loginCount" />
    <result column="gmt_last_login" property="gmtLastLogin" />
    <result column="gmt_create" property="gmtCreate" />
    <result column="gmt_modified" property="gmtModified" />
    <!-- 需要使用collection节点配置1对多中“多”的数据 -->
    <collection property="roles" ofType="cn.tedu.mybatis.Role">
        <id column="role_id" property="id" />
        <result column="role_name" property="name" />
        <result column="role_description" property="description" />
        <result column="role_sort" property="sort" />
        <result column="role_gmt_create" property="gmtCreate" />
        <result column="role_gmt_modified" property="gmtModified" />
    </collection>
</resultMap>

<select id="getDetailsById" resultMap="DetailsResultMap">
    select <include refid="DetailsQueryFields" />
    from ams_admin
    left join ams_admin_role on ams_admin.id=ams_admin_role.admin_id
    left join ams_role on ams_admin_role.role_id=ams_role.id
    where ams_admin.id=#{id}
</select>
```



### 3.2.7 编辑EmpMapper接口

```java
@Mapper
public interface EmpMapper {
    List<Emp> findAll();
}

```

### 3.2.8 连接查询

```sql
SELECT emp.*,dept.dept_name FROM 
emp 
	LEFT JOIN
dept
	ON emp.dept_id = dept.dept_id

```



## 3.3 一对多封装

需求: 一个部门对应多个员工

### 3.3.1 封装POJO对象

```java
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Dept implements Serializable {

    private Integer deptId;
    private String deptName;
    //一对多封装
    private List<Emp> emps;
}
```

### 3.3.2 编辑测试文件

```java
 @Test
    public void testDept(){
        List<Dept> deptList = deptMapper.findAll();
        System.out.println(deptList);
    }

```

### 3.3.3 编辑xml映射文件

```xml
<mapper namespace="com.jt.mapper.DeptMapper">

    <select id="findAll" resultMap="deptRM">
        SELECT dept.*,emp.emp_id,emp.emp_name
        FROM dept,emp
        WHERE dept.dept_id=emp.dept_id
    </select>
    <!--
        一对多封装:
            1.collection: 封装集合类型
            2.ofType:  指定集合内部(泛型)的对象类型
    -->
    <resultMap id="deptRM" type="Dept" autoMapping="true">
        <!--主键必须标识-->
        <id column="dept_id" property="deptId"/>
        <!--一对多封装-->
        <collection property="emps" ofType="Emp" autoMapping="true">
            <id column="emp_id" property="empId"/>
        </collection>
    </resultMap>

</mapper>

```

### 3.3.4编辑Mapper接口

```java
@Mapper
public interface DeptMapper {
    List<Dept> findAll();
}

```

## 3.4 @MapperScan

![在这里插入图片描述](https://img-blog.csdnimg.cn/34405e811980442b955a36aba60691f5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 3.5 关于RBAC
**RBAC** = **R**ole **B**ased **A**ccess **C**ontrol（基于角色的访问控制）

RBAC是经典的用户权限管理的设计思路。在这样的设计中，会存在3种类型：用户、角色、权限，权限将分配到各种角色上，用户可以关联某种角色，进而实现用户与权限相关。使用这样的设计，更加利于统一管理若干个用户的权限。

在RBAC的设计思路中，用户与角色一般是多对多的关系，而在数据库中，仅仅只是使用“用户”和“角色”这2张表是不利于维护多对多关系的，通常会增加一张中间表，专门记录对应关系，同理，角色和权限也是多对多的关系，也需要使用中间表来记录对应关系！

关于这些表的设计参考如下：

**ams_admin：管理员表**

```mysql
-- 管理员表：创建数据表
drop table if exists ams_admin;
create table ams_admin (
    id bigint unsigned auto_increment,
    username varchar(50) default null unique comment '用户名',
    password char(64) default null comment '密码（密文）',
    nickname varchar(50) default null comment '昵称',
    avatar varchar(255) default null comment '头像URL',
    phone varchar(50) default null unique comment '手机号码',
    email varchar(50) default null unique comment '电子邮箱',
    description varchar(255) default null comment '描述',
    is_enable tinyint unsigned default 0 comment '是否启用，1=启用，0=未启用',
    last_login_ip varchar(50) default null comment '最后登录IP地址（冗余）',
    login_count int unsigned default 0 comment '累计登录次数（冗余）',
    gmt_last_login datetime default null comment '最后登录时间（冗余）',
    gmt_create datetime default null comment '数据创建时间',
    gmt_modified datetime default null comment '数据最后修改时间',
    primary key (id)
) comment '管理员表' charset utf8mb4;

-- 管理员表：插入测试数据
insert into ams_admin (username, password, nickname, email, description, is_enable) values
    ('root', '1234', 'root', 'root@tedu.cn', '最高管理员', 1),
    ('super_admin', '1234', 'administrator', 'admin@tedu.cn', '超级管理员', 1),
    ('nobody', '1234', '无名', 'liucs@tedu.cn', null, 0);
```

**ams_role：角色表**

```mysql
-- 角色表：创建数据表
drop table if exists ams_role;
create table ams_role (
    id bigint unsigned auto_increment,
    name varchar(50) default null comment '名称',
    description varchar(255) default null comment '描述',
    sort tinyint unsigned default 0 comment '自定义排序序号',
    gmt_create datetime default null comment '数据创建时间',
    gmt_modified datetime default null comment '数据最后修改时间',
    primary key (id)
) comment '角色表' charset utf8mb4;

-- 角色表：插入测试数据
insert into ams_role (name) values
    ('超级管理员'), ('系统管理员'), ('商品管理员'), ('订单管理员');
```

**ams_admin_role：管理员与角色的关联表**

```mysql
-- 管理员角色关联表：创建数据表
drop table if exists ams_admin_role;
create table ams_admin_role (
    id bigint unsigned auto_increment,
    admin_id bigint unsigned default null comment '管理员id',
    role_id bigint unsigned default null comment '角色id',
    gmt_create datetime default null comment '数据创建时间',
    gmt_modified datetime default null comment '数据最后修改时间',
    primary key (id)
) comment '管理员角色关联表' charset utf8mb4;

-- 管理员角色关联表：插入测试数据
insert into ams_admin_role (admin_id, role_id) values
    (1, 1), (1, 2), (1, 3), (2, 2), (2, 3), (2, 4), (3, 3);
```

**ams_permission：权限表**

```mysql
-- 权限表：创建数据表
drop table if exists ams_permission;
create table ams_permission (
    id bigint unsigned auto_increment,
    name varchar(50) default null comment '名称',
    value varchar(255) default null comment '值',
    description varchar(255) default null comment '描述',
    sort tinyint unsigned default 0 comment '自定义排序序号',
    gmt_create datetime default null comment '数据创建时间',
    gmt_modified datetime default null comment '数据最后修改时间',
    primary key (id)
) comment '权限' charset utf8mb4;

-- 权限表：插入测试数据
insert into ams_permission (name, value, description) values
('商品-商品管理-读取', '/pms/product/read', '读取商品数据，含列表、详情、查询等'),
('商品-商品管理-编辑', '/pms/product/update', '修改商品数据'),
('商品-商品管理-删除', '/pms/product/delete', '删除商品数据'),
('后台管理-管理员-读取', '/ams/admin/read', '读取管理员数据，含列表、详情、查询等'),
('后台管理-管理员-编辑', '/ams/admin/update', '编辑管理员数据'),
('后台管理-管理员-删除', '/ams/admin/delete', '删除管理员数据');
```

**ams_role_permission：角色与权限的关联表**

```mysql
-- 角色权限关联表：创建数据表
drop table if exists ams_role_permission;
create table ams_role_permission (
    id bigint unsigned auto_increment,
    role_id bigint unsigned default null comment '角色id',
    permission_id bigint unsigned default null comment '权限id',
    gmt_create datetime default null comment '数据创建时间',
    gmt_modified datetime default null comment '数据最后修改时间',
    primary key (id)
) comment '角色权限关联表' charset utf8mb4;

-- 角色权限关联表：插入测试数据
insert into ams_role_permission (role_id, permission_id) values
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
    (3, 1), (3, 2), (3, 3);
```

在`mall_ams`数据库中创建以上数据表，并插入以上测试数据。

练习（单表数据访问）：

- 向权限表中插入新的数据
- 根据id删除某个权限
- 查询权限表中的所有权限

提示：

- 需要新的数据类型，例如`Permission`类
- 需要新的接口文件，用于定义以上2个数据访问功能的抽象方法
- 需要新的XML文件，用于配置抽象方法对应的SQL语句
- 需要修改配置信息，将此前指定的XML文件由`AdminMapper.xml`改为`*.xml`，并把`SpringConfig`类中`sqlSessionFactoryBean()`方法的第2个参数由`Resource`类型改为`Resource...`类型
- 当需要测试时，使用新的测试类





# 4 Mybatis 缓存

缓存：通常是一个临时存储的数据，在未来的某个时间点可能会被删除，通常，存储缓存数据的位置通常是读写效率较高的，相比其它“非缓存”的数据有更高的处理效率。由于缓存的数据通常并不是必须的，则需要额外消耗一定的存储空间，同时由于从缓存获取数据的效率更高，所以是一种牺牲空间、换取时间的做法！另外，你必须知道，从数据库读取数据的效率是非常低下的！

Mybatis有2种缓存机制，分别称之一级缓存和二级缓存，其中，一级缓存是基于`SqlSession`的缓存，也称之为“会话缓存”，仅当是同一个会话、同一个Mapper、同一个抽象方法（同一个SQL语句）、同样的参数值时有效，一级缓存在集成框架的应用中默认是开启的，且整个过程不由人为控制（如果是自行得到`SqlSession`后的操作，可自行清理一级缓存），另外，二级缓存默认是全局开启的，它是基于namespace的，所以也称之为“namespace缓存”，需要在配置SQL语句的XML中添加`<cache />`节点，以表示当前XML中的所有查询都允许开通二级缓存，并且，在`<select>`节点上配置`useCache="true"`，则对应的`<select>`节点的查询结果将被二级缓存处理，并且，此查询返回的结果的类型必须是实现了`Serializable`接口的，如果使用了`<resultMap>`配置如何封装查询结果，则必须使用`<id>`节点来封装主键的映射，满足以上条件后，二级缓存将可用，只要是当前namespace中查询出来的结果，都会根据所执行的SQL语句及参数进行结果的缓存。无论是一级缓存还是二级缓存，只要数据发生了写操作（增、删、改），缓存数据都将被自动清理。

由于Mybatis的缓存清理机制过于死板，所以，一般在开发实践中并不怎么使用！更多的是使用其它的缓存工具并自行制定缓存策略。

## 4.1 缓存概念

如果有大量相同的请求查询数据库,则数据库需要执行多次重复的sql,那么并发压力高,查询效率低. 如果引入缓存机制,则可以极大的提升用户的查询的效率

![在这里插入图片描述](https://img-blog.csdnimg.cn/cfabe45de6634971baf7bf45642123b9.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 4.2 Mybatis的缓存

1. Mybatis中自身提供了缓存机制,可以极大的提高查询效率.
2. Mybatis系统中默认定义了两级缓存: **一级缓存** 和 **二级缓存**
3. Mybatis**默认条件下开启一级缓存**, 一级缓存是sqlSession级别的, **在同一个sqlSession中查询数据可以共享数据.**----------解释: 用户使用同一个SqlSession时,进行多次数据库的查询,由于一级缓存的存在.所以数据库只查询一次.
4. 二级缓存默认开启. 二级缓存是SqlSessionFactory级别. 同一个工厂创建多个sqlSession共享数据.
5. Mybatis 也提供了第三方Cache接口,整合第三方缓存(了解)

## 4.3 一级缓存测试

经过测试发现 业务方法查询了多次,但是Sql语句执行了一次.

```java
package com.jt;

import com.jt.mapper.UserMapper;
import com.jt.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
public class TestMybatisCache5 {

    @Autowired
    private UserMapper userMapper; //底层实现中包含了SqlSession

    /**
     * 测试:mybatis的一级缓存, SqlSession级别
     * SpringBoot测试说明:
     *   SpringBoot中用户在使用userMapper接口时,用户每调用一次.
     *   SpringBoot就会新创建一个SqlSession.
     * 如何解决多个SqlSession的问题?
     * 解决方案:
     *  利用@Transactional的事务的注解,将多个SqlSession控制为一个.
     */
    @Test
    @Transactional //事务的注解
    public void testCache1(){
        List<User> list1 = userMapper.findAll(); //sqlSession1
        List<User> list2 = userMapper.findAll(); //sqlSession2
        List<User> list3 = userMapper.findAll(); //SqlSession3
        //测试结果为true,表示引用对象是同一个.
        System.out.println(list1 == list2);
    }

}


```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4723ce9b6ca746c6a58bdf58fdf9127b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 4.4 二级缓存测试

说明: 由同一个SqlSessionFactory(类比:链接池)生产的SqlSession(类比:数据库链接),可以实现数据共享
解释说明: 由同一个SqlSessionFactory生产**多个SqlSession**(多线程).可以在多线程的条件下,可以实现数据共享.
默认开关: 二级缓存默认条件下是开启的. 但是需要指定哪里使用二级缓存

### 4.4.1 开启二级缓存

说明: 通过cache标签可以开启二级缓存

![在这里插入图片描述](https://img-blog.csdnimg.cn/71c6679ce7874f81ad8681dcd18bdd0b.png)

### 4.4.2 二级缓存测试

```java
  /**
     * 测试二级缓存
     * 总结: 多线程条件下共享数据,要求数据必须序列化.
     */
    @Test
    public void testCache2(){
        //第一次查询数据库获取的list1的集合对象,该对象需要保存到缓存中,为了后续线程使用,该对象必须序列化
        List<User> list1 = userMapper.findAll(); //sqlSession1  线程A
        //第二个线程查询数据.有二级缓存的存在.所以从缓存中获取数据.所以直接反序列化该对象获取结果.
        List<User> list2 = userMapper.findAll(); //sqlSession2  线程B
        //第三个线程查询数据,所以直接反序列化该对象获取结果.
        List<User> list3 = userMapper.findAll(); //SqlSession3  线程C
    }

```

### 4.4.3 关于对象序列化问题

说明: 在多线程条件下.数据如果需要共享,必须序列化

![在这里插入图片描述](https://img-blog.csdnimg.cn/7327dacc4a224f628e9bc1fb897495ec.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 4.5 SpringBoot整合Mybatis 缓存测试

### 4.5.1 一级缓存测试

说明: Mybatis默认的一级缓存是开启的. 但是在SpringBoot整合之后.每次mapper调用都是一个全新的SqlSession.所以导致一级缓存不生效

必须是同一个SqlSession、同一个Mapper、同样的SQL、同样的参数，才具有缓存效果.

无论是关闭SqlSession，还是清空缓存，还是表中的数据发生变化，都会清空原缓存数据.

解决方案: 添加事务注解 使用同一个SqlSession

```java
package com.jt;

import com.jt.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class TestMybatis {

    @Autowired
    private UserMapper userMapper;

    //springboot整合mybatis 开启事务之后一级缓存有效.
    //否则每次调用都是一个新的sqlSession
    @Test
    @Transactional
    public void test01(){
        userMapper.findAll();
        userMapper.findAll();
        userMapper.findAll();
    }
}

```

### 4.5.2 二级缓存测试

说明: 在xml映射文件中 添加缓存标签

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jt.mapper.UserMapper">

    <!--启用二级缓存-->
    <cache></cache>


    <select id="findAll" resultType="User">
        select * from demo_user
    </select>
</mapper>

```

### 4.5.3 二级注解缓存写法

说明: 二级缓存写法 xml配置文件和注解写法只能二选一 不能同时生效.

```java
package com.jt.mapper;

import com.jt.pojo.User;
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author 
 * 时间 2021/5/9
 */
@CacheNamespace
public interface UserMapper {
    List<User> findAll();
    @Select("select * from demo_user")
    List<User> getUserAnno();
}
```



## 4.6 关于Mybatis一二级缓存的说明

1. 默认条件下一二级缓存是开启的. 但是二级缓存需要标记 cache
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/f5060dcee40e40558ab5e22b3fb4c1b3.png)
   
2. 一级缓存在同一个SqlSession中共享数据(单线程)
3. 二级缓存在同一个SqlSessionFactory生产的多个SqlSession内共享数据(多线程). **对象必须序列化**
4. 在真实的生产环境中(集群:多个服务器)使用二级缓存可能存在问题,使用Redis高级缓存服务器代替.

## 4.7 Mybatis底层实现原理(了解)

重点知识: 1.了解SqlSessionFactory/SqlSession如何创建的!!!

```java
package com.jt;

import com.jt.mapper.UserMapper;
import com.jt.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class MybatisApplicationTests {
    /*
    * Mysql入门实现步骤:
    *   1.编辑mybatis-config.xml核心配置文件
    *       1.1执行数据源配置
    *   2.编辑POJO实体对象.要求与数据库表中的字段一一对应
    *   3.编辑Mapper接口. 添加接口方法
    *   4.编辑接口的实现类(配置文件方式) 要求namespace id  resultType
    *   5.mybatis加载指定的mapper映射文件
    *   6.创建SqlSessionFactory工厂对象
    *   7.获取SqlSession,开启数据库链接
    *   8.获取接口对象(代理对象)
    *   9.调用接口方法,获取返回值结果
    *   10.关闭sqlSession链接.
    * */
    @Test
    public void testDemo1() throws IOException {
        /*创建SqlSessionFactory 类比:链接池 */
        String resource = "mybatis/mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        //设计模式1:建造者模式-Builder-.build()
        //设计模式2:工厂模式-Factory
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        /*从SqlSessionFactory中获取sqlSession*/
        SqlSession sqlSession = sqlSessionFactory.openSession();
        /*SqlSession sqlSession1 = sqlSessionFactory.openSession();
        SqlSession sqlSession2 = sqlSessionFactory.openSession();
        SqlSession sqlSession3 = sqlSessionFactory.openSession();*/

        /*获取mapper接口,执行接口方法*/
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        /*Mybatis为接口创建了一个代理对象
            知识点: 框架中通过接口调用方法时,如果没有实现类,则为其创建代理对象
                    代理对象~实现类
         */
        System.out.println(userMapper.getClass());
        List<User> userList = userMapper.findAll();
        System.out.println(userList);

        /*执行之后关闭SqlSession*/
        sqlSession.close();
    }
}
```

# 5. 关于Mybatis小结

关于Mybatis框架，你应该：

- 了解如何创建一个整合了Spring框架的Mybatis工程
- 了解整合了Spring框架的Mybatis工程的配置
- 掌握基于`spring-test`的测试
  - 在测试类上使用`@SpringJUnitConfig`注解加载Spring的配置文件，则在当前测试中可以自动装配Spring容器中的任何对象
- 掌握`@Sql`注解的使用，掌握断言的使用
- 掌握声明抽象方法的原则：
  - 返回值类型：增删改类型的操作均返回`int`，表示“受影响的行数”，查询类型操作，根据操作得到的结果集来决定，只要能够放入所有所需的数据即可，通常，统计查询返回`int`，查询最多1个结果时返回自定义的某个数据类型，查询多个结果时返回`List`集合类型
  - 方法名称：自定义，不要使用重载，其它命名建议参考此前的笔记
  - 参数列表：根据需要执行的SQL语句中的参数来设计，并且，当需要执行的是插入数据操作时，必须将这些参数进行封装，并在封装的类中添加主键属性，以便于Mybatis能获取自动编号的值回填到此主键属性中，当需要执行的是其它类型的操作时，如果参数数量较多，可以封装，如果只有1个，则直接声明为方法参数，如果超过1个且数量不多，则每个参数之前添加`@Param`注解
- 了解使用注解配置SQL语句
- 掌握使用XML配置SQL语句
  - 这类XML文件需要顶部特殊的声明，所以，通常是从网上下载或通过复制粘贴得到此类文件
  - 根节点必须是`<mapper>`，且必须配置`namespace`，取值为对应的Java接口的全限定名
  - 应该根据要执行的SQL语句不同来选择`<insert>`、`<delete>`、`<update>`、`<select>`节点，这些节点都必须配置`id`属性，取值为对应的抽象方法的名称
    - 其实，`<delete>`节点和`<update>`节点可以随意替换使用，但不推荐
    - 在不考虑“获取自动生成的主键值”的情况下，`<insert>`和`<delete>`、`<update>`也可以混为一谈，但不推荐
    - 当插入数据时，当需要获取自动生成的主键值时，需要在`<insert>`节点上配置`useGeneratedKeys`和`keyProperty`属性
    - 在`<select>`节点上，必须配置`resultMap`或`resultType`属性中的其中1个
- 掌握使用`<sql>`封装SQL语句片段，并使用`<include>`进行引用，以实现SQL语句的复用
- 掌握`<resultMap>`的配置方式
  - 主键列与属性的映射必须使用`<id>`节点配置
  - 在1对多、多对多的查询中，集合类型的属性的映射必须使用`<collection>`子节点配置
  - 其它列与属性的映射使用`<result>`节点配置
  - 在单表查询中，列与属性名一致时，可以不必显式的配置，但是，在关联查询中，即使列与属性名称一致，也必须显式的配置出来
- 理解`resultType`与`resultMap`使用原则
  - 尽可能的全部使用`resultMap`，如果查询结果是单一某个数据类型（例如基本数据类型或字符串或某个时间等），则使用`resultType`
- 掌握动态SQL中的`<foreach>`的使用
- 大概了解动态SQL中的其它标签

- 理解`#{}`和`${}`的区别
- 了解Mybatis中的一级缓存和二级缓存