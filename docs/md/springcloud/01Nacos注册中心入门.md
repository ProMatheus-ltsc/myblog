# Nacos注册中心入门
[[TOC]]

## 注册中心简介

### 背景分析

在微服务中，首先需要面对的问题就是如何查找服务(软件即服务)，其次,就是如何在不同的服务之间进行通信？如何更好更方便的管理应用中的每一个服务，如何建立各个服务之间联系的纽带，由此注册中心诞生（例如淘宝网卖家提供服务，买家调用服务）。

市面上常用注册中心有Zookeeper(雅虎Apache),Eureka(Netfix),Nacos(Alibaba),Consul(Google),那他们分别都有什么特点，我们如何进行选型呢？我们主要从社区活跃度,稳定性,功能,性能等方面进行考虑即可.本次微服务的学习,我们选择Nacos,它很好的支持了阿里的双11活动,不仅可以做注册中心，还可以作为配置中心，稳定性和性能都很好。

### Nacos概述

Nacos（DynamicNaming and Configuration Service）是一个应用于服务注册与发现、配置管理的平台。它孵化于阿里巴巴，成长于十年双十一的洪峰考验，沉淀了简单易用、稳定可靠、性能卓越的核心竞争力。其官网地址如下：

```
https://nacos.io/zh-cn/docs/quick-start.html

```

## 构建Nacos服务

### 准备工作

第一：确保你电脑已配置JAVA_HOME环境变量(Nacos启动时需要)，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/ecdc4e0b29404d928dedc015f952be56.png)

第二：确保你的MySQL版本为5.7以上（MariaDB10.5以上)，例如

![在这里插入图片描述](https://img-blog.csdnimg.cn/fd30dbdb661b45c28da8da298fa5c6bb.png)

### 下载与安装

第一步：Nacos下载,可在浏览器直接输入如下地址：

https://github.com/alibaba/nacos/releases

第二步：选择对应版本，直接下载，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/5c366dd1cf2442568e182a2ae13dd2a2.png)

第三步：解压Nacos（最好不要解压到中文目录下），其目录结构如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/8d139f02efdf46f48a97179bde2d0f20.png)

### 初始化配置

第一步：打开操作系统命令行，登陆mysql，执行课前资料中的sql脚本，不是nacos/conf目录下自带的。
例如,我们可以使用mysql自带客户端,在命令行首先登录mysql,然后执行如下指令:

```bash
source d:/nacos-mysql.sql 
```

执行成功以后，会创建一个nacos_config数据库，打开数据库会看到一些表，例如；

![在这里插入图片描述](https://img-blog.csdnimg.cn/cecb1b229194484b9c44a9eede7b7085.png)

说明:在执行此文件时,要求mysql的版本大于5.7版本(MariaDB最好10.5.11),否则会出现如下错误:

![在这里插入图片描述](https://img-blog.csdnimg.cn/1d88ac2156a3426d940b88e0af143533.png)

第二步：打开/nacos/conf/application.properties里打开默认配置，并基于你当前环境配置要连接的数据库，连接数据库时使用的用户名和密码(假如前面有"#"要将其去掉)：

```java
### If use MySQL as datasource:
spring.datasource.platform=mysql

### Count of DB:
db.num=1

### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=root
```

### 服务启动与访问

第一步:启动Nacos服务（nacos的bin目录去通过指令启动）。

Linux/Unix/Mac启动命令(standalone代表着单机模式运行，非集群模式):

```
./startup.sh -m standalone
```

Windows启动命令(standalone代表着单机模式运行，非集群模式):

```
startup.cmd -m standalone
```

说明:
1)执行执行令时要么配置环境变量,要么直接在nacos/bin目录下去执行.
2)nacos启动时需要本地环境变量中配置了JAVA_HOME(对应jdk的安装目录),
3)一定要确保你连接的数据库(nacos_config)是存在的.
4)假如所有的配置都正确,还连不上，检查一下你有几个数据库(mysql,…)

第二步:访问Nacos服务。

