# Scala学习宝典
[[TOC]]

# 前言

## 为什么要学习Scala

分布式高并发语言Go、R、Erlang等等为何选择Scala？
Spark是大数据处理的核心方式，用scala语言编写！
Kafka分布式发布订阅消息系统，由LinkedIn捐给Apache，以极高的吞吐量著称，是目前最火爆的MQ，用scala语言编写！
Flink最新一代分布式海量数据计算框架，Alibaba收购并开源，自己开发Blink分支，Scala语言编写！

## 学前寄语

在我个人看来，Scala是一门非常优雅的语言，但优雅的背后要付出的辛苦也很多，比如学习Scala的人都会说，Scala语法非常简洁，但这也意味着抽象级别比较高，对初学者而言不好理解。也会有人说，Scala语法非常灵活，一个功能可以有非常多的实现方法，可以说条条大路通罗马，那么代价就是对于初学者来说，路多了反而不好选择。
所以在这里我对初学者的忠告是：在学习Scala前期，先走通一条路，屏蔽掉多余的干扰项，可能我们第一次使用Scala实现的项目看起来是非常笨拙的，但是没关系，任何的学习都是循序渐进的，不要追求一蹴而就。走通之后再回头，去寻找更好的替代方案。这样才能享受学习。

# Scala简介

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201014132327218.png#pic_center)

Scala combines object-oriented and functional programming in one concise, high-level language. Scala’s static types help avoid bugs in complex applications, and its JVM and JavaScript runtimes let you build high-performance systems with easy access to huge ecosystems of libraries.
**Scala是一个将面向对象和函数式编程结合在一起的简洁的高级语言。Scala的静态类型有助于避免复杂应用程序中的错误，其可以运行在JVM和JavaScript的特点使您可以轻松访问庞大的生态系统库来构建高性能系统。**

## Scala的诞生

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201015104131762.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

Martin OrderSky马丁 奥德斯基 是JVM开发团队核心成员,是JDK1.5泛型,增强for循环,自动类型转换,JDK1.8Lambda等重要特性的作者.
在对JAVA的维护过程中,马丁非常推崇JAVA的面向对象及垃圾回收,是James Gosling的小迷弟. 但作为编辑器开发的狂热爱好者的他,又觉得JAVA的语法过于繁琐.所以相继自己开发了另外两种语言Pizza和Scala.其中Scala被用于实验室科研后推广开源.在上边提到JDK1.5和1.8的两个版本中的新特性就是从Pizza和Scala中迁移而来.
Scala诞生于2001年,但真正被人们所熟知并广泛应用于大数据开发是在十多年之后.可以说是Spark和Kafka带火了Scala.
James Gosling曾在采访中说，如果让他选择“今天使用的语言不是Java，那就是Scala”。

## 函数式编程

C：面向过程编程
Java：面向对象编程
Scala：面向函数编程
函数式编程：将所有复杂的问题的解决拆分为若干函数的处理，每一个函数可以去实现一部分功能，利用很多次函数的处理最终解决问题。函数式编程相对于面向对象编程更加的抽象，好处是代码可以非常的简洁，更多的采用常量而不是变量来解决问题，这样额外带来的好处是在线程并发时可以减少甚至杜绝多线程并发安全问题，特别适合于应用在处理高并发场景、分布式场景下的问题。函数式编程可以使用高阶函数，函数在scala中是一等公民，可以更加灵活的进行程序的编写。
函数式编程并不是面向对象编程的发展，而是另外一种解决问题的思路，两者之间也并没有绝对的好坏之分，在不同的场景中各有各的优缺点。
总结:Scala是一个面向对象的函数式编程语言.

## Scala和java的关系

java是由C语言开发，scala基于java，现在看来大部分情况下，青出于蓝而胜于蓝！
分布式开发中会面对很多棘手的问题，如面临服务器之间的通信、远程调用、序列化、反序列化等等。但有了scala这一切变得轻松，它全部都做了内部实现。让我们访问分布式集群环境就和访问单机一样简单。
同时Scala无缝集成Java，Scala编译器会先把源文件编译成.class文件再运行。Scala可以调用几乎所有的Java类库，也可以从Java应用程序中调用Scala的代码。它也可以访问现存的数之不尽的Java类库，这让用户（潜在地）迁移到Scala更加容易。
Java => 编译 => .class => JVM
Scala => 编译 => .class => JVM
Scala => JVM(支持,但不推荐,不是解释执行)
扩展：groovy、clojure（storm）都可以编译成.class，利用JVM。

## Scala的特点

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201014135229513.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

# Scala环境搭建

## SDK下载安装及测试

**提示:Scala基于Java,需要提前安装JDK并配置环境变量**
官网:https://www.scala-lang.org/

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020101511185477.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

**说明**: 编写本篇教程时,Scala的最新版本为2.13.3,但是基于后续Spark\Kafka\Flink三个主流框架的版本及对Scala的版本要求.我们最终选择Scala-2.12.7这个版本作为基础环境. 2.11版本之后差别并不大,所以该文所有代码预计在2.11\2.12\2.13版本环境中都可以正常运行.
1.访问Scala官网,找到所需安装包进行下载.https://www.scala-lang.org/download/all.html
在这里,我们选择的是2.12.7这个版本进行下载.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201015112506368.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

2.进入2.12.7版本下载页后,在尾部找到对应系统安装包进行下载.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201015112617254.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

3.安装Scala,双击msi包,一路下一步即可.注意中间在安装目录选择时,路径不要有中文或空格.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020122744135.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020102012280850.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

选择合适的目录

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020122848339.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020122901686.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020122942804.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

4.检查环境

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020123017618.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201020123124459.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

5.Hello World

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201103092512110.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

## IDEA插件安装

在IDEA的File菜单中打开Settings窗口

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201103093354277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

选择Plugins在Marketplace中搜索Scala,找到Scala插件后点击Install.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201103093607543.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

等待插件下载完成,点击重启IEDA

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201103094046223.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

如果网络环境不佳无法自动下载插件.此时需要手动导入,具体导入方法可以参考我的另一篇文章: https://blog.csdn.net/dcc15011003101/article/details/107805938

# 第一个Scala工程

创建一个新的工程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109202948247.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109203022155.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109203110657.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

创建一个Object（至于什么是Object之后会详细解释）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109203234213.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

命名为: cn.tedu.scalabasic.HelloWorld
选择Object选项

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109203351677.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

编写代码

```scala
package cn.tedu.scalabasic

/**
 * 这是我们的第一个Scala程序!
 */
object HelloWorld {
  def main(args: Array[String]): Unit = {
    print("Hello World!!!")
  }
}
```

右键运行

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109203549320.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109203615459.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

主方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201113101737106.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

# Scala基础语法

## 注释

Scala中注释的写法与Java一致

```scala
package cn.tedu.scalabasic
/**
 * Scala基础语法
 */
object ScalaGrammar {
  def main(args: Array[String]): Unit = {
    /*
    1.注释
    Scala中的注释形式与Java中一致.包括文档注释,多行注释,单行注释
     */
    /**
     * 这是一个文档注释
     */
    /*
    这是一个多行注释
     */
    //这是一个单行注释
  }
}


```

## 代码分隔

在Scala代码中每行代码的结尾不需要分号";"作为结束符(自动推断),也可以加分号.

```scala
package cn.tedu.scalabasic
/**
 * Scala基础语法
 */
object ScalaGrammar {
  def main(args: Array[String]): Unit = {
    /*
    2.代码分隔符
    在Scala中,代码行与行之间的分隔符与Java相同,使用分号;,但是一般不需要写,Scala实现了自动推断.
     */
    println("再见,刘沛霞");
    println("你好,张慎政")
    println("么么哒,董长春")
  }
}


```

## 变量和常量定义

在Scala中变量和常量分别使用var和val来定义.可以声明类型但不必要(类型自动推断).
其中,官方建议尽量不要使用var而是使用val来定义,有利于内存回收.和线程的安全.

```scala
package cn.tedu.scalabasic
/**
 * Scala基础语法
 */
object ScalaGrammar {
  def main(args: Array[String]): Unit = {
    /*
    3.常量变量
    在Scala中,变量使用var来定义,常量使用val定义
    并且在定义变量和常量时一般都不写类型.Scala按照上下文可以自动推断
    **重要**:在Scala中我们更推荐大家尽可能的使用常量来定义属性,这更利于内存回收.
     */
    var a = 12
    val b = 10
    val c: Int = 11
    a += 1
    //    b += 2  //编译报错,常量不可变
    println(a)
    println(b)
  }
}


```

## 标识符

Scala 可以使用两种形式的标志符，字符数字和符号。
字符数字使用字母或是下划线开头，后面可以接字母或是数字，符号"$“在 Scala 中也看作为字母。然而以”$“开头的标识符为保留的 Scala 编译器产生的标志符使用，应用程序应该避免使用”$"开始的标识符，以免造成冲突。
同时,Scala与Java相同的是同样建议使用驼峰规则命名.

```scala
package cn.tedu.scalabasic
/**
 * Scala基础语法
 */
object ScalaGrammar {
  def main(args: Array[String]): Unit = {
    /*
    4.标识符
    Scala标识符规则与Java大致相同.不能以符号和数字开头(_和$可以).
    其中以$例外一般不作为标识符的开头使用,暂时不必深究.
    命名格式推荐使用驼峰命名法:AaaBbb,aaaBbb,AAA_BBB
    不能使用关键字和保留字命名
     */
    val userName = "董长春"
    //    val if = 12 //编译报错,关键字和保留字不能用作标识符

  }
}


```

### 关键字保留字

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201201173034491.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

## 方法和操作符

在Scala中有这样一句话:操作符即方法,方法即操作符
意思是方法可以按照操作符的使用规则来使用,操作符也可以按照方法的方式使用

```scala
package cn.tedu.scalabasic
/**
 * Scala基础语法
 */
object ScalaGrammar {
  def main(args: Array[String]): Unit = {
    /*
    5.操作符和方法
    在Scala中有这样一句话:操作符即方法,方法即操作符
    意思是方法可以按照操作符的使用规则来使用,操作符也可以按照方法的方式使用
     */
    val str = "123_456_789"
    val strs = str split "_" //这里以操作符的形式(1 + 2)使用split方法
    for (s <- strs) {
      println(s)
    }

    println(2.*(4)) //这里以方法的形式(a.split("_"))使用+操作符

    //对于没有参数的方法,也可以不写括号
    val num: Int = 123
    println(num.toString())
    println(num.toString)
  }
}

```

# Scala数据类型

在Java中,分为基本数据类型(8种) 和 引用类型(继承自Object).其中基本数据类型直接以字面量的形式赋值,没有属性和方法.
在Scala中数据类型与Java的设计类似,并且针对面向对象和函数式编程做了更进一步的优化.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210409091950165.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

其中:

1. Scala中有两种类型,AnyVal(值类型)和AnyRef(引用类型)都继承自Any(顶级父类).
2. AnyVal类型也是以"对象"形式存在,有属性和方法.声明时以字面量的形式声明.其中包含了**类似**Java中的8大基本类型:Byte\Short\Int\Long\Float\Double\Boolean\Char.除此之外还有一个特殊的Unit类型,表示空值(类似Java中的void).
3. AnyRef类型中包括所有的Scala内置对象和自定义的Scala对象,集合等,以及所有引用的Java对象.还定义了一个Null类型来表示空对象,他的默认值为null.
4. 在Scala中还有一个非常特殊的Nothing类型.他是所有Scala类型的子类.被定义为abstract final class Nothing extends Any.不可被继承,不可被实现.
   官方图谱:

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201113162724348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

## AnyVal

这里我们先对AnyVal做详细讲解
值类型的定义

