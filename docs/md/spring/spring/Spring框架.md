# Spring框架
[[TOC]]



# 1.Spring介绍与前置知识点

Spring框架是一个开放源代码的J2EE应用程序框架，由Rod Johnson发起，是针对bean的生命周期进行管理的轻量级容器（lightweight container）。
Spring解决了开发者在J2EE开发中遇到的许多常见的问题，提供了功能强大IOC、AOP及Web MVC等功能。Spring可以单独应用于构筑应用程序，也可以和Struts、Webwork、Tapestry等众多Web框架组合使用，并且可以与 Swing等桌面应用程序AP组合。因此， Spring不仅仅能应用于JEE应用程序之中，也可以应用于桌面应用程序以及小应用程序之中。Spring框架主要由七部分组成，分别是 Spring Core、 Spring AOP、 Spring ORM、 Spring DAO、Spring Context、 Spring Web和 Spring Web MVC。 

## 1.1 数据库

知识点：

1. Sql语句 CURD 操作的核心. 单表操作
2. **多表关联操作 笛卡尔积（只显示2张表的共有数据） 左连接、右连接、内连接**
3.  关键字： like in and or order by asc/desc group by 数据库函数调用

端口号：默认端口号3306 、3307
**权限： mysql数据库默认只允许自己本机进行-连接。** 必须开放数据库权限才可以。
版本： mysql: 至少5.5及以上的版本 mariadb: 10以上

## 1.2 前端知识

1.静态资源 ： html/css/js 不需要单独的服务器。都是由浏览器进行 “解释执行”
态度：
定位：后端开发工程师 数据
态度：能看懂即可。 Ajax JS 必须会写!

## 1.3 VUE.js

核心：

1. 双向数据绑定 vue中的**属性**与页面**输入框**之间进行绑定
2.  VUE 设计思想：
   MVVM思想 model模型（数据） view视图 VM(vue对象特有的结构)

# 2 Spring核心技术

1. IOC/DI

2. AOP

# 3.Spring入门案例

## 3.1 Spring jar包下载(了解)

[官网地址:](https://repo.spring.io/release/org/springframework/spring/5.3.6/)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420130618993.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.2 通过mven方式导入jar包

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.jt.new</groupId>
    <artifactId>spring_demo1</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>

        <!--Spring核心包-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.3.6</version>
        </dependency>

        <!--引入SpringBean-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>5.3.6</version>
        </dependency>

        <!--引入context包-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.6</version>
        </dependency>

        <!--引入表达式jar包-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-expression</artifactId>
            <version>5.3.6</version>
        </dependency>

        <!--引入日志依赖-->
        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.2</version>
        </dependency>

        <!--引入测试包-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
        </dependency>
    </dependencies>

</project>

```

## 3.3 编辑application.xml文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--通过bean标签完成对象的创建-->
    <bean id="user" class="com.jt.pojo.User"></bean>
</beans>

```

## 3.4 编辑测试类

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420131156504.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

# 4 Spring核心技术IOC

## 4.1 问题说明

说明: 传统的代码是直接通过new的方式创建对象. 这样的方式将对象与对象紧紧的绑定到一起,不便于代码的扩展.所以需要进行松耦合处理.

### 4.1.1 面向对象编程

#### 编辑Dog类

```java
public class Dog {

    public void hello(){
        System.out.println("你好,我是小狗汪汪汪");
    }
}
```

#### 编辑Cat类

```java
public class Cat {

    public void hello(){
        System.out.println("你好,我是小猫喵喵喵");
    }
}
```

#### 编辑测试类

```java
package com.jt.demo1;

public class User {
    //说明: 当前类中 Dog对象与User对象绑定.耦合性高
    //如果需要切换Cat对象.则需要手动修改代码.
    //所以得出结论,如果自己实例化对象,则不能实现很好的解耦.
    private static Dog dog = new Dog();
    //private static Cat cat = new Cat();

    public static void main(String[] args) {
        dog.hello();
    }
}
```

####  上述代码的总结

1. 该User类与属性紧紧的绑定在一起. 耦合性高
2. 类中的方法与属性的名称绑定在一起. 耦合性高.

### 4.1.2面向接口编程

#### 面向接口编程说明

说明: 将子类中的方法 进行高级的抽取,抽取到接口中. 这时该接口用来定义行为规范准则.
面向接口编程优势: 解决了属性与方法名的耦合.以后几乎可以不修改属性名

####  代码结构

1. 定义Pet 接口

   ```java
   //定义一个宠物的接口
   public interface Pet {
       void hello();
   }
   
   ```

   2.定义Dog类

   ```java
   
   public class Dog implements Pet{
   
       public void hello(){
           System.out.println("小狗汪汪汪");
       }
   }
   
   ```

   3.定义Cat类

   ```java
   
   public class Cat implements Pet{
   
       public void hello(){
           System.out.println("小猫 喵喵喵！！！");
       }
   }
   
   ```

   4.定义测试类

   ```java
   public class User {
   
       /**
        *  说明： 如果用户喜欢狗
        *  讨论： 这样的代码有什么问题
        *  问题描述:
        *      1. 宠物对象与当前的用户紧紧的绑定在一起. 耦合性高
        *      2. 对象与方法 紧紧的绑定在一起. 耦合性高
        */
       //private static Dog dog = new Dog();
       //private static Cat cat = new Cat();
       //面向接口开发: 优势解决了属性与方法的耦合性问题
       private static Pet pet = new Cat();
   
       public static void main(String[] args) {
           pet.hello();
       }
   }
   
   ```

   

#### 面向接口编程弊端

说明: 虽然面向接口编程可以在一定程度上解决代码耦合性的问题----------解决了属性与方法之间的耦合性问题.但是根源问题没有解决.
当前的User类与Cat等对象 紧紧的耦合在一起.如果后期维护,则必然要修改源码.

![在这里插入图片描述](https://img-blog.csdnimg.cn/28b7524360eb4a70bfb115473da35a59.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 4.2 什么是IOC

控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低**计算机代码之间的耦合度**。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象中。

概念: 将对象创建的权利交给Spring容器管理,由容器控制对象的生命周期(创建---初始化---使用---销毁)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421115103942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

作用: 

1. 原来的对象的创建都是由用户自己手动创建,这样的方式耦合性 肯定高. 如果类发生了变化,则代码都得修改.
2.  现在所有的对象都交给Spring容器管理. 用户无需关心对象是如何实例化. 容器负责对象的注入即可. 以后几乎不用修改任何代码. **降低了代码的耦合性**

## 4.3 IOC实现原理

### 4.3.1Spring容器如何创建对象

1).当Spring程序执行时,首先会根据配置文件的内容进行解析

2).当程序解析到bean标签时,加载属性id和class,会根据反射的机制实例化对象

```java
@Test
    public void demo2() throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        //1.通过类的路径实例化类型...
        Class userClass = Class.forName("com.jt.pojo.User");
        //2.实例化对象
        User user = (User) userClass.newInstance();
        user.say();
    }
```

3).将实例化好的对象保存到超大的Map集合中<K,V> bean中的Id当做map的Key,实例化好的对象当做Value,i形式:`Map<id,实例化对象>`,到此为止,Spring容器启动成功.

4). 从容器中获取对象. 则从Map集合中通过id或者class类型获取对象即可.

```java
	  User user = (User) context.getBean("user");
```

5).由spring容器管理对象的生命周期,根据对象调用业务方法.

### 4.3.2 关于反射机制补充说明

反射机制 必然调用对象的无参构造方法,所以特别注意!!!

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421155548755.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 4.3.3 Spring-IOC入门案例

#### 准备Dog类

```java
package com.jt.demo2;

public class Dog {

    public void hello(){
        System.out.println("小狗 交给Spring容器管理");
    }
}

```

#### 准备spring的配置文件

说明: spring早期都使用配置文件的方式来管理对象.但是随着软件的升级当下**注解**的方式已经成为主流. 所以先完成xml配置文件的方式,之后完成注解的方式.

内容说明: xml文件 一般都会有固定的头标签

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--将Dog对象交给Spring容器管理
        术语: bean  被spring容器管理的对象称之为bean
        1.属性id是bean的唯一标识符. 一般类名首字母小写,不能重复
        2.属性class 表示被管理的类,对象的全路径
    -->
    <bean id="dog" class="com.jt.demo2.Dog"></bean>
    <!--<bean id="cat" class="com.jt.demo2.Cat"></bean>-->

</beans>
```

####  准备SpringGetDog类

```java
package com.jt.demo2;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringGetDog {

    //该类表示从spring容器中,动态获取Dog对象
    public static void main(String[] args) {
        //1.指定spring配置文件路径
        String resource = "spring.xml";
        //2.启动spring容器
        ApplicationContext context =
                new ClassPathXmlApplicationContext(resource);
        //3.从容器中获取对象  必须强制类型转化
        Dog dog1 = (Dog) context.getBean("dog");
        Dog dog2 = context.getBean(Dog.class);
        System.out.println(dog1);//输出的是地址
        System.out.println(dog2);
        //4.对象调用方法
        dog1.hello();
    }
}

