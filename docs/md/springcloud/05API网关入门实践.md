# 网关简介
[[TOC]]


## 背景分析

本一个庞大的单体应用（All in one）业务系统被拆分成许多微服务（Microservice）系统进行独立的维护和部署，服务拆分带来的变化是API的规模成倍增长。那么作为客户端要如何去调用 这么多的微服务呢？客户端可以直接向微服务发送请求，每个微服务都有一个公开的URL，该URL可以直接映射到具体的微服务，如果没有网关的存在，我们只能在客户端记录每个微服务的地址，然后分别去调用。这样的架构，会存在着诸多的问题，管理难度非常大。例如，客户端请求不同的微服务可能会增加客户端代码或配置的复杂性。还有就是每个服务，在调用时都需要独立认证。并且存在跨域请求，也在一定程度上提高了代码的复杂度。基于微服务架构中的设计及实现上的问题，为了在项目中简化前端的调用逻辑，同时也简化内部服务之间互相调用的复杂度，更好保护内部服务,提出了网关的概念。

## 网关概述

API网关是随着微服务（Microservice）概念兴起的一种架构模式，它是运行于外部请求与内部服务之间的一个流量入口，用于实现对外部请求的协议转换、鉴权、流控、参数校验、监控等通用功能。Spring Cloud Gateway就是Spring公司基于Spring 5.0，Spring Boot 2.0 和 等技术开发的一个API网关组件。其特点如下：

- 优点：

1. 性能强劲：是第一代网关Zuul的1.6倍。
2. 功能强大：内置了很多实用的功能，例如转发、监控、限流等
3. 设计优雅，容易扩展。

- 缺点：

1. 依赖Netty与WebFlux(Spring5.0)，不是传统的Servlet编程模型(Spring MVC就是基于此模型实现)，学习成本高。
2. 需要Spring Boot 2.0及以上的版本，才支持

## 快速入门

### 业务描述

通过网关作为服务访问入口，对系统中的服务进行访问,例如通过网关服务去访问sca-provider服务.

### 入门业务实现

第一步：创建sca-gateway模块（假如已有则无须创建），在pom.xml文件中添加网关依赖，例如：

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
```

第二步：创建application.yml(假如已有则无须创建),添加相关配置，代码如下：

```yaml
server:
  port: 9000