```scala
package cn.tedu.scalabasic

import scala.collection.immutable.StringOps

/**
 * AnyVal值类型的声明
 */
object DataTypes {

  def main(args: Array[String]): Unit = {
    val a: Byte = 123
    println(a,a.getClass)

    val b: Short = 123
    println(b,b.getClass)

    val c: Int = 123
    println(c,c.getClass)

    val d: Long = 123L  //此处加不加L都可以
    println(d,d.getClass)

    val e: Float = 1.23f  //为区别Double,Float类型后加f
    println(e,e.getClass)

    val f: Double = 1.23
    println(f,f.getClass)

    val g: Char = '@'
    println(g,g.getClass)

    val h: Boolean = false
    println(h,h.getClass)

    val i: Unit = "123" //不管这里赋值什么,他的值始终是()这是Unit的默认值.
    println(i,i.getClass)

    /*
      特殊说明
      虽然String是java.lang.String.在Scala中属于AnyRef类型,
      但是在实际操作是会被隐式转换为StringOps类型属于AnyVal
      通过以下实验可以证明
     */
    val j: String = "123"
    println(j,j.getClass) //(123,class java.lang.String)

    val k: StringOps = "123"
    println(k,k.getClass) //(123,class scala.collection.immutable.StringOps)
  }
}

```

## 值类型的转换

### 自动类型转换

在Scala中类型的转换包括两种,一种是值类型转换,另外一种是引用类型转换,这里我们先重点讲解值类型的转换.
值类型可以通过以下方式进行转换：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201113162749436.png#pic_center)

其转换方向取决于长度,只能由范围小的类型自动转换为范围大的,不能大变小.

```scala
package cn.tedu.scalabasic

/**
 * 类型转换
 */
object TypeTrans {
  def main(args: Array[String]): Unit = {
    /*
    自动类型转换
    在计算的过程中,值类型会进行自动转换,根据范围由小到大
    Byte->Short->Int->Long->Float->Double
                  ↑
                 Char
     */
    var a: Int = 12
    var b: Byte = 1
    var c: Char = 'a'
    var d: Long = 12
    var e: Double = 11.1
    var f: Short = 3
    var g: Float = 3.2f
    println(a+b,(a+b).getClass)
    println(a+c,(a+c).getClass)
    println(a+d,(a+d).getClass)
    println(a+e,(a+e).getClass)
    println(a+f,(a+f).getClass)
    println(d+g,(d+g).getClass)

  }
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111316293837.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70#pic_center)

说明:浮点数32位的范围大于Long的64位,由转换公式决定.

### 强制类型转换

范围大的数据类型通过 .toxxx 实现向范围小的数据类型强制转换,注意可能会造成精度的缺失.

```scala
package cn.tedu.scalabasic

/**
 * 类型转换
 */
object TypeTrans {
  def main(args: Array[String]): Unit = {
    /*
    强制类型转换
    范围大的数据类型通过 .toxxx 实现向范围小的数据类型强制转换,注意可能会造成精度的缺失.
     */
    val h: Int = 12
    val i: Double = 2.12
    val j: Int = (h + i).toInt
    println(j)
  }
}
```

### 值类型和String类型之间的相互转换

1. 值类型转换为String类型有两种方式,分别是a+"" 和 a.toString
2. String类型数据转换为值类型的前提是可转,使用.toXxx

```scala
package cn.tedu.scalabasic

/**
 * 类型转换
 */
object TypeTrans {
  def main(args: Array[String]): Unit = {
    /*
    值类型和String类型之间的相互转换
     */
    //值类型转换为String类型有两种方式,分别是a+"" 和 a.toString
    val k:Int = 12
    println(k+"",(k+"").getClass)

    val l:Int = 12
    println(l.toString,(k.toString).getClass)

    //String类型数据转换为值类型的前提是可转,使用.toXxx
    val m:String = "123"
//    val m:String = "12a"  //报错:java.lang.NumberFormatException
    println(m.toInt,m.toInt.getClass)
  }
}
```

# 运算符

## 算数运算符

Scala中的算数运算符与Java基本一致,唯一不同是没有++和–.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208142254922.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

```scala
package cn.tedu.scalabasic

/**
 * Scala中的操作符
 */
object ScalaOperator {
  def main(args: Array[String]): Unit = {
    /*
    算数运算符
     */
    val a = 13
    val b = 3
    println(a + b)
    println(a - b)
    println(a * b)
    println(a / b)
    println(a / 3.0)  //如果在除法运算时需要精确值,需要有至少一个浮点型
    println(a % b)
  }
}

```

## 赋值运算符

Scala中的赋值运算符与Java基本一致

```scala
package cn.tedu.scalabasic

/**
 * Scala中的操作符
 */
object ScalaOperator {
  def main(args: Array[String]): Unit = {
    /*
    赋值运算符
     */
    var c = 3 //将3这个值赋值给变量a
    c += 3
    println(c)
    c -= 3
    println(c)
    c *= 3
    println(c)
    c /= 3
    println(c)
    c %= 3
    println(c)
  }
}
```

## 关系运算符

Scala中的关系运算符与Java基本一致

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208153451129.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

```scala
package cn.tedu.scalabasic

/**
 * Scala中的操作符
 */
object ScalaOperator {
  def main(args: Array[String]): Unit = {
    /*
    关系运算符
     */
    println(a>b)
    println(a>=b)
    println(a<b)
    println(a<=b)
    println(a==b)
    println(a!=b)
  }
}

```

## 逻辑运算符

Scala中的逻辑运算符与Java基本一致,但是在取反操作时不能像Java一样多层取反.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208155020387.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

```scala
package cn.tedu.scalabasic

/**
 * Scala中的操作符
 */
object ScalaOperator {
  def main(args: Array[String]): Unit = {
    /*
    逻辑运算符
     */
    var bool1 = true
    var bool2 = false
    println(bool1 && bool2)
    println(bool1 || bool2)
    println(!bool2) //Scala不支持多层取反(!!!!!true)
  }
}

```

## 位运算符

Scala中的位运算符与Java基本一致,了解即可.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208160155983.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

# 流程控制

程序的执行顺序需要根据需求进行相应的控制,比如执行的顺序,执行条件,执行次数等.

## 顺序结构

Scala像大部分语言一样,代码一般按照从上到下的顺序执行.
一行代码中安装从左到右的顺序执行,同一行内如果有括号,先算括号里.
数学计算中遵循先乘除后加减.

```scala
package cn.tedu.scalabasic

/**
 * 流程控制
 */
object ProcessControl {
  def main(args: Array[String]): Unit = {
    /*
    顺序结构
     */
    println("Hello World")
    println(1+2+"Hello World"+3+2*2+(4+5))
  }
}

```

## 分支结构

在Scala分支结构中,只有if…else if…else 没有Java中的switch…case(模式匹配)
需要注意的是if分支结构是可以有返回值的.所以可以使用if语句替代Scala中没有的三元运算符.
与Java一致的是,分支结构可以多层嵌套.

```scala
package cn.tedu.scalabasic

/**
 * 流程控制
 */
object ProcessControl {
  def main(args: Array[String]): Unit = {
    /*
    分支结构
     */
    val age = 19
    if (age >= 18 && age < 500) {
      println("你已经成年了")
    } else if (age >= 500) {
      println("你已经成精了")
    } else {
      println("你还是个孩子")
    }
    //在Scala中没有三元运算符 a?b:c,使用if...else代替
    var result = if (age >= 18) "你已经成年了" else "你还是个孩子"
    println(result)
  }
}

```

## 循环结构

### for循环

在Scala中for循环用于控制程序执行次数,与Java一致,同时具备了更加丰富的功能.

1. for循环表达式可以同时定义多个.
2. for循环内可以加条件.
3. for循环可以有返回值.
4. for循环有返回值,返回每次执行的结果.

```scala
package cn.tedu.scalabasic

/**
 * 流程控制
 */
object ProcessControl {
  def main(args: Array[String]): Unit = {
    /*
    循环结构-for
     */
    for (i <- 1 to 10) {
      println(i)
    }
    //九九乘法表
	for (i <- 1 to 9) {
      for (j <- 1 to i) {
		//print(j + "*" + i + "=" + i * j + "\t")
        //在Scala中变量和字符串的拼接可以简化为占位符
        print(s"${j} * ${i} = ${i*j}\t")
      }
      println()
    }

    //简写
    for (i <- 1 to 9; j <- 1 to i) {
      print(s"${j} * ${i} = ${i*j}\t")
      if (i == j) println()
    }

    //循环条件,守卫,步长
    for(i <- 1 to 10 if i % 2 == 0) println(i)

    //推导式:生成一个2到10的偶数集合
    var nums = for(i <- 1 to 10 if i % 2 == 0) yield i
    println(nums)
  }
}
```

### while循环

Scala中while与Java中写法和用法都一致.但是更推荐使用for,因为for更加简洁.

```scala
package cn.tedu.scalabasic

/**
 * 流程控制
 */
object ProcessControl {
  def main(args: Array[String]): Unit = {
    /*
    循环结构-while
     */
    var num1 = 0
    while (num1 <= 10) {
      num1 += 1
    }
    println(num1)

    var num2 = 0
    do {
      num2 += 1
    } while (num2 <= 10)
    println(num2)
  }
}
```

## break()和breakable

在Scala中没有break和continue想要使用类似功能只能用scala.util.control.Breaks._工具
这里对Scala没有break和continue做一个说明,Java中的break和continue都与面向对象的概念无关,是标准的面向过程的实现方式,而马丁 奥德斯基认为这是一个缺陷,既然是面向对象的语言就应该在每个细节体现面向对象的思想,所以抽象出了Break,来统管breakable和break的配合实现Java中break和continue的功能.

```scala
package cn.tedu.scalabasic

/**
 * 流程控制
 */
object ProcessControl {
  def main(args: Array[String]): Unit = {
    /*
    break()和breakable
     */
     //导包
    import scala.util.control.Breaks._
    //break
    breakable {
      for (i <- 1 to 10) {
        println(i)
        if (i == 6) break()
      }
    }

    //continue
    for (i <- 1 to 10) {
      breakable {
        if (i % 2 == 0) break()
        println(i)
      }
    }
  }
}
```

## 代码块

在Java中我们学过静态代码块,在Scala中也有代码块的概念,就是用大括号括起来的一段代码.并且在Scala中代码块是可以有返回值的.

```scala
package cn.tedu.scalabasic

/**
 * 流程控制
 */
object ProcessControl {
  def main(args: Array[String]): Unit = {
    /*
    代码块
    */
    val block = {
      println("代码")
      val v1 = 12
      val v2 = 14
      v1 + v2  //最后一行的表达式为返回值
    }
    println(block)
  }
}

```

# 方法和函数

在Scala中方法和函数是不一样的.一般情况下在使用时并不需要特殊区分.

## 方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209104905212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

Scala中的方法定义与Java不同更加简洁.
1.一般情况下返回值类型可以省略.递归方法除外.
2.return可以省略,默认方法体中最后一行被返回.
3.只有一行代码的时候大括号也可以省略.
4.当返回值类型为Unit(没有返回值)时,=也可以省略不写,也就是说如果不写等号该方法不会返回任何数据.这种形式在Scala中叫做"过程",此时就算方法体中声明了return,不管return后返回的是什么,最终默认返回()
5.在省略return的情况下,方法的返回值类型可以不写(自动推断),但是如果写了return代表不希望编译器自动推断返回值类型,此时必须定义返回值类型.
6.方法的内部还可以定义方法(灵活)
7.方法的参数默认是val修饰所以在方法内部不能修改形参的值.

```scala
package cn.tedu.scalafunction

/**
 * 方法
 */
object Method {
  def main(args: Array[String]): Unit = {
    /*
    方法的定义
     */
    def getSum1(a:Int,b:Int):Int = {
      return a+b
    }
    //返回值类型可以省略(自动推断)
    //return可以省略(默认返回最后一行)
    //{}可以省略(只有一行代码)
    def getSum2(a:Int,b:Int)= a + b
    
    val sum1 = getSum1(1,2)
    val sum2 = getSum2(3,4)
    
    println(sum1)
    println(sum2)

    //没有返回值时,=等号可以不写.这种形式在Scala中叫做:过程
    def sayHello() {
      println("Hello,World")
      return 1  //即使写了返回1,因为没有等号= 方法也不会返回任何数据.
    }
    val hello = sayHello()
    println(hello)
  }
}
```

### 递归

方法内部调用自己,即为递归
递归方法定义时不能省略返回值类型

```scala
package cn.tedu.scalafunction

