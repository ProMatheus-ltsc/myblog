# Sentinel简介
[[TOC]]

## 背景分析

在我们日常生活中，经常会在淘宝、天猫、京东、拼多多等平台上参与商品的秒杀、抢购以及一些优惠活动，也会在节假日使用12306 手机APP抢火车票、高铁票，甚至有时候还要帮助同事、朋友为他们家小孩拉投票、刷票，这些场景都无一例外的会引起服务器流量的暴涨，导致网页无法显示、APP反应慢、功能无法正常运转，甚至会引起整个网站的崩溃。
我们如何在这些业务流量变化无常的情况下，保证各种业务安全运营，系统在任何情况下都不会崩溃呢？我们可以在系统负载过高时，采用限流、降级和熔断，三种措施来保护系统，由此一些流量控制中间件诞生。例如Sentinel。

## Sentinel概述

Sentinel (分布式系统的流量防卫兵) 是阿里开源的一套用于服务容错的综合性解决方案。它以流量为切入点, 从流量控制、熔断降级、系统负载保护等多个维度来保护服务的稳定性。
Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景, 例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。

Sentinel核心分为两个部分:

- 核心库（Java 客户端）：能够运行于所有 Java 运行时环境，同时对Dubbo /Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）：基于 Spring Boot 开发，打包后可以直接运行。

## 安装Sentinel服务

Sentinel 提供一个轻量级的控制台, 它提供机器发现、单机资源实时监控以及规则管理等功能，其控制台安装步骤如下：
第一步：打开sentinel下载网址

```
https://github.com/alibaba/Sentinel/releases
```

第二步：下载Jar包（可以存储到一个sentinel目录），如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/0b91d84f243f4bd69332fadb34957325.png)

第三步：在sentinel对应目录，打开命令行(cmd),启动运行sentinel

```
java -Dserver.port=8180 -Dcsp.sentinel.dashboard.server=localhost:8180 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard-1.8.1.jar
```

检测启动过程，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/cdbfd274efbd44a7b19616cd0ae9d603.png)

## 访问Sentinal服务

第一步：假如Sentinal启动ok，通过浏览器进行访问测试，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/4b45f07341b24f4ebfbded128626f88e.png)

第二步：登陆sentinel,默认用户和密码都是sentinel,登陆成功以后的界面如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/f1b80b3a7a594fd9a5a4dcc0235ece9e.png)

## Sentinel限流入门

### 概述

我们系统中的数据库连接池，线程池，nginx的瞬时并发等在使用时都会给定一个限定的值，这本身就是一种限流的设计。限流的目的防止恶意请求流量、恶意攻击，或者防止流量超过系统峰值。

### 准备工作

第一步：Sentinel 应用于服务提供方(sca-provider)，在服务提供方添加依赖如下：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

第二步：打开服务提供方配置文件bootstrap.yml，添加sentinel配置，代码如下：

```yaml
spring:
  cloud:
    sentinel:
      transport:
         dashboard: localhost:8180 # 指定sentinel控制台地址。
```

第三步：创建一个用于演示限流操作的Controller对象，例如：

```java
package com.jt.provider.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/provider")
public class ProviderSentinelController {
       @GetMapping("/sentinel01")
       public String doSentinel01(){
           return "sentinel 01 test  ...";
       }
}
```

第三步：启动sca-provider服务，然后对指定服务进行访问，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/bb74c6b1c70748be99b6aa3b923cc191.png)

第四步：刷新sentinel 控制台，实时监控信息，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/5e0b40bfbb00430e8840c2b1ed279ba3.png)

Sentinel的控制台其实就是一个SpringBoot编写的程序，我们需要将我们的服务注册到控制台上，即在微服务中指定控制台的地址，并且还要在消费端开启一个与sentinel控制台传递数据端的端口，控制台可以通过此端口调用微服务中的监控程序来获取各种信息。

### Sentinel限流入门实践

我们设置一下指定接口的流控(流量控制)，QPS（每秒请求次数）单机阈值为1，代表每秒请求不能超出1次，要不然就做限流处理，处理方式直接调用失败。

第一步：选择要限流的链路，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/9304519fcc5d4ed78b71f4b0e3ce0680.png)

第二步：设置限流策略，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/fb6f5a0f3f5742b4b7b9b5e5cbc98b33.png)

第三步：反复刷新访问你的服务，检测是否有限流信息输出，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/4d867d822fe7495687ace8a36da8e914.png)