打开浏览器，输入http://localhost:8848/nacos地址，出现如下登陆页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/186317860d80425c88954638fe3b4a3c.png)

其中，默认账号密码为nacos/nacos.

## 服务注册与调用入门（重点）

### 业务描述

创建两个项目Module分别为服务提供者和服务消费者（假如已有则无需创建），两者都要注册到NacosServer中(这个server本质上就是一个web服务，端口默认为8848)，然后服务提供者可以为服务消费者提供远端调用服务(例如支付服务为服务提供方，订单服务为服务消费方)，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/4421daf970c54d658be898ace0b09c73.png)

### 生产者服务创建及注册

第一步：创建服务提供者工程(module名为sca-provider,假如已有则无需创建），继承parent工程(01-sca),其pom.xml文件内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>01-sca</artifactId>
        <groupId>com.jt</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>
    <artifactId>sca-provider</artifactId>
    <dependencies>
        <!--Web服务-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--服务的注册和发现(我们要讲服务注册到nacos)-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
    </dependencies>
</project>
```

第二步：创建并修改配置文件application.yml(或者application.properties)，实现服务注册，关键代码如下：

```yaml
server:
   port: 8081
spring:
  application:
    name: sca-provider #进行服务注册必须配置服务名
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
```

注意：服务名不要使用下划线(“_”),应使用横杠(“-”),这是规则。
第三步：创建启动类(假如已有则无需定义)，关键代码如下：

```java
package com.jt;

@SpringBootApplication
public class ProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
  }
```

第四步：启动启动类，然后刷先nacos服务，检测是否服务注册成功，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1ba763e2644440efbc5f46f3762f6533.png)

第五步:停掉sca-provider服务，然后不断刷新nacos服务列表，检查服务的健康状态。

### 消费者服务发现及调用

第一步: 在sca-provider项目中创建服务提供方对象，基于此对象对外提供服务,例如:

```java
    package com.jt.provider.controller;
    /**定义Controller对象(这个对象在spring mvc中给他的定义是handler),
     * 基于此对象处理客户端的请求*/
    @RestController
    public class ProviderController{
        //@Value默认读取项目配置文件中配置的内容
        //8080为没有读到server.port的值时,给定的默认值
        @Value("${server.port:8080}")
        private String server;
        //http://localhost:8081/provider/echo/tedu
        @GetMapping("/provider/echo/{msg}")
        public String doRestEcho1(@PathVariable String msg){
            return server+" say hello "+msg;
        }
    }
```

第二步：创建服务消费者工程（module名为sca-consumer，假如已有则无需创建），继承parent工程（01-sca），其pom.xml文件内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>01-sca</artifactId>
        <groupId>com.jt</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>
    <artifactId>sca-consumer</artifactId>
    
   <dependencies>
    <!--Web服务-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--服务的注册和发现(我们要讲服务注册到nacos)-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    </dependencies>
</project>
```

第三步：创建sca-consumer服务中的配置文件application.yml，关键代码如下：

```yaml
server:
  port: 8090
spring:
  application:
    name: sca-consumer #服务注册时，服务名必须配置
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #从哪里去查找服务
```

第四步：创建消费端启动类并实现服务消费，关键代码如下：

```java
package com.jt;
@SpringBootApplication
public class ConsumerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class,args);
    }
}
```

第五步:在sca-consumer启动类中添加如下方法,用于创建RestTemplate对象.

```java
@Bean
public RestTemplate restTemplate(){//基于此对象实现远端服务调用
    return new RestTemplate();
}
```

第六步:定义sca-consumer服务的消费端Controller,在此对象方法内部实现远端服务调用