/**
 * 方法
 */
object Method {
  def main(args: Array[String]): Unit = {
    //递归方法定义时必须声明返回值
    def getFactorial(n: Int): Int = {
      if (n == 1) n else n * getFactorial(n - 1)
    }

    val factorial = getFactorial(5)

    println(factorial)
  }
}
```

### 方法的参数

#### 默认参数

在方法的定义时,我们有时会遇到这样的需求: 某些参数通常是不变的数据只有少数情况下才会变化.如果大多数情况下都需要手动传入同样值不符合编程中复用的原则.默认参数就可以解决这类问题.

```scala
package cn.tedu.scalafunction

/**
 * 方法
 */
object Method {
  def main(args: Array[String]): Unit = {
    /*
    默认参数
     */
    def getUserInfo(name:String,age:Int,addr:String = "张家口"):String = {
      s"${name}来自${addr},今年${age}岁了"
    }
    val info1 = getUserInfo("董长春",12)
    val info2 = getUserInfo("马梦诗",12)
    val info3 = getUserInfo("刘沛霞",12,"天津")

    println(info1)
    println(info2)
    println(info3)
  }
}

```

#### 指定参数

指定参数时指,在调用方法是通过指定参数名来改变参数传递的前后顺序.

```scala
package cn.tedu.scalafunction

/**
 * 方法
 */
object Method {
  def main(args: Array[String]): Unit = {
    /*
    指定参数
     */

    def getProduct(a: Int = 5, b: Int = 10) = (a + 3) * b
    //改变参数传入的顺序
    println(getProduct(b = 4, a = 3))
    //避免在参数有默认值时错传
    println(getProduct(b = 1))
  }
}

```

#### 可变参数

当方法的参数列表中有多个不确定的参数时,可以是用可变参数,与Java类似.
可变参数用数组来保存,可以直接调用数组的方法.
如果参数列表中既有普通参数,也有可变参数,可变参数必须写在最后.

```scala
package cn.tedu.scalafunction

/**
 * 方法
 */
object Method {
  def main(args: Array[String]): Unit = {
    /*
    可变参数
     */
    def getSum4(nums:Int*) = nums.sum //可变参数是用数组保存的,可以直接使用数组的方法.
    //需要注意的是,如果参数列表中既有普通参数,也有可变参数,可变参数需要写在最后.
    //def getLogs(logs:String*,id:Int) = {} //编译错误:*-parameter must come last
  }
}

```

### 方法的调用

在Scala中方法的调用也是非常灵活的,我们来总结一下.

#### 后缀调用

最普通的调用方式就是后缀调用,这与Java中是一致的.都是对象.methodName(参数)的形式.

#### 中缀调用

中缀调用其实在前边已经接触过,就是方法即运算法,运算符及方法的体现.
比如:1 to 10.就是1.to(10)

#### 大括号调用

当参数只有一个时,也可以将小括号替换为大括号.比如: 对象.methodName{参数},用的不多.

#### 无括号调用

当没有参数时,方法的调用可以不写括号,比如:array.sum

### 惰性加载

为了解决资源推迟加载,优化启动速度,区别加载顺序等问题,Scala中设计了一个惰性加载的概念.
所有被lazy修饰的val所指向的资源不会直接加载,而是延迟到使用时才会加载.
需要注意的是,lazy只能修饰val 不能修饰var
当用于接收方法返回值得val被lazy修饰是,这个方法会惰性加载.叫做惰性方法.
这种惰性加载的形式在Java中也有,只不过Java没有原生支持,而是通过代码逻辑来实现,叫做懒加载,比如单例中的懒汉式.在Spring等对象管理框架中也有懒加载的概念.

```scala
package cn.tedu.scalafunction

/**
 * 方法
 */
object Method {
  def main(args: Array[String]): Unit = {
    /*
    惰性方法(类似Java中的懒加载)
     */
    def getSum3(a:Int,b:Int) = {
      println("getSum3已经加载")
      a + b
    }
//    val sum3 = getSum3(1,2)
    lazy val sum3 = getSum3(1,2)
    println(sum3)
  }
}

```

## 函数

在Scala中函数与方法是不同的.方法依附于对象,而函数本身就是对象.
函数的定义方式也与方法不同.

```scala
object Function {
  def main(args: Array[String]): Unit = {
    /*
    函数的定义
    0.函数的定义方式为: val funName = (x:Int,y:Int) => {x + y}
    1.函数本身是一个对象.
    2.函数参数列表和函数体之间是 => 来链接
    3.函数不需要写返回值类型.
    4.函数定义时的变量名就是函数名,也就是这个对象的引用,调用时使用函数名(参数)的形式调用.
    5.函数可以直接用lazy修饰作为惰性函数.
     */
    val getSum = (a:Int,b:Int) => {a + b}
    println(getSum(1,2))

    val printMsg = () => {println("Hello")}
    printMsg()

    lazy val getMax = (v1:Int,v2:Int) => {if (v1>v2) v1 else v2}
    println(getMax(2, 3))
    
    /*
    方法转函数
    有时候我们需要将一段逻辑作为参数传递,但是方法不支持传递,可以将其转化为函数.
    通过本案例的输出结果,我们也可验证,函数是对象,而方法不是.
     */
    
    def getInfo() = {println("我叫董长春")}
    println(getInfo)
    val toFunction = getInfo _
    println(toFunction)
  }
}

```

### 匿名函数

在Scala中匿名函数在生产中是非常常用的,也是我们需要非常熟悉的编码方式.
所谓匿名函数,与Java中lambda表达式是类似的,表现形式类似,功能也类似.都是以简洁的方式定义一段逻辑.常常作为参数传入其他的方法.

```scala
package cn.tedu.scalafunction

/**
 * 函数
 */
object Function {
  def main(args: Array[String]): Unit = {
    /*
    匿名函数
    在很多时候,我们需要定义一些具有泛化功能的方法,比如对两个数字进行运算,其中数据和运算方式由调用者决定,此时
    我们如果提前在方法中定义好运算方式的话工作量太大(需要考虑所有情况)那么不妨接收一个用户传进来的运算逻辑,而
    这个运算逻辑就可以用函数的方式来接收.用户在调用这个方法时,可以先定义一个函数然后将函数作为参数传入,当这个
    函数只用到一次时,可以以匿名的方式传入,这就是匿名函数.
     */
    //需求:定义一个方法,传入两个数字以及运算方式,得出结果.
    def process(f:(Int,Int)=>Int,a:Int,b:Int) = {
      f(a,b)
    }
    process((a,b)=>{print("result:"+a+b);a+b},1,2)
  }
}

```

### 偏应用函数

在方法部分的学习中,关于方法的参数,我们学过了几种特殊的定义及调用方式,比如默认参数,可变参数和指定参数,其中在方法结合函数的使用中默认参数有另外一种实现形式,就是偏应用函数.

```scala
package cn.tedu.scalafunction

/**
 * 函数
 */
object Function {
  def main(args: Array[String]): Unit = {
    /*
    偏应用函数
    在方法部分的学习中,关于方法的参数,我们学过了几种特殊的定义及调用方式,比如默认参数,可
    变参数和指定参数,其中在方法结合函数的使用中默认参数有另外一种实现形式,就是偏应用函数.
     */
    //使用方法的默认参数
    def showYou1(info:String = "大家好我是",name:String) = {
      println(info+name)
    }
    showYou1(name = "董长春")

    //方法没有定义默认参数
    def showYou2(info:String,name:String) = {
      println(info+name)
    }
    val funShowYou = showYou2("大家好我是",_:String)
    funShowYou("董长春")

  }
}

```

### 高阶函数

所谓高阶函数其实就是函数的高级使用方式,其中包括

#### 函数作为参数传入方法或函数

```scala
package cn.tedu.scalafunction

/**
 * 函数
 */
object Function {
  def main(args: Array[String]): Unit = {
    /*
    高阶函数
    1.函数作为参数传入方法
    2.函数作为方法的返回值
    3.*方法的参数和返回值都是函数
     */

    //1.函数作为参数传入方法,一般多使用匿名函数
    val f1 = (a: Int, b: Int) => {
      (a * b, a + b)
    }

    def method1(f:(Int,Int)=>(Int,Int),a:Int,b:Int)={
      println(s"$a 和 $b 相乘得 ${f1(a,b)._1} \n$a 和 $b 相加得 ${f1(a,b)._2}")
    }

    method1(f1,1,2) //函数作为参数传入方法

    val f2 = (f:(Int,Int)=>(Int),a:Int,b:Int) => {
      f(a,b)
    }
    println(f2((a,b)=>{a+b},1,2)) //匿名函数作为参数传入函数
  }
}

```

#### 函数作为方法或函数的返回值

```scala
package cn.tedu.scalafunction

/**
 * 函数
 */
object Function {
  def main(args: Array[String]): Unit = {
    /*
    高阶函数
    1.函数作为参数传入方法
    2.函数作为方法的返回值
    3.*方法的参数和返回值都是函数
     */
    //2.函数作为方法或函数的返回值
    //需求:定义一个方法returnFun(n:Int),让其返回一个计算n倍的a和n倍的b的和的函数f(a,b) => n * a + n * b
    //函数作为方法的返回值
    def returnFun(n: Int): (Int, Int) => Int = {
      val reFun = (a: Int, b: Int) => {
        n * a + n * b
      }
      reFun //(a:Int,b:Int)=>{ n*a + n*b }
    }

    println(returnFun(10)(3, 4))  //returnFun(10) --> reFun

    //函数作为函数的返回值
    val f3 = (n:Int) => {
      val reFun = (a: Int, b: Int) => {
        n * a + n * b
      }
      reFun //(a:Int,b:Int)=>{ n*a + n*b }
    }

    println(f3(10)(1,2))
  }
}

```

#### 方法或函数的参数和返回值都是函数

```scala
package cn.tedu.scalafunction

/**
 * 函数
 */
object Function {
  def main(args: Array[String]): Unit = {
    /*
    高阶函数
    1.函数作为参数传入方法
    2.函数作为方法的返回值
    3.*方法的参数和返回值都是函数
     */
    //3.*方法或函数的参数和返回值都是函数
    //需求：定义一个方法或者函数，参数是(f1:(Int,Int),a:Int,b:Int)使得a和b按照f1的方式运算
    // 返回值是 f2:Int=>Int f2的逻辑是将传入的参数*n返回
    
    //方法的参数和返回值是函数
    def ioFun(f1: (Int, Int) => Int, a: Int, b: Int): Int => Int = {
      val f2 = (n: Int) => {
        n * f1(a, b)
      }
      f2
    }

    println(ioFun((a, b) => {a + b}, 2, 3)(100))

    //函数的参数和返回值是函数
    val f4 = (f1: (Int, Int) => Int, a: Int, b: Int) => {
      val f2 = (n: Int) => {
        n * f1(a, b)
      }
      f2
    }

    println(ioFun((a, b) => {a + b}, 2, 3)(100))

  }
}

```

### 柯里化函数

首先来谈谈什么叫柯里化函数: 柯里化函数就是将多个参数的函数Fa(p1,p2,p3…)转化为一个包含Fa部分参数的新函数Fb.
比如Fa(p1,p2,p3…) --> Fb(p3…),其中Fa的参数p1和p2已经在转化中得到了计算,返回p1与p2的计算结果和p3…进行计算的逻辑,也就是新函数Fb(p3…).

```scala
package cn.tedu.scalafunction

/**
 * 函数
 */
