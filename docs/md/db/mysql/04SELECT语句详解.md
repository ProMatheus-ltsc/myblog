# SELECT语句详解
[[TOC]]

在数据库操作语句中，使用最频繁，也被认为最重要的是 SELECT 查询语句。之前的实验中，我们已经在不少地方用到了 `SELECT * FROM table_name;` 这条语句用于查看一张表中的所有内容。 而 SELECT 与各种限制条件关键词搭配使用，具有各种丰富的功能，这次实验就进行详细介绍。

## 基本的SELECT语句

SELECT 语句的基本格式为：

```sql
SELECT 要查询的列名 FROM 表名字 WHERE 限制条件;
```

如果要查询表的所有内容，则把 **要查询的列名** 用一个星号 `*` 号表示(实验 2、3 中都已经使用过)，代表要查询表中所有的列。 而大多数情况，我们只需要查看某个表的指定的列，比如要查看 employee 表的 name 和 age：

```sql
SELECT name,age FROM employee;
```

查询语句还可以查询常量,表达式,函数.

```sql
select '小米';
select 100 + 1;
select version()
```

### 别名--as

```sql
select name as "姓名" from emp ;
select name "姓名" from emp ;
select name 姓名 from emp ;
```

### distinct---去重

使用distinct关键字，去除重复的记录行

```sql
SELECT loc FROM dept;

SELECT DISTINCT loc FROM dept;

```

## 条件查询

### 数学符号条件

SELECT 语句常常会有 WHERE 限制条件，用于达到更加精确的查询。WHERE 限制条件可以有数学符号 (`=,<,>,>=,<=,!=,<>`) ，刚才我们查询了 name 和 age，现在稍作修改：

```sql
SELECT name,age FROM employee WHERE age>25;
```

或者查找一个名字为 Mary 的员工的 name,age 和 phone：

```sql
SELECT name,age,phone FROM employee WHERE name='Mary';
```

查询工作不是程序员的员工信息(两种写法)

```sql
select * from emp where job!="程序员";

select * from emp where job<>"程序员";
```

### "AND","NOT"与"OR"----&&和||也相同

从这两个单词就能够理解它们的作用。WHERE 后面可以有不止一条限制，而根据条件之间的逻辑关系，可以用 [`条件一 OR 条件二`] 和 [`条件一 AND 条件二`] 连接：

例如，筛选出 age 小于 25，或 age 大于 30

```sql
SELECT name,age FROM employee WHERE age<25 OR age>30;
```

```sql
#筛选出 age 大于 25，且 age 小于 30
SELECT name,age FROM employee WHERE age>25 AND age<30;
```

而刚才的限制条件 **age>25 AND age<30** ，如果需要包含 25 和 30 这两个数字的话，可以替换为 **age BETWEEN 25 AND 30** ：

### where

注意:where中不能使用列别名!!

```java
select * from emp

select * from emp where 1=1 --类似没条件

select * from emp where 1=0 --条件不成立

select * from emp where empno=100 --唯一条件

select * from emp where ename='tony' and deptno=2 --相当于两个条件的&amp;关系

select * from emp where ename='tony' or deptno=1 --相当于两个条件的|关系

select name, sal from emp where sal=1400 or sal=1600 or sal=1800;

-- 或

select name, sal from emp where sal in(1400,1600,1800);

select name, sal from emp where sal not in(1400,1600,1800);
```

## 模糊查询

### IN 和NOT IN

关键词 **IN** 和 **NOT IN** 的作用和它们的名字一样明显，用于筛选**“在”**或**“不在”**某个范围内的结果，比如说我们要查询在 **dpt3** 或 **dpt4** 的人:

```sql
SELECT name,age,phone,in_dpt FROM employee WHERE in_dpt IN ('dpt3','dpt4');
```

而 **NOT IN** 的效果则是，如下面这条命令，查询出了不在 **dpt1** 也不在 **dpt3** 的人：

```sql
SELECT name,age,phone,in_dpt FROM employee WHERE in_dpt NOT IN ('dpt1','dpt3');
```

