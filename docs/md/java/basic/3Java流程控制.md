# Java流程控制
[[TOC]]

## 分支语句
**Java 中分支语句有三种表现形式：**

1.  ##### 最基本格式，也是最简单的格式
    

```txt
if(条件){

    满足条件所需要做的事情

}
```
**注意：条件的返回值必须是布尔类型值，也就是说只能返回 true 或 false**，可以使用之前所学的关系运算符进行条件的书写。

2.  ##### 较为完善的格式，添加了 else 关键字
    

```txt
if(条件){

    满足条件所需要做的事情

}else{

    不满足条件所需要做的事情

}
```

3.  ##### 多分支语句
    

```txt
if(条件1){   // 只要满足以下任何一个条件，剩下的判断都不再执行，以便于提高执行效率

    满足条件1所需要做的事情

}else if(条件2){

    满足条件2所需要做的事情

}else if(条件n){

    满足条件n所需要做的事情

}else{

    不满足以上所有条件所需要做的事情

}

```
**注**：所有的条件语句都是利用条件表达式的真或假来决定执行路径，Java 里不允许将一个数字作为布尔值使用，虽然这在 C 和 C++ 是允许的，如果要在布尔测试里使用一个非布尔值，需要先用一个条件表达式将其转换成布尔值，其他控制语句同理。

### switch...case结构

优点：效率高、结构清晰

缺点：只能对**整数**判断相等

switch语句是穿透的,当程序判断某个case的条件为真后,将在执行该case所带的的语句块之后，不再对后面的case的条件进行判断而直接执行。

break：跳出switch

> 常见面试题：switch可以作用于什么类型的数据上
>
> -------------------------byte,short,int,char,String,枚举类型(command)

```java
public class CommandBySwitch {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("请选择功能: 1.取款  2.存款  3.查询余额  0.退卡");
        int command = scan.nextInt();

        switch(command){
            case 1://判断是否等于1,if(num == 1)
                System.out.println("取款操作...");
                break;
            case 2:
                System.out.println("存款操作...");
                break;
            case 3:
                System.out.println("查询余额操作...");
                break;
            case 0:
                System.out.println("退卡操作...");
                break;
            default://其他case都未匹配时执行
                System.out.println("输入错误");
        }
    }
}
```



## 循环控制

**while 循环**

其语法格式如下：

```txt
初始化
while (条件){

    循环体

    迭代
}

```

**while 是关键字**，条件的返回值必须是 boolean 值，当条件返回值为 true 时，一直执行循环体，直到条件返回 false，结束循环。

**do...while结构**:先执行后判断，至少执行一次

初始化与迭代相同时，首选do...while,否则选择while

- 语法：

  ```java
  do{
     语句块
   }while(boolean);
  ```

  

- 猜数字小游戏代码(更适合用do... while):

```java
public class Guessing {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int num = (int)(Math.random()*1000+1); //1到1000之内的随机数
        System.out.println(num); //作弊

        //假设num=250
        //300(大),200(小),250(对)
        int guess;
        do{
            System.out.println("猜吧!");
            guess = scan.nextInt(); //1+3
            if(guess>num){
                System.out.println("太大了");
            }else if(guess<num){
                System.out.println("太小了");
            }else{
                System.out.println("恭喜你猜对了");
            }
        }while(guess!=num); //2
    }
}
```



**for 循环**是一种结构比较简洁的循环语句，for 是关键字。

其语法格式如下：

```txt
for(初始化; 条件; 迭代){

    循环体语句块

}

```

从上面的格式我们会发现，其实在 Java 中 for 和 while 是等价的，只是使用 for 的书写格式更为简洁，我们看看以下代码就一目了然了。

> 关键点:找到循环变量
>
> 循环变量:在整个循环过程中反复改变的那个数.
>
> 在写循环体之前,先写好循环结构,然后找到循环变量,其次确定初始化,条件和迭代,最后填充代码.
>
> 对于嵌套循环的情况,先逐行判断内层循环变量,再找外层变量.

**注意：**

-   for 循环中 初始化、条件、迭代 这三部分采用英文分号（ ；）进行分隔，这个分号不能缺少。
    
-   不管是 while 循环还是 for 循环 ，循环次数要认真设置，**尽量避免无限循环**，也就是循环停不下来的情况不要出现,没有条件的for循环是个死循环.

```java
import java.util.Scanner;  

public class ContrastString {  
    public static void main(String[] args) {  
        Scanner in = new Scanner(System.in);  
        //获取String值  
        String a = in.nextLine();  
        String b = in.nextLine();  
        if (a.length() != b.length()) {  
            System.out.println("不同");  
            return;  
        }  
        for (int i = 0; i < a.length(); i++) {  
            if (a.charAt(i) != b.charAt(i)) {  
                System.out.println("不同");  
                return;  
            }  
        }  
        System.out.println("相同");  
    }  
}  
```
### 三种循环结构如何选择

- 先看循环是否与次数相关：
  - 若相关-----------------------------直接上for
  - 若无关，再看要素1与要素3是否相同
    - 若相同-----------------------直接上do...while
    - 若不同-----------------------直接上while

## 跳转语句

#### break

在循环中，我们可以使用  `break`  和  `continue`  这两个关键字，来进一步控制流程。

`break`  表示终止整个循环,只能跳出本层循环.



#### continue

`continue`  表示忽略本次循环剩下的语句，去执行下一轮循环。

**注意：**break 和 continue 跳转语句**需要在循环语句中使用**。



## 最后
**for 和 while 语句是等价的**，也就是说完成一些循环功能时使用 for 或 while 都是可以实现的。**一般我们会做如下选择：**

-   一般循环操作，我们首先会考虑采用 for 循环语句，因为 for 的结构比较简洁，语句清晰；
    
-   如果所需要操作的循环，对于循环次数无法确定时，我们会使用 while 循环来进行操作，然后配合 break 语句来确定何时结束循环，例如：
    

```java
while(true){
    if(循环结束条件){
        break;
    }
}

```

如果无法确定循环结束条件，那么就会变成无限循环，这个一定要注意，尽量避免无限循环的书写。