object Function {
  def main(args: Array[String]): Unit = {
   /*
    柯里化函数
    首先来谈谈什么叫柯里化函数: 柯里化函数就是将多个参数的函数Fa(p1,p2,p3...)转化为一个包含Fa部分参数的新函数Fb.
    比如Fa(p1,p2,p3...)  -->  Fb(p3...),
    其中Fa的参数p1和p2已经在转化中得到了计算,返回p1与p2的计算结果和p3...进行计算的逻辑,也就是新函数Fb(p3...)..
     */

    val fa = (a: Int, b: Int, c: Int) => {
      val resultAB = a + b
      println("a + b = "+resultAB)
      val fb = (n: Int) => {
        c * n
      }
      fb
    }

    //柯里化函数一般使用形式
    val result = fa(1, 2, 3)(1000)
    println(result)

  }
}

```

# 类和对象

## 回顾面向对象

在Java的学习过程中,面向对象无疑是重中之重.而Scala是一门面向对象的函数式编程语言,所以面向对象的概念或者思想在Scala学习过程中也是不能忽视的.

### 什么是面向对象

面向对象是一种编程思想,是相对于面向过程的又一层高级抽象.
我们将一系列事物的特性或者功能抽象出来并对其进行封装,这个封装结果就是类,而属于这个类的所有个体就是这个类的对象.

### 面向对象的特点

封装: 保证安全性
继承: 保证复用性
多态: 保证拓展性

## 类的定义和对象创建

Scala中简单的类定义与Java相同,内部可以定义成员属性和成员方法.
对象实例的创建方式与Java也类似,通过new关键字实现
在使用空参构造时,类名后的括号可以省略.
对象可以访问类的公共属性和方法.
类在实例化时,除所有方法(不包括构造)外,其他语句都会执行.(这些被执行的语句实际上在默认构造器中)

```scala
package cn.tedu.scalaoop

/**
 * 面向对象
 */
object OOPTest {
  def main(args: Array[String]): Unit = {
    //1.创建对象
//    val dongcc = new User()
    val dongcc = new User //使用无参构造可以省略()
    dongcc.age = 18
    dongcc.sayHi()
  }
}

/*
1.创建一个类
 */
class User{
  val name:String = "董长春" //完整定义属性
  var age:Int = _ //下划线代表默认值
  val gender = "男"
  var addr = "张家口"

  def sayHi(): Unit ={
    println(s"${name}是一个来自${addr}的${age}岁小${gender}孩.")
  }
  println("类加载时就会执行") //在构造方法中
}

```

反编译分析：
通过反编译.class文件.我们发现:
1.在Scala中所有的属性默认都是java中private修饰的,这意味着外部无法直接访问,在JAVA中我们一般会提供getter和setter方法来实现对私有属性的读取和修改.
2.在Scala中默认提供了类似Java的getter和setter方法,命名是直接以属性名命名,比如age属性对应的方法有两个一个是age()用于获取age,还有一个是age_$eq(int x$1) 用于修改age.
3.用val修饰的属性在Scala中是常量,常量在反编译时发现是用final修饰的,只提供获取属性的方法,没有修改属性的方法(不可修改)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210316111009718.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

通过反编译观察到,println("…")执行是因为他实际上是被定义在默认构造中的.

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021032319461378.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

## 构造器

像Java创建对象一样,Scala在创建对象的时候也是调用构造器,而Scala中构造器的写法与Java不同,可以直接定义在类名之后的小括号里.
1.定义类时在类名后加()代表默认构造器,当默认构造器为无参构造时,()可以省略不写.
2.在构造器定义时可以使用默认构造,即定义时直接赋默认值.
3.构造参数在定义时可以加var或者val修饰,也可以什么都不加.
var修饰时:作为可变属性,外部可以读写.
val修饰时:作为不可变属性,外部可读,不可写.
无修饰时:作为局部变量,外部不可见.
4.重载构造以 def this(){} 为固定写法,中间可以写=号,但是一般不写(约定俗成),重载构造的第一行必须调用默认构造.

```scala
package cn.tedu.scalaoop

/**
 * 面向对象
 */
object OOPTest {
  def main(args: Array[String]): Unit = {
    //2.构造器
    //    new Person("董长春",18,"男")
    //对象创建时可以使用指定参数的方式避免参数错传.
    //    val person = new Person(xage = 18, xname = "董长春", xgender = "男")
    //对象创建时可以使用默认参数
    val person = new Person("李四", xage = 18, xgender = "男")
    //    person.xage //没有var或者val修饰,是局部变量.
    //    person.xname = "" //被val修饰,可读不可写
    person.xgender = "女" //被var修饰,可读可写
    person.sayHi()
    val person1 = new Person()
    person1.sayHi()

    val person2 = new Person("王五",12,"女","天津")
    println(person2.addr)
  }
}
/*
2.构造器
  1.定义类时在类名后加()代表默认构造器,当默认构造器为无参构造时,()可以省略不写.
  2.在构造器定义时可以使用默认构造,即定义时直接赋默认值.
  3.构造参数在定义时可以加var或者val修饰,也可以什么都不加.
    var修饰时:作为可变属性,外部可以读写.
    val修饰时:作为不可变属性,外部可读,不可写.
    无修饰时:作为局部变量,外部不可见.
  4.重载构造以 def this(){} 为固定写法,中间可以写=号,但是一般不写(约定俗成),重载构造的第一行必须调用默认构造.
 */
class Person(val xname: String = "董长春", xage: Int, var xgender: String) {

  //重载构造器
  def this(){
//    print("第一行必须是默认构造的调用")
    this("默认姓名", 0, "默认性别")
  }

  def this(xname:String,xage:Int,xgender:String,xaddr:String){
    this(xname,xage,xgender)
    this.addr = xaddr
  }

  var addr = ""
  val name = xname

  def sayHi(): Unit = {
    println(s"${name}是一个${xage}岁的${xgender}孩.")
  }
}

```

反编译分析:
通过反编译,我们可以验证构造参数如果没有被var或者val修饰那么他是被private和final修饰的并且没有提供类似的getter和setter方法.是一个局部变量,不能被外部访问.而被val修饰的提供了getter,外部可以读取.被var修饰的提供了getter和setter外部可以读取可以修改.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210316115019218.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

## 访问权限修饰符

Scala中访问权限修饰符与Java稍有不同,但是功能是类似的.
Scala中共有四种访问权限修饰符
包括:**private \ private[this] \ protected \ 默认**

| 修饰符        | 权限                                             |
| ------------- | ------------------------------------------------ |
| private[this] | 作用域私有的,只能在伴生范围内中访问,对于其他私有 |
| private       | 类私有的,只能在本类访问                          |
| protected     | 受保护的,只能在本类及其子类中访问                |
| 默认          | 公共的(public)全局可访问                         |

一般情况下,开发中更多的使用到默认的,和private私有的.关于private和private[this]伴生类和伴生对象中会讲到.

```scala
package cn.tedu.scalaoop

/**
 * 权限修饰符
 */
object Permission {
  def main(args: Array[String]): Unit = {
    val animal = new Animal
    println(animal.name) //默认public
    //    println(animal.age) //受保护的只有本类和子类能访问
    //    println(animal.gender)  //私有的只有本类能访问
    val donkey = new Donkey
  }
}

class Animal {
  var name = "动物名称"
  protected var age = 0
  private var gender = "雄性"
}

class Donkey extends Animal {
  name = "驴"
  age = 3
  println("Donkey:" + name, age)
}

```

## 单例对象

在Scala中用Object修饰创建的就是单例对象.
单例对象中的所有属性和方法都是静态的.
单例对象没有构造器,对象名后不能加括号.如过需要传入构造参数需要实现apply()方法.

```scala
package cn.tedu.scalaoop

/**
 * 单例对象
 */
object ObjTest {
  def apply(xmsg:String) = {
    msg = xmsg
  }
  var msg = ""
  val name = "单例对象"
  val info = "所有属性和方法都是静态的"
  def sayHi(): Unit ={
    println("我是一个静态的方法"+msg)
  }
  def main(args: Array[String]): Unit = {
    //main方法是一个静态方法,可以直接调用其他静态方法.静态资源可以用类名.资源名的方式调用.
    println(ObjTest.name)
    println(ObjTest.info)
    ObjTest.sayHi()

    ObjTest("apply方法中可以传参")
    sayHi()
  }
}

```

## 伴生类和伴生对象

在Scala中Object和class可以同名,名字与某个class相同的Object是这个Class的伴生对象,反之这个Class也叫做这个Object的伴生类.
1.伴生类和伴生对象之间可以互相访问所有属性和方法包括被private修饰的.
2.一般使用伴生对象来定义那些在伴生类中不依赖于实例化对象而存在的成员变量或者方法。类似于Java中用静态修饰的属性和方法.

```scala
package cn.tedu.scalaoop

import cn.tedu.scalaoop.Companion.sayHi

/**
 * 伴生类和伴生对象
 */
object Companion {
  def sayHi(){
    println("我是静态的哦")
  }
  def main(args: Array[String]): Unit = {
    val c = new Companion
    println(c.name,c.gender,c.age)  //访问伴生类中的所有属性包括private修饰的
//    println(c.money)  //被private[this]修饰的伴生条件下也不可见
  }
}

class Companion{
  val name = "董长春"
  protected val gender = "男"
  private val age = 18
  private[this] val money = 100
  
  //直接调用伴生对象中的静态资源.
  sayHi()
}


```

#### private[this]权限修饰

我们说在伴生类和伴生对象之间所有的属性和方法都可以共享甚至包括被private修饰的.但是有一个例外那就是被private[this]修饰的内容即使互相之间是伴生关系,也不可见.

```scala
package cn.tedu.scalaoop

import cn.tedu.scalaoop.Companion.sayHi

/**
 * 伴生类和伴生对象
 */
object Companion {
  def sayHi(){
    println("我是静态的哦")
  }
  def main(args: Array[String]): Unit = {
    val c = new Companion
    println(c.name,c.gender,c.age)  //访问伴生类中的所有属性包括private修饰的
//    println(c.money)  //被private[this]修饰的伴生条件下也不可见
  }
}

class Companion{
  val name = "董长春"
  protected val gender = "男"
  private val age = 18
  private[this] val money = 100
  
  //直接调用伴生对象中的静态资源.
  sayHi()
}

```

#### apply()方法

在Scala单例对象中(Object),apply()方法是用来实现类似类中的构造方法功能的,可以定义一些参数传入,我们知道Object中所有属性都是静态的,所以通过apply()方法传入的参数也是静态的.比如初始化一个List.

```scala
package cn.tedu.scalaoop

/**
 * 单例对象
 */
object ObjTest {
  def apply(xmsg:String) = {
    msg = xmsg
  }
  var msg = ""
  def sayHi(): Unit ={
    println("我是一个静态的方法"+msg)
  }
  
  def main(args: Array[String]): Unit = {
    ObjTest("apply方法中可以传参")
    sayHi()
    val list1 = List.apply(1, 2, 3, 4)
    val list2 = List(5,6,7,8) //这里就是省略了.apply()方法的写法.
    println(list1,list2)
  }
}

```

# 继承

继承的概念与JavaOOP学习的概念是一致的.是进一步解决代码复用的关键手段.(封装方法和类解决的是使用时的代码复用,而继承则实现了定义期的代码复用.)
比如多个类具有相同的属性或方法时,我们可以从这些类的特点中抽取他们的共同父类,这些类就叫做这个父类的子类,子类通过extends关键字从父类中继承属性和方法.

```scala
package cn.tedu.scalaextends
/**
 * 继承
 */
object ExtendsTest {
  def main(args: Array[String]): Unit = {
    val dongcc = new Student
    dongcc.eat()
    dongcc.study()
    dongcc.sleep()
  }
}
//创建一个父类Person
class Person {
  val name = "董长春"
  protected val gender = "男生"
  private val age = 18

  def eat(): Unit = {
    println(s"${name}正在吃饭")
  }

