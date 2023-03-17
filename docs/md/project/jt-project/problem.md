# 关于jt项目问题集

[[TOC]]

## 1.maven项目创建第一行报错问题

报错说明:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703161724890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

关于报错说明:
STS开发工具整合SpringBoot时,容易报maven插件异常的错误信息. STS中的插件版本与SpringBoot中的版本不一致导致的.

解决方案:
说明编辑POM.xml文件信息,修改完成之后需要更新项目.

```
	<properties>
		<java.version>1.8</java.version>
		<!--指定插件版本  -->
		<maven-jar-plugin.version>3.1.1</maven-jar-plugin.version>
		<!--跳过测试类打包  -->
		<skipTests>true</skipTests>
	</properties>
```

2).更新项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020070316232176.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 2.maven工具创建SpringBoot项目报错说明

说明: 利用maven工具,创建SpringBoot 创建时POM.xml文件报错.
报错说明: 一般pom.xml文件报错,一般都是maven私服镜像服务器问题.

步骤1:
切换本地仓库的私服地址

```
	<mirror>  
  <id>alimaven</id>  
  <name>aliyun maven</name>  
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>          
</mirror>
```

步骤2: 强制更新maven

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703163253863.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3.关于JDK和JRE报错问题

说明:配置环境变量,将JRE配置改为JDK配置信息. 保证JDK版本正确.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703163647405.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 4.程序启动报 java.lang.ClassNotFoundException异常

报错说明: IDE在程序运行时无法找到.class文件进行加载. 可能是将target目录下的文件删除,导致缺少.class文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020070609184399.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

解决方案: 让程序重写编译即可.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706092141434.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 5 关于hosts文件修改的权限问题

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807143648151.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

解决方案:
1.添加管理权限 选中hosts文件之后 右键属性.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807143927690.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

方式2: 以超级管理员的方式运行Switch hosts软件

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020080714565177.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

方式3: 添加指定的用户权限 步骤 1.获取当前计算机的名称 PC 2.添加用户信息.
**注意事项: 计算机名称不要写中文.**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807150228689.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

方式4: 取消只读属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200930145129260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

## 6.nginx访问报错

1. 检查HOSTS文件配置正常.

```java
# 京淘配置  
#左侧写IP地址   右侧写域名  中间使用空格分隔
127.0.0.1   image.jt.com
127.0.0.1   manager.jt.com
127.0.0.1   www.jt.com
127.0.0.1   sso.jt.com
123456
```

1. 检查NGINX配置文件是否正确

```java
# 配置图片服务器
	server {
		listen 80;
		server_name image.jt.com;

		##通过网址转向指定的目录  注意/的写法
		location / {
		
			root D:/JT-SOFT/images;
		}
	}
```

1. 重启nginx
   在重启之前检查是否有多余的nginx服务项,如果有则关闭.

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807151154655.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2. hosts文件是否生效
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807151610908.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

3. 根据请求路径 检查代码中路径的拼接是否正常.

http://image.jt.com/2020/08/07/cc10f60491234317adf800aeafc6af1f.png
D:\JT-SOFT\images/2020/08/07/cc10f60491234317adf800aeafc6af1f.png

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200711164350835.png)

## 8.关于Nginx 不能启动说明

说明:nginx启动时会占用80端口.所以需要释放80资源.
步骤1: 查询 80端口被哪个进程占用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807110706885.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

步骤2: 关闭进程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807110854195.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

步骤3: 如果80端口 被PID=4占用,则需要升级驱动配置.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807111042504.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 9 远程连接虚拟机问题

### 9.1检查双方IP地址是否正常

1.检查windows IP地址

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081009075565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2.检查 Linux IP时

```java
ip addr 
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904172734449.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

发现没有IP地址

则重启网卡即可.

```java
service NetworkManager stop 
chkconfig  NetworkManager  off    永久关闭 Manager网卡
service  network restart		  重启network网卡
```

1. 检查Linux IP
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200810090838250.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)


### 9.2 windows IP地址修改

说明:如果发现windows IP地址与Linux不在同一个网段则执行如下操作.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200810091630298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 10 虚拟机克隆问题

在主板中 进入BIOS系统 开启虚拟化设置即可.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201201174155979.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200810091803388.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200810092044259.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 11 虚拟机连接不通 问题说明

虚拟机环境: 虚拟机必须有正确的IP地址.
万能的组合键: ctrl + c

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020090710591735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

windows环境:
1.检查网卡的个数

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907110651649.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907110304212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

2.配置虚拟机网络环境编辑器

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907110449872.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

3.检查IP地址

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200811093137110.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

3.检查网络是否畅通
**新开一个dos命令窗口 windows + R**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907110552166.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

4.检查虚拟机服务项是否启动.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907110859524.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200907111007487.png#pic_center)

之后windows + r 再次检查IP是否 ping通.

重新安装虚拟机 终极绝招!!!

## 12 关于数据库主从挂载问题说明

说明:按照规则如果正常的执行了主从的挂载应该出现如下提示, 如果没有2个yes则说明代码有误.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200811105555334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

查询问题:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200811110417971.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

重新挂载:

```java
/*1.关闭主从服务*/
STOP  SLAVE;

/*修改数据库信息*/

