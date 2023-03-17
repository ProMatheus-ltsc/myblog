# SeataAT模式-SpringCloud微服务案例
[[TOC]]

## 订单业务案例

## 创建 Empty Project：seata-at

先新建文件夹 `seata-samples`，后面测试的 Seata AT 和 Seata TCC 模式都放在该目录下。

接着创建 `seata-at` 项目：

选择 `Empty Project`：

![a](https://img-blog.csdnimg.cn/20200726180043453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

填写项目名 `seata-at` 和存放目录，存放在你新建的 **`seata-samples` 目录下**：

![a](https://img-blog.csdnimg.cn/20200726181638665.png#pic_center)





## 数据库初始化工具

订单案例涉及四个数据库：

![a](https://img-blog.csdnimg.cn/2020072618451644.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

为了后续测试方便我们编写一个工具，用来重置所有数据库表，可以方便地把数据重置到初始状态。



### 新建Module：db-init

新建 Module，选择 `Spring Initializr`

![a](https://img-blog.csdnimg.cn/20200726185335509.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

填写 Group 和 Artifact，其他选项默认即可：

![a](https://img-blog.csdnimg.cn/20200726185532174.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

添加 `JDBC` 和 `MySQL Driver` 依赖：

![a](https://img-blog.csdnimg.cn/20200726190614715.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

完成后，`pom.xml` 文件如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.tedu</groupId>
    <artifactId>db-init</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>db-init</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```





### application.yml 配置

项目的 `application.properties` 文件改名成 `application.yml`，然后添加 mysql 连接配置：

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost/?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8
    username: root
    password: root
```

**注意：** 在连接地址中没有指定库名，是因为我们要先后连接四个数据库，后面执行的 sql 脚本文件中会执行 `use` 来进行数据库切换。





### 添加 sql 脚本文件

案例中的 sql 脚本来自不同的项目：

- **seata 库**
  seata 库是 `Seata Server` （TC，全局事务协调器）使用的数据库，建表语句来自[这里：](https://github.com/seata/seata/tree/develop/script/server/db)
- **order、storage和account库中的 `undo_log` 表**
  `undo_log` 表是各分支事务用来记录回滚日志的表，建表语句来自[这里：](https://github.com/seata/seata/tree/develop/script/client/at/db)
- **order、storage和account表**
  这个案例项目是 Seata 官方案例，我少做了一些改动。案例用的建表语句来自[这里：](https://github.com/seata/seata-samples/tree/master/springcloud-eureka-feign-mybatis-seata)，在各项目的 resources 目录中的 sql 文件。
- **order库中的 `segment` 表**
  EasyIdGenerator 是一个非常简单易用的全局唯一id发号器，他支持数据库自增id方式和雪花算法，由于雪花算法需要用到zookeeper服务器，为了简便起见，我们使用数据库自增id的方式。`segment` 表就来自这个开源项目，[项目地址：](https://github.com/lookingatstarts/easyIdGenerator)

下面，在 `resources` 目录下，先新建一个 `sql` 文件夹，四个 sql 脚本文件放在 `sql` 文件夹下：

![sql](https://img-blog.csdnimg.cn/20200726194628499.png#pic_center)

- `seata-server.sql`

```sql
drop database if exists `seata`;

CREATE DATABASE `seata` CHARSET utf8;
use `seata`;

-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
`xid`                       VARCHAR(128) NOT NULL,
`transaction_id`            BIGINT,
`status`                    TINYINT      NOT NULL,
`application_id`            VARCHAR(32),
`transaction_service_group` VARCHAR(32),
`transaction_name`          VARCHAR(128),
`timeout`                   INT,
`begin_time`                BIGINT,
`application_data`          VARCHAR(2000),
`gmt_create`                DATETIME,
`gmt_modified`              DATETIME,
PRIMARY KEY (`xid`),
KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
DEFAULT CHARSET = utf8;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
`branch_id`         BIGINT       NOT NULL,
`xid`               VARCHAR(128) NOT NULL,
`transaction_id`    BIGINT,
`resource_group_id` VARCHAR(32),
`resource_id`       VARCHAR(256),
`branch_type`       VARCHAR(8),
`status`            TINYINT,
`client_id`         VARCHAR(64),
`application_data`  VARCHAR(2000),
`gmt_create`        DATETIME(6),
`gmt_modified`      DATETIME(6),
PRIMARY KEY (`branch_id`),
KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
DEFAULT CHARSET = utf8;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
`row_key`        VARCHAR(128) NOT NULL,
`xid`            VARCHAR(96),
`transaction_id` BIGINT,
`branch_id`      BIGINT       NOT NULL,
`resource_id`    VARCHAR(256),
`table_name`     VARCHAR(32),
`pk`             VARCHAR(36),
`gmt_create`     DATETIME,
`gmt_modified`   DATETIME,
PRIMARY KEY (`row_key`),
KEY `idx_branch_id` (`branch_id`)
) ENGINE = InnoDB
DEFAULT CHARSET = utf8;

```

- `order.sql`

```sql
drop database if exists `seata_order`;

CREATE DATABASE `seata_order` charset utf8;

use `seata_order`;


CREATE TABLE `order` (
  `id` bigint(11) NOT NULL,
  `user_id` bigint(11) DEFAULT NULL COMMENT '用户id',
  `product_id` bigint(11) DEFAULT NULL COMMENT '产品id',
  `count` int(11) DEFAULT NULL COMMENT '数量',
  `money` decimal(11,0) DEFAULT NULL COMMENT '金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

ALTER TABLE `order` ADD COLUMN `status` int(1) DEFAULT NULL COMMENT '订单状态：0：创建中；1：已完结' AFTER `money` ;

-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT(20)   NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(100) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';

CREATE TABLE IF NOT EXISTS segment
(
    id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
    VERSION       BIGINT      DEFAULT 0  NOT NULL COMMENT '版本号',
    business_type VARCHAR(63) DEFAULT '' NOT NULL COMMENT '业务类型，唯一',
    max_id        BIGINT      DEFAULT 0  NOT NULL COMMENT '当前最大id',
    step          INT         DEFAULT 0  NULL COMMENT '步长',
    increment     INT         DEFAULT 1  NOT NULL COMMENT '每次id增量',
    remainder     INT         DEFAULT 0  NOT NULL COMMENT '余数',
    created_at    BIGINT UNSIGNED        NOT NULL COMMENT '创建时间',
    updated_at    BIGINT UNSIGNED        NOT NULL COMMENT '更新时间',
    CONSTRAINT uniq_business_type UNIQUE (business_type)
) CHARSET = utf8mb4
  ENGINE INNODB COMMENT '号段表';


INSERT INTO segment
(VERSION, business_type, max_id, step, increment, remainder, created_at, updated_at)
VALUES (1, 'order_business', 1000, 1000, 1, 0, NOW(), NOW());

```

- `storage.sql`

```sql
drop database  if exists `seata_storage`;

CREATE DATABASE `seata_storage` charset utf8;

use `seata_storage`;


CREATE TABLE `storage` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(11) DEFAULT NULL COMMENT '产品id',
  `total` int(11) DEFAULT NULL COMMENT '总库存',
  `used` int(11) DEFAULT NULL COMMENT '已用库存',
  `residue` int(11) DEFAULT NULL COMMENT '剩余库存',
  `frozen` int(11) DEFAULT '0' COMMENT 'TCC事务锁定的库存',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `seata_storage`.`storage` (`id`, `product_id`, `total`, `used`, `residue`) VALUES ('1', '1', '100', '0', '100');

-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT(20)   NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(100) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';

```

- `account.sql`

```sql
drop database  if exists `seata_account`;

CREATE DATABASE `seata_account` charset utf8;

use `seata_account`;

CREATE TABLE `account` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` bigint(11) UNIQUE DEFAULT NULL COMMENT '用户id',
  `total` decimal(10,0) DEFAULT NULL COMMENT '总额度',
  `used` decimal(10,0) DEFAULT NULL COMMENT '已用余额',
  `residue` decimal(10,0) DEFAULT '0' COMMENT '剩余可用额度',
  `frozen` decimal(10,0) DEFAULT '0' COMMENT 'TCC事务锁定的金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `seata_account`.`account` (`id`, `user_id`, `total`, `used`, `residue`) VALUES ('1', '1', '1000', '0', '1000');

-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT(20)   NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(100) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';

```





### 主程序中添加代码，执行sql脚本

Spring 中提供了一个 jdbc 脚本执行器，使用这个工具可以非常方便的运行一个 sql 脚本文件，下面是这个方法：

```
ScriptUtils.executeSqlScript()
```

只需要传入它需要的参数即可。

下面代码运行 sql 目录中的四个脚本程序，每次运行都会删除四个数据库再重新创建，并初始化数据。

```java
package cn.tedu.dbinit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.SQLException;

@SpringBootApplication
public class DbInitApplication {

	@Autowired
	private DataSource dataSource;

	public static void main(String[] args) {
		SpringApplication.run(DbInitApplication.class, args);
	}

	@PostConstruct
	public void init() throws SQLException {
		exec(dataSource, "sql/account.sql");
		exec(dataSource, "sql/storage.sql");
		exec(dataSource, "sql/order.sql");
		exec(dataSource, "sql/seata-server.sql");
	}

	private void exec(DataSource accountDatasource, String script) throws SQLException {
		ClassPathResource rc = new ClassPathResource(script, DbInitApplication.class.getClassLoader());
		EncodedResource er = new EncodedResource(rc, "utf-8");
		ScriptUtils.executeSqlScript(accountDatasource.getConnection(), er);
	}
}

```





## eureka注册中心





### 新建 Module：eureka-server

新建 Module：

![a](https://img-blog.csdnimg.cn/20200726225038936.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

设置 Group 和 Artifact，其他默认：

![a](https://img-blog.csdnimg.cn/20200726225243858.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

选择 eureka server 依赖：

![a](https://img-blog.csdnimg.cn/20200726225454917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

设置项目名 eureka-server，存放路径放在 seata-at 目录下：

![a](https://img-blog.csdnimg.cn/20200726225631579.png#pic_center)





### application.yml 配置

```yml
spring:
  application:
    name: eureka-server

server:
  port: 8761

eureka:
  server:
    enable-self-preservation: false
  instance:
    hostname: eureka1
  client:
    register-with-eureka: false
    fetch-registry: false

```





### 主程序添加 `@EnableEurekaServer` 注解

```java
package cn.tedu.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }

}

```





## 父项目

为了对 order、storage和account微服务项目依赖进行统一管理，这里创建一个 pom 类型的 maven 项目，作为父项目。





### 新建 Maven 项目：order-parent

新建 Module，选择 Maven 项目：

![a](https://img-blog.csdnimg.cn/20200726232045260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

填写设置，将 order-parent 项目存放在 seata-at 项目目录下：

![a](https://img-blog.csdnimg.cn/2020072623251737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 修改 pom.xml

看到 seata 依赖部分被注释掉了，后面添加 seata 事务时再启用。

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.tedu</groupId>
    <artifactId>order-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    <name>order-parent</name>


    <properties>
        <mybatis-plus.version>3.3.2</mybatis-plus.version>
        <druid-spring-boot-starter.version>1.1.23</druid-spring-boot-starter.version>
        <seata.version>1.3.0</seata.version>
        <spring-cloud-alibaba-seata.version>2.0.0.RELEASE</spring-cloud-alibaba-seata.version>
        <spring-cloud.version>Hoxton.SR6</spring-cloud.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>${mybatis-plus.version}</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>${druid-spring-boot-starter.version}</version>
        </dependency>
        <!--<dependency>-->
        <!--  <groupId>com.alibaba.cloud</groupId>-->
        <!--  <artifactId>spring-cloud-alibaba-seata</artifactId>-->
        <!--  <version>${spring-cloud-alibaba-seata.version}</version>-->
        <!--  <exclusions>-->
        <!--    <exclusion>-->
        <!--      <artifactId>seata-all</artifactId>-->
        <!--      <groupId>io.seata</groupId>-->
        <!--    </exclusion>-->
        <!--  </exclusions>-->
        <!--</dependency>-->
        <!--<dependency>-->
        <!--  <groupId>io.seata</groupId>-->
        <!--  <artifactId>seata-all</artifactId>-->
        <!--  <version>${seata.version}</version>-->
        <!--</dependency>-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```





## account账户项目

在这个微服务项目中实现扣减账户金额的功能。





### 新建 Module：account

新建Module：

![a](https://img-blog.csdnimg.cn/20200726225038936.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

设置 Group 和 Artifact，其它选项默认：

![a](https://img-blog.csdnimg.cn/20200727131022522.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

不选择任何依赖，直接点下一步，这个项目要继承 order-parent 项目：

![a](https://img-blog.csdnimg.cn/20200727131237480.png#pic_center)
设置 Module 名称和存储目录：

![a](https://img-blog.csdnimg.cn/20200727131350652.png#pic_center)





### 修改 pom.xml

修改 pom.xml，设置继承父项目 order-parent：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>order-parent</artifactId>
        <groupId>cn.tedu</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.tedu</groupId>
    <artifactId>account</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>account</name>
    <description>Demo project for Spring Boot</description>
</project>

```





### application.yml 配置

```yml
spring:
  application:
    name: account
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost/seata_account?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8
    username: root
    password: root

server:
  port: 8081

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka
  instance:
    prefer-ip-address: true
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port} 

mybatis-plus:
  type-aliases-package: cn.tedu.account.entity
  mapper-locations:
    - classpath:mapper/*Mapper.xml
  configuration:
    map-underscore-to-camel-case: true

logging:
  level:
    cn.tedu.account.mapper: DEBUG

```





### Mapper配置

先在 resources 目录下新建文件夹 `mapper`，然后创建文件 `AccountMapper.xml`：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="cn.tedu.account.mapper.AccountMapper" >
    <resultMap id="BaseResultMap" type="cn.tedu.account.entity.Account" >
        <id column="id" property="id" jdbcType="BIGINT" />
        <result column="user_id" property="userId" jdbcType="BIGINT" />
        <result column="total" property="total" jdbcType="DECIMAL" />
        <result column="used" property="used" jdbcType="DECIMAL" />
        <result column="residue" property="residue" jdbcType="DECIMAL"/>
        <result column="frozen" property="frozen" jdbcType="DECIMAL"/>
    </resultMap>
    <update id="decrease">
    UPDATE account SET residue = residue - #{money},used = used + #{money} where user_id = #{userId};
  </update>
</mapper>

```





### 主程序添加 Mybatis 扫描注解

添加注解 `@MapperScan("cn.tedu.account.mapper")` ：

```java
package cn.tedu.account;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("cn.tedu.account.mapper")
@SpringBootApplication
public class AccountApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountApplication.class, args);
    }

}

```





### 创建 Account 实体类

```java
package cn.tedu.account.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    private Long id;
    private Long userId;
    private BigDecimal total;
    private BigDecimal used;
    private BigDecimal residue;
    private BigDecimal frozen;
}

```





### 创建 AccountMapper 类

这里继承 Mybatis-Plus 提供的通用 Mapper 父类

```java
package cn.tedu.account.mapper;

import cn.tedu.account.entity.Account;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.math.BigDecimal;

public interface AccountMapper extends BaseMapper<Account> {
    void decrease(Long userId, BigDecimal money);
}

```





### 添加 AccountService 接口和它的实现类

`decrease()` 方法实现扣减账户金额的功能

```java
package cn.tedu.account.service;

import java.math.BigDecimal;

public interface AccountService {
    void decrease(Long userId, BigDecimal money);
}
package cn.tedu.account.service;

import cn.tedu.account.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountMapper accountMapper;

    @Override
    public void decrease(Long userId, BigDecimal money) {
        accountMapper.decrease(userId,money);
    }
}

```





### 添加 AccountController 类提供客户端访问接口

```java
package cn.tedu.account.controller;

import cn.tedu.account.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@Slf4j
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/decrease")
    public String decrease(Long userId, BigDecimal money) {
        accountService.decrease(userId,money);
        return "用户账户扣减金额成功";
    }
}

```





### 启动 account 项目进行测试

1. **查看 eureka 注册信息**
   访问 http://localhost:8761/ 查看账户服务在 eureka 中的注册信息：

![a](https://img-blog.csdnimg.cn/20200727141953892.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

2. **访问账户服务执行账户扣减金额**
   访问 http://localhost:8081/decrease?userId=1&money=100

![a](https://img-blog.csdnimg.cn/20200727142215981.png#pic_center)

3. **查看控制台 Mybatis 执行的 sql 日志**

![a](https://img-blog.csdnimg.cn/20200727142656476.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

4. **查看数据库表，确认金额已经被减掉**

![a](https://img-blog.csdnimg.cn/20200727142431313.png#pic_center)





## storage库存项目

storage 库存微服务项目，用来实现减少库存的功能。





### 新建 Module：storage

新建Module：

![a](https://img-blog.csdnimg.cn/20200726225038936.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

设置 Group 和 Artifact，其它选项默认：

![a](https://img-blog.csdnimg.cn/20200727145350292.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

不选择任何依赖，直接点下一步，这个项目要继承 order-parent 项目：

![a](https://img-blog.csdnimg.cn/20200727131237480.png#pic_center)

设置 Module 名称和存储目录：

![a](https://img-blog.csdnimg.cn/20200727145513327.png#pic_center)





### 修改 pom.xml

修改 pom.xml，设置继承父项目 order-parent：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>order-parent</artifactId>
        <groupId>cn.tedu</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.tedu</groupId>
    <artifactId>storage</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>storage</name>
    <description>Demo project for Spring Boot</description>

</project>

```





### application.yml 配置

```yml
spring:
  application:
    name: storage
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost/seata_storage?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8
    username: root
    password: root

server:
  port: 8082

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka
  instance:
    prefer-ip-address: true
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port} 

mybatis-plus:
  type-aliases-package: cn.tedu.storage.entity
  mapper-locations:
    - classpath:/mapper/*Mapper.xml
  configuration:
    map-underscore-to-camel-case: true

logging:
  level:
    cn.tedu.storage.mapper: DEBUG

```





### Mapper配置

先在 resources 目录下新建文件夹 `mapper`，然后创建文件 `StorageMapper.xml`：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="cn.tedu.storage.mapper.StorageMapper" >
    <resultMap id="BaseResultMap" type="cn.tedu.storage.entity.Storage" >
        <id column="id" property="id" jdbcType="BIGINT" />
        <result column="product_id" property="productId" jdbcType="BIGINT" />
        <result column="total" property="total" jdbcType="INTEGER" />
        <result column="used" property="used" jdbcType="INTEGER" />
        <result column="residue" property="residue" jdbcType="INTEGER" />
    </resultMap>
    <update id="decrease">
      UPDATE storage SET used = used + #{count},residue = residue - #{count} WHERE product_id = #{productId}
    </update>
</mapper>

```





### 主程序添加 Mybatis 扫描注解

添加注解 `@MapperScan("cn.tedu.storage.mapper")` ：

```java
package cn.tedu.storage;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("cn.tedu.storage.mapper")
@SpringBootApplication
public class StorageApplication {

    public static void main(String[] args) {
        SpringApplication.run(StorageApplication.class, args);
    }

}

```





### 创建 storage 实体类

```java
package cn.tedu.storage.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Storage {
    private Long id;
    private Long productId;
    private Integer total;
    private Integer used;
    private Integer residue;
    private Integer frozen;
}

```





### 创建 StorageMapper 类

这里继承 Mybatis-Plus 提供的通用 Mapper 父类

```java
package cn.tedu.storage.mapper;

import cn.tedu.storage.entity.Storage;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface StorageMapper extends BaseMapper<Storage> {
    void decrease(Long productId, Integer count);
}

```





### 添加 StorageService 接口和它的实现类

`decrease()` 方法实现减少商品库存功能。

```java
package cn.tedu.storage.service;

public interface StorageService {
    void decrease(Long productId, Integer count) throws Exception;
}

package cn.tedu.storage.service;

import cn.tedu.storage.mapper.StorageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StorageServiceImpl implements StorageService {
    @Autowired
    private StorageMapper storageMapper;

    @Override
    public void decrease(Long productId, Integer count) throws Exception {
        storageMapper.decrease(productId,count);
    }
}

```





### 添加 StorageController 类提供客户端访问接口

```java
package cn.tedu.storage.controller;

import cn.tedu.storage.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StorageController {
    @Autowired
    private StorageService storageService;

    @GetMapping("/decrease")
    public String decrease(Long productId, Integer count) throws Exception {
        storageService.decrease(productId,count);
        return "减少商品库存成功";
    }

}

```





### 启动 storage 项目进行测试

1. **查看 eureka 注册信息**
   访问 http://localhost:8761/ 查看库存服务在 eureka 中的注册信息：

![a](https://img-blog.csdnimg.cn/20200727151513717.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

2. **访问库存服务，执行减少库存操作**
   访问 http://localhost:8082/decrease?productId=1&count=1

![a](https://img-blog.csdnimg.cn/20200727151828442.png#pic_center)

3. **查看控制台 Mybatis 执行的 sql 日志**

![a](https://img-blog.csdnimg.cn/20200727152021194.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

4. **查看数据库表，确认金额已经被减掉**

![a](https://img-blog.csdnimg.cn/20200727152139527.png#pic_center)





## order订单项目

order 订单项目保存订单，并调用 storage 和 account 减少库存和扣减金额。





### 新建 Module：order

新建Module：

![a](https://img-blog.csdnimg.cn/20200726225038936.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

设置 Group 和 Artifact，其它选项默认：

![a](https://img-blog.csdnimg.cn/20200727153053194.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

不选择任何依赖，直接点下一步，这个项目要继承 order-parent 项目：

![a](https://img-blog.csdnimg.cn/20200727131237480.png#pic_center)

设置 Module 名称和存储目录：

![a](https://img-blog.csdnimg.cn/20200727154018672.png#pic_center)





### 修改 pom.xml

修改 pom.xml，设置继承父项目 order-parent：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>order-parent</artifactId>
        <groupId>cn.tedu</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.tedu</groupId>
    <artifactId>order</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>order</name>
    <description>Demo project for Spring Boot</description>

</project>

```





### application.yml 配置

```yml
spring:
  application:
    name: order

  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost/seata_order?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8
    username: root
    password: root

server:
  port: 8083

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka
  instance:
    prefer-ip-address: true
    instance-id: ${spring.cloud.client.ip-address}:${spring.application.name}:${server.port} 

mybatis-plus:
  type-aliases-package: cn.tedu.order.entity
  mapper-locations:
    - classpath:/mapper/*Mapper.xml
  configuration:
    map-underscore-to-camel-case: true

logging:
  level:
    cn.tedu.order.mapper: DEBUG

```





### Mapper配置

先在 resources 目录下新建文件夹 `mapper`，然后创建文件 `OrderMapper.xml`：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="cn.tedu.order.mapper.OrderMapper" >
    <resultMap id="BaseResultMap" type="cn.tedu.order.entity.Order" >
        <id column="id" property="id" jdbcType="BIGINT" />
        <result column="user_id" property="userId" jdbcType="BIGINT" />
        <result column="product_id" property="productId" jdbcType="BIGINT" />
        <result column="count" property="count" jdbcType="INTEGER" />
        <result column="money" property="money" jdbcType="DECIMAL" />
        <result column="status" property="status" jdbcType="INTEGER" />
    </resultMap>
    <insert id="create">
        INSERT INTO `order` (`id`,`user_id`,`product_id`,`count`,`money`,`status`)
        VALUES(#{id}, #{userId}, #{productId}, #{count}, #{money},1);
    </insert>

</mapper>
```





### 主程序添加 Mybatis 扫描注解

添加注解 `@MapperScan("cn.tedu.order.mapper")` ：

```java
package cn.tedu.order;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("cn.tedu.order.mapper")
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

}
```





### 创建 order 实体类

```java
package cn.tedu.order.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    private Long id;
    private Long userId;
    private Long productId;
    private Integer count;
    private BigDecimal money;
    private Integer status;
}

```





### 创建 OrderMapper 类

这里继承 Mybatis-Plus 提供的通用 Mapper 父类

```java
package cn.tedu.order.mapper;

import cn.tedu.order.entity.Order;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;


public interface OrderMapper extends BaseMapper<Order> {
    void create(Order order);
}

```





### 添加 OrderService 接口和它的实现类

`create()` 方法实现保存订单的功能。

```java
package cn.tedu.order.service;

import cn.tedu.order.entity.Order;

public interface OrderService {
    void create(Order order);
}

```

这里添加了三个 `// TODO` 注释，会在后面两节中实现。

```java
package cn.tedu.order.service;

import cn.tedu.order.entity.Order;
import cn.tedu.order.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public void create(Order order) {
        // TODO: 从全局唯一id发号器获得id，这里暂时随机产生一个 orderId
        Long orderId = Long.valueOf(new Random().nextInt(Integer.MAX_VALUE));
        order.setId(orderId);

        orderMapper.create(order);

        // TODO: 调用storage，修改库存

        // TODO: 调用account，修改账户余额

    }
}

```





### 添加 OrderController 类提供客户端访问接口

```java
package cn.tedu.order.controller;

import cn.tedu.order.entity.Order;
import cn.tedu.order.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class OrderController {
    @Autowired
    OrderService orderService;

    /*
    用户用这个路径进行访问：
    http://localhost:8083/create?userId=1&productId=1&count=10&money=100
     */
    @GetMapping("/create")
    public String create(Order order) {
        log.info("创建订单");
        orderService.create(order);
        return "创建订单成功";
    }
}

```





### 启动 order 项目进行测试

1. **查看 eureka 注册信息**
   访问 http://localhost:8761/ 查看订单服务在 eureka 中的注册信：

![a](https://img-blog.csdnimg.cn/20200727155802941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

2. **访问订单服务，执行订单保存**
   访问 http://localhost:8083/create?userId=1&productId=1&count=10&money=100

![a](https://img-blog.csdnimg.cn/20200727155918876.png#pic_center)

3. **查看控制台 Mybatis 执行的 sql 日志**

![a](https://img-blog.csdnimg.cn/20200727160049911.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

4. **查看数据库表，确认订单保存成功**

![a](https://img-blog.csdnimg.cn/20200727160300770.png#pic_center)





## 全局唯一id发号器

分布式系统中，产生唯一流水号的服务系统俗称发号器。

有很多发号器开源项目，这里使用 EasyIdGenerator，具体项目信息请访问：https://github.com/lookingatstarts/easyIdGenerator

项目使用非常简单，将项目下载下来稍作配置即可。





### 下载项目

访问 https://github.com/lookingatstarts/easyIdGenerator ，下载发号器项目。

![a](https://img-blog.csdnimg.cn/20200727163202252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 解压到 seata-at 工程目录下

解压，和前面的项目放到同一个工程目录。

![a](https://img-blog.csdnimg.cn/20200727163500406.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

把目录改名为 `easy-id-generator` ：

![a](https://img-blog.csdnimg.cn/20200727163714819.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 导入 Module

在Maven工具窗口中点击添加按钮，选择发号器项目的 pom.xml 文件导入该项目：

**注意：** 如果右侧没有Maven工具标签，请按两下shift键，然后查找 “add maven projects” 就可以找到这个工具。

![a](https://img-blog.csdnimg.cn/2020072716393170.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 配置





#### pom.xml

发号器向 eureka 进行注册，以便其它服务发现它。

在pom.xml 中添加 Spring Cloud Eureka Client 依赖：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.2.RELEASE</version>
        <relativePath/>
    </parent>

    <groupId>com.easy.id</groupId>
    <artifactId>easy-id-generator</artifactId>
    <version>1.0-SNAPSHOT</version>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.source>1.8</maven.compiler.source>
        <junit.version>4.12</junit.version>
        <mysql.connector.version>8.0.16</mysql.connector.version>
        <com.alibaba.fastjson.version>1.2.62</com.alibaba.fastjson.version>
        <lombok.version>1.18.8</lombok.version>
        <curator.version>2.6.0</curator.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>${mysql.connector.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>${com.alibaba.fastjson.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>${curator.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Greenwich.SR6</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>

```





#### application.yml

1. 配置使用数据库来生成自增id
2. 向eureka进行注册

```yml
server:
  port: 9090

easy-id-generator:
  snowflake:
    enable: false
    zk:
      connection-string: 127.0.0.1:2181,127.0.0.1:2182,127.0.0.1:2183
    load-worker-id-from-file-when-zk-down: true  # 当zk不可访问时，从本地文件中读取之前备份的workerId
  segment:
    enable: true
    db-list: seata_order
    fetch-segment-retry-times: 3 # 从数据库获取号段失败重试次数

spring:
  application:
    name: easy-id-generator
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka

```





#### seata_order.properties 数据库配置

在 resources 目录下新建配置文件 `seata_order.properties`，配置 `seata_order` 数据库的连接信息。

```properties
jdbcUrl=jdbc:mysql://localhost:3306/seata_order?autoReconnect=true&useUnicode=true&characterEncoding=UTF-8
driverClassName=com.mysql.cj.jdbc.Driver
dataSource.user=root
dataSource.password=root
dataSource.cachePrepStmts=true
dataSource.prepStmtCacheSize=250
dataSource.prepStmtCacheSqlLimit=2048

```





### 数据表

在 db-init 项目的 `order.sql` 中已经创建了数据表，并插入了一个名为 `order_business` 的自增id条目。

*项目的 schema.sql 中为示例数据表。*





### 启动项目并访问测试

1. **查看 eureka 中的注册信息**

![a](https://img-blog.csdnimg.cn/20200727172359377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

2. **访问测试**

根据 `SegmentEasyIdController` 类的设置，访问下面地址获取自增id：
http://localhost:9090/segment/ids/next_id?businessType=order_business

![a](https://img-blog.csdnimg.cn/20200727172535756.png#pic_center)





## order订单添加Feign，调用库存和账户服务

- 调用**发号器**获得全局唯一id
- 调用**库存服务**减少商品库存
- 调用**账户服务**扣减用户金额





### application.yml

ribbon 默认超时时间是1秒，为了方便分布式事务测试，把超时时长改为 10 秒：

```yml
spring:
  application:
    name: order

  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost/seata_order?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8
    username: root
    password: root

server:
  port: 8083

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka
  instance:
    prefer-ip-address: true

mybatis-plus:
  type-aliases-package: cn.tedu.order.entity
  mapper-locations:
    - classpath:/mapper/*Mapper.xml
  configuration:
    map-underscore-to-camel-case: true

logging:
  level:
    cn.tedu.order.mapper: DEBUG
    
ribbon:
  ReadTimeout: 10000

```





### 主程序添加注解启用 Feign

添加 `@EnableFeignClients` 注解：

```java
package cn.tedu.order;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@MapperScan("cn.tedu.order.mapper")
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

}

```





### 添加Feign声明式客户端接口

发号器的客户端接口：

```java
package cn.tedu.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "EASY-ID-GENERATOR")
public interface EasyIdGeneratorClient {
    @GetMapping("/segment/ids/next_id")
    String nextId(@RequestParam String businessType);
}

```

库存服务的客户端接口：

```java
package cn.tedu.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "storage")
public interface StorageClient {
    @GetMapping("/decrease")
    String decrease(@RequestParam Long productId, @RequestParam Integer count);
}

```

账户服务的客户端接口：

```java
package cn.tedu.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;

@FeignClient(name = "account")
public interface AccountClient {
    @GetMapping("/decrease")
    String decrease(@RequestParam Long userId, @RequestParam BigDecimal money);
}

```





### 在业务代码中通过Feign客户端调用远程服务

```java
package cn.tedu.order.service;

import cn.tedu.order.entity.Order;
import cn.tedu.order.feign.AccountClient;
import cn.tedu.order.feign.EasyIdGeneratorClient;
import cn.tedu.order.feign.StorageClient;
import cn.tedu.order.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    EasyIdGeneratorClient easyIdGeneratorClient;
    @Autowired
    private AccountClient accountClient;
    @Autowired
    private StorageClient storageClient;

    @Override
    public void create(Order order) {
        // 从全局唯一id发号器获得id
        String s = easyIdClient.nextId("order_business");
		Long orderId = Long.valueOf(s);
		
        order.setId(orderId);
        orderMapper.create(order);

        // 修改库存
        storageClient.decrease(order.getProductId(), order.getCount());

        // 修改账户余额
        accountClient.decrease(order.getUserId(), order.getMoney());
    }
}

```





### 启动项目，访问测试

访问订单项目进行测试：

http://localhost:8083/create?userId=1&productId=1&count=10&money=100

1. 查看 order、storage和account的控制台查看日志
2. 查看三个数据库中的数据变化





## 将项目托管到 git 仓库





### seata-samples 设置成本地 git 仓库

目前项目的目录结构：

```
seata-samples
        |- seata-at
             |- ...
```

`seata-at` 工程对 AT 事务进行测试。后面我们还要测试 TCC 事务，会创建 `seata-tcc` 工程：

```
seata-samples
        |- seata-at
             |- ...
        |- seata-tcc
             |- ...

```

我们可以把 seata 测试的这两个项目一起托管到同一个 git 仓库，便于管理，所以直接把 seata-samples 目录设置为本地仓库。

选择创建本地仓库：

![a](https://img-blog.csdnimg.cn/20200727192756555.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

选择 seata-samples 文件夹创建为本地库：

![a](https://img-blog.csdnimg.cn/20200727192958252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

按 `ctrl + k` 提交，选择提交全部文件，填写提交说明后进行提交：

![a](https://img-blog.csdnimg.cn/20200727193516656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 推送到远程 git 仓库

接下来先在 github 或 gitee 创建一个远程仓库，例如可以命名为 `seata-samples`。

再按 `ctrl+shift+k` 先设置远程仓库路径：

![a](https://img-blog.csdnimg.cn/20200727194033155.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

点击 push 向远程仓库推送：

![a](https://img-blog.csdnimg.cn/20200727194220770.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



> [项目源码：](https://gitee.com/benwang6/seata-samples) 