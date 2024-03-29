# 函数式编程
[[TOC]]

函数式编程（英语：functional programming）或称函数程序设计，又称泛函编程，是一种编程典范，它将**计算机运算视为数学上的函数计算**，并且**避免使用程序状态以及易变对象**。

函数编程语言最重要的基础是 λ 演算（lambda calculus）。而且 λ 演算的函数可以接受函数当作输入（引数）和输出（传出值）。

## Lambda表达式

JDK8之后,java支持了lambda表达式这个特性.

- lambda可以用**更精简的代码创建匿名内部类**.但是该匿名内部类**实现的接口只能有一个抽象方法**,否则无法使用!
- lambda表达式是编译器认可的,最终会将其改为内部类编译到class文件中

```java
(参数列表)->{
    方法体
}
```

```java
package lambda;

import java.io.File;
import java.io.FileFilter;

public class LambdaDemo1 {
    public static void main(String[] args) {
        FileFilter filter = new FileFilter() {
            public boolean accept(File file) {
                return file.getName().contains("a");
            }
        };

        FileFilter filter2 = (File file)->{
            return file.getName().contains("a");
        };

        //lambda表示中参数的类型不需要指定,只需要指定参数名即可.
        FileFilter filter3 = (file)->{
            return file.getName().contains("a");
        };

        /*
            如果方法体中只有一行代码时,方法体的"{}"是可以忽略不写的.
            如果该方法需要返回值,则忽略{}的同时,return关键字也必须一同忽略不写.
         */
        FileFilter filter4 = (file)->file.getName().contains("a");

        /*
            如果参数只有一个,则参数列表的"()"可以忽略不写
         */
        FileFilter filter5 = file->file.getName().contains("a");

        File dir = new File(".");
        if(dir.isDirectory()){
            File[] subs = dir.listFiles(file->file.getName().contains("a"));
        }
    }
}
```



一个 Lambda 表达式具有下面这样的语法特征。它由三个部分组成：

第一部分为一个括号内用逗号分隔的参数列表，参数即函数式接口里面方法的参数；

第二部分为一个箭头符号：`->`；

第三部分为方法体，可以是表达式和代码块。语法如下：

```java
parameter -> expression body
```

Lambda 表达式的几个最重要的特征：

- 可选的类型声明：你不用去声明参数的类型。编译器可以从参数的值来推断它是什么类型。
- 可选的参数周围的括号：你可以不用在括号内声明单个参数。但是对于很多参数的情况，括号是必需的。
- 可选的大括号：如果表达式体里面只有一个语句，那么你不必用大括号括起来。
- 可选的返回关键字：如果表达式体只有单个表达式用于值的返回，那么编译器会自动完成这一步。若要指示表达式来返回某个值，则需要使用大括号。

```java
public class LambdaTest {
    public static void main(String args[]){
                LambdaTest tester = new LambdaTest();

          // 带有类型声明的表达式
          MathOperation addition = (int a, int b) -> a + b;

          // 没有类型声明的表达式
          MathOperation subtraction = (a, b) -> a - b;

          // 带有大括号、带有返回语句的表达式
          MathOperation multiplication = (int a, int b) -> { return a * b; };

          // 没有大括号和return语句的表达式
          MathOperation division = (int a, int b) -> a / b;

          // 输出结果
          System.out.println("10 + 5 = " + tester.operate(10, 5, addition));
          System.out.println("10 - 5 = " + tester.operate(10, 5, subtraction));
          System.out.println("10 x 5 = " + tester.operate(10, 5, multiplication));
          System.out.println("10 / 5 = " + tester.operate(10, 5, division));

          // 没有括号的表达式
          GreetingService greetService1 = message ->
          System.out.println("Hello " + message);

          // 有括号的表达式
          GreetingService greetService2 = (message) ->
          System.out.println("Hello " + message);

          // 调用sayMessage方法输出结果
          greetService1.sayMessage("Shiyanlou");
          greetService2.sayMessage("Classmate");
       }

       // 下面是定义的一些接口和方法

       interface MathOperation {
          int operation(int a, int b);
       }

       interface GreetingService {
          void sayMessage(String message);
       }

       private int operate(int a, int b, MathOperation mathOperation){
          return mathOperation.operation(a, b);
       }
}
```

