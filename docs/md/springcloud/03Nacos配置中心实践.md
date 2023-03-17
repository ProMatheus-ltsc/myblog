# Nacos配置中心实践
[[TOC]]

## 配置中心简介

### 背景分析

我们知道，除了代码之外，软件还有一些配置信息，比如数据库的用户名和密码，还有一些我们不想写死在代码里的东西，例如像线程池大小、队列长度等运行参数，以及日志级别、算法策略等， 还有一些是软件运行环境的参数，如Java 的内存大小，应用启动的参数，包括操作系统的一些 参数配置…… 所有这些东西，我们都叫做软件配置。以前，我们把软件配置写在一个配置文件中，就像 Windows 下的 ini 文件，或是 Linux 下的 conf 文件。然而，在分布式系统下，这样的方式就变得非常不好管理，并容易出错。假如生产环境下，项目现在正在运行，此时修改了配置文件，我们需要让这些配置生效，通常的做法是不是要重启服务。但重启是不是会带来系统服务短时间的暂停，从而影响用户体验呢，还有可能会带来经济上的很大损失（例如双11重启下服务）。基于这样的背景，配置中心诞生了。

### 配置中心概述

配置中心最基础的功能就是存储一个键值对，用户发布一个配置（configKey），然后客户端获取这个配置项（configValue）；进阶的功能就是当某个配置项发生变更时，不停机就可以动态刷新服务内部的配置项，例如，在生产环境上我们可能把我们的日志级别调整为 error 级别，但是，在系统出问题我们希望对它 debug 的时候，我们需要动态的调整系统的行为的能力，把日志级别调整为 debug 级别。还有，当你设计一个电商系统时，设计大促预案一定会考虑，同时涌进来超过一亿人并发访问的时候，假如系统是扛不住的，你会怎么办，在这个过程中我们一般会采用限流，降级。系统的限流和降级本质上来讲就是从日常的运行态切换到大促态的一个行为的动态调整，这个本身天然就是配置起到作用的一个相应的场景。

### 配置中心的选型

在面向分布式的微服务系统中，如何通过更高效的配置管理方式，实现微服务系统架构持续“无痛”的演进，并动态调整和控制系统的运行时态，配置中心的选型和设计起着举足轻重的作用。市场上主流配置中心有Apollo(携程开源)，nacos(阿里开源)，Spring Cloud Config(Spring Cloud 全家桶成员）。我们在对这些配置中心进行选型时重点要从产品功能、使用体验、实施过程和性能等方面进行综合考量。本次课程我们选择nacos，此组件不仅提供了注册中心，还具备配置中心的功能。

### 小节面试分析

- 什么是配置中心？（存储项目配置信息的一个服务）
- 为什么要使用配置中心？(集中管理配置信息，动态发布配置信息)
- 市场上有哪些主流的配置中心？(Apollo,nacos,……)

## Nacos配置快速入门

### 业务描述

在sca-provider项目中添加一个Controller对象，例如ProviderLogController，基于此Controller中的方法演示日志级别的配置。

### 配置准备工作

第一步：创建ProviderLogController对象，例如：

```java
package com.jt.provider.controller;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * 基于此controller演示配置中心的作用.
 * 在这个controller中我们会基于日志对象
 * 进行日志输出测试.
 */
//@Slf4j
@RestController
public class ProviderLogController {
    //创建一个日志对象
    //org.slf4j.Logger (Java中的日志API规范,基于这个规范有Log4J,Logback等日志库)
    //org.slf4j.LoggerFactory
    //log对象在哪个类中创建,getLogger方法中的就传入哪个类的字节码对象
    //记住:以后只要Java中使用日志对象,你就采用下面之中方式创建即可.
    //假如在log对象所在的类上使用了@Slf4j注解,log不再需要我们手动创建,lombok会帮我们创建
   private static Logger log=
           LoggerFactory.getLogger(ProviderLogController.class);
    @GetMapping("/provider/log/doLog01")
    public String doLog01(){//trace<debug<info<warn<error
        System.out.println("==doLog01==");
        log.trace("===trace===");
        log.debug("===debug===");
        log.info("===info====");
        log.warn("===warn===");
        log.error("===error===");
        return "log config test";
    }
}

```

第二步：在已有的sca-provider项目中添加如配置依赖,例如:

```xml
  <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
  </dependency>
```

第三步： 将项目sca-provider的application.yml的名字修改为bootstrap.yml（启动优先级最高），并添加配置中心配置，代码如下：

```yaml
spring:
  application:
    name: sca-provider
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yml # Configure the data format of the content, default to properties
```

### 新建Nacos配置

打开nacos配置中心，新建配置，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/d1ab400e2c324d6d8a019cb08b19d7a1.png)