### 通配符Like

关键字 **LIKE** 可用于实现模糊查询，常见于搜索功能中。

和 LIKE 联用的通常还有通配符，代表未知字符。SQL 中的通配符是 `_` 和 `%` 。其中 `_` 代表一个未指定字符，`%` 代表**不定个**未指定字符(包括0个)

比如，要只记得电话号码前四位数为 1101，而后两位忘记了，则可以用两个 `_` 通配符代替：

```sql
SELECT name,age,phone FROM employee WHERE phone LIKE '1101__';
```

这样就查找出了 **1101 开头的 6 位数电话号码**：

另一种情况，比如只记名字的首字母，又不知道名字长度，则用 `%` 通配符代替不定个字符：

```sql
SELECT name,age,phone FROM employee WHERE name LIKE 'J%';
```

这样就查找出了首字母为 **J** 的人.

### null

```java
select * from emp where mgr is null --过滤字段值为空的

select * from emp where mgr is not null --过滤字段值不为空的
```

### between and

```java
SELECT * FROM emp

select * from emp where sal<3000 and sal>10000

select * from emp where sal<=3000 and sal>=10000--等效

select * from emp where sal between 3000 and 10000--等效

```

## limit--分页查询

分数最高的记录：按分数排序后，limit n，返回前n条。Oracle做的很笨，实现繁琐，后期有介绍，而mysql做的很棒，语法简洁高效。在mysql中，通过limit进行分页查询：

```sql
limit 跳过的条数,请求的条数(每页的条数)
#跳过的条数=(请求的页数 - 1)*请求的条数(每页)
# 查询第1页的5条数据(1-5页)
limit 0,5
# 查询第2页的5条数据(6-10条)             
limit 5, 5
# 请求第1页的10条数据                        
limit 0,10
# 请求第3页的10条数据                        
limit 20,10
# 请求第6页的8条数数据                       
limit 40,8
```



```java
select * from emp limit 2 --列出前两条

select * from emp limit 1,2 --从第二条开始,展示2条记录

select * from emp limit 0,3 --从第一条开始,展示3条记录--前三条
```

## 对结果排序

为了使查询结果看起来更顺眼，我们可能需要对结果按某一列来排序，这就要用到 **ORDER BY** 排序关键词。默认情况下，**ORDER BY** 的结果是**升序**排列，而使用关键词 **ASC** 和 **DESC** 可指定**升序**或**降序**排序。 比如，我们**按 salary 降序排列**，SQL 语句为：

```sql
SELECT name,age,salary,phone FROM employee ORDER BY salary DESC;
```

如果后面不加 DESC 或 ASC 将默认按照升序排列。应用场景：博客系统中按时间先后顺序显示博文。

```sql
SELECT * FROM emp order by sal #默认升序

SELECT * FROM emp order by sal desc #降序
```

查询所有员工姓名,工资和部门id并且按照部门id升序排序,如果部门id一致则按照工资降序排序

```sql
select name,sal,dept_id from emp order by dept_id,sal desc;
```

## SQL内置函数与计算

SQL 允许对表中的数据进行计算。对此，SQL 有 5 个内置函数，这些函数都对 SELECT 的结果做操作：

| 函数名： | COUNT | SUM  | AVG      | MAX    | MIN    |
| -------- | ----- | ---- | -------- | ------ | ------ |
| 作用：   | 计数  | 求和 | 求平均值 | 最大值 | 最小值 |

> 其中 COUNT 函数可用于任何数据类型(因为它只是计数)，而 SUM 、AVG 函数都只能对数字类数据类型做计算，MAX 和 MIN 可用于数值、字符串或是日期时间数据类型。

具体举例，比如计算出 salary 的最大、最小值，用这样的一条语句：

```sql
SELECT MAX(salary) AS max_salary,MIN(salary) FROM employee;
```

有一个细节你或许注意到了，**使用 AS 关键词可以给值重命名**，比如最大值被命名为了 max_salary：

### 聚合 aggregation

根据一列统计结果

#### count---计数

