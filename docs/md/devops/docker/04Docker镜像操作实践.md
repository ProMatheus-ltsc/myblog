# Docker镜像操作实践
[[TOC]]

## 下载镜像

语法：docker pull 镜像名
案例：

```
docker pull hello-world
```

## 浏览镜像文件

语法：

```
docker images
```

## 查看镜像详情

语法：docker inspect 镜像名或镜像id

```bash
docker inspect hello-world
```

## 查看镜像历史

一个镜像是由多个层（[layer](https://so.csdn.net/so/search?q=layer&spm=1001.2101.3001.7020)）组成的，那么，我们要如何知道各个层的具体内容呢？通过 docker history 命令，可以列出各个层（layer）的创建信息，例如：

```bash
docker history hello-world
```

## 导出镜像文件

镜像导出(linux系统中的镜像文件下载到本地-例如window)，导出后给他人使用

```bash
docker save  hello-world | gzip > hello-world.tar.gz  
```

## 删除镜像文件

语法：docker image rm 镜像名或镜像id

```
docker image rm hello-world
```


docker中删除所有的镜像

```javascript
docker rmi $(docker images | awk '{print $3}' |tail -n +2)
```

删除所有镜像

```
docker rmi `docker images -q`
```

镜像名包含关键字
```
docker rmi --force `docker images | grep doss-api | awk '{print $3}'`    //其中doss-api为关键字
```
## 导入镜像操作

镜像导入（要在hello-world.tar.gz 文件所在目录下执行）

```bash
docker load < hello-world.tar.gz  
```

## 运行镜像文件

基于镜像，启动容器运行。

```
docker run hello-world
```


## 总结(Summary)

本小节重点讲解了Docker中核心对象-镜像（image)的基本操作，例如下载镜像、查看下载的镜像、查看镜像详细信息，构建历史等。