```java
package com.jt.consumer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


/**
 * 定义服务消费端Controller,在这个Controller对象
 * 的方法中实现对远端服务sca-provider的调用
 */
@RestController
public class ConsumerController {
    /**
     * 从spring容器获取一个RestTemplate对象,
     * 基于此对象实现远端服务调用
     */
    @Autowired
    private RestTemplate restTemplate;
    /**
     * 在此方法中通过一个RestTemplate对象调用远端sca-provider中的服务
     * @return
     * 访问此方法的url: http://localhost:8090/consumer/doRestEcho1
     */
    @GetMapping("/consumer/doRestEcho1")
    public String doRestEcho01(){
        //1.定义要调用的远端服务的url
        String url="http://localhost:8081/provider/echo/8090";
        //2.基于restTemplate对象中的相关方法进行服务调用
        return restTemplate.getForObject(url, String.class);
    }

}
```

第七步：启动消费者服务，并在浏览器输入http://localhost:8090/consumer/doRestEcho1地址进行访问测试。

### 小节面试分析

- 为什么要将服务注册到nacos?(为了更好的查找这些服务)
- 在Nacos中服务提供者是如何向Nacos注册中心(Registry)续约的？(5秒心跳)
- 对于Nacos服务来讲它是如何判定服务实例的状态？(检测心跳包，15,30)
- 服务消费方是如何调用服务提供方的服务的？(RestTemplate)

## 总结(Summary)

### 重难点分析

- 何为注册中心？(用于记录服务信息的一个web服务，例如淘宝平台，滴滴平台，美团外卖平台，……)
- 注册中心的核心对象？(服务提供方，服务消费方，注册中心-Registry)
- 市面上常用注册中心？(Google-Consul,Alibaba-Nacos,…)
- Nacos安装、启动、服务的注册、发现机制以及实现过程
- 服务调用时RestTemplate对象的应用。

### FAQ分析

- Nacos是什么，提供了什么特性(服务的注册、发现、配置)？
- 你为什么会选择Nacos?（活跃度、稳定、性能、学习成本）
- Nacos的官网？(nacos.io)
- Nacos在github的源码？(github.com/alibaba/nacos)
- Nacos在windows环境下安装?(解压即可使用)
- Nacos在windows中的的初步配置？(application.properties访问数据库的数据源)
- Nacos服务注册的基本过程？（服务启动时发送web请求）
- Nacos服务消费的基本过程？（服务启动时获取服务实例，然后调用服务）



#### 服务注册中心诞生背景?

 服务多了，需要统一管理，例如所有公司需要在工商局进行备案

#### 服务注册中心的选型?

社区活跃度,稳定性,功能,性能,学习成本

#### Nacos下载,安装(解压),配置(application.properties),启动(startup.cmd),访问(http://ip:port/nacos)

#### 基于Nacos实现服务的注册?

添加依赖,服务配置,启动服务并检查

#### 基于RestTemplate实现服务的简易调用？

服务消费方调用服务提供方

#### 基于LoadBalancerClient实现服务实例的获取?

底层会基于负载均衡算法为我们应用提供实例

#### Nacos心跳机制

> 常见面试题

Nacos内部注册的服务分为两大类

1.临时实例(默认)

2.持久化实例(永久实例)

我们可以通过设置属性来确定它是临时还是永久

```yaml
cloud:
  nacos:
    discovery:
      # ephemeral设置当前项目启动时注册到nacos的类型 true(默认):临时实例 false:永久实例
      ephemeral: true 
```

临时实例和永久实例的区别

**临时实例**

默认情况下,启动服务后,每隔5秒会向nacos发送一个"心跳包",这个心跳包中包含了当前服务的基本信息

Nacos收到这个"心跳包"如果发现这个服务的信息不在注册列表中,就进行注册,如果这个服务的信息在注册列表中就表明这个服务还是健康的

如果Nacos15秒内没接收到某个服务的心跳包,Nacos会将这个服务标记为不健康的状态

如果30秒内没有接收到这个服务的心跳包,Nacos会将这个服务从注册列表中剔除

这些时间都是可以通过配置修改的

**持久化实例(永久实例)**

持久化实例启动时向nacos注册,nacos会对这个实例进行持久化处理

心跳包的规则和临时实例一致,只是不会将该服务从列表中剔除

一般情况下,我们创建的服务都是临时实例

只有项目的主干业务才会设置为永久实例