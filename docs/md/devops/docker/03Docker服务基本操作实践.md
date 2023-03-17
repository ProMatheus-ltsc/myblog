# Docker服务基本操作
[[TOC]]

## 查看Docker状态

查看docker是否启动了,是否是运行状态.

```bash
systemctl status docker
```

例如:

![在这里插入图片描述](https://img-blog.csdnimg.cn/829d3cdec1194ac9893f570836402a6b.png)

## 停止docker服务

```
systemctl stop docker
```

## 启动docker服务

```
 systemctl start docker
```


## 设置Docker开机自启

```
systemctl enable docker
```

## 禁用Docker开机自启

```
systemctl disable docker
```

## 重新启动Docker服务

```
 systemctl restart docker
```

## 查看Docker信息

```
docker info
```

查看docker info中具体key的信息,例如:

```bash
docker info | grep 'Docker Root Dir:'
```

## Docker镜像加速

由于国内网络问题，需要配置加速器来加速。修改配置文件 /etc/docker/daemon.json

下面命令直接生成文件 daemon.json

```
cat <<EOF > /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com"
  ],
  "max-concurrent-downloads": 10,
  "log-driver": "json-file",
  "log-level": "warn",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
    },
  "data-root": "/var/lib/docker"
}
EOF
```

说明：在执行如上指令时，保证你的登录用户为root管理员用户,并且设置好以后重启docker服务.

## 总结（Summary)

本小节重点讲解了Docker服务的启动，停止，重启、镜像加速、查看docker信息等基本操作。