其中，Data ID的值要与bootstrap.yml中定义的spring.application.name的值相同(服务名-假如有多个服务一般会创建多个配置实例，不同服务对应不同的配置实例)。配置发布以后,会在配置列表中,显示我们的配置,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/cf586643a2eb4962a40004bc04d4308e.png)

### 测试Nacos数据读取

配置创建好以后,启动sca-provider服务,然后打开浏览器,输入http://localhost:8081/provider/log/doLog01，检测idea控制台日志输出。然后再打开nacos控制台动态更新日志级别,再访问资源并检测后台日志输出.

![在这里插入图片描述](https://img-blog.csdnimg.cn/1c8ea18cc50d4ba0885860466f98a29f.png)

然后,修改nacos配置中心的日志级别,再刷新浏览器,检测日志的输出,是否会发生变化.

### @RefreshScope注解的应用

对于nacos配置中心而言,有系统内部对配置变化的感知,还有外部系统对配置的感知,假如我们系统在浏览器中能看到日志级别的变化,该如何实现呢?我们现在来实现一个案例.

第一步:在ProviderLogController类的上面添加一个@RefreshScope注解，例如：

```java
@RefreshScope
@RestController
public class ProviderLogController{
  //.....
}
```

其中,@RefreshScope的作用是在配置中心的相关配置发生变化以后，能够及时看到类中属性值的更新(底层是通过重新创建Controller对象的方式,对属性进行了重新初始化)。

第二步:添加ProviderLogController中添加一个获取日志级别(debug<info<warn<error)的的属性和方法,代码如下:

```java
@Value("${logging.level.com.jt:error}")
private String logLevel;
@GetMapping("/provider/log/doLog02")
public String doLog02(){
   log.info("log level is  {}",logLevel);
   return  "log level  is "+logLevel;
}
```

第三步：启动sca-provider服务,然后打开浏览器并输入http://localhost:8081/provider/log/doLog02进行访问测试。

> 说明,假如对配置的信息访问不到,请检测项目配置文件的名字是否为bootstrap.yml,检查配置文件中spring.application.name属性的值是否与配置中心的data-id名相同,还有你读取的配置信息缩进以及空格写的格式是否正确.

### 小节面试分析

- 配置中心一般都会配置什么内容？(可能会经常变化的配置信息，例如连接池，日志、线程池、限流熔断规则)
- 什么信息一般不会写到配置中心?(服务端口，服务名，服务的注册地址，配置中心)
- 项目中为什么要定义bootstrap.yml文件？(此文件被读取的优先级比较高，可以在服务启动时读取配置中心的数据)
- Nacos配置中心宕机了，我们的服务还可以读取到配置信息吗？(可以从内存,客户端获取了配置中心的配置信息以后,会将配置信息在本地内存中存储一份.)
- 微服务应用中我们的客户端如何获取配置中心的信息?(我们的服务一般首先会从内存读取配置信息，同时我们的微服务还可以定时向nacos配置中心发请求拉取(pull)更新的配置信息)
- 微服务应用中客户端如何感知配置中心数据变化？(1.4.x版本的nacos客户端会基于长轮询机制从nacos获取配置信息,所谓的长轮询就是没有配置更新时,会在nacos服务端的队列进行等待.)
- 服务启动后没有从配置中心获取我们的配置数据是什么原因?(依赖,配置文件名字bootstrap.yml,配置中心的dataId名字是否正确,分组是否正确,配置的名字是否正确,缩进关系是否正确,假如是动态发布,类上是否有@RefreshScope注解)
- 你项目中使用的日志规范是什么?(SLF4J)
- 你了解项目中的日志级别吗?(debug,info,error,…,可以基于日志级别控制日志的输出)

## Nacos配置管理模型

### 概述

Nacos 配置管理模型由三部分构成，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/5f0316a14c0548c8a2ee88007bef82ea.png)

