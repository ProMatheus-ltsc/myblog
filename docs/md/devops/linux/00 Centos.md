﻿# Centos
[[TOC]]

## 何为 CentOS？
CentOS（Community Enterprise Operating System，社区企业操作系统）是Linux发行版之一，它是来自于Red Hat Enterprise Linux依照开放源代码规定释出的源代码所编译而成。基于Red Hat Linux 提供的可自由使用源代码的企业级Linux发行版本。由于出自同样的源代码，因此有些要求高度稳定性的服务器以CentOS替代商业版的Red Hat Enterprise Linux使用。两者的不同，在于CentOS并不包含封闭源代码软件。主要作用是服务器的搭建。重点是：CentOS是完全免费的！

## CentOS可以提供什么要素？

1. 保守性强
2. 稳定的环境
3. 长期的升级更新支持
4. 大规模的系统也能够发挥好很好的性能

## CentOS用什么进行交互？
众所周知，大家都用过windows下的终端操作（console），而在linux下也有一个类似于这样的终端（Terminal），他们的本质上是有区别的，但是达到的效果却近乎一样，都是为了满足我们可视化的需求。

## 常见的软件安装方式
### 在线安装

#### Yum安装方式：
用YUM安装软件包命令：`yum install + 软件包`
用YUM删除软件包命令：`yum remove + 软件包`
> 小技巧：如果想安装一个软件包，但是具体不知道安装什么版本，你可以使用 `yum search +软件包名`

### 离线安装
#### *.rpm形式的二进制软件包

* 安装：`rpm -ivh *.rpm`
* 卸载：`rpm -e packgename`
* 反安装：`执行rpm -e rpm包名`
* 软件：`执行rpm -Uvh rpm包名`
* 查询软件包的详细信息：`执行rpm -qpi rpm包名`
* 查询某个文件是属于那个rpm包的：`执行rpm -qf rpm包名`
* 查该软件包会向系统里面写入哪些文件：`执行 rpm -qpl rpm包名`
#### .tar.gz/.tgz、*.bz2形式的二进制软件包
* 安装：`tar zxvf .tar.gz `或 `tar yxvf .bz2`
* 卸载：手动删除
#### *.src.rpm形式的源代码软件包
安装：
```
rpm -rebuild .src.rpm
cd /usr/src/dist/RPMS
rpm -ivh .rpm
```
卸载：`rpm -e packgename`

#### .tar.gz/.tgz、*.bz2形式的源代码软件包
安装：`tar zxvf .tar.gz` 或 `tar yxvf .bz2` 先解压

然后进入解压后的目录：
```
./configure 配置

make 编译

make install 安装
```
卸载：`make uninstall` 或 手动删除

> 小知识：一般来说著名的linux系统基本上分两大类：
1.RedHat系列：Redhat、Centos、Fedora等
2.Debian系列：Debian、Ubuntu等

* RedHat 系列
常见的安装包格式 rpm包,安装rpm包的命令是“`rpm -参数`”
包管理工具 `yum`
* Debian系列
常见的安装包格式 deb包,安装deb包的命令是“`dpkg -参数`”
包管理工具 `apt-get`
## 常见的截屏方式
捕获整个屏幕 ： `$ gnome-screenshot`
捕获当前终端Terminal ： `$ gnome-screenshot -w`
捕获自定义区域 ：`$ gnome-screenshot -a`
## 常见的命令
* pwd 命令
Print Working Directory 的缩写，判定当前目录在文件系统内的确切位置。
```
& pwd [参数]（可选）
```
* cd 命令
是 change directory 的缩写,切换当前目录至指定的目录。
```
& cd [目录名]
```


常用范例：

（1）从当前目录进入系统根目录
```
cd /
```

（2）从当前目录进入父目录
```
cd ..
```

（3）从当前目录进入当前用户主目录
```
cd ~ =cd /root
```

（4）从当前目录进入上次所在目录
```
cd -
```

* ls 命令
是 list 的缩写。ls 用来打印出当前目录的清单，可以查看文件权限(包括目录、文件夹、文件权限)查看目录信息等。
```
& ls [选项] [目录名]
```
常用参数：