```sql
select count(*) from emp --底层优化了

select count(1) from emp --效果和*一样

select count(comm) from emp --慢,只统计非NULL的
    
    
#查询程序员的数量
select count(*) from emp where job="程序员";
```

#### max / min---最值

```java
select max(sal) from emp --求字段的最大值

select max(sal) sal,max(comm) comm from emp

select min(sal) min from emp --获取最小值

select min(sal) min,max(sal) max from emp --最小值最大值

SELECT ename,MAX(sal) FROM emp group by ename --分组

```

#### sum / avg---求和/平均

```java
select count(*) from emp --总记录数

select sum(sal) from emp --求和

select avg(sal) from emp --平均数

```

#### 数值计算

**数值计算 + - \* / %**

查询每个员工的姓名,工资和年终奖(年终奖=5个月的工资)

```sql
select name,sal,sal*5 年终奖 from emp;
```

给3号部门的员工每人涨薪5块钱  

```sql
update emp set sal=sal+5 where dept_id=3;
```



### 分组 group

用于对查询的结果进行分组统计

group by表示分组, having 子句类似where过滤返回的结果---------where后面只能写普通字段的条件,不能包含聚合函数-------having后面可以包含聚合函数的条件,需要和group by结合使用,写在group by后面.

#### group by

```sql
#每个部门每个岗位的最高薪资和平均薪资，结果中的非聚合列必须出现在分组中，否则业务意义不对

SELECT deptno,MAX(sal),AVG(sal) FROM emp

GROUP BY deptno; #按照deptno分组

SELECT job,MAX(sal),AVG(sal) FROM emp

GROUP BY job; #按照job分组

SELECT deptno,job,MAX(sal),AVG(sal) FROM emp

GROUP BY deptno,job; #deptno和job都满足的

# 查询每个部门的平均工资
select dept_id,avg(sal) from emp group by dept_id;

# 查询每种工作的最高工资
select job,max(sal) from emp  group by job;

# 查询每种工作的人数
select job,count(*) from emp group by job;

# 查询每个部门工资高于2000的人数
select dept_id,count(*) from emp where sal>2000 group by dept_id;

# 查询每个部门有领导的员工的人数
select dept_id,count(*) from emp where manager is not null group by dept_id;
```

#### having

```sql
#平均工资小于8000的部门
select deptno, AVG(sal) from emp
group by deptno #按部门分组
having AVG(sal)<8000 #查询条件,类似where,但是group by只能配合having

#deptno出现的次数
SELECT deptno,COUNT(deptno) FROM emp

GROUP BY deptno #按deptno分组

HAVING COUNT(deptno)>1 #次数多的

# 查询每种工作的人数,只查询人数大于1 的
select job,count(*) from emp group by job having count(*)>1;
select job,count(*) c from emp group by job having c>1; # 两种写法等价
```

### 扩展

#### char和varchar有什么区别？

char为定长字符串，char(n)，n最大为255

varchar为不定长字符串，varchar(n)，n最大长度为65535

char(10)和varchar(10)存储abc，那它们有什么差别呢？

char保存10个字符，abc三个，其它会用空格补齐；而varchar只用abc三个位置。

#### datetime和timestamp有什么区别？

数据库字段提供对日期类型的支持，是所有数据类型中最麻烦的一个，慢慢使用就会体会出来。

date 是 年与日

time是 时分秒

datetime年月日时分秒，存储和显示是一样的

timestamp时间戳，存储的不是个日期，而是从1970年1月1日到指定日期的毫秒数

#### 中文乱码

如果在dos命令下执行insert插入中文数据，数据又乱码，那现在sqlYog客户端执行下面命令：

```sql
set names gbk;
```

设置客户端字符集和服务器端相同。如果不知道它到底用的什么编码？怎么办呢？很简单，两个都尝试下，哪个最后操作完成，查询数据库不乱码，就用哪个。

那为何会造成乱码呢？

Mysql数据库默认字符集是lantin1，也就是以后网页中遇到的ISO8859-1，它是英文字符集，不支持存放中文。我们创建库时，可以指定字符集：

