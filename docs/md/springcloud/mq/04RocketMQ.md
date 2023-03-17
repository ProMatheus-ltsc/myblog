# RocketMQ
[[TOC]]

## 文件下载

- [jdk-8-u212](https://download.csdn.net/download/weixin_38305440/12552021)
- [rocketmq4.7-rocketconsole1.0.1](https://download.csdn.net/download/weixin_38305440/12552334)

## 安装





### 安装配置 jdk8

**1. 上传jdk压缩文件**

将文件`jdk-8u212-linux-x64.tar.gz`上传到 /root 目录

![jdk](https://img-blog.csdnimg.cn/20200625220008838.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

**2. 解压缩**

执行解压命令

```shell
# 将jdk解压到 /usr/local/ 目录
tar -xf jdk-8u212-linux-x64.tar.gz -C /usr/local/

# 切换到 /usr/local/ 目录, 显示列表, 查看解压缩的jdk目录
cd /usr/local
ll
```

**3. 配置环境变量**

修改 /etc/profile 配置文件, 配置环境变量

```shell
vim /etc/profile

# 在文件末尾添加以下内容:
export JAVA_HOME=/usr/local/jdk1.8.0_212
export PATH=$JAVA_HOME/bin:$PATH
```

修改完后, 让环境变量立即生效

```shell
source /etc/profile
```

**4. 验证**

```shell
java -version

----------------------------------------------------------------
java version "1.8.0_212"
Java(TM) SE Runtime Environment (build 1.8.0_212-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.212-b10, mixed mode)


javac -version

---------------
javac 1.8.0_212
```





### 安装RocketMQ



#### 1. 下载 rocketmq 二进制文件

```shell
wget --no-check-certificate https://dlcdn.apache.org/rocketmq/4.9.2/rocketmq-all-4.9.2-bin-release.zip
```



#### 2. 解压缩 rocketmq

将 rocketmq 解压到 /usr/local/ 目录

```shell
unzip rocketmq-all-4.9.2-bin-release.zip -d /usr/local/

# 修改一下文件夹名，改成 rocketmq 方便使用
mv /usr/local/rocketmq-4.9.2 /usr/local/rocketmq
```



#### 3. 配置环境变量 ROCKETMQ_HOME 和 PATH

为了后续操作方便可以配置环境变量，之后在任意位置都可以执行rocketmq的操作命令。

```shell
vim /etc/profile

# 在文件末尾添加以下内容:
export ROCKETMQ_HOME=/usr/local/rocketmq
export PATH=$ROCKETMQ_HOME/bin:$PATH
```

修改完后, 让环境变量立即生效

```shell
source /etc/profile
```



#### 4. 减小 rocketmq 使用的内存

rocketmq需要启动两个服务: `name server` 和 `broker`, `name server` 默认配置JVM使用的内存是4g, `broker`默认配置JVM使用的内存是8g.

开发环境中如果内存不足, 服务可能会无法启动, 可以通过降低两个服务的内存, 使服务可以正常启动, 也可以节省内存.

**修改 `name server` 内存改为 256m**

```shell
cd /usr/local/rocketmq/

# 编辑 bin/runserver.sh
vim bin/runserver.sh

# 找到文件中下面这一行:
JAVA_OPT="${JAVA_OPT} -server -Xms4g -Xmx4g -Xmn2g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"

# 将 -Xms4g -Xmx4g -Xmn2g 修改为 -Xms256m -Xmx256m -Xmn128m
JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m -Xmn128m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
```

**修改 `broker` 内存改为 256m**

```shell
# 编辑 bin/runbroker.sh
vim bin/runbroker.sh

# 找到文件中下面这一行:
JAVA_OPT="${JAVA_OPT} -server -Xms8g -Xmx8g"

# 将 -Xms8g -Xmx8g -Xmn4g 修改为 -Xms256m -Xmx256m
JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m"
```



#### 5. 启动 rocketmq

先启动 `name server`

```shell
# 进入 rocketmq 目录
cd /usr/local/rocketmq/

# 启动 name server
nohup sh bin/mqnamesrv &

# 查看运行日志, 看到"The Name Server boot success."表示启动成功
tail -f ~/logs/rocketmqlogs/namesrv.log
```

再启动 `broker`

```shell
# 启动 broker, 连接name server: localhost:9876
nohup sh bin/mqbroker -n localhost:9876 &

# 查看运行日志, 看到"The broker[......:10911] boot success."表示启动成功
tail -f ~/logs/rocketmqlogs/broker.log 
```



#### 6. 关闭防火墙

rocketmq的通信会用到多个端口, 为了方便测试我们关闭防火墙

```shell
# 关闭防火墙
systemctl stop firewalld.service

# 禁止防火墙开机启动
systemctl disable firewalld.service
```





## 测试

运行测试, 启动生产者发送消息, 启动消费者接收消息

```shell
# 通过环境变量, 告诉客户端程序name server的地址
export NAMESRV_ADDR=localhost:9876

# 启动生产者来测试发送消息
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer

# 启动消费者来测试接收消息
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
```





## RocketMQ 的关闭命令



### 关闭 broker

```shell
mqshutdown broker
```



### 关闭 nameserver

```shell
mqshutdown namesrv
```





## 管理界面

在开源项目 `rocketmq-dashboard` 中提供了rocketmq 的管理界面: 地址为: https://github.com/apache/rocketmq-dashboard

github 在国内访问缓慢, 也可以使用码云的镜像项目, 地址为: https://gitee.com/mirrors_apache/rocketmq-dashboard



**1. 克隆项目**

```shell
cd /usr/local/rocketmq/

# 克隆 rocketmq-dashboard 项目
git clone https://gitee.com/mirrors_apache/rocketmq-dashboard
```



**2. maven打包管理界面项目**

**如果没有安装 maven，请先安装**

```shell
# 下载 maven
wget --no-check-certificate https://dlcdn.apache.org/maven/maven-3/3.8.4/binaries/apache-maven-3.8.4-bin.tar.gz

# 解压
tar xf apache-maven-3.8.4-bin.tar.gz -C /usr/local/

# 设置环境变量
cat <<EOF > /etc/profile.d/mvn.sh
export PATH=/usr/local/apache-maven-3.8.4/bin:$PATH
EOF

# 让环境变量生效
source /etc/profile.d/mvn.sh

# 检查 maven 是否可运行
mvn -version

```

打包管理界面项目 `rocketmq-dashboard`.
打包过程中会下载各种依赖,比较缓慢,请耐心等待

```shell
# 进入管理界面项目的文件夹
cd rocketmq-dashboard

# 执行maven 打包命令, 执行时间较长, 请耐心等待
mvn clean package -Dmaven.test.skip=true
```



**3. 运行启动管理界面**

打包的 jar 文件在 target 目录, 进入目录执行jar文件

```shell
# 进入 target 目录
cd target

# 运行管理界面
nohup java -jar rocketmq-dashboard-1.0.1-SNAPSHOT.jar --server.port=8080 --rocketmq.config.namesrvAddr=localhost:9876 &
```

**访问管理界面:**

[http://192.168.64.141:8080](http://192.168.64.141:8080/)

![rocketmq](https://img-blog.csdnimg.cn/2020062600561495.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

## 收发消息出现超时问题

```shell
cd /usr/local/rocketmq/

vim conf/broker.conf

末尾添加
brokerIP1=192.168.64.141

关闭 broker 服务
mqshutdown broker

重新使用 broker.conf 配置启动 broker
nohup sh bin/mqbroker -n localhost:9876 -c conf/broker.conf &
```



## 部署环境

作为测试环境，我们使用两台虚拟机来部署双主双从环境，具体结构如下：

![集群](https://img-blog.csdnimg.cn/20200709000005103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70)

整个集群由**两个 name server** 实例和**四个 broker** 实例组成

**name server:**

- 两台服务器分别启动两个name server

**broker A 主从:**

- 服务器1部署 broker A 主服务
- 服务器2部署 broker A 从服务

**broker B 主从:**

- 服务器2部署 broker B 主服务
- 服务器1部署 broker B 从服务





## 安装Rocketmq

首先在两台虚拟机上安装 Rocketmq。或在一台虚拟机上装好后进行克隆。





## 建文件夹

在一台服务器上启动两个 broker 实例，需要为不同实例设置单独的数据存储目录。

为了方便起见，我们在两台服务器上都创建这四个实例所需要的的目录。

```shell
mkdir /usr/local/rocketmq/store/
mkdir /usr/local/rocketmq/store/broker-a
mkdir /usr/local/rocketmq/store/broker-a/commitlog
mkdir /usr/local/rocketmq/store/broker-b
mkdir /usr/local/rocketmq/store/broker-b/commitlog
mkdir /usr/local/rocketmq/store/broker-as
mkdir /usr/local/rocketmq/store/broker-as/commitlog
mkdir /usr/local/rocketmq/store/broker-bs
mkdir /usr/local/rocketmq/store/broker-bs/commitlog
```





## 配置

在 `rocketmq/conf` 目录下提供了四种集群方案的配置样例

- 2m-2s-async：双主双从异步复制
- **2m-2s-sync：双主双从同步复制**
- 2m-noslave：双主
- dledger： raft主从切换

这里我们选择**双主双从同步复制**方案。





### 1. broker-a，a主服务器配置

![a](https://img-blog.csdnimg.cn/20200709142712299.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

在**服务器1**修改样例配置文件：`rocketmq/conf/2m-2s-sync/broker-a.properties`

在样例配置文件中，添加三项配置：

- `listenPort`：我们在一台服务器上要运行两个broker实例，所以两个实例的端口要有所区分。这里broker-a主服务器的端口使用默认的10911。
- `storePathRootDir`：数据存储目录
- `storePathCommitLog`：提交日志存储目录

```shell
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
deleteWhen=04
fileReservedTime=48
brokerRole=SYNC_MASTER
flushDiskType=ASYNC_FLUSH

listenPort=10911
storePathRootDir=/usr/local/rocketmq/store/broker-a
storePathCommitLog=/usr/local/rocketmq/store/broker-a/commitlog
```





### 2. broker-a slave，a从服务器配置

![as](https://img-blog.csdnimg.cn/20200709142816923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

在**服务器2**修改样例配置文件：`rocketmq/conf/2m-2s-sync/broker-a-s.properties`

在样例配置文件中，添加三项配置：

- `listenPort`：我们在一台服务器上要运行两个broker实例，所以两个实例的端口要有所区分。这里broker-a slave从服务器的端口使用11911。
- `storePathRootDir`：数据存储目录
- `storePathCommitLog`：提交日志存储目录

```shell
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=1
deleteWhen=04
fileReservedTime=48
brokerRole=SLAVE
flushDiskType=ASYNC_FLUSH

listenPort=11911
storePathRootDir=/usr/local/rocketmq/store/broker-as
storePathCommitLog=/usr/local/rocketmq/store/broker-as/commitlog
```





### 3. broker-b，b主服务器配置

![b](https://img-blog.csdnimg.cn/20200709142900653.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

在**服务器2**修改样例配置文件：`rocketmq/conf/2m-2s-sync/broker-b.properties`

在样例配置文件中，添加三项配置：

- `listenPort`：我们在一台服务器上要运行两个broker实例，所以两个实例的端口要有所区分。这里broker-b主服务器的端口使用默认的10911。
- `storePathRootDir`：数据存储目录
- `storePathCommitLog`：提交日志存储目录

```shell
brokerClusterName=DefaultCluster
brokerName=broker-b
brokerId=0
deleteWhen=04
fileReservedTime=48
brokerRole=SYNC_MASTER
flushDiskType=ASYNC_FLUSH

listenPort=10911
storePathRootDir=/usr/local/rocketmq/store/broker-b
storePathCommitLog=/usr/local/rocketmq/store/broker-b/commitlog
```





### 4. broker-b slave，b从服务器配置

![bs](https://img-blog.csdnimg.cn/20200709142929917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

在**服务器1**修改样例配置文件：`rocketmq/conf/2m-2s-sync/broker-b-s.properties`

在样例配置文件中，添加三项配置：

- `listenPort`：我们在一台服务器上要运行两个broker实例，所以两个实例的端口要有所区分。这里broker-b slave从服务器的端口使用11911。
- `storePathRootDir`：数据存储目录
- `storePathCommitLog`：提交日志存储目录

```shell
brokerClusterName=DefaultCluster
brokerName=broker-b
brokerId=1
deleteWhen=04
fileReservedTime=48
brokerRole=SLAVE
flushDiskType=ASYNC_FLUSH

listenPort=11911
storePathRootDir=/usr/local/rocketmq/store/broker-bs
storePathCommitLog=/usr/local/rocketmq/store/broker-bs/commitlog
```





### 配置要点说明

1. 四台服务器的集群名 `brokerClusterName` 相同。集群名称相同的服务器共同组成服务集群 。
2. 从服务器通过名字与主服务器关联在一起，`brokerName` 与主服务器相同。
3. `brokerId`为0是主服务器。从服务器的值是非零值，例如如果有四个从服务器，他们的 `brokerId` 应该是 1,2,3,4。
4. `brokerRole`的值为 `SYNC_MASTER` 是同步复制的主服务器。如果是 `ASYNC_MASTER` 则为异步复制的主服务器。



- **同步复制**：消息复制到从服务器后才向生产者发回反馈信息。
- **异步复制**：消息发到主服务器就向生产者发回反馈信息，之后再向从服务器复制。





## 启动





### 1. 启动两个 name server

![namesrv](https://img-blog.csdnimg.cn/20200709143211216.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

在两台服务器上启动两个 name server，它们不用做任何集群的配置，都是作为独立服务运行，它们之间也不会进行数据复制。

所有broker服务启动后，要同时连接这两个 name server，向两个 name server 进行注册。

**在两台服务器上都启动 name server**：

```shell
nohup sh mqnamesrv &
```





### 2. 启动 broker a 的主从两台服务器

![a](https://img-blog.csdnimg.cn/20200709144521933.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



**在服务器1上启动 broker a 主服务器**：

参数说明：

- **-n参数**：指定name server地址列表，多个地址用分号分隔
- **-c参数**：指定配置文件，使用指定的配置文件启动 broker

```shell
nohup sh mqbroker \
-n '192.168.64.151:9876;192.168.64.152:9876' \
-c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a.properties \
&
```



**在服务器2上启动 broker a 从服务器**：

```shell
nohup sh mqbroker \
-n '192.168.64.151:9876;192.168.64.152:9876' \
-c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-a-s.properties \
&
```





### 3. 启动 broker b 的主从两台服务器

![b](https://img-blog.csdnimg.cn/20200709150333945.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



**在服务器2上启动 broker b 主服务器**：

```shell
nohup sh mqbroker \
-n '192.168.64.151:9876;192.168.64.152:9876' \
-c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b.properties \
&
```



**在服务器1上启动 broker b 从服务器**：

```shell
nohup sh mqbroker \
-n '192.168.64.151:9876;192.168.64.152:9876' \
-c $ROCKETMQ_HOME/conf/2m-2s-sync/broker-b-s.properties \
&
```





## 检查启动的服务

在两台服务器上分别查看java进程，确认两台服务器上是否各启动了三个java进程，分别运行name server和两个broker。

```shell
# 查看 java 进程
jps 

---------------------
12081 NamesrvStartup
15745 BrokerStartup
15595 BrokerStartup
16655 Jps
```





## 启动管理界面

```shell
# 进入 rocketmq-console 项目打包文件目录
cd /usr/local/rocketmq/RocketMQ-Externals/rocketmq-console/target/

# 启动管理界面
nohup java -jar rocketmq-console-ng-1.0.1.jar \
--server.port=8080 \
--rocketmq.config.namesrvAddr='192.168.64.151:9876;192.168.64.152:9876' \
&
```



**查看集群状态**：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200709172705572.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

## Topic 基本原理





### 在Rocketmq集群中新建 Topic1

在管理界面中新建**主题**`Topic1`，为了方便观察测试效果，这里把**写队列**和**读队列**的数量都设置成3。

![topic1](https://img-blog.csdnimg.cn/20200711002829639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

这样，在 broker-a 和 broker-b 上都创建了 Topic1 主题，并各创建了3写3读队列，共6写6读，如下图所示：

![topic1](https://img-blog.csdnimg.cn/20200711002512809.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

*你也可以修改Topic1分别配置 broker-a 和 borker-b 上的队列数量。*





### perm 参数的含义

`perm` 参数是设置队列的读写权限，下面表格列出了可配置的值及其含义：

| 取值 | 含义         |
| ---- | ------------ |
| 6    | 同时开启读写 |
| 4    | 禁写         |
| 2    | 禁读         |





### Topic 收发消息原理

![topic](https://img-blog.csdnimg.cn/20200711143824268.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

生产者将消息发送到 Topic1 的其中一个**写队列**，消费者从对应的一个**读队列**接收消息。





### 生产者的负载均衡

![producer](https://img-blog.csdnimg.cn/20200711153533541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

生产者以**轮询**的方式向所有写队列发送消息，这些队列可能会分布在多个broker实例上。





### 消费者的负载均衡

一个 group 中的多个消费者，可以以负载均衡的方式来接收消息。

`读取队列`被均匀分配给这些消费者，它们从指定的队列来接收消息。队列的分配可以采用不同的策略，这里简略介绍以下三种策略：





#### AllocateMessageQueueAveragely 平均分配

这是默认策略，它是这样分配队列的：

![topic](https://img-blog.csdnimg.cn/20200713225310740.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





#### AllocateMessageQueueAveragelyByCircle 环形分配

如果使用环形分配，在消费者的代码中需要设置分配策略，代码如下：

```java
consumer.setAllocateMessageQueueStrategy(new AllocateMessageQueueAveragelyByCircle());
```

这种分配策略的逻辑很简单，所有0号队列分给0号消费者，所有1号队列分给1号消费者，以此类推。

![topic](https://img-blog.csdnimg.cn/20200713225823999.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





#### AllocateMessageQueueConsistentHash 一致性哈希

如果使用一致性哈希算法进行分配，在消费者的代码中需要设置分配策略，代码如下：

```java
consumer.setAllocateMessageQueueStrategy(new AllocateMessageQueueConsistentHash());
```

这种算法依靠一致性哈希算法，看当前消费者可以落到哪个虚拟节点，该虚拟节点对应哪个队列。





### 问题

思考一下，如果写队列比读队列多会怎样？反之会怎样？





## NameServer 基本原理

![rocketmq](https://img-blog.csdnimg.cn/20200713233623258.png#pic_center)

NameServer 是 rocketmq 自己开发的一个轻型注册中心，他的作用相当于是 zk、eureka等。

rocketmq 为什么不使用 zk 呢？实际上 rocketmq 的早期版本使用的就是 zookeeper。

而 rocketmq 的架构设计决定了只需要一个轻量级的元数据服务器就足够了。杀鸡焉用牛刀？小区里，搞个货架就行了，建个仓库，又占地方，维护成本又高。

甚至，NameServer 都不需要有一个集群的管理者。以至于，NameServer 看起来都不像一个集群。事实上，NameServer 本质上来看，也不是一个集群。因为它的各个节点是独立的，不相关的。每个 NameServer 都是独立和 Producer、Consumer打交道。





### 基本认识

1. NameServer主要用于存储Topic，Broker关系信息，功能简单，稳定性高。
2. 各个NameServer节点之间不相关，不需要通信，单台宕机不影响其它节点。
3. NameServer集群整体宕机不影响已建立关系的Concumer，Producer，Broker。





### Broker、Producer、Consumer 与NameServer的通信

1. 每个Borker和所有NameServer保持长连接，心跳间隔为30秒。每次心跳时还会携带当前的Topic信息。当某个Broker两分钟之内没有心跳，则认为该Broker下线，并调整内存中与该Broker相关的Topic信息。
2. Consumer 从 NameServer 获得 Topic 的路由信息，与对应的 Broker 建立长连接。间隔30秒发送心跳至Broker。Broker检查若发现某 Consumer 两分钟内无心跳则认为该Consumer下线，并通知该Consumer所有的消费者集群中的其他实例，触发该消费者集群重新负载均衡。
3. Producer 与消费者一样，也是从 NameServer 获得 Topic 的路由信息，与对应的 Broker 建立长连接，30秒发送一次心跳。Broker 也会认为两分钟内没有心跳的 Producer 下线。