```

#### 核心问题-spring如何创建对象

说明: 默认条件下,Spring容器启动时,就会创建对象,如果创建对象的过程中,出现问题.则容器启动失败.

1. 为Dog类添加构造方法
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/35dd4e3c354840878f522f1a6b877568.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

2. 反射代码

```java
/**
     * Spring实例化对象的核心原理-反射机制
     * 注意事项: 反射代码 必然会调用对象的无参构造方法.
     */
    public static void getDog(){
        try {
            Dog dog = (Dog) Class.forName("com.jt.demo2.Dog").newInstance();
            dog.hello();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
```

# 5.Spring创建对象方式

通过spring容器创建的对象一般是通过反射机制调用.但是有的时候由于业务需要需要实例化**抽象类的对象/复杂的接口对象**

说明: Spring提供了工厂模式用于实例化复杂对象!!!

## 5.1 静态工厂模式

补充:

静态方法特点: 

1.静态方法调用可以通过类名直接调用. static

2.静态属性 内存当中独一份.

### 5.1.1 编辑静态工厂类

```java
package com.jt.factory;

import java.util.Calendar;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class staticFactory {

    //通过静态工厂实例化对象
    public static Calendar getInstance(){
        return Calendar.getInstance();
    }
}
```

### 5.1.2 编辑静态工厂配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

   <!--静态工厂实例化对象的写法 方法必须是static-->
   <bean id="calendar1" class="com.jt.factory.StaticFactory" factory-method="getCalendar"/>
</beans>
```



### 5.1.3 编辑测试类

```java
 /*通过静态工厂获取数据 要求方法必须为static配置*/
    @Test
    public void staticFactory(){
        //如果省略不写,默认是application.xml
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        Calendar calendar = context.getBean("calendar1",Calendar.class);
        System.out.println("获取当前时间:"+ calendar.getTime());
    }
```

## 5.2 实例工厂

调用: 对象.方法()

### 5.2.1 编辑实例工厂

```java
package com.jt.factory;

import java.util.Calendar;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class InstanceFactory {
    //获取Calendar对象

    public Calendar getCalendar(){

        return Calendar.getInstance();
    }
}

```

### 5.2.2 编辑xml配置文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

   <!--1.静态工厂实例化对象的写法 方法必须是static-->
   <bean id="calendar1" class="com.jt.factory.StaticFactory" factory-method="getCalendar"/>

   <!--2.实例化工厂   步骤1:将工厂交给spring容器管理   步骤2: 通过对象调用方法 -->
   <bean id="instanceFactory" class="com.jt.factory.InstanceFactory"></bean>
   <bean id="calendar2" factory-bean="instanceFactory" factory-method="getCalendar"></bean>

</beans>
```

### 5.2.3 编辑测试类

```java
 /*如果方法中没有static关键字,则可以通过实例工厂创建对象*/
    @Test
    public void instanceFactory(){
        //如果省略不写,默认是application.xml
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        Calendar calendar = context.getBean("calendar2",Calendar.class);
        System.out.println(calendar.getTime());
    }
```

## 5.3 spring工厂模式(通用)

说明: 如果需要创建复杂对象 首选工厂模式

### 5.3.1Java配置创建对象

#### 关于对象管理问题说明

问题: 任意对象都可以通过new的关键字 实例化吗?
答案: 当然不是, 抽象类对象 不可以直接实例化.

#### 创建项目springdemo4_factory

![在这里插入图片描述](https://img-blog.csdnimg.cn/822f6293bf074282b0033ebc46d3381d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_15,color_FFFFFF,t_70,g_se,x_16)

#### 关于spring中注解说明

1. @Component 将当前的类,交给Spring容器管理, 对象的创建是由**Spring通过反射机制**自动创建对象.

2. @ComponentScan(“com.jt”) 指定扫描的包路径, 可以扫描它的子孙包,用在配置类中

#### 代码结构

![在这里插入图片描述](https://img-blog.csdnimg.cn/c984506b16a545fdb79b6be25c768d1f.png)

####  编辑配置类

```java
package com.jt.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
//准备一个配置类
@Configuration
@ComponentScan("com.jt")
//当spring容器启动时,根据指定的包路径,扫描其子孙包
public class SpringConfig {


}

```

#### 编辑User类

```java
package com.jt.demo;

import org.springframework.stereotype.Component;
//Spring容器管理  Map<类名首字母小写:user,实例化的对象>
@Component
public class User { //spring容器通过反射机制实例化对象

    public void say(){
        System.out.println("通过@Component注解实例化对象");
    }
}

```

#### 编辑测试类

```java
package com.jt;

import com.jt.config.SpringConfig;
import com.jt.demo.User;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class TestSpring {

    @Test
    public void testDemo1(){
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        User user = context.getBean(User.class);
        user.say();
    }
}
```

### 5.3.2 利用工厂模式创建对象(Java配置)

####  业务说明

Spring中管理的对象,大部分可以通过new/反射进行对象的创建. 但是有些对象由于特殊的原因.不能直接new/实例化.这时需要考虑是否可以通过工厂模式实现.

例如: Calendar 该类是一个抽象类 所以不能直接实例化

![在这里插入图片描述](https://img-blog.csdnimg.cn/1534325fb34d48e891291855c36999ca.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 创建工厂模式

```java
package com.jt.factory;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.stereotype.Component;

import java.util.Calendar;

/**
 * FactoryBean是Spring提供的接口,spring自动完成调用.获取指定的对象
 * 难点讲解:
 *      1.@Component 标识类 则将该类交给Spring容器管理.
 *      2.Spring中FactoryBean的讲解
 *          如果spring加载的时候遇到FactoryBean接口
 *          则会自动的执行重写的方法getObject/getObjectType
 *      3.工厂模式说明:
 *          Map<Key:calendar,value=Calendar对象></>
 *
 *      核心功能:
 *              1. key: 就是当前类型(如果自己编辑注解以注解为准)
 *              2. value: 调用getObject获取的返回值对象
 *              将上述的数据,交给Spring容器管理
 *      该功能什么时候使用:
 *              1. 某些对象不能直接实例化的.
 *              2. 整合其它第三方框架对象时 经常使用.
 */
@Component("calendar")
public class CalendarFactory implements FactoryBean<Calendar> {

    public CalendarFactory(){
        System.out.println("工厂模式的无参构造");
    }

    //现阶段 大家理解为主. 未来写结构设计的时候,作用很大!!!!!
    //动态执行该方法,获取返回值对象
    @Override
    public Calendar getObject() throws Exception {
        //利用calendar的工具API 实现对象的创建
        return Calendar.getInstance();
    }

    @Override
    public Class<?> getObjectType() {
        //固定写法. 一般直接xxx.class即可
        return Calendar.class;
    }
}

```

#### 编辑测试API

```java
  @Test
    public void testDemo2(){
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        //Calendar calendar = context.getBean(Calendar.class);
        Calendar calendar = (Calendar) context.getBean("calendar");
        System.out.println("获取当前时间:"+calendar.getTime());
        System.out.println("获取年:"+calendar.getWeekYear());
    }
```

### 5.3.3XML配置

#### 编辑spring工厂

```java
package com.jt.factory;

import org.springframework.beans.factory.FactoryBean;

import java.util.Calendar;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class SpringFactory implements FactoryBean<Calendar> {
    //工厂模式实例化对象的方法
    @Override
    public Calendar getObject() throws Exception {
        return Calendar.getInstance();
    }
    
    //获取类型
    @Override
    public Class<?> getObjectType() {
        return Calendar.class;
    }

    //是否为单例模式  默认为true
    //默认条件下spring容器中都是单例对象  节省空间 单例对象  多例对象
    //多线程问题  多例对象 ?????  安全性问题!
    //多个资源对共享数据进行操作!!!!
    //对象.方法() 没有安全性问题  提倡使用单例
    @Override
    public boolean isSingleton() {
        return true;
    }
}


```

#### 编辑xml配置文件或测试类

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

   <!--1.静态工厂实例化对象的写法 方法必须是static-->
   <bean id="calendar1" class="com.jt.factory.StaticFactory" factory-method="getCalendar"/>

   <!--2.实例化工厂   步骤1:将工厂交给spring容器管理   步骤2: 通过对象调用方法 -->
   <bean id="instanceFactory" class="com.jt.factory.InstanceFactory"></bean>
   <bean id="calendar2" factory-bean="instanceFactory" factory-method="getCalendar"></bean>

   <!--3.spring工厂模式 -->
   <bean id="calendar3" class="com.jt.factory.SpringFactory"></bean>

</beans>

```

#### 配置测试类

```java
 /**
     * 更加通用的工厂模式
     */
    @Test
    public void SpringFactory(){
        //如果省略不写,默认是application.xml
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        Calendar calendar = context.getBean("calendar3",Calendar.class);
        System.out.println(calendar.getTime());
    }
```

#### 回调执行原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421172434597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

# 6 关于单例多例模式说明

## 6.1 单例/多例模式说明

单例: 在Spring容器中,有且只有一份对象.并且默认通过构造方法实例化对象----单例对象

多例: 需要时创建,并且将创建好的对象赋值给调用者------数据源链接

单例模式:内存中的对象就一份;

多例模式:内存中的对象有多份;

**Spring中的对象默认是单例的.**

## 6.2 编辑xml配置文件

```java
<!--4.测试单例多例 通过scope属性控制对象的单例和多例
      scope="prototype" 多例设置
      scope="singleton" 缺省值  单例
    -->
    
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--默认条件下都是单例模式 可以通过scope属性修改singleton-->
    <!--<bean id="user" class="com.jt.pojo.User" scope="singleton"></bean>-->

    <!--当对象为多例时,初始化容器不会创建对象 什么时候 用,什么时候创建-->
    <bean id="user" class="com.jt.pojo.User" scope="prototype"></bean>
</beans>

```

测试代码

```java
@Test
    public void test01(){
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        User user1 = context.getBean("user", User.class);
        User user2 = context.getBean("user", User.class);
        user1.addUser();
    }
```



## 6.3 关于注解@Scope

```java
	package com.jt.demo3;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@ComponentScan("com.jt.demo3")
                        //根据指定的包路径扫描注解,扫描当前包及其子孙包
@Configuration          //标识当前类是配置类 其实就是配置文件
public class SpringCatConfig {
    /**
     * 注解管理对象--自定义对象:
     *  1.方法必须为公有的
     *  2.必须添加返回值,返回值的对象,就是容器管理的对象
     *  3.方法的名称就是bean的Id
     *  4.方法必须使用@Bean注解标识,spring才会执行该方法,标识该对象交给Spring容器管理,
     */
    @Bean
    @Scope("prototype") //表示多例对象
    //@Scope("singleton") //表示单例对象
    public Cat cat(){
        return new Cat();
    }
}


```



## 6.4 懒加载配置

懒加载: 当用户需要获取对象时,容器才创建对象,称之为懒加载

说明: Spring容器中默认的规则是:容器创建则对象创建.

如果需要配置懒加载 则需要添加额外的属性

### 6.4.1 关于懒加载说明

默认条件下,Spring容器启动,则会创建对象.(类比:饿汉式),如果开启了懒加载.则用户什么时候使用.则对象什么时候创建(类比:懒汉式).

注解:@Lazy

```java
 	@Bean
    @Scope("prototype") //表示多例对象
    //@Lazy                 //开启懒加载
    //@Scope("singleton") //表示单例对象
    public Cat cat(){
        return new Cat();
    }

```

关于多例模式和懒加载说明:

@Lazy只能控制单例模式,多例模式都是懒加载.

### 6.4.2 xml文件配置

```java
    <!--测试代码懒加载  默认为false 当getBean时实例化对象 -->
    <!--4.测试单例多例 通过scope属性控制对象的单例和多例
      scope="prototype" 多例设置
      scope="singleton" 缺省值  单例
      lazy-init="true"  开启懒加载
      lazy-init="false"/lazy-init="default"  懒加载不生效
      原则: 只要是多例对象 都是懒加载. 懒加载只对单例对象有效
      关于懒加载说明: 一般服务器对象应该先行创建,用户直接使用即可.
      多例对象: 用户使用时创建,同时将对象的生命周期交给使用者管理,
               Spring不负责维护对象的生命周期
      (随用随销)
   -->
    <bean id="user" class="com.jt.pojo.User" lazy-init="true"></bean>

```

### 6.4.3 多例与懒加载的关系

说明: 只要对象是多例模式,则都是懒加载!, 在单例模式中控制懒加载才**有效**.

规则说明:

lazy true lazy false

单例模式: 有效 懒加载 有效 立即加载

多例模式: 无效 懒加载 无效 懒加载

### 6.4.4 关于Lazy使用场景的说明

场景1: 服务器启动时,如果加载太多的资源,则必然导致服务器启动慢, 适当的将不重要的资源设置为懒加载.

场景2: 有时用户会需要一些特殊的"链接",而这些链接的创建需要很长的时间.可以使用懒加载.

## 6.5 spring对象初始化/销毁方法

说明: 一个对象从创建到消亡,可以划分为四个阶段. 如果需要对程序进行干预.则可以通过周期方法进行干预. (回调函数/钩子函数/接口回调)

### 6.5.1生命周期的过程:

```
1.实例化对象
2.初始化操作 (一般对对象的属性赋值)
3.用户使用对象(调用其中的方法) 
4.对象销毁 (一般都是释放资源)
```

### 6.5.2 编辑xml配置文件

```java
	<!--管理spring对象的生命周期方法-->
    <!--
      测试对象的生命周期
      init-method="init" 初始化方法
      destroy-method="destroy" 销毁方法
   -->
    <bean id="user" class="com.jt.pojo.User" init-method="init" destroy-method="destroy"></bean>

```

### 6.5.3 编辑测试类内容

```java
package com.jt.pojo;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class User {

    private Integer id;
    private String name;

    //1,无参构造方法
    public User(){
        System.out.println("通过构造方法创建对象");
    }

    public void init(){
        //2.初始化方法,一般调用初始化方法 为属性赋值(一般多为对象)
        this.id = 1000;
        this.name = "spring案例测试";
        System.out.println("调用初始化方法");
    }
    
    //3.业务方法

    public void addUser(){

        System.out.println("新增用户"+id+":"+name);
    }
    
    //4.销毁方法

    public void destroy(){
        //设置对象的销毁方法,一般都是为了释放资源
        this.id = null;
        this.name = null;
        System.out.println("调用对象的销毁方法");
    }
}

```

将Snake交给Spring容器管理

```java
 @Bean
    public Snake snake(){

        return new Snake();
    }

```



```java

//测试生命周期运行
    @Test
    public void testlife(){
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("application.xml");
        //获取对象
        User user = context.getBean(User.class);
        //3.用户调用方法
        user.say();
        //4.只要容器关闭,则对象销毁
        context.close();
    }
```



### 6.5.4 执行效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420154120421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 6.5.5 使用注解

1. @PostConstruct //在对象创建之后立即调用
   
2. @PreDestroy //对象消亡时 进行调用

# 7.IOC-DI（Dependency Injection，简称DI）

当某个角色(可能是一个Java实例，调用者)需要另一个角色(另一个Java实例，被调用者)的协助时，在 传统的程序设计过程中，通常由调用者来创建被调用者的实例。但在Spring里，创建被调用者的工作不再由调用者来完成，因此称为控制反转;创建被调用者 实例的工作通常由Spring容器来完成，然后注入调用者，因此也称为依赖注入。

总结: 对象中的属性,**应该由spring容器动态赋值.**

## 7.1 常规注入方式

```java
 //常规为属性赋值
    @Test
    public void test01(){
        //1.构造方法赋值
        User user = new User(1,"天上有星星");
        System.out.println(user);

        //2.set方法赋值
        User user2 = new User();
        user2.setId(2);
        user2.setName("下上有羊羊");
        System.out.println(user2);
    }
```

## 7.2 Spring Set赋值

### 7.2.1 编辑xml配置文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--Spring管理User对象-->
    <bean id="user" class="com.jt.pojo.User">
        <!--调用对象的set方法实现赋值 set方法必须添加-->
        <property name="id" value="100"></property>
        <property name="name" value="小花花"></property>
    </bean>
</beans>
```

### 7.2.2 编辑POJO对象

```java
package com.jt.pojo;


import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class User {

    private Integer id;
    private String name;
    private Set set;
    private List list;
    private Map map;
    private Properties pro;

    //快捷鍵 alt+insert

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getSet() {
        return set;
    }

    public void setSet(Set set) {
        this.set = set;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
    }

    public Properties getPro() {
        return pro;
    }

    public void setPro(Properties pro) {
        this.pro = pro;
    }

    public User(){

    }

    public User(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public User(Integer id, String name, Set set, List list, Map map, Properties pro) {
        this.id = id;
        this.name = name;
        this.set = set;
        this.list = list;
        this.map = map;
        this.pro = pro;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", set=" + set +
                ", list=" + list +
                ", map=" + map +
                ", pro=" + pro +
                '}';
    }
}
```

### 7.2.3 编辑测试类

```java
//set方法赋值
    @Test
    public void consUser(){
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        User user = context.getBean(User.class);
        System.out.println(user);
    }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420163104922.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 7.3 构造方法赋值

### 7.3.1 编辑xml配置文件

```java
<!--管理user对象-->
    <!--<bean id="user" class="com.jt.pojo.User">
      &lt;!&ndash;调用对象的set方法实现赋值 set方法必须添加&ndash;&gt;
      <property name="id" value="101"></property>
      <property name="name" value="李元芳"></property>
   </bean>-->
          
<!--构造方法进行注入-->
<bean id="user" class="com.jt.pojo.User">
        <constructor-arg name="id" value="200"></constructor-arg>
        <constructor-arg name="name" value="送我一朵小花花"></constructor-arg>
    </bean>
```

### 7.3.2 测试方法

```java
 //constructor构造方法赋值
    @Test
    public void constructorUser(){
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        User user = context.getBean(User.class);
        System.out.println(user);
    }
```

### 7.3.3 测试结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420163348938.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 7.4 特殊字符赋值

### 7.4.1 编辑xml配置文件

```xml
<!--使用特殊字符处理
        &lt;	<	小于
        &gt;	>	大于
        &amp;	&	和号
        &apos;	'	单引号
        &quot;	"	引号
        万能转义字符 <![CDATA[<<<测试值]]>
    -->
    <bean id="user" class="com.jt.pojo.User">
        <constructor-arg name="id" value="100"></constructor-arg>
        <constructor-arg name="name">
            <value><![CDATA[<<<测试值]]></value>
        </constructor-arg>
    </bean>

```

### 7.4.2 测试结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420170317750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 7.5属性注入高级用法

### 7.5.1 编辑POJO属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042214282656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 7.5.2 编辑xml配置文件

```java
<!--为集合赋值-->
   <bean id="user" class="com.jt.pojo.User">
      <property name="id" value="101"></property>
      <property name="name" value="李元芳"></property>
      <property name="list">
         <list>
            <value>张三</value>
            <value>王五</value>
            <value>老王</value>
         </list>
      </property>
      <property name="set">
         <set>
            <value>1</value>
            <value>2</value>
            <value>3</value>
         </set>
      </property>
      <property name="map">
         <map>
            <entry key="id" value="1000"></entry>
            <entry key="name" value="tomcat猫"></entry>
         </map>
      </property>
      <property name="pro">
         <props>
            <prop key="proId">110</prop>
            <prop key="proName">米老鼠</prop>
         </props>
      </property>
   </bean>
```

## 7.6 抽取集合类型

### 7.6.1 编辑头标签

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:util="http://www.springframework.org/schema/util"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

</beans>
```

### 7.6.2 实现对象引用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422145340680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 7.7 对象引用赋值

### 7.7.1 编辑Dog对象

```java
package com.jt.pojo;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class Dog {
    private String name;

    //添加无参构造方法
    public Dog(){

    }

    public Dog(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                '}';
    }
}

```

### 7.7.2 编辑xml配置文件

```java
 <bean id="user" class="com.jt.pojo.User">
        <constructor-arg name="id" value="100"></constructor-arg>
        <constructor-arg name="name">
            <value><![CDATA[<<<测试值]]></value>
        </constructor-arg>
        <constructor-arg name="dog" ref="dog"></constructor-arg>
    </bean>

    <bean id="dog" class="com.jt.pojo.Dog">
        <property name="name" value="哮天犬"></property>
    </bean>
```

### 7.7.3 测试结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420175130245.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 7.8 安装lombok插件

### 7.8.1 安装插件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420170427251.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 7.8.2 添加依赖包

```java
 	<!--添加lombok插件-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
            <scope>provided</scope>
        </dependency>

```

### 7.8.3 使用注解优化

```java
	/**
	* @author 刘昱江
	* 时间 2021/4/20
	*/
@Data   //动态get/set方法
@Accessors(chain = true)
@NoArgsConstructor  //添加无参构造
@AllArgsConstructor //添加全参构造
public class User {

    private Integer id;
    private String name;
}

```

## 7.9 MVC结构

说明: 如果将所有的业务代码都写到一个方法中,则导致后期维护耦合性高,为了提高程序的扩展性.将程序按照MVC设计思想 进行管理.

M: Model 数据层

V: View 视图层

C: Control 控制层

总结: MVC 主要的目的降低代码的耦合性,提高扩展性.方便后续开发.

![在这里插入图片描述](https://img-blog.csdnimg.cn/ae451f3147544108a9af7a8857741817.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

说明: 基于**MVC设计思想**的启发,在后端为了提高代码的扩展性,一般将后端代码分为三层.
分层:

1. Controller层 主要与页面进行交互 @Controller
2.  Service层 主要实现后端的业务逻辑 @Service
3.  Dao层/Mapper层 主要与数据库进行交互 也把该层称之为 “持久层” @Repository/@Mapper

### 纯注解实现

####  代码结构说明

1. 包名: mapper 类2个 一个接口UserMapper/一个实现类 UserMapperImpl
2. 包名: service 类2个 一个接口UserService/ 一个实现类UserServiceImpl
3. 包名: controller 一个类: UserController
   知识说明: 被调用的一般会有接口和实现类

####  编辑Mapper

1. 编辑UserMapper

```java
public interface UserMapper {

    void addUser();
}
```

2. 编辑Mapper 实现类

```java
@Repository //标识持久层 该类交给Spring容器管理 key:userMapperImpl value:对象
public class UserMapperImpl  implements UserMapper{

    @Override
    public void addUser() {
        System.out.println("新增用户成功!!!!");
    }
}
```

#### 编辑Service

1.  编辑UserService

```java
public interface UserService {
    void addUser();
}
```

2. 编辑UserServiceImpl

```java
package com.jt.demo5.service;

import com.jt.demo5.mapper.UserMapper;
import com.jt.demo5.mapper.UserMapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper; //IOC+DI 解耦!!!!!

    @Override
    public void addUser() {

        userMapper.addUser();
    }
}
```

#### 编辑Controller

```java
package com.jt.demo5.controller;

import com.jt.demo5.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller //key=userController
public class UserController {

    @Autowired
    private UserService userService;

    public void addUser(){
        userService.addUser();
    }
}
```

#### 编辑配置类

```java
@Configuration
@ComponentScan("com.jt.demo5")
public class SpringConfig {

}
```

#### 编辑测试类

```java
package com.jt.demo5;

import com.jt.demo5.config.SpringConfig;
import com.jt.demo5.controller.UserController;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Spring_MVC {

    public static void main(String[] args) {
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        UserController userController = context.getBean(UserController.class);
        userController.addUser();
    }
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/61f7fb74fa0a4d60bedd28f1a9c9230a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### XML实现

#### 7.9.1 编辑POJO

```java
/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
@Data   //动态get/set方法
@Accessors(chain = true)
@NoArgsConstructor  //添加无参构造
@AllArgsConstructor //添加全参构造
public class User {

    private Integer id;
    private String name;
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422152431618.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 7.9.2 编辑UserDao

```java
/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class UserDao {

    public void addUser(User user){
        System.out.println("新增用户:"+user.getName());
    }
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042215253738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 7.6.3 编辑UserService

```java
/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
@Data
public class UserServiceImpl implements UserService{

    private UserDao userDao;


    @Override
    public void addUser(User user) {

        userDao.addUser(user);
    }

}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042215390628.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 7.6.4 编辑UserController

```java
package com.jt.controller;

import com.jt.pojo.User;
import com.jt.service.UserService;
import lombok.Data;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
@Data
public class UserController {

    //spring容器负责注入Service对象
    private UserService userService;
    private User user;//代替用户传入的数据

    public void addUser(){
        userService.addUser(user);
    }
}

```

#### 7.6.5 3层代码结构关系

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422155924209.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 7.6.6 编辑application配置文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

           <!--1.构建user对象-->
    <bean id="user" class="com.jt.pojo.User">
        <property name="id" value="100"></property>
        <property name="name" value="安琪拉"></property>
    </bean>

        <!--2.构建Dao对象
      根据面向接口编程
         Id:接口的名称
         class:实现类的包路径
   -->
    <bean id="userDao" class="com.jt.dao.UserDao"></bean>

        <!--3.构建Service-->
    <bean id="userService" class="com.jt.service.UserServiceImpl">
        <property name="userDao" ref="userDao"></property>
    </bean>

        <!--4.构建Controller-->
    <bean id="userController" class="com.jt.controller.UserController">
        <property name="userService" ref="userService"></property>
        <property name="user" ref="user"></property>
    </bean>
</beans>

```

#### 7.6.7 编辑测试类

```java
public class TestSpring {

    @Test
    public void testSpringMVC(){
        ApplicationContext context =
                new ClassPathXmlApplicationContext("application.xml");
        UserController userController = (UserController) context.getBean("userController");
        userController.addUser();
        System.out.println("恭喜学会MVC结构");
    }
}
```

#### 7.6.8 关于特殊字符说明

说明: 由于由于业务需要xml配置文件中 可能会有特殊字符,但是该特殊字符与xml关键字(标签)形成冲突.

解决方案: 实现字符串转义

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422170510379.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

特殊转义字符:

< < 小于

\> > 大于

& & 和号

’ ’ 单引号

" " 引号

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422170755569.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

万能转义字符: **<![CDATA[XXX任意字符]]>**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210422172507365.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 7.7 扩展内容(内部bean)

```java
 <!--定义部门对象-->
    <bean id="dept" class="com.jt.pojo.Dept">
        <property name="id" value="101"></property>
        <property name="name" value="财务部"></property>
        <property name="user">
            <bean id="user" class="com.jt.pojo.User">
                <property name="name" value="项思醒"></property>
            </bean>
        </property>
    </bean>

```

## 7.8 集合属性抽取(util)

### 7.8.1 编辑头标签

```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:util="http://www.springframework.org/schema/util"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd
        ">
```

### 7.8.2 编辑xml配置文件

之后通过ref属性进行引用

```java
<!--通过util标签定义公共属性-->
    <util:list id="list">
        <value>1</value>
        <value>2</value>
        <ref bean="user"></ref>
    </util:list>
```

## 7.10 依赖注入案例

### 7.10.1 定义接口Pet

```java
package com.jt.demo4;

public interface Pet {

    void hello();
}

```

### 7.10.2 定义Dog类

```java
package com.jt.demo4;
import org.springframework.stereotype.Component;
//将该类交给Spring容器管理  key:abc,value:反射机制创建对象
@Component
public class Dog implements Pet{

    @Override
    public void hello() {
        System.out.println("快到圣诞节了!!!");
    }
}

```

### 7.10.3 定义User类

```java
package com.jt.demo4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component  //将User对象交给Spring容器管理
public class User {
    /**
     *  注入:将spring容器中的对象进行引用!!!
     *  @Autowired: 可以将容器中对象进行注入
     *      1.按照类型注入
     *          如果注入的类型是接口,则自动的查找其实现类对象进行注入
     *          注意事项: 一般spring框架内部的接口都是单实现,特殊条件下可以多实现
     *      2.按照名称注入
     */
    @Autowired
    private Pet pet;

    public void hello(){
        pet.hello();
    }
}

```

### 7.10.4 编辑配置类

```java
package com.jt.demo4;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.jt.demo4")
public class SpringConfig {

    
}

```

### 7.10.5 编辑测试代码

```java
package com.jt.demo4;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringDI {
    public static void main(String[] args) {
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        User user = context.getBean(User.class);
        user.hello();
    }
}
```

## 7.11 多实现案例讲解

### 7.11.1 关于案例说明

一般条件下 Spring中的接口,都是单实现,如果遇到多实现,则如图所示

![在这里插入图片描述](https://img-blog.csdnimg.cn/ace60818f3ae4a61b6e1d27fdcbfbc7e.png)

由于没有做其它操作,所以程序必然报错.

![在这里插入图片描述](https://img-blog.csdnimg.cn/d7531f486cef479e967600633654458c.png)

异常解决:

![在这里插入图片描述](https://img-blog.csdnimg.cn/088881c1467f477195ea19fa276f3a56.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

# 8 自动装配

Spring基于配置文件 为了让属性(对象的引用)注入更加的简单.则推出了自动装配模式.

1).根据名称自动装配

2).根据类型自动装配

## 8.1 配置规则

### 8.1.1 配置规则

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

   <!--1.构建user对象-->
   <bean id="user" class="com.jt.pojo.User">
      <!--根据name属性查找对象的setId()方法 将value当做参数调用set方法完成赋值 -->
      <property name="id" value="100"></property>
     <!-- <property name="name" value="&lt;范冰冰&gt;"></property>-->
      <property name="name">
         <value><![CDATA[<范冰冰>]]></value>
      </property>
   </bean>

   <!--2.构建Dao对象
      根据面向接口编程
         Id:接口的名称
         class:实现类的包路径
   -->
   <bean id="userDao" class="com.jt.dao.UserDaoImpl"></bean>

   <!--3.构建Service
      自动装配: 程序无需手动的编辑property属性
      autowire="byName" 根据属性的名称进行注入
         1.找到对象的所有的set方法 setUserDao()
         2.setUserDao~~~~set去掉~~~UserDao~~~~首字母小写~~~userDao属性
         3.Spring会根据对象的属性查询自己维护的Map集合,根据userDao名称,查找Map
         中的Key与之对应,如果匹配成功.则能自动调用set方法实现注入(必需有set方法)
      autowire="byType"
         1.找到对象的所有的set方法 setUserDao()
         2.根据set方法找到方法中参数的类型UserDao.class
         3.Spring根据自己维护对象的Class进行匹配.如果匹配成功则实现注入(set方法)

      
      -->
   <bean id="userService" class="com.jt.service.UserServiceImpl" autowire="byName">
   </bean>

   <!--4.构建Controller-->
   <bean id="userController" class="com.jt.controller.UserController" autowire="byName"/>

</beans>
```

## 8.2 编辑POJO对象

### 8.2.1 定义Dog对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420220739386.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 8.2.2 定义User对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420220827433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 8.2.3 编辑自动装配

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--autowire通过byName进行注入 会根据属性名称查找Bean的ID进行注入
                    byType  根据属性类型,查找Bean的Class进行 注入. 但是Class类型必须唯一
    -->
    <bean id="user" class="com.jt.pojo.User" autowire="byType">
        <property name="id" value="101"></property>
        <property name="name" value="小天天"></property>
    </bean>

    <bean id="dog" class="com.jt.pojo.Dog">
        <property name="id" value="100"></property>
        <property name="name" value="旺财"></property>
    </bean>
</beans>

```





# 9 引入外部文件为属性赋值

## 9.1 定义数据源对象

```java
package com.jt.db;

import lombok.Data;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
@Data
public class DataSource {
    private String driverName;
    private String url;
    private String username;
    private String password;
}

```

## 9.2 常规方式赋值

```java
 <!--为数据源赋值-->
    <bean id="dataSource" class="com.jt.db.DataSource">
        <property name="driverName" value="com.mysql.jdbc.Driver"></property>
        <property name="url" value="jdbc:mysql://localhost:3306/db"></property>
        <property name="username" value="root"></property>
        <property name="password" value="root"></property>
    </bean>
```

## 9.3 引入第三方配置为属性赋值

### 9.3.1 编辑pro配置文件

```java
jdbc.driverName=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/db
jdbc.username=root
jdbc.password=root
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420222852121.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 9.3.2 编辑xml配置文件

注意头标签写法

```java
	<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:util="http://www.springframework.org/schema/util"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/util http://www.springframework.org/schema/context/spring-util.xsd">



	<!--通过上下文标签引入 配置文件-->
    <context:property-placeholder location="classpath:/jdbc.properties"/>

    <bean id="dataSource" class="com.jt.db.DataSource">
        <property name="driverName" value="${jdbc.driverName}"></property>
        <property name="url" value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>
```

### 9.3.3 编辑测试类

```java
 @Test
    public void test02(){
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        DataSource dataSource = context.getBean(DataSource.class);
        System.out.println(dataSource);
    }
```

# 10 Spring中注解形式

## 10.1 常用注解

Spring为了简化xml配置方式,则研发注解模式.

Spring为了程序更加的严谨,通过不同的注解标识不同的层级 但是注解的功能一样

默认时 自动将bean的Id首字母小写

```java
/**
 * <bean id="类名首字母小写~~userDaoImpl"  class="UserDaoImpl.class" />
 * 如果需要修改beanId则手动添加value属性即可
 */
@Repository(value = "userDao")
public class UserDaoImpl implements UserDao{

    @Override
    public void addUser(User user) {
        System.out.println("链接数据库执行insert into :"+user);
    }
}

```



@Component(“userService”)  万用注解

@Controller 用来标识Controller层的代码 相当于将对象交给Spring管理

@Service  用来标识Service层代码

@Repository 用来标识持久层

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

   <!--1.构建user对象-->
   <bean id="user" class="com.jt.pojo.User">
      <property name="id" value="100"></property>
      <property name="name">
         <value><![CDATA[<范冰冰>]]></value>
      </property>
   </bean>

   <!--2.
      让注解生效,开启包扫描
      包路径特点: 给定包路径,则自动扫描同包及子孙包中的类
      base-package: 根据指定的包路径 查找注解
      写方式: 多个包路径 使用,号分隔
   -->
   <!--<context:component-scan base-package="com.jt.controller,com.jt.service,com.jt.dao"></context:component-scan>-->
   <context:component-scan base-package="com.jt"/>
   
   <!--业务需求1: 只想扫描@controller注解
       属性说明: use-default-filters="true"
                默认规则 :true  表示可以扫描其他注解
                        :false  按照用户指定的注解进行加载,默认规则不生效
   -->
   <context:component-scan base-package="com.jt" use-default-filters="false">
      <context:include-filter type="annotation" expression="org.springframework.stereotype.Service"/>
   </context:component-scan>
	
	<!--业务需求2: 不想扫描@controller注解-->
   <context:component-scan base-package="com.jt">
      <!--通过包扫描 可以加载其他的注解 排除Controller注解-->
      <context:exclude-filter type="annotation"
            expression="org.springframework.stereotype.Controller"/>
   </context:component-scan>
</beans>

```



## 10.2 开启注解标签

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:util="http://www.springframework.org/schema/util"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/util http://www.springframework.org/schema/context/spring-util.xsd">

    <!--启动包扫描方式-->
    <!--<context:component-scan base-package="com.jt.dao,com.jt.service"/>-->
    <!--开启自动包扫描 自动扫描子孙包-->
    <context:component-scan base-package="com.jt"/>
</beans>

```

## 10.3 注解引用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210420230421376.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 10.4 注解测试代码

```java
package com.jt;

import com.jt.service.UserService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author 刘昱江
 * 时间 2021/4/20
 */
public class TestSpring {

    /**
     * 获取注解定义的对象
     */
    @Test
    public void test01(){
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        UserService userService = context.getBean(UserService.class);
        System.out.println(userService);
    }
}

```

## 10.5 关于注解包扫描扩展

```java
	<!--关于注解包扫描扩展
        use-default-filters="true" 扫描所有的注解
        use-default-filters="false" 扫描指定注解
    -->
   <!-- <context:component-scan base-package="com.jt" use-default-filters="false">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Service"/>
    </context:component-scan>-->

    <!--加载包中所有的注解,除了xxx注解-->
    <context:component-scan base-package="com.jt" >
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>
```

## 10.6 Spring属性注入

### 10.6.1 常用注解说明

1.@Autowired 根据对象的类型进行注入, 可以根据类型/属性名称进行注入 首先按照类型进行注入如果类型注入失败,则根据属性名称注入

2.@Qualifier(“userDao”) 根据属性的名称进行注入,如果需要按照名称进行注入,则需要额外添加@Qualifier

3.@Resource(type = "xxx.class",name="属性名称") 根据属性和类型进行注入

关于注解补充: 由于@Resource注解 是由java原生提供的,不是Spring官方的.所以不建议使用 上述的属性的注入在调用时 自动的封装了Set方法,所以Set方法可以省略不写

### 10.6.2 @Autowired使用

说明: 在对象中如果需要使用属性注入.一般使用@Autowired注解.

功能: 可以将Spring容器中的对象,自动注入到属性中.

注入方式:

1. 默认**按照类型注入**. 如果注入的属性是接口,则自动注入实现类
   
2.  按照名称注入(key). 一般不用

重要前提: **如果需要依赖注入.则对象必须交给Spring容器管理.**

自动装配注解的作用: Spring框架结合Mybatis框架会自动将HeroMapper生成一个实现类和实现里面的方法而且会自动实例化该对象   required = false告诉idea编译器此对象是非必须的

```java
@Autowired(required = false)
HeroMapper mapper;
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421194122873.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 10.6.3 @Qualifier使用

根据对象name属性进行注入 但是2个注解必须一起使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421194402829.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 10.6.4 @Resource使用

Resource 注解 可以通过类型和name名称进行注入.

关于Resource注解的说明, @Resource注解不是Spring原生提供的,所以兼容性上有待考量 ,spring建议使用原生注解.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421195013117.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 10.6.4 @Value注解使用

1).可以直接为属性赋值

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421200803342.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).动态获取数据进行注入

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210421201541715.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

####  10.6.4.1编辑properties文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423170213423.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

```yml
# 规则: properties文件
# 数据结构类型:  k-v结构
# 无需添加多余的引号
# 注意多余的空格
# 存储数据类型:  只能保存String类型
# 加载时编码格式: 默认采用ISO-8859-1格式解析 中文必然乱码
user.id=1001
# Spring容器获取的当前计算机的名称 所以user.name慎用
# user.name=你好啊哈哈哈
user.username=鲁班七号
```

#### 10.6.4.2 编辑配置类

1.@PropertySource

注解用法: @PropertySource(“classpath:/user.properties”)

注解说明: @PropertySource 作用: 加载指定的pro配置文件 将数据保存到Spring容器中

2.@Value
`java @Value(123) 将123值赋值给Id @Value("${user.id}") 在Spring容器中查找key=user.id的数据.通过${}语法获取`

```java
package com.jt.config;

import com.jt.pojo.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration  //标识我是一个配置类 相当于application.xml
                        //设定包扫描的路径
@ComponentScan("com.jt")//如果注解中只有value属性 则可以省略
//@PropertySource 作用: 加载指定的pro配置文件 将数据保存到Spring容器中
// encoding:指定字符集编码格式
@PropertySource(value = "classpath:/user.properties",encoding = "UTF-8")
public class SpringConfig {
    //定义对象属性 准备接收数据
    //@Value(123)   将123值赋值给Id
    //@Value("${user.id}")  在Spring容器中查找key=user.id的数据.通过${} 进行触发    @Value("${user.id}")

    /**
     * @Value 注解的作用: 为属性赋值
     *        需求:  从spring容器中动态获取数据
     */
    @Value("${user.id}")
    private Integer id;
    @Value("${user.username}")
    //@Value("张三")  //直接写法,扩展性不好
    private String username;

    /*
        1.Spring配置文件写法 <bean id="方法名称"  class="返回值的类型" />

        2.执行@Bean的方法 将方法名称当做ID,返回值的对象当做value
                         直接保存到Map集合中
    * */
    @Bean
    public User user(){
        User user = new User();
        user.setId(id);
        user.setUsername(username);
        return user;
    }
}
```

### 10.6.5 @Bean注解管理业务数据

#### 10.6.5.1 @Bean作用

通过该注解,可以将业务数据实例化之后,交给Spring容器管理. 但是@Bean注解应该写到配置类中.

```java
package com.jt.config;

import com.jt.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration  //标识我是一个配置类 相当于application.xml
                //设定包扫描的路径
@ComponentScan("com.jt")//如果注解中只有value属性 则可以省略
public class SpringConfig {

    /*
        1.Spring配置文件写法 <bean id="方法名称"  class="返回值的类型" />

        2.执行@Bean的方法 将方法名称当做ID,返回值的对象当做value
                         直接保存到Map集合中
    * */
    @Bean
    public User user(){
        User user = new User();
        user.setId(101);
        user.setUsername("Spring容器");
        return user;
    }
}

```

#### 10.6.5.2 编辑UserController

```java
@Controller
public class UserController {
    /**
     * @Autowired:
     *   首先根据属性的类型进行注入,
     *   如果类型不能匹配,则根据属性的名称进行注入.
     *
     * 如果添加了@Qualifier("userServiceA") 则根据属性名称注入
     * 如果名称注入失败,则报错返回.
     */
    @Autowired
    @Qualifier("userServiceA")
    private UserService userService;

    @Autowired
    private User user;  //从容器中动态获取

    public void addUser(){

        userService.addUser(user);
    }

}
```

## 10.7 注解开发

传统Spring框架采用xml配置文件的方式进行维护.但是随着springboot框架的崛起,注解开发渐渐的成为主流.所以将来以注解开发为准.

组成部分:

1. 实体类: Spring容器管理的类(对象)
2.  配置类: 相当于早期的xml配置文件
3.  测试代码: 利用注解的方式启动spring容器

### 10.7.1 编辑Cat类

```java
package com.jt.demo3;

public class Cat {

    public Cat(){
        System.out.println("我是demo3的无参构造");
    }

    public void hello(){
        System.out.println("小花猫 喵喵喵");
    }
}


```



### 10.7.2 编辑配置类

说明: 原始的开发使用xxx.xml文件 用来管理对象, 现在都使用**java类**的形式**当作配置文件**则将该java类 **称之为配置类.**

```java
package com.jt.demo3;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
@ComponentScan("com.jt.demo3")
                        //根据指定的包路径扫描注解,扫描当前包及其子孙包
@Configuration          //标识当前类是配置类 其实就是配置文件
public class SpringCatConfig {
    /**
     * 方法要求:
     *  1.必须为公有的
     *  2.必须添加返回值,返回值的对象,就是容器管理的对象
     *  3.方法的名称就是bean的Id
     *  4.方法必须使用@Bean注解标识
     */
    @Bean
    public Cat cat(){
        return new Cat();
    }
}


```



### 10.7.3 编辑测试类

```java

package com.jt.demo3;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringAnno {

    public static void main(String[] args) {
        //利用注解启动spring容器
        ApplicationContext context =
                new AnnotationConfigApplicationContext
                        (SpringCatConfig.class);
        //根据类型获取对象
        Cat cat = context.getBean(Cat.class);
        cat.hello();
    }
}



```

### 10.7.4 关于IOC总结

1. 什么是IOC 由Spring容器管理对象的生命周期,降低代码耦合性

2. xml配置文件管理对象
   1.准备xxx.xml配置文件 2.准备bean标签
   3.spring容器管理对象
   ApplicationContext容器顶级接口
   ClassPathXmlApplicationContext 加载配置文件的实现类对象

3. 全注解的方式管理对象

   1. 准备配置类 @Configuration + @Bean

   2. 要求方法 必须有返回值

   3. 容器对象
      ApplicationContext容器顶级接口
      AnnotationConfigApplicationContext

      万能语法: 根据当前spring的配置规则,实例化接口对象. 我一般不写这些代码,如果想看也可以通过ApplicationContext 查找指定的实现类.

## 10.8 实现MVC结构的纯注解开发

### 10.8.1 编辑xml配置文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

   <!--开启包扫描-->
   <context:component-scan base-package="com.jt"/>

</beans>

```

### 10.8.2 关于注解说明

注解作用: 一些复杂的程序 以一种低耦合度的形式进行调用

元注解:

@Target({ElementType.TYPE}) 标识注解对谁有效 type:类 method:方法有效

@Retention(RetentionPolicy.RUNTIME) 运行期有效(大)

@Documented 该注解注释编译到API文档中.

由谁加载:由Spring内部的源码负责调用.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423153431495.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 10.8.3 关于Spring工厂模式说明

1.Spring源码中创建对象都是采用工厂模式 接口:BeanFactory(顶级接口)

2.Spring开发中需要手动的创建对象时,一般采用 FactoryBean(业务接口)

3.关于bean对象注入问题说明 一般需要检查注解是否正确配置

```java
警告: Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'userController': Unsatisfied dependency expressed through field 'userService'; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.jt.service.UserService' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}

org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'userController': Unsatisfied dependency expressed through field 'userService'; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.jt.service.UserService' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
```



# 11 Spring-AOP机制

## 11.1 AOP案例引入

在软件业，AOP为Aspect Oriented Programming的缩写，**意为：面向切面编程**，通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术。AOP是OOP的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

AOP主要作用: 在不修改原有代码的条件下 对方法进行扩展

### 11.1.1 数据库事务说明

案例分析:

1. userMapper.insert(User对象)
2. deptMapper.insert(dept对象)
   说明: 由于业务需求 要求方法要么同时入库,要么同时回滚.所以必须通过事务进行控制.

## 11.2 Spring实现事务控制(demo)

事务特性: 
1. 原子性 
2. 一致性 
3. 隔离性 
4. 持久性
业务说明: 在增/删除/修改的操作过程中添加事务控制.

### 11.2.1 代码结构如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425100734693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.2.2 编辑UserMapper/UserMapperImpl

1).编辑UserMapper

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425100925923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).编辑UserMapperImpl

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425100810841.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.2.3 编辑UserService/UserServiceImpl

1).编辑UserService

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425101005475.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2)编辑UserServiceImpl

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425101038366.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.2.4 编辑配置类

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425101115317.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.2.5 编辑测试类

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425101208191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 11.3 代码问题分析

1. 如果按照上述的代码进行编辑,则所有增/删除/修改操作的代码都必须按照上述的规则.那么代码冗余.
   
2.  UserService与事务控制代码紧紧的耦合在一起.不方便后期扩展. 以后尽可能**保证业务的纯粹性.**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425104618305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

解决方案: 采用**代理模式**进行编辑.

## 11.4 代理模式

### 11.4.1 生活中代理案例

房屋中介代理模式:
1.房东: 自己手里有房子 需要出租换钱

2.中介机构 1.本职工作 带客户看房/出租房屋 2.收取中介费(服务费)

3.租客: 满足自身需求 租房子

代码思维建模:

1.暴露一个公共的接口(租房子)

2.客户与中介机构进行沟通,中介看起来和房东功能一致.
(代理看起来就是真实的对象)

3.完成用户额外的操作(收取中介费)

### 11.4.2 代理模式

1).组成部分

1.要求代理者实现与被代理者相同的接口

2.在代理方法中实现功能的扩展

3.用户调用代理对象完成功能(用户认为代理就是目标对象)

2).调用流程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425111536919.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.4.3 关于代理模式说明

说明: **在业务层不方便做,但是又不得不做的事情,可以放到代理对象中**. 通过这样的设计就可以解决业务层耦合的问题. 代理对象看起来和真是的对象 一模一样.所以用户使用不会察觉.

![在这里插入图片描述](https://img-blog.csdnimg.cn/b1d0ce5153354c08a59fa398df4581e1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 11.5 静态代理

### 11.5.1 通过代理模式实现事务控制

角色划分:

1.目标对象target UserServiceImpl类

2.目标方法 method addUser()方法

3.代理: 实现事务控制.

4.代理对象与目标对象实现相同的接口.

### 11.5.2 修改目标对象名称

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425113424380.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.5.3 编辑代理类

```java
@Service("userService")
public class StaticProxy implements UserService {

    //要求引入目标对象
    @Autowired //ByType  byName
    //@Qualifier("target")
    private UserService target;

    //目的: 对原有方法进行扩展
    @Override
    public void addUser(User user) {
        try {
            System.out.println("事务开始");
            target.addUser(user);
            System.out.println("事务结束");
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("事务回滚");
        }
    }
}

```

### 11.5.4 编辑测试类

```java
@Test
    public void testStaticProxy(){
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        UserService userService = (UserService) context.getBean("userService");
        User user = new User();
        user.setId(10001);
        user.setName("测试代理机制");
        //执行用户调用
        userService.addUser(user);
    }

```

## 11.5 静态代理弊端

1).静态代理只针对于某个接口 不能实现所有接口的代理 实用性较差

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425141355871.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).静态代理中所有的方法,都需要手动的添加事务开始/事务提交代码 代码冗余 不够简洁.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425141440342.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 11.6 动态代理机制



### 11.6.1 动态代理分类(考题)

1.JDK代理:

要求: 要求目标对象必须实现接口

代理要求: 代理对象也必须实现目标对象的接口

目标对象/代理关系: 目标对象与代理对象兄弟关系.

2.CGlib代理

要求: 不管目标对象是否有接口,都可以为其创建代理对象

代理要求: 要求代理对象必须继承目标对象

目标对象/代理关系: 目标对象与代理对象是父子关系

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425142906508.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.6.2 编辑JDK动态代理

特点:

1. 类型名称: class com.sun.proxy.$Proxy9
2. **要求: 要求被代理者,必须是接口或者是实现类.**
3. JDK代理是java原生提供的API 无需导包.
4. JDK动态代理在框架的源码中经常使用.

官网API:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425143740594.png)

背会知识点：

1. 关于匿名内部类用法说明: 匿名内部类引用外部参数 要求参数必须final修饰
   
2. 该方法标识 当代理对象执行时,"回调"该方法.
   `java public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {}`

3. 目标方法执行
   `java result = method.invoke(target,args);`

```java
package com.jt.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

//能否利用一个工厂动态为目标对象创建代理
public class JDKProxyFactory {

    //要求用户传递目标对象
    //关于匿名内部类用法说明:  匿名内部类引用外部参数 要求参数必须final修饰
    public static Object getProxy(final Object target){
        //1.调用java API实现动态代理
        /**
         *  参数分析: 3个参数
         *      1.ClassLoader loader, 类加载器(获取目标对象的Class)
         *      2.类<?>[] interfaces,  JDK代理要求 必须有接口
         *                             java中可以多实现
         *      3.InvocationHandler h  对目标方法进行扩展
         */
        //1.获取类加载器
        ClassLoader classLoader = target.getClass().getClassLoader();
        //2.获取接口数组
        Class[] interfaces = target.getClass().getInterfaces();
        //3.通过动态代理创建对象
        Object proxy = Proxy.newProxyInstance(classLoader, interfaces, new InvocationHandler() {

            //invoke方法: 代理对象调用方法时invoke执行,扩展方法的编辑位置
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                // result 标识目标方法执行的返回值
                Object result = null;
                try {
                    //添加事务的控制
                    System.out.println("事务开始");
                    //执行目标方法
                    // target真实的目标对象,method方法对象,args方法参数
                    result = method.invoke(target,args);
                    System.out.println("事务提交");
                }catch (Exception e){
                    e.printStackTrace();
                    System.out.println("事务回滚");
                }
                return result;
            }
        });

        return proxy;
    }
}

```

```java
package com.jt.demo1.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JDKProxy {
    /**
     * 获取代理对象
     * 参数说明:
     *  1. ClassLoader loader 类加载器 读取真实的类数据
     *  2. Class<?>[] interfaces, 要求传递接口信息
     *  3. InvocationHandler h  当代理对象执行方法时 执行
     * 注意事项: JDK代理必须要求 "被代理者"要么有接口(本身就是接口),要么实现接口(实现类).
     */

    public static Object getProxy(Object target){
        //1.获取类加载器
        ClassLoader classLoader = target.getClass().getClassLoader();
        //2.获取接口
        Class[] interfaces = target.getClass().getInterfaces();
        return Proxy.newProxyInstance(classLoader,interfaces,getInvocationHandler(target));
    }

    //代理对象执行方法时调用
    public static InvocationHandler getInvocationHandler(Object target){
        //这些代码都是写死的!!!!!!
        return new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("事务开始");
                //执行真实的业务方法
                Object result = method.invoke(target,args);
                System.out.println("事务提交");
                return result;
            }
        };
    }
}


