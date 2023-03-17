# Oracle入门
[[TOC]]
## 考试系统oracle版

### PD创建Oracle模型

![](https://img-blog.csdnimg.cn/20210608212412206.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

### 表设计

![](https://img-blog.csdnimg.cn/20210608212418880.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

## Oracle数据库

### 安装

一定要"以管理员身份运行"，Oracle是系统级别的，要安装服务，要求权限大。一般安装时把防火墙关闭，否则很容易安装失败。

![](https://img-blog.csdnimg.cn/20210608212426370.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20210608212434359.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/202106082124422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20210608212449591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20210608212456312.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210608212503634.png)

### Oracle10g EX

![](https://img-blog.csdnimg.cn/20210608212509529.png)

安装OracleXEUniv简版.exe，会自动创建EX服务。如果安装安装版本，需要手动创建本地服务。

安装完成后，侦听Listener和ServiceXE自动启动

![](https://img-blog.csdnimg.cn/20210608212516965.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

安装时，最好不要安装到c盘，选择d盘。安装时需要输入system的密码，这个一定要记住，oracle的密码是无法破解的。忘记了只能重新安装。切记。

注意：

1）默认oracle会开启8080网页服务，它跟tomcat默认8080端口冲突。可以关闭oracle的8080，或者换tomcat的默认端口。

2）oracle安装完成后，不能使用sql-plus测试是否安装成功，因为它权限非常大。可以直接和oracle通讯。可以使用plsql工具，如果可以连接，则写的程序才能正常访问。

3）如果安装失败，先停掉侦听服务，再停掉Service服务，然后运行安装包，进行卸载。

### 配置本地服务

访问远程Oracle服务端。

远程访问前，在服务器上安装Oracle服务器端，客户端安装Oracle客户端，使用PL/SQL通过Oracle客户端访问Oracle服务端。

![](https://img-blog.csdnimg.cn/20210608212531576.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

修改tnsnames.ora文件配置远程访问的地址：

```java
XEremote =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.1.105)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = XE)
    )
  )
```

### 链接错误

长时间没有访问，oracle会自动断开连接，遇到这样的情况，重新登录即可。

![](https://img-blog.csdnimg.cn/20210608212550852.png)

## 创建数据库

### 注意事项

- racle的数据库概念和mysql不同，它是创建一个账号，将所有表等都放在这个账号下。所以在oracle中的账户等同于mysql中的数据库。
- 不要将system给用户直接使用，权限太大，造成安全隐患，数据泄露，甚至删除别人的账号（数据库）。切不可给非法分子留下删库跑路的机会。所以通常给每个业务单独创建账号，单独分配权限。

### 密码安全

System账号不能修改，它是超级管理员，密码必须安全，否则非常危险，那实际开发中企业怎么设置的呢？

14yHl9t-hjCMT 疑似银河落九天-回家吃馒头

### 创建用户

![](https://img-blog.csdnimg.cn/20210608212606288.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20210608212612649.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

使用新账号ht重新登录：

![](https://img-blog.csdnimg.cn/20210608212619446.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

## PL/SQL客户端操作

### 常见错误

如果太久未访问oracle，oracle会自动关闭链接，如上午访问，中午一直未用，下午再执行SQL就报下面错误。关闭，重新打开即可。

![](https://img-blog.csdnimg.cn/20210608212632177.png)

### 选择自己的内容

![](https://img-blog.csdnimg.cn/20210608212639791.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

### 常用对象

![](https://img-blog.csdnimg.cn/2021060821264657.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

### SQL窗口

输入SQL语句执行，可以输入多条SQL，通过选中的内容进行执行，不选中执行所有。

![](https://img-blog.csdnimg.cn/20210608212653205.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

## 准备数据

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-gvZ2HAPc-1623158632844)(RackMultipart20210608-4-hbilzw_html_a7e6fe912e53f377.png)]](https://img-blog.csdnimg.cn/2021060821270050.png)

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-JMe0P5Pg-1623158632845)(RackMultipart20210608-4-hbilzw_html_2848383a5261b52b.png)]](https://img-blog.csdnimg.cn/20210608212707545.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-2uU3zxO4-1623158632846)(RackMultipart20210608-4-hbilzw_html_83808d540d7fd547.png)]](https://img-blog.csdnimg.cn/20210608212713202.png)

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-AS6AjtAu-1623158632849)(RackMultipart20210608-4-hbilzw_html_b83c4125d9fd4a40.png)]](https://img-blog.csdnimg.cn/20210608212719521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-8gRvOjD5-1623158632850)(RackMultipart20210608-4-hbilzw_html_7c55225306773b7d.png)]](https://img-blog.csdnimg.cn/20210608212724656.png)

## SQL差异

### 概念

SQL是有国际标准，如著名的SQL92

下面是SQL发展的简要历史：

1986年，ANSI X3.135-1986，ISO/IEC 9075:1986，SQL-86

1989年，ANSI X3.135-1989，ISO/IEC 9075:1989，SQL-89

1992年，ANSI X3.135-1992，ISO/IEC 9075:1992，SQL-92（SQL2）

1999年，ISO/IEC 9075:1999，SQL:1999（SQL3）

2003年，ISO/IEC 9075:2003，SQL:2003

2008年，ISO/IEC 9075:2008，SQL:2008

2011年，ISO/IEC 9075:2011，SQL:2011

从SQL:1999开始，标准简称中的短横线（-）被换成了冒号（:），而且标准制定的年份也改用四位数字了。前一个修改的原因是ISO标准习惯上采用冒号，ANSI标准则一直采用短横线。

标准是用来打破的，所以注意各数据库厂商虽然遵循了规范标准，但也自己实现了个性的内容，一些函数，存储过程等。

### 日期

```sql
Oracle默认日期格式为：dd-mon-yy 日月年。09-6月-99日期为1999年6月9日
--日期数据格式,oracle默认是:日-月-年,也可以改
 insert into stu values('王五','1','10-8月-1990','php',2)
 --修改日期格式成:年-月-日
 alter session set nls_date_format='yyyy-mm-dd';
 --以前的格式就错了,必须新格式才行
  insert into stu values('王8','1','1999-8-10','ios',5)

```

### 性别

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-uXVfKyA3-1623158632851)(RackMultipart20210608-4-hbilzw_html_ab3c4665ea92907f.png)]](https://img-blog.csdnimg.cn/20210608212804129.png)

注意性别输入汉字，在不同的oracle版本会稍有差异，我们使用的oracle 10g简版中汉字为unicode码，占3个字节。所以sex char(2)是无法存储的，修改为char(3)就可以。

### decode()

decode函数语法：decode(条件,值1,返回值1,值2,返回值2,…值n,返回值n,缺省值)

要求：显示性别，0代表女，1代表男

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-oKzeSwaS-1623158632853)(RackMultipart20210608-4-hbilzw_html_63fb71c03f174ce9.png)]](https://img-blog.csdnimg.cn/20210608212811666.png)

```sql
如果ssex的值时0就返回男,1就返回女

select sname,ssex,decode(ssex,0,&#39;男&#39;,1,&#39;女&#39;) sex from stu

```

### casewhen

```sql
select sname,ssex,
  case ssex when '0' then '女' else '男' end sex
from stu

```

### 分页

rownum它是oracle系统顺序分配为从查询返回的行的编号，返回的第一行分配的是1，第二行是2，依此类推，这个伪字段可以用于限制查询返回的总行数，且rownum不能以任何表的名称作为前缀。

利用这个伪列和两次子查询实现分页查询，如果有排序必须在线排序在分页

```sql
select top 1 * from stu						--sqlServer数据库
select * from stu limit 1					--mysql数据库
select * from stu where rownum<2			--oracle数据库

```

## 独特技术

### 过气技术

下面的技术在历史长河中已经被淘汰，但老项目，小项目依然再用，大家了解下即可。这些技术很多阿里的开发手册中已经禁止使用。

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-CU4RKxOG-1623158632854)(RackMultipart20210608-4-hbilzw_html_28e60be5f216f783.png)]](https://img-blog.csdnimg.cn/20210608212921733.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

### 虚表 dual

dual是一个虚拟表，mysql没有哦，用来构成select的语法规则，oracle保证dual里面永远只有一条记录，用它可以做很多事情。

将结果存储在dual表中：

```sql
select 1 from dual							#虚拟出一个数字列
select 'abc' from dual					#虚拟出一个字符串列
select sysdate from dual					#获取系统当前日期
select sys_guid() from dual				#获取uuid

```

### 序列 sequence

Oracle自身提供的自增主键支持，和mysql的实现思路完全不同

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-gFjJGCtm-1623158632855)(RackMultipart20210608-4-hbilzw_html_c5d2bde902261fde.png)]](https://img-blog.csdnimg.cn/20210608212937629.png)

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-mz4QvMhJ-1623158632857)(RackMultipart20210608-4-hbilzw_html_8cdd27e41d9a58dc.png)]](https://img-blog.csdnimg.cn/20210608212942364.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

```sql
--第一次访问先执行nextval
select STU_ID_SEQ.Nextval from dual
--获取当前值(必须执行过nextval)
select STU_ID_SEQ.CURRVAL from dual
--给id赋值,序列会自动+1
insert into stu(sid) values(STU_ID_SEQ.nextval)

```

### 授权视图

使用system登录，修改ht的权限为dba，否则无法创建视图。

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-CIPZFlis-1623158632858)(RackMultipart20210608-4-hbilzw_html_9553c6cb5ab68c2d.png)]](https://img-blog.csdnimg.cn/20210608213002255.png)

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-2RrEre8q-1623158632859)(RackMultipart20210608-4-hbilzw_html_678ef215c4ba83fc.png)]](https://img-blog.csdnimg.cn/20210608213006769.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

或者

使用system账户执行，分配视图权限。

grant create any view to ht;

### 视图 view

视图本质就是一个查询，和我们自己查询的区别是，它执行完会有缓存，下次查询就直接使用。但其也因为事先缓存，无法做优化，大型项目中禁止使用。

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-hJaxYCn2-1623158632860)(RackMultipart20210608-4-hbilzw_html_633a75a68e8ac734.png)]](https://img-blog.csdnimg.cn/20210608213017197.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

注意:视图只需创建一次，后面就可以类似表来使用，只是用来查询不能更新和删除

```sql
--创建视图 ,本质上就是缓存一个查询结果
create or replace view STU_V as
  select * from  stu where ssex=0
--查询表结构
select * from  stu where ssex=0 
--直接查询视图,高效,但是无法优化
select * from  STU_V
可以看到两者查询结果没有分别

```

### 触发器 trigger

记录生效点：BEFORE/AFTER
记录的操作：INSERT/UPDATE/DELETE

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-eax0JRTS-1623158632862)(RackMultipart20210608-4-hbilzw_html_eb4a60727f8a7fdc.png)] [外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-NAyXaIe2-1623158632863)(RackMultipart20210608-4-hbilzw_html_dfd691b6038c27b8.png)]](https://img-blog.csdnimg.cn/20210608213037454.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210608213051990.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI5MzI4NzY=,size_16,color_FFFFFF,t_70)

需求:当修改sex值时触发逻辑。

```sql
--设置触发器 ---禁用,因为无法控制程序员的权限,可能有安全隐患
create or replace trigger UPDATE_STU_TRI
  before update on stu  
  for each row
declare
  -- local variables here
begin
  --如果 SEX>0,统一设置成1
  IF :NEW.SSEX>5 THEN  
       :NEW.SSEX := 1;
  END IF;

end UPDATE_STU_TRI;

--使用触发器:
SELECT * FROM STU
update stu set ssex=10;--触发器执行,都是1了
update stu set ssex=3;--不满足触发器,就是3

```

### 存储过程 procedure

**概念：**

存储过程（Stored Procedure）其实就是数据库端的编程，在数据库为王的时代，虽然已经过去，当时数据库大集中，部署在超级好的服务器，甚至是小型机，所以执行的性能超群，运行在上面的程序自然也就性能极佳。但当分布式架构兴起后，数据库在整个架构中的作用一再衰落，逐步边缘化。再者存储过程中的SQL是依赖数据库厂商，每个厂商都有其个性的SQL，导致程序迁移数据库时，如从oracle迁移到mysql时基本重写，工作量巨大，造成修改的风险。于是主流方式已经将其从数据库端前置到java程序端实现，这样迁移数据库变得轻松。

**案例：**

大家浏览下就好，难不？这样的东西非常难维护和调试，这就是被禁止的原因。

```sql
set ANSI_NULLS ON
set QUOTED_IDENTIFIER ON
go

ALTER PROCEDURE  [dbo].[SP_TMS_AUTO_BILLING] (
@V_TMS_ORDER_ID              VARCHAR (32),              --订单主ID
@V_RETUREN_VALUE             VARCHAR (20)  output       --状态返回
				    )
AS
/***********************************************************************
**  Stored Procedure Documentation
**  Stored Procedure Name: SP_TMS_AUTO_BILLING
**  Creation Date: 2010-3-1
**  Author: 
**  Program ID:  
**  Input Parameters:

**  Output Parameters:

**  Return Status Values:
**  Usage:
**  Local Variables:
**  Called By:
**  Calls:
**  Data Modifications:
**  Updates:
************************************************************************/
BEGIN

	DECLARE @V_OPERATION_ITEM VARCHAR (30)     ----订单上的费用协议操作项目
	DECLARE @V_SERVICE_TYPE VARCHAR (50)        ----订单上的服务类型
	DECLARE @V_CUSTOMER_CONTRACT VARCHAR(30)   ----订单上的费用协议号
	DECLARE @V_SERVICE_LEVEL VARCHAR(30)       ----订单上的服务时限
	DECLARE @V_CHARGE_UNIT VARCHAR(20)         ----订单上的计件单位
	DECLARE @V_CARGO_TYPE VARCHAR(50)          ----订单上的货物类型
	DECLARE @V_ESTIMATED_CARGO_PACKAGES NUMERIC   ---订单上的货物件数
	DECLARE @V_ESTIMATED_CARGO_WEIGHT NUMERIC     ---订单上的货物重量
	DECLARE @V_ESTIMATED_CARGO_CUBE NUMERIC       ---订单上的货物体积
	DECLARE @V_BILLING_OFFICE VARCHAR(50)         ---订单上的结算公司
	DECLARE @V_HOME_CURRENCY VARCHAR(3)           ---结算公司本位币


	DECLARE @V_CHARGE_CODE VARCHAR(20)       ---客户计费协议费用项目中的费用代码
	DECLARE @V_CHARGE_ITEM_NAME VARCHAR(50)       ---客户计费协议费用项目中的费用名称
	DECLARE @V_RATES_NUMBER     VARCHAR(20)       ---客户计费协议费用项目中的费率号
	DECLARE @V_FRT_NAME_EN      VARCHAR(50)       ---费用英文名称

	DECLARE @V_CUST_OPERATION_ITEM_ID VARCHAR(50)    ----操作项的ID
	DECLARE @V_CUST_CONTRACT_ID VARCHAR(50)          ---计费协议ID
	DECLARE @V_CRM_CUST_ID VARCHAR(50)               ---客户ID

	DECLARE @V_CHARGE_QUANTITY NUMERIC               ----结算总量

	DECLARE @V_UNIT_PRICE NUMERIC                    ----费用单价
	DECLARE @V_CHARGE_CURRENCY VARCHAR(20)           ----费用币别
	DECLARE @V_CUST_CODE          VARCHAR(50)           ----客户代码
	DECLARE @V_EXCHANGE_RATE      NUMERIC            ----汇率

	DECLARE @V_CUST_INNER_OUTER   VARCHAR(50)        ----对内或者对外

	DECLARE @V_MIN_RATES NUMERIC                     ----计费协议里面的最低起运价
	DECLARE @V_AMOUNT NUMERIC                        ----费用表里面的amount

	---取去订单下需要的数据
	SELECT @V_SERVICE_TYPE = SERVICE_TYPE, @V_CUSTOMER_CONTRACT = CUSTOMER_CONTRACT, 
		   @V_SERVICE_LEVEL = SERVICE_LEVEL, @V_CHARGE_UNIT = CHARGE_UNIT,
		   @V_CARGO_TYPE = CARGO_TYPE, @V_ESTIMATED_CARGO_PACKAGES =ESTIMATED_CARGO_PACKAGES,
		   @V_ESTIMATED_CARGO_WEIGHT = ESTIMATED_CARGO_WEIGHT, @V_ESTIMATED_CARGO_CUBE = ESTIMATED_CARGO_CUBE,
		   @V_BILLING_OFFICE = BILLING_OFFICE, @V_HOME_CURRENCY = HOME_CURRENCY
	from TMS_ORDER
		LEFT JOIN SYS_OFFICE ON BILLING_OFFICE = OFFICE_CODE
	where TMS_ORDER_ID = @V_TMS_ORDER_ID

	---判断费用单位对应的结算总量
	IF(@V_CHARGE_UNIT = '件数')
		set @V_CHARGE_QUANTITY = @V_ESTIMATED_CARGO_PACKAGES
	ELSE IF(@V_CHARGE_UNIT = '体积')
		SET @V_CHARGE_QUANTITY = @V_ESTIMATED_CARGO_CUBE
	ELSE
		SET @V_CHARGE_QUANTITY = @V_ESTIMATED_CARGO_WEIGHT 


	----将符合的费用查找出来
	DECLARE
		V_CHARGE_CURSOR CURSOR FOR
		SELECT CRM.CHARGE_CODE, CRM.CHARGE_ITEM_NAME, SFD.FRT_NAME_EN, 
			   CRM.RATES_NUMBER, 
			   CUOI.CUST_OPERATION_ITEM_ID, CUOI.CUST_CONTRACT_ID,
			   CC.CUST_CODE, CCC.CRM_CUST_ID, CC.CUST_INNER_OUTER
		FROM CRM_CUST_CHARGE_ITEM CRM 
		LEFT JOIN CRM_CUST_OPERATION_ITEM CUOI ON CRM.CUST_OPERATION_ITEM_ID = CUOI.CUST_OPERATION_ITEM_ID
		LEFT JOIN CRM_CUST_CONTRACT CCC ON CUOI.CUST_CONTRACT_ID = CCC.CUST_CONTRACT_ID
		LEFT JOIN CRM_CUST CC ON CC.CRM_CUST_ID = CCC.CRM_CUST_ID
		LEFT JOIN SB_FRT_DEF SFD ON SFD.FRT_CODE = CRM.CHARGE_CODE
		LEFT JOIN TMS_OPERATION_ITEM TOI ON CUOI.OPERATION_ITEM=TOI.OPERATION_ITEM
		WHERE CCC.CONTRACT_NUMBER = @V_CUSTOMER_CONTRACT
		AND CUOI.SERVICE_TYPE = @V_SERVICE_TYPE
		AND CUOI.SERVICE_PERIOD = @V_SERVICE_LEVEL
		AND CUOI.CARGO_TYPE = @V_CARGO_TYPE
		AND TOI.TMS_ORDER_ID = @V_TMS_ORDER_ID
		/**
		AND EXISTS (SELECT 1 FROM TMS_OPERATION_ITEM TOI 
						WHERE CUOI.OPERATION_ITEM = TOI.OPERATION_ITEM 
						AND TMS_ORDER_ID = @V_TMS_ORDER_ID
					)
		**/

	OPEN V_CHARGE_CURSOR

	FETCH NEXT FROM V_CHARGE_CURSOR 
			INTO @V_CHARGE_CODE, @V_CHARGE_ITEM_NAME, @V_FRT_NAME_EN, @V_RATES_NUMBER, 
				 @V_CUST_OPERATION_ITEM_ID, @V_CUST_CONTRACT_ID, @V_CUST_CODE, @V_CRM_CUST_ID,
				 @V_CUST_INNER_OUTER
	IF(@@FETCH_STATUS!=0)
		set @V_RETUREN_VALUE = '没有匹配操作项'
	WHILE(@@FETCH_STATUS = 0)
		BEGIN

			set @V_RETUREN_VALUE = '自动计费完成'
			---取出费率表中符合条件的记录
			SELECT @V_UNIT_PRICE = UNIT_PRICE, @V_CHARGE_CURRENCY = CHARGE_CURRENCY, @V_MIN_RATES = MIN_RATES
			FROM CRM_CUST_CHARGE_RATE
			WHERE CHARGE_UNIT = @V_CHARGE_UNIT
			AND CUST_CONTRACT_ID = @V_CUST_CONTRACT_ID
			AND RATES_NUMBER = @V_RATES_NUMBER
			AND CHARGE_UNIT_FROM < @V_CHARGE_QUANTITY
			AND CHARGE_UNIT_TO >= @V_CHARGE_QUANTITY

			---看是否有对应的协议汇率维护
			IF(@V_UNIT_PRICE IS NULL)
				PRINT 'NO DATA'
			ELSE
				BEGIN
				----查询汇率
				SELECT @V_EXCHANGE_RATE = EXCHANGE_RATE
					from CRM_CUST_EXCHANGERATE
				WHERE CRM_CUST_ID = @V_CRM_CUST_ID
				AND LOCAL_CURRENCY_CODE = @V_HOME_CURRENCY
				AND FOREIGN_CURRENCY_CODE = @V_CHARGE_CURRENCY

				---如果不存在取系统中的汇率
				IF(@V_EXCHANGE_RATE IS NULL)
					BEGIN
						IF(@V_CUST_INNER_OUTER = 'INTERIOR')   ----判断是对内的还是对外的汇率
							SELECT @V_EXCHANGE_RATE = RATE_IN
							FROM SB_RATE
							WHERE STANDARD_CUR_CODE = @V_HOME_CURRENCY
							AND ORIGINAL_CUR_CODE = @V_CHARGE_CURRENCY
						ELSE
							SELECT @V_EXCHANGE_RATE = RATE
							FROM SB_RATE
							WHERE STANDARD_CUR_CODE = @V_HOME_CURRENCY
							AND ORIGINAL_CUR_CODE = @V_CHARGE_CURRENCY
					END

				IF(@V_EXCHANGE_RATE IS NULL)
					BEGIN
						PRINT @V_HOME_CURRENCY
						print @V_CHARGE_CURRENCY
						PRINT 'SYS NOT EXCHANGE RATE'
						RETURN 1
					END

				print @V_EXCHANGE_RATE

				----判断费用amount是否比最低起运价低，如果低，就取最低起运价，否则却当前值
				SET @V_AMOUNT = @V_UNIT_PRICE*@V_CHARGE_QUANTITY
				IF(@V_AMOUNT IS NOT NULL AND @V_MIN_RATES IS NOT NULL)
					BEGIN
						IF(@V_AMOUNT<@V_MIN_RATES)
							SET @V_AMOUNT = @V_MIN_RATES
					END						

				----插入费用表
				INSERT INTO TMS_FREIGHT(TMS_FREIGHT_ID,
										TMS_ORDER_ID,
										FRT_CODE,
										FRT_NAME,
										FRT_NAME_CN,

										RP_IND,
										UNIT_PRICE,
										CHARGE_QUANTITY,
										CHARGE_UNIT,
										BILLING_STATION,

										CUST_CODE,
										CURRENCY,
										EXCHANGE_RATE,
										AMOUNT,
										LOCAL_CURRENCY,

										LOCAL_CURRENCY_AMOUNT,
										IS_SHARE,
										NEED_SHARE,
										IS_AUTO,
										IS_SETTLE,

										IS_REVICED,
										RECORD_VERSION

										)
				SELECT	NEWID(),
						@V_TMS_ORDER_ID,
						@V_CHARGE_CODE,
						@V_FRT_NAME_EN,
						@V_CHARGE_ITEM_NAME,

						'0',
						@V_UNIT_PRICE,
						@V_CHARGE_QUANTITY,
						@V_CHARGE_UNIT,
						@V_BILLING_OFFICE,

						@V_CUST_CODE,	
						@V_CHARGE_CURRENCY,
						@V_EXCHANGE_RATE,
						@V_AMOUNT,
						@V_HOME_CURRENCY,

						@V_AMOUNT*@V_EXCHANGE_RATE,
						0,
						0,
						1,
						0,

						0,		
						1
			END
			-----插入表结束		


			FETCH NEXT FROM V_CHARGE_CURSOR 
			INTO @V_CHARGE_CODE, @V_CHARGE_ITEM_NAME, @V_FRT_NAME_EN, @V_RATES_NUMBER, 
				 @V_CUST_OPERATION_ITEM_ID, @V_CUST_CONTRACT_ID, @V_CUST_CODE, @V_CRM_CUST_ID,
				 @V_CUST_INNER_OUTER
		END
		CLOSE V_CHARGE_CURSOR
		DEALLOCATE V_CHARGE_CURSOR

END
```