语言的设计者们思考了很多如何让现有的功能和 Lambda 表达式友好兼容。于是就有了函数接口这个概念。**函数接口是一种只有一个方法的接口**，函数接口可以隐式地转换成 Lambda 表达式。

>  函数式接口的重要属性是：我们能够使用 Lambda 实例化它们，Lambda 表达式让你能够将函数作为方法参数，或者将代码作为数据对待。Lambda 表达式的引入给开发者带来了不少优点：在 Java 8 之前，匿名内部类，监听器和事件处理器的使用都显得很冗长，代码可读性很差，Lambda 表达式的应用则使代码变得更加紧凑，可读性增强；Lambda 表达式使并行操作大集合变得很方便，可以充分发挥多核 CPU 的优势，更易于为多核处理器编写代码。*引用自 [IBM - Java 8 新特性概述](http://www.ibm.com/developerworks/cn/java/j-lo-jdk8newfeature/index.html)。*





需要注意的是：

- Lambda 表达式优先用于定义功能接口在行内的实现，即单个方法只有一个接口。在上面的例子中，我们用了多个类型的 Lambda 表达式来定义 `MathOperation` 接口的操作方法。然后我们定义了 `GreetingService `的` sayMessage `的实现。
- Lambda 表达式让匿名类不再需要，这为 Java 增添了简洁但实用的函数式编程能力。

### 作用域

可以通过下面这段代码来学习 Lambda 的作用域。

```java
public class LambdaTest {
        final static String salutation = "Hello "; //正确，不可再次赋值
        //static String salutation = "Hello "; //正确，可再次赋值
        //String salutation = "Hello "; //报错
        //final String salutation = "Hello "; //报错

    public static void main(String args[]){
        //final String salutation = "Hello "; //正确，不可再次赋值
        //String salutation = "Hello "; //正确，隐性为 final , 不可再次赋值

        // salution = "welcome to "
        GreetingService greetService1 = message ->
        System.out.println(salutation + message);
        greetService1.sayMessage("Shiyanlou");
    }

    interface GreetingService {
       void sayMessage(String message);
    }
}
```



可以得到以下结论：

- 可访问 `static` 修饰的成员变量，如果是 `final static` 修饰，不可再次赋值，只有 `static` 修饰可再次赋值；
- 可访问表达式外层的 `final` 局部变量（不用声明为 `final`，隐性具有 `final` 语义），不可再次赋值。

### 方法引用

方法引用提供了一个很有用的语义来直接访问类或者实例的已经存在的方法或者构造方法。

方法引用可以通过方法的名字来引用其本身。方法引用是通过 `::` 符号（双冒号）来描述的。

它可以用来引用下列类型的方法：

- 构造器引用。语法是 `Class::new`，或者更一般的 `Class<T>::new`，要求构造器方法是没有参数；
- 静态方法引用。语法是 `Class::static_method`。
- 特定类的任意对象方法引用。它的语法是 `Class::method`。
- 特定对象的方法引用，它的语法是 `instance::method`。

更多对于方法引用的介绍，可以参考这一篇博文—— [java8 - 方法引用(method referrance)](http://blog.csdn.net/wwwsssaaaddd/article/details/37573517)

```java
// LambdaTest.java
import java.util.List;
import java.util.ArrayList;

public class LambdaTest {

    public static void main(String args[]){
        List<String> names = new ArrayList<>();

        names.add("Peter");
        names.add("Linda");
        names.add("Smith");
        names.add("Zack");
        names.add("Bob");

        //     通过System.out::println引用了输出的方法
        names.forEach(System.out::println);
    }
}
```



## 函数式接口

函数式接口是只包含一个方法的接口。例如，带有单个 `compareTo` 方法的比较接口，被用于比较的场合。Java 8 开始定义了大量的函数式接口来广泛地用于 lambda 表达式。



### `java.util.function`

`java.util.function` 包中包含了大量的函数式接口，基本可以满足我们的日常开发需求。

下面是部分函数式接口的列表。

| 接口                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `BiConsumer<T,U>`      | 该接口代表了接收两个输入参数 T、U，并且没有返回的操作        |
| `BiFunction<T,U,R>`    | 该接口代表提供接收两个参数 T、U，并且产生一个结果 R 的方法   |
| `BinaryOperator`       | 代表了基于两个相同类型的操作数，产生仍然是相同类型结果的操作 |
| `BiPredicate<T,U>`     | 代表了对两个参数的断言操作（基于 Boolean 值的方法）          |
| `BooleanSupplier`      | 代表了一个给出 Boolean 值结果的方法                          |
| `Consumer`             | 代表了接受单一输入参数并且没有返回值的操作                   |
| `DoubleBinaryOperator` | 代表了基于两个 Double 类型操作数的操作，并且返回一个 Double 类型的返回值 |
| `DoubleConsumer`       | 代表了一个接受单个 Double 类型的参数并且没有返回的操作       |
| `DoubleFunction`       | 代表了一个接受 Double 类型参数并且返回结果的方法             |
| `DoublePredicate`      | 代表了对一个 Double 类型的参数的断言操作                     |
| `DoubleSupplier`       | 代表了一个给出 Double 类型值的方法                           |
| `DoubleToIntFunction`  | 代表了接受单个 Double 类型参数但返回 Int 类型结果的方法      |
| `DoubleToLongFunction` | 代表了接受单个 Double 类型参数但返回 Long 类型结果的方法     |
| `DoubleUnaryOperator`  | 代表了基于单个 Double 类型操作数且产生 Double 类型结果的操作 |
| `Function<T,R>`        | 代表了接受一个参数并且产生一个结果的方法                     |
| `IntBinaryOperator`    | 代表了对两个 Int 类型操作数的操作，并且产生一个 Int 类型的结果 |
| `IntConsumer`          | 代表了接受单个 Int 类型参数的操作，没有返回结果              |
| `IntFunction`          | 代表了接受 Int 类型参数并且给出返回值的方法                  |
| `IntPredicate`         | 代表了对单个 Int 类型参数的断言操作                          |

更多的接口可以参考 Java 官方 API 手册：[java.lang.Annotation Type FunctionalInterface](https://docs.oracle.com/javase/8/docs/api/java/lang/FunctionalInterface.html)。在实际使用过程中，加有 `@FunctionalInterface` 注解的方法均是此类接口，位于 [java.util.Funtion](http://docs.oracle.com/javase/8/docs/api/java/util/function/package-frame.html) 包中。

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

public class FunctionTest {
   public static void main(String args[]){
      List<Integer> list = Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

      System.out.println("All of the numbers:");

      eval(list, n->true);

      System.out.println("Even numbers:");
      eval(list, n-> n%2 == 0 );

      System.out.println("Numbers that greater than  5:");
      eval(list, n -> n > 5 );
   }

   public static void eval(List<Integer> list, Predicate<Integer> predicate) {
      for(Integer n: list) {

         if(predicate.test(n)) {
            System.out.println(n);
         }
      }
   }
}
```



### Predicate

Predicate 是 Java 提供的一个函数式接口，他接受一个参数 `t`，并执行断言操作返回一个 `boolean`。接口内容如下（这里没有列出接口中提供的默认方法）：

```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
}
```

```java
import java.util.Random;
import java.util.function.IntPredicate;
import java.util.function.Predicate;
import java.util.stream.IntStream;

public class PredicateDemo {
   public static void main(String[] args) {
      //简单使用  判断a是否大于50
      Predicate<Integer> predicate = a -> a > 50;
      System.out.println(predicate.test(52));
      //如果只断言int类型，可以直接使用 IntPredicate
      IntPredicate intPredicate = a -> a > 50;
      // System.out.println(intPredicate.test(50));
      IntStream.of(10,11,44,59,46,55,99,88,50)
               //结合filter过滤数字 小于或等于50的数字被过滤
               .filter(intPredicate)
               .peek(System.out::println).count();
    }
}
```

## 练习题

需求:

- 建立一个数组 `1, 23, 4, 4, 22, 34, 45, 11, 33`；
- 使用 lambda 求出数组中的最小数；
- 将数组去重，并将去重后数组的每个元素乘以 2，再求出乘以 2 后的数组的和，比如数组 `1,2,3,3`，去重后为 `1,2,3`，乘以 2 后为 `2,4,6`，最后的和为 `12`。

代码:

```java
import java.util.Arrays;

public class LambdaTest {
    public static void main(String[] args) {
        int[] arr = {1, 23, 4, 4, 22, 34, 45, 11, 33};
        System.out.println("最小数："+Arrays.stream(arr).min());
        System.out.println("数组去重乘2求和：" + Arrays.stream(arr).distinct().map((i) -> i * 2).sum());
    }
}
```



## Stream流

Stream 是 Java 8 开始的一个新的抽象层。**通过使用 Stream，你能以类似于 SQL 语句的声明式方式处理数据。**

例如一个典型的 SQL 语句能够自动地返回某些信息，而不用在开发者这一端做任何的计算工作。同样，通过使用 Java 的集合框架，开发者能够利用循环做重复的检查。另外一个关注点是效率，就像多核处理器能够提升效率一样，开发者也可以通过并行化编程来改进工作流程，但是这样很容易出错。

因此，Stream 的引入是为了解决上述痛点。**开发者可以通行声明式数据处理，以及简单地利用多核处理体系而不用写特定的代码。**

Stream 代表了来自某个源的对象的序列，这些序列支持聚集操作。下面是 Stream 的一些特性：

- 元素序列：Stream 以序列的形式提供了特定类型的元素的集合。根据需求，它可以获得和计算元素，但不会储存任何元素。
- 源：Stream 可以将集合、数组和 I/O 资源作为输入源。
- 聚集操作：Stream 支持诸如 `filter`、`map`、`limit`、`reduce` 等的聚集操作。
- 流水技术：许多 Stream 操作返回了流本身，故它们的返回值可以以流水的行式存在。这些操作称之为中间操作，并且它们的功能就是负责输入、处理和向目标输出。`collect()` 方法是一个终结操作，通常存在于流水线操作的末端，来标记流的结束。
- 自动迭代：Stream 的操作可以基于已提供的源元素进行内部的迭代，而集合则需要显式的迭代。

### 相关的方法介绍

集合的接口有两个方法来产生流：

- `stream()`：该方法返回一个将集合视为源的连续流。
- `parallelStream()`：该方法返回一个将集合视为源的并行流。

其他相关方法：

- `forEach`：该方法用于对 Stream 中的每个元素进行迭代操作。下面的代码段演示了如何使用 forEach 方法输出 10 个随机数。

```java
Random random = new Random();
random.ints().limit(10).forEach(System.out::println);
```

- `map`：该方法用于将每个元素映射到对应的结果上。下面的代码段演示了怎样用 map 方法输出唯一的某个数的平方。

  ```java
  List<Integer> numbers = Arrays.asList(2, 3, 3, 2, 5, 2, 7);
  //get list of unique squares
  List<Integer> squaresList = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
  ```

- `filter`：该方法用于过滤满足条件的元素。下面的代码段演示了怎样输出使用了过滤方法的空字符串数量。

```java
List<String>strings = Arrays.asList("efg", "", "abc", "bc", "ghij","", "lmn");
//get count of empty string
long count = strings.stream().filter(string -> string.isEmpty()).count();
```

- `limit`：该方法用于减少 Stream 的大小。下面的代码段演示了怎样有限制地输出 10 个随机数。

```java
Random random = new Random();
random.ints().limit(10).forEach(System.out::println);
```

- `sorted`：该方法用于对 Stream 排序。下面的代码段演示了怎样以有序的形式输出 10 个随机数。

```java
Random random = new Random();
random.ints().limit(10).sorted().forEach(System.out::println);
```

##### 并行处理

ParallelStream 是 Stream 用于并行处理的一种替代方案。下面的代码段演示了如何使用它来输出空字符串的数量。

```java
List<String> strings = Arrays.asList("efg", "", "abc", "bc", "ghij","", "lmn");

// 获得空字符串的计数
long count = strings.parallelStream().filter(String::isEmpty).count();
```

当然，在连续的 Stream 与并行的 Stream 之间切换是很容易的。

##### Collector

Collector 用于合并 Stream 的元素处理结果。它可以用于返回一个字符串列表。

下面的代码段演示了如何使用它。

```java
List<String>strings = Arrays.asList("efg", "", "abc", "bc", "ghij","", "lmn");
List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());

System.out.println("Filtered List: " + filtered);

String mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(", "));

