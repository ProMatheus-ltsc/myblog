# Docker镜像制作实践

[[TOC]]

## 背景

我们基于docker pull指令可以从远程仓库下载我们需要的一些镜像(image),但是镜像仓库中的镜像是从哪里来的呢,假如镜像仓库中没有我们需要的镜像呢,所以本小结我们会讲解我们自己如何制作镜像.

## 镜像制作分析

我们可以将一些文件通过Dockerfile文件进行描述，然后通过build操作构建一个镜像，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/7aad92a5926e42f59cc1f523f778398a.png)

其中，图中的Dockerfile用来构建镜像的文本文件,内部会包含一条条构建镜像所需的指令和说明。

## 制作JDK镜像

### 准备工作

1. centos:7镜像 (所有的镜像文件创建时都需要有一个空的centos镜像，就类似通过一个空的光盘或u盘创建一个系统启动盘是一样的)
2. jdk压缩包 jdk-8u51-linux-x64.tar.gz(可以从课前资料获取)，基于此压缩包，制作jdk镜像。

例如:JDK 拷贝的目录

![在这里插入图片描述](https://img-blog.csdnimg.cn/a42b08ed843641979de2d24d4d4908ea.png)

### 创建Dockerfile文件

在创建新的镜像时都需要有一个Dockerfile文件(文件名一定要注意大小写),这个文件中定义镜像制作过程,这一小结以JDK镜像制作过程为例,讲解Dockerfile文件以及文件内容.

第一步:进入jdk-8u51-linux-x64.tar.gz文件所在目录,基于vim创建Dockerfile文件,例如

```bash
vim  Dockerfile
```

说明,这里一定要注意文件的大小写.

第二步:按键盘上的"i"进入编辑模式

第三步:拷贝如下代码到你的Dockerfile中,例如:

```
FROM centos:7
ADD jdk-8u51-linux-x64.tar.gz /usr/local/docker
ENV JAVA_HOME=/usr/local/docker/jdk1.8.0_51 \
    PATH=/usr/local/docker/jdk1.8.0_51/bin:$PATH
CMD ['bash']
```

第四步:拷贝完成,按ESC进入命令行模式(又叫最后一行模式)

第五步:然后按shift+冒号,输入wq保存退出.目录结构如下:

![在这里插入图片描述](https://img-blog.csdnimg.cn/56e365a907b7442fb503960105eaa720.png)

### 创建JDK镜像文件

在Dockerfile所在目录执行docker build指令.例如:

```
docker build -t jdk:8 .  #不要丢掉这里的点,-t表示镜像标识(镜像名),是tag单词的缩写.
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/294ae0e5096548bab78be38c053b4cb9.png)

注意末尾的点,表示构建过程中从当前目录寻找文件，jdk:8为我们创建的镜像名。

### 运行JDK镜像(image)文件

在宿主机中执行如下指令,启动JDK容器,例如:

```
docker run -it jdk:8 bash
```

进入容器以后，可以通过echo $PATH查看环境变量(注意单词大小写)，并可以通过java –version查看JDK版本信息。

![在这里插入图片描述](https://img-blog.csdnimg.cn/3479069ba1bf47e6b0548ff52a592761.png)

### 基于JDK镜像启动sentinel

JDK镜像创建以后,如何通过此镜像运行一个web服务呢，例如sentinel等。

第一步：将sentinel拷贝宿主机指定目录，例如/root/servers目录(servers目录不存在可以自己创建)。

![在这里插入图片描述](https://img-blog.csdnimg.cn/3e6a5975ef304d62841d0ffbfde96672.png)

第二步：启动镜像容器，通过java执行运行web服务

基于jdk:8镜像启动运行sentinel服务(服务启动后可在宿主机通过localhost:8180进行访问)

```
docker run -d -p 8180:8080 --name sentinel \
-v /root/servers:/usr/sca \
jdk:8 java -jar /usr/sca/sentinel-dashboard-1.8.1.jar
```

其中:

1. -d 表示后台运行
2. -p 用于实现端口映射(假设外部要访问这个容器,必须要做端口映射)
3. –name 表示为启动的容器起一个名字

这里,服务启动后可通过docker ps 指令查看启动的服务,假如看不到服务,可能服务启动失败,可通过如下指令查看具体日志

```bash
docker container logs  689 #这里689为容器id,也可以为你的容器名
```

我们访问sentinel服务时需要通过宿主机进行访问,不可以直接访问,所以要做端口映射,例如

![在这里插入图片描述](https://img-blog.csdnimg.cn/ded212790f2748f99f44f1559b1726c7.png)

第三步:打开浏览器,访问sentinel服务.

在windows中打开浏览器,输入你的ip地址(这个ip为远端宿主机的ip地址),端口号为宿主机的端口号.例如

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c1c36c228f64b9fa75c5e5dd0954c62.png)

## Docker部署前端Vue项目
前端项目使用的是vue+node，部署在centos7.4

### 打包vue项目

- 通过打包命令打包项目

```coffeescript
npm run build
```

- 生成如下目录，dist就是我们需要的目录。

![img](https://img-blog.csdnimg.cn/20200904201305336.png)

-  把dist和Dockerfile放入centos的同一个目录下面

![img](https://img-blog.csdnimg.cn/20200904201551642.png)

- Dockerfile如下，第二行的意思就是将dist文件夹下面的内容拷贝到/usr/share/nginx/html/这个目录下（此目录为通过docker运行nginx后容器的目录结构 ，可以通过命令 docker exec -it 容器名称 /bin/bash 查看）。

```groovy
FROM nginx:1.10



COPY dist/ /usr/share/nginx/html/
```

- 构建镜像（其中的xxx为镜像的名称，你可以修改）

```erlang
docker build -t xxx .
```

- 执行镜像(其中xx为容器的名称)

```css
    docker run --name xx  -p 80:80 -d xxx
```

 

 

## 制作Sentinel镜像(练习）

### 准备工作

1. centos:7镜像(课前资料中的)
2. jdk-8u51-linux-x64.tar.gz(可以从课前资料获取)
3. sentinel-dashboard-1.8.1.jar

说明,通过docker images指令查看centos:7是否存在,然后将 jdk-8u51-linux-x64.tar.gz,sentinel-dashboard-1.8.1.jar放在/root/setup/sentinel目录(目录不存在的话自己创建)

### 构建Sentinel镜像

第一步：在sentinel所在目录创建Dockerfile文件,并添加如下内容

```
FROM centos:7
ADD jdk-8u51-linux-x64.tar.gz  /usr/local/
ADD sentinel-dashboard-1.8.1.jar  /usr/local/
ENV JAVA_HOME=/usr/local/jdk1.8.0_51 \
    PATH=/usr/local/jdk1.8.0_51/bin:$PATH
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/sentinel-dashboard-1.8.1.jar"]
```

其中,EXPOSE表示对外暴露的服务端口,ENTRYPOINT中写的是你容器启动时候要执行的指令.

第二步:使用 Dockerfile 构建镜像(在Dockerfile所在目录执行docker指令)

```
docker build -t  sentinel:8 .  #不要丢掉这里的点
```

第三步：后台运行sentinel容器

```bash
docker run -d --name sentinel8181 -p 8181:8080 sentinel:8  #-d 表示后台运行,-p用于指定端口映射,sentinel:8为镜像文件名
```

第四步:查看sentinel容器

```bash
docker ps
```

假如看不到容器,可通过"docker container logs 容器id"方式查看容器状态.

第五步:访问sentinel服务

可以在window中访问时你的linux系统中启动的sentinel服务,ip地址应该为宿主机的ip地址,端口号为宿主机的端口号.例如

![在这里插入图片描述](https://img-blog.csdnimg.cn/48283092bb5e4f188a9b0cc6ede761e6.png)

## 总结(Summary)

本章节重点讲解了Dockerfile编写及镜像制作的过程，以及基于制作的镜像启动运行相关程序的过程。