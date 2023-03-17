# Elasticsearch-Docker搭建ES
[[TOC]]

## 关闭防火墙

后面我们要使用多个端口，为了避免繁琐的开放端口操作，我们关掉防火墙

```shell
# 关闭防火墙
systemctl stop firewalld.service

# 禁用防火墙
systemctl disable firewalld.service
```





## 安装Docker

我们使用 Docker 来运行 Elasticsearch，首先安装 Docker，参考下面笔记：

[Docker笔记](https://promatheus-ltsc.github.io/matheusblog/md/devops/docker/02Docker%E5%AE%89%E8%A3%85%E5%AE%9E%E8%B7%B5.html))





## 下载 Elastic Search 镜像

```shell
docker pull elasticsearch:7.9.3
```





## 集群部署结构

![a](https://img-blog.csdnimg.cn/20201024193959184.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

在一台服务器上，使用Docker部署三个ES容器组成的集群





## 准备虚拟网络和挂载目录

```shell
# 创建虚拟网络
docker network create es-net

# node1 的挂载目录
mkdir -p -m 777 /var/lib/es/node1/plugins
mkdir -p -m 777 /var/lib/es/node1/data

# node2 的挂载目录
mkdir -p -m 777 /var/lib/es/node2/plugins
mkdir -p -m 777 /var/lib/es/node2/data

# node3 的挂载目录
mkdir -p -m 777 /var/lib/es/node3/plugins
mkdir -p -m 777 /var/lib/es/node3/data
```





## 设置 max_map_count

必须修改系统参数 `max_map_count`，否则 Elasticsearch 无法启动：

在 `/etc/sysctl.conf` 文件中添加 `vm.max_map_count=262144`

```shell
echo 'vm.max_map_count=262144' >>/etc/sysctl.conf
```

**需要重启服务器！**

**确认参数配置：**

```shell
cat /etc/sysctl.conf
```





## 启动 Elasticsearch 集群




node1：

```shell
docker run -d \
  --name=node1 \
  --restart=always \
  --net es-net \
  -p 9200:9200 \
  -p 9300:9300 \
  -v /var/lib/es/node1/plugins:/usr/share/elasticsearch/plugins \
  -v /var/lib/es/node1/data:/usr/share/elasticsearch/data \
  -e node.name=node1 \
  -e node.master=true \
  -e network.host=node1 \
  -e discovery.seed_hosts=node1,node2,node3 \
  -e cluster.initial_master_nodes=node1 \
  -e cluster.name=es-cluster \
  -e "ES_JAVA_OPTS=-Xms256m -Xmx256m" \
  elasticsearch:7.9.3
```

环境变量说明：

| 环境变量                     | 说明                     |
| ---------------------------- | ------------------------ |
| node.name                    | 节点在集群中的唯一名称   |
| node.master                  | 可已被选举为主节点       |
| network.host                 | 当前节点的地址           |
| discovery.seed_hosts         | 集群中其他节点的地址列表 |
| cluster.initial_master_nodes | 候选的主节点地址列表     |
| cluster.name                 | 集群名                   |
| ES_JAVA_OPTS                 | java虚拟机参数           |

参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html




node2：

```shell
docker run -d \
  --name=node2 \
  --restart=always \
  --net es-net \
  -p 9201:9200 \
  -p 9301:9300 \
  -v /var/lib/es/node2/plugins:/usr/share/elasticsearch/plugins \
  -v /var/lib/es/node2/data:/usr/share/elasticsearch/data \
  -e node.name=node2 \
  -e node.master=true \
  -e network.host=node2 \
  -e discovery.seed_hosts=node1,node2,node3 \
  -e cluster.initial_master_nodes=node1 \
  -e cluster.name=es-cluster \
  -e "ES_JAVA_OPTS=-Xms256m -Xmx256m" \
  elasticsearch:7.9.3
```




node3：

```shell
docker run -d \
  --name=node3 \
  --restart=always \
  --net es-net \
  -p 9202:9200 \
  -p 9302:9300 \
  -v /var/lib/es/node3/plugins:/usr/share/elasticsearch/plugins \
  -v /var/lib/es/node3/data:/usr/share/elasticsearch/data \
  -e node.name=node3 \
  -e node.master=true \
  -e network.host=node3 \
  -e discovery.seed_hosts=node1,node2,node3 \
  -e cluster.initial_master_nodes=node1 \
  -e cluster.name=es-cluster \
  -e "ES_JAVA_OPTS=-Xms256m -Xmx256m" \
  elasticsearch:7.9.3
```





# 查看启动结果结果

[http://192.168.64.181:9200](http://192.168.64.181:9200/)

![a](https://img-blog.csdnimg.cn/20210414100129180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





http://192.168.64.181:9200/_cat/nodes

![a](https://img-blog.csdnimg.cn/20210414100202838.png#pic_center)





# chrome浏览器插件：elasticsearch-head

elasticsearch-head 项目提供了一个直观的界面，可以很方便地查看集群、分片、数据等等。elasticsearch-head最简单的安装方式是作为 chrome 浏览器插件进行安装。





1. 在 elasticsearch-head 项目仓库中下载 chrome 浏览器插件
   https://github.com/mobz/elasticsearch-head/raw/master/crx/es-head.crx
2. 将文件后缀改为 zip
3. 解压缩
4. 在 chrome 浏览器中选择“更多工具”–“扩展程序”
5. 在“扩展程序”中确认开启了“开发者模式”
6. 点击“加载已解压的扩展程序”
7. 选择前面解压的插件目录
8. 在浏览器中点击 elasticsearch-head 插件打开 head 界面，并连接 http://192.168.64.181:9200/

![a](https://img-blog.csdnimg.cn/20201024222440713.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)