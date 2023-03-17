# Tomcat入门基础
[[TOC]]


## WebSocket概念



在WebSocket概念出来之前，如果页面要不停地显示最新的价格，那么必须不停地刷新页面，或者用一段js代码每隔几秒钟发消息询问服务器数据。

而使用WebSocket技术之后，当服务器有了新的数据，会主动通知浏览器。

### 优点

1. 节约带宽。 不停地轮询服务端数据这种方式，使用的是http协议，head信息很大，有效数据占比低， 而使用WebSocket方式，头信息很小，有效数据占比高。
2. 无浪费。 轮询方式有可能轮询10次，才碰到服务端数据更新，那么前9次都白轮询了，因为没有拿到变化的数据。 而WebSocket是由服务器主动回发，来的都是新数据。
3. 实时性，考虑到服务器压力，使用轮询方式不可能很短的时间间隔，否则服务器压力太多，所以轮询时间间隔都比较长，好几秒，设置十几秒。 而WebSocket是由服务器主动推送过来，实时性是最高的

## Web相关概念回顾

### 软件架构

C/S:客户端/服务器端

B/S:浏览器/服务器端

### 资源分类

静态资源:所有用户访问后,得到的结果都是一样的.如html,css,JavaScript.可以被浏览器啊直接解析.

动态资源:每个用户访问相同资源后,得到的结果可能不一样.如servelt/jsp,php,asp.动态资源被访问后,需要先转换为静态资源,再返回给浏览器.

### 网络通信三要素

#### IP:电子设备在网络中的唯一标识

#### 端口:应用程序在计算机中的唯一标识

#### 传输协议:规定了数据传输的规则

基础协议:

tcp:安全协议,三次握手.速度稍慢

udp:不安全协议,速度快

## Web服务器软件

### 服务器

安装了服务器软件的计算机

### 服务器软件

接收用户的请求,处理请求,做出响应

### Web服务器软件

在web服务器软件中,可以部署web项目,让用户通过浏览器来访问这些项目.

### 常见的java相关的web服务器软件

webLogic:oracle公司,大型的java EE服务器,支持所有的javaE规范,收费的.

webSphere:IBM公司,大型的java EE服务器,支持所有的javaE规范,收费的.

JBOSS:JBOSS公司,大型的java EE服务器,支持所有的javaE规范,收费的.

Tomcat:Apache基金组织,中小型的JavaEE服务器,仅仅支持少量的JavaEE规范servelt/jsp.开源的,免费的.

### Tomcat

Tomcat是Apache 软件基金会（Apache Software Foundation）的Jakarta 项目中的一个核心项目，由Apache、Sun 和其他一些公司及个人共同开发而成。由于有了Sun 的参与和支持，最新的Servlet 和JSP 规范总是能在Tomcat 中得到体现，因为Tomcat 技术先进、性能稳定，而且免费，因而深受Java 爱好者的喜爱并得到了部分软件开发商的认可，成为目前比较流行的Web 应用服务器。

主要作用:
1, 你的项目资源必须放入 Tomcat里,才能被浏览器 看到
2, 接受这次请求,并处理请求
3, 如果浏览器需要一个结果, 服务器就需要返回一个结果

#### Tomcat下载

- Tomcat官方网站：http://tomcat.apache.org/
- 安装版：需要安装，一般不考虑使用。
- 解压版: 直接解压缩使用，我们使用的版本。
- **因为tomcat服务器软件需要使用java环境，所以需要正确配置JAVA_HOME**。