```

测试代码:

```java
package com.jt.demo1;

import com.jt.demo1.config.SpringConfig;
import com.jt.demo1.proxy.JDKProxy;
import com.jt.demo1.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTx {

    public static void main(String[] args) {
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        UserService userService = context.getBean(UserService.class);
        System.out.println(userService.getClass());
        //获取代理对象
        UserService proxy = (UserService) JDKProxy.getProxy(userService);
        System.out.println(proxy.getClass());
        //基于代理对象,执行业务操作 实现方法扩展
        proxy.addUser();
        proxy.deleteUser();
    }
}


```

![在这里插入图片描述](https://img-blog.csdnimg.cn/d1dd78b60a0045e1a1f8eae1b561d279.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 11.6.3 JDK动态代理执行过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425161016119.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.6.4 CGlib动态代理

#### 11.6.4.1 CGLib特点说明

历史原因: JDK动态代理要求必须"有接口",但是某些类它没有接口,则无法使用JDK代理生成代理对象. 所以为了填补知识的空缺,则引入cglib代理.

问题说明: cglib动态代理 要求有无接口都可以创建代理对象. 问题? 如何保证和被代理者"相同"
答案(特点): 要求cglib动态代理继承被代理者.**代理对象是被代理者的子类**.

#### 11.6.4.2 动态代理的作用

说明1: 一般我们将业务层中的耦合性高的代码,采用动态代理的方式进行**解耦**.使得程序更加具有扩展性. (业务逻辑的解耦)

说明2: Spring专门针对动态代理的规则.封装了一套API 起名 AOP

## 11.7 动态代理优势

将公共的部分写到动态代理中,之后其他的业务类调用即可

### 11.7.1 编辑DeptService/DeptServiceImpl

1).编辑DeptService

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425172952739.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).编辑DeptServiceImpl

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425173031163.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 11.7.2 编辑测试类

```java
public class TestDept {