  def sleep(): Unit = {
    println(s"${name}正在睡觉")
  }
}
//创建一个子类Student继承Person
class Student extends Person {
  def study(): Unit = {
    println(s"${this.name}是个正在学习Scala的${gender}")
    //    println(age)  //私有不能访问
  }
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021032119412064.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

反编译分析：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210321194203990.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

## 重写方法

在Scala中重写方法与Java中的意义相同,但是使用要求不同,如果要重写父类的方法必须加override关键字(java中加@Override注解,可不加).并且如果在重写方法内调用父类中被重写的方法时,必须加super.methodName()

```scala
package cn.tedu.scalaextends
/**
 * 继承
 */
object ExtendsTest {
  def main(args: Array[String]): Unit = {
    val dcc = new Teacher
    dcc.sleep()
  }
}
//创建一个父类Person
class Person {
  val name = "董长春"
  protected val gender = "男生"
  private val age = 18

  def eat(): Unit = {
    println(s"${name}正在吃饭")
  }

  def sleep(): Unit = {
    println(s"${name}正在睡觉")
  }
}

//创建一个子类Teacher继承Person
class Teacher extends Person {
  override def sleep(): Unit = {
    println("回答学生问题")
    super.sleep()
  }

  //  def eat(): Unit ={  //不加override编译报错
  //    println("回答学生问题")
  //  }
}

```

## 重写属性

属性的重写有几个需要注意的点:
1.父类的属性被重写后,使用子类对象无法读取父类属性值,不管是父类引用还是子类引用.
2.在普通的类中,var属性无法被重写(抽象类中的抽象var可以)
3.val属性可以重写无参方法(了解即可)

```scala
package cn.tedu.scalaextends

import scala.beans.BeanProperty

/**
 * 继承
 */
object ExtendsTest {
  def main(args: Array[String]): Unit = {
    //重写属性测试
    val b = new B
    val a:A = new B
    println(b.num1,b.num2,a.num1,b.getNum3) //被覆盖后则无法读取原属性值.
  }
}
/*
重写属性
 */
class A{
  val num1 = 1
  var num2 = 2
  def getNum3():Int = {
    3
  }
}
class B extends A{
  override val num1 = 10
//  override var num2 = 20  //在普通类中,可变变量无法被覆盖
//  override val num2 = 20
  num2 = 20
  override val getNum3 : Int = 30 //val 可以覆盖无参方法(了解)
}

```

## 类型判断和转换

classOf[]
isInstanceOf[] //判断是否属于某个类
asInstanceOf[] //将对象转换为某个类型(原对象不变,返回值为指定类型对象)

```scala
package cn.tedu.scalaextends

/**
 * 继承
 */
object ExtendsTest {
  def main(args: Array[String]): Unit = {
    //继承测试
//    val dongcc = new Student
//    dongcc.eat()
//    dongcc.study()
//    dongcc.sleep()

    //重写方法测试
//    val dcc = new Teacher
//    dcc.sleep()

    //类型判断和转换测试

    val stu = new Student
    println(classOf[Student])
    println(stu.getClass.getName)
    val cod = new Coder
    val per = new Person
    typeTest(stu)
    typeTest(cod)
    typeTest(per)

  }
  //类型判断转换测试方法
  def typeTest(p:Person): Unit ={
    if (p.isInstanceOf[Student]){
      p.asInstanceOf[Student].study()
    }else if (p.isInstanceOf[Coder]){
      p.asInstanceOf[Coder].code()
    }else{
      println("类型转换失败")
    }
  }
}

//创建一个父类Person
class Person {
  val name = "董长春"
  protected val gender = "男生"
  private val age = 18

  def eat(): Unit = {
    println(s"${name}正在吃饭")
  }

  def sleep(): Unit = {
    println(s"${name}正在睡觉")
  }
}

//创建一个子类Student继承Person
class Student extends Person {
  def study(): Unit = {
    println(s"${this.name}是个正在学习Scala的${gender}")
    //    println(age)  //私有不能访问
  }
}

//创建一个子类Teacher继承Person
class Teacher extends Person {
  override def sleep(): Unit = {
    println("回答学生问题")
    super.sleep()
  }
  //  def eat(): Unit ={  //不加override编译报错
  //    println("回答学生问题")
  //  }
}

//定义一个Coder类继承Person
class Coder extends Person{
  def code(): Unit ={
    println(s"${this.name}是个正在写代码的${gender}")
  }
}

```

# 抽象类

在Scala中抽象类与Java一样使用abstract标记,表示不能被直接实例化的类(包含未初始化属性或没有实现的方法),其中抽象方法不需要使用abstract标记,只需要省略方法体即可.(基础开发中并不常用)
1.抽象类不能被实例
2.抽象类不一定要包含abstract方法。也就是说,抽象类可以没有abstract方法.可以有普通方法.
3.一旦类包含了抽象方法或者抽象属性,则这个类必须声明为abstract
4.抽象方法不能有主体，不允许使用abstract修饰。
5.如果一个类继承了抽象类，则它必须实现抽象类的所有抽象方法和抽象属性，除非它自己也声明为abstract类.
6.抽象方法和抽象属性不能使用private、final 来修饰，因为这些关键字都是和重写/实现相违背的。
7.子类重写抽象方法不需要override，写上也不会错.

```scala
package cn.tedu.scalaabstract

/**
 * 抽象类
 */
object AbstractTest {
  def main(args: Array[String]): Unit = {
    val latiao = new MeiDuan
    latiao.eat()
    noNameTest(new MeiDuan)
  }
//匿名内部类测试
  def noNameTest(c:Cat): Unit ={
    println(c.name)
  }
}
//定义抽象类Cat
abstract class Cat{
  var name:String
  def eat()
}
//定义MeiDuan类继承Cat抽象类
class MeiDuan extends Cat{
  override var name: String = "辣条"  //在抽象类中var类型的属性可以被var重写
  override def eat(): Unit = {
    println(s"${name}爱吃馒头")
  }
}

```

# 特质Trait

首先明确,Scala中没有接口的概念,替代Java中接口的是Trait(特质,特征),而Trait又比Java(1.7)中的接口更加丰富,涵盖了接口和抽象类的特点.而JDK1.8中接口中的方法可以有方法体的变化就引自Scala.
1.trait定义时不能传参(不能实例化,没有构造)所以没有()
2.trait使用方式是extends不是implement.
3.多继承时第二个trait开始使用with连接.
4.Java中的Interface都可以当做Scala中的Trait来直接使用.

```scala
package cn.tedu.scalatrait

/**
 * Trait特质
 */
object TraitTest {
  def main(args: Array[String]): Unit = {
    val dongcc = new Person
    dongcc.take("dongcc")
    dongcc.sing("dongcc",dongcc.song1,dongcc.song2)
    dongcc.dance("dongcc","disco")
  }
}

//定义一个Trait Sing
//trait定义时不可用有()因为不能有参数,命名方式遵循驼峰规则
trait Sing{
  var song1:String //trait中可以定义的属性可以是抽象的
  val song2 = "东边的山上有两头牛~~" //trait中可以定义的属性也可以是赋值的
  def sing(name:String,song: String*): Unit ={
    println(s"${name}正在唱${song(0)}${song(1)}")
  }
  def take(name:String) //抽象方法后不写返回值默认Unit
}

//定义一个Trait Dance
trait Dance{
  def dance(name: String,dance:String)
}

//定义一个Person类继承Sing特质,继承多个特质时,中间用with连接.
class Person extends Sing with Dance{
  override var song1: String = "西边的山上有两只猴~~"

  override def take(name: String) = {
    println(s"${name}拿起了麦克风...")
  }

  override def dance(name: String,dance:String): Unit = {
    println(s"${name}正在跳${dance}")
  }
}

//Java中的接口都可以当做Scala中的Trait使用.
//trait Serializable extends Any with java.io.Serializable
class Log extends Serializable{
  
}

```

## 动态混入

前边讲到的trait只是基本应用方式,与JDK8中的接口从根本上来讲并没有太大区别.真正厉害的在于trait可以动态混入(mixin)这是Java没有的,并且是非常实用的.通过下边案例来演示他的功能.

```scala
package cn.tedu.scalatrait

/**
 * 动态混入
 */
object MixinTest {
  def main(args: Array[String]): Unit = {

    //类动态混入特质
    val dongcc = new Dongcc with Code {
      override def code(name: String): Unit = {
        println(s"${name}学会了敲代码~~")
      }
    }
    dongcc.code("董长春")

    //抽象类动态混入特质
    val wangzy = new Wangzy with Code {
      override def eat(): Unit = {
        println("我要吃饭饭")
      }
      override def code(name: String): Unit = {
        println(s"${name}学会了敲代码~~")
      }
    }
    wangzy.code("王泽扬")
    wangzy.eat()
  }
}

//定义了一个Trait Code
trait Code{
  def code(name:String)
}

//定义了一个Dongcc类,没有继承Code
class Dongcc {

}

//定义了一个Wangzy抽象类,没有继承Code
abstract class Wangzy{
  def eat()
}

```

这样的功能有什么意义呢?
先来分析一下Java中的一种情景:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210322233652127.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

在这个案例中Class C被动继承了sayHi() 方法,如果C不需要sayHi() 这不符合接口解耦的初衷.
在Scala中动态混入就可以完美解决这个问题.
动态混入本质就是在类实例化的时期动态的继承Trait,而不影响类的定义.这样也就不会影响该类的子类.

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021032223403395.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

```scala
package cn.tedu.scalatrait

/**
 * 动态混入的应用场景
 * 当C继承B,B继承Atrait,而C不希望继承Atrait时.可以在B实例化时动态继承Atrait.
 */
object MixinTest2 {
  def main(args: Array[String]): Unit = {
    
    val b = new B with A
    b.sayHi()
    b.sayHello()
    
    val c = new C
//    c.sayHi() //c中没有sayHi()方法
    c.sayHello()
  }
}

trait A {
  def sayHi(): Unit = {
    println("A的sayHi()")
  }
}

class B {
  def sayHello(): Unit = {
    println("B的sayHello()")
  }
}

class C extends B {

}

```

# 样例类

被case修饰的类叫做样例类.样例可以理解为模板,时Scala的开发者为了给用户更好的体验,减少程序编写成本而专门设计的代码模板,在开发中经常使用.一般用于封装数据,相当于Java中的JavaBean.

1. case class定义时,所有属性都定义在默认构造(主构造),默认被val修饰此时会自动实现getter方法,也可以手动定义为var,此时默认实现getter和setter.
2. case class中默认实现了如getter,setter,toString,hashCode,equals,copy等方法.
3. 样例类实例化时可以new,也可以不写new.

```scala
package cn.tedu.scalaoop

/**
 * Case class 样例类
 * 1.使用case class 定义
 * 2.属性一般都写在主构造器中,默认使用val修饰,可以手动改为var修饰
 * 3.case class中默认实现了getter,setter,toString,equals,hashCode,copy等方法可以直接使用.
 * 4.除以上内容case class也可以定义方法.
 */
object CaseClassTest {
  def main(args: Array[String]): Unit = {
    val p1 = new Dongcc("董长春",18,'男')
    val p2 = Dongcc("董长春",18,'男')
    println(p1.equals(p2))  //true ,重写了equals方法
    println(p1) //Dongcc(董长春,18,男) 重写了toString方法
    val p3 = p1.copy()  //重写了copy方法
    println(p3)
    val i = p2.hashCode() //重写了hashCode方法
    println(i)
    p1.name = "王泽扬" //getter , setter
    println(p1,p2,p3)

    val l = Liupx("刘沛霞",18,'女')
    println(l)
  }
}

//定义一个case class用于封装数据
case class Dongcc(var name:String,var age:Int,var gender:Char)

//case class 与普通的类除了默认实现了部分方法外没有其他区别,可以定义方法继承父类等.
case class Liupx(var name:String,var age:Int,var gender:Char){
  def sayHi(): Unit ={
    println(s"大家好,我是${name},今年${age}岁了!")
  }
}

```

# 包

相对于Java,Scala中的包功能更加强大,但是使用起来也相对复杂.
Scala中包的基本功能与Java相同:
1.区分相同的类名
2.庞大项目中用于管理类(分类)
3.控制访问范围

## 定义包的基本语法

package 包名. 其中包的层级之间用.分割,包的命名规范为:只能包含数字,字母,下划线,不能以数字开头,不能使用关键字.

## 与Java包的区别

Java中.java文件在哪个包目录下,package 定义的包路径必须与实际路径相同
Scala中.scala文件不管在哪个目录下,package 定义的包路径可以与实际存在的路径不同.编译后的.class文件与package定义的路径一致.(注意:在IDEA的scala插件的不同版本中,这个特点有可能会报错,要求改变包路径或者改变文件所在目录,忽略编译错误提示直接运行是没问题的.)
注意:这一点意味着,在Scala中可以使用代码控制包.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210330172604883.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

## Scala自动引入的包

1.java.lang包
2.scala包
3.scala.Predef

```scala
package cn.tedu.scalapackage.hello

/**
 * 包
 */
object PackageTest1 {
  def main(args: Array[String]): Unit = {
    /*
    测试包的基本使用
     */
    //调用CGB讲师的sayHi()
    //与Java不同,import关键字可以在任意位置使用
    import cn.tedu.scalapackage.cgb.Teachers
    val cgb = new Teachers
    cgb.sayHi()
    //调用JSD讲师的sayHi()
    val jsd = new cn.tedu.scalapackage.jsd.Teachers
    jsd.sayHi()

    /*
    自动导入测试
     */
    val str = new String("Hello") //java.lang包
    println(str)
    val list = List(1,2,3)  //scala包
    import Predef.Map
    val map = Map() //Predef包

  }
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210330173132875.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

## Scala包的特殊用法

1.同一个文件中包可以分级定义

```scala
package cn
package tedu
package scalapackage

object packageTest3 {

}

```

2.包可以嵌套使用,嵌套时使用{}来区分层级

```scala
//定义外层包cn.tedu
package cn.tedu {
  //定义内层包scalapackage
  package scalapackage {

    object PackageTest2 {
      def main(args: Array[String]): Unit = {
        val p = Person("董长春")
        println(p.getClass.getName)
        val p2 = scalapackage2.Person("王泽扬")
        println(p2.getClass.getName)
      }
    }
    case class Person(var name:String)
  }
  //定义内层包scalapackage2
  package scalapackage2{
    case class Person(var name:String)
  }
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210330172921825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

3.子包中的类可以访问父包中的内容(就近原则,如果上层和上上层有同名类,而需要访问上上层,需要带包访问)

```scala
/**
 * 内层包可以直接访问外层内容,外层访问内层需要导包
 * 子包中的类可以访问父包中的内容(就近原则,如果上层和上上层有同名类,而需要访问上上层,需要带包访问)
 */
//定义二级包
package cn.tedu {

  /*
  测试外层访问内层需要导包
   */
  object PackageTest4{
    def main(args: Array[String]): Unit = {
      //导入内层包
      import cn.tedu.cgb.bigdata.Dongcc
      val dongcc = new Dongcc
      println(dongcc)
    }
  }

  class Teacher {
    def sayHi(): Unit = {
      println("我是一个达内讲师")
    }
  }
  //定义三级包
  package cgb {

    class Teacher {
      def sayHi(): Unit = {
        println("我是一个cgb讲师")
      }
    }

    //定义四级包
    package bigdata {

      object PackageTest4{
        def main(args: Array[String]): Unit = {
          //测试默认继承三级包
          val d = new Dongcc
          d.sayHi()

          //测试指定继承二级包
          val l = new Liupx
          l.sayHi()
        }
      }

      //定义一个类继承Teacher,就近原则(四级继承三级)
      class Dongcc extends Teacher {

      }
      //定义一个类指定继承二级包中的Teacher
      class Liupx extends cn.tedu.Teacher{

      }
    }
  }
}

```

## 包对象

在Scala中可以为每个包定义一个同名对象,这个对象叫做包对象.
包对象用package object声明,必须和所代表的包同名,并且两者必须在同一层定义
包对象中可以定义属性方法等,这些成员可以被本包中的所有class和object(包括包对象)使用.包外如果需要使用相关成员,需要导包.

```scala
package cn.tedu.scalapackage

/**
 * 包对象
 * 1.用package object声明的对象叫做包对象,包对象必须和所代表的包同名,并且两者必须在同一层定义
 * 2.包对象中可以定义属性方法等,这些成员可以直接被本包中的所有class和object(包括包对象)使用.
 * 3.包外如果需要使用相关成员,需要导包.
 */
object PackageTest5 {
  def main(args: Array[String]): Unit = {
//    sayHi() //包外无法直接访问 ,如需访问需要导包
    cn.tedu.scalapackage.cgb.sayHi()
  }
}

//定义外层包的包对象
package object cgb{
  val teacher = "董长春"
  def sayHi(): Unit ={
    println(s"${teacher}正在上课")
  }
}
//定义外层包
package cgb{
  //本包中可以直接使用包对象中的成员
  object Ptest1{
    def main(args: Array[String]): Unit = {
      println(teacher)
      sayHi()
    }
  }
  
  //子包中的object可以直接使用包对象的成员
  package python{
    object Ptest2{
      def main(args: Array[String]): Unit = {
        println(teacher)
        sayHi()
      }
    }
  }
  
  //子包中的class可以直接使用包对象的成员
  package scala{
    class Teacher{
      val name = teacher
    }
  }
  
  ///子包中的包对象也可以直接使用包对象的成员
  package object scala{
    val t = teacher
  }
}
```

## 导包的说明

1.顶部导入,与java一致
2.局部导入,在范围内可用.
3.通配符导入,import java.util.*_ (在java中使用*号)
4.给导入的类名重命名,import java.util.{HashMap => Hmap}
5.同时导入多个类,import java.util.{ArrayList,HashSet}
6.不导入某些类,import java.util.{ArrayList => *_,*_} 其中第一个*_相当于将ArrayList屏蔽,第二个**相当于通配符,代表其他所有类.
7.绝对路径导包, import \*_root**.java.util.ArrayList

```scala
package cn.tedu.scalapackage

/**
 * 导包说明
 */
//import java.util

class Test {
  def m1(): Unit = {
    //局部导包,范围外不可用
    //    import java.util.ArrayList
    //通配符导包
    //    import java.util._
    //重命名导入的类
    //    import java.util.{ArrayList=>AL}
    //    val list = new AL[String]()
    //同时导入多个类,屏蔽某个类
    //    import java.util.{ArrayList,HashMap=>_}
    //绝对路径导包
    import _root_.java.util._
    val list = new ArrayList[String]()
    list.add("hello")
  }

  //  new util.ArrayList[String]()
}

object ImportPackageTest {


}

```

# 集合

## 简介

1.Scala中集合的概念不像Java一样混乱(Arrays,Collection,Map),而是全部统一到一起,继承自同一个Trait:Traversable下的Iterable.Iterable特质下又包含了三个子特质Set,Seq,Map.
2.Scala中绝大部分的集合类,都提供了可变和不可变两个版本,分别位于一下两个包:
不可变集合:scala.collection.immutable
可变集合 :scala.collection.mutable
3.Scala中所谓的不可变集合,指的是该集合对象本身不能被修改,如果修改的话就创建一个新对象,原对象不变.可变集合就是直接对原对象进行修改.
4.为了方便区分可变和不可变,在编码时习惯性的对不可变集合的操作使用符号形式,可变集合使用方法调用的形式.提高代码易读性.

### 不可变集合关系图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401145512583.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

### 可变集合关系图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401145836901.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RjYzE1MDExMDAzMTAx,size_16,color_FFFFFF,t_70)

## 数组Array

### 不可变数组

```scala
package cn.tedu.scalacollection

/**
 * 不可变数组
 */
object ImmutableArrayTest {
  def main(args: Array[String]): Unit = {
    /*
    声明
     */
    val arr1 = new Array[Int](5)
    arr1(0) = 11
    arr1(1) = 12
    arr1(2) = 13
    arr1(3) = 14
    arr1(4) = 15

    val arr2 = Array(1, 2, 3, 4, 5)
    /*
    遍历
     */
    //1.普通for循环
    for (i <- 0 until arr1.length) println(arr1(i))
    //使用arr.indices遍历
    for (i <- arr2.indices) println(arr2(i))
    //2.增强for循环遍历
    for (num <- arr2) println(num)
    //3.迭代器
    val iter = arr1.toIterator
    while (iter.hasNext) println(iter.next())
    //4.foreach()方法
    arr2.foreach(println)
    //5.mkString直接打印
    println(arr1.mkString(","))

    /*
    添加元素
     */
    val newArr1 = arr2.:+(6)
    println(newArr1.mkString(", "))
    val newArr2 = arr2.+:(0)
    println(newArr2.mkString(", "))
    //对于不可变数组推荐使用操作符形式,要求:靠近数组对象
    val newArr3 = arr2 :+ 6 :+ 7
    println(newArr3.mkString(", "))
    val newArr4 = -1 +: 0 +: arr2
    println(newArr4.mkString(", "))
  }
}

```

### 可变数组

```scala
package cn.tedu.scalacollection

import scala.collection.mutable.ArrayBuffer

/**
 * 可变数组,ArrayBuffer
 */
object MutableArrayBufferTest {
  def main(args: Array[String]): Unit = {
    /*
    声明,需要导包
     */
    val arr1 = new ArrayBuffer[Int]() //长度默认是16
    val arr2 = ArrayBuffer(1, 2, 3, 4, 5)
    println(arr1.toString()) //默认重写了toString
    println(arr2)

    /*
    访问和遍历
    其中遍历与不可变数组通用
     */
    println(arr2(0))
    arr2.foreach(println)

    /*
    添加元素
     */
    //    arr1(0) = 10  arr1为空数组,没有访问任意下标都会报错,所以无法使用 arr1(0) = 1
    // 在不可变数组学习中,使用 :+ 或者 +: 增加元素,但是会创建新对象.在可变数组中使用+=
    arr1 += 10
    arr1 += 20
    arr1 += 30
    println(arr1)
    9 +=: arr1
    println(arr1)
    //为了区别可变不可变,提高代码易读性,可变中一般使用方法调用.
    arr1.append(40, 50, 60) //后边追加元素
    arr1.prepend(6, 7, 8) //前边插入元素
    arr1.insert(2, 999, 888) //指定位置插入元素,可多个
    println(arr1)
    arr1.appendAll(arr2) //将一个数组所有元素添加到数组中
    println(arr1)

    /*
    删除元素
     */
    println(arr2)
    //指定位置删除
    arr2.remove(0)
    println(arr2)
    //从指定位置开始删除多少个元素
    arr2.remove(0,2)
    println(arr2)
    //指定删除值为4的元素
    arr2.-=(4)
    println(arr2)

    /*
    可变数组和不可变数组之间的转换
     */
    //定义一个不可变数组
    val immutableArr = Array(1,2,3,4,5)
    //转换为可变数组
    val mutableArr = immutableArr.toBuffer
    //转换为不可变数组
    val immutableArr2 = mutableArr.toArray
    println(immutableArr.mkString(", "),immutableArr)
    println(mutableArr)
    println(immutableArr2.mkString(", "),immutableArr2)
  }
}

```

## 列表List

### 不可变列表

```scala
package cn.tedu.scalacollection

/**
 * 列表List
 */
object ListTest {
  def main(args: Array[String]): Unit = {
    /*
    声明不可变列表
     */
    val list = List(1, 2, 3, 4)
    val listNil = Nil //空List
    /*
    访问和遍历
    类似Array
     */
    println(list)
    println(list(1))
    list.foreach(println)
    /*
    添加元素
    类似Array
     */
    //在list前边添加一个元素
    val list1 = list.::(0)
    println(list1)
    //结合Nil实现列表创建
    val list2 = 1 :: 2 :: 3 :: 4 :: Nil
    println(list2)
    //:::符号还可以进行列表拼接
    val list3 = list1 ::: list2
    println(list3)
    //:::等价于++
    val list4 = list1 ++ list2
    println(list4)

  }
}

```

### 可变列表

```scala
package cn.tedu.scalacollection

import scala.collection.mutable.ListBuffer

/**
 * 可变列表ListBuffer
 */
object ListBufferTest {
  def main(args: Array[String]): Unit = {
    /*
    声明,与ArrayBuffer类似
    需要导包
     */
    val list1 = new ListBuffer[Int]()
    val list2 = ListBuffer(1,2,3,4)

    /*
    添加元素
    与ArrayBuffer基本相同
     */
    list1.append(1,2,3,4)
    11 +=: 22 +=: list1 += 33 += 44
    println(list1)
    /*
    合并list
     */
    //将list2合并到list1中
    list1 ++= list2
    println(list1)
    //将list1合并到list2中
    list1 ++=: list2
    println(list2)
    /*
    修改元素
     */
    list1(0) = 888
    list1.update(1,999)
    println(list1)

    /*
    删除元素
    与ArrayBuffer相同
     */
    list1.remove(0,5)
    list1 -= 44
    println(list1)

  }
}

```

## 集合Set

Set中元素无序不重复,可用于去重.
相对于Array和List可变和不可变类名不同,而Set中可变不可变类名是相同的.所以需要区别包的不同.

### 不可变集合

```scala
package cn.tedu.scalacollection

/**
 * 不可变Set
 */
object ImmutableSetTest {
  def main(args: Array[String]): Unit = {
    /*
    声明
     */
    val set1 = Set(1,2,3,4,4,4,4,5)
    println(set1)
    /*
    添加元素
     */
    val set2 = set1 + 6
    println(set2)

    /*
    合并Set
     */
    val set3 = Set(1,2,3,4,5)
    val set4 = Set(4,5,6,7,8)
    val set5 = set3 ++ set4
    println(set5)

    /*
    删除元素
     */
    val set6 = set3 - 1
    println(set6)
  }
}

```

### 可变集合

```scala
package cn.tedu.scalacollection

import scala.collection.mutable

/**
 * 可变Set
 */
object MutableSetTest {
  def main(args: Array[String]): Unit = {
    /*
    声明
    用报名标识mutable.Set 需要导包
     */
    val set = mutable.Set(1,2,3,4,5)
    println(set)

    /*
    添加元素
     */
    set += 6
    val f = set.add(7) //有Boolean返回值代表是否插入成功,原Set中有即返回false
    println(set,f)

    /*
    删除元素
     */
    set -= 1
    set.remove(2)
    println(set)

    /*
    合并Set
     */
    val set1 = mutable.Set(1,2,3,4)
    val set2 = mutable.Set(4,5,6,7)
    //谁调用谁改变
    set1 ++= set2
    println(set1)
  }
}

```

## 映射Map

Scala 中的Map与Java类似.

### 不可变映射

```scala
package cn.tedu.scalacollection

/**
 * 不可变Map
 */
object ImmutableMapTest {
  def main(args: Array[String]): Unit = {
    /*
    声明
    key值不能重复,重复会覆盖
     */
    val map = Map("a" -> 1, "b" -> 2, "c" -> 3)
    println(map)

    /*
    读取和遍历
     */
    //通过get方法获取的返回值为Option类型(避免空指针异常)
    val va = map.get("a")
    println(va, va.get)
    val vb = map.get("b").get
    println(vb)
    val vd = map.get("d")
    println(vd)
    val vd1 = map.getOrElse("d", 0)
    println(vd1)
    //最简单的方式就是直接map("key")
    println(map("a"))
    
    map.foreach(println)
    //注意:Map的类型表示使用Tuple2的形式
    //    map.foreach((kv: Map[String, Int]) => {
    //      println(kv)
    //    })
    map.foreach((kv: (String, Int)) => println(kv))
  }
}

```

### 可变映射

```scala
package cn.tedu.scalacollection

import scala.collection.mutable

/**
 * 可变Map
 */
object MutableMapTest {
  def main(args: Array[String]): Unit = {
    /*
    声明
     */
    val map = mutable.Map("a" -> 1 ,"b" -> 2)
    println(map)

    /*
    添加元素
     */
    map.put("c",3)
    map.put("d",4)
    map += (("f",6))
    println(map)

    /*
    删除元素
     */
    map.remove("a")
    map -= "b"
    println(map)

    /*
    修改元素
    当传入的key值不存在是相当于put
     */
    map.update("e",5)
    map.update("d",444)

    println(map)

    /*
    合并Map
    key值相同会被覆盖
     */
    val map1 = mutable.Map("a" -> 1,"b" -> 2)
    val map2 = mutable.Map("b" -> 3,"c" -> 4)
    map1 ++= map2
    println(map1)
  }
}

```

## 元组Tuple

元组是Scala中的一个在大数据领域非常常用的容器,Python中也有相同的类型,Java没有.
Scala中默认定义的Tuple最多可用存放22个元素.Tuple可以嵌套,内部元素类型没有限制可以不相同.

```scala
package cn.tedu.scalacollection
/*
元组Tuple
 */
object TupleTes {
  def main(args: Array[String]): Unit = {
    /*
    声明
     */
    val t = (1,2.2,'a',"Hello",(1,2,"Scala"))
    println(t)

    /*
    读取和遍历
     */
    println(t._5._3)
    for( t <- t.productIterator){
      println(t)
    }
  }
}

```

## 集合常用函数

（1）获取集合长度
（2）获取集合大小
（3）循环遍历
（4）迭代器
（5）生成字符串
（6）是否包含

```scala
package cn.tedu.scalacollection

/**
 * 集合通用函数
 */
object CollectionCommonOperatorTest {
  def main(args: Array[String]): Unit = {
    val list = List(1,2,3,4,5)
    //    获取集合长度
    println(list.length)
    //    获取集合大小
    println(list.size)
    //    循环遍历
    for ( elem <- list ) println(elem)
    //    迭代器
    val listIter = list.toIterator
    while(listIter.hasNext) println(listIter.next)
    //    生成字符串
    println(list)
    println(list.mkString(", "))
    //    是否包含
    println(list.contains(2))
  }
}

```

## 衍生集合

（1）获取集合的头
（2）获取集合的尾（不是头的就是尾）
（3）集合最后一个数据
（4）集合初始数据（不包含最后一个）
（5）反转
（6）取前（后）n 个元素
（7）去掉前（后）n 个元素
（8）并集
（9）交集
（10）差集
（11）拉链
（12）滑窗

```scala
package cn.tedu.scalacollection

import scala.collection.immutable.{List, Nil}

/**
 * 衍生集合
 */
object CollectionDerivedTest {
  def main(args: Array[String]): Unit = {
    val list = List(1, 2, 3, 4, 5)
    //    （1）获取集合的头
    println(list.head)
    //    （2）获取集合的尾（除去头的剩下所有元素就是尾）
    println(list.tail)
    //    （3）集合最后一个数据
    println(list.last)
    //    （4）集合初始数据（不包含最后一个）
    println(list.init)
    //    （5）反转
    var list2 = List(1, 2, 3, 4, 5)
    var result: List[Int] = Nil
    while (list2.nonEmpty) {
      result = list2.head :: result
      list2 = list2.tail
    }
    println(result)

    println(list.reverse)
    //    （6）取前（后）n 个元素
    println(list.take(3))
    println(list.takeRight(2))
    //    （7）去掉前（后）n 个元素
    println(list.drop(1))
    println(list.dropRight(2))
    //    （8）并集
    var set1 = Set(1,2,3,4,5)
    var set2 = Set(4,5,6,7,8)
    println(set1.union(set2))
    //    （9）交集
    println(set1.intersect(set2))
    //    （10）差集
    println(set1.diff(set2))
    //    （11）拉链  多出的元素被抛弃
    println(list)
    println(result)
    println(list.zip(result))
    //    （12）滑动窗口
    list.sliding(3,1).foreach(println)
    list.sliding(3,3).foreach(println) //滚动窗口

  }
}

```

## 集合计算基础函数

（1）求和
（2）求乘积
（3）最大值
（4）最小值
（5）排序

```scala
package cn.tedu.scalacollection

/**
 * 集合计算基本函数
 */
object CollectionSimpleFunctionTest {
  def main(args: Array[String]): Unit = {
    val list = List(1, 3, 4, 2, 5)
    //    （1）求和
    var sum = 0L
    for (elem <- list) sum += elem
    println(sum)
    println(list.sum)
    //    （2）求乘积
    println(list.product)
    //    （3）最大值
    println(list.max)
    val t2List = List(("a", 1), ("c", 3), ("b", 2), ("d", 4))
    println(t2List.maxBy((t: (String, Int)) => {
      t._2
    }))
    println(t2List.maxBy(_._2))
    //    （4）最小值
    println(list.min)
    //    （5）排序
    val list2 = list.sorted
    println(list2)
    println(t2List.sortBy(_._2)(Ordering[Int].reverse))
    println(list.sortWith((a, b) => {
      a > b
    }))
    println(list.sortWith(_ < _))
  }
}

```

## 集合计算的高阶函数

（1）过滤
遍历一个集合并从中获取满足指定条件的元素组成一个新的集合
（2）转化/映射（map）
将集合中的每一个元素映射到某一个函数
（3）扁平化
（4）扁平化+映射 注：flatMap 相当于先进行 map 操作，在进行 flatten 操作
集合中的每个元素的子元素映射到某个函数并返回新集合
（5）分组(group)
按照指定的规则对集合的元素进行分组
（6）简化（归约）
（7）折叠

```scala
package cn.tedu.scalacollection

/**
 * 集合计算的高阶函数
 */
object CollectionHightLevelFunctionTest {
  def main(args: Array[String]): Unit = {
    val list = List(1, 2, 3, 4, 5, 6, 7)
    //    （1）过滤
    //    遍历一个集合并从中获取满足指定条件的元素组成一个新的集合
    println(list.filter((a: Int) => {
      a % 2 == 0
    }))
    println(list.filter(_ % 2 != 0))
    //    （2）转化/映射（map）
    //    将集合中的每一个元素映射到某一个函数
    println(list.map(_ * 10))
    //    （3）扁平化
    val list2 = List(List(1, 2, 3), List(4, 5, 6), List(7, 8))
    val list3 = list2(0) ::: list2(1) ::: list2(2)
    println(list3)
    println(list2.flatten)
    //    （4）扁平化+映射 注：flatMap 相当于先进行 map 操作，在进行 flatten 操作
    //    集合中的每个元素的子元素映射到某个函数并返回新集合
    val list4 = List("hello Java", "hello Scala", "Scala Spark")
    list4.flatMap((s: String) => {
      s.split(" ")
    }).foreach(println)
    list4.flatMap(_.split(" ")).foreach(println)
    //    （5）分组(group)
    //    按照指定的规则对集合的元素进行分组
    //    按照首字母将单词进行归类分组
    val list5 = List("hadoop", "hive", "flink", "flume", "scala", "spark", "hbase")
    val wordList: Map[Char, List[String]] = list5.groupBy(_.charAt(0))
    println(wordList)
    //    （6）简化（归约）
    println(list.reduce(_ + _))
    println(list.reduceLeft(_ + _)) //从左往右
    println(list.reduceRight(_ + _)) //从右往左

    val list6 = List(1, 2, 3, 4, 5)
    println(list6.reduce(_ - _)) //-13
    println(list6.reduceLeft(_ - _)) //-13
    println(list6.reduceRight(_ - _)) // 3 ?   (1-(2-(3-(4-5))))

    //    （7）折叠
    println(list6.fold(5)(_ + _)) //初始值为5的折叠
  }
}

```

## 队列Queue

### 可变队列

```scala
package cn.tedu.scalacollection

import scala.collection.mutable

/**
 * 可变队列
 */
object MutableQueueTest {
  def main(args: Array[String]): Unit = {
    val queue = mutable.Queue[Int]()
    //入列
    queue.enqueue(1,2,3)
    println(queue)
    //出列
    queue.dequeue()
    println(queue)
  }
}

```

### 不可变队列

```scala
package cn.tedu.scalacollection

import scala.collection.immutable

/**
 * 不可变队列
 */
object ImmutableQueueTest {
  def main(args: Array[String]): Unit = {
    val queue = immutable.Queue(1, 2, 3, 4)
    //入列
    println(queue)
    val q1 = queue.enqueue(5)
    println(q1)
    //出列
    val q2 = queue.dequeue
    println(q2)
  }
}

```

## 并行集合

针对多核或分布式环境,Scala专门提供了一套并行集合.

```scala
package cn.tedu.scalacollection

/**
 * 并行集合
 * 在想要进行并行操作的位置前加.par.
 */
object ParCollectionTest {
  def main(args: Array[String]): Unit = {
    //串行
    val ids1 = (1 to 100).map((x) => {
      Thread.currentThread().getId
    })
    println(ids1)
    
    //并行
    val ids2 = (1 to 100).par.map((x) => {
      Thread.currentThread().getId
    })
    println(ids2)
  }
}

```

# 模式匹配

前边我们已经知道在Scala没有switch…case的分支结构,而是提供了更加抢到的Match模式匹配.
模式匹配不仅可以匹配值还可以匹配类型
从上到下顺序匹配，如果匹配到则不再往下匹配
都匹配不上时，会匹配到case _ ,相当于default
match 的最外面的”{ }”可以去掉看成一个语句

```sclaa
package cn.tedu

/**
 * 模式匹配
 */
object scalamatch {
  def main(args: Array[String]): Unit = {
    val o:Any = "1L"
    var result = ""
    o match {
      case 1 => {
        result = "数字1"
      }
      case 2 => {
        result = "数字2"
      }
      case _:Int => {
        result = "这是一个数字"
      }
      case _ => {
        result = "啥也不是"
      }
    }
    println(result)
  }
}

```

## 偏函数

如果一个方法中没有match 只有case，这个函数可以定义成PartialFunction偏函数。偏函数定义时，不能使用括号传参，默认定义PartialFunction中传入一个值，匹配上了对应的case,返回一个值。

```scala
package cn.tedu.scalamatch

/**
 * 偏函数
 */
object PartialFunctionTest {
  def main(args: Array[String]): Unit = {
    //测试偏函数
    println(myPartialFun(2))
  }

  //定义偏函数
  def myPartialFun: PartialFunction[Int, String] = {
    case 1 => "Scala"
    case 2 => "Spark"
    case _ => "无"
  }
}


```

# 异常处理

Scala中异常处理与Java使用方法基本一致,语法上加入了模式匹配的写法.
Java

```java
public class ExceptionDemo {
   public static void main(String[] args) {
	 try {
	 	int a = 10;
		int b = 0;
	 	int c = a / b;
	 }catch (ArithmeticException e){
		// catch 时，需要将范围小的写到前面
	 	e.printStackTrace();
	 }catch (Exception e){
	 	e.printStackTrace();
	 }finally {
	 	System.out.println("finally");
	 }
   }
}

```

1）我们将可疑代码封装在 try 块中。在 try 块之后使用了一个 catch 处理程序来捕获异
常。如果发生任何异常，catch 处理程序将处理它，程序将不会异常终止。
2）Scala 的异常的工作机制和 Java 一样，但是 Scala 没有“checked（编译期）”异常，
即 Scala 没有编译异常这个概念，异常都是在运行的时候捕获处理。
3）异常捕捉的机制与其他语言中一样，如果有异常发生，catch 子句是按次序捕捉的。
因此，在 catch 子句中，越具体的异常越要靠前，越普遍的异常越靠后，如果把越普遍的异
常写在前，把具体的异常写在后，在 Scala 中也不会报错，但这样是非常不好的编程风格。
4）finally 子句用于执行不管是正常处理还是有异常发生时都需要执行的步骤，一般用
于对象的清理工作，这点和 Java 一样。

```scala
package cn.tedu.scalaexception

/**
 * 异常
 */
object ExceptionTest {
  def main(args: Array[String]): Unit = {
    try {
      val a = 10
      val b = 0
      val c = a / b
    }catch {
      case e:ArithmeticException => {
        println("算数异常")
      }
      case _ => {
        println("发生了异常")
      }
    }finally {
      println("finally")
    }
  }
}

```

5）用 throw 关键字，抛出一个异常对象。所有异常都是 Throwable 的子类型。throw 表
达式是有类型的，就是 Nothing，因为 Nothing 是所有类型的子类型，所以 throw 表达式可
以用在需要类型的地方

```scala
def test():Nothing = {
 throw new Exception("不对")
}
```

6）java 提供了 throws 关键字来声明异常。可以使用方法定义声明异常。它向调用者函
数提供了此方法可能引发此异常的信息。它有助于调用函数处理并将该代码包含在 try-catch
块中，以避免程序异常终止。在 Scala 中，可以使用 throws 注解来声明异常

```scala
def main(args: Array[String]): Unit = {
 f11()
}
@throws(classOf[NumberFormatException])
def f11()={
 "abc".toInt
}
```

# 隐式转换

隐式转换是在Scala编译器进行类型匹配时，如果找不到合适的类型，那么隐式转换会让编译器在作用范围内自动推导出来合适的类型。
1.隐式值与隐式参数
隐式值是指在定义参数时前面加上implicit。隐式参数是指在定义方法时，方法中的部分参数是由implicit修饰【必须使用柯里化的方式，将隐式参数写在后面的括号中】。隐式转换作用就是：当调用方法时，不必手动传入方法中的隐式参数，Scala会自动在作用域范围内寻找隐式值自动传入。
隐式值和隐式参数注意：
1). 同类型的参数的隐式值只能在作用域内出现一次，同一个作用域内不能定义多个类型一样的隐式值。
2). implicit 关键字必须放在隐式参数定义的开头
3). 一个方法只有一个参数是隐式转换参数时，那么可以直接定义implicit关键字修饰的参数，调用时直接创建类型不传入参数即可。
4). 一个方法如果有多个参数，要实现部分参数的隐式转换,必须使用柯里化这种方式,隐式关键字出现在后面，只能出现一次

