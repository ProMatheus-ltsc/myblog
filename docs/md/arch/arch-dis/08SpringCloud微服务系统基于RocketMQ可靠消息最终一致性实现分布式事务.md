# SpringCloud微服务系统基于RocketMQ可靠消息最终一致性实现分布式事务
[[TOC]]

## 安装搭建 Rocketmq服务器

搭建单机 Rocketmq 服务器笔记：
《[RocketMQ](https://promatheus-ltsc.github.io/matheusblog/md/springcloud/mq/04RocketMQ.html》

搭建双主双从同步复制 Rocketmq 服务器笔记：
《[RocketMQ](https://promatheus-ltsc.github.io/matheusblog/md/springcloud/mq/04RocketMQ.html)》





## 基于 Rocketmq 可靠消息的分布式事务方案原理

Rocketmq事务消息笔记：
《[RocketMQ 发送事务消息原理分析和代码实现](https://promatheus-ltsc.github.io/matheusblog/md/springcloud/mq/07RocketMQ%E5%8F%91%E9%80%81%E4%BA%8B%E5%8A%A1%E6%B6%88%E6%81%AF%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90%E5%92%8C%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0.html)》





## 准备订单项目案例





### 新建 rocketmq-dtx 工程

新建 Empty Project：

![a](https://img-blog.csdnimg.cn/20200726180043453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

工程命名为 `rocketmq-dtx`，存放到任意文件夹下：

![a](https://img-blog.csdnimg.cn/20200807231835772.png#pic_center)





### 导入订单项目，无事务版本





#### 下载项目代码

1. 访问 git 仓库 https://gitee.com/benwang6/seata-samples
2. 访问项目标签

   ![a](https://img-blog.csdnimg.cn/20200730232136813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

3. 下载无事务版


   ![a](https://img-blog.csdnimg.cn/20200730232347162.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





#### 解压到 rocketmq-dtx 目录

压缩文件中的 7 个项目目录解压缩到 `rocketmq-dtx` 目录：

![a](https://img-blog.csdnimg.cn/20200807232248400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





#### 导入项目

在 idea 中按两下 `shift` 键，搜索 `add maven projects`，打开 maven 工具：

![a](https://img-blog.csdnimg.cn/20200730234243542.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

然后选择 `rocketmq-dtx` 工程目录下的 7 个项目的 `pom.xml` 导入：

![a](https://img-blog.csdnimg.cn/2020080723243590.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## order 添加事务状态表

Rocketmq收到事务消息后，会等待生产者提交或回滚该消息。如果无法得到生产者的提交或回滚指令，则会主动向生产者询问消息状态，称为回查。

在 order 项目中，为了让Rocketmq可以回查到事务的状态，需要记录事务的状态，所以我们添加一个事务的状态表来记录事务状态。

修改 `db-init` 项目中的 `order.sql` 文件，创建 `tx_table` 表：

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

CREATE TABLE tx_table(
	`xid` char(32) PRIMARY KEY COMMENT '事务id',
	`status` int COMMENT '0-提交，1-回滚，2-未知',
	`created_at` BIGINT UNSIGNED NOT NULL COMMENT '创建时间'
);

```

运行 db-init 项目，会创建这个表：

![a](https://img-blog.csdnimg.cn/20200808001747148.png#pic_center)





## order 发送事务消息，并执行本地事务





### Rocketmq 中添加 Topic

使用 `order-topic` 来收发消息，在 Rocketmq 服务器上创建这个 Topic：

![a](https://img-blog.csdnimg.cn/20200808225719317.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### order-parent 中添加 rocketmq 起步依赖

修改 `pom.xml` 添加以下内容：

在 `properties` 中设置 rocketmq 起步依赖的版本

```xml
<rocketmq-spring-boot-starter.version>2.1.0</rocketmq-spring-boot-starter.version>
```

添加 rocketmq 起步依赖：

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-spring-boot-starter</artifactId>
    <version>${rocketmq-spring-boot-starter.version}</version>
</dependency>
```





### order 项目中添加 rocketmq 连接信息配置：

修改 order 项目的 application.yml，添加 NameServer 地址，指定生产者组名：

```yml
rocketmq:
  name-server: 192.168.64.151:9876;192.168.64.152:9876
  producer:
    group: order-group

```





### 添加 `TxMapper` 访问事务状态表

事务状态保存到 `tx_table` 表，在 `TxMapper` 接口和 `TxMapper.xml` 中添加事务状态数据的读写方法。

本地事务执行后要保存事务信息（事务id、事务状态）到数据库，以便之后进行事务回查，首先创建封装事务信息的类 `TxInfo` ：

```java
package cn.tedu.order.tx;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TxInfo {
    private String xid;
    private Long created;
    private Integer status;
}

```

**`TxMapper` 接口：**

```java
package cn.tedu.order.mapper;

import cn.tedu.order.tx.TxInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface TxMapper extends BaseMapper<TxInfo> {
    Boolean exists(String xid);
}

```

**`TxMapper.xml` ：**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="cn.tedu.order.mapper.TxMapper" >
    <resultMap id="BaseResultMap" type="cn.tedu.order.tx.TxInfo" >
        <id column="xid" property="xid" jdbcType="CHAR" />
        <result column="created_at" property="created" jdbcType="BIGINT" />
        <result column="status" property="status" jdbcType="INTEGER"/>
    </resultMap>

    <insert id="insert">
        INSERT INTO `tx_table`(`xid`,`created_at`,`status`) VALUES(#{xid},#{created},#{status});
    </insert>
    <select id="exists" resultType="boolean">
        SELECT COUNT(1) FROM tx_table WHERE xid=#{xid};
    </select>
    <select id="selectById" resultMap="BaseResultMap">
        SELECT `xid`,`created_at`,`status` FROM tx_table WHERE xid=#{xid};
    </select>
</mapper>
```





### Json处理工具

发送事务消息时，我们把事务对象序列化成 Json 字符串再发送。这里先添加一个工具 `JsonUtil` 用来处理 Json：

```java
package cn.tedu.order.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Writer;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JsonUtil {
    private static ObjectMapper mapper;
    private static JsonInclude.Include DEFAULT_PROPERTY_INCLUSION = JsonInclude.Include.NON_DEFAULT;
    private static boolean IS_ENABLE_INDENT_OUTPUT = false;
    private static String CSV_DEFAULT_COLUMN_SEPARATOR = ",";
    static {
        try {
            initMapper();
            configPropertyInclusion();
            configIndentOutput();
            configCommon();
        } catch (Exception e) {
            log.error("jackson config error", e);
        }
    }

    private static void initMapper() {
        mapper = new ObjectMapper();
    }

    private static void configCommon() {
        config(mapper);
    }

    private static void configPropertyInclusion() {
        mapper.setSerializationInclusion(DEFAULT_PROPERTY_INCLUSION);
    }

    private static void configIndentOutput() {
        mapper.configure(SerializationFeature.INDENT_OUTPUT, IS_ENABLE_INDENT_OUTPUT);
    }

    private static void config(ObjectMapper objectMapper) {
        objectMapper.enable(JsonGenerator.Feature.WRITE_BIGDECIMAL_AS_PLAIN);
        objectMapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
        objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        objectMapper.enable(DeserializationFeature.FAIL_ON_READING_DUP_TREE_KEY);
        objectMapper.enable(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS);
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        objectMapper.disable(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES);
        objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        objectMapper.enable(JsonParser.Feature.ALLOW_COMMENTS);
        objectMapper.disable(JsonGenerator.Feature.ESCAPE_NON_ASCII);
        objectMapper.enable(JsonGenerator.Feature.IGNORE_UNKNOWN);
        objectMapper.enable(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES);
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        objectMapper.enable(JsonParser.Feature.ALLOW_SINGLE_QUOTES);
        objectMapper.registerModule(new ParameterNamesModule());
        objectMapper.registerModule(new Jdk8Module());
        objectMapper.registerModule(new JavaTimeModule());
    }
    public static void setSerializationInclusion(JsonInclude.Include inclusion) {
        DEFAULT_PROPERTY_INCLUSION = inclusion;
        configPropertyInclusion();
    }

    public static void setIndentOutput(boolean isEnable) {
        IS_ENABLE_INDENT_OUTPUT = isEnable;
        configIndentOutput();
    }

    public static <V> V from(URL url, Class<V> c) {
        try {
            return mapper.readValue(url, c);
        } catch (IOException e) {
            log.error("jackson from error, url: {}, type: {}", url.getPath(), c, e);
            return null;
        }
    }

    public static <V> V from(InputStream inputStream, Class<V> c) {
        try {
            return mapper.readValue(inputStream, c);
        } catch (IOException e) {
            log.error("jackson from error, type: {}", c, e);
            return null;
        }
    }

    public static <V> V from(File file, Class<V> c) {
        try {
            return mapper.readValue(file, c);
        } catch (IOException e) {
            log.error("jackson from error, file path: {}, type: {}", file.getPath(), c, e);
            return null;
        }
    }

    public static <V> V from(Object jsonObj, Class<V> c) {
        try {
            return mapper.readValue(jsonObj.toString(), c);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", jsonObj.toString(), c, e);
            return null;
        }
    }

    public static <V> V from(String json, Class<V> c) {
        try {
            return mapper.readValue(json, c);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", json, c, e);
            return null;
        }
    }

    public static <V> V from(URL url, TypeReference<V> type) {
        try {
            return mapper.readValue(url, type);
        } catch (IOException e) {
            log.error("jackson from error, url: {}, type: {}", url.getPath(), type, e);
            return null;
        }
    }

    public static <V> V from(InputStream inputStream, TypeReference<V> type) {
        try {
            return mapper.readValue(inputStream, type);
        } catch (IOException e) {
            log.error("jackson from error, type: {}", type, e);
            return null;
        }
    }

    public static <V> V from(File file, TypeReference<V> type) {
        try {
            return mapper.readValue(file, type);
        } catch (IOException e) {
            log.error("jackson from error, file path: {}, type: {}", file.getPath(), type, e);
            return null;
        }
    }

    public static <V> V from(Object jsonObj, TypeReference<V> type) {
        try {
            return mapper.readValue(jsonObj.toString(), type);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", jsonObj.toString(), type, e);
            return null;
        }
    }

    public static <V> V from(String json, TypeReference<V> type) {
        try {
            return mapper.readValue(json, type);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", json, type, e);
            return null;
        }
    }

    public static <V> String to(List<V> list) {
        try {
            return mapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            log.error("jackson to error, obj: {}", list, e);
            return null;
        }
    }

    public static <V> String to(V v) {
        try {
            return mapper.writeValueAsString(v);
        } catch (JsonProcessingException e) {
            log.error("jackson to error, obj: {}", v, e);
            return null;
        }
    }

    public static <V> void toFile(String path, List<V> list) {
        try (Writer writer = new FileWriter(new File(path), true)) {
            mapper.writer().writeValues(writer).writeAll(list);
            writer.flush();
        } catch (Exception e) {
            log.error("jackson to file error, path: {}, list: {}", path, list, e);
        }
    }

    public static <V> void toFile(String path, V v) {
        try (Writer writer = new FileWriter(new File(path), true)) {
            mapper.writer().writeValues(writer).write(v);
            writer.flush();
        } catch (Exception e) {
            log.error("jackson to file error, path: {}, obj: {}", path, v, e);
        }
    }

    public static String getString(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).asText();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get string error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static Integer getInt(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).intValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get int error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static Long getLong(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).longValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get long error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static Double getDouble(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).doubleValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get double error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static BigInteger getBigInteger(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return new BigInteger(String.valueOf(0.00));
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).bigIntegerValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get biginteger error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static BigDecimal getBigDecimal(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).decimalValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get bigdecimal error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static boolean getBoolean(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return false;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).booleanValue();
            } else {
                return false;
            }
        } catch (IOException e) {
            log.error("jackson get boolean error, json: {}, key: {}", json, key, e);
            return false;
        }
    }

    public static byte[] getByte(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).binaryValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get byte error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static <T> ArrayList<T> getList(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        String string = getString(json, key);
        return from(string, new TypeReference<ArrayList<T>>() {});
    }

    public static <T> String add(String json, String key, T value) {
        try {
            JsonNode node = mapper.readTree(json);
            add(node, key, value);
            return node.toString();
        } catch (IOException e) {
            log.error("jackson add error, json: {}, key: {}, value: {}", json, key, value, e);
            return json;
        }
    }

    private static <T> void add(JsonNode jsonNode, String key, T value) {
        if (value instanceof String) {
            ((ObjectNode) jsonNode).put(key, (String) value);
        } else if (value instanceof Short) {
            ((ObjectNode) jsonNode).put(key, (Short) value);
        } else if (value instanceof Integer) {
            ((ObjectNode) jsonNode).put(key, (Integer) value);
        } else if (value instanceof Long) {
            ((ObjectNode) jsonNode).put(key, (Long) value);
        } else if (value instanceof Float) {
            ((ObjectNode) jsonNode).put(key, (Float) value);
        } else if (value instanceof Double) {
            ((ObjectNode) jsonNode).put(key, (Double) value);
        } else if (value instanceof BigDecimal) {
            ((ObjectNode) jsonNode).put(key, (BigDecimal) value);
        } else if (value instanceof BigInteger) {
            ((ObjectNode) jsonNode).put(key, (BigInteger) value);
        } else if (value instanceof Boolean) {
            ((ObjectNode) jsonNode).put(key, (Boolean) value);
        } else if (value instanceof byte[]) {
            ((ObjectNode) jsonNode).put(key, (byte[]) value);
        } else {
            ((ObjectNode) jsonNode).put(key, to(value));
        }
    }

    public static String remove(String json, String key) {
        try {
            JsonNode node = mapper.readTree(json);
            ((ObjectNode) node).remove(key);
            return node.toString();
        } catch (IOException e) {
            log.error("jackson remove error, json: {}, key: {}", json, key, e);
            return json;
        }
    }

    public static <T> String update(String json, String key, T value) {
        try {
            JsonNode node = mapper.readTree(json);
            ((ObjectNode) node).remove(key);
            add(node, key, value);
            return node.toString();
        } catch (IOException e) {
            log.error("jackson update error, json: {}, key: {}, value: {}", json, key, value, e);
            return json;
        }
    }

    public static String format(String json) {
        try {
            JsonNode node = mapper.readTree(json);
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);
        } catch (IOException e) {
            log.error("jackson format json error, json: {}", json, e);
            return json;
        }
    }

    public static boolean isJson(String json) {
        try {
            mapper.readTree(json);
            return true;
        } catch (Exception e) {
            log.error("jackson check json error, json: {}", json, e);
            return false;
        }
    }

    private static InputStream getResourceStream(String name) {
        return JsonUtil.class.getClassLoader().getResourceAsStream(name);
    }

    private static InputStreamReader getResourceReader(InputStream inputStream) {
        if (null == inputStream) {
            return null;
        }
        return new InputStreamReader(inputStream, StandardCharsets.UTF_8);
    }
}
```





### 废弃 `OrderServiceImpl` 类

之前的业务实现类 `OrderServiceImpl` 废弃，后面用一个新的类 `TxOrderService` 来代替。

`OrderServiceImpl.java` 直接删除即可。





### `TxOrderService` 发送事务消息

`TxAccountMessage` 封装发送给账户服务的数据：用户id和扣减金额。另外还封装了事务id。

```java
package cn.tedu.order.tx;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TxAccountMessage {
    Long userId;
    BigDecimal money;
    String xid;
}
```




在业务方法 `create()` 中不直接保存订单，而是发送事务消息。

消息发出后，会触发 `TxListener` 执行本地事务，它执行时会回调这里的 `doCreate()` 方法完成订单的保存。

```java
package cn.tedu.order.tx;

import cn.tedu.order.entity.Order;
import cn.tedu.order.feign.EasyIdGeneratorClient;
import cn.tedu.order.mapper.OrderMapper;
import cn.tedu.order.mapper.TxMapper;
import cn.tedu.order.service.OrderService;
import cn.tedu.order.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Primary
@Service
public class TxOrderService implements OrderService {
    @Autowired
    private RocketMQTemplate rocketMQTemplate;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private TxMapper txMapper;
    @Autowired
    EasyIdGeneratorClient easyIdGeneratorClient;

    /*
    创建订单的业务方法
    这里修改为：只向 Rocketmq 发送事务消息。
     */
    @Override
    public void create(Order order) {
        // 产生事务ID
        String xid = UUID.randomUUID().toString().replace("-", "");

        //对事务相关数据进行封装，并转成 json 字符串
        TxAccountMessage sMsg = new TxAccountMessage(order.getUserId(), order.getMoney(), xid);
        String json = JsonUtil.to(sMsg);

        //json字符串封装到 Spring Message 对象
        Message<String> msg = MessageBuilder.withPayload(json).build();

        //发送事务消息
        rocketMQTemplate.sendMessageInTransaction("order-topic:account", msg, order);
        log.info("事务消息已发送");
    }

    //本地事务，执行订单保存
    //这个方法在事务监听器中调用
    @Transactional
    public void doCreate(Order order, String xid) {
        log.info("执行本地事务，保存订单");

        // 从全局唯一id发号器获得id
        Long orderId = easyIdGeneratorClient.nextId("order_business");
        order.setId(orderId);

        orderMapper.create(order);

        log.info("订单已保存！ 事务日志已保存");
    }
}

```





### `TxListener` 事务监听器

发送事务消息后会触发事务监听器执行。

事务监听器有两个方法：

- `executeLocalTransaction()`： 执行本地事务
- `checkLocalTransaction()`： 负责响应Rocketmq服务器的事务回查操作





`TxListener` 监听器类：

```java
package cn.tedu.order.tx;

import cn.tedu.order.entity.Order;
import cn.tedu.order.mapper.TxMapper;
import cn.tedu.order.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.annotation.RocketMQTransactionListener;
import org.apache.rocketmq.spring.core.RocketMQLocalTransactionListener;
import org.apache.rocketmq.spring.core.RocketMQLocalTransactionState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RocketMQTransactionListener
public class TxListener implements RocketMQLocalTransactionListener {
    @Autowired
    private TxOrderService orderService;
    @Autowired
    private TxMapper txMapper;

    @Override
    public RocketMQLocalTransactionState executeLocalTransaction(Message message, Object o) {
        log.info("事务监听 - 开始执行本地事务");

        // 监听器中得到的 message payload 是 byte[]
        String json = new String((byte[]) message.getPayload());
        String xid = JsonUtil.getString(json, "xid");

        log.info("事务监听 - "+json);
        log.info("事务监听 - xid: "+xid);

        RocketMQLocalTransactionState state;
        int status = 0;
        Order order = (Order) o;

        try {
            orderService.doCreate(order, xid);

            log.info("本地事务执行成功，提交消息");
            state = RocketMQLocalTransactionState.COMMIT;
            status = 0;
        } catch (Exception e) {
            e.printStackTrace();
            log.info("本地事务执行失败，回滚消息");
            state = RocketMQLocalTransactionState.ROLLBACK;
            status = 1;
        }

        TxInfo txInfo = new TxInfo(xid, System.currentTimeMillis(), status);
        txMapper.insert(txInfo);

        return state;
    }

    @Override
    public RocketMQLocalTransactionState checkLocalTransaction(Message message) {
        log.info("事务监听 - 回查事务状态");

        // 监听器中得到的 message payload 是 byte[]
        String json = new String((byte[]) message.getPayload());
        String xid = JsonUtil.getString(json, "xid");

        TxInfo txInfo = txMapper.selectById(xid);
        if (txInfo == null) {
            log.info("事务监听 - 回查事务状态 - 事务不存在："+xid);
            return RocketMQLocalTransactionState.UNKNOWN;
        }

        log.info("事务监听 - 回查事务状态 - "+ txInfo.getStatus());

        switch (txInfo.getStatus()) {
            case 0: return RocketMQLocalTransactionState.COMMIT;
            case 1: return RocketMQLocalTransactionState.ROLLBACK;
            default: return RocketMQLocalTransactionState.UNKNOWN;
        }
    }
}
```





### 启动订单项目进行测试

按顺序启动项目：

1. Eureka
2. Easy Id Generator
3. Order

调用保存订单，地址：
http://localhost:8083/create?userId=1&productId=1&count=10&money=100

观察控制台日志：

![a](https://img-blog.csdnimg.cn/20200811200520946.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

订单表：

![a](https://img-blog.csdnimg.cn/20200811201723411.png#pic_center)

事务表：

![a](https://img-blog.csdnimg.cn/20200811201748757.png#pic_center)

访问 Rocketmq，查看事务消息：

![a](https://img-blog.csdnimg.cn/20200811202156699.png#pic_center)





## account 接收事务消息，并执行本地事务





### `application.yml` 添加 Rocketmq 连接配置

```yml
rocketmq:
  name-server: 192.168.64.151:9876;192.168.64.152:9876
```





### `JsonUtil` 工具类

```java
package cn.tedu.account.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class JsonUtil {
    private static ObjectMapper mapper;
    private static JsonInclude.Include DEFAULT_PROPERTY_INCLUSION = JsonInclude.Include.NON_DEFAULT;
    private static boolean IS_ENABLE_INDENT_OUTPUT = false;
    private static String CSV_DEFAULT_COLUMN_SEPARATOR = ",";
    static {
        try {
            initMapper();
            configPropertyInclusion();
            configIndentOutput();
            configCommon();
        } catch (Exception e) {
            log.error("jackson config error", e);
        }
    }

    private static void initMapper() {
        mapper = new ObjectMapper();
    }

    private static void configCommon() {
        config(mapper);
    }

    private static void configPropertyInclusion() {
        mapper.setSerializationInclusion(DEFAULT_PROPERTY_INCLUSION);
    }

    private static void configIndentOutput() {
        mapper.configure(SerializationFeature.INDENT_OUTPUT, IS_ENABLE_INDENT_OUTPUT);
    }

    private static void config(ObjectMapper objectMapper) {
        objectMapper.enable(JsonGenerator.Feature.WRITE_BIGDECIMAL_AS_PLAIN);
        objectMapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
        objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        objectMapper.enable(DeserializationFeature.FAIL_ON_READING_DUP_TREE_KEY);
        objectMapper.enable(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS);
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        objectMapper.disable(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES);
        objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        objectMapper.enable(JsonParser.Feature.ALLOW_COMMENTS);
        objectMapper.disable(JsonGenerator.Feature.ESCAPE_NON_ASCII);
        objectMapper.enable(JsonGenerator.Feature.IGNORE_UNKNOWN);
        objectMapper.enable(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES);
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        objectMapper.enable(JsonParser.Feature.ALLOW_SINGLE_QUOTES);
        objectMapper.registerModule(new ParameterNamesModule());
        objectMapper.registerModule(new Jdk8Module());
        objectMapper.registerModule(new JavaTimeModule());
    }
    public static void setSerializationInclusion(JsonInclude.Include inclusion) {
        DEFAULT_PROPERTY_INCLUSION = inclusion;
        configPropertyInclusion();
    }

    public static void setIndentOutput(boolean isEnable) {
        IS_ENABLE_INDENT_OUTPUT = isEnable;
        configIndentOutput();
    }

    public static <V> V from(URL url, Class<V> c) {
        try {
            return mapper.readValue(url, c);
        } catch (IOException e) {
            log.error("jackson from error, url: {}, type: {}", url.getPath(), c, e);
            return null;
        }
    }

    public static <V> V from(InputStream inputStream, Class<V> c) {
        try {
            return mapper.readValue(inputStream, c);
        } catch (IOException e) {
            log.error("jackson from error, type: {}", c, e);
            return null;
        }
    }

    public static <V> V from(File file, Class<V> c) {
        try {
            return mapper.readValue(file, c);
        } catch (IOException e) {
            log.error("jackson from error, file path: {}, type: {}", file.getPath(), c, e);
            return null;
        }
    }

    public static <V> V from(Object jsonObj, Class<V> c) {
        try {
            return mapper.readValue(jsonObj.toString(), c);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", jsonObj.toString(), c, e);
            return null;
        }
    }

    public static <V> V from(String json, Class<V> c) {
        try {
            return mapper.readValue(json, c);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", json, c, e);
            return null;
        }
    }

    public static <V> V from(URL url, TypeReference<V> type) {
        try {
            return mapper.readValue(url, type);
        } catch (IOException e) {
            log.error("jackson from error, url: {}, type: {}", url.getPath(), type, e);
            return null;
        }
    }

    public static <V> V from(InputStream inputStream, TypeReference<V> type) {
        try {
            return mapper.readValue(inputStream, type);
        } catch (IOException e) {
            log.error("jackson from error, type: {}", type, e);
            return null;
        }
    }

    public static <V> V from(File file, TypeReference<V> type) {
        try {
            return mapper.readValue(file, type);
        } catch (IOException e) {
            log.error("jackson from error, file path: {}, type: {}", file.getPath(), type, e);
            return null;
        }
    }

    public static <V> V from(Object jsonObj, TypeReference<V> type) {
        try {
            return mapper.readValue(jsonObj.toString(), type);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", jsonObj.toString(), type, e);
            return null;
        }
    }

    public static <V> V from(String json, TypeReference<V> type) {
        try {
            return mapper.readValue(json, type);
        } catch (IOException e) {
            log.error("jackson from error, json: {}, type: {}", json, type, e);
            return null;
        }
    }

    public static <V> String to(List<V> list) {
        try {
            return mapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            log.error("jackson to error, obj: {}", list, e);
            return null;
        }
    }

    public static <V> String to(V v) {
        try {
            return mapper.writeValueAsString(v);
        } catch (JsonProcessingException e) {
            log.error("jackson to error, obj: {}", v, e);
            return null;
        }
    }

    public static <V> void toFile(String path, List<V> list) {
        try (Writer writer = new FileWriter(new File(path), true)) {
            mapper.writer().writeValues(writer).writeAll(list);
            writer.flush();
        } catch (Exception e) {
            log.error("jackson to file error, path: {}, list: {}", path, list, e);
        }
    }

    public static <V> void toFile(String path, V v) {
        try (Writer writer = new FileWriter(new File(path), true)) {
            mapper.writer().writeValues(writer).write(v);
            writer.flush();
        } catch (Exception e) {
            log.error("jackson to file error, path: {}, obj: {}", path, v, e);
        }
    }

    public static String getString(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).asText();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get string error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static Integer getInt(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).intValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get int error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static Long getLong(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).longValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get long error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static Double getDouble(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).doubleValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get double error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static BigInteger getBigInteger(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return new BigInteger(String.valueOf(0.00));
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).bigIntegerValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get biginteger error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static BigDecimal getBigDecimal(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).decimalValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get bigdecimal error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static boolean getBoolean(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return false;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).booleanValue();
            } else {
                return false;
            }
        } catch (IOException e) {
            log.error("jackson get boolean error, json: {}, key: {}", json, key, e);
            return false;
        }
    }

    public static byte[] getByte(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            JsonNode node = mapper.readTree(json);
            if (null != node) {
                return node.get(key).binaryValue();
            } else {
                return null;
            }
        } catch (IOException e) {
            log.error("jackson get byte error, json: {}, key: {}", json, key, e);
            return null;
        }
    }

    public static <T> ArrayList<T> getList(String json, String key) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        String string = getString(json, key);
        return from(string, new TypeReference<ArrayList<T>>() {});
    }

    public static <T> String add(String json, String key, T value) {
        try {
            JsonNode node = mapper.readTree(json);
            add(node, key, value);
            return node.toString();
        } catch (IOException e) {
            log.error("jackson add error, json: {}, key: {}, value: {}", json, key, value, e);
            return json;
        }
    }

    private static <T> void add(JsonNode jsonNode, String key, T value) {
        if (value instanceof String) {
            ((ObjectNode) jsonNode).put(key, (String) value);
        } else if (value instanceof Short) {
            ((ObjectNode) jsonNode).put(key, (Short) value);
        } else if (value instanceof Integer) {
            ((ObjectNode) jsonNode).put(key, (Integer) value);
        } else if (value instanceof Long) {
            ((ObjectNode) jsonNode).put(key, (Long) value);
        } else if (value instanceof Float) {
            ((ObjectNode) jsonNode).put(key, (Float) value);
        } else if (value instanceof Double) {
            ((ObjectNode) jsonNode).put(key, (Double) value);
        } else if (value instanceof BigDecimal) {
            ((ObjectNode) jsonNode).put(key, (BigDecimal) value);
        } else if (value instanceof BigInteger) {
            ((ObjectNode) jsonNode).put(key, (BigInteger) value);
        } else if (value instanceof Boolean) {
            ((ObjectNode) jsonNode).put(key, (Boolean) value);
        } else if (value instanceof byte[]) {
            ((ObjectNode) jsonNode).put(key, (byte[]) value);
        } else {
            ((ObjectNode) jsonNode).put(key, to(value));
        }
    }

    public static String remove(String json, String key) {
        try {
            JsonNode node = mapper.readTree(json);
            ((ObjectNode) node).remove(key);
            return node.toString();
        } catch (IOException e) {
            log.error("jackson remove error, json: {}, key: {}", json, key, e);
            return json;
        }
    }

    public static <T> String update(String json, String key, T value) {
        try {
            JsonNode node = mapper.readTree(json);
            ((ObjectNode) node).remove(key);
            add(node, key, value);
            return node.toString();
        } catch (IOException e) {
            log.error("jackson update error, json: {}, key: {}, value: {}", json, key, value, e);
            return json;
        }
    }

    public static String format(String json) {
        try {
            JsonNode node = mapper.readTree(json);
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);
        } catch (IOException e) {
            log.error("jackson format json error, json: {}", json, e);
            return json;
        }
    }

    public static boolean isJson(String json) {
        try {
            mapper.readTree(json);
            return true;
        } catch (Exception e) {
            log.error("jackson check json error, json: {}", json, e);
            return false;
        }
    }

    private static InputStream getResourceStream(String name) {
        return JsonUtil.class.getClassLoader().getResourceAsStream(name);
    }

    private static InputStreamReader getResourceReader(InputStream inputStream) {
        if (null == inputStream) {
            return null;
        }
        return new InputStreamReader(inputStream, StandardCharsets.UTF_8);
    }
}

```





### `TxConsumer` 接收事务消息，调用账户业务方法

接收的消息转换成 `TxAccountMessage` 对象，这里先创建这个类：

```java
package cn.tedu.account.tx;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TxAccountMessage {
    Long userId;
    BigDecimal money;
    String xid;
}
```

`TxConsumer`听，收到消息后完成扣减金额业务：

```java
package cn.tedu.account.tx;

import cn.tedu.account.service.AccountService;
import cn.tedu.account.util.JsonUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RocketMQMessageListener(consumerGroup = "account-consumer-group", topic = "order-topic", selectorExpression = "account")
public class TxConsumer implements RocketMQListener<String> {
    @Autowired
    private AccountService accountService;

    @Override
    public void onMessage(String msg) {
        TxAccountMessage txAccountMessage = JsonUtil.from(msg, new TypeReference<TxAccountMessage>() {});
        log.info("收到消息： "+txAccountMessage);

        accountService.decrease(txAccountMessage.getUserId(), txAccountMessage.getMoney());
    }
}

```





### `AccountServiceImpl` 添加事务注解

```java
package cn.tedu.account.service;

import cn.tedu.account.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountMapper accountMapper;

    @Transactional
    @Override
    public void decrease(Long userId, BigDecimal money) {
        accountMapper.decrease(userId,money);
    }
}
```





### 启动 account 项目进行测试

按顺序启动项目：

1. Eureka
2. Easy Id Generator
3. Account
4. Order

account 项目启动时，会立即从 Rocketmq 收到消息，执行账户扣减业务：

![a](https://img-blog.csdnimg.cn/20200811220623719.png#pic_center)





## order 本地事务失败测试

修改 `TxOrderService` 添加模拟异常：

```java
package cn.tedu.order.tx;

