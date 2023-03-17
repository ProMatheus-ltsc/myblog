# SpringMVC框架
[[TOC]]

# 1. SpringMVC

## 1.1 SpringMVC介绍

Spring MVC属于SpringFrameWork的后续产品，已经融合在Spring Web Flow里面。Spring 框架提供了构建 Web 应用程序的全功能 MVC 模块。使用 Spring 可插入的 MVC 架构，从而在使用Spring进行WEB开发时，可以选择使用Spring的Spring MVC框架或集成其他MVC开发框架，如Struts1(现在一般不用)，Struts 2(一般老项目使用)等等。

总结: SpringMVC是Spring基于MVC思想.**专门针对于前后端交互的开发的框架**.

### 1.1.1 准备工作

说明: 将课前资料中的vue/js目录 粘贴复制到该位置.

![在这里插入图片描述](https://img-blog.csdnimg.cn/b94bf3b62b7b4508bd3ad12a2749171a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_10,color_FFFFFF,t_70,g_se,x_16)

### 1.1.2 Ajax

1. Ajax特点: 局部刷新,异步访问!
2. 什么是同步: 当用户刷新页面时,必须等到所有的页面数据加载回来之后,统一刷新显示.
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/404ea6e8d8df46deb4b37b99d4f09274.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

3. 什么是异步: 当用户刷新页面是,在内部发起多个请求.页面数据先回来的,则局部页面先刷新展现.
4. Ajax为什么可以异步: Ajax引擎!!!
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/db3e86d07b9c43749f98d06997d162a1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

5. 常见Ajax API jQuery/axios 让ajax调用变得简洁.

### 1.1.2 Axios 入门案例

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Axios入门案例</title>
	</head>
	<body>
		<!-- 1.导入js文件 -->
		<script src="js/axios.js"></script>
		
		<!-- 2.编辑JS代码 -->
		<script>
			//url地址: http://localhost:8080/findUser get/post
			let url1 = "http://localhost:8080/findUser"
			//语法: axios.get(url地址,传递的参数)
			axios.get(url1)
				 .then(function(promise){
					console.log(promise.data)
				 })
			/* axios.get(url1)
				 .then((res) => {
					 
				 }) */
		</script>
	</body>
</html>
```

**get请求**

```java
//AxiosController.java
package cn.tedu.boot31.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AxiosController {

    @RequestMapping("/helloAxios")
    public String hello(String info){//info是调取的参数
        return "请求成功!"+ info;
    }
}

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div>
    <h1>{{info}}</h1>
    <input type="button" value="测试异步请求get" @click="f1()">
</div>
<script src="js/vue.js"></script>
<script src="js/axios.min.js"></script>
<script>
    let v = new Vue({
        el:"div",
        data:{
            info:"测试vue"
        },
        methods:{
            f1(){
                // alert("xxx");
                //发出异步请求
                axios.get("/helloAxios?info=tom")//tom是传递的参数
                
                    .then(function (response) {
                    //response代表服务器响应对象
                    //response.data代表服务响应的数据
                    alert(response.data);
                })
            }
        }
    })
</script>
</body>
</html>
```

**post请求**

```java
package cn.tedu.boot31.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.PrintWriter;

@RestController
public class AxiosController {

    //@RequestBody注解作用, 当客户端发出post请求并且提交的是自定义对象时 服务器端
    //接收参数必须使用此注解 否则得不到传递过来的参数.
    @RequestMapping("/helloAxios")
    public String hello(@RequestBody String info){
        return "请求成功! info="+info;
    }
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div>
    <h1>{{info}}</h1>
    <input type="button" value="测试异步请求post" @click="f2()">
</div>
<script src="js/vue.js"></script>
<script src="js/axios.min.js"></script>
<script>
    let v = new Vue({
        el:"div",
        data:{
            info:"测试vue"
        },
        methods:{
            
            f2(){
                //发出异步post请求
                axios.post("/helloAxios",{info:"刘德华"})
                    .then(function(response){
                        alert(response.data);})

            }
        }
    })
</script>
</body>
</html>
```



### 1.1.3传统Servlet的弊端

1. 传统的Servlet 一个业务方法,需要编辑一个Servlet. 如果业务复杂则导致Servlet数量增多.
2. Servlet的请求的方式 只能支持 get/post请求.
3. 通过Servlet获取的参数的类型 都是String,需要手动的进行类型转化.
4. 如果编辑servlet 则需要编辑大量的web.xml(8行配置) 文件.
   上述的知识都是历史产物. 后期SpringMVC框架将Servlet进行封装

### 1.1.4框架之间的调用关系

![在这里插入图片描述](https://img-blog.csdnimg.cn/7dac8cff9b2d4153b7eebc66b5f9ac98.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 1.1.5常用注解

1. @Controller 将该类首先交给SpringMVC进行管理.之后将SpringMVC整体框架 交给Spring管理.
2. @RequestMapping("/hello") 该路径必须与用户的访问路径一致.如果路径不一致.则会报404异常.
3. @ResponseBody 表示该方法的返回值都是JSON串结构,如果返回值为String类型,则原数据返回.

## 1.2 SpringMVC 入门案例

### 1.2.1 添加jar包

```java
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!--thymeleaf导入模版工具类-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
```

### 1.2.2 编辑YML配置文件

```yml
#配置模版工具类
spring:
  thymeleaf:
    #设置页面前缀
    prefix: classpath:/templates/
    #设置页面后缀
    suffix: .html
    #是否使用缓存
    cache: false

```

### 1.2.3 编辑Controller

```java
@Controller
public class HelloController {

    @RequestMapping("/hello")
    public ModelAndView hello(){
        ModelAndView modelAndView = new ModelAndView("hello");
        modelAndView.addObject("name","SpringMVC测试");
        return modelAndView;
    }
}
```

### 1.2.4 关于thymeleaf 语法说明:

```xml
1.标签中取值:				<h1>[[${name}]]</h1>
2.标签内获取文本: 		<h1 th:text="${name}"></h1>
3. 标签内获取value: 	<input name="name" th:value="${name}"/>
引入头标签:    <html lang="en" xmlns:th="http://www.thymeleaf.org">

<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>Hello 入门案例</h1>
    <h1>[[${name}]]</h1>
    <h1 th:text="${name}"></h1>
   <input name="name" th:value="${name}"/>
</body>
</html>

```

### 1.2.5 页面效果展现

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426204915922.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

# 2 SpringMVC调用原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425132301539.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

# 3 SpringMVC 用法

## 3.1 简化ModelAndView操作

### 3.1.1 编辑Controller方法

```java
 @RequestMapping("/hello")
    public String hello(Model model){

        model.addAttribute("name", "简化mvc结构");
        return "hello";
    }
```

### 3.1.2 页面效果测试

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426205319720.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.2 页面参数接收

### 3.2.1 编辑页面

```java
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>用户注册</title>
</head>
<body>
<form action="/user/addUser" method="POST">
    <table border="1px"  cellspacing="0" align="center" width="350px" style="margin-top: 50px">
        <tr align="center">
            <td colspan="2"><h1>表格数据提交</h1></td>
        </tr>
        <tr>
            <td>ID:</td>
            <td><input id="id" name="id" type="text"/></td>
        </tr>
        <tr>
            <td>姓名:</td>
            <td><input id="name" name="name" type="text"/></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><button type="submit">提交</button></td>
        </tr>
    </table>
</form>
</body>
</html>

```

### 3.2.2 编辑UserController

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426213510890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.2.3 简化参数接收

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426214010221.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.3 @RequestParam注解说明

### 3.3.1 功能说明

```
	1. 为参数设定默认值
	2. 当提交参数名称与接收参数不一致时使用

```

### 3.3.2 编辑UserController

```java
 /**
     * 如果提交参数为空时,可以设置默认值
     * 	@RequestParam
     * 		value/name 接收参数的名称
     * 		required=true 为必填参数
     * 		defaultValue="" 设定默认值
     */
    @RequestMapping("/addUser")
    public String addUser(@RequestParam(name = "id",defaultValue = "100") Integer id,
                          @RequestParam(name="name",defaultValue = "张三") String name){

        System.out.println("动态获取数据:id:"+id);
        System.out.println("动态获取数据:name:"+name);
        //新增成功之后.跳转到user页面中
        return "user";
    }
```

## 3.4 同名提交问题

### 3.4.1 编辑HTML页面

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426220602122.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.4.2 编辑UserController

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426220702238.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.5 使用对象接收参数

### 3.5.1 编辑User对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426221059867.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.5.2 编辑UserController

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426221252675.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.6 为对象引用赋值

### 3.6.1 准备Dog对象

```java
/**
 * @author 刘昱江
 * 时间 2021/4/26
 */
@Data
@Accessors(chain = true)
public class Dog {
    private String dogName;
    private String dogAge;
}
```

### 3.6.2 编辑页面HTML

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426221846262.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.7 转发和重定向

**意义**:实现了方法内部的松耦合

什么时候使用转发/重定向:

1.如果需要携带参数 使用转发

2.如果一个业务已经完成需要一个新的开始 则使用重定向

### 3.7.1 转发

#### 3.7.1.1 什么是转发

什么是转发: 由服务器端进行的页面跳转

说明: 一般情况下 SpringMVC内部 以转化为主.

#### 3.7.1.2 转发原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210506094658143.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426223644846.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.7.1.3 转发特点

1.地址栏不发生变化，显示的是上一个页面的地址

2.请求次数：只有1次请求

3.请求域中数据不会丢失

4.转发时 会携带用户提交的数据.

5..转发时 用户浏览器的地址不会发生改变.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426224232356.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.7.1.4 转发练习

```java
/**
     * 测试转化和重定向
     * 1.准备一个请求 findUser请求.
     * 2.要求通用转发到 findDog请求中.
     * 3.关键字   forward: 转发的是一个请求.....
     * 4.特点:
     *      1.转发时 会携带用户提交的数据.
     * 5.转发的意义:
     *      如果直接转向到页面中,如果页面需要额外的参数处理,则没有执行.
     *      如果在该方法中添加业务处理,则方法的耦合性高.不方便后续维护
     *      所以方法应该尽可能松耦合
     */
    @RequestMapping("/findUser")
    public String findUser(String name){

        //return 本身就是一个转发
        //return "user1";
        //return "dog"; 页面耦合性高
        return "forward:/findDog";
    }

    //需要将name属性返回给页面
    @RequestMapping("/findDog")
    public String findDog(String name,Model model){
        System.out.println("动态获取name属性值:"+name);
        model.addAttribute("name",name+"旺旺旺");
        return "dog";
    }

```



### 3.7.2 重定向

#### 3.7.2.1 什么是重定向

由浏览器端进行的页面跳转

说明: 当用户发起请求时,由服务器返回有效的网址信息.之后由用户再次发起请求的结构.

#### 3.7.2.2 重定向原理图

![image-20220510163055361](C:\Users\tarena\AppData\Roaming\Typora\typora-user-images\image-20220510163055361.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426224105643.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426224251124.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.7.2.3 重定向特点

1.地址栏：显示新的地址

2.请求次数：2次

3.请求域中的数据会丢失，因为是2次请求

4.重定向时 由于是多次请求,所以不会携带用户的数据

5.重定向时 由于是多次请求,所以用户的浏览器的地址会发生变化

#### 3.7.2.4 重定向练习

```java
 /**
     * 测试转化和重定向
     * 1.准备一个请求 findUser请求.
     * 2.要求通用转发到 findDog请求中.
     * 
     * 3.关键字   forward: 转发的是一个请求.....
     *           redirect: 多次请求多次响应
     * 4.特点:
     *      1.转发时 会携带用户提交的数据.
     *      2.转发时 用户浏览器的地址不会发生改变.
     *      3.重定向时  由于是多次请求,所以不会携带用户的数据
     *      4.重定向时  由于是多次请求,所以用户的浏览器的地址会发生变化
     *
     * 5.实际意义: 实现了方法内部的松耦合
     * 6.什么时候使用转发/什么时候使用重定向
     *   1.如果需要携带参数 使用转发
     *   2.如果一个业务已经完成需要一个新的开始 则使用重定向
     */
    @RequestMapping("/findUser")
    public String findUser(String name){

        //return 本身就是一个转发
        //return "user1";
        //return "dog"; 页面耦合性高
        //return "forward:/findDog";   转发到findDog请求
        return "redirect:/findDog";    //重定向到findDog请求
    }

    //需要将name属性返回给页面
    @RequestMapping("/findDog")
    public String findDog(String name,Model model){
        System.out.println("动态获取name属性值:"+name);
        model.addAttribute("name",name+"旺旺旺");
        return "dog";
    }
```



## 3.8 RestFul

### 3.8.1restFul结构介绍

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210427195820745.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210427195722423.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.9 @ResponseBody注解

### 3.9.1 JSON结构

1.JSON 有2种基本机构

object/array 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210427200059127.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

3.复杂格式

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210427200154988.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.9.2 @ResponseBody

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210427200526451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.10 SpringBoot/SpringMVC/Mybatis整合

### 3.10.1 编辑页面

```java
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>用户列表数据</title>
</head>
<body>
    <table border="1px" align="center" width="800px">
        <tr align="center">
            <td colspan="4"><h1>用户信息查询</h1></td>
        </tr>
        <tr align="center">
            <td>编号</td>
            <td>名称</td>
            <td>年龄</td>
            <td>性别</td>
        </tr>
        <tr align="center" th:each="user : ${userList}">
            <td th:text="${user.id}"></td>
            <td th:text="${user.name}"></td>
            <td th:text="${user.age}"></td>
            <td th:text="${user.sex}"></td>
        </tr>
    </table>
</body>
</html>

```

### 3.10.2 页面效果展现

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210427201908733.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