-a：列出所有文件，包括以 . 开头的隐含文件
-l：列出文件的权限、所有者、文件大小等信息
-d：将目录象文件一样显示
-h：列出文件大小
-t：以文件修改时间排序


参数之间可以联合着使用

eg：
```
& ls -al
```

在命令的后面你可以指定具体要列出的目录，例如：
```
& ls -la /bin
```

这会列出在系统根目录下面的 bin 这个目录里的所有的东西。如果想查看命令详细的使用说明，可以加上 -–help 参数：
```
& ls --help
```

现在，你已经学会了一个简单的 ls 命令去列出目录里的东西。

## 常见的文件管理命令

* mkdir命令
是 make directory 的缩写，用于创建一个新的目录。

下面，我们可以在你当前所在的位置去创建一个新的目录，记得使用 pwd 命令确定一下你的位置：
```
& mkdir shiyanlou
```
上面这行命令会在当前位置上去创建一个叫 shiyanlou 的目录。使用 ls 命令，可以查看一下当前目录里面的东西。


* vi命令
用于打开并编辑文件，如果文件不存在，则创建一个文件
```
& vi [文件名]
```


此时会弹出一个编辑框，按 i （insert）进入编辑模式，输入数据后，按 ESC 退出编辑模式，按Shift + ： 键后输入 wq ，再Enter保存即可。

> 小知识：
:wq，保存文件并退出。
:wq!，强制保存并退出。
:q，直接退出不保存修改。
/，可以进行搜索，在 / 后面加上要搜索的文字，然后回车。
n，可以查找下一处。
N，可以查找上一处。
ctrl+f，向后翻页。
ctrl+b，向前翻页。 详细的使用说明，可以查看 vi 命令的帮助，vi –-help 。

* cp 命令
是 copy 的简写，用于复制目录或文件
```
& cp [选项] [选项]
```
比如你当前目录下面有一个 text.txt 文件，你想复制一份，复制以后的文件叫 hello.txt ，可以这样：
```
& cp text.txt hello.txt
```


你想把 hello.txt 复制到某个目录的下面：
```
& cp hello.txt /bin
```
这样会把 hello.txt 这个文件复制到 /bin 里面，注意，/bin 这个目录必须已经存在的。

复制目录，你需要添加一个 -R 的参数，它会递归的去复制目录以及目录里面的所有的东西。比如要把 shiyanlou 这个目录复制一份，复制以后的目录名是 shiyanlou1：
```
& cp -R shiyanlou shiyanlou1
```


* mv命令
是 move 的简写，用于移动/重命名目录或文件
```
& mv [参数] [参数]
```
mv 要移动的目录/文件 移动之后的目录/文件。

在这个后面先指一定想要移动的目录或者文件的位置，一个空格，后面再加上移动以后的目录和文件所在的位置。这里我们得先理解一下几个路径的意思：

`/ `: 表示系统的根目录。

`~ `: 表示当前所登录的用户的主目录。

`. `:一个点表示当前的目录。

`../` :两个点加一个斜线，表示上一级目录。

`../../`:表示上两级目录。知道了这些，我们就可以去移动目录或文件了。
```
mv shiyanlou1 shiyanlou2
```
上面这行命令的意思是，把当前目录里面的 shiyanlou1 这个目录重命名为 shiyanlou2。


```
mv shiyanlou2 /lib
```
这样会把 shiyanlou2 这个目录移动到 /lib 目录下面


`*`表示所有的文件或目录，比如你想把某个目录下面的所有的目录或文件移动到某个地方，可以这样：
```
& mv /shiyanlou/* /usr
```
上面命令会把 /shiyanlou 里面的东西全部都移动到 /usr 这个目录里面。


* rm 命令
是 remove 的简写，用于删除目录或文件
```
& rm [目录名或文件名]
```
注意想要删除目录的时候，你需要添加两个参数：`-r` `-f`，可以将两个参数系在一起，如`-rf`。
```
& rm -rf shiyanlou
```
这里 r 参数可以让 rm 命令递归删除目录及其内容，f 参数是 force ，表示强制删除。合起来这行命令的意思是，递归的强制删除 shiyanlou 这个目录，以及这个目录里面的所有的东西。





