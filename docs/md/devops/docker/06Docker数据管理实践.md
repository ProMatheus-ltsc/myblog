# Docker数据管理实践

[[TOC]]

## 概述

在容器中管理数据主要有两种方式：

- 数据卷（Volumes）
- 挂载主机目录 (Bind mounts)

## 数据卷

数据卷是一个可供一个或多个容器使用的特殊目录，可以在容器之间共享和重用，默认会一直存在，即使容器被删除。

## 数据卷操作

第一步：创建数据卷，例如：

```
docker volume create container-vol
```

第二步：查看所有数据卷，例如：

```
docker volume ls
```

查看指定 数据卷 的信息

```
docker volume inspect container-vol
```

查询的结果：

```
[
    {
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/container-vol/_data",
        "Name": "container-vol",
        "Options": {},
        "Scope": "local"
    }
]
```

第三步：启动挂载数据卷的容器，例如：

```
docker run -it --mount source=container-vol,target=/root centos:7 bash
```

或者采用如下简写方式

```
docker run -it -v container-vol:/root centos:7 bash
```

-v container-vol:/root 把数据卷 container-vol 挂载到容器的 /root 目录

第四步：删除数据卷(如果数据卷被容器使用则无法删除)，例如

```
docker volume rm container-vol
```

清理无主数据卷

```
docker volume prune
```

## 挂载主机目录

我们还可以在启动容器时，以目录直接挂载的方式进行数据操作，例如：

```
docker run -it -v /usr/app:/opt/app centos:7 bash
```

其中：

1)/usr/app：为宿主机目录

2)/opt/app: 为启动容器的一个目录

3)-v 用于指定挂载目录，如果本地目录(宿主机目录)不存在， Docker 会自动为你按照挂载目录进行目录的创建。

例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/999c7891ef8447a59213e6639327cf59.png)

查看挂载目录信息

```
docker inspect 91a #91a 为容器id

```

显示结果：

```
...

"Mounts": [
    {
        "Type": "bind",
        "Source": "/usr/app",
        "Destination": "/opt/app",
        "Mode": "",
        "RW": true,
        "Propagation": "rprivate"
    }
],

...
```

## 总结（Summary）

本章节重点讲解了容器中的数据管理操作，例如数据卷操作，目录的挂在操作。