# 前后端交互与SpringMVC参数传递

[[TOC]]

## 前后端交互

### 框架之间的关系

1.SpringBoot (工具/框架的框架) 2.Spring(整合第三方)
3.SpringMVC(实现前后端交互) 4.Mybatis/MP(实现持久化操作)

![在这里插入图片描述](https://img-blog.csdnimg.cn/1fd51cb3ec184325b219cb1aa474dab5.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 完成后端层级代码

说明: MVC思想主要的目的实现代码的解耦. 根据MVC思想 演化出层级代码结构 Controller/Service /Dao/Mapper
编码顺序: 1.编辑POJO 2.编辑Mapper接口 3.编辑Service层 4.编辑Controller

![在这里插入图片描述](https://img-blog.csdnimg.cn/e4947d97435743d1ae91f9254ab195fa.png)

### 查询案例

#### 业务需求

用户浏览器输入地址: http://localhost:8090/findAll,
要求: 利用MP查询数据库,返回集合的JSON数据.

#### 编辑UserController

```java
package com.jt.controller;

import com.jt.pojo.User;
import com.jt.service.UserService;
import com.jt.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//@Controller
//@ResponseBody //将服务端数据转化为JSON串返回
public class UserController {

    //编码规则: 面向接口编程 解耦
    @Autowired
    private UserService userService;

    /**
     * 查询所有的数据
     * URL: http://localhost:8090/findAll
     * 参数: 没有参数
     * 返回值: List<User>
     */
    @RequestMapping("/findAll")
    public List<User> findAll(){

        return userService.findAll();
    }




}

```

#### 编辑UserServiceImpl

```java
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    //查询所有的数据 没有where条件所以参数为null
    @Override
    public List<User> findAll() {

        return userMapper.selectList(null);
    }
}

```

#### 页面效果展现

![在这里插入图片描述](https://img-blog.csdnimg.cn/f1680294be8443d88c6cf65b166e86c7.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## SpringMVC参数传递

### 简单参数接收

#### 需求说明

常识: 通过浏览器的地址栏 只能发起GET请求.

URL1: http://localhost:8080/findUserById?id=1

难点: 动态接收请求/参数ID

```
根据id查询用户信息    http://localhost:8090/findUserById?id=1
```

#### 编辑UserController

```java
 /**
     *
     * 不同类型的请求注解说明:
     *  @PostMapping("")
     *  @PutMapping("")
     *  @DeleteMapping("")
     *  参数说明:
     *     1.参数名称必须与URL中的名称一致.
     *     2.SpringMVC可以根据用户的需求,自动的实现类型的转化
     *      底层实现: springmvc所有的参数默认都是String类型
     *      根据用户参数的类型,自动实现转化.
     *
     * URL地址:  http://localhost:8090/findUserById?id=1
     * 请求类型:  GET/DELETE  /POST/PUT
     * 参数: id=1
     * 返回值结果: User对象的json串
     *
     */
    //@RequestMapping(value = "/findUserById",method = RequestMethod.GET)
    @GetMapping("/findUserById")     //只允许接收get类型
    public User findUserById(Integer id){

        return userService.findUserById(id);
    }
```

#### 编辑UserServiceImpl

```java
 @Override
    public User findUserById(Integer id) {

        return userMapper.selectById(id);
    }
```

#### 页面效果展现

![在这里插入图片描述](https://img-blog.csdnimg.cn/d9d7e3400b274fd8ac8624fb1866aa51.png)

### 对象参数接收

####  需求

案例: 根据name=“王昭君” sex=女 查询用户数据?

URL: http://localhost:8090/findUserByNS?name=王昭君&sex=女

#### 编辑UserController

```java
 /**
     * 规则: SpringMVC 可以利用对象的方式接收
     * 底层实现: 参数name="xxx" 拼接set形成setName,之后检查对象中
     * 是否有对应的setName(), 如果匹配该方法,则为对象赋值.
     * 注意事项: 参数名称最好以属性名称一致
     *
     * URL地址: http://localhost:8090/findUserByNS?name=王昭君&sex=女
     * 参数：  name=xxx&sex=xx
     * 返回值：List<User>
     */
    @GetMapping("/findUserByNS")
    public List<User> findUserByNS(User user){

        return userService.findUserByNS(user);
    }
```

#### 编辑UserServiceImpl

```java
//MP 可以根据对象中不为null的属性拼接where条件
    @Override
    public List<User> findUserByNS(User user) {

        QueryWrapper<User> queryWrapper = new QueryWrapper<>(user);
        return userMapper.selectList(queryWrapper);
    }
```

#### 页面效果展现

![在这里插入图片描述](https://img-blog.csdnimg.cn/6dd307cacb7746e4a9a9d5ab5b414537.png)

###  RestFul参数接收

#### RestFul介绍

REST 指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。
定义: RESTFul 是一种请求的规则(语法/定义)

#### RESTFul说明

Get请求: http://localhost:8090/findUserByNS?name=王昭君&sex=女

信息: 1.查询请求

2.参数直观 name=xxx

3.请求的结构冗余. 不合适多个参数的写法.

请求优化:

http://localhost:8090/user/王昭君/女

优势:

1. 用户不能了解请求的意图 规定:请求方法名称不能出现 “动词”,只能写名词.

2.  参数保密, 只有后端服务器清楚参数的意义.

3.  请求字节传输量少 简洁.

   注意事项:

   1. URL地址中参数与参数之间使用 /分隔.
   2.  请求的参数的位置一旦固定,不可轻易修改.
   3.  用户发请求时,就应该按照restFul的结构执行.
   4.  restFul请求一般以get请求为主. put/delete/post

#### RESTFul案例

#####  需求

查询 name=“貂蝉” age> 10 岁 的用户.

URL: http://localhost:8090/user/貂蝉/10

##### 编辑UserController

```java
/**
     * 后端服务器接收规则:
     *     1.参数与参数之后使用 /分隔
     *     2.参数的位置一旦确定,一般不变.
     *     3.接收的参数使用 {形参变量}
     *     4.使用@PathVariable 接收
     *     5.如果参数有多个建议使用对象接收  参数必须与属性一致,SpringMVC自动封装
     * 注意事项: 如果名称不统一,则需要转化 具体如下:
     *          @PathVariable("name") String username
     *
     * url: http://localhost:8090/user/貂蝉/10
     * 参数: name/age
     * 返回值: List<User>
     */

    @GetMapping("/user/{name}/{age}")
    public List<User> findUserByNA(User user){

        return userService.findUserByNA(user);
    }




   /*
    说明: restFul写法1
    @GetMapping("/user/{name}/{age}")
    public List<User> findUserByNA(@PathVariable String name,
                                   @PathVariable Integer age){
        System.out.println(name);
        System.out.println(age);

        return null;
    }*/

```

```java
package com.jt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RestFulController {

    /**
     * 常规get请求:
     * url地址: http://localhost:8090/restFul?id=1&name=tom
     * get请求弊端: 如果参数有多个,则key-value的结构需要多份.
     * RestFul结构:
     *  url地址: http://localhost:8090/restFul/{id}/{name}
     *      1.参数之间使用/分割
     *      2.参数的位置一旦确定,不可更改
     *      3.参数使用{}号的形式进行包裹,并且设定形参
     *      4.在接收参数时,使用特定的注解取值@PathVariable
     *
     * @PathVariable: 参数说明
     *      1.name/value  动态接收形参的数据  如果参数相同则省略不写
     *      2.必填项 required 默认为true
     */
    @RequestMapping("/restFul/{id}/{name}")
    public String restFul(@PathVariable Integer id,
                          @PathVariable String name){
        System.out.println("获取参数:"+id+"|"+name);
        return "success";
    }



}

```



##### 编辑UserServiceImpl

```java
 //规则: 字段与属性的逻辑运算符为 '=号'时使用实体(user)对象封装
    //查询 name="貂蝉" age> 10 岁 的用户.
    @Override
    public List<User> findUserByNA(User user) {
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("name",user.getName())
                    .gt("age",user.getAge());
        return userMapper.selectList(queryWrapper);
    }

```

#### 同名提交问题

##### 需求

用户查询id=1,3,4,5的数据. 如果有同名参数一般采用 ',号 ’ 分隔

URL: http://localhost:8090/getUserByIds?ids=1,3,4,5

##### 编辑UserController

```java
 /**
     * 规则: 如果参数使用,号分隔,则SpringMVC可以自动的转化为数组.
     * 查询多个用户
     * URL: http://localhost:8090/getUserByIds?ids=1,3,4,5
     * 参数: ids = 1,3,4,5
     * 返回值: List<User>
     */
    @GetMapping("/getUserByIds")
    public List<User> getUserByIds(Integer[] ids){

        return userService.getUserByIds(ids);
    }

```

##### 编辑UserServiceImpl

```java
 @Override
    public List<User> getUserByIds(Integer[] ids) {

        List<Integer> idList = Arrays.asList(ids);
        return userMapper.selectBatchIds(idList);
    }

```

##### 页面效果展现

![在这里插入图片描述](https://img-blog.csdnimg.cn/d45db30b0ea64814b510398e697a62ff.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 简化业务调用

需求: 按照常规说明 执行增删改查的操作,需要多个业务方法.

例子:

1.新增用户 /insertUser

2.修改用户 /updateUser

3.删除用户 /deleteUser

4.查询用户 /selectUser

说明: 上述的操作在早期这么写没有问题.但是新的请求规范规定应该让请求尽可能变成**无状态**的请求.(删除动词)

常见请求类型: 1.GET 2.POST 3.PUT 4.DELETE

优化:

1.新增用户 /user 请求类型: POST

2.修改用户 /user 请求类型: PUT

3.删除用户 /user 请求类型: DELETE

4.查询用户 /user 请求类型: GET

优化注解: 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210506115330559.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

总结:

1.利用RestFul 可以简化get请求类型.

2.利用RestFul可以使用无状态的请求,通过不同的请求类型 控制不同的业务逻辑(较为常用)

###  JSON结构

#### 什么是JSON

JSON(JavaScript Object Notation) 是一种**轻量级的数据交换格式**。它使得人们很容易的进行阅读和编写。同时也方便了机器进行解析和生成。它是基于 JavaScript Programming Language , Standard ECMA-262 3rd Edition - December 1999 的一个子集。 JSON采用完全独立于程序语言的文本格式，但是也使用了类C语言的习惯（包括C, C++, C#, Java, JavaScript, Perl, Python等）。这些特性使JSON成为理想的数据交换语言。

根源:网络传输协议http/https,本质传输的数据都是字符串/字节信息. 协议与系统无关. 所以采用JSON的方式将数据按照特定的顺序进行排列. JSON中的特殊的数据结构,可以很好的解析字符串.

####  JSON的格式

##### 对象格式

对象（object） 是一个**无序的“‘名称/值’对”集合**。一个对象以“{”（左括号）开始，“}”（右括号）结束。每个“名称”后跟一个“:”（冒号）；“‘名称/值’ 对”之间使用“,”（逗号）分隔。

![在这里插入图片描述](https://img-blog.csdnimg.cn/c866bb99214248e599fc6d2176b144bc.png)

```json
	{"id": "100","name":"tomcat","age":18,"sex":"男"}
```

##### 数组格式

数组（array） 是**值（value）的有序集合**。一个数组以“[”（左中括号）开始，“]”（右中括号）结束。值之间使用“,”（逗号）分隔。

![在这里插入图片描述](https://img-blog.csdnimg.cn/c98b29390be941369fec63b2395ebb7e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

```json
	[1,2,3,4,"张三","李四"]
```

##### 嵌套格式

**值（value）** 可以是双引号括起来的字符串（string）、数值(number)、true、false、 null、对象（object）或者数组（array）。这些结构可以嵌套。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b0f6c23953c444d2b2e1deadbfff9771.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

```json
	[1,2,true,false,{"id":100,"name":"tomcat"},[{arrays: [[],[],[]]},5,6]]
```

### SpringMVC JSON返回

#### 学习的意义

现阶段一般的请求都是前后端分离的方式.ajax (jQuery/axios),一般向服务器请求的数据 通常详情下 都是采用JSON串的方式返回.

#### @ResponseBody注解

```java
package com.jt.controller;

import com.jt.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class JSONController {

    /**
     * 需求: 要求根据getJSON的请求,获取User对象的JSON数据.
     * 用法: 如果需要返回JOSN数据则使用注解@ResponseBody
     * 知识点讲解:
     *      返回的对象之后,SpringMVC通过内部API(ObjectMapper)
     *      调用对象的getXXX()方法动态的获取属性和属性值.
     *  演化规则:
     *      getAge() ~~~~~去掉get首字母~~~~~Age()
     *      ~~~~~~首字母小写~~~~~age()~~~~获取属性age
     *      ~~~~~通过getAge() 动态获取属性的值
     *
     *  JSON: {"age": "今年18岁!!!"}
     *  注意事项:
     *      必须添加get/set方法
     */
    @RequestMapping("/getJSON")
    @ResponseBody //返回值就是一个JSON串
    public User getJSON(){
        User user = new User();
        user.setId(1000).setName("JSON测试");
        return user; //不需要执行视图解析器
    }
}

```

#### @RestController

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021050615134247.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### SpringMVC 用法学习

#### 关于SpringMVC 对象返回说明

```java
/**
     * 要求:返回User对象
     * URL: http://localhost:8080/getUserById?id=100
     * 返回值: User对象
     * 知识点: 对象转化为json时,调用对象的get方法获取属性和属性值
     *        获取getxxx(),之后去除get 然后首字母小写 当做key,
     *        方法的返回值当做value
     */
    @RequestMapping("/getUserById")
    public User getUserById(int id){
        User user = new User();
        user.setId(id);
        user.setName("测试数据");
        user.setSex("男");
        user.setAge(18);
        return user;
    }
```

#### 关于SpringMVC 同名提交问题

```java
 /**
     * SpringMVC动态参数接收 同名提交问题 多个参数使用,号进行分隔
     * 爱好: 口 打篮球  口 踢足球  口 乒乓球
     * URL传递:http://localhost:8080/hobby?names=打篮球,踢足球,乒乓球
     * 返回值: 返回爱好的list集合
     * 知识点: 如果springmvc遇到同名提交参数,并且中间使用","号分隔
     *        则可以自动转化为数组.
     */
    @RequestMapping("/hobby")
    public List<String> hobby(String[] names){

        //数组如何转化为List集合
        return  Arrays.asList(names);
    }
```

### RestFul结构(难点)

#### 传入GET请求业务说明

需求说明: 向后端服务器传递多个参数, name=tomcat, age=18,sex=男

URL地址: http://localhost:8080/getUser?name=tomcat&age=18&sex=男

该方法能否优化? 能否降低字节数量

#### RestFul参数拼接

语法: 省略key,将value使用/的方式进行分隔.并且位置固定.

URL地址: http://localhost:8080/getUser/tomcat/18/男

#### RestFul参数接收

```java
/**
     * 需求: 使用restFul结构接收参数
     * URL: http://localhost:8080/user/tomcat/18/男
     * 参数:  name/age/sex
     * 返回值: User对象
     * 难点知识: 如果获取url路径中的参数!!!
     * restFul参数接收的语法:
     *      1.参数使用{}进行包裹,并且指定属性名称
     *      2.使用注解@PathVariable进行参数接收
     *      3.restFul要求请求的路径不能出现动词
     * 优化: 如果restFul的属性名称与对象的属性名称一致,则可以利用对象接收
     */
    @RequestMapping("/user/{name}/{age}/{sex}")
    public User getUser(User user){

        return user;
    }

   /* public User getUser(@PathVariable String name,
                        @PathVariable int age,
                        @PathVariable String sex){
        User user = new User();
        user.setName(name);
        user.setAge(age);
        user.setSex(sex);
        return user;
    }*/
```

#### RestFul请求路径的通用写法

例子:

1. http://localhost:8080/getUserById?id=100
2.  http://localhost:8080/deleteUserById?id=100
3.  http://localhost:8080/updateUserById?id=100&name=tomcat
4.  http://localhost:8080/insertUser POST 提交

问题: 上述的操作 意图特别的明显. 对后期操作会带来不安全的风险.

优化: restFul风格的请求名称的要求,不能出现动词

1. http://localhost:8080/userById?id=100 类型: GET 查询业务逻辑
2. http://localhost:8080/userById?id=100 类型: Delete 删除业务逻辑
3. http://localhost:8080/userById?id=100&name=tomcat 类型: PUT 更新业务逻辑
4. http://localhost:8080/user 类型: POST 新增业务逻辑

![在这里插入图片描述](https://img-blog.csdnimg.cn/618401998573493fad713002acb4d5be.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 请求类型的种类

请求类型一共8种, 常用的4种 GET/POST/PUT/DELETE

![在这里插入图片描述](https://img-blog.csdnimg.cn/ff1ac38adb66472badbeb1589586c4bf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

##  前后端调用

### 入门案例

#### 编辑前端页面

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
			//url地址: http://localhost:8080/findUser
			let url1 = "http://localhost:8080/axios/findUser"
			//语法: axios.get(url地址)
            //在get请求下，参数需要使用【params】来设置
			axios.get(url1)
				 .then(function(promise){
					console.log(promise.data)
				 })
		</script>
		<h1>学习Axios的ajax调用</h1>
	</body>
</html>

```

####  编辑后端Controller

```java
@RestController // @Controller + @ResponseBody
@CrossOrigin    // 允许跨域访问
@RequestMapping("/axios")   //将公共的部分抽取
public class AxiosController {

    @RequestMapping("/findUser")
    public String findUser(){

        return "查询用户成功!!!";
    }
}
```

#### 关于promise对象说明

说明: axios 发送Ajax请求时,获取的服务器端数据,通过promise对象进行封装 格式如下. 一般通过data属性获取返回值结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/de245ac7c50a40e791c2542cca61cfd8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 关于谷歌浏览器常见功能

1.network

![在这里插入图片描述](https://img-blog.csdnimg.cn/ff5c387a5eb34cacb14ae765c3ff0e61.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

2. 根据报错提示 快速定位报错信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/00418da87b6d49b686c6e919508aae5b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### Axios-Get

#### 参数拼接写法

1. 页面JS

```javascript
			/**
			 * 2.参数拼接  	
			 * 需求: 根据Id查询User数据.
			 */ 
			let id2  = 100;
			let url2 = "http://localhost:8080/axios/findUserById?id="+id2
			axios.get(url2)
				 .then(promise => {
					 console.log(promise.data)
				 })
```

2. 编辑AxiosController

```java
/**
     * 需求: 根据Id查询用户信息
     * URL: http://localhost:8080/axios/findUserById?id=100
     * 参数: id=100
     * 返回值: User对象
     */
    @GetMapping("/findUserById")
    public User findUserById(Integer id){
        User user = new User();
        user.setId(id);
        user.setName("测试数据");
        user.setAge(18);
        user.setSex("女");
        return user;
    }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e8cab04707fe412bb8eb01787cc49e89.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 传递对象的写法

1. 编辑页面JS

```javascript
/**
			 * 需求3: 查询name="疫情快结束" age=1
			 * URL: http://localhost:8080/axios/findUserByNA?name=xxx&age=1	
			 * 关键字: params 对象标识符
			 * 返回值: User对象
			 */
			let user3 = {name:"西安加油", age:1}
			let url3 = "http://localhost:8080/axios/findUserByNA"
			axios.get(url3,{params: user3})
				 .then(promise => {
					 console.log(promise.data)
				 })
```

2. 编辑AxiosController

```java
 /**
     * 业务需求: 动态接收参数
     * URL地址: http://localhost:8080/axios/findUserByNA?name=xx&age=1
     * 参数: name=xx&age=1
     * 返回值: 返回User对象
     */
    @GetMapping("/findUserByNA")
    public User findUserByNA(User user){
        user.setId(3);
        user.setSex("男");
        return user;
    }
```

3. 页面效果展现
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/9d8d178a15634527978e5f8dfa10d3d1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### restFul结构实现数据传参

1. 编辑前端JS

```javascript
/**
			 * 需求: 利用restFul 传递name/age
			 * 前端知识点:  模板字符串
			 * 语法:  反引号 `` 
			 * 作用:
			 * 		1. 可以保证字符串的语法结构
			 * 		2. 可以动态的获取对象中的数据
			 * 
			 */
			let user4 = {name: "南孚电池",age: 8 }
			//let url4 = "http://localhost:8080/axios/user/"+user4.name+"/"+user4.age
			let url4 = `http://localhost:8080/axios/user/${user4.name}/${user4.age}`
			
			axios.get(url4)
				.then(promise => {
					console.log(promise.data)
				})
			
			let html =  `<div>
							<p>第一</p>
							<p>第二</p>
							<p>第三</p>
						 </div>`
```

2. 编辑AxiosController

```java
 /**
     * 动态接收前端restFul结构
     * URL: http://localhost:8080/axios/user/xxx/8
     * 参数:  name/age
     * 返回值: User对象返回
     */
    @GetMapping("/user/{name}/{age}")
    public User findUserNA(User user){
        user.setId(101);
        user.setSex("男");
        return user;
    }
```

3. 页面效果展现
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/a8f06086760347e5bf969e13a5ef9c07.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 简化Axios调用

语法: axios.defaults.baseURL = “http://localhost:8080/axios”

```javascript
	/* 简化Axios调用 设定公共的请求的前缀 如果已经有http://协议则不拼接前缀   */
	axios.defaults.baseURL = "http://localhost:8080/axios"
	let url5 = `/user/${user4.name}/${user4.age}`
	axios.get(url5)
		.then(promise => {
			console.log(promise.data)
		})			  
```



##  Axios-post请求

### 入门案例

#### 前端JS

```javascript
//1.指定请求的前缀
			axios.defaults.baseURL="http://localhost:8080/axios"
			
			/**
			 * 2. 需求: 一般业务新增时,采用post提交
			 *    URL: http://localhost:8080/axios/saveUser
			 * axios.post(url地址,js对象)
			 * 		.then(回调函数!!!)
			 */
			let user1 = {id: 100,name:"tomcat猫",age:18,sex:"女"}
			axios.post("/saveUser",user1)
				 .then( promise => {
					 console.log(promise.data)
				 })

```

#### post请求参数说明

说明: axios中的post请求,参数传递的是**JSON串**

![在这里插入图片描述](https://img-blog.csdnimg.cn/c35c05ebd77245b3b40c7dcfed64af48.png)

####  AxiosController 调用

```java
  /**
     * 业务说明: 接收post请求
     * url地址: http://localhost:8080/axios/saveUser
     * 参数:    JSON串={"id":100,"name":"tomcat猫","age":18,"sex":"女"}
     * 返回值:  User对象
     * 知识点:
     *      1.将JSON串转化为对象  @RequestBody
     *      2.将对象转化为JSON串  @ResponseBody
     */
    @PostMapping("/saveUser")
    public User saveUser(@RequestBody User user){

        return user;
    }
```

### 关于常见请求类型语法说明

1. GET/DELETE 语法相同
2. POST/PUT 语法相同

### put请求测试

#### 编辑前端JS

```javascript
/**
			 * 业务需求:  实现数据的更新操作
			 * 		     修改id=3的数据  name="张三"  age=18
			 * URL:http://localhost:8080/axios/updateUser
			 * 类型: put
			 * 写法1: 利用对象传参提交数据
			 * 写法2: 利用restFul结构实现
			 */
			let user2 = {id:3, name:"张三", age:18}
			axios.put("/updateUser",user2)
				 .then(promise => {
					 console.log(promise.data)
				 })
			
			let url3=`http://localhost:8080/axios/user/${user2.name}/${user2.age}/${user2.id}`
			axios.put(url3)
				 .then(promise => {
				 	console.log(promise.data)
				 })

```

####  编辑AxiosController

```java
/**
     * 业务: 完成修改操作
     * 类型: put类型
     * URL地址: http://localhost:8080/axios/updateUser
     * 参数: user的JSON串
     * 返回值: User返回
     */
    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user){

        return user;
    }
    /**
     *  需求: restFul结构
     *  url地址: `http://localhost:8080/axios/user/${user2.name}/${user2.age}/${user2.id}`
     *  请求类型: put
     *  返回值: User
     */
    @PutMapping("/user/{name}/{age}/{id}")
    public User updateUser2(User user){

        return user;
    }
```

### 关于跨域说明

#### 同源策略

要素1: 浏览器的访问地址

要素2: Ajax的请求的网址

策略说明: 如果上述的要素同时满足 **协议://域名:端口号都相同的情况**,则称之为满足同源策略.可以进行正确的调用. 也称之为 **“同域访问”.**

#### 什么是跨域

违反了同源策略就叫**跨域访问**

#### 考题

案例1:

1. 浏览器地址: http://www.jd.com/xx/xx
2. ajax地址: https://www.jd.com/yy/yy 跨域: 协议不同

案例2:

1. 浏览器地址: http://www.jd.com/xx/xx
2. ajax地址: http://www.jd.com/yy/yy 同域请求

案例3:

1. 浏览器地址: http://www.jd.com:80/xx/xx
2. ajax地址: http://www.jd.com/yy/yy 同域请求!!!

案例4:

前提: 域名与IP对应

1. 浏览器地址: http://www.jd.com/xx/xx
2. ajax地址: http://8.8.8.8/yy/yy 跨域请求! 域名不一致

案例5:

1. 浏览器地址: https://www.jd.com/xx/xx
2. ajax地址: https://www.jd.com:443/yy/yy 同域请求 https的默认端口号 443

案例6:

1. 浏览器地址: http://www.jd.com/xx/yy/xx
2. ajax地址: http://miaoshi.jd.com/yy/yy 跨域请求 域名不同

#### 关于@CrossOrigin注解说明

![在这里插入图片描述](https://img-blog.csdnimg.cn/7016360cf4804d0b8522df55900e4e63.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)



## Axios扩展知识

### 前端JS-回调地狱

说明: 如果Ajax**嵌套**的层级较多,则把这种结构称之为"回调地狱"
嵌套规则:

1. 用户发起第一个Ajax请求.回调函数中的结果,要当做第二个ajax请求的参数.

2.  用户第二个ajax回调函数的结果,要当做第三个Ajax请求的参数 以此类推!!!
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/43dda859a1ee42edaf304897c9a4c0c2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

   回调地狱问题说明:
   
   由于回调方法和请求的方法在2行,导致嵌套的结构没有办法优化.如果需要优化,则应该将Ajax的请求一行搞定. 例如

   ```js
   let result1 = axios.get(url1);
   let result2 = axios.get(url2,result1)
   let result3 = axios.get(url3,result2)
   ```

   

### 前端JS-回调地狱-解决方案

```javascript
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
			/* let url1 = "http://localhost:8080/axios/findUser"
			axios.get(url1)
				 .then(function(promise){
					console.log(promise.data)
					
					axios.get("url2",promise.data)
						 .then(promise2 => {
							 console.log(promise2.data);
							 
							 axios.get("url3",promise2.data)
								  .then(promise3 => {
									  console.log(promise3.data)
									  //...嵌套十八层,比喻为回调地狱
								  })
						 })
				 }) */
				 
				 /**
				  * 语法: 
				  * 	1.async 关键字修饰函数
				  * 	2.await 关键字修改ajax请求
				  * 	3.先定义函数.之后调用函数
				  * 	语法说明: 解构赋值操作
				  */
				 async function getUser(){
					let url1 = "http://localhost:8080/axios/findUser"
					let {data: result} = await axios.get(url1)
					console.log(result)
					
					//let promise= let promise = await axios.get(url1)
					//console.log(promise.data)
					 //return promise
				 }
				 
				 //调用函数
				 getUser()
				 
				/* async function getUser2(data){
					 let url2 = "http://localhost:8080/axios/findUser"
					 let promise = await axios.get(url2,data)
					 return promise
				 }
				 
				 let result1 = getUser();
				 let result2 = getUser2(result1); */
				 
		</script>
		<h1>学习Axios的ajax调用</h1>
	</body>
</html>
```