import cn.tedu.order.entity.Order;
import cn.tedu.order.feign.EasyIdGeneratorClient;
import cn.tedu.order.mapper.OrderMapper;
import cn.tedu.order.mapper.TxMapper;
import cn.tedu.order.service.OrderService;
import cn.tedu.order.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Primary
@Service
public class TxOrderService implements OrderService {
    @Autowired
    private RocketMQTemplate rocketMQTemplate;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private TxMapper txMapper;
    @Autowired
    EasyIdGeneratorClient easyIdGeneratorClient;

    /*
    创建订单的业务方法
    这里修改为：只向 Rocketmq 发送事务消息。
     */
    @Override
    public void create(Order order) {
        // 产生事务ID
        String xid = UUID.randomUUID().toString().replace("-", "");

        //对事务相关数据进行封装，并转成 json 字符串
        TxAccountMessage sMsg = new TxAccountMessage(order.getUserId(), order.getMoney(), xid);
        String json = JsonUtil.to(sMsg);

        //json字符串封装到 Spring Message 对象
        Message<String> msg = MessageBuilder.withPayload(json).build();

        //发送事务消息
        log.info("开始发送事务消息");
        rocketMQTemplate.sendMessageInTransaction("order-topic:account", msg, order);
        log.info("事务消息已发送");
    }

