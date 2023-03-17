# SpringMVC会话管理

[[TOC]]


**什么是会话**: 用户打开浏览器，点击多个超链接，访问服务器的多个web资源，然后关闭浏览器，整个过程就称为一个会话；

**会话过程需要解决的问题**: 每个用户在使用浏览器与服务器进行会话的过程中，都可能会产生一些数据，这些输入如何来进行保存？比如用户在购物网站浏览的商品记录，用户添加购物车的记录等等这些信息如何进行存储？在程序中会话跟踪是一件非常重要的事情，一个用户的所有请求操作都应该属于同一个会话，而另一个人的所有请求操作应该属于另一个人，二者不能混淆！当想到需要在保存数据时，我们首先肯定会想到使用域对象，这些数据是否可以使用Request或者ServletContext对象来保存呢？

首先我们举例说明：登录的场景

**1 Context对象**: 

小张： 输入“张三” （保存数据： context.setAttribute("name","张三")） -> 用户主页（显示“张三”）

小李： 输入“李四”(保存数据：context.setAttribute("name","李四")) ->  用户主页（显示“李四”）

context是所有用户公有的资源，因此当小李登录后，用户主页将全部显示为“李四”，新的数据将会覆盖原有的数据，因此不能够使用context对象；

**2 Request对象**: 该对象只在同一个页面有效，当需要进行页面跳转的时候，显然必须使用转发技术来实现，因此Request对象也不能够有效解决该问题。

 

## 会话技术

为了解决上述的问题，这里引入了会话技术，其中会话技术主要分为两个部分，cookie技术和session技术，前者将数据保存在客户端，后者将数据保存在服务器。

- Cookie技术：Cookie是客户端技术，服务器把每个用户的数据以cookie的形式写给用户各自的浏览器。当用户使用浏览器再去访问服务器中的web资源时，就会带着各自的数据去。这样，web资源处理的就是用户各自的数据了。
- Session技术：Session是服务器端技术，利用这个技术，服务器在运行时可以为每一个用户的浏览器创建一个其独享的session对象，由于session为用户浏览器独享，所以用户在访问服务器的web资源时，可以把各自的数据放在各自的session中，当用户再去访问服务器中的其它web资源时，其它web资源再从用户各自的session中取出数据为用户服务。

 

### （一） Cookie技术

#### 1.1 Cookie技术核心

Cookie类：用于存储会话数据

1）构造Cookie对象

- `Cookie(java.lang.String name, java.lang.String value)`\
- Cookie其实是一个普通的Java类，可以直自己去创建对象，相对于我们之前自己定义的那些Student、Teacher这些类
- 包含的核心组成：一个是name(名称)，一个是value(属性值)，

2）设置cookie

- `void setPath(java.lang.String uri) ` ：设置cookie的有效访问路径
- `void setMaxAge(int expiry)` ： 设置cookie的有效时间
- `void setValue(java.lang.String newValue) `：设置cookie的值

3）发送cookie到浏览器端保存

- `void response.addCookie(Cookie cookie) ` : 发送cookie

4）服务器接收cookie:

- `Cookie[] request.getCookies()`  : 接收cookie，返回所有cookie的数据信息

#### 1.2 Cookie原理

1）服务器创建cookie对象，把会话数据存储到cookie对象中。

- `new Cookie("name","value");`

2）服务器发送cookie信息到浏览器

- `response.addCookie(cookie);`

举例： `set-cookie: name=Infaraway `( 隐藏发送了一个set-cookie名称的响应头 )

3）浏览器得到服务器发送的cookie，然后保存在浏览器端。

4）浏览器在下次访问服务器时，会带着cookie信息

举例： `cookie: name=Infaraway `(隐藏带着一个叫cookie名称的请求头)

5）服务器接收到浏览器带来的cookie信息

- `request.getCookies();`

```java
 import javax.servlet.ServletException;
 import javax.servlet.http.Cookie;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import java.io.IOException;
 
 public class CreateCookie {
     public void doGet(HttpServletRequest request, HttpServletResponse response)
             throws ServletException, IOException {
         //1.创建Cookie对象
         Cookie cookie = new Cookie("name", "value");
         Cookie cookie2 = new Cookie("yourCookie","id");
 
         /**
          * 设置cookie的有效路径。默认情况：有效路径在当前web应用下。 /cookie
          */
         cookie1.setPath("/cookie");

         /**
          * 设置cookie的有效时间
          * 正整数：表示cookie数据保存浏览器的缓存目录（硬盘中），数值表示保存的时间。
          * 负整数：表示cookie数据保存浏览器的内存中。浏览器关闭cookie就丢失了！
          * 零：表示删除同名的cookie数据
          */
         cookie1.setMaxAge(20); //20秒，从最后不调用cookie开始计算
         cookie1.setMaxAge(-1); //cookie保存在浏览器内存（会话cookie）
         cookie1.setMaxAge(0);
 
         //  把cookie数据发送到浏览器（通过响应头发送： set-cookie名称）
         response.setHeader("set-cookie", cookie.getName());

         //推荐使用这种方法，避免手动发送cookie信息
          response.addCookie(cookie1);
 
         //  接收浏览器发送的cookie信息
         String name = request.getHeader("cookie");
         System.out.println(name);
         
         // 获取所有的Cookie
         Cookie[] cookies = request.getCookies();
         //注意：判断null,否则空指针
         if(cookies!=null){
             //遍历
             for(Cookie c:cookies){
                 String name = c.getName();
                 String value = c.getValue();
                 System.out.println(name+"="+value);
             }
         }else{
             System.out.println("没有接收cookie数据");
         }
     }
 }
```