```scala
package cn.tedu.scalaimplicit

/**
 * 属性和参数的隐式转换
 */
object ImplicitValTest {
  //定义隐式属性
  implicit val name = "董长春"
  implicit val gender = '男'
  //定义隐式参数
  def sayHi(implicit name:String): Unit ={
    println(s"${name}你好!!!")
  }

  //如果部分参数是隐式参数,隐式参数需要使用柯里化形式单独定义,并且要定义在最后.implicit关键字只写一次.
  def sayHello(age:Int)(implicit name:String, gender:Char): Unit ={
    println(s"name = ${name}, gender = ${gender}, age = ${age}")
  }
  def main(args: Array[String]): Unit = {
    //有隐式参数的方法在调用时如果只有一个参数并且是隐式的直接使用方法名调用,传参即覆盖
    sayHi
    sayHi("王泽扬")
//    sayHi() //不能写()

    sayHello(18)
  }
}
```

2.隐式转换函数
隐式转换函数是使用关键字implicit修饰的方法。当Scala运行时，假设如果A类型变量调用了method()这个方法，发现A类型的变量没有method()方法，而B类型有此method()方法，会在作用域中寻找有没有隐式转换函数将A类型转换成B类型，如果有隐式转换函数，那么A类型就可以调用method()这个方法。
隐式转换函数注意：隐式转换函数只与函数的参数类型和返回类型有关，与函数名称无关，所以作用域内不能有相同的参数类型和返回类型的不同名称隐式转换函数。

