# Docker安装实践
[[TOC]]

## 准备工作

第一步：准备CentOS(用课前资料中的CentOS7964)，本次以CentOS7为例进行安装。
第二步：基于vmvare打开CentOS

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c3b95e0ab7a4b3aa825d81eb1ce6a97.png)

第三步：克隆CentOS（选择链接克隆-更省空间），命名为CentOS7964-docker

![在这里插入图片描述](https://img-blog.csdnimg.cn/3698b7fa88994b7e8b8605ba9382dffa.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8ae46a7699ce48ba8a050d38ca5839a8.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad2c92ea89aa478da32907da3ef29ae9.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/89f1e4589cd649b1a7b83f42c507a6a1.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/3eacd6951dd243d8af3ab68e55cb5114.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/f400d6d624a04cbf9736769523b45ee3.png)

## 开启虚拟机系统

第一步：启动虚拟机，默认账号密码为root/root

![在这里插入图片描述](https://img-blog.csdnimg.cn/eff8760daacc47e9b7dadc7815f890f7.png)

第二步：在系统中右键，打开终端，通过ifconfig指令检查网络，

```
[root@centos7964 ~]# ifconfig
ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.227.129  netmask 255.255.255.0  broadcast 192.168.227.255
        inet6 fe80::20c:29ff:fee9:918a  prefixlen 64  scopeid 0x20<link>
        ether 00:0c:29:e9:91:8a  txqueuelen 1000  (Ethernet)
        RX packets 287398  bytes 419668874 (400.2 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 127375  bytes 8442701 (8.0 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        ....
```

第三步：通过MobaXterm工具链接虚拟机系统

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac0252df626d4be28e8be5026ad2cb6f.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc349dc1403e4ec4a2c8a27ace2c103e.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/053db9ee9b1f42799373487eff3149f5.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/0ae87832c65d48d8b0dd158eebecb9ab.png)

## 离线安装Docker系统(课上重点）

推荐使用课前资料中已经下载好的资源（docker-setup.zip）,也可以按如下步骤自己下载，然后将资源放到一个目录再安装，例如：

> 第一步：下载docker离线包

```
https://download.docker.com/linux/static/stable/x86_64/docker-20.10.6.tgz
```

说明，也可以从https://download.docker.com/linux/static/stable/网址下载指定版本

> 第二步：下载离线安装工具

```bash
https://github.com/Jrohy/docker-install/
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/7547111c6da84bab89dcb65a6e5b27ea.png)

说明，将下载好的这个工具解压。

> 第三步：将下载好的资源放在一个目录，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/80788904c91f4bc5a76a7d635278f58a.png)

> 第四步:在linux环境下，创建/root/setup/docker目录，然后拷贝下载好的资源到此目录（可通过MobaXterm工具直接上传到linux目录）,例如

![在这里插入图片描述](https://img-blog.csdnimg.cn/f0ed8607bd1e41118b875debfc896d44.png)

> 第五步：执行安装操作

```bash
# 进入/root/setup/docker 文件夹
cd /root/setup/docker

# 为 install.sh添加执行权限
chmod +x install.sh

# 安装
./install.sh -f docker-20.10.6.tgz
```

安装成功后,会出现如下信息:

```bash
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
docker 20.10.6 install success!
```

> 第六步：安装成功以后，检查安装状态

```
docker info
```

## 在线安装Docker（自己玩）

第一步：安装一组工具

```
sudo yum install -y yum-utils 
```

第二步：设置 yum 仓库地址

```
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum-config-manager \
     --add-repo \
     http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

第三步：更新 yum 缓存

```
sudo yum makecache fast #yum 是包管理器
```

第四步：安装新版 docker

```
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

## 总结(Summary)

本章节主要是讲解了Linux平台下Docker的安装过程，重点掌握在线安装，假如网络不好，可以尝试离线安装。