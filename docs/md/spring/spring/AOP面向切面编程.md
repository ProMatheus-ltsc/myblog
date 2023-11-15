# AOP面向切面编程
[[TOC]]

## AOP的配置方式

### 使用步骤

1, 加入jar包

```java
<dependencies>
     <!--添加aop依赖包-->
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-aop</artifactId>
     </dependency>
 </dependencies>

```

2, 创建切面,提供通知和切点
3, 测试

### 创建切面

```java
package cn.tedu;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect//切面：由切点和通知组成
public class AspectD {
    //切点表达式： *表示1个 ..表示多个 *依次代表方法返回值，类名，方法名，(..)是参数列表
    @Pointcut("execution(* cn.tedu.service.*.*(..))")
    public void pointcut(){}

    @Before("pointcut()")//前置通知,在每一个方法开始之前被调用
    public void beforeMethod(JoinPoint joinPoint){
        System.out.println("我是前置通知");
    }
    @After("pointcut()")//后置通知,在每一个方法结束后被调用
    public void afterMethod(JoinPoint joinPoint){
        System.out.println("我是后置通知");
    }
    @Around("pointcut()")//环绕通知,方法执行前后都被调用,必须有返回值
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long time = System.currentTimeMillis();
        Object o = joinPoint.proceed();//放行,执行目标方法
        time= System.currentTimeMillis()-time;

        String methodName = joinPoint.getSignature().getName();//方法名
        System.out.print("我是环绕通知");
        System.out.println(methodName+"===耗时:"+time+"===");
        return o;
    }

}

```

### 测试

创建启动类,打开浏览器访问以下程序即可观察到控制台的输出效果

```java
package cn.tedu;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("c")
public class ControllerImpl {
    @RequestMapping("a")
    public void add(){
        for (int i = 0; i < 100; i++) {
            System.out.print("~");
        }
    }
}
```





```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--xml+Annotation模式IOC-->

    <!--常用IOC注解按照作用分类：
    1.用于创建对象的注解
    2.用于注入数据的注解
    3.用于改变Bean作用范围的注解
    4.和Bean生命周期相关的注解-->

    <!--告知spring在创建容器时要扫描的包，配置所需要的标签不是在beans的约束中，而是一个名称为context名称空间和约束中-->
    <context:component-scan base-package="cn.tedu"/>

    <!--用于改变作用范围的注解（标注在类上）
    注：他们的作用和在bean标签中使用的scope属性实现的功能是一样的
    @Scope
        作用：用于指定bean的作用范围
        属性：value指定范围的取值
        常用取值：singleton和prototype

    和生命周期相关的注解（标注在方法上）
    他们的作用和在bean标签中使用init-method和destroy-method的作用一样
    @PreDestroy：用于指定销毁方法
    @PostConstruct：用于指定初始化方法-->


    <!--如果采用xml+Annotation的IOC形式，xml中配置的是第三方jar包中的Bean，自己写的类则采用包扫描-->
    <!--配置QueryRunner-->
    <bean id="runner" class="org.apache.commons.dbutils.QueryRunner" scope="prototype">
        <!--注入数据源-->
        <constructor-arg name="ds" ref="dataSource"/>
    </bean>

    <!-- 配置数据源 -->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <!--连接数据库的必备信息-->
        <property name="driverClass" value="com.mysql.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://120.79.150.119:3306/myemployees"/>
        <property name="user" value="root"/>
        <property name="password" value="root"/>
    </bean>



    <!--Spring第二大核心：AOP-->
    <!--名词解析：
    连接点：目标类中所有的方法都是连接点
    切入点：目标类中被增强的方法叫切入点
    通知：通知就是增强的业务逻辑（前置、后置、环绕、异常、最终）
    切面：将通知应用到切入点的过程叫做切面
    织入：将增强代码逻辑织入到目标代码-->

    <!--第一章：基于XML的AOP配置-->
    <!--spring中基于XML的AOP配置步骤
        1、把通知Bean也交给spring来管理
        2、使用aop:config标签表明开始AOP的配置
        3、使用aop:aspect标签表明配置切面
                id属性：是给切面提供一个唯一标识
                ref属性：是指定通知类bean的Id
        4、在aop:aspect标签的内部使用对应标签来配置通知的类型
               我们现在示例是让beforePrintLogger()方法在切入点方法执行之前之前：所以是前置通知
               aop:before：表示配置前置通知
                    method属性：用于指定Logger类中哪个方法是前置通知
                    pointcut属性：用于指定切入点表达式，该表达式的含义指的是对业务层中哪些方法进行增强

            切入点表达式的写法：
                关键字：execution(表达式)
                表达式：
                    访问修饰符  返回值  包名.包名.包名...类名.方法名(参数列表)
                标准的表达式写法：
                    public void cn.tedu.service.impl.AccountServiceImpl.saveAccount()
                访问修饰符可以省略
                    void cn.tedu.service.impl.AccountServiceImpl.saveAccount()
                返回值可以使用通配符，表示任意返回值
                    * cn.tedu.service.impl.AccountServiceImpl.saveAccount()
                包名可以使用通配符，表示任意包，但是有几级包，就需要写几个*.
                    * *.*.*.*.AccountServiceImpl.saveAccount())
                包名可以使用..表示当前包及其子包
                    * *..AccountServiceImpl.saveAccount()
                类名和方法名都可以使用*来实现通配
                    * *..*.*()
                参数列表：
                    可以直接写数据类型：
                        基本类型直接写名称：int
                        引用类型写包名.类名的方式：java.lang.String
                    可以使用通配符表示任意类型，但是必须有参数
                    可以使用..表示有无参数均可，有参数可以是任意类型
                全通配写法：（不建议）
                    * *..*.*(..)

                实际开发中切入点表达式的通常写法：
                    切到业务层实现类下的所有方法
                        * cn.tedu.service.*.*(..)
    -->

    <!--向spring容器中注入通知类对象-->
    <bean id="logger" class="cn.tedu.utils.Logger"/>

    <!--配置AOP-->
    <aop:config>
        <!-- 配置切入点表达式：id属性用于指定表达式的唯一标识，expression属性用于指定表达式内容
        此标签写在aop:aspect标签内部只能当前切面使用，
        它还可以写在aop:aspect外面，此时就变成了所有切面可用，但是必须写在aop:aspect之前-->
        <aop:pointcut id="pt1" expression="execution(* cn.tedu.service.*.*(..))"/>

        <!--配置切面-->
        <aop:aspect id="logAdvice" ref="logger"><!--ref属性：是指定通知类bean的Id-->
            <!--配置通知类型：前置通知，在切入点方法执行之前执行-->
            <!--<aop:before method="beforePrintLogger" pointcut-ref="pt1"/>-->
            <!--配置通知类型：后置通知，在切入点方法执行之后执行，它和异常通知永远只能执行一个-->
            <!--<aop:after-returning method="afterReturningPrintLogger" pointcut-ref="pt1"/>-->
            <!--配置通知类型：异常通知，在切入点方法执行产生异常之后执行，它和后置通知永远只能执行一个-->
            <!--<aop:after-throwing method="afterThrowingPrintLogger" pointcut-ref="pt1"/>-->
            <!--配置通知类型：最终通知，无论切入点方法是否正常执行它都会在其后面执行-->
            <!--<aop:after method="afterPrintLogger" pointcut-ref="pt1"/>-->

            <!--环绕通知，具体注释请看Logger类中-->
            <aop:around method="aroundPrintLogger" pointcut-ref="pt1"/>
        </aop:aspect>
    </aop:config>

</beans>
```

## AOP使用问题小结