```sql
create database yhdb charset utf8;

```

但这样很容易造成服务器和客户端编码集不同，如服务器端utf8，客户端ISO8859-1。mysql和客户端工具都有习惯的默认编码设置，好几个地方，要都统一才可以保证不乱码。

我们只要保证创建数据库时用utf8，使用可视化工具一般就基本正确。

#### 注释

/* 很多注释内容 */

\#行注释内容

– 行注释内容，这个使用较多

#### 主键、外键、唯一索引的区别？

- Primary Key 主键约束，自动创建唯一索引
- Foreign Key 外键约束，外键字段的内容是引用另一表的字段内容，不能瞎写
- Unique Index 唯一索引，唯一值但不是主键

对于约束的好处时，数据库会进行检查，违反约束会报错，操作失败。数据库提供了丰富的约束检查，还有其他约束，但现今弱化关系型数据库的前提下，基本已经很少使用，记住上面三个即可。

#### drop、delete和truncate之间的区别？

drop删除库或者表，数据和结构定义

delete和truncate只是删除表的数据

delete可以指定where条件，删除满足条件的记录，tuncate删除所有记录

对于自增字段的表，delete不会自增值清零，而truncate是把表记录和定义都删除了，然后重建表的定义，所以自增主键会重头开始计数

#### 书写顺序

```sql
select 查询的字段信息 from 表名 where 普通字段条件 group by 分组字段名 having 聚合函数条件 order by 排序字段名 limit 跳过条数,请求条数;
```

## 子查询(嵌套查询)

#### 同一个表中的子查询

```sql
# 查询工资大于2号部门平均工资的员工信息
select avg(sal) from emp where dept_id=2;
select * from emp where sal>(select avg(sal) from emp where dept_id=2);

# 查询工资最高的员工信息
select max(sal) from emp;
select * from emp where sal=(select max(sal) from emp);

# 查询和孙悟空相同工作的员工信息
select job from emp where name="孙悟空";
select * from emp where job=(select job from emp where name="孙悟空") and name!="孙悟空";

# 查询拿最低工资员工的同事们的信息(同事指同一部门)
select min(sal) from emp; # 最低工资
select dept_id from emp where sal=(select min(sal) from emp); # 最低工资的员工所在部门
select * from emp where dept_id=(select dept_id from emp where sal=(select min(sal) from emp)) and sal!=(select min(sal) from emp); # 除了该员工之外的其他部门同事
```



上面讨论的 SELECT 语句都仅涉及一个表中的数据，然而有时必须处理多个表才能获得所需的信息。例如：想要知道名为 "Tom" 的员工所在部门做了几个工程。员工信息储存在 employee 表中，但工程信息储存在 project 表中。

对于这样的情况，我们可以用子查询：

```sql
SELECT of_dpt,COUNT(proj_name) AS count_project FROM project GROUP BY of_dpt
HAVING of_dpt IN
(SELECT in_dpt FROM employee WHERE name='Tom');
```

上面代码包含两个 SELECT 语句，第二个 SELECT 语句将返回一个集合的数据形式，然后被第一个 SELECT 语句用 **in** 进行判断。

HAVING 关键字可以的作用和 WHERE 是一样的，都是说明接下来要进行条件筛选操作。

区别在于 HAVING 用于对分组后的数据进行筛选.

子查询还可以扩展到 3 层、4 层或更多层。

#### 概念

子查询是指嵌入在其他select语句中的select语句，也叫嵌套查询。子查询执行效率低慎用。记录少时效率影响不大、图方便直接使用，记录多时最好使用其它方式替代。

#### 单行子查询 =

返回结果为一个

```sql
--列出tony所在部门的所有人员

select deptno from emp where ename='tony';
select * from emp where deptno = (select deptno from emp where ename='tony');
```



#### 多行子查询 in

in子查询

```csharp
select * from emp where job in ('经理','员工');
select * from emp where job in (select distinct job from emp);
```

## 关联关系