    //本地事务，执行订单保存
    //这个方法在事务监听器中调用
    @Transactional
    public void doCreate(Order order, String xid) {
        log.info("执行本地事务，保存订单");

        // 从全局唯一id发号器获得id
        Long orderId = easyIdGeneratorClient.nextId("order_business");
        order.setId(orderId);

        orderMapper.create(order);

        if (Math.random() < 0.5) {
            throw new RuntimeException("模拟异常");
        }

        log.info("订单已保存！ 事务日志已保存");
    }
}

```

调用保存订单，地址：
http://localhost:8083/create?userId=1&productId=1&count=10&money=100

本地事务失败后，会通知 Rocketmq 回滚事务：

![a](https://img-blog.csdnimg.cn/20200812001403138.png#pic_center)

*测试完后，将模拟异常代码注释掉*





## account 本地事务失败测试

修改 `AccountServiceImpl`，添加随机模拟异常：

```java
package cn.tedu.account.service;

import cn.tedu.account.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountMapper accountMapper;

    @Transactional
    @Override
    public void decrease(Long userId, BigDecimal money) {
        accountMapper.decrease(userId,money);

        if (Math.random() < 0.5) {
            throw new RuntimeException("模拟异常");
        }
    }
}
```

调用保存订单，地址：
http://localhost:8083/create?userId=1&productId=1&count=10&money=100

account 账户服务接收消息后，如果处理失败，Rocketmq会进行重试，直到处理成功为止。


> [项目源码：](https://gitee.com/benwang6/rocketmq-dtx) 