spring:
  application:
    name: sca-gateway
  cloud:
    gateway:
        routes: #配置网关路由规则
          - id: route01  #路由id,自己指定一个唯一值即可
            uri: http://localhost:8081/ #网关帮我们转发的url
            predicates: ###断言(谓词):匹配请求规则
              - Path=/nacos/provider/echo/**  #请求路径定义,此路径对应uri中的资源
            filters: ##网关过滤器,用于对谓词中的内容进行判断分析以及处理
              - StripPrefix=1 #转发之前去掉path中第一层路径，例如nacos

```

其中：路由(Route) 是 gateway 中最基本的组件之一，表示一个具体的路由信息载体。主要定义了下面的几个信息:

1. id，路由标识符，区别于其他 Route。
2. uri，路由指向的目的地 uri，即客户端请求最终被转发到的微服务。
3. predicate，断言(谓词)的作用是进行条件判断，只有断言都返回真，才会执行路由。
4. filter，过滤器用于修改请求和响应信息。

第三步：创建项目启动类,例如:

```java
package com.jt;

@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class,args);
    }
}
```

第四步:启动项目进行访问测试，

依次启动sca-provider,sca-gateway服务,然后打开浏览器,进行访问测试,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/58e8bc35202e4f7e8acfab03ba0f1a52.png)

### 小节面试分析？

- 什么是网关？服务访问(流量)的一个入口，类似生活中的“海关“
- 为什么使用网关？(服务安全，统一服务入口管理，负载均衡，限流，鉴权)
- Spring Cloud Gateway 应用的初始构建过程(添加依赖，配置)
- Gateway 服务的启动底层是通过谁去实现的？(Netty网络编程框架-ServerSocket)
- Gateway 服务做请求转发时一定要在注册中心进行注册吗？（不一定，可以直接通过远端url进行服务访问）

## 负载均衡设计

### 为什么负载均衡？

网关才是服务访问的入口，所有服务都会在网关层面进行底层映射，所以在访问服务时，要基于服务serivce id（服务名）去查找对应的服务，让请求从网关层进行均衡转发，以平衡服务实例的处理能力。

### Gateway中负载均衡实现？

第一步：项目中添加服务发现依赖，代码如下：

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

第二步：修改其配置文件，代码如下

```yaml
server:
  port: 9000
spring:
  application:
    name: sca-gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true  #开启通过服务注册中心的serviceId创建路由
      routes:
        - id: route01
          ##uri: http://localhost:8081/
          uri: lb://sca-provider # lb为服务前缀（负载均衡单词的缩写），不能随意写
          predicates: ###匹配规则
              - Path=/nacos/provider/echo/**
          filters:
              - StripPrefix=1 #转发之前去掉path中第一层路径，例如nacos
```

其中，lb指的是从nacos中按照名称获取微服务,并遵循负载均衡策略。同时建议开发阶段打开gateway日志，代码如下：

```
logging:
  level:
    org.springframework.cloud.gateway: debug
```

第三步：启动服务，进行访问测试，并反复刷新分析，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/90fe1a81bf154c8a9ff69c5b2767a8d7.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8cc1c9461b764d4888b755634bc844c8.png)

### 执行流程分析（重要）

根据官方的说明，其Gateway具体工作流程，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/9121b5a2d0894517b46daa734b140e99.png)

客户端向Spring Cloud Gateway发出请求。 如果Gateway Handler Mapping 通过谓词predicates(predicates)的集合确定请求与路由(Routers)匹配，则将其发送到Gateway Web Handler。 Gateway Web Handler 基于路由配置调用过滤链中的过滤器（也就是所谓的责任链模式）进一步的处理请求。 Filter由虚线分隔的原因是， Filter可以在发送请求之前和之后执行拓展逻辑。基于官方的处理流程，进行源码分析如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/65ee048cf5034fc0bd95667787b3198d.png)

### 小节面试分析？

- 网关层面是如何实现负载均衡的？(通过服务名去查找具体的服务实例)
- 网关层面是如何通过服务名查找服务实例的？(Ribbon)
- 你了解Ribbon中的哪些负载均衡算法?(轮询，权重，hash,……可通过IRule接口进行查看分析)
- 网关进行请求转发的流程是怎样，有哪些关键对象？（XxxHandlerMapping，Handler，。。。）
- 网关层面服务的映射方式怎样的？(谓词-path，…,服务名/服务实例)
- 网关层如何记录服务的映射？(通过map，并要考虑读写锁的应用)

## 断言(Predicate)增强分析(了解)

### Predicate 简介

Predicate(断言)又称谓词，用于条件判断，只有断言结果都为真，才会真正的执行路由。断言其本质就是定义路由转发的条件。

### Predicate 内置工厂

SpringCloud Gateway包括一些内置的谓词工厂(所有工厂都直接或间接的实现了RoutePredicateFactory接口)，这些断言或谓词工程负责创建谓词对象,并通过这些谓词对象判断http请求的合法性。常见谓词工厂如下：

> 基于Datetime类型的断言工厂

此类型的断言根据时间做判断，主要有三个：

1） AfterRoutePredicateFactory：判断请求日期是否晚于指定日期
2） BeforeRoutePredicateFactory：判断请求日期是否早于指定日期
3） BetweenRoutePredicateFactory：判断请求日期是否在指定时间段内

-After=2020-12-31T23:59:59.789+08:00[Asia/Shanghai]

当且仅当请求时的时间After配置的时间时，才转发该请求，若请求时的时间不是After配置的时间时，则会返回404 not found。时间值可通过ZonedDateTime.now()获取。

> 基于header的断言工厂HeaderRoutePredicateFactory

判断请求Header是否具有给定名称且值与正则表达式匹配。例如：

-Header=X-Request-Id, \d+

> 基于Method请求方法的断言工厂，

MethodRoutePredicateFactory接收一个参数，判断请求类型是否跟指定的类型匹配。例如：

-Method=GET

> 基于Query请求参数的断言工厂，QueryRoutePredicateFactory ：

接收两个参数，请求param和正则表达式， 判断请求参数是否具 有给定名称且值与正则表达式匹配。例如：

-Query=pageSize,\d+

### Predicate 应用案例实践

内置的路由断言工厂应用案例，例如：

```yaml
server:
  port: 9000
spring:
  application:
    name: sca-gateway
  cloud:
    nacos:
      server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true #开启通过服务中心的serviceId 创建路由的功能
      routes:
        - id: bd-id
          ##uri: http://localhost:8081/
          uri: lb://sca-provider
          predicates: ###匹配规则
              - Path=/nacos/provider/echo/**
              - Before=2021-01-30T00:00:00.000+08:00
              - Method=GET
          filters:
            -  StripPrefix=1 # 转发之前去掉1层路径
```

说明：当条件不满足时，则无法进行路由转发，会出现404异常。

### 小节面试分析

- 何为谓词?(网关中封装了判断逻辑的一个对象)
- 谓词逻辑的设计是怎样的？(谓词判断逻辑返回值为true则进行请求转发)
- 你了解哪些谓词逻辑？(path,请求参数，请求方式，请求头,….)
- 我们可以自己定义谓词工厂对象吗？(可以的)

## 过滤器(Filter)增强分析(了解)

### 概述

过滤器(Filter)就是在请求传递过程中，对请求和响应做一个处理。Gateway 的Filter从作用范围可分为两种：GatewayFilter与GlobalFilter。其中：

1. GatewayFilter：应用到单个路由或者一个分组的路由上。
2. GlobalFilter：应用到所有的路由上(例如负载均衡过滤器，请求转发过滤器等)。

### 局部过滤器设计及实现

在SpringCloud Gateway中内置了很多不同类型的网关路由过滤器。具体如下：
案例分析：

> 基于AddRequestHeaderGatewayFilterFactory，为原始请求添加Header。

例如，为原始请求添加名为 X-Request-Foo ，值为 Bar 的请求头：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: add_request_header_route
          uri: https://example.org
          filters:
            - AddRequestHeader=X-Request-Foo, Bar
```

> 基于AddRequestParameterGatewayFilterFactory，为原始请求添加请求参数及值，

例如，为原始请求添加名为foo，值为bar的参数，即：foo=bar。

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: add_request_parameter_route
          uri: https://example.org
          filters:
            - AddRequestParameter=foo, bar
```

> 基于PrefixPathGatewayFilterFactory，为原始的请求路径添加一个前缀路径

例如，该配置使访问${GATEWAY_URL}/hello 会转发到uri/mypath/hello。

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: prefixpath_route
          uri: https://example.org
          filters:
            - PrefixPath=/mypath
```

> 基于RequestSizeGatewayFilterFactory，设置允许接收最大请求包的大小

，配置示例：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: request_size_route
      uri: http://localhost:8080/upload
      predicates:
        - Path=/upload
      filters:
        - name: RequestSize
          args:
            # 单位为字节
            maxSize: 5000000
```

如果请求包大小超过设置的值，则会返回 413 Payload Too Large以及一个errorMessage

### 全局过滤器设计及实现

全局过滤器(GlobalFilter)作用于所有路由, 无需配置。在系统初始化时加载，并作用在每个路由上。通过全局过滤器可以实现对权限的统一校验，安全性验证等功能。一般内置的全局过滤器已经可以完成大部分的功能，但是对于企业开发的一些业务功能处理，还是需要我们 自己编写过滤器来实现的，那么我们一起通过代码的形式自定义一个过滤器，去完成统一的权限校验。 例如，当客户端第一次请求服务时，服务端对用户进行信息认证（登录), 认证通过，将用户信息进行加密形成token，返回给客户端，作为登录凭证 以后每次请求，客户端都携带认证的token 服务端对token进行解密，判断是否有效。学过spring中的webflux技术的同学可以对如下代码进行尝试实现(没学过的可以忽略).

```java
package com.cy.filters;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
@Component
public class AuthGlobalFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String username=exchange.getRequest()
                .getQueryParams().getFirst("username");
        if (!"admin".equals(username)) {
            System.out.println("认证失败");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        //调用chain.filter继续向下游执行
        return chain.filter(exchange);

    }

    @Override
    public int getOrder() {
        return 0;
    }
}
```

启动Gateway服务，假如在访问的url中不带“user=admin”这个参数，可能会出现异常.

### 小节面试分析

- 网关过滤器的作用是什么？(对请求和响应数据做一个预处理)
- 网关过滤器的类型有哪些？(局部过滤器，全局过滤器)
- 如何理解局部过滤器？(针对具体链路的应用的过滤器，需要进行配置)
- 你了解哪些局部过滤器？
- 如何理解全局过滤器？(作用于所有请求链路)
- 如何自己定义全局过滤器?(直接或间接实现GlobalFilter接口)
- 假如现在让你进行平台的网关自研设计，你可以吗？(可以)

## 限流设计及实现

### 限流简述

网关是所有外部请求的公共入口，所以可以在网关进行限流，而且限流的方式也很多，我们采用Sentinel组件来实现网关的限流。Sentinel支持对SpringCloud Gateway、Zuul等主流网关进行限流。参考网址如下：

```
https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel
```

### 限流快速入门

第一步：添加依赖
在原有spring-cloud-starter-gateway依赖的基础上再添加如下两个依赖，例如：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
</dependency>
```

第二步：在sca-gateway中添加sentinel配置，例如：

```yaml
spring:
  cloud:
    sentinel: #只添加这部分即可，注意缩进关系
      transport:
        dashboard: localhost:8180
      eager: true  #服务一启动就与sentinel进行通讯
```

第三步：启动网关项目，检测sentinel控制台的网关菜单。
启动时，添加sentinel的jvm参数，通过此菜单可以让网关服务在sentinel控制台显示不一样的菜单，代码如下。

```
-Dcsp.sentinel.app.type=1
```

假如是在idea中，可以参考下面的图中的配置方式，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/6dcbe1eba60843bb9f76a0a096e0288c.png)

Sentinel 控制台启动以后，界面如图所示:

![在这里插入图片描述](https://img-blog.csdnimg.cn/b95840a5af2345ca82c1359f9327229c.png)

说明,假如没有发现请求链路,API管理,关闭网关项目，关闭sentinel，然后重启sentinel,重启网关项目.

第四步：在sentinel面板中设置限流策略，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/0e445b42e362475693d1931dab185769.png)

第五步：通过url进行访问检测是否实现了限流操作

![在这里插入图片描述](https://img-blog.csdnimg.cn/e73c3311347149518b40cb54d388b361.png)

### 基于请求属性限流

这里我们编辑一下指定routeId的的限流策略如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/e44b8550ab2148549ca38ec4815ccc21.png)

配置好以后，通过http-client工具进行访问测试，

![在这里插入图片描述](https://img-blog.csdnimg.cn/b50917ad25914345860d3836a329c4ce.png)

### 自定义API维度限流（重点）

自定义API分组，是一种更细粒度的限流规则定义，它允许我们利用sentinel提供的API，将请求路径进行分组，然后在组上设置限流规则即可。

第一步：新建API分组，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/957a1a521e7243d086255e1c146f39bd.png)

第二步：新建分组流控规则，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/e8c770ad9c24488990094d84a67df768.png)

第三步：进行访问测试，如图所示

![在这里插入图片描述](https://img-blog.csdnimg.cn/4d0eeedfa83841c7bdba8d18ac308d20.png)

### 定制流控网关返回值

定义配置类，设计流控返回值，代码如下：

```java
@Configuration
public class GatewayConfig {
    public GatewayConfig(){
        GatewayCallbackManager.setBlockHandler( new BlockRequestHandler() {
            @Override
            public Mono<ServerResponse> handleRequest(ServerWebExchange serverWebExchange, Throwable throwable) {
                Map<String,Object> map=new HashMap<>();
                map.put("state",429);
                map.put("message","two many request");
                String jsonStr=JSON.toJSONString(map);
                return ServerResponse.ok().body(Mono.just(jsonStr),String.class);
            }
        });
    }
}
```

其中，Mono 是一个发出(emit)0-1个元素的Publisher对象。

### 小节面试分析？

- 网关层面结合sentinel实现限流，其限流的类型有几种？(两种-route id,api)
- 网关层面可以自定义限流后的异常处理结果吗？(可以)
- 你知道Sentinel底层限流的算法有哪些？(滑动窗口，令牌桶，漏斗，。。。)

## 总结（Summay）

### 重难点分析

- 网关(Gateway)诞生的背景?(第一:统一微服务访问的入口,第二:对系统服务进行保护,第三进行统一的认证,授权,限流)
- 网关的选型?(Netifix Zuul,Spring Cloud Gateway,…)
- Spring Cloud Gateway的入门实现(添加依赖,路由配置,启动类)
- Spring Cloud Gateway中的负载均衡?(网关服务注册,服务的发现,基于uri:lb://服务id方式访问具体服务实例)
- Spring Cloud Gateway中的断言配置?(掌握常用几个就可,用时可以通过搜索引擎去查)
- Spring Cloud Gateway中的过滤器配置?(掌握过滤器中的两大类型-局部和全局)
- Spring Cloud Gateway中的限流设计?(Sentinel)

### FAQ 分析

- Gateway在互联网架构中的位置?(nginx->gateway–>微服务–>微服务)
- Gateway底层负载均衡的实现?(Ribbon)
- Gateway应用过程中设计的主要概念?(路由id,路由uri,断言,过滤器)
- Gateway中你做过哪些断言配置?(after,header,path,cookie,…)
- Gateway中你用的过滤器有哪些?(添加前缀,去掉前缀,添加请求头,…,负载均衡,…)

### BUG分析

- 503 异常?(服务不可用,检查你调用的服务是否启动ok,路由uri写的是否正确)
- 启动时解析.yml配置文件异常(格式没有对齐,单词写错)