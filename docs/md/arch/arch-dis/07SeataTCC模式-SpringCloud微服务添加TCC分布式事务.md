# SeataTCC模式-SpringCloud微服务添加TCC分布式事务

[[TOC]]

## 准备订单项目案例





### 新建 seata-tcc 工程

新建 Empty Project：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200726180043453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

工程命名为 `seata-tcc`，存放到 seata-samples 文件夹下，与 `seata-at` 工程存放在一起：

![a](https://img-blog.csdnimg.cn/20200730230210538.png#pic_center)





### 导入订单项目，无事务版本





#### 下载项目代码

1. 访问 git [仓库](https://gitee.com/benwang6/seata-samples) 
2. 访问项目标签
   
   ![a](https://img-blog.csdnimg.cn/20200730232136813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

3. 下载无事务版
   
   ![a](https://img-blog.csdnimg.cn/20200730232347162.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





#### 解压到 seata-tcc 目录

压缩文件中的 7 个项目目录解压缩到 `seata-tcc` 目录：

![a](https://img-blog.csdnimg.cn/20200730233920392.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





#### 导入项目

在 idea 中按两下 `shift` 键，搜索 `add maven projects`，打开 maven 工具：

![a](https://img-blog.csdnimg.cn/20200730234243542.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

然后选择 `seata-tcc` 工程目录下的 7 个项目的 `pom.xml` 导入：

![a](https://img-blog.csdnimg.cn/20200730234535334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## order启动全局事务，添加“保存订单”分支事务

在订单项目中执行添加订单：

![a](https://img-blog.csdnimg.cn/20200731231013821.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




我们要添加以下 TCC 事务操作的代码：

- `T`ry - 第一阶，冻结数据阶段，向订单表直接插入订单，订单状态设置为0（冻结状态）。

![a](https://img-blog.csdnimg.cn/20200731231045351.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





- `C`onfirm - 第二阶段，提交事务，将订单状态修改成1（正常状态）。

![a](https://img-blog.csdnimg.cn/20200731231113754.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





- `C`ancel - 第二阶段，回滚事务，删除订单。

![a](https://img-blog.csdnimg.cn/20200731231211600.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### order-parent 添加 seata 依赖

打开 order-parent 中注释掉的 seata 依赖：

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


		<!-- 打开 seata 依赖 -->
        <dependency>
          <groupId>com.alibaba.cloud</groupId>
          <artifactId>spring-cloud-alibaba-seata</artifactId>
          <version>${spring-cloud-alibaba-seata.version}</version>
          <exclusions>
            <exclusion>
              <artifactId>seata-all</artifactId>
              <groupId>io.seata</groupId>
            </exclusion>
          </exclusions>
        </dependency>
        <dependency>
          <groupId>io.seata</groupId>
          <artifactId>seata-all</artifactId>
          <version>${seata.version}</version>
        </dependency>


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





### 配置





#### application.yml

设置全局事务组的组名：

```yml
spring:
  application:
    name: order

  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost/seata_order?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8
    username: root
    password: root

  # 事务组设置
  cloud:
    alibaba:
      seata:
        tx-service-group: order_tx_group

......

```





#### registry.conf 和 file.conf

与 AT 事务中的配置完全相同：

`registry.conf`：

```shell
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "eureka"

  nacos {
    serverAddr = "localhost"
    namespace = ""
    cluster = "default"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    # application = "default"
    # weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = "0"
    password = ""
    cluster = "default"
    timeout = "0"
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
    username = ""
    password = ""
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
  }
  etcd3 {
    cluster = "default"
    serverAddr = "http://localhost:2379"
  }
  sofa {
    serverAddr = "127.0.0.1:9603"
    application = "default"
    region = "DEFAULT_ZONE"
    datacenter = "DefaultDataCenter"
    cluster = "default"
    group = "SEATA_GROUP"
    addressWaitTime = "3000"
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3、springCloudConfig
  type = "file"

  nacos {
    serverAddr = "localhost"
    namespace = ""
    group = "SEATA_GROUP"
  }
  consul {
    serverAddr = "127.0.0.1:8500"
  }
  apollo {
    app.id = "seata-server"
    apollo.meta = "http://192.168.1.204:8801"
    namespace = "application"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
    username = ""
    password = ""
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}

```

`file.conf`：

```shell
transport {
  # tcp udt unix-domain-socket
  type = "TCP"
  #NIO NATIVE
  server = "NIO"
  #enable heartbeat
  heartbeat = true
  # the client batch send request enable
  enableClientBatchSendRequest = true
  #thread factory for netty
  threadFactory {
    bossThreadPrefix = "NettyBoss"
    workerThreadPrefix = "NettyServerNIOWorker"
    serverExecutorThread-prefix = "NettyServerBizHandler"
    shareBossWorker = false
    clientSelectorThreadPrefix = "NettyClientSelector"
    clientSelectorThreadSize = 1
    clientWorkerThreadPrefix = "NettyClientWorkerThread"
    # netty boss thread size,will not be used for UDT
    bossThreadSize = 1
    #auto default pin or 8
    workerThreadSize = "default"
  }
  shutdown {
    # when destroy server, wait seconds
    wait = 3
  }
  serialization = "seata"
  compressor = "none"
}
service {
  #transaction service group mapping
  # order_tx_group 与 yml 中的 “tx-service-group: order_tx_group” 配置一致
  # “seata-server” 与 TC 服务器的注册名一致
  # 从eureka获取seata-server的地址，再向seata-server注册自己，设置group
  vgroupMapping.order_tx_group = "seata-server"
  #only support when registry.type=file, please don't set multiple addresses
  order_tx_group.grouplist = "127.0.0.1:8091"
  #degrade, current not support
  enableDegrade = false
  #disable seata
  disableGlobalTransaction = false
}

client {
  rm {
    asyncCommitBufferLimit = 10000
    lock {
      retryInterval = 10
      retryTimes = 30
      retryPolicyBranchRollbackOnConflict = true
    }
    reportRetryCount = 5
    tableMetaCheckEnable = false
    reportSuccessEnable = false
  }
  tm {
    commitRetryCount = 5
    rollbackRetryCount = 5
  }
  undo {
    dataValidation = true
    logSerialization = "jackson"
    logTable = "undo_log"
  }
  log {
    exceptionRate = 100
  }
}

```





### OrderMapper 添加更新订单状态、删除订单

根据前面的分析，订单数据操作有以下三项：

- 插入订单
- 修改订单状态
- 删除订单

在 OrderMapper 中已经有插入订单的方法了，现在需要添加修改订单和删除订单的方法（删除方法从BaseMapper继承）：

```java
package cn.tedu.order.mapper;

import cn.tedu.order.entity.Order;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;


public interface OrderMapper extends BaseMapper {
    void create(Order order);
    void updateStatus(@Param("orderId") Long orderId, @Param("status") Integer status);
}

```

那么对应的 `OrderMapper.xml` 中也要添加 sql：

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
        VALUES(#{id}, #{userId}, #{productId}, #{count}, #{money}, ${status});
    </insert>
    <update id="updateStatus" >
        UPDATE `order` SET `status`=#{status} WHERE `id`=#{orderId};
    </update>
    <delete id="deleteById">
        DELETE FROM `order` WHERE `id`=#{orderId}
    </delete>
</mapper>

```





### Seata 实现订单的 TCC 操作方法

- 第一阶段 Try
- 第二阶段
  - Confirm
  - Cancel

第二阶段为了处理幂等性问题这里首先添加一个工具类 `ResultHolder`。

这个工具也可以在第二阶段 Confirm 或 Cancel 阶段对第一阶段的成功与否进行判断，在第一阶段成功时需要保存一个标识。

`ResultHolder`可以为每一个全局事务保存一个标识：

```java
package cn.tedu.order.tcc;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ResultHolder {
    private static Map<Class<?>, Map<String, String>> map = new ConcurrentHashMap<Class<?>, Map<String, String>>();

    public static void setResult(Class<?> actionClass, String xid, String v) {
        Map<String, String> results = map.get(actionClass);

        if (results == null) {
            synchronized (map) {
                if (results == null) {
                    results = new ConcurrentHashMap<>();
                    map.put(actionClass, results);
                }
            }
        }

        results.put(xid, v);
    }

    public static String getResult(Class<?> actionClass, String xid) {
        Map<String, String> results = map.get(actionClass);
        if (results != null) {
            return results.get(xid);
        }

        return null;
    }

    public static void removeResult(Class<?> actionClass, String xid) {
        Map<String, String> results = map.get(actionClass);
        if (results != null) {
            results.remove(xid);
        }
    }
}


```

Seata 实现 TCC 操作需要定义一个接口，我们在接口中添加以下方法：

- Try - `prepareCreateOrder()`
- Confirm - `commit()`
- Cancel - `rollback()`

```java
package cn.tedu.order.tcc;

import io.seata.rm.tcc.api.BusinessActionContext;
import io.seata.rm.tcc.api.BusinessActionContextParameter;
import io.seata.rm.tcc.api.LocalTCC;
import io.seata.rm.tcc.api.TwoPhaseBusinessAction;

import java.math.BigDecimal;

@LocalTCC
public interface OrderTccAction {

    /*
    第一阶段的方法
    通过注解指定第二阶段的两个方法名
    
    BusinessActionContext 上下文对象，用来在两个阶段之间传递数据
    @BusinessActionContextParameter 注解的参数数据会被存入 BusinessActionContext
     */
    @TwoPhaseBusinessAction(name = "orderTccAction", commitMethod = "commit", rollbackMethod = "rollback")
    boolean prepareCreateOrder(BusinessActionContext businessActionContext,
                      @BusinessActionContextParameter(paramName = "orderId") Long orderId,
                      @BusinessActionContextParameter(paramName = "userId") Long userId,
                      @BusinessActionContextParameter(paramName = "productId") Long productId,
                      @BusinessActionContextParameter(paramName = "count") Integer count,
                      @BusinessActionContextParameter(paramName = "money") BigDecimal money);

    // 第二阶段 - 提交
    boolean commit(BusinessActionContext businessActionContext);

    // 第二阶段 - 回滚
    boolean rollback(BusinessActionContext businessActionContext);

}

```

实现类：

```java
package cn.tedu.order.tcc;

import cn.tedu.order.entity.Order;
import cn.tedu.order.mapper.OrderMapper;
import io.seata.rm.tcc.api.BusinessActionContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Component
@Slf4j
public class OrderTccActionImpl implements OrderTccAction {
    @Autowired
    private OrderMapper orderMapper;

    @Transactional
    @Override
    public boolean prepareCreateOrder(BusinessActionContext businessActionContext, Long orderId, Long userId, Long productId, Integer count, BigDecimal money) {
        log.info("创建 order 第一阶段，预留资源 - "+businessActionContext.getXid());

        Order order = new Order(orderId, userId, productId, count, money, 0);
        orderMapper.create(order);

        //事务成功，保存一个标识，供第二阶段进行判断
        ResultHolder.setResult(getClass(), businessActionContext.getXid(), "p");
        return true;
    }

    @Transactional
    @Override
    public boolean commit(BusinessActionContext businessActionContext) {
        log.info("创建 order 第二阶段提交，修改订单状态1 - "+businessActionContext.getXid());

        // 防止幂等性，如果commit阶段重复执行则直接返回
        if (ResultHolder.getResult(getClass(), businessActionContext.getXid()) == null) {
            return true;
        }

        //Long orderId = (Long) businessActionContext.getActionContext("orderId");
        long orderId = Long.parseLong(businessActionContext.getActionContext("orderId").toString());
        orderMapper.updateStatus(orderId, 1);

        //提交成功是删除标识
        ResultHolder.removeResult(getClass(), businessActionContext.getXid());
        return true;
    }

    @Transactional
    @Override
    public boolean rollback(BusinessActionContext businessActionContext) {
        log.info("创建 order 第二阶段回滚，删除订单 - "+businessActionContext.getXid());

        //第一阶段没有完成的情况下，不必执行回滚
        //因为第一阶段有本地事务，事务失败时已经进行了回滚。
        //如果这里第一阶段成功，而其他全局事务参与者失败，这里会执行回滚
        //幂等性控制：如果重复执行回滚则直接返回
        if (ResultHolder.getResult(getClass(), businessActionContext.getXid()) == null) {
            return true;
        }

        //Long orderId = (Long) businessActionContext.getActionContext("orderId");
        long orderId = Long.parseLong(businessActionContext.getActionContext("orderId").toString());
        orderMapper.deleteById(orderId);

        //回滚结束时，删除标识
        ResultHolder.removeResult(getClass(), businessActionContext.getXid());
        return true;
    }
}

```





### 在业务代码中调用 Try 阶段方法

业务代码中不再直接保存订单数据，而是调用 TCC 第一阶段方法`prepareCreateOrder()`，并添加全局事务注解 `@GlobalTransactional`：

```java
package cn.tedu.order.service;

import cn.tedu.order.entity.Order;
import cn.tedu.order.feign.AccountClient;
import cn.tedu.order.feign.EasyIdGeneratorClient;
import cn.tedu.order.feign.StorageClient;
import cn.tedu.order.mapper.OrderMapper;
import cn.tedu.order.tcc.OrderTccAction;
import io.seata.spring.annotation.GlobalTransactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OrderServiceImpl implements OrderService {
    // @Autowired
    // private OrderMapper orderMapper;
    @Autowired
    EasyIdGeneratorClient easyIdGeneratorClient;
    @Autowired
    private AccountClient accountClient;
    @Autowired
    private StorageClient storageClient;

    @Autowired
    private OrderTccAction orderTccAction;

    @GlobalTransactional
    @Override
    public void create(Order order) {
        // 从全局唯一id发号器获得id
        Long orderId = easyIdGeneratorClient.nextId("order_business");
        order.setId(orderId);

        // orderMapper.create(order);

        // 这里修改成调用 TCC 第一节端方法
        orderTccAction.prepareCreateOrder(
                null,
                order.getId(),
                order.getUserId(),
                order.getProductId(),
                order.getCount(),
                order.getMoney());

        // 修改库存
        //storageClient.decrease(order.getProductId(), order.getCount());

        // 修改账户余额
        //accountClient.decrease(order.getUserId(), order.getMoney());

    }
}

```





### 启动 order 进行测试

按顺序启动服务：

1. Eureka
2. Seata Server
3. Easy Id Generator
4. Order

调用保存订单，地址：
http://localhost:8083/create?userId=1&productId=1&count=10&money=100

观察控制台日志：

![a](https://img-blog.csdnimg.cn/20200801234618699.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

查看数据库表中的订单数据：

![a](https://img-blog.csdnimg.cn/20200801234850717.png#pic_center)





## storage添加“减少库存”分支事务

在库存项目中执行减少库存：

![a](https://img-blog.csdnimg.cn/20200802160350409.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




我们要添加以下 TCC 事务操作的代码：

- `T`ry - 第一阶，冻结数据阶段，将要减少的库存量先冻结：

![a](https://img-blog.csdnimg.cn/20200802160458423.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





- `C`onfirm - 第二阶段，提交事务，使用冻结的库存完成业务数据处理：

![a](https://img-blog.csdnimg.cn/20200802160615409.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





- `C`ancel - 第二阶段，回滚事务，冻结的库存解冻，恢复以前的库存量：

![a](https://img-blog.csdnimg.cn/20200802160710321.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 配置

有三个文件需要配置：

- application.yml
- registry.conf
- file.conf

这三个文件的设置与上面 order 项目的配置完全相同，请参考上面订单配置一章进行配置。





### StorageMapper 添加冻结库存相关方法

根据前面的分析，库存数据操作有以下三项：

- 冻结库存
- 冻结库存量修改为已售出量
- 解冻库存

在 StorageMapper 中添加三个方法：

```java
package cn.tedu.storage.mapper;

import cn.tedu.storage.entity.Storage;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

public interface StorageMapper extends BaseMapper<Storage> {
    void decrease(Long productId, Integer count);
	// 冻结库存
    void updateFrozen(@Param("productId") Long productId, @Param("residue") Integer residue, @Param("frozen") Integer frozen);
	// 提交时，把冻结量修改到已售出
    void updateFrozenToUsed(@Param("productId") Long productId, @Param("count") Integer count);
	// 回滚时，把冻结量修改到可用库存
    void updateFrozenToResidue(@Param("productId") Long productId, @Param("count") Integer count);
}

```

那么对应的 `StorageMapper.xml` 中也要添加 sql：

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
    <select id="selectById" resultMap="BaseResultMap">
        SELECT * FROM storage WHERE `product_id`=#{productId}
    </select>

    <update id="updateFrozen">
        UPDATE storage SET `residue`=#{residue},`frozen`=#{frozen} WHERE `product_id`=#{productId}
    </update>

    <update id="updateFrozenToUsed">
        UPDATE storage SET `frozen`=`frozen`-#{count}, `used`=`used`+#{count} WHERE `product_id`=#{productId}
    </update>

    <update id="updateFrozenToResidue">
        UPDATE storage SET `frozen`=`frozen`-#{count}, `residue`=`residue`+#{count} WHERE `product_id`=#{productId}
    </update>
</mapper>

```





### Seata 实现库存的 TCC 操作方法

工具类 `ResultHolder`：

```java
package cn.tedu.storage.tcc;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ResultHolder {
    private static Map<Class<?>, Map<String, String>> map = new ConcurrentHashMap<Class<?>, Map<String, String>>();

    public static void setResult(Class<?> actionClass, String xid, String v) {
        Map<String, String> results = map.get(actionClass);

        if (results == null) {
            synchronized (map) {
                if (results == null) {
                    results = new ConcurrentHashMap<>();
                    map.put(actionClass, results);
                }
            }
        }

        results.put(xid, v);
    }

    public static String getResult(Class<?> actionClass, String xid) {
        Map<String, String> results = map.get(actionClass);
        if (results != null) {
            return results.get(xid);
        }

        return null;
    }

    public static void removeResult(Class<?> actionClass, String xid) {
        Map<String, String> results = map.get(actionClass);
        if (results != null) {
            results.remove(xid);
        }
    }
}

```

添加 TCC 接口，在接口中添加以下方法：

- Try - `prepareDecreaseStorage()`
- Confirm - `commit()`
- Cancel - `rollback()`

```java
package cn.tedu.storage.tcc;

import io.seata.rm.tcc.api.BusinessActionContext;
import io.seata.rm.tcc.api.BusinessActionContextParameter;
import io.seata.rm.tcc.api.LocalTCC;
import io.seata.rm.tcc.api.TwoPhaseBusinessAction;

@LocalTCC
public interface StorageTccAction {

    @TwoPhaseBusinessAction(name = "storageTccAction", commitMethod = "commit", rollbackMethod = "rollback")
    boolean prepareDecreaseStorage(BusinessActionContext businessActionContext,
                                   @BusinessActionContextParameter(paramName = "productId") Long productId,
                                   @BusinessActionContextParameter(paramName = "count") Integer count);

    boolean commit(BusinessActionContext businessActionContext);

    boolean rollback(BusinessActionContext businessActionContext);

}

```

实现类：

```java
package cn.tedu.storage.tcc;

import cn.tedu.storage.entity.Storage;
import cn.tedu.storage.mapper.StorageMapper;
import io.seata.rm.tcc.api.BusinessActionContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
public class StorageTccActionImpl implements StorageTccAction {

    @Autowired
    private StorageMapper storageMapper;

    @Transactional
    @Override
    public boolean prepareDecreaseStorage(BusinessActionContext businessActionContext, Long productId, Integer count) {
        log.info("减少商品库存，第一阶段，锁定减少的库存量，productId="+productId+"， count="+count);

        Storage storage = storageMapper.selectById(productId);
        if (storage.getResidue()-count<0) {
            throw new RuntimeException("库存不足");
        }

        /*
        库存减掉count， 冻结库存增加count
         */
        storageMapper.updateFrozen(productId, storage.getResidue()-count, storage.getFrozen()+count);

        //保存标识
        ResultHolder.setResult(getClass(), businessActionContext.getXid(), "p");
        return true;
    }

    @Transactional
    @Override
    public boolean commit(BusinessActionContext businessActionContext) {
        long productId = Long.parseLong(businessActionContext.getActionContext("productId").toString());
        int count = Integer.parseInt(businessActionContext.getActionContext("count").toString());
        log.info("减少商品库存，第二阶段提交，productId="+productId+"， count="+count);

        //防止重复提交
        if (ResultHolder.getResult(getClass(), businessActionContext.getXid()) == null) {
            return true;
        }

        storageMapper.updateFrozenToUsed(productId, count);

        //删除标识
        ResultHolder.removeResult(getClass(), businessActionContext.getXid());
        return true;
    }

    @Transactional
    @Override
    public boolean rollback(BusinessActionContext businessActionContext) {

        long productId = Long.parseLong(businessActionContext.getActionContext("productId").toString());
        int count = Integer.parseInt(businessActionContext.getActionContext("count").toString());
        log.info("减少商品库存，第二阶段，回滚，productId="+productId+"， count="+count);

        //防止重复回滚
        if (ResultHolder.getResult(getClass(), businessActionContext.getXid()) == null) {
            return true;
        }

        storageMapper.updateFrozenToResidue(productId, count);

        //删除标识
        ResultHolder.removeResult(getClass(), businessActionContext.getXid());
        return true;
    }
}

```





### 在业务代码中调用 Try 阶段方法

业务代码中调用 TCC 第一阶段方法`prepareDecreaseStorage()`，并添加全局事务注解 `@GlobalTransactional`：

```java
package cn.tedu.storage.service;

import cn.tedu.storage.tcc.StorageTccAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StorageServiceImpl implements StorageService {
    // @Autowired
    // private StorageMapper storageMapper;

    @Autowired
    private StorageTccAction storageTccAction;

    @Override
    public void decrease(Long productId, Integer count) throws Exception {
        // storageMapper.decrease(productId,count);
        storageTccAction.prepareDecreaseStorage(null, productId, count);
    }

}

```





### 启动 storage 进行测试

按顺序启动服务：

1. Eureka
2. Seata Server
3. Easy Id Generator
4. Storage
5. Order

调用保存订单，地址：
http://localhost:8083/create?userId=1&productId=1&count=10&money=100

观察 storage 的控制台日志：
![a](https://img-blog.csdnimg.cn/20200802210104764.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

查看数据库表中的库存数据：

![a](https://img-blog.csdnimg.cn/20200802210233601.png#pic_center)





## account添加“扣减金额”分支事务

扣减金额 TCC 事务分析请见 "Seata TCC模式-TCC模式介绍" .





### 配置

有三个文件需要配置：

- application.yml
- registry.conf
- file.conf

这三个文件的设置与上面 order 项目的配置完全相同，请参考上面订单配置一章进行配置。





### AccountMapper 添加冻结库存相关方法

根据前面的分析，库存数据操作有以下三项：

- 冻结库存
- 冻结库存量修改为已售出量
- 解冻库存

在 AccountMapper 中添加三个方法：

```java
package cn.tedu.account.mapper;

import cn.tedu.account.entity.Account;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;

public interface AccountMapper extends BaseMapper<Account> {
    void decrease(Long userId, BigDecimal money);

    void updateFrozen(@Param("userId") Long userId, @Param("residue") BigDecimal residue, @Param("frozen") BigDecimal frozen);

    void updateFrozenToUsed(@Param("userId") Long userId, @Param("money") BigDecimal money);

    void updateFrozenToResidue(@Param("userId") Long userId, @Param("money") BigDecimal money);
}

```

那么对应的 `AccountMapper.xml` 中添加 sql：

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
    <select id="selectById" resultMap="BaseResultMap">
        SELECT * FROM account WHERE `user_id`=#{userId}
    </select>

    <update id="updateFrozen">
        UPDATE account SET `residue`=#{residue},`frozen`=#{frozen} WHERE `user_id`=#{userId}
    </update>

    <update id="updateFrozenToUsed">
        UPDATE account SET `frozen`=`frozen`-#{money}, `used`=`used`+#{money} WHERE `user_id`=#{userId}
    </update>

    <update id="updateFrozenToResidue">
        UPDATE account SET `frozen`=`frozen`-#{money}, `residue`=`residue`+#{money} WHERE `user_id`=#{userId}
    </update>
</mapper>

```





### Seata 实现库存的 TCC 操作方法

工具类 `ResultHolder`：

```java
package cn.tedu.account.tcc;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ResultHolder {
    private static Map<Class<?>, Map<String, String>> map = new ConcurrentHashMap<Class<?>, Map<String, String>>();

    public static void setResult(Class<?> actionClass, String xid, String v) {
        Map<String, String> results = map.get(actionClass);

        if (results == null) {
            synchronized (map) {
                if (results == null) {
                    results = new ConcurrentHashMap<>();
                    map.put(actionClass, results);
                }
            }
        }

        results.put(xid, v);
    }

    public static String getResult(Class<?> actionClass, String xid) {
        Map<String, String> results = map.get(actionClass);
        if (results != null) {
            return results.get(xid);
        }

        return null;
    }

    public static void removeResult(Class<?> actionClass, String xid) {
        Map<String, String> results = map.get(actionClass);
        if (results != null) {
            results.remove(xid);
        }
    }
}

```

添加 TCC 接口，在接口中添加以下方法：

- Try - `prepareDecreaseAccount()`
- Confirm - `commit()`
- Cancel - `rollback()`

```java
package cn.tedu.account.tcc;

import io.seata.rm.tcc.api.BusinessActionContext;
import io.seata.rm.tcc.api.BusinessActionContextParameter;
import io.seata.rm.tcc.api.LocalTCC;
import io.seata.rm.tcc.api.TwoPhaseBusinessAction;

import java.math.BigDecimal;

@LocalTCC
public interface AccountTccAction {

    @TwoPhaseBusinessAction(name = "accountTccAction", commitMethod = "commit", rollbackMethod = "rollback")
    boolean prepareDecreaseAccount(BusinessActionContext businessActionContext,
                                   @BusinessActionContextParameter(paramName = "userId") Long userId,
                                   @BusinessActionContextParameter(paramName = "money") BigDecimal money);

    boolean commit(BusinessActionContext businessActionContext);

    boolean rollback(BusinessActionContext businessActionContext);

}

```

实现类：

```java
package cn.tedu.account.tcc;

import cn.tedu.account.entity.Account;
import cn.tedu.account.mapper.AccountMapper;
import io.seata.rm.tcc.api.BusinessActionContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Component
@Slf4j
public class AccountTccActionImpl implements AccountTccAction {
    @Autowired
    private AccountMapper accountMapper;

    @Transactional
    @Override
    public boolean prepareDecreaseAccount(BusinessActionContext businessActionContext, Long userId, BigDecimal money) {
        log.info("减少账户金额，第一阶段锁定金额，userId="+userId+"， money="+money);

        Account account = accountMapper.selectById(userId);
        if (account.getResidue().compareTo(money) < 0) {
            throw new RuntimeException("账户金额不足");
        }

        /*
        余额-money
        冻结+money
         */
        accountMapper.updateFrozen(userId, account.getResidue().subtract(money), account.getFrozen().add(money));

        //保存标识
        ResultHolder.setResult(getClass(), businessActionContext.getXid(), "p");
        return true;
    }

    @Transactional
    @Override
    public boolean commit(BusinessActionContext businessActionContext) {

        long userId = Long.parseLong(businessActionContext.getActionContext("userId").toString());
        BigDecimal money =  new BigDecimal(businessActionContext.getActionContext("money").toString());
        log.info("减少账户金额，第二阶段，提交，userId="+userId+"， money="+money);

        //防止重复提交
        if (ResultHolder.getResult(getClass(), businessActionContext.getXid()) == null) {
            return true;
        }

        accountMapper.updateFrozenToUsed(userId, money);

        //删除标识
        ResultHolder.removeResult(getClass(), businessActionContext.getXid());
        return true;
    }

    @Transactional
    @Override
    public boolean rollback(BusinessActionContext businessActionContext) {
        long userId = Long.parseLong(businessActionContext.getActionContext("userId").toString());
        BigDecimal money =  new BigDecimal(businessActionContext.getActionContext("money").toString());

        //防止重复回滚
        if (ResultHolder.getResult(getClass(), businessActionContext.getXid()) == null) {
            return true;
        }

        log.info("减少账户金额，第二阶段，回滚，userId="+userId+"， money="+money);

        accountMapper.updateFrozenToResidue(userId, money);

        //删除标识
        ResultHolder.removeResult(getClass(), businessActionContext.getXid());
        return true;
    }
}

```





### 在业务代码中调用 Try 阶段方法

业务代码中调用 TCC 第一阶段方法`prepareDecreaseAccount()`，并添加全局事务注解 `@GlobalTransactional`：

```java
package cn.tedu.account.service;

import cn.tedu.account.mapper.AccountMapper;
import cn.tedu.account.tcc.AccountTccAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
@Service
public class AccountServiceImpl implements AccountService {
    // @Autowired
    // private AccountMapper accountMapper;

    @Autowired
    private AccountTccAction accountTccAction;

    @Override
    public void decrease(Long userId, BigDecimal money) {
        // accountMapper.decrease(userId,money);
        accountTccAction.prepareDecreaseAccount(null, userId, money);
    }
}

```





### 启动 account 进行测试

按顺序启动服务：

1. Eureka
2. Seata Server
3. Easy Id Generator
4. Storage
5. Account
6. Order

调用保存订单，地址：
http://localhost:8083/create?userId=1&productId=1&count=10&money=100

观察 account 的控制台日志：

![a](https://img-blog.csdnimg.cn/20200804233336419.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

查看数据库表中的账户数据：

![a](https://img-blog.csdnimg.cn/2020080423351470.png#pic_center)





## 全局事务回滚测试

下面来测试全局事务回滚的情况。

订单和库存第一阶段成功，而账户第一阶段失败了，这时会触发全局事务的回滚，如下图所示：

![a](https://img-blog.csdnimg.cn/20200804234942353.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)
首先在 account 的第一阶段代码中添加模拟异常：

`AccountTccActionImpl` 的 `prepareDecreaseAccount` 方法

```java
@Transactional
    @Override
    public boolean prepareDecreaseAccount(BusinessActionContext businessActionContext, Long userId, BigDecimal money) {
        log.info("减少账户金额，第一阶段锁定金额，userId="+userId+"， money="+money);

        Account account = accountMapper.selectById(userId);
        if (account.getResidue().compareTo(money) < 0) {
            throw new RuntimeException("账户金额不足");
        }

        /*
        余额-money
        冻结+money
         */
        accountMapper.updateFrozen(userId, account.getResidue().subtract(money), account.getFrozen().add(money));

        if (Math.random() < 0.5) {
            throw new RuntimeException("模拟异常");
        }

        //保存标识
        ResultHolder.setResult(getClass(), businessActionContext.getXid(), "p");
        return true;
    }
```

重启 account 后，访问订单：
http://localhost:8083/create?userId=1&productId=1&count=10&money=100

查看控制台，可以看到 storage 和 order 的回滚日志，order 的回滚日志如下：

![a](https://img-blog.csdnimg.cn/20200805084803541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





> [项目源码：](https://gitee.com/benwang6/seata-samples) 