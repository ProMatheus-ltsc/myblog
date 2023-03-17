# Docker容器互联实践
[[TOC]]

## 概述

Docker中存在多个容器时，容器与容器之间经常需要进行通讯，例如nacos访问mysql，redis集群中各个节点之间的通讯。

## 解决方案

Docker 中容器与容器之间进行通讯的解决方案一般有两种：

第一种：两个容器通过宿主机进行通讯（容器中的端口会映射到宿主机上）

第二种：两个容器之间直接通过虚拟网络进行连接,但是需要我们在docker中创建网络。

## 初始化网路

### 架构设计

![在这里插入图片描述](https://img-blog.csdnimg.cn/1532df01c3714d7282733ab0e8c7dba7.png)

### 新建网络

例如：创建名字为t-net的网络

```bash
docker network create -d bridge t-net  #t-net为自己起的网络名称
```

其中，-d driver,网络类型，默认 bridge。
说明，创建好这个网络以后，在网落上添加容器，容器就可以通讯了

### 查看网络信息

列出所属有网络

```bash
docker network ls
```

查看网络信息

```bash
docker inspect 67d #67d 为创建的网络id
```

## 实现容器互联

### 创建容器

打开终端，基于centos:7这个镜像启动容器，并加入到t-net这个网络

```bash
docker run -it --name app1 --network t-net centos:7
```

新开终端执行，基于centos:7这个镜像再启动容器，同时也加入到t-net网络

```bash
docker run -it --name app2 --network t-net centos:7
```

### 测试网络互通

在两个终端中分别执行：

```bash
ping app1
ping app2
```

显示如下：

```bash
[root@35569c623c4c /]# ping app1
PING app1 (172.18.0.2) 56(84) bytes of data.
64 bytes from 35569c623c4c (172.18.0.2): icmp_seq=1 ttl=64 time=0.577 ms
64 bytes from 35569c623c4c (172.18.0.2): icmp_seq=2 ttl=64 time=0.061 ms
64 bytes from 35569c623c4c (172.18.0.2): icmp_seq=3 ttl=64 time=0.066 ms
......
```

## 总结（summary）

### 重难点分析

- 容器互联方案
- 创建网络方式
- 应用网络

### FAQ分析

- 什么是容器互联?
- 为什么需要创建网络？
- 如何创建网络？
- 如何应用网络？
- 如何测试网络是否是通的？