System.out.println("Merged String: " + mergedString);
```

##### 统计工具

Stream 处理完成后使用 Collector 来统计数据。

下面的代码段演示了如何使用它。

```java
List<Integer> numbers = Arrays.asList(2, 3, 3, 2, 5, 2, 7);

IntSummaryStatistics stats = numbers.stream().mapToInt((x) -> x).summaryStatistics();

System.out.println("Highest number in List : " + stats.getMax());
System.out.println("Lowest number in List : " + stats.getMin());
System.out.println("Sum of all numbers : " + stats.getSum());
System.out.println("Average of all numbers : " + stats.getAverage());
```

### 编程实例

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.Map;

public class StreamTest {
   public static void main(String args[]){
      System.out.println("Using Java 7: ");

      // 统计空字符串的数量
      List<String> strings = Arrays.asList("efg", "", "abc", "bc", "ghij","", "lmn");
      System.out.println("List: " +strings);
      long count = getCountEmptyStringUsingJava7(strings);

      System.out.println("Empty Strings: " + count);
      count = getCountLength3UsingJava7(strings);

      System.out.println("Strings of length 3: " + count);

      // 消除空字符串
      List<String> filtered = deleteEmptyStringsUsingJava7(strings);
      System.out.println("Filtered List: " + filtered);

      // 消除空字符串，同时使用逗号来连接
      String mergedString = getMergedStringUsingJava7(strings,", ");
      System.out.println("Merged String: " + mergedString);
      List<Integer> numbers = Arrays.asList(2, 3, 3, 2, 5, 2, 7);

      // 获得不同数字的平方的列表
      List<Integer> squaresList = getSquares(numbers);
      System.out.println("Squares List: " + squaresList);
      List<Integer> integers = Arrays.asList(1,2,13,4,15,6,17,8,19);

      System.out.println("List: " +integers);
      System.out.println("Highest number in List : " + getMax(integers));
      System.out.println("Lowest number in List : " + getMin(integers));
      System.out.println("Sum of all numbers : " + getSum(integers));
      System.out.println("Average of all numbers : " + getAverage(integers));


      // 输出10个随机数
          System.out.println("Random Numbers: ");
      Random random = new Random();

      for(int i=0; i < 10; i++){
         System.out.println(random.nextInt());
      }



      // 使用Java 8的新特性

      System.out.println("Using Java 8: ");
      System.out.println("List: " +strings);

      count = strings.stream().filter(string->string.isEmpty()).count();
      System.out.println("Empty Strings: " + count);

      count = strings.stream().filter(string -> string.length() == 3).count();
      System.out.println("Strings of length 3: " + count);

      filtered = strings.stream().filter(string ->!string.isEmpty()).collect(Collectors.toList());
      System.out.println("Filtered List: " + filtered);

      mergedString = strings.stream().filter(string ->!string.isEmpty()).collect(Collectors.joining(", "));
      System.out.println("Merged String: " + mergedString);

      squaresList = numbers.stream().map( i ->i*i).distinct().collect(Collectors.toList());
      System.out.println("Squares List: " + squaresList);
      System.out.println("List: " +integers);

      IntSummaryStatistics stats = integers.stream().mapToInt((x) ->x).summaryStatistics();

      // 输出结果
      System.out.println("Highest number in List : " + stats.getMax());
      System.out.println("Lowest number in List : " + stats.getMin());
      System.out.println("Sum of all numbers : " + stats.getSum());
      System.out.println("Average of all numbers : " + stats.getAverage());
      System.out.println("Random Numbers: ");

      random.ints().limit(10).sorted().forEach(System.out::println);

      // 并行处理
      count = strings.parallelStream().filter(string -> string.isEmpty()).count();
      System.out.println("Empty Strings: " + count);
   }

   // 使用Java 7版本就提供的API来计算空串数量
   private static int getCountEmptyStringUsingJava7(List<String> strings){
      int count = 0;

      for(String string: strings){

         if(string.isEmpty()){
            count++;
         }
      }
      return count;
   }

   // 使用Java 7版本就提供的API来计算长度为3字符的字符串数量
   private static int getCountLength3UsingJava7(List<String> strings){
      int count = 0;

      for(String string: strings){

         if(string.length() == 3){
            count++;
         }
      }
      return count;
   }

   // 使用Java 7版本就提供的API来删除空串
   private static List<String> deleteEmptyStringsUsingJava7(List<String> strings){
      List<String> filteredList = new ArrayList<String>();

      for(String string: strings){

         if(!string.isEmpty()){
             filteredList.add(string);
         }
      }
      return filteredList;
   }

   // 使用Java 7版本就提供的API来获取合并后的字符串
   private static String getMergedStringUsingJava7(List<String> strings, String separator){
      StringBuilder stringBuilder = new StringBuilder();

      for(String string: strings){

         if(!string.isEmpty()){
            stringBuilder.append(string);
            stringBuilder.append(separator);
         }
      }
      String mergedString = stringBuilder.toString();
      return mergedString.substring(0, mergedString.length()-2);
   }


   // 自定义的用于计算数字的平方的方法
   private static List<Integer> getSquares(List<Integer> numbers){
      List<Integer> squaresList = new ArrayList<Integer>();

      for(Integer number: numbers){
         Integer square = new Integer(number.intValue() * number.intValue());

         if(!squaresList.contains(square)){
            squaresList.add(square);
         }
      }
      return squaresList;
   }

   // 自定义的用于获得List中最大值的方法
   private static int getMax(List<Integer> numbers){
      int max = numbers.get(0);

      for(int i=1;i < numbers.size();i++){

         Integer number = numbers.get(i);

         if(number.intValue() > max){
            max = number.intValue();
         }
      }
      return max;
   }

   // 自定义的用于获得List中最小值的方法
   private static int getMin(List<Integer> numbers){
      int min = numbers.get(0);

      for(int i=1;i < numbers.size();i++){
         Integer number = numbers.get(i);

         if(number.intValue() < min){
            min = number.intValue();
         }
      }
      return min;
   }

   // 自定义的用于获得List中各个数字的和的方法
   private static int getSum(List<Integer> numbers){
      int sum = (int)(numbers.get(0));

      for(int i=1;i < numbers.size();i++){
         sum += (int)numbers.get(i);
      }
      return sum;
   }

   // 自定义的用于获得List中各个数字的平均值的方法
   private static int getAverage(List<Integer> numbers){
      return getSum(numbers) / numbers.size();
   }
}
```