    @Test
    public void testTx(){
        //1.获取目标对象
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        DeptService target = (DeptService) context.getBean("deptService");
        //2.获取代理对象
        DeptService deptService = (DeptService) JDKProxyFactory.getProxy(target);
        //通过代理对象 调用方法  扩展了方法!!!!!
        deptService.addDept();  //invoke
    }
}
```

## 11.8 动态代理实现方案(二)

### 11.8.1 业务需求

要求对Service层的方法记录其执行的时间!!! 通过执行时间的长短 进行针对性的优化!!!

要求: service中 有 addUser方法/deleteUser方法.

要求代码结构扩展性好,耦合性低.
做完1000块!!!

### 11.8.2 编辑UserService/UserServiceImpl

1).编辑UserService

```java
public interface UserService {

    void addUser(User user);
    void deleteUser(User user);
}

```

2).编辑UserServiceImpl

```java
@Service("target")
public class UserServiceImpl implements UserService{

    @Override
    public void addUser() {
        System.out.println("新增用户");
    }

    @Override
    public void deleteUser() {
        System.out.println("删除用户");
    }
}

```

### 11.8.3 编辑代理工厂

```java
package com.jt.proxy;

import javax.annotation.PostConstruct;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JDKProxyFactory {

    //编辑静态方法获取代理对象
    public static Object getProxy(final Object target){
        //3个参数  1.类加载器  2.对象的接口
        ClassLoader classLoader = target.getClass().getClassLoader();
        Class[] interfaces = target.getClass().getInterfaces();
        Object proxy = Proxy.newProxyInstance(classLoader, interfaces,
                new InvocationHandler() {
                    //代理对象执行目标方法时执行
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

                        //让用户执行目标方法
                        Long startTime = System.currentTimeMillis(); //开始时间
                        //执行目标方法 获取返回值 可能为null
                        Object result = method.invoke(target);
                        Long endTime = System.currentTimeMillis();  //结束时间
                        //根据项目经理要求 给程序预留bug 后期维护时删除 不友好
                        Thread.sleep(2000);
                        System.out.println("程序执行:"+(endTime-startTime)+"毫秒");
                        //将返回值传递给调用者
                        return result;
                    }
                })  ;

        return proxy;
    }


}