- 指创建的表和表之间存在的业务关系 
- 有哪几种关系?
  * 一对一: 有AB两张表,A表中的一条数据对应B表中的一条数据, 同时B表中的一条数据也对应A表中的一条数据
  * 一对多:有AB两张表,A表中的一条数据对应B表中的多条数据, 同时B表中的一条数据对应A表中的一条数据
  * 多对多:有AB两张表,A表中的一条数据对应B表中的多条数据, 同时B表中的一条数据也对应A表中的多条数据
- 表和表之间如何建立关系?------通过外键字段建立关系
  * 一对一: 在任意表中添加一个建立关系的字段指向另外一张表的主键
  * 一对多: 在多的表中添加建立关系的字段(外键)指向另外一张表的主键
  * 多对多: 需要创建一个单独的关系表,里面至少包含两个字段分别指向另外两个表的主键.

## 连接查询-----关联查询

在处理多个表时，子查询只有在结果来自一个表时才有用。但如果需要显示两个表或多个表中的数据，这时就必须使用连接 **(join)** 操作。 连接的基本思想是把两个或多个表当作一个新的表来操作，如下：

### 等值连接---笛卡尔积 Cartesian product

格式:`select * from A,B where 关联关系`

```sql
SELECT id,name,people_num
FROM employee,department
WHERE employee.in_dpt = department.dpt_name
ORDER BY id;
```

这条语句查询出的是，各员工所在部门的人数，其中员工的 id 和 name 来自 employee 表，people_num 来自 department 表：

多表查询是指基于两个和两个以上的表的查询。在实际应用中，查询单个表可能不能满足你的需求，如显示员工表emp中不只显示deptno，还要显示部门名称，而部门名称dname在dept表中。

```sql
#把两个表的数据都拼接起来
SELECT * FROM dept,emp
```

上面这种查询两个表的方式称为：笛卡尔积(Cartesian product)，又称直积。一般笛卡尔积没有实际的业务意义，但多表查询都是先生成笛卡尔积，再进行数据的筛选过滤。

这点很值得注意，实际开发中尽量少用多表联查，其根本原因就在这里，查询过程中，现在内存中构建一个大大的结果集，然后再进行数据的过滤。那这个构建过程，和所使用的内存资源，包括过滤时的判断，都是既耗费资源，又浪费时间。

这就是阿里规范中禁止3张表以上的联查的原因;

### 三种连接 join

另一个连接语句格式是使用 JOIN ON 语法，刚才的语句等同于：

```sql
SELECT id,name,people_num
FROM employee JOIN department
ON employee.in_dpt = department.dpt_name
ORDER BY id;
```

结果也与刚才的语句相同。



- 内连接 inner join

  格式:`select * from A join B on 关联关系`

  ```sql
  # 查询工资高于2000的员工姓名和对应的部门名   
  select e.name,d.name,sal
  from emp e join dept d on e.dept_id=d.id where sal>2000;
  ```

- 左（外）连接 left join

  格式: `select * from A left/right join B on 关联关系`

  * 等值链接和内连接查询到的都是两张表的交集数据 
  * 外连接查询的是一张表的全部和另外一张表的交集数据

- 右（外）连接 right join

### inner join、left join、right join的区别？

- INNER JOIN两边都对应有记录的才展示，其他去掉
- LEFT JOIN左边表中的数据都出现，右边没有数据以NULL填充
- RIGHT JOIN右边表中的数据都出现，左边没有数据以NULL填充

### 案例：列出research部门下的所有员工的信息

```sql
SELECT * FROM emp
WHERE deptno = ( SELECT deptno FROM dept WHERE dname='research' )
```

### 案例：怎么用内链接 INNER JOIN 实现上面的需求？

```sql
SELECT d.dname,e.ename,e.job
FROM emp e INNER JOIN dept d

ON e.deptno=d.deptno

WHERE d.dname='research'

换成left join和right join，看看有什么不同呢？
```

### 案例：列出tony的扩展信息

```sql
SELECT *

FROM emp e INNER JOIN empext t

ON e.empno=t.empno

WHERE e.ename='tony'

换成left join和right join，看看有什么不同呢？
```