### 小节面试分析

- Sentinel是什么？(阿里推出一个流量控制平台，防卫兵)
- 类似Sentinel的产品你知道有什么？(hystrix)
- Sentinel是如何对请求进行限流的?(基于sentinel依赖提供的拦截器)
- 你了解哪些限流算法？(计数器、令牌桶、漏斗算法，滑动窗口算法，…)
- Sentinel 默认的限流算法是什么？(滑动窗口算法)

## Sentinel流控规则分析

### 阈值类型

- QPS(Queries Per Second)：当调用相关url对应的资源时，QPS达到单机阈值时，就会限流。
- 线程数：当调用相关url对应的资源时，线程数达到单机阈值时，就会限流。

### 设置限流模式

Sentinel的流控模式代表的流控的方式，默认【直接】，还有关联，链路。

> 直接模式

Sentinel默认的流控处理就是【直接->快速失败】。

![在这里插入图片描述](https://img-blog.csdnimg.cn/6793bc98f4714a49ab6d33842468966d.png)

> 关联模式

当关联的资源达到指定阈值，就限流自己。例如设置了关联资源为ur2时，假如关联资源url2的qps阀值超过1时，就限流url1接口（是不是感觉很霸道，关联资源达到阀值，是本资源接口被限流了）。这种关联模式有什么应用场景呢？我们举个例子，订单服务中会有2个重要的接口，一个是读取订单信息接口，一个是写入订单信息接口。在高并发业务场景中，两个接口都会占用资源，如果读取接口访问过大，就会影响写入接口的性能。业务中如果我们希望写入订单比较重要，要优先考虑写入订单接口。那就可以利用关联模式；在关联资源上面设置写入接口，资源名设置读取接口就行了；这样就起到了优先写入，一旦写入请求多，就限制读的请求。例如

第一步：在ProviderSentinelController中添加一个方法，例如：

```java
   @GetMapping("/sentinel02")
   public String doSentinel02(){
     return "sentinel 02 test  ...";
   }
```

第二步：在sentinel中做限流设计，例如

![在这里插入图片描述](https://img-blog.csdnimg.cn/7c7311a6ee0e48dd8f91f3479bf97424.png)

第三步：打开两个测试窗口，对/provider/sentinel02进行访问，检查/provider/sentinel01的状态,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/22477b852a6d43ae9be55a3a841e22a2.png)

> 链路模式

链路模式只记录指定链路入口的流量。也就是当多个服务对指定资源调用时，假如流量超出了指定阈值，则进行限流。被调用的方法用@SentinelResource进行注解，然后分别用不同业务方法对此业务进行调用，假如A业务设置了链路模式的限流,在B业务中是不受影响的。现在对链路模式做一个实践,例如:

例如现在设计一个业务对象，代码如下(为了简单,可以直接写在启动类内部)：

第一步:在指定包创建一个ResourceService类,代码如下:

```java
package com.jt.provider.service;
@Service
public class ResourceService{
    @SentinelResource("doGetResource")
    public String doGetResource(){
        return "doGetResource";
    }
}
```

第二步:在ProviderSentinelController中添加两个方法(相当于两条链路),例如:

```java
    @Autowired
    private ResourceService resourceService;
    @GetMapping("/sentinel03")
    public String doSentinel03(){
        resourceService.doGetResource();
        return "sentinel 03 test";
    }
    
    @GetMapping("/sentinel04")
    public String doSentinel04(){
       resourceService.doGetResource();
       return "sentinel 04 test";
    }
```

第三步:在sentinel中配置限流规则,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/3ade46d7fe654a58b4f5636f55a0c0eb.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/d7cb9adb35b14f5ba95a087128b22576.png)

设置链路流控规则后，再频繁对限流链路进行访问，检测是否会出现500异常,例如

![在这里插入图片描述](https://img-blog.csdnimg.cn/9204a0d9f50f4499b7bf9e815ed6fc81.png)

说明，流控模式为链路模式时，假如是sentinel 1.7.2以后版本，Sentinel Web过滤器默认会聚合所有URL的入口为sentinel_spring_web_context，因此单独对指定链路限流会不生效，需要在springboot配置文件application.yml中,添加如下语句来关闭URL PATH聚合,例如：

```yaml
sentinel:
     web-context-unify: false
```

当设置了这个配置后，启动服务，访问链路,就可以对指定的特定链路进行限流了,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/ddc93636e9a94956a6d78f56d22f3b99.png)