```

### 11.8.4 编辑测试案例

```java
public class TestSpring {

    @Test
    public void test01(){
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        //1.获取目标对象
        UserService target = (UserService) context.getBean("target");
        //2.获取代理对象
        UserService proxy = (UserService) JDKProxyFactory.getProxy(target);
        System.out.println(proxy.getClass());
        //3.调用业务方法
        proxy.addUser();
    }
}
```

# 12 Spring AOP

## 12.1 AOP介绍

在软件业，AOP为Aspect Oriented Programming的缩写，意为：**面向切面编程**，通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术。AOP是OOP的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的**耦合度降低**，提高程序的可重用性，同时提高了开发的效率。

总结: **Spring中的AOP 利用代理对象在不修改源代码的条件下,对方法进行扩展.**

![在这里插入图片描述](https://img-blog.csdnimg.cn/d232b86a971b40d6a52bdb41f7cecf2d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

## 12.2 AOP中专业术语(难点)

1).连接点: 用户可以被扩展的方法

2).切入点: 用户实际扩展的方法

3).通知: 扩展方法的具体实现

4).切面: 将通知应用到切入点的过程

## 12.3 通知类型

1. before: 在目标方法执行之前执行
2. afterReturning: 在目标方法执行之后返回时执行
3. afterThrowing: 在目标方法执行之后,抛出异常时执行
4. after: 无论程序是否执行成功,都要最后执行的通知
5. around: 在目标方法执行前后 都要执行的通知(完美体现了动态代理模式)
   功能最为强大 只有环绕通知可以控制目标方法的执行

关于通知方法总结:

1.环绕通知是处理业务的首选. 可以修改程序的执行轨迹

2.另外的四大通知一般用来做程序的监控.(监控系统) 只做记录

## 12.4 切入点表达式

概念:当程序满足切入点表达式,才能进入切面,执行通知方法.

1.bean(“bean的ID”) 根据beanId进行拦截 只能匹配一个

2.within(“包名.类名”) 可以使用通配符*? 能匹配多个.

粒度: 上述的切入点表达式 粒度是类级别的. 粗粒度.

3.execution(返回值类型 包名.类名.方法名(参数列表…))

粒度: 控制的是方法参数级别. 所以粒度较细. 最常用的.

4.@annotation(包名.注解名) 只拦截注解.

粒度: 注解是一种标记 根据规则标识某个方法/属性/类 细粒度

## 12.5 AOP入门案例

### 12.5.1 导入jar包

```java
		<!--引入AOPjar包文件-->
        <dependency>
  	          <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>