其中：

- Namespace：命名空间，对不同的环境进⾏隔离，⽐如隔离开发环境和⽣产环境。
- Group：分组，将若⼲个服务或者若⼲个配置集归为⼀组。
- Service/DataId：某⼀个服务或配置集，一般对应一个配置文件。

### 命名空间设计

Nacos中的命名空间一般用于配置隔离，这种命名空间的定义一般会按照环境（开发，生产等环境）进行设计和实现.我们默认创建的配置都存储到了public命名空间，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/c54aebeea3d34c9fa8ff01c7c6064e14.png)

创建新的开发环境并定义其配置，然后从开发环境的配置中读取配置信息，该如何实现呢？

第一步：创建新命名空间，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/c9fee98892c049aaba240662cd37399e.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21haXRpYW5fMjAwOA==,size_16,color_FFFFFF,t_70)

命名空间成功创建以后，会在如下列表进行呈现。

![在这里插入图片描述](https://img-blog.csdnimg.cn/5c11395182b0499788dbfbde847a733d.png)

在指定命名空间下添加配置，也可以直接取配置列表中克隆，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/c9533ce1f5df40a5a456bc8df53805ab.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/3df493708a9c4e1bb980001ae7cf05dc.png)

克隆成功以后，我们会发现在指定的命名空间中有了我们克隆的配置，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/58c4c2825da24a7da1fbbbee6145eaf8.png)

此时我们修改dev命名空间中Data Id的sca-provider配置，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/07a6b375bd014e458c58aea625070f4e.png)

修改项目module中的配置文件bootstrap.yml,添加如下配置，关键代码如下：

```yml
spring:
  cloud:
    nacos:
      config:
        namespace: 6058fd3f-0d4d-44f2-85d6-5fc7d2348046
        ……
```

其中，namespace后面的字符串为命名空间的id，可直接从命名空间列表中进行拷贝.然后重启服务，继续刷新http://localhost:8081/provider/log/doLog02地址。检测输出，看看输出的内容是什么，是否为dev命名空间下配置的内容。

### 分组设计及实现

当我们在指定命名空间下，按环境或服务做好了配置以后，有时还需要基于服务做分组配置，例如，一个服务在不同时间节点(节假日，活动等)切换不同的配置，可以在新建配置时指定分组名称，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/94f9c572494c41c5b15df9e649333d73.png)

其中,这里的useLocalCache为自己定义的配置值,表示是否使用本地缓存.

配置发布以后，修改boostrap.yml配置类，在其内部指定我们刚刚创建的分组，代码如下：

```yaml
server:
  port: 8081
spring:
  application:
    name: sca-provider
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        group: DEFAULT_GROUP_51 # Group, default is DEFAULT_GROUP
        file-extension: yml # Configure the data format of the content, default to properties
        namespace: 7da4aa75-f64c-43c6-b101-9d77ad96f1c0
```

在指定的Controller类中添加属性和方法用于获取和输出DEFAULT_GROUP_51中的useLocalCache的值，代码如下：

```java
package com.jt.provider.controller;

@RefreshScope
@RestController
public class ProviderCacheController {
    @Value("${useLocalCache:false}")
    private boolean useLocalCache;

    @RequestMapping("/provider/cache01")
    public String doUseLocalCache01(){
        return "useLocalCache'value is   "+useLocalCache;
    }
}
```

然后重启服务，进行访问测试，检测内容输出。

![在这里插入图片描述](https://img-blog.csdnimg.cn/4c095d1a5c404240a4398a5051603d0d.png)

### 共享配置设计及读取

当同一个namespace的多个配置文件中都有相同配置时，可以对这些配置进行提取，然后存储到nacos配置中心的一个或多个指定配置文件，哪个微服务需要，就在服务的配置中设置读取即可。例如：

第一步：在nacos中创建一个共享配置文件，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/bc8cdbee55e14e70bde005da7ec7c2ac.png)