这里可以配置对入口为/provider/sentinel03的链路进行资源访问限流,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/6b1c39c0d14049ae8a01614c5674c8fa.png)

配置好限流规则后可以分别通过/provider/sentinel03和/provider/sentinel04进行访问测试,检测是否会出现链路限流.

我们也可以基于@SentinelResource注解描述的方法进行限流后的异常进行自定义处理，其步骤如下：

第一步:定义blockHandlerClass,例如:

```java
package com.jt.provider.service;

import com.alibaba.csp.sentinel.slots.block.BlockException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
@Slf4j
@Component
public class ResourceBlockHandler {
    /**
     * 限流后的异常处理方法,应用于@SentinelResource注解中,
     * 此方法在编写时有如下几个要求:
     * 1)方法修饰符为public
     * 2)必须为static方法
     * 3)返回值类型与@SentinelResource注解描述的方法相同
     * 4)参数类型为BlockException
     * 5)方法名自己定义
     * @param ex
     * @return
     */
    public static String doHandle(BlockException ex){
        log.error("block exception {}", ex.getMessage());
        return "访问太频繁了,稍等片刻再访问";
    }
}
```

第二步:修改@SentinelResource注解中的属性定义,例如:

```java
@SentinelResource(value="doGetResource",
        blockHandlerClass = ResourceBlockHandler.class,
        blockHandler = "doHandle")
public String doGetResource(){
    return "do get resource";
}
```

第三步:在controller方法中,调用@Sentinel注解描述的方法,例如:

```java
/**
 * 演示链路限流
 * @return
 */
@GetMapping("/sentinel03")
public String doSentinel03(){
   return resourceService.doGetResource();
   //return "sentinel 03 test";
}
```

### 小节面试分析

- 你了解sentinel中的阈值应用类型吗?（两种-QPS,线程数）
- Sentinel的限流规则中默认有哪些限流模式?(直连，关联，链路)
- Sentinel的限流效果有哪些？(快速失败，预热，排队)

## Sentinel降级应用实践

### 概述

除了流量控制以外，对调用链路中不稳定的资源进行熔断降级也是保障高可用的重要措施之一。由于调用关系的复杂性，如果调用链路中的某个资源不稳定，最终会导致请求发生堆积。
Sentinel 熔断降级会在调用链路中某个资源出现不稳定状态时（例如调用超时或异常比例升高），对这个资源的调用进行限制，让请求快速失败，避免影响到其它的资源而导致级联错误。当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断（默认行为是抛出 DegradeException）。

### 准备工作

在ProviderController 类中添加doSentinel05方法,基于此方法演示慢调用过程下的限流,代码如下:

```java
     //AtomicLong 类支持线程安全的自增自减操作
    private AtomicLong atomicLong=new AtomicLong(1);
    @GetMapping("/sentinel05")
    public  String doSentinel05() throws InterruptedException {
        //获取自增对象的值,然后再加1
        long num=atomicLong.getAndIncrement();
        if(num%2==0){//模拟50%的慢调用比例
           Thread.sleep(200);
        }
        return "sentinel 04 test";
    }
```

说明,我们在此方法中设置休眠,目的是为了演示慢调用(响应时间比较长).

### Sentinel降级入门

接下来,我们基于一个请求链路,进行服务降级及应用实践,例如:
第一步：服务启动后，选择要降级的链路，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/19572237364649b8b9d3ff279183134d.png)

第二步：选择要降级的链路，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/56277a5be5b5465ba8693b73273175c0.png)

这里的熔断策略默认选择"慢调用比例"，表示统计时常范围内请求数超过3时，假如有30%的请求的平均响应时间超过200毫秒，则对请求进行熔断，熔断时长为20秒钟，在20秒之内不能对这个服务进行访问，20秒以后恢复正常。

