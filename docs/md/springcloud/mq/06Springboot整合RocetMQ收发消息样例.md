# Springboot整合RocetMQ收发消息样例
[[TOC]]

## pom文件

创建 springboot 项目，添加`rocketmq-spring-boot-starter`依赖。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.1.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cn.tedu</groupId>
    <artifactId>demo2-springboot-rocketmq</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo2-springboot-rocketmq</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-spring-boot-starter</artifactId>
            <version>2.1.0</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

## yml 配置


### application.yml

```yml
rocketmq:
  name-server: 192.168.64.151:9876;192.168.64.152:9876

```


### application-demo1.yml

使用 demo1 profile 指定生产者组组名

```yml
rocketmq:
  producer:
    group: producer-demo1

```

### application-demo2.yml

使用 demo2 profile 指定生产者组组名

```yml
rocketmq:
  producer:
    group: producer-demo2

```


## demo 1

- 发送普通消息
- 发送 Spring 的通用 Message 对象
- 发送异步消息
- 发送顺序消息

```java
package cn.tedu.demo2.m1;

import org.apache.rocketmq.client.producer.SendCallback;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    @Autowired
    private RocketMQTemplate t;

    public void send() {
        //发送消息
        t.convertAndSend("Topic1:TagA", "Hello world! ");

        //发送spring的Message
        t.send("Topic1:TagA", MessageBuilder.withPayload("Hello world! ").build());

        //发送异步消息
        t.asyncSend("Topic1:TagA", "Hello world!", new SendCallback() {
            @Override
            public void onSuccess(SendResult sendResult) {
                System.out.println("发送成功");
            }

            @Override
            public void onException(Throwable throwable) {
                System.out.println("发送失败");
            }
        });

        //发送顺序消息
        t.syncSendOrderly("Topic1", "98456237,创建", "98456237");
        t.syncSendOrderly("Topic1", "98456237,支付", "98456237");
        t.syncSendOrderly("Topic1", "98456237,完成", "98456237");
    }
}


package cn.tedu.demo2.m1;

import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Component;

@Component
@RocketMQMessageListener(topic = "Topic1", consumerGroup = "consumer-demo1")
public class Consumer implements RocketMQListener<String> {
    @Override
    public void onMessage(String s) {
        System.out.println("收到： "+s);
    }
}


package cn.tedu.demo2.m1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

}

```


测试类，需要放在 test 文件夹

这个测试激活 demo1 profile

```java
package cn.tedu.demo2.m1;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("demo1")
public class Test1 {
    @Autowired
    private Producer p;

    @Test
    public void test() {
        p.send();
    }
}

```


## demo 2

发送事务消息

```java
package cn.tedu.demo2.m2;

import org.apache.rocketmq.spring.annotation.RocketMQTransactionListener;
import org.apache.rocketmq.spring.core.RocketMQLocalTransactionListener;
import org.apache.rocketmq.spring.core.RocketMQLocalTransactionState;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    @Autowired
    private RocketMQTemplate t;

    public void send() {
        Message<String> msg = MessageBuilder.withPayload("Hello world!").build();

        t.sendMessageInTransaction("Topic2:TagA", msg, null);
    }

    @RocketMQTransactionListener
    class Lis implements RocketMQLocalTransactionListener {
        @Override
        public RocketMQLocalTransactionState executeLocalTransaction(Message message, Object o) {
            System.out.println("执行本地事务");
            return RocketMQLocalTransactionState.UNKNOWN;
        }

        @Override
        public RocketMQLocalTransactionState checkLocalTransaction(Message message) {
            System.out.println("执行事务回查");
            return RocketMQLocalTransactionState.COMMIT;
        }
    }
}


package cn.tedu.demo2.m2;

import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Component;

@Component
@RocketMQMessageListener(topic = "Topic2", consumerGroup = "consumer-demo2")
public class Consumer implements RocketMQListener<String> {
    @Override
    public void onMessage(String s) {
        System.out.println("收到： "+s);
    }
}


package cn.tedu.demo2.m2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

}

```

测试类，需要放在 test 文件夹

这个测试激活 demo2 profile

```java
package cn.tedu.demo2.m2;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Scanner;

@SpringBootTest
@ActiveProfiles("demo2")
public class Test1 {
    @Autowired
    private Producer p;

    @Test
    public void test() {
        p.send();

        System.out.println("按回车结束");
        new Scanner(System.in).nextLine();
    }
}
```
