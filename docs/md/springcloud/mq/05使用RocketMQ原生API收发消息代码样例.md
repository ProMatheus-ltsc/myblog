# 使用RocketMQ原生API收发消息代码样例
[[TOC]]
## pom文件

新建 maven 项目或 module，添加 `rocketmq-client` 依赖。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.tedu</groupId>
    <artifactId>demo1</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-client</artifactId>
            <version>4.7.1</version>
        </dependency>

        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-store</artifactId>
            <version>4.7.1</version>
        </dependency>

    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.0</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>

```





## 同步消息

![同步](https://img-blog.csdnimg.cn/20200715164106356.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

同步消息发送要保证强一致性，发到master的消息向slave复制后，才会向生产者发送反馈信息。

这种可靠性同步地发送方式使用的比较广泛，比如：重要的消息通知，短信通知。





### 生产者

```java
package demo1;

import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;

import java.util.Scanner;
/*
发送同步消息
 */
public class Producer {
    public static void main(String[] args) throws Exception {
        /*
        group 相同的生产者成为一个生产者组

        标识发送同一类消息的Producer，通常发送逻辑一致。
        发送普通消息的时候，仅标识使用，并无特别用处。

        若发送事务消息，发送某条消息的producer-A宕机，
        使得事务消息一直处于PREPARED状态并超时，
        则broker会回查同一个group的其他producer，
        确认这条消息应该commit还是rollback。

        但开源版本并不完全支持事务消息（阉割了事务回查的代码）。?????
         */
        DefaultMQProducer p = new DefaultMQProducer("producer-demo1");

        /*
        连接nameserver集群, 获得注册的broker信息
         */
        p.setNamesrvAddr("192.168.64.151:9876:192.168.64.152:9876");
        p.start();

        /*
        主题相当于是消息的分类, 一类消息使用一个主题
         */
        String topic = "Topic1";

        /*
        tag 相当于是消息的二级分类, 在一个主题下, 可以通过 tag 再对消息进行分类
         */
        String tag = "TagA";

        while (true) {
            System.out.print("输入消息,用逗号分隔多条消息: ");
            String[] a = new Scanner(System.in).nextLine().split(",");

            for (String s : a) {
                Message msg = new Message(topic, tag, s.getBytes()); //一级分类, 二级分类, 消息内容
                SendResult r = p.send(msg);// 发送消息后会得到服务器反馈, 包含: smsgId, sendStatus, queue, queueOffset, offsetMsgId
                System.out.println(r);
            }
        }
    }
}

```





### 消费者

消费者的要点：

**1. push 和 pull**

消费者有两种模式：push 和 pull。

push 模式由服务器主动向消费者发送消息；pull 模式由消费者主动向服务器请求消息。

在消费者处理能力有限时，为了减轻消费者的压力，可以采用pull模式。多数情况下都采用 pull 模式。

**2. NameServer**

消费者需要向 NameServer 询问 Topic 的路由信息。

**3. Topic**

从指定的Topic接收消息。Topic相当于是一级分类。

**4. Tag**

Topic 相当于是一级分类，Tag 相当于是2级分类。

- 多个 Tag 可以这样写： `TagA || TagB || TagC`
- 不指定 Tag，或者说接收所有的 Tag，可以写星号： `*`

```java
package demo1;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;