/*重新执行挂载命令*/
CHANGE MASTER TO MASTER_HOST="192.168.126.129",
	         MASTER_PORT=3306,
	         MASTER_USER="root",
	         MASTER_PASSWORD="root",
	         MASTER_LOG_FILE="mysql-bin.000001",
	         MASTER_LOG_POS=245;
```

## 13 关于Mycat启动问题说明

检查思路: 查看Mycat的启动日志信息.
说明: 进入log目录中. 利用cat 命令 查询数据.发现问题. 如果修改好之后,需要重启mycat.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200811143124577.png)

错误描述: **UTF-8的序列的字节**xxxx错误
原因说明: 由于在配置文件中 乱写了中文导致的. 最好将中文按行注释 ,或者将中文全部删除之后重启.

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020101212010355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

## 14 关于哨兵搭建错误解决

1).关闭所有的redis服务器包括哨兵

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200815155205513.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

2).修改redis的配置文件.将主从的关系配置 删除.

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081515535860.png#pic_center)

3).分别启动Redis 之后配置主从关系. slaveof xxxxxx
4).修改哨兵的配置文件(重启复制一份)
5).重启服务器,之后重新测试.

**终极绝招: 重头开始. 删除哨兵目录,重新复制.**

## 15 关于Redis集群搭建错误说明

1.关闭所有的redis服务器 sh shutdown.sh
2.删除除redis.conf文件之外的所有文件. rm -f 700*/dump.rdb
3.重新检查配置文件
4.重启redis服务
5.搭建集群

## 16 Dubbo中遇到POJO转化POJO异常

问题说明: 由于程序配置了热部署,运行的速度较快 使zk中的数据产生了误差.导致调用不能正确完成,所以报错.
解决方案: 手动关闭服务器,之后重启即可.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200821095500768.png#pic_center)

## 17 PD使用时没有数据库类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200825114357319.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

解决方案:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200825114529271.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)


## 18 编程代码规范问题

#### 18.1 命名不规范

写java代码时: 不要出现特殊字符(~!@#$%^&**()_+)/中文/空格

#### 18.2 工作空间位置问题

最好不要放到系统盘路径下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126112705712.png#pic_center)

#### 18.3 工作空间千万不要嵌套

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126113018436.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

## 19 关于web项目404报错

### 19.1 引入jar包

```java
 <!--springBoot整合JSP添加依赖  -->
        <!--servlet依赖 -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
        </dependency>

        <!--jstl依赖 -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
        </dependency>

        <!--使jsp页面生效 -->
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
        </dependency>

```

### 19.2 检查YML配置

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126113251204.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

### 19.3 webapp目录问题

说明: java/resources/webapp目录都是平级的.

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112611342918.png#pic_center)

如果上述操作都正确,则最好重新编译

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126113620224.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

### 19.4 发布路径问题

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201126113747739.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70#pic_center)

## 20 关于项目打包报错说明

### 20.1 打包类型报错

说明: 项目的打包方式 应该为jar包

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210714144052408.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 20.2 依赖错误

说明: 有时可能不注意 添加了额外的依赖,导致程序打包失败.
根据码云中的代码 进行对比.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210714144350488.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 20.3 测试类报错

说明: maven-install时不光要将项目进行打包编译,同时需要将测试方法执行.保证程序的正确. 如果测试方法中有个别的报错情况,则导致整个项目打包报错!!!
解决方案:
\1. 删除测试方法.
\2. 跳过测试类打包 告知maven 遇到测试类时 不执行.

```java
		 <properties>
	        <java.version>1.8</java.version>
	        <!--跳过测试类加载-->
	        <skipTests>true</skipTests>
    	</properties>
```

### 20.4 maven执行报错

如果maven执行报错,则检查IDEA中maven的配置. 检查路径(**注意嵌套问题**)/settings文件/本地仓库
如果如上操作都不能解决,重新新建工作空间 之后重新配置项目 重新发布.

### 21 文件上传图片不回显说明

### 21.1 现象说明

说明:文件上传正确,但是回显出问题,应该按照如下的方式进行调试

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c37879e561542b2a5fb561ee7a7949f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

### 21.2 检查路径是否正确

1. 检查磁盘/网络地址 除了前缀不同之外,其他的必须相同.
   磁盘地址:G:/images/2021/09/10/4c56b5f6173a45cfb372f86e7d584623.jpg
   网络地址:http://image.jt.com/2021/09/10/4c56b5f6173a45cfb372f86e7d584623.jpg
2. 检查前端业务地址
   复制地址之后,将前缀换位本地磁盘地址,再次检查路径是否正确.

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/07894a03937b45ed865227f4c3c892b6.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_17,color_FFFFFF,t_70,g_se,x_16)

   检查路径.

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/d380b9475ad44700af0a0b184571aa7c.png)

3. 检查Nginx服务器启动项
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/30ffafb90fe34f7bade897a7438e48ed.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)
   
4. 检查Nginx配置文件
   域名与磁盘的映射必须正确

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/500c32963ce74c8194fa0b89f07d5958.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)
   
5. 检查hosts文件是否正确
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/34ad5ff8a24e47af8affc6cd8887e2ec.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)

6. 检查hosts文件是否有效 如图表示hosts文件一切正常. 如果不能显示,则重启计算机.
   
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/577bcb9e582b4e8dadb895d1a1603c89.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zeq6ICA5aSq6Ziz,size_20,color_FFFFFF,t_70,g_se,x_16)