```scala
package cn.tedu.scalaimplicit

/**
 * 隐式转换方法
 */
object ImplicitFunTest {
  def main(args: Array[String]): Unit = {
    val pig = Pig("猪猪")
    pig.fly()
  }

  //定义隐式转换方法
  implicit def pigToBird(pig: Pig): Bird = {
    new Bird(pig.name)
  }
}

class Bird(name: String) {
  def fly(): Unit = {
    println(s"${name}飞起来了!!!")
  }
}

case class Pig(val name: String)

```

3.隐式类
使用implicit关键字修饰的类就是隐式类。若一个变量A没有某些方法或者某些变量时，而这个变量A可以调用某些方法或者某些变量时，可以定义一个隐式类，隐式类中定义这些方法或者变量，隐式类中传入A即可。
隐式类注意：
1).隐式类必须定义在类，包对象，伴生对象中。
2).隐式类的构造必须只有一个参数，同一个类，包对象，伴生对象中不能出现同类型构造的隐式类。

```scala
package cn.tedu.scalaimplicit

/**
 * 隐式类
 */
object ImplicitClassTest {
  //隐式类必须在class或者object(包括包对象)中定义.
  implicit class M(m:Monkey){
    def eat(): Unit ={
      println(s"${m.name}在吃饭.")
    }
  }
  def main(args: Array[String]): Unit = {
    val sun = new Monkey("孙悟空")
    sun.eat()
  }
}
class Monkey(var name:String)

```

