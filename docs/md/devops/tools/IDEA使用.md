# IDEA
[[TOC]]

## 说明

本教程按照 [git在线练习](https://learngitbranching.js.org/?locale=zh_CN) 顺序进行，将在线测试的命令操作落地到 IDEA，使用开发工具来实现所有在线练习中的操作。

你可以结合 [git在线练习](https://learngitbranching.js.org/?locale=zh_CN) 来学习本教程，先在线学习git命令，再在 IDEA 中实现相同操作。





## 新建测试工程





### 新建 Empty Project：git-test1

![a](https://img-blog.csdnimg.cn/20200929210614105.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![a](https://img-blog.csdnimg.cn/20200929210702428.png#pic_center)





### 新建 Java Module：demo1

![a](https://img-blog.csdnimg.cn/20200929211804629.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![a](https://img-blog.csdnimg.cn/20200929211834487.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 新建一个类

```java
package test;

public class Test1 {
    public static void main(String[] args) {
        System.out.println(1);
    }
}
```





## 创建本地仓库





### 将工程目录 git-test1 设置为本地仓库目录

![a](https://img-blog.csdnimg.cn/20200929212214290.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![a](https://img-blog.csdnimg.cn/20200929212315512.png#pic_center)





### 初始提交

![a](https://img-blog.csdnimg.cn/20200929212416581.png#pic_center)

![a](https://img-blog.csdnimg.cn/20200929212611371.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



在 git 工具窗口中查看提交历史

![a](https://img-blog.csdnimg.cn/20200929212852228.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## 提交操作



### 第二次提交




添加一句打印

```java
package test;

public class Test1 {
    public static void main(String[] args) {
        System.out.println(1);
        System.out.println(2);
    }
}

```




按 ctrl+k 执行提交操作
![a](https://img-blog.csdnimg.cn/20200929213300822.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




查看提交历史，可以看到有两次提交

![a](https://img-blog.csdnimg.cn/20200929213416790.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20200929213521879.png#pic_center)





### 第三次和第四次提交

执行以下两步操作：

- 添加打印3的语句并提交
- 添加打印4的语句并提交

![a](https://img-blog.csdnimg.cn/20200929214452743.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20200929214612367.png#pic_center)





## 重置到第二次提交




为了继续做下一步练习，先对提交历史进行重置操作

![a](https://img-blog.csdnimg.cn/20200929221314925.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![a](https://img-blog.csdnimg.cn/20200929221429564.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




重置后，只有前两次提交

![a](https://img-blog.csdnimg.cn/20200929221516412.png#pic_center)





## 分支合并 - merge





### 准备提交结构




新建一个 bugFix 分支
![a](https://img-blog.csdnimg.cn/20200929221732426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




如果勾选 `Checkout branch` 选项，新建分支后会自动切换到新分支

![a](https://img-blog.csdnimg.cn/2020092922182328.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




现在，master分支、bugFix分支和HEAD，都合并在最后一次提交位置

![a](https://img-blog.csdnimg.cn/20200929222532367.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




对bugFix分支做一次提交

上一步已经切换到了 bugFix 分支，现在在这个分支上添加一句打印并提交。提交后 bugFix 分支前进了，而 master 分支仍停留在上一步
![a](https://img-blog.csdnimg.cn/20200929223111579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20200929223723264.png#pic_center)




切换到 master 分支

在 IDEA 窗口右下角，点击bugFix分支，在菜单中切换到 master 分支
![a](https://img-blog.csdnimg.cn/20200929223602701.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




现在切换到了 master，HEAD 表示当前所在的提交位置
![a](https://img-blog.csdnimg.cn/20200929224004278.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图
*星号表示 HEAD*

![a](https://img-blog.csdnimg.cn/20200929223755327.png#pic_center)




对 master 分支做一次提交

在**前面**添加一句打印0并提交，现在，master 也前进了一步

![a](https://img-blog.csdnimg.cn/20200929225929165.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20200929224220154.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 合并分支 - 将bufFix分支合并到master




我们现在在 master 分支，点击右下角 master 分支，在菜单中找到 bugFix 分支向 master 进行合并

![a](https://img-blog.csdnimg.cn/2020092922504427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




现在，bugFix 的代码合并到了 master，并在 master 分支上生成了一个新的提交
![a](https://img-blog.csdnimg.cn/20200929230152296.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20200929230314273.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 试试再将master分支向bugFix分支合并会发生什么

> 切换到bugFix分支

![a](https://img-blog.csdnimg.cn/20200929230558980.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

>
> 
> 选择 master 向 bugFix 分支进行合并

![a](https://img-blog.csdnimg.cn/20200929230730625.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

>
> 
> 只是简单地把bugFix移动到了master

![a](https://img-blog.csdnimg.cn/20200929230837443.png#pic_center)

>
> 
> 上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/2020092923093219.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## 重置到第二次提交




切换到master分支

![a](https://img-blog.csdnimg.cn/2020093023065776.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




重置到第二次提交

![a](https://img-blog.csdnimg.cn/20200930230348830.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![a](https://img-blog.csdnimg.cn/20200930230424329.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




删除bugFix分支

![a](https://img-blog.csdnimg.cn/20200930230911121.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




重置后，只有前两次提交

![a](https://img-blog.csdnimg.cn/20200930230958505.png#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20200930231035977.png#pic_center)





## 使用 rebase合并分支





### 准备提交结构




创建bugFix分支，然后对它提交一次

![a](https://img-blog.csdnimg.cn/2020093023134430.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

![a](https://img-blog.csdnimg.cn/20200930231435948.png#pic_center)




在 bugFix 分支，添加打印3并做一次提交。bugFix 前进了一步

![a](https://img-blog.csdnimg.cn/20200930231617103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




切换到 master 然后对master执行一次提交

![a](https://img-blog.csdnimg.cn/20200930231836898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




在**上面**添加打印0并提交一次，master 前进了一步

![a](https://img-blog.csdnimg.cn/20200930231958300.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20200930232123954.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 将 bugFix 移动到 master 分支

用 rebase 操作，可以将 bugFix 的提交移动到 master 分支，形成一条连续的提交记录。




切换到bugFix分支

![a](https://img-blog.csdnimg.cn/20200930232322941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




在 bugFix 分支下，右键点击 master 分支，在菜单中选择 rebase 操作

![a](https://img-blog.csdnimg.cn/20201009232310966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




rebase 后，bufFix 移动到 master 分支上，形成一条连续提交记录，且代码进行了合并

![a](https://img-blog.csdnimg.cn/20200930232650205.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/2020093023274215.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

## HEAD分离状态





### 准备提交结构




切换到 master 并将 master 重置到第二次提交

![a](https://img-blog.csdnimg.cn/20201001000201586.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




删除 bugFix

![a](https://img-blog.csdnimg.cn/20201001000238792.png#pic_center)




新建 bugFix 分支

![a](https://img-blog.csdnimg.cn/20201001000507486.png#pic_center)




切换到 master 并做一次提交

![a](https://img-blog.csdnimg.cn/20201001000614746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



切换到bugFix，并做一次提交

![a](https://img-blog.csdnimg.cn/20201001000737340.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



对 bugFix 再做一次提交

![a](https://img-blog.csdnimg.cn/20201001000945707.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201001001015599.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### HEAD分离状态




用哈希值切换到最后一次提交

![a](https://img-blog.csdnimg.cn/20201001001355453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




这时，HEAD 和 bufFix 是分离的状态

![a](https://img-blog.csdnimg.cn/20201001001708212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201010230413422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## 操作符 ^




切换到 master

![a](https://img-blog.csdnimg.cn/2020100117382870.png#pic_center)




现在，HEAD 在 master 位置

![a](https://img-blog.csdnimg.cn/20201001173911679.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201001173932857.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




使用操作符 “^” 切换到 c3

```shell
git checkout bugFix^

# 在 dos 命令中，^是特殊符号，需要加双引号，所以要写成：
git checkout "bugFix^"
1234
```

在 Terminal 终端中运行命令

![a](https://img-blog.csdnimg.cn/20201001193322171.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




现在，HEAD 在 bugFix 的上一个提交位置

![a](https://img-blog.csdnimg.cn/20201001193500585.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201001193600242.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## 操作符 ~ 和强制移动分支位置





### 准备提交结构




切换到 master

![a](https://img-blog.csdnimg.cn/20201001213452953.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



提交一次

![a](https://img-blog.csdnimg.cn/20201001213627481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



再切换到 bugFix 提交一次

![a](https://img-blog.csdnimg.cn/20201001213835600.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




HEAD移动到 master 的上一个提交

```shell
git checkout "master^"
```

![a](https://img-blog.csdnimg.cn/20201001214152680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




bugFix 强制移动到 bugFix^
通过 -f 参数可以强制移动分支的位置

```shell
git branch -f bugFix "bugFix^"
1
```

![a](https://img-blog.csdnimg.cn/20201001221041292.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




bugFix 分支上现在有一个隐藏的提交：“添加打印-2”，看一下它的哈希值

```shell
git reflog
1
```

![a](https://img-blog.csdnimg.cn/20201001221554507.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/2020100122112019.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 操作符 ~ 和强制移动分支位置




master 强制移动到隐藏提交上（上一步看到的哈希值）

```shell
git branch -f master b6c4
1
```

![a](https://img-blog.csdnimg.cn/20201001225735722.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




bugFix 强制移动到初始提交

```shell
git branch -f bugFix bugFix~3
1
```

![a](https://img-blog.csdnimg.cn/20201001230106679.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




切换到第二次提交

```shell
git checkout "HEAD^"
```

![a](https://img-blog.csdnimg.cn/20201001230243601.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201001230520714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## reset和 revert





### 准备提交结构




master 重置到第二次提交，删除 bugFix 分支

![a](https://img-blog.csdnimg.cn/20201001234013374.png#pic_center)




新建 pushed 分支，并提交一次

![a](https://img-blog.csdnimg.cn/20201001234317813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




重新切换到master，再新建 local 分支并执行一次提交

![a](https://img-blog.csdnimg.cn/20201002004150981.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201002004323335.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 用 reset 撤销提交




重置 local 分支到上一个提交

```shell
git reset local^

# dos中要加双引号
git reset "local^"
```

local 的提交被撤销了

![a](https://img-blog.csdnimg.cn/2020100200583185.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 用 revert 撤销提交




先切换到 pushed 分支，然后用 revert 撤销pushed分支的变更

![a](https://img-blog.csdnimg.cn/20201002010601726.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



revert 会在当前分支上前进一步，生成的新的提交

![a](https://img-blog.csdnimg.cn/20201002010623388.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




新生成的提交与“添加打印2”的提交相同，相当于把“添加打印3”撤销了

![a](https://img-blog.csdnimg.cn/20201002010634784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201002010925897.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

## cherry-pick





### 准备提交结构





- 切换到 master，并重置到第二次提交
- 删除 pushed 和 local 分支

![a](https://img-blog.csdnimg.cn/20201008211256633.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




新建 bugFix、side 和 another 分支

![a](https://img-blog.csdnimg.cn/20201008211512672.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





- 对bugFix、side和another分支，分别做两次提交
- 切换到 master

![a](https://img-blog.csdnimg.cn/20201008212032769.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201008212116578.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### cherry-pick bufFix 2、side 1和another 2三个提交到 master 分支




选中这三个提交

![a](https://img-blog.csdnimg.cn/20201008213528632.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




右键选择 cherry-pick

![a](https://img-blog.csdnimg.cn/20201008213657700.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




如果出现代码合并提示，选择 merge，将 bufFix 2 提交的代码合并到 master 的代码

![a](https://img-blog.csdnimg.cn/20201008213928334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




按照正确代码逻辑，向中间合并代码

![a](https://img-blog.csdnimg.cn/20201008214405637.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




完成后，生成了一个新的提交

![a](https://img-blog.csdnimg.cn/20201008214557701.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




接下来，按照相同的操作，完成 side 1 和 another 2 的代码合并操作，同样也会生成两个新的提交

![a](https://img-blog.csdnimg.cn/20201008215100843.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201010235247858.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## 交互式 rebase





### 准备提交结构





- 重置master到第二次提交
- 删除 bugFix、side 和 another 分支
  
  ![a](https://img-blog.csdnimg.cn/20201008220606443.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





- 做四次提交

![a](https://img-blog.csdnimg.cn/20201008221008241.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/20201010235553645.png#pic_center)





### 用交互式 rebase 操作自由调整提交




在 master 分支，右键点击 “添加打印3”，选择交互式 rebase

![a](https://img-blog.csdnimg.cn/20201008221537512.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




在交互界面中，丢弃“添加打印3”

![a](https://img-blog.csdnimg.cn/2020100822532049.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




向上移动一步 “添加打印6”

![a](https://img-blog.csdnimg.cn/20201008225409258.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




查看将要执行的命令

![a](https://img-blog.csdnimg.cn/20201008225508804.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




在这里看到，会按以下顺序执行：

1. 丢弃“添加打印3”
2. 选取“添加打印4”
3. 选取“添加打印6”
4. 选取“添加打印5”

![a](https://img-blog.csdnimg.cn/20201008225521470.png#pic_center)




点击开始执行 rebase 操作

![a](https://img-blog.csdnimg.cn/20201008225434651.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




过程中可能会出现3次合并代码的操作提示，可以按照三步的顺序，合并三句打印代码

![a](https://img-blog.csdnimg.cn/2020100822581276.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




上面的提交历史对照 [learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 的结构图

![a](https://img-blog.csdnimg.cn/2020100823004452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 用交互 rebase 将 4,6,5 压缩成一个分支

*[learngitbranching.js.org](https://learngitbranching.js.org/?locale=zh_CN) 中略过了压缩分支的操作*




右键点击“添加打印4”的提交，执行交互式 rebase

![a](https://img-blog.csdnimg.cn/20201008230659371.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




将 5 和 6 设置为 Fixup

![a](https://img-blog.csdnimg.cn/20201008230706104.png#pic_center)



设置完的状态如下

![a](https://img-blog.csdnimg.cn/20201008230712332.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)




rebase 完成后，三次提交被压缩为一次提交

![a](https://img-blog.csdnimg.cn/2020100823071838.png#pic_center)

## 创建Springboot项目

使用`Springboot Initializr`创建Springboot项目

1. 新建`Project`或`Module`
2. 选择`Spring Initializr`
3. 选择使用`start.spring.io`

![springboot](https://img-blog.csdnimg.cn/20200524221022827.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

> `start.spring.io`有时访问缓慢，或甚至无法访问，可以选择使用国内的镜像服务器：
>
> - `spring.wht6.cn`
> - `start.aliyun.com`（支持Spring Cloud Alibaba）





## 与 STS 的 `Boot Dashboard` 类似的Spring boot 项目控制台

STS 的 `Boot Dashboard`工具可以方便地控制Spring boot 项目的启停，IDEA提供了类似的工具：`Services` 工具窗口。

**执行下面操作开启Spring boot控制台：**

1. 打开 View | Tool Windows | `Services` 工具窗口

![dashboard](https://img-blog.csdnimg.cn/20200526225821333.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)


2. 找到 `Services` 工具窗口
3. 点击添加按钮
4. 选择`Run Configuration Type`

![dashboard](https://img-blog.csdnimg.cn/20200526230027282.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)


5. 选择添加`Spring Boot`

![dashboard](https://img-blog.csdnimg.cn/20200526230031866.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)


**这里列出所有 Spring boot 项目的启动类，可以方便的控制项目启停。**

![dashboard](https://img-blog.csdnimg.cn/20200526230038315.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## Springboot 插件 - `EditStarters`

STS开发工具中提供的 `Edit Starters` 功能非常好用，可以方便的设置 Springboot 和 Spring Cloud 的依赖。IDEA中可以使用 `EditStarters` 插件来添加此功能。

- **安装`EditStarters`插件**

1. 在设置中选择`Plugins`
2. 选择插件市场来安装插件
3. 搜索`EditStarters`
4. 点击`Install`安装，安装后重启IDEA

![editstarters](https://img-blog.csdnimg.cn/20200524222518407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



- **使用`EditStarters`添加Springboot依赖**

1. 在pom.xml中，按快捷键`Alt+Insert`
2. 选择`Edit Starters`

![editstarters](https://img-blog.csdnimg.cn/20200524231901441.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

3. 填写`Spring Initializr`路径，
   可以使用官方的`start.spring.io`，或者也可以填写国内镜像地址。

![editstarters](https://img-blog.csdnimg.cn/20200524232137477.png#pic_center)

4. 选择要添加的依赖

![editstarters](https://img-blog.csdnimg.cn/20200524232658206.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

## IDEA 工程结构

IDEA与[Eclipse](https://so.csdn.net/so/search?q=Eclipse&spm=1001.2101.3001.7020)工程的组织结构不同。

Eclipse是在一个**工作空间**目录中存放多个工程，而IDEA没有工作空间的概念，你可以在任意文件夹中创建工程。

一个IDEA的工程，既可以是一个单独的工程，也可以把它当做Eclipse的工作空间，在其中存放其他“工程”，即Module(模块)，对应关系如下：

![工程结构](https://img-blog.csdnimg.cn/20200523224200649.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

| Eclipse            | IDEA                     |
| ------------------ | ------------------------ |
| Workspace 工作空间 | Project 工程             |
| Project 工程       | Project 工程 Module 模块 |





## 实例演示





### 第一步 - 新建工程

选择菜单： **File - New - Project**

![new project](https://img-blog.csdnimg.cn/20200523233811251.png#pic_center)

为项目命名，并选择存放路径（**任意设置**）

![new project](https://img-blog.csdnimg.cn/20200523234016140.png#pic_center)

作为独立的项目，可以在**src**目录中添加类

![hello](https://img-blog.csdnimg.cn/20200523234509317.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)



### 第二步 - 新建模块

你也可以把一个工程看作是Eclipse的工作空间，在其中可以创建其他“工程”，IDEA把包含在工程中的“工程”称作是**模块（Module）**。

新建模块

![模块](https://img-blog.csdnimg.cn/20200523234932853.png#pic_center)

为模块命名（**任意**），存放位置是在 project1 的工程目录下

![模块](https://img-blog.csdnimg.cn/202005232350386.png#pic_center)

模块（Module）相当于Eclipse的Project，可以在它的src中添加类

![module](https://img-blog.csdnimg.cn/20200524000536885.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

### Debug 断点调试工具

我们将从以下几个角度来分析这个问题：

1.什么是断点？

你可以把断点理解成想让程序停止的然后来查看的位置也就是我们人为指定的需要程序执行时停止的地方

2.怎么添加断点？

可以在目标代码行号前双击

![](https://img-blog.csdnimg.cn/73bcac414eb94b268312907172fc8f58.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

注意：我们要在一些有意义，合适的地方加断点，比如把断点加在大括号上就不太合适

3.如何启动断点调试？

可以选择导航栏的”小飞虫“以Debug的方式启动

![](https://img-blog.csdnimg.cn/e2da282dd57c4d97841f205293abf9c1.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)


![](https://img-blog.csdnimg.cn/e2da282dd57c4d97841f205293abf9c1.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

也可以在代码前面的的运行前选择以Debug的方式运行

![](https://img-blog.csdnimg.cn/54ab22f724ad4ffeb4961e485656054b.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

4.看哪里？
我们可以按F8让程序继续执行下一步
**Debugger中变量变化的窗口Variables--可以查看变量值的变化情况**

![](https://img-blog.csdnimg.cn/b303736c05244db08d04f2412431ce93.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/b303736c05244db08d04f2412431ce93.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

Console控制台中可以查看程序输出的情况

![](https://img-blog.csdnimg.cn/df293ad02e134ceebbef45aa219e87bc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/df293ad02e134ceebbef45aa219e87bc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

5.怎么结束？

1. 一直按步运行程序，直到结束

2. 提前结束：选择左侧栏Debugger侧面的方块按钮结束程序

![](https://img-blog.csdnimg.cn/f9ef25081ddd413da14943db521bbfeb.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

3. 取消断点：鼠标左键点击想取消的断点即可取消

![](https://img-blog.csdnimg.cn/7251ce71bf7246c381c89273e6b30a83.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

那如果有多个断点怎么办呢？可以打开断点窗口：

![](https://img-blog.csdnimg.cn/27fe9cc2bbbd404fa197c376690808f7.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)


勾选想要删除的所有断点，点击减号，再点Done按钮就可以，这样多个断点就可以一次被删除啦~

![](https://img-blog.csdnimg.cn/ce5f076093d24f649c840cf276754500.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/27e2d9d416b546fab69c469e83fde98f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg4NDIzNA==,size_16,color_FFFFFF,t_70)

## IDEA-配置可视化数据库视图

每个项目都是一个独立的数据库配置
任意的maven项目即可, 点击database,让右侧出现database数据源

### 让右侧出现数据源

![在这里插入图片描述](https://img-blog.csdnimg.cn/42762442458946b69a8d2d1f2dad762a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_17,color_FFFFFF,t_70,g_se,x_16)

选择mariadb,mysql都可以

![在这里插入图片描述](https://img-blog.csdnimg.cn/8bf20852a633431d86d81531fd285315.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_11,color_FFFFFF,t_70,g_se,x_16)

### 添加mysql的jar包

在drivers中添加数据源让上方的class不爆红

![在这里插入图片描述](https://img-blog.csdnimg.cn/b733463d658e495298f4936b690944b7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

设置时区 为serverTimezone Asia/Shanghai

![在这里插入图片描述](https://img-blog.csdnimg.cn/586c82851ce14ed5a9743b6d31e38b81.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/e31b5d2a1e8c4c1e9ea9f95d50b4421b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

也可以在 idea终端查看数据库

![在这里插入图片描述](https://img-blog.csdnimg.cn/a23e8ab2c88843a997ed0399950bd83a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

必须点击db提交,数据库才会生效 可视化视图的crud操作

![在这里插入图片描述](https://img-blog.csdnimg.cn/da5653f3de084d16bc19a339a1ac4693.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

新建查询console ,sql语句自动提示

![在这里插入图片描述](https://img-blog.csdnimg.cn/7250fd37e5f84351a445cb43d3bef724.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

output为执行结果信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/848d6abd564f41dc9da0edc4667cedfe.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

### 可以自动提示表关联查询

可以帮我们预判了数据库表与表之间的关联关系

点击QL,可以创建多个console面板

![在这里插入图片描述](https://img-blog.csdnimg.cn/9fc9eb6442fa43e08aacc57e4d49db28.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

右键重命名sql文件,可以自动保存查看之前保存的sql文件记录

![在这里插入图片描述](https://img-blog.csdnimg.cn/afec1f66182e4b94bfee0511a3c4e243.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzMwMzAyNjc4MQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

## Idea之常用插件

### 🚀效率提升

#### Jrebel🌟🌟🌟🌟🌟

热部署插件，修改代码编译就生效，节省大量重启服务时间。热部署支持修改方法代码，方法定义，类定义，接口定义（包括swagger文档），修改资源文件，修改mapper.xml（需配合JRebel MybatisPlus插件一起使用），注意Jrebel不支持spring配置文件热加载（今后可配合Nacos实现）。

##### Jrebel使用说明

Jrebel 是一款提高开发效率的利器，能够实时加载变更的代码，避免频繁重启项目，它和自带热更新功能的区别：

- 自带的热更新仅支持方法内容修改，不支持新增类、新增方法、修改方法签名、新增类成员变量、修改类成员变量签名，功能非常局限
- Jrebel 除了支持以上功能，还支持自动将修改后的类注入spring 容器、修改Mapper.xml后自动刷新mybatis、监听Jar包的变化等非常强大的功能

安装激活

1、先准备一个 UUID，激活时需要，使用idea自带的 Groovy 控制台快速生成一个 UUID


2、插件市场里查找JRebel and XRebel和JRebel MybatisPlus两个插件，安装完成后，重启idea


3、重启后JRebel会自动弹出激活窗口要求激活，点击"Active"按钮激活，弹出激活面板（如果未自动弹出窗口，也可以在 idea 菜单中点击Help-JRebel-Activation手动打开）

4、选择第一种激活方式“Team URL”，URL填入https://jrebel.qekang.com/ +开始准备好的GUID（UUID），邮箱地址任意填，然后勾选最下方的“I agree with....”，点击确认注册，提示激活成功。


##### 使用

在左下角的窗口边栏中找到JRebel，点击进入Jrebel设置面板，将每个有启动类的模块开启 Jrebel。只有开启了开关的模块才能激活热部署。


启动项目时不再用原来的Run和Debug，改用JRebel的按钮启动，在原来的启动图标旁边，火箭带三角形的代表热部署的运行，火箭带虫子的代表热部署的debug


修改代码后，任何编译（编译项目、编译模块、重编译当前类）都会自动刷新class，无需重启项目



上图三种编译的区别：

- Build Project - 编译整个工程，增量编译，如果想强制重新编译选择最下方的 Rebuild Project
- Build Module - 编译模块，编译模块时只会编译本模块以及模块依赖的其他模块，增量编译
- Recompile ‘xx.java’ - 重编译当前类文件，只对当前窗口所在类进行重新编译

开发过程中最常用的应该是Build Module编译当前模块，建议改快捷键为`ctrl+s`（原来的保存快捷键并没有什么用，idea 是自动保存的），这样改完代码后 `ctrl+s`一下就能触发编译，同时 jrebel 会自动热更新变动的代码（就像曾经的 Eclipse 自动编译的体验）

#### MybatisX ⭐⭐⭐⭐⭐

mybatis开发插件，支持自动生成xml文件，自动生成sql标签；支持xml和接口方法互相跳转，重构；xml语法提示；



#### Batslog 🌟🌟🌟🌟🌟

mybatis sql日志格式化插件，提供一个面板，左上角点击启动后，开始搜集控制台的mybatis日志，并格式化成可执行的sql，方便直接复制到db工具中执行。


#### GenerateAllSetter🌟🌟🌟🌟🌟

可以一键生成对象的所有set方法，还可以在方法中一键生成两个bean的转换逻辑（自动根据相同字段名进行赋值，不同类型也可以智能转换，编译报错的代码代表无法识别，再手动解决一下即可），适合bean拷贝的场景


#### Swagger Tools🌟🌟🌟🌟🌟

一键生成Swagger，自动判断Controller或者Bean生成注解，并将注释填入注解中。

使用`alt+insert`点击SwaggerAnnotation生成。默认生成类中所有方法的swagger，也可以通过选中字段名、方法名生成指定swagger注解。



该插件有点瑕疵，生成类中所有方法swagger时，类中非接口方法也会生成，需要注意一下

#### RestfulTool 🌟🌟🌟🌟🌟

服务开发工具，`ctrl+alt+/`根据api路径寻找接口方法；



提供了一个工具面板，可以浏览所有模块的接口并提供简单的接口测试工具，可以用来测试



### 🐞减少Bug

#### Alibaba java coding guide⭐⭐⭐⭐⭐

阿里编码规约插件，帮助养成良好的编码习惯，减少bug。

通过Tools->阿里编码规约->编码规约扫描，进行代码扫描，执行完成后，会按照Blocker、Critical、Major（极严重、严重、警告）三个等级来显示不规范的地方，遇到黄色的警告记得去修改。

#### SonarLint⭐⭐⭐⭐

SonarQube是管理代码质量一个开源平台，可以快速的定位代码中潜在的或者明显的错误

### 🛠️实用工具

#### Translation🌟🌟🌟🌟🌟

翻译插件，可以方便的翻译源码注释，翻译代码，以及提供一个翻译面板进行自由翻译，可以告别网页的百度翻译了



#### String manipulation⭐⭐⭐⭐

字符串转换工具，idea自带的快捷键`Ctrl+Shift+U`只能转换大小写，这款插件可以转换 驼峰-下划线-全小写-全大写等等n多种格式，可以根据需求配置转换规则。

#### GsonFormatPlus⭐⭐⭐⭐

json工具，可以通过json生成javaBean，在和前端定下接口之后，可以很方便的生成bean文件。简单使用直接复制json后在bean中按`alt+回车`选择生成代码。如果json中含有注释，可使用`alt+s`解析带注释的json文本，生成带java注释的属性

#### maven helper ⭐⭐⭐⭐

maven工具，依赖冲突检查，依赖关系查看

打开pom文件点击左下角的Dependency Analyzer即可展示



#### key promoter x⭐⭐⭐⭐

当你在IDEA里面使用鼠标的时候，如果这个鼠标操作是能够用快捷键替代的，那么它会弹出一个提示框，告知你这个鼠标操作可以用什么快捷键替代，还会统计点击鼠标频次最高的操作，idea新手非常适合



### 📖代码阅读

#### Rainbow brackets ⭐⭐⭐⭐

彩虹括号，用不同的颜色显示成对的括号，方便阅读代码


同类型插件还有HighlightBracketPair，比彩虹括号更低调一些，只会在鼠标光标最近的一对括号加色块重点显示，可根据喜好选择

#### grep console⭐⭐⭐⭐

日志增强工具，支持美化高亮，日志过滤，异常信息一目了然



#### code glance⭐⭐⭐⭐

将滚动栏显示成代码缩略图，在阅读内容很长的类时方便快速定位