#### 1.3 Cookie的细节

1）`void setPath(java.lang.String uri)  `：设置cookie的有效访问路径。有效路径指的是cookie的有效路径保存在哪里，那么浏览器在有效路径下访问服务器时就会带着cookie信息，否则不带cookie信息。

2）`void setMaxAge(int expiry) `： 设置cookie的有效时间。

- ​    正整数：表示cookie数据保存浏览器的缓存目录（硬盘中），数值表示保存的时间。
- ​    负整数：表示cookie数据保存浏览器的内存中。浏览器关闭cookie就丢失了！！
- ​    零：表示删除同名的cookie数据

3）Cookie数据类型只能保存非中文字符串类型的。可以保存多个cookie，但是浏览器一般只允许存放300个Cookie，每个站点最多存放20个Cookie，每个Cookie的大小限制为4KB。

4)Cookie属性

![image-20210829165742192](https://img-blog.csdnimg.cn/img_convert/7a7d9321bc0502c763c438ac38822132.png)

5)Cookie方法

**构造方法**

**name是final修饰的，不能被更改，所以name只有get方法**

![image-20210829165922572](https://img-blog.csdnimg.cn/img_convert/577a173bcc69e1ac55cd69d9f34ff283.png)

**添加获取方法**

![image-20210829170330155](https://img-blog.csdnimg.cn/img_convert/92a01ac86b2723d2ec32eb4e68232a18.png)

#### 1.4 Cookie使用案例

- 需求说明
  - 通过Cookie记录最后访问时间,并在浏览器上显示出来。
- 最终目的
  - 掌握Cookie的基本使用，从创建到添加喀户端，再到从服务器端获取。
- 实现步骤
  - 1.通过响应对象写出一个提示信息。
  - 2.创建Cookie对象,指定name和value。
  - 3.设置Cookie最大存活时间。
  - 4.通过响应对象将Cookie对象添加到客户端。
  - 5.通过请求对象获取Cookie对象。
  - 6.将Cookie对象中的访问时间写出。

```java
@WebServlet("/cookieUse")
public class CookieUse extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.通过响应对象写出提示信息
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter pw = resp.getWriter();
        pw.write("欢迎访问，你最近的访问时间为：<br>");
        //2.创建Cookie对象，用于记录最后访问时间
        Cookie cookie = new Cookie("time", System.currentTimeMillis() + "");
        //3.设置最大存活时间
        cookie.setMaxAge(3600);//如果不去设置的话，默认是-1，负整数：表示只是当前回话有效
        //4. 将cookie对象添加到客户端
        resp.addCookie(cookie);
        //5. 获取cookie
        Cookie[] arr = req.getCookies();
        for(Cookie c : arr){
            if ("time".equals(c.getName())){
                //获取cookie对象的value，进行写出
                String value = c.getValue();
                //对输出数据进行格式化
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                pw.write(sdf.format(new Date(Long.parseLong(value))));

            }
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### （二） Session技术

#### **2.1  引入**

Cookie的局限：

- 1）Cookie只能存字符串类型。不能保存对象
- 2）只能存非中文。
- 3）1个Cookie的容量不超过4KB。

如果要保存非字符串，超过4kb内容，只能使用session技术！

Session特点：会话数据保存在服务器端。（内存中）

 

#### **2.2 Session技术核心**

HttpSession类：用于保存会话数据

1）创建或得到session对象

- `HttpSession getSession()`
- `HttpSession getSession(boolean create)`

2）设置session对象

- `void setMaxInactiveInterval(int interval) `： 设置session的有效时间
- `void invalidate() `： 销毁session对象
- `java.lang.String getId() `： 得到session编号

3）保存会话数据到session对象

- `void setAttribute(java.lang.String name, java.lang.Object value) `： 保存数据
- `java.lang.Object getAttribute(java.lang.String name) `： 获取数据
- `void removeAttribute(java.lang.String name) `： 清除数据

#### **2.3 Session原理**

HTTP协议是一种无状态协议，同一个用户在同一台设备上多次对同一个服务器端进行访问时，默认在服务器端并不保存此用户的相关信息，所以，无论访问多少次，服务器端都无法识别用户的身份！

问题： 服务器能够识别不同的浏览者！

关键： 在哪个session域对象保存数据，就必须从哪个域对象取出！

代码解读：`HttpSession session = request.getSession();`

1）第一次访问创建session对象，给session对象分配一个唯一的ID，叫JSESSIONID

　　`new HttpSession();`

2）把JSESSIONID作为Cookie的值发送给浏览器保存

　　`Cookie cookie = new Cookie("JSESSIONID", sessionID);`

　　`response.addCookie(cookie);`

3）第二次访问的时候，浏览器带着JSESSIONID的cookie访问服务器

4）服务器得到JSESSIONID，在服务器的内存中搜索是否存放对应编号的session对象。

```java
if(找到){
　　return map.get(sessionID);
}
Map<String,HttpSession>

```


5）如果找到对应编号的session对象，直接返回该对象

6）如果找不到对应编号的session对象，创建新的session对象，继续走1的流程

结论：通过JSESSION的cookie值在服务器找session对象！

```java
import java.io.IOException;
 import javax.servlet.ServletException;
 import javax.servlet.http.Cookie;
 import javax.servlet.http.HttpServlet;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import javax.servlet.http.HttpSession;

 public class CreateSession extends HttpServlet {
 
     public void doGet(HttpServletRequest request, HttpServletResponse response)
             throws ServletException, IOException {
         //1.创建session对象
         HttpSession session = request.getSession();
         //得到session编号
         System.out.println("id="  + session.getId());
         //修改session的有效时间
         session.setMaxInactiveInterval(20);
         //手动发送一个硬盘保存的cookie给浏览器
         Cookie c = new Cookie("JSESSIONID",  session.getId());
         c.setMaxAge(60*60);
         response.addCookie(c);
 
         //2.保存会话数据
         session.setAttribute("name", "Infaraway");
     }
 }
```

 

 ```java
 import javax.servlet.ServletException;
  import javax.servlet.http.Cookie;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.io.IOException;
  
  public class DeleteCookie extends HttpServlet {
  
      public void doGet(HttpServletRequest request, HttpServletResponse response)
              throws ServletException, IOException {
          /**
           * 需求： 删除cookie
           */
          Cookie cookie = new Cookie("name","xxxx");
          cookie.setMaxAge(0);//删除同名的cookie
          response.addCookie(cookie);
          System.out.println("删除成功");
      }
  }
 ```

关于使用Session保存的数据，通常是：

- 用户身份的唯一标识，例如用户的id
- 高频率使用的数据，例如用户的权限
  - 可能存在数据不一致的风险
- 不便于使用其它存储技术进行处理的数据

关于Session消失的机制：

- 超时，如果某客户端长时间未向服务器端发起任何请求，则在服务器端上，此客户端对应的Session数据会被清除，常见的设置值是15分钟或30分钟
- 更换客户端（包括更换浏览器、关开浏览器），也会无法访问此前的Session数据，并且，此前的Session数据将会根据超时机制被清理
- 服务器端设备关机或重启
- 服务器端程序调用了清除Session数据的方法，例如调用了`HttpSession`对象的`invalidate()`方法

 HttpSession

- 他实际上是一个接口，在我们使用时，会由服务器来提供实现类，只需要获取实现类对象使用即可
- HttpSession :服务器端会话管理技术。
  - 本质也是采用客户端会话管理技术。
  - 只不过在**客户端**保存的是一个特殊标识,而共享的数据保存到了**服务器端**的内存对象(HttpSession对象)中。
  - 每次请求时,会将特殊标识带到服务器端,根据这个标识来找到对应的内存空间,从而实现数据共享!
  - 是Servlet规范中四大域对象之一的会话域对象。
- 作用:可以实现数据共享
- 域对象

![image-20210830092407023](https://img-blog.csdnimg.cn/img_convert/c91e000644e61414ca658b0147afdabe.png)

#### 2.4 HttpSession方法

##### 常用方法

![image-20210830093007611](https://img-blog.csdnimg.cn/img_convert/da0bf0475cf695d5f0705db5a2a8e40a.png)

##### 获取方法

![image-20210830184535987](https://img-blog.csdnimg.cn/img_convert/a48232a699108fa1cde43112bbc40f2a.png)

getSession()方法里面传一个Boolean类型的参数，参数默认值是true，true意思就是说如果没有找到这个实现类对象，它会帮我们去创建出这样的一个新的对象出来，指定为false的话，如果找不到它也不会帮我们去创建了

客户端浏览器去访相应的资源的时候，比如调用getSession()方法，调用这个方法是，服务器会查看是否携带JSESSIONID的值（特殊的标识），

带了的话，比如该值是001，查看该值。。有的话，代表了服务器内存空间里面有一个对应的实现类对象，其标识就是001，有的话就能够拿到这个实现类对象进行使用

![image-20210830093511346](https://img-blog.csdnimg.cn/img_convert/52a56e77e80690a37125573557471eea.png)

没有的话，分配完id后会在服务器内存空间里面创建出来一个实现类对象，而且会分配一个唯一的标识

![image-20210830183845893](https://img-blog.csdnimg.cn/img_convert/57840adb782715ac28fbd987f9d2ce16.png)

没有携带的话，会创建实现类对象，并会分配一个唯一的标识个服务器内存空间，最后再把中国唯一标识发送给客户端

![image-20210830184051641](https://img-blog.csdnimg.cn/img_convert/1f3493ceeff6c3b7cac64bd6befaf552.png)

#### 2.5 HttpSession的使用

- 需求说明
  - 通过第一个Servlet设置共享数据用户名,在第二个Servlet获取到。
- 最终目的
  - 掌握HttpSession的基本使用,如何获取和使用。
- 实现步骤
  - 1.在第一个Servlet中获取请求的用户名。
  - 2.获取HttpSession对象。
  - 3.将用户名设置到共享数据中。
  - 4.在第个 Servlet 中获取HttpSession 对象。
  - 5.获取共享数据用户名。
  - 6.将获取到用户名响应给客户端浏览器。

储存数据

```java
@WebServlet("/Session1")
public class SessonDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.获取请求的用户名
        String username = req.getParameter("username");
        //2.获取Ht tpSession的对象
        HttpSession session = req.getSession();
        //3.将用户名信息添加到共享数据中
        session.setAttribute("username",username);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

 获取数据

```java
@WebServlet("/Session2")
public class SessonDemo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.获取Ht tpSession对象
        HttpSession session = req.getSession();
        //2.获取共享数据
        Object username = session.getAttribute("username");
        //3.将数据响应给浏览器
        resp.getWriter().write(username+"");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

#### 2.6  Sesson细节

![image-20210830190239327](https://img-blog.csdnimg.cn/img_convert/1e7056086a996200b680c8c630fd64e3.png)

- 浏览器禁止使用Session
  - 方式一:通过提示信息告知用户,大部分网站采用的解决方式。(推荐
  - 方式二:访问时拼接jsessionid标识,过encodeURLO方法重写地址。(了 解)
- 钝化和活化
  - 什么是钝化和活化
    - 钝化:列化。把长时间不用,但还不到过期时间的HttpSession进行序列化,写到磁盘上。
    - 活化:相反的状态。
  - 何时钝化
    - 第一种情况:当访问量很大时,服务器会根据getL astAccess Time来进行排序,对长时间不用，但是还没到过期时间的HttpSession进行序列化。
    - 第二种情况:当服务器进行重启的时候,为了保持客户HttpSession中的数据,也要对其进行序列化。
  - 注意
    - HttpSession的序列化由服务器自动完成,我们无需关心。

1）`java.lang.String getId()` ： 得到session编号

2）两个getSession方法：

- `getSession(true) `/` getSession()` : 创建或得到session对象。没有匹配的session编号，自动创 建新的session对象。
- `getSession(false)`: 得到session对象。没有匹配的session编号，返回null

3）`void setMaxInactiveInterval(int interval) `： 设置session的有效时间

**session对象销毁时间：**

- 1 默认情况30分服务器自动回收
- 2 修改session回收时间
- 3 全局修改session有效时间

```xml
 <!-- 修改session全局有效时间:分钟 -->
<session-config>
　　<session-timeout>1</session-timeout>
</session-config>
```

 

- 4.手动销毁session对象

　　　　`void invalidate()` ： 销毁session对象

4）如何避免浏览器的JSESSIONID的cookie随着浏览器关闭而丢失的问题？

　　浏览器关闭而丢失cookie的原因是cookie的有效时间设置中参数为负整数导致，因此需求使用setMaxAge()函数将时间修正为正整数即可。

```java
 /**
 * 手动发送一个硬盘保存的cookie给浏览器
 */
 Cookie c = new Cookie("JSESSIONID",session.getId());
 c.setMaxAge(60*60);
 response.addCookie(c);
```





### 总结：

1）会话管理： 浏览器和服务器会话过程中的产生的会话数据的管理。

2）Cookie技术：

- `new Cookie("name","value")`
- `response.addCookie(coookie)`
- `request.getCookies()`

3）Session技术

- `request.getSession();`
- `setAttrbute("name","会话数据");`
- `getAttribute("会话数据")`