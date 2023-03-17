# Docker容器操作实践
[[TOC]]

本次以CentOS镜像为例，讲解容器的基本操作。

## 下载镜像(Image)

通过docker pull指令下载CentOS镜像，例如：

```bash
docker pull centos:7
```

说明，官方镜像仓库地址为https://hub.docker.com/

下载完以后，查看centos7镜像文件。

```bash
docker images
```

## 创建并启动容器(Container)

基本语法解析：

```
docker run -it xxxx bash
```

其中：
1)xxxx - 镜像名, 或 image id 的前几位，

2)-it 这是两个参数(-i表示交互式操作， -t 表示终端)

3) bash 表示进入操作终端，基于交互式进行相关操作（例如执行linux相关指令）。

案例：通过docker启动运行 centos7镜像

```bash
docker run -it centos:7 bash
```

docker中启动所有的容器命令

```javascript
docker start $(docker ps -a | awk '{ print $1}' | tail -n +2)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/45858940e1a94ed88944921330542f5b.png)

## 查看Docker中的容器(Container)

查看docker运行中的容器(要在宿主机执行docker指令)

```
docker ps
```

说明,假如在容器中执行docker指令会出现如下问题,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/59e16f5e7055491eb8171b1278224c92.png)

查看docker运行中的所有容器


```
docker ps -a
```

其中，-a表示全部(all）。

## 查看容器日志(logs)信息

查看容器启动运行日志时，这个指令非常重要，假如容器没有启动，要通过此指令去看一下错误日志。

```bash
docker container logs 802  #802为自己的容器id（一般写前三位即可）
```

说明,查看容器的运行日志时,容器应该处于一种运行状态.

## 停止(stop)或重启(Restart)容器(Container)

停止运行的容器，代码如下：

```bash
docker container stop 802  #802为容器自己的id
```
docker中关闭所有的容器命令

```javascript
docker stop $(docker ps -a | awk '{ print $1}' | tail -n +2)
```

重新启动容器，代码如下：

```bash
docker container restart 802 #802位容器自己的id
```

## 进入(exec)指定容器(Container)

当容器处于运行状态,要进入容器,可以使用 docker exec 命令，例如：

```
docker exec -it 802 bash #802为容器id
```

说明,假如容器处于一种非运行状态,此时你执行docker exec进入容器会出现如下问题:

![在这里插入图片描述](https://img-blog.csdnimg.cn/9ec3f979365e4952b2f8aac886d00d11.png)

## 从容器(Container)中退出(exit)

假如从宿主机进入了启动的容器，退出容器需要使用exit指令，例如：

```
exit
```

## 删除(rm)容器(Container)

假如容器不用了，可执行删除操作，例如：

```bash
docker container rm 802 #802为容器id
```

docker中删除所有的容器命令

```javascript
docker rm $(docker ps -a | awk '{ print $1}' | tail -n +2)
```
删除所有容器

```
docker rm `docker ps -a -q`
```

说明,假如容器正在运行执行删除,会出现如下问题,例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20b1edf20e0d4a2a93ea65347d1a9566.png)

其中，如果删除运行中的容器，需要添加 -f 参数执行强制删除,例如:

```bash
docker container rm -f 802 #802为容器id
```

清理所有处于终止状态容器，例如：

```bash
docker container prune
```

说明,执行完这个指令以后,可以通过docker ps -a 再查看容器,看看是否有删除.

## 总结（Summary)

本章节重点讲解了容器的基本操作，例如容器的启动、运行、停止、删除等基本操作。