public class Consumer {
    public static void main(String[] args) throws Exception {
        /*
        标识一类Consumer的集合名称，

        这类Consumer通常消费一类消息，且消费逻辑一致。
        同一个Consumer Group下的各个实例将共同消费
        topic的消息，起到负载均衡的作用。

        消费进度以Consumer Group为粒度管理，不同
        Consumer Group之间消费进度彼此不受影响，
        即消息A被Consumer Group1消费过，也会再
        给Consumer Group2消费。

        注： RocketMQ要求同一个Consumer Group的
        消费者必须要拥有相同的注册信息，即必须要听一样
        的topic(并且tag也一样)。
         */
        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo1");
        c.setNamesrvAddr("192.168.64.151:9876:192.168.64.152:9876");

        c.subscribe("Topic1", "TagA");

        c.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext ctx) {
                for (MessageExt msg : list) {
                    System.out.println(new String(msg.getBody()) + " - " + msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        c.start();
        System.out.println("开始消费数据");
    }
}

```





## 异步消息

![异步](https://img-blog.csdnimg.cn/20200715165052946.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

master 收到消息后立即向生产者进行反馈。之后再以异步方式向 slave 复制消息。

异步消息通常用在对响应时间敏感的业务场景，即发送端不能容忍长时间地等待Broker的响应。





### 生产者

```java
package demo2;

import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.SendCallback;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.exception.RemotingException;

import java.util.Scanner;

/*
异步发送消息

一条消息送出后, 不必暂停等待服务器针对这条消息的反馈, 而是可以立即发送后续消息.
使用监听器, 以异步的方式接收服务器的反馈
 */
public class Producer {
    public static void main(String[] args) throws MQClientException, RemotingException, InterruptedException {
        DefaultMQProducer p = new DefaultMQProducer("producer-demo2");
        p.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        p.start();

        p.setRetryTimesWhenSendAsyncFailed(0);

        String topic = "Topic2";
        String tag = "TagA";
        String key = "Key-demo2";


        while (true) {
            System.out.print("输入消息,用逗号分隔多条消息: ");
            String[] a = new Scanner(System.in).nextLine().split(",");

            for (String s : a) {
                Message msg = new Message(topic, tag, key, s.getBytes());

                p.send(msg, new SendCallback() {
                    @Override
                    public void onSuccess(SendResult sendResult) {
                        System.out.println("\n\n消息发送成功 : "+sendResult);
                    }

                    @Override
                    public void onException(Throwable throwable) {
                        System.out.println("\n\n消息发送失败");
                    }
                });

                System.out.println("--------------------消息已送出-----------------------");
            }

        }
    }
}

```





### 消费者

```java
package demo2;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;
/*
与 demo1.Consumer 完全相同
 */
public class Consumer {
    public static void main(String[] args) throws MQClientException {
        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo2");
        c.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");

        c.subscribe("Topic2", "TagA");

        c.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext consumeConcurrentlyContext) {
                for (MessageExt msg : list) {
                    System.out.println(new String(msg.getBody()) + " - " + msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });


        c.start();
        System.out.println("开始消费数据");
    }
}

```





## 单向消息

![单向](https://img-blog.csdnimg.cn/20200715165850314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

这种方式主要用在不特别关心发送结果的场景，例如日志发送。





### 生产者

```java
package demo3;

import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.exception.RemotingException;

import java.util.Scanner;

/*
单向消息

消息发出后, 服务器不会返回结果
 */
public class Producer {
    public static void main(String[] args) throws MQClientException, RemotingException, InterruptedException {
        DefaultMQProducer p = new DefaultMQProducer("producer-demo3");
        p.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        p.start();

        String topic = "Topic3";
        String tag = "TagA";

        while (true) {
            System.out.print("输入消息,用逗号分隔多条消息: ");
            String[] a = new Scanner(System.in).nextLine().split(",");
            for (String s : a) {
                Message msg = new Message(topic, tag, s.getBytes());
                p.sendOneway(msg);
            }
            System.out.println("--------------------消息已送出-----------------------");
        }

    }
}

```





### 消费者

```java
package demo3;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;

/*
与 demo1.Consumer 完全相同
 */
public class Consumer {
    public static void main(String[] args) throws MQClientException {
        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo2");
        c.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");

        c.subscribe("Topic3", "TagA");

        c.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext consumeConcurrentlyContext) {
                for (MessageExt msg : list) {
                    System.out.println(new String(msg.getBody()) + " - " + msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });


        c.start();
        System.out.println("开始消费数据");
    }
}

```





## 顺序消息

![顺序](https://img-blog.csdnimg.cn/20200715180447730.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

上图演示了 Rocketmq顺序消息的基本原理：

- 同一组有序的消息序列，会被发送到同一个队列，按照 FIFO 的方式进行处理
- 一个队列只允许一个消费者线程接收消息，这样就保证消息按顺序被接收

下面以订单为例：

一个订单的顺序流程是：创建、付款、推送、完成。订单号相同的消息会被先后发送到同一个队列中。消费时，从同一个队列接收同一个订单的消息。





### 生产者

```java
package demo4;

import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.MessageQueueSelector;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageQueue;
import org.apache.rocketmq.remoting.exception.RemotingException;

import java.util.List;
import java.util.Scanner;
/*
以下消息, 相同id的消息按顺序发送到同一个队列,
消费时也从同一个队列按顺序消费
                                              topic

                                        =======================  queue1
                                        =======================  queue2
111,消息1  111,消息2  111,消息3   ------->=======================  queue3
                                        =======================  queue4
222,消息1  222,消息2  222,消息3   ------->=======================  queue5
                                        =======================  queue6
333,消息1  333,消息2  333,消息3   ------->=======================  queue7
                                        =======================  queue8
                                                    ......
 */
public class Producer {
    static String[] msgs = {
            "15103111039,创建",
                                "15103111065,创建",
            "15103111039,付款",
                                                    "15103117235,创建",
                                "15103111065,付款",
                                                    "15103117235,付款",
                                "15103111065,完成",
            "15103111039,推送",
                                                    "15103117235,完成",
            "15103111039,完成"
    };

    public static void main(String[] args) throws MQClientException, RemotingException, InterruptedException, MQBrokerException {
        DefaultMQProducer p = new DefaultMQProducer("producer-demo4");
        p.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        p.start();

        String topic = "Topic4";
        String tag = "TagA";

        for (String s : msgs) {
            System.out.println("按回车发送此消息: "+s);
            new Scanner(System.in).nextLine();

            Message msg = new Message(topic, tag, s.getBytes());

            String[] a = s.split(",");
            long orderId = Long.parseLong(a[0]);

            /*
            MessageQueueSelector用来选择发送的队列,
            这里用订单的id对队列数量取余来计算队列索引

            send(msg, queueSelector, obj)
            第三个参数会传递到queueSelector, 作为它的第三个参数
             */
            SendResult r = p.send(msg, new MessageQueueSelector() {
                /*
                三个参数的含义:
                queueList: 当前Topic中所有队列的列表
                message: 消息
                o: send()方法传入的orderId
                 */
                @Override
                public MessageQueue select(List<MessageQueue> queueList, Message message, Object o) {
                    Long orderId = (Long) o;
                    //订单id对队列数量取余, 相同订单id得到相同的队列索引
                    long index = orderId % queueList.size();
                    System.out.println("消息已发送到: "+queueList.get((int) index));
                    return queueList.get((int) index);
                }
            }, orderId);

            System.out.println(r+"\n\n");
        }
    }
}

```





### 消费者

```java
package demo4;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeOrderlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeOrderlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerOrderly;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;

public class Consumer {
    public static void main(String[] args) throws MQClientException {
        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo4");
        c.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        
        c.subscribe("Topic4", "*");

        c.registerMessageListener(new MessageListenerOrderly() {
            @Override
            public ConsumeOrderlyStatus consumeMessage(List<MessageExt> list, ConsumeOrderlyContext consumeOrderlyContext) {
                String t = Thread.currentThread().getName();

                for (MessageExt msg : list) {
                    System.out.println(t+" - "+ msg.getQueueId() + " - " +new String(msg.getBody()));
                }

                return ConsumeOrderlyStatus.SUCCESS;
            }
        });

        c.start();
        System.out.println("开始消费数据");
    }
}

```





## 延时消息

消息发送到 Rocketmq 服务器后， 延迟一定时间再向消费者进行投递。

**延时消息的使用场景：**

比如电商里，提交了一个订单就可以发送一个延时消息，1h后去检查这个订单的状态，如果还是未付款就取消订单释放库存。

**生产者发送消息时，对消息进行延时设置：**

```java
msg.setDelayTimeLevel(3);
```

其中 `3` 代表级别而不是一个具体的时间值，级别和延时时长对应关系是在 `MessageStoreConfig` 类种进行定义的：

```java
this.messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";
```

**对应关系表：**

| 级别 | 延时时长 |
| ---- | -------- |
| 1    | 1s       |
| 2    | 5s       |
| 3    | 10s      |
| 4    | 30s      |
| 5    | 1m       |
| 6    | 2m       |
| 7    | 3m       |
| 8    | 4m       |
| 9    | 5m       |
| 10   | 6m       |
| 11   | 7m       |
| 12   | 8m       |
| 13   | 9m       |
| 14   | 10m      |
| 15   | 20m      |
| 16   | 30m      |
| 17   | 1h       |
| 18   | 2h       |





### 生产者

```java
package demo5;

import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.exception.RemotingException;

import java.util.Scanner;

/*
延时消息

延时消息的使用场景
比如电商里，提交了一个订单就可以发送一个延时消息，1h后去检查这个订单的状态，如果还是未付款就取消订单释放库存。
 */
public class Producer {
    public static void main(String[] args) throws MQClientException, RemotingException, InterruptedException, MQBrokerException {
        DefaultMQProducer p = new DefaultMQProducer("producer-demo5");
        p.setNamesrvAddr("192.168.64.151:9876:192.168.64.152:9876");
        p.start();

        while (true) {
            System.out.print("输入消息,用逗号分隔多条消息: ");
            String[] a = new Scanner(System.in).nextLine().split(",");

            for (String s : a) {
                Message msg = new Message("Topic5", s.getBytes());

                /*
                设置消息的延迟时间,这里不支持任意的时间,只支持18个固定的延迟时长,
                分别用Leven 1到18 来表示:

                org/apache/rocketmq/store/config/MessageStoreConfig.java
                this.messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";
                 */
                msg.setDelayTimeLevel(3);

                p.send(msg);
            }
        }
    }
}

```





### 消费者

```java
package demo5;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;

public class Consumer {
    public static void main(String[] args) throws MQClientException {
        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo5");
        c.setNamesrvAddr("192.168.64.151:9876:192.168.64.152:9876");
        c.subscribe("Topic5", "*");

        c.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext ctx) {
                System.out.println("------------------------------");
                for (MessageExt msg : list) {
                    long t = System.currentTimeMillis() - msg.getBornTimestamp();
                    System.out.println(new String(msg.getBody()) + " - 延迟: "+t);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        c.start();
        System.out.println("开始消费数据");
    }
}

```





## 批量消息

批量发送消息能显著提高传递小消息的性能。限制是这些批量消息应该有相同的topic，相同的waitStoreMsgOK，而且不能是延时消息。此外，这一批消息的总大小不应超过4MB。





### 生产者

```java
package demo6;

import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.exception.RemotingException;

import java.util.ArrayList;
import java.util.Scanner;
/*
批量发送消息能显著提高传递小消息的性能。限制是：
- 这些批量消息应该有相同的topic，
- 相同的waitStoreMsgOK，
- 而且不能是延时消息。
- 这一批消息的总大小不应超过4MB。

如果超出4M需要进行数据分割, 请参考官方代码样例https://github.com/apache/rocketmq/blob/master/docs/cn/RocketMQ_Example.md
 */
public class Producer {
    public static void main(String[] args) throws MQClientException, RemotingException, InterruptedException, MQBrokerException {
        DefaultMQProducer p = new DefaultMQProducer("producer-demo6");
        p.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        p.start();

        String topic = "Topic6";

        while (true) {
            System.out.print("输入消息,用逗号分隔多条消息: ");
            String[] a = new Scanner(System.in).nextLine().split(",");

            ArrayList<Message> messages = new ArrayList<>();
            for (String s : a) {
                messages.add(new Message(topic, s.getBytes()));
            }

            p.send(messages);
            System.out.println("批量消息已发送");
        }
    }
}

```





### 消费者

```java
package demo6;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;

public class Consumer {
    public static void main(String[] args) throws MQClientException {
        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo6");
        c.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        c.subscribe("Topic6", "*");

        c.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext consumeConcurrentlyContext) {
                for (MessageExt msg :
                        list) {
                    System.out.println("收到: "+new String(msg.getBody()));
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        c.start();
        System.out.println("开始消费数据");
    }
}

```





## 消息过滤





### Tag 过滤

Tag 可以满足大多数消息过滤的需求。使用 Tag 过滤非常简单，例如：

```java
consumer.subscribe("Topic1", "TagA || TagB || TagC");

```





### 对自定义属性过滤

生产者可以在消息中添加自定义的属性：

```java
msg.putUserProperty("prop1", "1");
msg.putUserProperty("prop2", "2");
```

消费者接收数据时，可以根据属性来过滤消息：

```java
consumer.subscribe("Topic7", MessageSelector.bySql("prop1=1 or prop2=2"));
```

可以看到，自定义属性的过滤语法是 Sql 语法，RocketMQ只定义了一些基本语法来支持这个特性，支持的 Sql 过滤语法如下：

- 数值比较，比如：>，>=，<，<=，BETWEEN，=；
- 字符比较，比如：=，<>，IN；
- IS NULL 或者 IS NOT NULL；
- 逻辑符号 AND，OR，NOT；





### 生产者

```java
package demo7;

import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.exception.RemotingException;

import java.util.Random;
import java.util.Scanner;
/*
发送的消息中包含 tag 和 userProperty

消费者接收时，可以选择用 tag 或 userProperty 进行过滤
 */
public class Producer {
    public static void main(String[] args) throws MQClientException, RemotingException, InterruptedException, MQBrokerException {
        DefaultMQProducer p = new DefaultMQProducer("producer-demo7");
        p.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        p.start();

        String topic = "Topic7";

        while (true) {
            System.out.print("输入消息,用逗号分隔多条消息: ");
            String[] a = new Scanner(System.in).nextLine().split(",");
            System.out.print("输入Tag: ");
            String tag = new Scanner(System.in).nextLine();

            for (String s : a) {
                Message msg = new Message(topic, tag, s.getBytes());
                msg.putUserProperty("rnd", ""+new Random().nextInt(4));
                p.send(msg);
            }

        }
    }
}

```





### 消费者

```java
package demo7;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.MessageSelector;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;
import java.util.Scanner;

/*
如果使用sql过滤,需要在 broker.properties 中添加配置来启用 sql 过滤：

    enablePropertyFilter=true
 */
public class Consumer {
    public static void main(String[] args) throws MQClientException {
        System.out.print("使用Tag过滤还是使用Sql过滤(tag/sql): ");
        String ts = new Scanner(System.in).nextLine();

        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo7");
        c.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");
        if (ts.equalsIgnoreCase("tag")) {
            System.out.println("使用Tag过滤: TagA || TagB || TagC");
            c.subscribe("Topic7", "TagA || TagB || TagC");
        } else {
            System.out.println("使用Sql过滤: rnd=1 or rnd > 2");
            c.subscribe("Topic7", MessageSelector.bySql("rnd=1 or rnd > 2"));
        }

        c.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext consumeConcurrentlyContext) {
                for (MessageExt msg : list) {
                    System.out.println(new String(msg.getBody()) + " - " + msg.getUserProperty("rnd"));

                }

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        c.start();
        System.out.println("开始消费数据");
    }
}

```





## 事务消息

RocketMQ 提供了可靠性消息，也叫事务消息。下面分析一下其原理。





### 事务消息的原理

![事务](https://img-blog.csdnimg.cn/20200716153601195.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![事务](https://img-blog.csdnimg.cn/2020071615393885.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



下面来看 RocketMQ 的**事务消息**是如何来发送“可靠消息”的，只需要以下三步：

1. 发送半消息（半消息不会发送给消费者）
2. 执行本地事务
3. 提交消息

![事务](https://img-blog.csdnimg.cn/20200716153616870.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![事务](https://img-blog.csdnimg.cn/20200716153622396.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![事务](https://img-blog.csdnimg.cn/20200716153629557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



完成**事务消息**发送后，消费者就可以以正常的方式来消费数据。

RocketMQ 的自动重发机制在绝大多数情况下，都可以保证消息被正确消费。

假如消息最终消费失败了，还可以由人工处理进行托底。

![事务](https://img-blog.csdnimg.cn/20200716153635597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



上面分析的是正常情况下的执行流程。下面再来看两种错误情况：

1. 事务执行失败时回滚消息
2. 服务器无法得知消息状态时，需要主动回查消息状态




**回滚：**

![事务](https://img-blog.csdnimg.cn/20200716153645244.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



**消息回查：**

![事务](https://img-blog.csdnimg.cn/20200716153651678.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![事务](https://img-blog.csdnimg.cn/20200716153659984.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 生产者

```java
package demo8;

import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.LocalTransactionState;
import org.apache.rocketmq.client.producer.TransactionListener;
import org.apache.rocketmq.client.producer.TransactionMQProducer;
import org.apache.rocketmq.client.producer.TransactionSendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.Scanner;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;

public class Producer {
    public static void main(String[] args) throws MQClientException {
        TransactionMQProducer p = new TransactionMQProducer("producer-demo8");
        p.setNamesrvAddr("192.168.64.151:9876;192.168.64.152:9876");

        p.setExecutorService(Executors.newFixedThreadPool(5));

        p.setTransactionListener(new TransactionListener() {

            ConcurrentHashMap<String, LocalTransactionState> localTx = new ConcurrentHashMap<>();

            /*
            在这里执行本地事务
             */
            @Override
            public LocalTransactionState executeLocalTransaction(Message message, Object o) {
                System.out.println("执行本地事务");
                if (Math.random()<0.333) {
                    System.out.println("本地事务执行成功, 按回车提交事务消息");
                    new Scanner(System.in).nextLine();

                    localTx.put(message.getTransactionId(), LocalTransactionState.COMMIT_MESSAGE);
                    return LocalTransactionState.COMMIT_MESSAGE;
                } else if (Math.random()<0.666) {
                    System.out.println("本地事务执行失败, 按回车回滚事务消息");
                    new Scanner(System.in).nextLine();

                    localTx.put(message.getTransactionId(), LocalTransactionState.ROLLBACK_MESSAGE);
                    return LocalTransactionState.ROLLBACK_MESSAGE;
                } else {
                    System.out.println("本地事务执行情况未知, 按回车继续");
                    new Scanner(System.in).nextLine();

                    localTx.put(message.getTransactionId(), LocalTransactionState.UNKNOW);
                    return LocalTransactionState.UNKNOW;
                }
            }

            /*
            回查方法
            检测频率默认1分钟，可通过在broker.conf文件中设置transactionCheckInterval的值来改变默认值，单位为毫秒。
             */
            @Override
            public LocalTransactionState checkLocalTransaction(MessageExt messageExt) {
                System.out.println("服务器正在回查消息状态");

                LocalTransactionState s = localTx.get(messageExt.getTransactionId());
                if (s == null || s == LocalTransactionState.UNKNOW) {
                    s = LocalTransactionState.ROLLBACK_MESSAGE;
                }
                return s;
            }
        });

        p.start();

        String topic = "Topic8";

        while (true) {
            System.out.print("输入消息,用逗号分隔多条消息: ");
            String[] a = new Scanner(System.in).nextLine().split(",");

            for (String s : a) {
                Message msg = new Message(topic, s.getBytes());
                System.out.println("---------发送半消息-----------");
                TransactionSendResult r = p.sendMessageInTransaction(msg, null);
                System.out.println("事务消息发送结果: "+ r.getLocalTransactionState().name());
            }
        }
    }
}

```





### 消费者

```java
package demo8;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;

/*

如果返回 RECONSUME_LATER, 服务器会等待一会再重试发送消息

消息属性默认设置 DELAY=6, 等待时间为 2 分钟,

                org/apache/rocketmq/store/config/MessageStoreConfig.java
                this.messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";


 */
public class Consumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer c = new DefaultMQPushConsumer("consumer-demo8");
        c.setNamesrvAddr("192.168.64.151:9876:192.168.64.152:9876");

        c.subscribe("Topic8", "*");

        c.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext ctx) {
                for (MessageExt msg : list) {
                    System.out.println(new String(msg.getBody()) + " - " + msg);
                }
                if (Math.random()<0.5) {
                    System.out.println("消息处理完成");
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                } else {
                    System.out.println("消息处理失败, 要求服务器稍后重试发送消息");
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                }
            }
        });

        c.start();
        System.out.println("开始消费数据");
    }
}
```