![在这里插入图片描述](https://img-blog.csdnimg.cn/614b3fbdd01c4b52a7cb2c44c999c05b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### Tomcat的版本

- 版本：企业用的比较广泛的是7.0和8.0的。授课我们使用8.0。
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/46ce9b5e4748428baf0ab74c5f0eb8b5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### Tomcat文件目录--安装

解压apache-tomcat-8.5.27-windows-x64.zip到**非中文无空格**目录中

![在这里插入图片描述](https://img-blog.csdnimg.cn/d41e245a681a4daebcd4b04400d9ff04.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_19,color_FFFFFF,t_70,g_se,x_16)

D:\developer_tools\apache-tomcat-8.5.27，这个目录下直接包含Tomcat的bin目录，conf目录等，我们称之为**Tomcat的安装目录或根目录**。

- bin：该目录下存放的是二进制可执行文件，如果是安装版，那么这个目录下会有两个exe文件：tomcat6.exe、tomcat6w.exe，前者是在控制台下启动Tomcat，后者是弹出GUI窗口启动Tomcat；如果是解压版，那么会有startup.bat和shutdown.bat文件，startup.bat用来启动Tomcat，但需要先配置JAVA_HOME环境变量才能启动，shutdawn.bat用来停止Tomcat；
- conf：这是一个非常非常重要的目录，这个目录下有四个最为重要的文件：
  - **server.xml：配置整个服务器信息。例如修改端口号。默认HTTP请求的端口号是：8080**
  - tomcat-users.xml：存储tomcat用户的文件，这里保存的是tomcat的用户名及密码，以及用户的角色信息。可以按着该文件中的注释信息添加tomcat用户，然后就可以在Tomcat主页中进入Tomcat Manager页面了；
  - web.xml：部署描述符文件，这个文件中注册了很多MIME类型，即文档类型。这些MIME类型是客户端与服务器之间说明文档类型的，如用户请求一个html网页，那么服务器还会告诉客户端浏览器响应的文档是text/html类型的，这就是一个MIME类型。客户端浏览器通过这个MIME类型就知道如何处理它了。当然是在浏览器中显示这个html文件了。但如果服务器响应的是一个exe文件，那么浏览器就不可能显示它，而是应该弹出下载窗口才对。MIME就是用来说明文档的内容是什么类型的！
  - context.xml：对所有应用的统一配置，通常我们不会去配置它。
- lib：Tomcat的类库，里面是一大堆jar文件。如果需要添加Tomcat依赖的jar文件，可以把它放到这个目录中，当然也可以把应用依赖的jar文件放到这个目录中，这个目录中的jar所有项目都可以共享之，但这样你的应用放到其他Tomcat下时就不能再共享这个目录下的jar包了，所以建议只把Tomcat需要的jar包放到这个目录下；
- logs：这个目录中都是日志文件，记录了Tomcat启动和关闭的信息，如果启动Tomcat时有错误，那么异常也会记录在日志文件中。
- temp：存放Tomcat的临时文件，这个目录下的东西可以在停止Tomcat后删除！
- **webapps：存放web项目的目录，其中每个文件夹都是一个项目**；如果这个目录下已经存在了目录，那么都是tomcat自带的项目。其中ROOT是一个特殊的项目，在地址栏中访问：http://127.0.0.1:8080，没有给出项目目录时，对应的就是ROOT项目。http://localhost:8080/examples，进入示例项目。其中examples就是项目名，即文件夹的名字。
- work：运行时生成的文件，最终运行的文件都在这里。通过webapps中的项目生成的！可以把这个目录下的内容删除，再次运行时会生再次生成work目录。当客户端用户访问一个JSP文件时，Tomcat会通过JSP生成Java文件，然后再编译Java文件生成class文件，生成的java和class文件都会存放到这个目录下。
- LICENSE：许可证。
- NOTICE：说明文件。

| 名称    | 作用             |
| ------- | ---------------- |
| bin     | 可执行文件       |
| conf    | 配置文件         |
| lib     | 依赖jar包        |
| logs    | 日志文件         |
| temps   | 临时文件         |
| webapps | 存放web项目      |
| work    | 存放运行时的数据 |

#### 配置Java

启动Tomcat前，需要配置如下的环境变量

① 配置JAVA_HOME环境变量

![在这里插入图片描述](https://img-blog.csdnimg.cn/302de77efdb14c349bd793c807af358b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

② 在Path环境变量中加入JAVA_HOME\bin目录

![在这里插入图片描述](https://img-blog.csdnimg.cn/222cbc1e16cd419db3856a762e2aeb85.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 启动

在命令行中运行**catalina run**或者 Tomcat解压目录下**双击startup.bat** 启动Tomcat服务器，在浏览器地址栏访问如下地址进行测试

**http://localhost:8080**

![在这里插入图片描述](https://img-blog.csdnimg.cn/71891a28f11e4dc4bf2685972fcf7244.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

如果启动失败，查看如下的情况：

情况一：如果双击startup.bat后窗口一闪而过，请查看JAVA_HOME是否配置正确。

> startup.bat会调用catalina.bat，而catalina.bat会调用setclasspath.bat，setclasspath.bat会使用JAVA_HOME环境变量，所以我们必须在启动Tomcat之前把JAVA_HOME配置正确。

情况二：如果启动失败，提示端口号被占用，则将默认的8080端口修改为其他未使用的值，例如8989等。

【方法】 打开：解压目录\conf\server.xml，找到第一个Connector标签，修改port属性

> web服务器在启动时，实际上是监听了本机上的一个端口，当有客户端向该端口发送请求时，web服务器就会处理请求。但是如果不是向其所监听的端口发送请求，web服务器不会做任何响应。例如：Tomcat启动监听了8989端口，而访问的地址是[http://localhost:8080](http://localhost:8080/)，将不能正常访问。

#### 静态项目导入方式

将静态的web项目导入到tomcat目录之下如图所示:

![在这里插入图片描述](https://img-blog.csdnimg.cn/981f0ebb748a4f27859c4394bf3d4967.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

2. 效果展现
   
![在这里插入图片描述](https://img-blog.csdnimg.cn/a93a7b4dcb1b4435bf1957d1d391050d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 在IDEA中创建Tomcat

在IDEA中配置好Tomcat后，可以直接通过IDEA控制Tomcat的启动和停止，而不用再去操作startup.bat和shutdown.bat。

① 点击File–>Settings 或者直接点击图标

![在这里插入图片描述](https://img-blog.csdnimg.cn/292301d630114ac5a9f690303cba85bb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

下一步:

![在这里插入图片描述](https://img-blog.csdnimg.cn/9d7011c348574865b3034f8a25961aa1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)


下一步：

![在这里插入图片描述](https://img-blog.csdnimg.cn/c6033227bb024886b0c63d1a7271f60a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 动态Web工程部署与测试

创建动态Web工程

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad549b81d6ac495597d6526b1b72c914.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

接着：

![在这里插入图片描述](https://img-blog.csdnimg.cn/268fb814bb1b4b58888469864f23fbd0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/5a651cee12a24199830ce07718614315.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)



#### 关于IDEA高级版本创建WEB项目说明

[IDEA高级版本说明配置说明](https://blog.csdn.net/llplllll/article/details/116903198)

![在这里插入图片描述](https://img-blog.csdnimg.cn/34549e2f3b8e4602b62e9e5a02ee0905.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 开发项目目录结构说明

- **src：存放Java源代码的目录。**

- web：存放的是需要部署到服务器的文件

  - WEB-INF：

    这个目录下的文件，是不能被客户端直接访问的。

    - **lib：用于存放该工程用到的库。粘贴过来以后**
    - **web.xml：web工程的配置文件，完成用户请求的逻辑名称到真正的servlet类的映射。**

  > 凡是客户端能访问的资源(*.html或 *.jpg)必须跟WEB-INF在同一目录，即放在Web根目录下的资源，从客户端是可以通过URL地址直接访问的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ea16cd40dade48e59dc520a240fc867d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### tomcat实例的基础设置

由于每次创建项目随之创建的tomcat实例名字都类似，所以建议修改一下tomcat实例的名称

![在这里插入图片描述](https://img-blog.csdnimg.cn/89501ad62fff436281269fea8e139280.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

在如下界面进行基础设置

![在这里插入图片描述](https://img-blog.csdnimg.cn/6d878da0497f4985a85b504158a76aec.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 修改服务器端口号

##### 修改本地tomcat端口号

位置: E:\atguigu_workspace\soft\apache-tomcat-8.5.27\conf\server.xml

![在这里插入图片描述](https://img-blog.csdnimg.cn/3397faea8e554e4ab373b25476cca54a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

修改端口号:

![在这里插入图片描述](https://img-blog.csdnimg.cn/11d145a2d0c54a01a3984a48554d45e6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

##### 通过IDEA修改

说明: 通过IDEA修改,相当于修改的是tomcat的镜像,不会修改真实的tomcat服务器的配置

![在这里插入图片描述](https://img-blog.csdnimg.cn/67c275c73f2244aa8c2481306a243e75.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 关于IDEA 配置tomcat的说明

#####  普通java项目变为web项目

说明: 
1. 在常规的java项目的基础之上右键 Add Framework Support

![在这里插入图片描述](https://img-blog.csdnimg.cn/7dba869ca8ac4bfdabb080e99bd381df.png)

2. 勾选Web应用
   
![在这里插入图片描述](https://img-blog.csdnimg.cn/5413cc2ea214420a99e9870bdc96711c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

##### 配置war包信息

1. web项目默认的打包路径
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/f7eae0a4278d4bcd98f21a5c25aad066.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)
  
2. tomcat部署配置
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/e0336fb49a694a5b80a0a59987e27421.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

3. 项目war包文件配置
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/ab68b0172a4f4251ba53cf1df53a8910.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## Servelt

### 什么是Servlet

- 从广义上来讲，
  Servlet（Server Applet）是Java Servlet的简称，称为小服务程序或服务连接器，用Java编写的服务器端程序，具有独立于平台和协议的特性，主要功能在于交互式地浏览和生成数据，生成动态Web内容。
  Servlet规范是Sun公司制定的一套技术标准，包含与Web应用相关的一系列接口，是Web应用实现方式的宏观解决方案。而具体的Servlet容器负责提供标准的实现。
- 从狭义上来讲，Servlet指的是javax.servlet.Servlet接口及其子接口，也可以指实现了Servlet接口的实现类。
- Servlet（**Server Applet**）作为服务器端的一个组件，它的本意是“服务器端的小程序”。
  - **Servlet的实例对象由Servlet容器负责创建；**
  - **Servlet的方法由容器在特定情况下调用；**
  - **Servlet容器会在Web应用卸载时销毁Servlet对象的实例。**

### Servlet工作的原理

原理说明:
1. 客户端发起http请求
2. Servlet机制接收用户请求,并且交给后端业务进行处理
3. 业务层根据逻辑实现数据CURD操作.
   
![在这里插入图片描述](https://img-blog.csdnimg.cn/82843c381c0f40be9f425d830da9fdc9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### Servlet入门案例

#### 新建web项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/e5de94bfd26b440fa30036c252f4d2c3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_11,color_FFFFFF,t_70,g_se,x_16)

#### 导入jar包文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/0c48d9d1cebb449ba5ddc9eec0c65502.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_11,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/38a8b18f908540619f5cad7a50c7bec2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_17,color_FFFFFF,t_70,g_se,x_16)

#### 创建HelloServlet

```java
package com.atguigu.servlet;

import javax.servlet.*;
import java.io.IOException;

public class HelloServlet implements Servlet {
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    /**
     * 处理客户端的请求和响应
     * @param servletRequest
     * @param servletResponse
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("这是一个Servlet入门案例方法");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}

```

#### 编辑web.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--定义Servlet的配置信息-->
    <servlet>
        <!--1.1 定义Servlet名称 一般都是类名首字母小写 必须添加名称-->
        <servlet-name>helloServlet</servlet-name>
        <!--1.2 必须指定Servlet的全路径 -->
        <servlet-class>com.atguigu.servlet.HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <!--1.3 定义Servlet的映射关系  名称必须相同 -->
        <servlet-name>helloServlet</servlet-name>
        <!--1.4 定义servlet的请求路径 必须以/ 开头-->
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
```

#### 配置tomcat服务器

![在这里插入图片描述](https://img-blog.csdnimg.cn/ee76eced28c743418478cf40d09a8f27.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 编辑html页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>测试Servlet请求</title>
</head>
<body>
    <h1>测试Servlet操作</h1>
    <!-- 注意事项: 由于项目名称前缀,所以 href采用相对路径的写法 -->
    <a href="hello">HelloServlet测试</a>
    <!--<a href="/hello">HelloServlet测试</a>-->
</body>
</html>
```

### Servlet作用总结

- 接收请求 【解析请求报文中的数据：请求参数】
- 处理请求 【DAO和数据库交互】
- 完成响应 【设置响应报文】

![在这里插入图片描述](https://img-blog.csdnimg.cn/eac73d352bfd4e7891b408b9fb1fc579.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### Servlet生命周期

#### Servlet生命周期概述

- 应用程序中的对象不仅在空间上有层次结构的关系，在时间上也会因为处于程序运行过程中的不同阶段而表现出不同状态和不同行为——这就是对象的生命周期。
- 简单的叙述生命周期，就是对象在容器中从开始创建到销毁的过程。

#### Servlet容器

Servlet对象是Servlet容器创建的，生命周期方法都是由容器调用的。这一点和我们之前所编写的代码有很大不同。在今后的学习中我们会看到，越来越多的对象交给容器或框架来创建，越来越多的方法由容器或框架来调用，开发人员要尽可能多的将精力放在业务逻辑的实现上。

#### Servlet生命周期的主要过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/c4e89cfa059347a7929b5a6c489007e8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

##### Servlet对象的创建：构造器

- 默认情况下，**Servlet容器第一次收到HTTP请求时创建对应Servlet对象。**
- 容器之所以能做到这一点是由于我们在注册Servlet时提供了全类名，容器使用反射技术创建了Servlet的对象。

##### Servlet对象初始化：init()

- Servlet容器**创建Servlet对象之后，会调用init(ServletConfig config)**方法。
- 作用：是在Servlet对象创建后，执行一些初始化操作。例如，读取一些资源文件、配置文件，或建立某种连接（比如：数据库连接）
- init()方法只在创建对象时执行一次，以后再接到请求时，就不执行了
- 在javax.servlet.Servlet接口中，public void init(ServletConfig config)方法要求容器将ServletConfig的实例对象传入，这也是我们获取ServletConfig的实例对象的根本方法。

##### 处理请求：service()

- 在javax.servlet.Servlet接口中，定义了**service(ServletRequest req, ServletResponse res)**方法处理HTTP请求。
- 在每次接到请求后都会执行。
- 上一节提到的Servlet的作用，主要在此方法中体现。
- 同时要求容器将ServletRequest对象和ServletResponse对象传入。

##### Servlet对象销毁：destroy()

- 服务器重启、服务器停止执行或Web应用卸载时会销毁Servlet对象，会调用public void destroy()方法。
- 此方法用于销毁之前执行一些诸如释放缓存、关闭连接、保存内存数据持久化等操作。

#### Servlet请求过程

- 第一次请求
  - 调用构造器，创建对象
  - 执行init()方法
  - 执行service()方法
- 后面请求
  - 执行service()方法
- 对象销毁前
  - 执行destroy()方法

### Servlet使用方式

#### GenericServlet

说明: 使用GenericServlet 只需要编辑service() 方法即可

```java
public class MyServlet extends GenericServlet {

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("使用GenericServlet实现业务调用");
    }
}
```

####  HttpServlet

说明: 使用HttpServlet只需要专注GET/POST请求即可

```java
public class MyServlet2 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
        System.out.println("这里是get提交");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
        System.out.println("这里是post提交");
    }
}

```

### Servlet中接口调用

#### ServletConfig接口说明

说明: 每个Servlet都有各自的ServletConfig对象

- **ServletConfig接口封装了Servlet配置信息**，这一点从接口的名称上就能够看出来。
- **每一个Servlet都有一个唯一对应的ServletConfig对象**，代表当前Servlet的配置信息。
- 对象由Servlet容器创建，并传入生命周期方法init(ServletConfig config)中。可以直接获取使用。
- 代表当前Web应用的ServletContext对象也封装到了ServletConfig对象中，使ServletConfig对象成为了获取ServletContext对象的一座桥梁。
- ServletConfig对象的主要功能
  - **获取Servlet名称：getServletName()**
  - **获取全局上下文ServletContext对象：getServletContext()**
  - **获取Servlet初始化参数：getInitParameter(String) / getInitParameterNames()。**
  - 使用如下：
  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/ac7560b2cc8644909011e2d394d19eea.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

```java
@Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("第二步: 定义初始化init方法");
        /*1.通过servletConfig对象获取配置文件信息*/
        String servletName = servletConfig.getServletName();
        /*2.通过servlet获取上下文信息*/
        ServletContext servletContext = servletConfig.getServletContext();
        /*3.获取初始化参数的值*/
        String initValue = servletConfig.getInitParameter("springmvc");
        Enumeration  enumeration = servletConfig.getInitParameterNames();
        while (enumeration.hasMoreElements()){
            System.out.println("获取多个初始化名称:"+enumeration.nextElement());
        }
        System.out.println("获取servlet名称:"+servletName);
        System.out.println("获取上下文信息:"+servletContext);
        System.out.println("获取初始化参数:"+initValue);

    }
```

#### ServletContext接口说明

![在这里插入图片描述](https://img-blog.csdnimg.cn/a531e70122ff48ad879c0ebbf166e3ba.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_19,color_FFFFFF,t_70,g_se,x_16)

- Web容器在启动时，它会为**每个Web应用程序都创建一个唯一对应的ServletContext对象**，意思是Servlet上下文，**代表当前Web应用。**

- 由于**一个Web应用程序中的所有Servlet都共享同一个ServletContext对象**，所以ServletContext对象也被称为 application 对象（Web应用程序对象）。

- **对象由Servlet容器在项目启动时创建**，通过ServletConfig对象的getServletContext()方法获取。在项目卸载时销毁。

- ServletContext对象的主要功能

  ① 获取项目的上下文路径(带/的项目名): **getContextPath()**

  ```java
  @Override
  public void init(ServletConfig config) throws ServletException {
  	ServletContext application = config.getServletContext();
  	System.out.println("全局上下文对象："+application);
  	String path = application.getContextPath();
  	System.out.println("全局上下文路径："+path);// /06_Web_Servlet
  }

  ```

  ② 获取虚拟路径所映射的本地真实路径：**getRealPath(String path)**

  - 虚拟路径：浏览器访问Web应用中资源时所使用的路径。

  - 本地路径：资源在文件系统中的实际保存路径。

  - 作用：将用户上传的文件通过流写入到服务器硬盘中。

    ```java
    @Override
    public void init(ServletConfig config) throws ServletException {
    	//1.获取ServletContext对象
    	ServletContext context = config.getServletContext();
    	//2.获取index.html的本地路径
    	//index.html的虚拟路径是“/index.html”,其中“/”表示当前Web应用的根目录，
    	//即WebContent目录
    	String realPath = context.getRealPath("/index.html");
    	//realPath=D:\DevWorkSpace\MyWorkSpace\.metadata\.plugins\
    	//org.eclipse.wst.server.core\tmp0\wtpwebapps\MyServlet\index.html
    	System.out.println("realPath="+realPath);
    }
  
    ```

  ③ 获取WEB应用程序的全局初始化参数（基本不用）

  - 设置Web应用初始化参数的方式是在web.xml的根标签下加入如下代码

    ```xml
    <web-app>
    	<!-- Web应用初始化参数 -->
    	<context-param>
    		<param-name>ParamName</param-name>
    		<param-value>ParamValue</param-value>
    	</context-param>
    </web-app>

    ```

  - 获取Web应用初始化参数

    ```java
    @Override
    public void init(ServletConfig config) throws ServletException {
    	//1.获取ServletContext对象
    	ServletContext application = config.getServletContext();
    	//2.获取Web应用初始化参数
    	String paramValue = application.getInitParameter("ParamName");
    	System.out.println("全局初始化参数paramValue="+paramValue);
    }

    ```

  ④ 作为域对象共享数据

  - 作为最大的域对象在整个项目的不同web资源内共享数据。

![在这里插入图片描述](https://img-blog.csdnimg.cn/669eb95fea1148309534e424e72a3ca0.png)

其中，

- setAttribute(key,value)：以后可以在任意位置取出并使用
- getAttribute(key)：取出设置的value值

### 处理请求响应两个重要的接口

#### HttpServletRequest接口

- 该接口是ServletRequest接口的子接口，封装了HTTP请求的相关信息。
- 浏览器请求服务器时会封装请求报文交给服务器，服务器接受到请求会将请求报文解析生成request对象。
- 由Servlet容器创建其实现类对象并传入service(HttpServletRequest req, HttpServletResponse res)方法中。
- 以下我们所说的HttpServletRequest对象指的是容器提供的HttpServletRequest实现类对象。

#### 获取请求参数

- 什么是请求参数？
- 请求参数就是浏览器向服务器提交的数据。
- 浏览器向服务器如何发送数据？

① 附在url后面(和get请求一致，拼接的形式就行请求数据的绑定)，如：
http://localhost:8080/MyServlet/MyHttpServlet?userId=20

② 通过表单提交

```html
<form action="MyHttpServlet" method="post">
	你喜欢的足球队<br /><br />
	巴西<input type="checkbox" name="soccerTeam" value="Brazil" />
	德国<input type="checkbox" name="soccerTeam" value="German" />
	荷兰<input type="checkbox" name="soccerTeam" value="Holland" />
	<input type="submit" value="提交" />
</form>

```

- 使用HttpServletRequest对象获取请求参数

  ```java
  //一个name对应一个值
  String userId = request.getParameter("userId");
  ```
  
  ```java
  //一个name对应一组值
  String[] soccerTeams = request.getParameterValues("soccerTeam");
  for(int i = 0; i < soccerTeams.length; i++){
  	System.out.println("team "+i+"="+soccerTeams[i]);
  }
  ```

#### 获取url地址参数

```java
String path = request.getContextPath();//重要
System.out.println("上下文路径："+path);
System.out.println("端口号："+request.getServerPort());
System.out.println("主机名："+request.getServerName());
System.out.println("协议："+request.getScheme());

```

#### 获取请求头信息

```java
String header = request.getHeader("User-Agent");
System.out.println("user-agent:"+header);
String referer = request.getHeader("Referer");
System.out.println("上个页面的地址："+referer);//登录失败，返回登录页面让用户继续登录

```

#### 请求的转发

将请求转发给另外一个URL地址，

```java
//获取请求转发对象
RequestDispatcher dispatcher = request.getRequestDispatcher("success.html");
dispatcher.forward(request, response);//发起转发
```

#### 向请求域中保存数据

```java
//将数据保存到request对象的属性域中
request.setAttribute("attrName", "attrValueInRequest");
//两个Servlet要想共享request对象中的数据，必须是转发的关系
request.getRequestDispatcher("/ReceiveServlet").forward(request, response);

//从request属性域中获取数据
Object attribute = request.getAttribute("attrName");
System.out.println("attrValue="+attribute);

```

### 编程题

#### 功能1：登录

说明:

1. 系统中只有一个用户(用户名: admin,密码: 123456)

2. 相关资源:

   login.html : 登录表单页面

   LoginServlet: 处理登录请求的Servlet

   login_success.html : 登录成功页面(提示: 登录成功)

   login_error.html : 登录失败页面(提示: 用户名或密码不正确)

#### 功能2：注册

说明:

1. 系统中只有一个用户(用户名: admin,密码: 123456)

2. 相关资源:

   register.html : 注册表单页面

   RegistServlet: 处理注册请求的Servlet

   regist_success.html :注册成功页面(提示:注册成功)

   regist_error.html :注册失败页面(提示: 用户名已存在)

#### 功能3：连接数据库操作

完成代码: 参见作业

### HttpServletResponse接口

#### HttpServletResponse介绍

- 该接口是ServletResponse接口的子接口，封装了服务器针对于HTTP响应的相关信息。(暂时只有服务器的配置信息，没有具体的和响应体相关的内容)
- 由Servlet容器创建其实现类对象，并传入service(HttpServletRequest req, HttpServletResponse res)方法中。
- 后面我们所说的HttpServletResponse对象指的是容器提供的HttpServletResponse实现类对象。

HttpServletResponse对象的主要功能有：

#### 使用PrintWriter对象向浏览器输出数据

```java
//通过PrintWriter对象向浏览器端发送响应信息
PrintWriter writer = res.getWriter();
writer.write("Servlet response");
writer.close();

```

- 写出的数据可以是页面、页面片段、字符串等
- 当写出的数据包含中文时，浏览器接收到的响应数据就可能有乱码。为了避免乱码，可以使用Response对象在向浏览器输出数据前设置响应头。

#### 设置响应头

- 响应头就是浏览器解析页面的配置。比如：告诉浏览器使用哪种编码和文件格式解析响应体内容

```java
response.setHeader("Content-Type", "text/html;charset=UTF-8");
```

- 设置好以后，会在浏览器的响应报文中看到设置的响应头中的信息。

#### 重定向请求

- 实现请求重定向，
- 举例：用户从login.html页面提交登录请求数据给LoginServlet处理。如果账号密码正确，需要让用户跳转到成功页面，通过servlet向响应体中写入成功页面过于复杂，通过重定向将成功页面的地址交给浏览器并设置响应状态码为302，浏览器会自动进行跳转。

```java
//注意路径问题，加上/会失败，会以主机地址为起始，重定向一般需要加上项目名
response.sendRedirect(“success.html”);
```

###  请求的转发

#### 转发和重定向说明

请求的转发与重定向是web应用页面跳转的主要手段，在Web应用中使用非常广泛。所以我们一定要搞清楚他们的区别。

![在这里插入图片描述](https://img-blog.csdnimg.cn/474e9cfcd63e4e1c8e4d6659659fba81.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_17,color_FFFFFF,t_70,g_se,x_16)

#### 请求的转发

![在这里插入图片描述](https://img-blog.csdnimg.cn/bb8c59b7e44a4b8ab07119afe70673a4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

- 第一个Servlet接收到了浏览器端的请求，进行了一定的处理，然后没有立即对请求进行响应，而是将请求“交给下一个Servlet”继续处理，下一个Servlet处理完成之后对浏览器进行了响应。**在服务器内部将请求“交给”其它组件继续处理就是请求的转发。**对浏览器来说，一共只发了一次请求，服务器内部进行的“转发”浏览器感觉不到，同时浏览器地址栏中的地址不会变成“下一个Servlet”的虚拟路径。
- HttpServletRequest代表HTTP请求，对象由Servlet容器创建。转发的情况下，两个Servlet可以共享同一个Request对象中保存的数据。
- 当需要将后台获取的数据传送到JSP上显示的时候，就可以先将数据存放到Request对象中，再转发到JSP从属性域中获取。此时由于是“转发”，所以它们二者共享Request对象中的数据。
- 转发的情况下，可以访问WEB-INF下的资源。
- **转发以“/”开始表示项目根路径，重定向以”/”开始表示主机地址。**
- 功能：
  - 获取请求参数
  - 获取请求路径即URL地址相关信息
  - 在请求域中保存数据
  - 转发请求
- 代码举例

```java
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.获取用户的参数
        int id = Integer.valueOf(request.getParameter("id"));
        String name = request.getParameter("name");
        System.out.println(id+"|"+name);
        //2.利用request域保存数据
        request.setAttribute("key","UUID密钥");

        //3.将请求转发给 twoServlet
        request.getRequestDispatcher("/twoServlet").forward(request,response);
    }
```

### 重定向

![在这里插入图片描述](https://img-blog.csdnimg.cn/9c308eaf547c4bb1b1b266a883b8be9c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

- 第一个Servlet接收到了浏览器端的请求，进行了一定的处理，然后给浏览器一个特殊的响应消息，这个特殊的响应消息会通知浏览器去访问另外一个资源，这个动作是服务器和浏览器自动完成的。**整个过程中浏览器端会发出两次请求**，且在**浏览器地址栏里面能够看到地址的改变**，改变为下一个资源的地址。

- 重定向的情况下，原Servlet和目标资源之间就不能共享请求域数据了。

- HttpServletResponse代表HTTP响应，对象由Servlet容器创建。

- 功能：

  - 向浏览器输出数据
  - 重定向请求

- 重定向的响应报文的头

  ```
  HTTP/1.1 302 Found
  Location: success.html
  ```

- 应用：

  - 用户从login.html页面提交登录请求数据给LoginServlet处理。

    如果账号密码正确，需要让用户跳转到成功页面，通过servlet向响应体中写入成功页面过于复杂，通过重定向将成功页面的地址交给浏览器并设置响应状态码为302，浏览器会自动进行跳转

- 代码举例：

```java
 @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.从转发来的请求获取数据
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        System.out.println("跳转到第二个Servlet|"+id+"|"+name);

        //2.从域中获取数据
        String msg = (String) request.getAttribute("key");
        System.out.println("打印域中的数据:"+msg);
        //将域中的数据清除
        request.removeAttribute("key");

        //3.重定向到成功页面
        response.sendRedirect("success.html");
    }

```

### 对比请求的转发与重定向

|                         | 转发                             | 重定向                                              |
| ----------------------- | -------------------------------- | --------------------------------------------------- |
| 浏览器感知              | 在服务器内部完成，浏览器感知不到 | 服务器以302状态码通知浏览器访问新地址，浏览器有感知 |
| 浏览器地址栏            | 不改变                           | 改变                                                |
| 整个过程发送请求次数    | 一次                             | 两次                                                |
| 能否共享request对象数据 | 能                               | 否                                                  |
| WEB-INF下的资源         | 能访问                           | 不能访问                                            |
| 目标资源                | 必须是当前web应用中的资源        | 不局限于当前web应用                                 |

> 说明1：默认情况下，浏览器是不能访问服务器web-inf下的资源的，而服务器是可以访问的。
>
> 说明2：浏览器默认的绝对路径：http://localhost:8080/
>
> 服务器项目的代码中的绝对路径：http://localhost:8080/项目名/

### 请求与响应中的字符编码设置

### 字符编码问题

- 我们web程序在接收请求并处理过程中，如果不注意编码格式及解码格式，很容易导致中文乱码，引起这个问题的原因到底在哪里？如何解决？我们这个小节将会讨论此问题。
- 说到这个问题我们先来说一说字符集。
  - 什么是字符集，就是各种字符的集合，包括汉字，英文，标点符号等等。各国都有不同的文字、符号。这些文字符号的集合就叫字符集。
  - 现有的字符集ASCII、GB2312、BIG5、GB18030、Unicode、UTF-8、ISO-8859-1等
- 这些字符集，集合了很多的字符，然而，字符要以二进制的形式存储在计算机中，我们就需要对其进行编码，将编码后的二进制存入。取出时我们就要对其解码，将二进制解码成我们之前的字符。这个时候我们就需要制定一套编码解码标准。否则就会导致出现混乱，也就是我们的乱码。- 我们web程序在接收请求并处理过程中，如果不注意编码格式及解码格式，很容易导致中文乱码，引起这个问题的原因到底在哪里？如何解决？我们这个小节将会讨论此问题。
- 说到这个问题我们先来说一说字符集。
  - 什么是字符集，就是各种字符的集合，包括汉字，英文，标点符号等等。各国都有不同的文字、符号。这些文字符号的集合就叫字符集。
  - 现有的字符集ASCII、GB2312、BIG5、GB18030、Unicode、UTF-8、ISO-8859-1等
- 这些字符集，集合了很多的字符，然而，字符要以二进制的形式存储在计算机中，我们就需要对其进行编码，将编码后的二进制存入。取出时我们就要对其解码，将二进制解码成我们之前的字符。这个时候我们就需要制定一套编码解码标准。否则就会导致出现混乱，也就是我们的乱码。

### 编码与解码

- 编码：将字符转换为二进制数

| 汉字 | 编码方式   | 编码       | 二进制                                         |
| ---- | ---------- | ---------- | ---------------------------------------------- |
| ‘中’ | **GB2312** | **D6D0**   | **1101 0110-1101 0000**                        |
| ‘中’ | **UTF-16** | **4E2D**   | **0100 1110-0010 1101**                        |
| ‘中’ | **UTF-8**  | **E4B8AD** | **1110** **0100-** **1011** **1000-1010 1101** |

- 解码：将二进制数转换为字符

1110 0100-1011 1000-1010 1101 → E4B8AD → ’中’

- 乱码：一段文本，使用A字符集编码，使用B字符集解码，就会产生乱码。所以解决乱码问题的根本方法就是统一编码和解码的字符集。

### 解决请求乱码问题

解决乱码的方法：就是统一字符编码。

#### GET请求（Tomcat7及以下的需要处理）

GET请求参数是在地址后面的。我们需要修改tomcat的配置文件。需要在server.xml文件修改Connector标签，添加URIEncoding="utf-8"属性。
如果使用tomcat8及以上的版本,z

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5c6f7619cd94491989b2d5a7f103a78.png)

一旦配置好以后，可以解决当前工作空间中所有的GET请求的乱码问题。

#### POST请求

- post请求提交了中文的请求体，服务器解析出现问题。

- 解决方法：在获取参数值之前，设置请求的解码格式，使其和页面保持一致。

  ```java
  request.setCharacterEncoding("utf-8");
  ```

- POST请求乱码问题的解决，只适用于当前的操作所在的类中。不能类似于GET请求一样统一解决。因为请求体有可能会上传文件。不一定都是中文字符。

#### 解决响应乱码问题

- 向浏览器发送响应的时候，要告诉浏览器，我使用的字符集是哪个，浏览器就会按照这种方式来解码。如何告诉浏览器响应内容的字符编码方案。很简单。

- 解决方法一：

  ```java
  response.setHeader("Content-Type", "text/html;charset=utf-8");
  ```

- 解决方法二

  ```java
  response.setContentType("text/html;charset=utf-8");
  ```

  > 说明：有的人可能会想到使用response.setCharacterEncoding(“utf-8”)，设置reponse对象将UTF-8字符串写入到响应报文的编码为UTF-8。只这样做是不行的，还必须手动在浏览器中设置浏览器的解析用到的字符集。

### Web应用路径设置

#### url的概念

url是`uniform Resource Locater`的简写，中文翻译为`统一资源定位符`，它是某个互联网资源的唯一访问地址，客户端可以通过url访问到具体的互联网资源
完整的url构成如下图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1365a7f61e0f4c3e88bd27112b861d6f.png)

uri是`统一资源标志符(Uniform Resource Identifier， URI)` 表示的是web上每一种可用的资源 只包含上图中的path/TestServlet 不包含服务器地址

**相对路径和绝对路径**

**相对路径：虚拟路径如果不以“/”开始，就是相对路径**，浏览器会以当前资源所在的虚拟路径为基准对相对路径进行解析，从而生成最终的访问路径。此时如果通过转发进入其他目录，再使用相对路径访问资源就会出错。所以为了防止路径出错，我们经常将相对路径转化为绝对路径的形式进行请求。

**绝对路径：虚拟路径以“/”开始，就是绝对路径。**
**① 在服务器端**：虚拟路径最开始的“/”表示当前Web应用的根目录。只要是服务端解析的绝对路径，都是以web根目录为起始的。由服务器解析的路径包括：<1> web.xml的配置路径、<2>request转发的路径。
**② 在浏览器端**：虚拟路径最开始的“/”表示当前主机地址。
例如：链接地址“/Path/dir/b.html”经过浏览器解析后为：
相当于http://localhost:8989/Path/dir/b.html
由浏览器解析的路径包括：
<1>重定向操作：response.sendRedirect(“/xxx”)
<2>所有HTML标签：<a href="/xxx"> 、<form action="/xxx"> 、link、img、script等
这些最后的访问路径都是 http://localhost:8989/xxx

所以我们可以看出，如果是浏览器解析的路径，我们必须加上项目名称才可以正确的指向资源。[http://localhost:8989](http://localhost:8989/Path/xxx)[/Path](http://localhost:8989/Path/xxx)[/xxx](http://localhost:8989/Path/xxx)

<1>重定向操作：

```java
response.sendRedirect(request.getContextPath()+"/xxx");
```

<2>所有HTML标签：<a href="/项目名/xxx">； <form action=“/项目名/xxx">

- 在浏览器端，除了使用绝对路径之外，我们还可以使用base标签+相对路径的方式来确定资源的访问有效。
- base标签影响当前页面中的所有相对路径，不会影响绝对路径。相当于给相对路径设置了一个基准地址。
- 习惯上在html的标签内，声明：

```html
<!-- 给页面中的相对路径设置基准地址 -->
<base href="http://localhost:8080/Test_Path/"/>
```

接着html中的路径就可以使用相对路径的方式来访问。比如：

```html
<h4> base+相对路径</h4>
<!-- <base href="http://localhost:8080/Test_Path/"/> -->
<a href="1.html">1.html</a><br/>
<a href="a/3.html">a/3.html</a><br/>
<!-- servlet映射到了项目根目录下，可以直接访问 -->
<a href="PathServlet">PathServlet</a><br/>
```