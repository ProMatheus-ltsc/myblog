# RocketMQ发送事务消息原理分析和代码实现
[[TOC]]

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