```

### 12.5.2 配置切面类

切面 = 切入点表达式 + 通知方法

```java
package com.jt.demo2.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Component  //将当前类交给Spring容器管理
@Aspect     //我是一个切面类
public class SpringAOP {

    /**
     *   切面 = 切入点表达式 + 通知方法
     *   1.切入点:
     *      理解: 可以理解为就是一个if判断
     *      判断条件: 切入点表达式
     *      规则:
     *          如果满足表达式 则判断为true,则执行通知方法
     *          如果不满足表达式 则判断为false 则不执行通知方法
     *
     *   2.切入点表达式
     *   2.1 bean("对象的Id")
     *   2.2 within("包名.类名")
     *   2.3 execution(返回值类型 包名.类名.方法名(参数列表))
     *   2.4 @annotation(注解的路径)
     */
    @Pointcut("bean(userServiceImpl)")
    public void pointcut(){

    }

    /**
     * 定义通知方法:
     *   1.前置通知  在目标方法执行之前执行.
     *   2.后置通知  在目标方法执行之后执行.
     *   3.异常通知  在目标方法执行之后抛出异常时执行.
     *   4.最终通知  都要执行的通知
     *   5.环绕通知  在目标方法执行前后都要执行的通知
     */
    @Before("pointcut()")
    public void before(){
        System.out.println("你好,我是前置通知");
    }
}