# 泛型

Scala中的泛型意义及作用与Java中的泛型相同,只是定义呈现形式进行了优化.

```scala
  def main(args: Array[String]): Unit = {

  }
```

在Scala中使用方括号来表示泛型.

## 协变和逆变

在Java中也有协变和逆变的概念
协变：<? extends E>
逆变： <? super E>
Scala中协变和逆变使用+ - 来表示
不变: class MyList[T] {…}
协变: class MyList[+T] {…}
逆变: class MyList[-T] {…}

```scala
package cn.tedu.scalagenerics
/**
 * 泛型Generics的协变和逆变
 */
//定义带泛型的类
//class MyList[T]{}
//class MyList[+T]{}
class MyList[-T]{}
//定义继承关系
class TEDU(){}
class CGB extends TEDU(){}
class SCD extends CGB(){}

object GenericsTest {
  def main(args: Array[String]): Unit = {
    val c1:CGB = new CGB
    val c2:TEDU = new CGB
//    val c3:SCD = new CGB    //不能用子类应用接收父类对象
    val ml1:MyList[CGB] = new MyList[CGB]
//    val ml2:MyList[TEDU] = new MyList[CGB]  //不变时不可以,协变时可以
    val ml3:MyList[SCD] = new MyList[CGB]  //不变时不可以,逆变时可以
  }
}
```

## 泛型的上下限

Scala中的泛型上限和下限与Java中类似
Java
上限：<? extends TEDU>
下限： <? super TEDU>
Scala
上限: [E <: TEDU]
下限: [E >: TEDU]

```scala
package cn.tedu.scalagenerics
/**
 * 泛型Generics的协变和逆变
 */
//定义带泛型的类
//class MyList[T]{}
//class MyList[+T]{}
class MyList[-T]{}
//定义继承关系
class TEDU(){}
class CGB extends TEDU(){}
class SCD extends CGB(){}

object GenericsTest {
  def main(args: Array[String]): Unit = {
    //测试协变和逆变
    val c1:CGB = new CGB
    val c2:TEDU = new CGB
//    val c3:SCD = new CGB    //不能用子类应用接收父类对象
    val ml1:MyList[CGB] = new MyList[CGB]
//    val ml2:MyList[TEDU] = new MyList[CGB]  //不变时不可以,协变时可以
    val ml3:MyList[SCD] = new MyList[CGB]  //不变时不可以,逆变时可以

    //测试上下限
    teach[CGB](new CGB)
    teach[SCD](new SCD)
  }
  //上下限
  def teach[E <: CGB](c: E): Unit ={
    println(c.getClass.getName)
  }
}
```

# WordCount

```scala
package cn.tedu

/**
 * WordCount词频统计
 * 读取文本文件中的数据,统计每个单词出现的次数,找到最多的三个单词.
 */
object WordCount {
  def main(args: Array[String]): Unit = {
    //导入IO包
    import io.Source
    //读取文件
    val lines = Source.fromFile("data.txt").getLines.toList
    //拆分单词
    val strings = lines.flatMap(_.split(" "))
    //将单词转化为Tuple2
    val tuples = strings.map((_, 1))
    //按照单词分组后进行统计个数
    val counted = tuples.groupBy(_._1).map(kv => (kv._1,kv._2.length))
    //打印所有统计结果
    counted.foreach(println)
    //排序找到Top3的单词
    val top3 = counted.toList.sortWith(_._2 > _._2).take(3)
    //打印Top3
    println(top3)
  }
}

```