第三步：对指定链路(例如http://localhost:8081/provider/sentinel05)进行访问刷新，多次访问测试，检测页面上是否会出现限流（底层默认的熔断异常为DegradeException），可以自己在异常处理器(假如是默认的，可在DefaultBlockExceptionHandler中加断点)中进行断点分析。

### 小节面试分析

- 何为降级熔断？（让外部应用停止对服务的访问，生活中跳闸，路障设置-此路不通）
- 为什么要进行熔断呢？(平均响应速度越来越慢或经常出现异常，这样可能会导致调用链堆积，最终系统崩溃)
- Sentinel中限流，降级的异常父类是谁？(BlockException)
- Sentinel 出现降级熔断时，系统底层抛出的异常是谁？(DegradeException)
- Sentinel中异常处理接口是谁？（BlockExceptionHandler）
- Sentinel中异常处理接口下默认的实现类为? (DefaultBlockExceptionHandler)
- 假如Sentinel中默认的异常处理规则不满足我们的需求怎么办?(自己定义)
- 我们如何自己定义Sentinel中异常处理呢？（直接或间接实现BlockExceptionHandler ）
- Sentinel熔断降级策略有哪些?(慢调用比例、异常比例、异常数)

## Sentinel热点规则分析（重点）

### 概述

何为热点？热点即经常访问的数据。比如：

- 商品 ID 为参数，统计一段时间内最常购买的商品 ID 并进行限制。
- 用户 ID 为参数，针对一段时间内频繁访问的用户 ID 进行限制。

热点参数限流会统计传入参数中的热点数据，并根据配置的限流阈值与模式，对包含热点参数的资源调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。其中，Sentinel会利用 LRU 策略统计最近最常访问的热点参数，结合令牌桶算法来进行参数级别的流控。

### 快速入门

第一步：在sca-provider中的ResourceBlockHandler类中添加异常处理方法，例如：

```java
public static String doHandle(Integer id,BlockException ex){
    log.error("被限流了.....,{}",ex);
    return "访问太频繁了....";
}
```

第二步：在sca-provider中ResourceService类中添加基于id查询数据的业务方法，例如：

```java
@SentinelResource(value="resource",
        blockHandlerClass = ResourceBlockHandler.class,
        blockHandler = "doHandle")
public String doGetResource(Integer id){
    //....
    return "the data's id is "+id;
}
```

第三步：在sca-provider中的ProviderSentinelController中添加如下方法,例如：

```java
        @GetMapping("/sentinel/sentinel06")
        public String doFindById(@RequestParam("id") Integer id){
            return resourceService.doGetResource(id);
        }
```

第四步：服务启动后，选择要限流的热点链路，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/84cfb24a055b488f97bacf2133c3ba93.png)

第五步：设置要限流的热点，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/ec345b70891e467fba5440c32b8b03d4.png)

热点规则的限流模式只有QPS模式。参数索引为@SentinelResource注解的方法参数下标，0代表第一个参数，1代表第二个参数。单机阈值以及统计窗口时长表示在此窗口时间超过阈值就限流。

第六步：多次访问热点参数方法，前端会出现如下界面，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/d5db81f3086447b0a2fd8b9012886bde.png)

然后，在页面出现我们自己定义的限流信息或者后台出现如下异常表示限流成功。

```
com.alibaba.csp.sentinel.slots.block.flow.param.ParamFlowException: 2
```

### 特定参数设计

热点参数其实说白了就是特殊的流控，我们还可以基于热点参数的具体值进行限流。可以通过配置参数例外项进行实现，我们现在来编辑一下热点规则，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/806d5af24e0c4ec3975ea376f5a2eb0d.png)

点击编辑后出现如下页面，然后添加参数例外项，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/46f1ff1f52ec4812b6166b78debb1db3.png)

其中,这里表示参数值为20时阈值为100，其它参数值阈值为1.

### 小节面试分析

- 如何理解热点数据？(访问频度比较高的数据，某些商品、谋篇文章、某个视频)
- 热点数据的限流规则是怎样的?(主要是针对参数进行限流设计)
- 热点数据中的特殊参数如何理解？(热点限流中的某个参数值的阈值设计)
- 对于热点数据的访问出现限流以后底层异常是什么？(ParamFlowException)

## Sentinel系统规则（了解）

### 概述

系统在生产环境运行过程中，我们经常需要监控服务器的状态，看服务器CPU、内存、IO等的使用率；主要目的就是保证服务器正常的运行，不能被某些应用搞崩溃了；而且在保证稳定的前提下，保持系统的最大吞吐量。

### 快速入门

Sentinel的系统保护规则是从应用级别的入口流量进行控制，从单台机器的总体 Load（负载）、RT（响应时间）、入口 QPS 、线程数和CPU使用率五个维度监控应用数据，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/10caa09efd5d4675af137023702862db.png)