```

### 12.5.3 编辑配置类

```java
@Configuration
@ComponentScan("com.jt.demo2")
@EnableAspectJAutoProxy //启动AOP注解 创建代理对象
                        //默认启用JDK动态代理,
                        //目标对象没有实现接口时,则采用CGLIB
                        //强制使用cglib proxyTargetClass=true
                        //JDK代理创建速度快.运行时稍慢
                        //CGLIB创建时速度较慢,运行时更快
public class SpringConfig {
}
```

### 12.5.4 编辑测试代码

```java
package com.jt.demo2;

import com.jt.demo2.config.SpringConfig;
import com.jt.demo2.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Spring_AOP {

    public static void main(String[] args) {
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        //理论值:根据接口获取实现类对象, 但是与切入点表达式匹配,为了后续扩展方便.为其创建代理对象
        UserService userService = context.getBean(UserService.class);
        //如果是实现类对象,则方法没有被扩展
        //如果是代理对象, 则方法被扩展 aop有效的
        System.out.println(userService.getClass());
        userService.addUser();
    }
}


```



## 12.6 关于表达式写法

### 12.6.1 bean标签写法

@Pointcut(“bean(userServiceImpl)”) 只匹配ID为userServiceImpl的对象

### 12.6.2 within表达式

@Pointcut(“within(com.jt.demo2.service.*)”) 匹配xx.xx.service下的所有对象

### 12.6.3 execution表达式

```java
@Pointcut("execution(* com.jt.demo2.service..*.*(..))")
拦截返回值类型任意 xx.xx.service包下所有子孙包的所有类的任意方法
@Pointcut("execution(* com.jt.demo2.service..*.add*(..))")
拦截返回值类型任意 xx.xx.service包下所有子孙包的所有类.以add开头的方法
```

```java
package com.jt.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

//1.AOP需要被Spring容器管理
@Component
//2.标识该类为AOP切面
//  Spring容器默认不能识别切面注解,需要手动配置
@Aspect
public class SpringAOP {
    /**
     * 切入点表达式练习
     * within:
     *  1.within(com.jt.*.DeptServiceImpl)   一级包下的类
     *  2.within(com.jt..*.DeptServiceImpl)  ..代表多级包下的类
     *  3.within(com.jt..*)  包下的所有的类
     *
     * execution(返回值类型 包名.类名.方法名(参数列表))
     *  1.execution(* com.jt..*.DeptServiceImpl.add*())
     *  注释: 返回值类型任意的, com.jt下的所有包中的DeptServiceImpl的类
     *        的add开头的方法 ,并且没有参数.
     *
     *  2.execution(* com.jt..*.*(..))
     *  注释: 返回值类型任意,com.jt包下的所有包的所有类的所有方法 任意参数.
     *
     *  3.execution(int com.jt..*.*(int))
     *  4.execution(Integer com.jt..*.*(Integer))
     *  强调: 在Spring表达式中没有自动拆装箱功能! 注意参数类型
     *
     * @annotation(包名.注解名)
     *     @Before("@annotation(com.jt.anno.Cache)")
     *    只拦截特定注解的内容.
     */


    //1.定义before通知
    //@Before("bean(deptServiceImpl)")
    //@Before("within(com.jt..*)")
    //@Before("execution(* com.jt..*.DeptServiceImpl.add*())")
    @Before("@annotation(com.jt.anno.Cache)")
    public void before(){
        System.out.println("我是before通知");
    }
}

```

## 12.7 按照注解进行拦截

### 12.7.1 自定义注解

```java
@Target(ElementType.METHOD)             //注解对方法有效
@Retention(RetentionPolicy.RUNTIME)     //运行期有效
public @interface cgb2110 {             //注解起标记作用

}

```

### 12.7.2切入点表达式写法

```java
	@Pointcut("@annotation(com.jt.demo2.anno.CGB2110)")
    public void pointcut(){

    }

```

## 12.8 动态获取注解参数

### 12.8.1 定义注解

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Find {
    int id() default 0;
}

```

使用注解:

![在这里插入图片描述](https://img-blog.csdnimg.cn/a48e304ae84b4e748db0ef62b6e54c60.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 12.8.2 需求

利用前置通知,打印注解中的Id值!!!

### 12.8.3 编辑切面类

```java
 /**
     * 知识点:
     *      1.如果切入点表达式只对当前通知有效.则可以按照如下方式编辑
     * 要求: 动态的拦截Find注解,并且要获取Find注解中的参数Id
     * 难点: 动态获取注解的对象!!
     * 代码解释:
     *    1.@annotation(find) 拦截find变量名称对应类型的注解
     *    2.当匹配该注解之后,将注解对象当做参数传递给find
     *    优势: 可以一步到位获取注解的内容.避免了反射的代码
     */
    @Before("@annotation(find)")
    public void before2(Find find){
        System.out.println("ID的值为:"+find.id());
    }
```

## 12.9 通知方法

### 12.9.1 关于通知方法解析

1.前置通知 在目标方法执行之前执行.

2.后置通知 在目标方法执行之后执行.

3.异常通知 在目标方法执行之后抛出异常时执行.

4.最终通知 都要执行的通知

说明: 上述的四大通知一般用于记录程序的运行状态.只做记录.

**5.环绕通知 在目标方法执行前后都要执行的通知**

### 12.9.2 前置通知案例

```java
@Before("pointcut()")
    public void before(JoinPoint joinPoint){
        //1.获取目标对象的类型
        Class targetClass = joinPoint.getTarget().getClass();
        //2.获取目标对象的路径
        String path = joinPoint.getSignature().getDeclaringTypeName();
        //3.获取目标对象的方法名称
        String methodName = joinPoint.getSignature().getName();
        //4.获取方法参数
        Object[] args = joinPoint.getArgs();
        System.out.println("类型:"+targetClass);
        System.out.println("类路径:"+path);
        System.out.println("方法名:"+methodName);
        System.out.println("参数:"+ Arrays.toString(args));
    }
```

### 12.9.3 后置通知案例

#### 12.9.3.1 添加接口方法

1. 编辑接口
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/5a8c061431c346c5bbf67f648092f6b4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

2. 编辑实现类

```java
 @Override
    @CGB2110  //测试获取返回值的!!!!
    public int findCount() {
        return 1000;
    }
```

#### 12.9.3.2 编辑AOP

```java
 //注意事项: 如果多个参数,joinPoint必须位于第一位!!!
    @AfterReturning(value = "pointcut()",returning = "result")
    public void afterReturn(JoinPoint joinPoint,Object result){
        //如果需要获取当前的方法信息.则可以通过joinPoint获取
        System.out.println("我是后置通知,获取方法的返回值:"+result);
    }
```

#### 12.9.3.3 编辑测试案例

```java
 public static void main(String[] args) {
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        //理论值:根据接口获取实现类对象, 但是与切入点表达式匹配,为了后续扩展方便.为其创建代理对象
        UserService userService = context.getBean(UserService.class);
        //如果是实现类对象,则方法没有被扩展
        //如果是代理对象, 则方法被扩展 aop有效的
        System.out.println(userService.getClass());
        userService.addUser();
        userService.findCount(); //测试带返回值的方法
    }
```

### 12.9.4 异常通知案例

#### 12.9.5让代码报错

![在这里插入图片描述](https://img-blog.csdnimg.cn/380f76e21de447b6b2b87fae74311e95.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 12.9.6异常通知案例

throwing:获取异常信息,之后进行传递

```java
 //后置通知与异常通知是互斥的.只能有一个
    @AfterThrowing(value = "pointcut()",throwing = "exception")
    public void afterThrow(JoinPoint joinPoint,Exception exception){
        //打印异常
        //exception.printStackTrace();
        System.out.println("我是异常通知:"+exception.getMessage());
    }
```

### 12.9.5 最终通知

说明: 最终通知,不管方法执行是否有误.则都会执行该通知方法.

```java
 //最终通知
    @After("pointcut()")
    public void after(){
        System.out.println("我是最终通知方法!!!");
    }

```

### 12.9.6 环绕通知

```java
 /**
     * 环绕通知:
     *   1.特点:
     *       1.方法执行前后,通知都要执行.
     *       2.环绕通知可以控制目标方法是否执行.
     *       3.环绕通知必须添加返回值.
     *   2. proceed()
     *      作用1: 如果有下一个通知,则执行下一个通知
     *      作用2: 如果没有下一个通知,则执行目标方法
     */
    @Around("pointcut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("环绕通知开始!!!");
        Object result = joinPoint.proceed();
        System.out.println("环绕通知结束!!!");
        return result;
    }
```

### 12.9.7 Spring中的通知总结

第一类: 记录程序的运行状态

1. 前置通知
2.  后置通知 记录目标方法的返回值!!!
3. 异常通知 记录目标方法执行之后,抛出的异常信息.
4.  最终通知 记录程序最后的状态.

第二类:

5.  环绕通知 控制目标方法是否执行. 环绕通知是未来使用最多的,功能最为强大的.

## 12.10 关于通知方法测试

### 12.10.1 抽取通知方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042614115040.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 12.10.2 @Before作用

说明: 前置通知,在目标方法执行之前执行

用途: 如果需要记录程序在方法执行前的状态,则使用前置通知.

需求:

1.获取目标对象的类型

2.获取目标方法的名称

3.获取目标方法的参数

```java
 /*Spring为了AOP动态获取目标对象及方法中的数据,则通过joinPoint对象
    * 进行数据的传递.
    * getSignature : 方法签名  获取方法的参数
    * */
    @Before("pointcut()")
    public void before(JoinPoint joinPoint){
        System.out.println("获取目标对象的类型:"+joinPoint.getTarget().getClass());
        System.out.println("获取目标对象类名:"+joinPoint.getSignature().getDeclaringTypeName());
        System.out.println("获取目标对象方法名:"+joinPoint.getSignature().getName());
        System.out.println("获取方法参数:"+ Arrays.toString(joinPoint.getArgs()));
        System.out.println("我是before通知");
    }
```

### 12.10.3 @AfterReturning

说明: afterReturning,在目标方法执行之之后执行

用途: 用来监控方法的返回值,进行日志的记录

1).在接口中添加测试方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426150029577.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).实现目标方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426150054730.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

3).编辑AOP方法测试

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426150139352.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 12.10.4 @AfterThrowing

作用: 当目标方法执行时,抛出异常时 可以使用AfterThrowing 进行记录.

#### 12.10.4.1 编辑业务接口

1).编辑业务接口

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426164731464.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).编辑业务实现类

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426164809736.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 12.10.4.3 编辑异常通知类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426164928669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 12.10.5 @Around

#### 12.10.5.1 @Around作用

规则: 在目标方法执行前后都要执行

实际作用: 可以控制目标方法是否执行.

#### 12.10.5.2 环绕通知学习

```java
/**
     * 关于环绕通知的说明
     * 作用: 可以控制目标方法是否执行.
     * 参数: ProceedingJoinPoint 通过proceed方法控制目标方法执行.
     * 注意事项:
     *      ProceedingJoinPoint is only supported for around advice
     * @return
     */
    @Around("pointcut()")
    public Object around(ProceedingJoinPoint joinPoint){
        Object result = null;
        try {
            System.out.println("环绕通知开始");
            //1.执行下一个通知  2.执行目标方法 3.接收返回值
            Long start = System.currentTimeMillis();
            result = joinPoint.proceed();
            Long end = System.currentTimeMillis();
            System.out.println("耗时:"+(end-start));
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
        System.out.println("环绕通知结束");
        return result;
    }
```

## 12.11 关于Spring 中AOP流程介绍

### 12.11.1 AOP中的名词解释

1).连接点: 用户可以被扩展的方法 joinPoint

2).切入点: 用户实际扩展的方法(判断方法能否进入切面) pointcut 切入点表达式

3).通知: 扩展方法的具体实现 @before

4).切面: 将通知应用到切入点的过程 方法功能得到扩展全部配置(切面=切入点表达式+通知方法)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426162517212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 12.11.2 关于知识点讲解

#### 12.11.2.1 pointcut

说明:判断方法能否进入切面 IF判断

注解说明: @Pointcut 内部编辑切入点表达式
判断依据:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426160601898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 12.11.2.2 joinPoint(连接点)

说明: 当用户执行方法时,**如果方法满足pointcut表达式,则该方法就是连接点**.

如果通知中需要获取方法相关参数 则Spring会将joinPoint对象进行封装.为通知参数进行赋值

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426180221180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 12.12 关于通知方法的执行顺序

1.执行around开始

2.执行before

3.执行目标方法

4.执行afterReturning

5.执行afterThrowing

6.执行after

7,执行around通知结束

## 12.13 关于Order注解说明

说明: 研究如果是多个切面,如何控制切面的执行的顺序.

方法: 通过Order注解实现.

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042617414244.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426145609156.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)



## 12.14Spring中AOP案例

需求1: 需要对方法的执行时间,进行监控?

通知的选择: 首选环绕通知

需求2: 利用AOP可以实现缓存控制

通知类型: 环绕通知

业务思路:

用户直接查询缓存,

如果缓存中没有数据 表示第一次查询,让目标方法执行.

如果缓存中有数据. 表示第N次查询.目标方法不执行.从缓存中获取数据即可.

需求3: 利用AOP控制事务.

通知类型: 环绕通知

需求4: 利用AOP控制方法的权限!

通知类型: 环绕通知

业务思路:

1. 在AOP的环绕通知中,判断当前用户是否有权限!
2.  有权限: 可以执行目标方法. 获取数据
3.  没有权限: 不能执行目标方法.通知用户 没有权限!!!

关于AOP现状说明: 一般工作中很少直接编辑AOP底层代码.绝大部分的业务逻辑都是使用的**高级API**不需要从底层写起…

## 12.15 Spring中AOP的执行顺序

### 12.15.1 编辑第二个AOP测试类

说明: 编辑第二个AOP测试类

```java
package com.jt.demo2.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component  //将当前类.交给Spring容器管理
@Aspect     //标识AOP
public class SpringAOP2 {

    @Around("@annotation(com.jt.demo2.anno.CGB2110)")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("环绕通知开始2");
        Object result = joinPoint.proceed();
        System.out.println("环绕通知结束2");
        return result;
    }
}

```

### 12.15.2 AOP执行顺序说明

说明: 如果有多个环绕通知,其中的执行的顺序是嵌套关系.

控制顺序:

![在这里插入图片描述](https://img-blog.csdnimg.cn/6304d09f4cd24252a5c107eb829c3ee6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/c97e0b206492474eab595a0bb8283094.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/b4c2b37e950d439c84bd92f406c71da6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_14,color_FFFFFF,t_70,g_se,x_16)

# 13. Spring 总结

知识总结:

1. Spring的作用: Spring可以整合其它的第三方框架!从架构的角度,实现了代码的松耦合!
2.  Spring-IOC/DI IOC控制反转/数据结构Map集合<id,反射实例化对象>/ xml文件写法/注解写法
   DI: 依赖注入 类型注入/名称注入/一般接口都是单实现.
3.  Spring-AOP 在不修改源码的条件下对方法进行扩展!!!
4.  动态代理 JDK动态/Cglib动态代理 method.invoke()
5.  切面 = 切入点表达式 + 通知方法
6.  AOP中因为切面较多,每个切面都完成特定的功能,所以一般不会研究顺序. @Order注解 可有控制顺序.

# 14. 缓存控制

## 14.1 业务说明

用户有一个缓存的集合 static Map<k:v> key=id号 value=User对象 根据id将User对象进行了缓存
要求:当用户第二次根据Id查询用户时,如果缓存中有数据,则直接返回!!!

## 14.2 业务分析

1).首选用AOP方式实现

2).通知方法: 使用环绕通知

3).切入点表达式: execution(…)

## 14.3 AOP切面实现

```java
package com.jt.aop;

import com.jt.pojo.User;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Aspect
public class SpringAOP {

    private static Map<Integer,User> map = new HashMap();
    /**
     * 需求: 用户第一次查询走目标方法
     *       用户第二次查询走缓存  不执行目标方法
     * 判断依据: 如何判断用户是否为第一次查询?
     *       通过map集合进行判断 有数据 证明不是第一次查询
     * 执行步骤:
     *       1.获取用户查询的参数
     *       2.判断map集合中是否有该数据.
     *       true:  从map集合中get之后返回
     *       false: 执行目标方法,之后将user对象保存到Map中
     */

    //切入点表达式: 拦截service包中的所有方法
    @Around("execution(* com.jt.service..*.*(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = null;
        //1.获取目标对象的参数
        Object[] args = joinPoint.getArgs();
        //2.强制类型转化为对象
        User user = (User) args[0];
        //3.判断map集合中是否有该数据  user的Id是唯一标识
        int id = user.getId();
        if(map.containsKey(id)){
            //map中有数据
            System.out.println("AOP缓存执行");
            //将获取的数据返回
            return map.get(id);
        }else{
            //map中没有数据 执行目标方法
            result = joinPoint.proceed();
            //将user对象保存到Map中
            map.put(id, user);
            System.out.println("AOP执行目标方法");
        }
        return result;
    }
}
```