## FlatMap

FlatMap 用于将多个流合并为一个流，使用 FlatMap 时，表达式的返回值必须是 Stream 类型。而 Map 用于将一种流转化为另外一个流。

### 编程实例

```java
import java.util.Arrays;
import java.util.stream.Stream;

public class FlatMapTest {
    public static void main(String[] args) {
        Stream<String> stringStream1 = Stream.of("shi yan", "shi yan lou","lou yan shi");
        Stream<String> stringStream2 = Stream.of("shi yan", "shi yan lou","lou yan shi");
        Stream<String[]> mapStream = stringStream1
                //map将一种类型的流 转换为另外一个类型的流  这里转换成了String[]流
                //这并不是我们想要的，我们想要的是Stream<String>,而不是Stream<String[]>
                .map(v -> v.split(" "));
        Stream<String> flatMapStream = stringStream2
                //Arrays.stream将数组转换成了流 这里将分割后的String[]，转换成了Stream<String>，但是我们前面定义了三个字符串
                //所以这里将产生三个Stream<String>，flatMap用于将三个流合并成一个流
                .flatMap(v -> Arrays.stream(v.split(" ")));
        System.out.println("mapStream打印：");
        mapStream.peek(System.out::println).count();
        System.out.println("flatMapStream打印：");
        flatMapStream.peek(System.out::println).count();

    }
}
```

合并流:

```java
import java.util.stream.Stream;

public class MergerStream {
    public static void main(String[] args) {
        Stream<Integer> stream1 = Stream.of(1, 2, 3);
        Stream<Integer> stream2 = Stream.of(4, 5, 6);
        Stream<Integer> stream3 = Stream.of(7, 8, 9);
        Stream<Integer> mergerStream = Stream.of(stream1, stream2, stream3).flatMap((i) -> i);
        mergerStream.forEach(System.out::print);
    }
}
```