系统规则是一种全局设计规则，其中，

- Load（仅对 Linux/Unix-like 机器生效）：当系统 load1 超过阈值，且系统当前的并发线程数超过系统容量时才会触发系统保护。系统容量由系统的 maxQps * minRt 计算得出。设定参考值一般是 CPU cores * 2.5。
- CPU使用率：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0）。
- RT：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。
- 线程数：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。
- 入口 QPS：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。

说明，系统保护规则是应用整体维度的，而不是资源维度的，并且仅对入口流量生效。入口流量指的是进入应用的流量（EntryType.IN），比如 Web 服务。

### 小节面试分析

- 如何理解sentinel中的系统规则？(是对所有链路的控制规则,是一种系统保护策略)
- Sentinel的常用系统规则有哪些？(RT,QPS,CPU,线程,Load-linux,unix)
- Sentinel系统保护规则被触发以后底层会抛出什么异常？（SystemBlockException）

## Sentinel授权规则(重要)

### 概述

很多时候，我们需要根据调用方来限制资源是否通过，这时候可以使用 Sentinel 的黑白名单控制的功能。黑白名单根据资源的请求来源（origin）限制资源是否通过，若配置白名单则只有请求来源位于白名单内时才可通过；若配置黑名单则请求来源位于黑名单时不通过，其余的请求通过。例如微信中的黑名单。

### 快速入门

sentinel可以基于黑白名单方式进行授权规则设计，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/8a15064e0635498ab0ab219f5823ab35.png)

黑白名单规则（AuthorityRule）非常简单，主要有以下配置项：

- 资源名:即限流规则的作用对象
- 流控应用:对应的黑名单/白名单中设置的规则值,多个值用逗号隔开.
- 授权类型:白名单，黑名单(不允许访问).

案例实现:

定义请求解析器,用于对请求进行解析,并返回解析结果,sentinel底层在拦截到用户请求以后,会对请求数据基于此对象进行解析,判定是否符合黑白名单规则,例如:

第一步:定义RequestOriginParser接口的实现类，在接口方法中解析请求参数数据并返回,底层会基于此返回值进行授权规则应用。

```java
@Component
public class DefaultRequestOriginParser implements RequestOriginParser {
    @Override
    public String parseOrigin(HttpServletRequest request) {
        String origin = request.getParameter("origin");//这里的参数名会与请求中的参数名一致
        return origin;
    }
}
```

第二步:定义流控规则,如图所示:

![在这里插入图片描述](https://img-blog.csdnimg.cn/8a15064e0635498ab0ab219f5823ab35.png)

第三步:执行资源访问,检测授权规则应用,当我们配置的流控应用值为app1时，假如规则为黑名单，则基于
http://ip:port/path?origin=app1的请求不可以通过,其请求处理流程如图下:

![在这里插入图片描述](https://img-blog.csdnimg.cn/e52accb4d5e440f99de25aac27544a14.png)

> 拓展：尝试基于请求ip等方式进行黑白名单的规则设计,例如：

第一步: 修改请求解析器,获取请求ip并返回,例如:

```java
@Component
public class DefaultRequestOriginParser  implements RequestOriginParser {
    //解析请求源数据
    @Override
    public String parseOrigin(HttpServletRequest request) {
        //获取访问请求中的ip地址,基于ip地址进行黑白名单设计（例如在流控应用栏写ip地址）
        String ip= request.getRemoteAddr();
        System.out.println("ip="+ip);
        return ip;
    }//授权规则中的黑白名单的值,来自此方法的返回值
}
```

第二步:在sentinel控制台定义授权规则,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/e6b4a6455ba34ed09e42ab1aa2e1ff74.png)

第三步:规则定义后以后,基于你的ip地址,进行访问测试,检测黑白名单效果.

### 小节面试分析

- 如何理解Sentinel中的授权规则？(对指定资源的访问给出的一种简易的授权策略)
- Sentinel的授权规则是如何设计的？(白名单和黑名单)
- 如何理解Sentinel中的白名单？（允许访问的资源名单）
- 如何理解Sentinel中的黑名单？（不允许访问的资源名单）、
- Sentinel如何识别白名单和黑名单？(在拦截器中通过调用RequestOriginParser对象的方法检测具体的规则)
- 授权规则中RequestOriginParser类的做用是什么？（对流控应用值进行解析，检查服务访问时传入的值是否与RequestOriginParser的parseOrigin方法返回值是否相同。）

## 总结(Summary)

总之，Sentinel可为秒杀、抢购、抢票、拉票等高并发应用，提供API接口层面的流量限制，让突然暴涨而来的流量用户访问受到统一的管控，使用合理的流量放行规则使得用户都能正常得到服务。

### 重难点分析

- Sentinel诞生的背景?(计算机的数量是否有限,处理能力是否有限,并发比较大或突发流量比较大)
- 服务中Sentinel环境的集成,初始化?(添加依赖-两个,sentinel配置)
- Sentinel 的限流规则?(阈值类型-QPS&线程数,限流模式-直接,关联,链路)
- Sentinel 的降级(熔断)策略?(慢调用,异常比例,异常数)
- Sentinel 的热点规则设计(掌握)?
- Sentinel 系统规则设计?(了解,全局规则定义,针对所有请求有效)
- Sentinel 授权规则设计?(掌握,黑白名单)

### FAQ分析


- 为什么要限流?(请求大,资源处理能力不足）
- 你了解的那些限流框架?(sentinel)
- 常用的限流算法有那些?(计数,令牌桶-电影票,漏桶-漏斗,滑动窗口)
- Sentinel有哪些限流规则?(QPS,线程数)
- Sentinel有哪些限流模式?(直接,关联-创建订单和查询订单,链路限流-北京六环外不限号,但是五环就限号)
- Sentinel 的降级(熔断)策略有哪些?(慢调用-响应时长,异常比例-异常占比,异常数)
- Sentinel 的热点规则中的热点数据?(热卖商品,微博大咖,新上映的电影)
- 如何理解Sentinel 授权规则中的黑白名单?
- Sentinel如何实现限流的?(对请求进行拦截,然后通过限流算法对请求进行限制)
- Sentinel这里默认使用的限流拦截器是谁?(AbstractSentinelInterceptor->HandlerInterceptor的子类)
- 你了解Sentinel限流有哪些算法? (计数器,令牌桶,漏桶,滑动窗口算法~sentinel默认)
- Sentinel中出现限流异常的父类类型是什么?(BlockException)
- Sentinel中默认的限流异常处理器是谁? (DefaultBlockExceptionHandler)
- 我们可以自定义限流异常处理器吗?(直接或间接实现BlockExceptionHandler接口并交给spring管理)
- 你了解Sentinel有哪些阈值类型?(QPS,线程数)
- 如何理解Sentinel的关联限流?(霸权方式,当对A的资源的访问量比较大时,限流其它资源的访问)
- 如何理解Sentinel的链路限流?(对同一个资源的访问,可能会有多条链路,可以对指定链路进行限流)
- @SentinelResource注解的作用是什么?(定义限流切入点方法,底层可以基于aop方式对请求链路进行限制)
- Sentinel常见的流控效果有哪些?(快速失败,warm up,排队等待)
- 如何理解服务的降级？(系统出现大量的慢调用或一些异常，可以对这些服务进行熔断-暂时关闭系统)
- 如何理解慢调用？(客户端发起一个请求，得到服务端的响应比较慢)
- 服务出现熔断时，系统底层抛出的异常是什么？（DegradeException）
- 如何理解热点数据？(频繁访问的数据-例如文章、视频、图片、…)
- 对热点数据限流时，底层基于什么机制去实现的？(AOP)
- 假如是你去设计sentinel，你如何判定哪些数据是热点数据?(LRU算法)
- Java中是否有对象直接封装了对LRU算法的实现？(LinkedHashMap)
- 如何理解sentinel中的系统规则？(sentinel中的一种全局规则，不局限于某个资源)
- 你了解Sentinel中的哪些系统全局规则呢？(CPU,RT,QPS,线程数量)
- 如何理解Sentinel中的授权规则？(对资源的访问限制，不是基于频次进行限制，基于自定义的黑白名单)
- Sentinel中解析黑白名单数据的规范接口是谁？（RequestOriginParser）
- Sentinel中授权规则对应的异常对象是谁？（AuthorityException）
- 请求传到tomcat后，这个Web服务器是如何处理请求的？
  
![](https://img-blog.csdnimg.cn/089998a2ffe6429694f70dfca557ba03.png)


### Bug分析

- 依赖下载失败 (maven-本地库,网络,镜像仓库)
- 单词错误(拼写错误)