其中，这里的secret可以理解为一个密钥。

第二步：在指定的微服务配置文件(bootstrap.yml)中设置对共享配置文件的读取，例如：

```yaml
spring:
  application:
    name: sca-provider
  cloud:
    nacos:
      config:
        server-addr: localhost:8848
        # 命名空间
        namespace: 83ed55a5-1dd9-4b84-a5fe-a734e4a6ec6d
        # 分组名
        # group: DEFAULT_GROUP
        # 配置中心文件扩展名
        file-extension: yml
        # 共享配置
        shared-configs[0]:
                data-id: app-public.yml
                refresh: true #默认false,共享配置更新,引用此配置的地方是否要更新
```

第三步：在指定的Controller类中读取和应用共享配置即可，例如：

```java
package com.jt.provider.controller;

@RefreshScope
@RestController
public class ProviderSecretController {
    @Value("${app.secret:123456}")
    private String secret;
    @GetMapping("/provider/secret")
    public String doGetSecret(){
        //return String.format()
        return "The Secret is "+secret;
    }
}
```

第四步：启动服务,然后打开浏览器进行访问测试。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ca80e834894648a8b4516f4364042d4f.png)

### 小节面试分析

- Nacos配置管理模型的背景？(环境不同配置不同)
- Nacos配置中的管理模型是怎样的？（namespace,group,service/data-id）
- Nacos客户端(微服务)是否可以读取共享配置?(可以)

## 总结(Summary)

### 重难点分析

- 配置中心的选型。(市场活跃度、稳定性、性能、易用)
- Nacos配置中心基本应用。(新建，修改、删除配置以后，在Nacos客户端应用配置)
- 配置管理模型应用。(namespace,group,service/dataId)
- Nacos配置变更的动态感知。(底层原理分析)

### FAQ分析

- 为什么需要配置中心？(动态管理发布配置，无需重启服务，更好保证服务的可用)
- 配置中一般要配置什么内容？(经常变化的配置数据-日志级别，线程池、连接池、…)
- 市面上有哪些主流配置中心？(Nacos,….)
- 配置中心选型时要重点考虑哪些因素？(市场活跃度、稳定性、性能、易用)
- Nacos客户端(微服务业务)如何动态感知配置中心数据变化的？(nacos2.0之前nacos客户端采用长轮询机制每隔30秒拉取nacos配置信息.)
- Nacos配置管理模型是怎样的？（命名空间-namespace,分组-group,服务实例-dataId）
- 什么是配置中心?(存储项目配置信息的一个服务，这个服务可以实现配置的动态发布和更新）
- 为什么要使用配置中心？(集中管理配置信息，动态发布配置信息，服务自动感知配置)
- 市场上有哪些主流的配置中心？(Apollo,nacos,……)
- 配置中心一般都会配置什么内容？(可能会经常变化的配置信息，例如连接池，日志、线程池、限流熔断规则)
- 什么信息一般不会写到配置中心?(服务端口，服务名，服务的注册地址，配置中心地址)
- 项目中为什么要定义bootstrap.yml文件？(此文件被读取的优先级比较高，可以在服务启动时读取配置中心的数据)
- Nacos配置中心宕机了，我们的服务还可以读取到配置信息吗？(可以从服务的本地内存读取)
- 微服务应用中客户端如何感知配置中心数据变化？(1.4.x版本的nacos客户端会基于长轮询机制从nacos获取配置信息)
- 服务启动后没有从配置中心获取我们的配置数据是什么原因?(依赖,bootstrap.yml,配置单词，格式，配置模型)
- 你项目中使用的日志规范是什么?(SLF4J~门面模式）
你了解项目中的日志级别吗?(debug,info,warn,error可以基于日志级别控制日志的输出)
- Nacos配置管理模型的背景？(环境不同配置不同)
- Nacos配置中的管理模型是怎样的？（namespace>group>service/data-id）
- Nacos客户端(微服务)是否可以读取共享配置?(可以)


