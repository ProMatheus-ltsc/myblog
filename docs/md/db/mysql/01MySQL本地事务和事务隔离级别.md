# MySQL本地事务和事务隔离级别
[[TOC]]
## 数据库事务

数据库事务由一组sql语句组成。

所有sql语句执行成功则事务整体成功；任一条sql语句失败则事务整体失败，数据恢复到事务之前的状态。



下面以转账为例进一步说明。

A 账户向 B 账户转账，需要更新两个账户的记录：

```sql
- A 账户减金额
update user set money=money-100 where id='A'

- B 账户加金额
update user set money=money+100 where id='B'
```

- 两条sql语句都成功则转账成功。
- 任意一条sql语句失败，恢复以前的状态。

**数据操作的最小单元是事务，而不是一条sql语句！**





## Mysql 事务操作





### 开始事务

```sql
start transaction;

- 或
begin;
```

事务开始后，对数据的增删改操作不直接修改数据表，而是被记录在日志文件中。





### 提交事务

```sql
commit;
```

将日志中记录的操作，永久保存到数据表，并清空日志文件。





### 回滚事务

```sql
rollback;
```

直接清空日志文件





### Mysql 事务操作测试





#### 1.准备测试表

```sql
CREATE TABLE USER (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(128),
	`password` CHAR(32)
) CHARSET=utf8;

# 插入一条数据
INSERT INTO `user`(username,`password`) VALUES('aaa', 'aaa');
```





#### 2. 测试

打开**两个**终端，分别登录数据库。

```shell
# 在终端登录 mysql
mysql -uroot -p

# 切换到你的数据库
mysql> use 数据库名;
```

**测试一**

| 步骤 | 终端A                                               | 终端B                                                       |
| ---- | --------------------------------------------------- | ----------------------------------------------------------- |
| 1    | `begin;`                                            | `begin;`                                                    |
| 2    | `insert into user(username) values('A');`           |                                                             |
| 3    | `update user set username='X' where id=1;`          |                                                             |
| 4    |                                                     | `select * from user;` B查询不到A未提交的数据                |
| 5    | `select * from user;` A未提交的数据对于自己是可见的 |                                                             |
| 6    | `commit;`                                           |                                                             |
| 7    |                                                     | `select * from user;` 即使A已经提交，B也查询不到A提交的数据 |
| 8    |                                                     | `commit;`                                                   |
| 9    |                                                     | `select * from user;` B的事务结束后才能查询到A提交的数据    |

**测试二**

| 步骤 | 终端A                                                | 终端B                                                        |
| ---- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 1    | `rollback;` 为避免未结束的事务影响，先结束前面的事务 | `rollback;` 为避免未结束的事务影响，先结束前面的事务         |
| 2    | `begin;`                                             | `begin;`                                                     |
| 3    | `insert into user(username) values('B');`            |                                                              |
| 4    | `update user set username='Y' where id=1;`           |                                                              |
| 5    | `select * from user;`                                |                                                              |
| 6    | `commit;`                                            |                                                              |
| 7    |                                                      | `select * from user;`                                        |
| 8    |                                                      | `insert into user(username) values('C');`                    |
| 9    |                                                      | `update user set username='Z' where id=1;`                   |
| 10   |                                                      | `select * from user;`                                        |
| 11   |                                                      | `rollback;` 回滚事务，B的数据修改全部丢弃，恢复到以前的状态。**注意自增主键不会回滚** |
| 12   |                                                      | `select * from user;`                                        |





## 事务特性 ACID





### A - 原子性 Atomic

一个事务是一个不可分割的工作单元，事务中包括的操作要么都做，要么都不做。

数据操作的最小单元是事务，而不是SQL语句 。

### C - 一致性 Consistency

事务必须是使数据库从一个一致性状态变到另一个一致性状态。一致性与原子性是密切相关的。

例如：

- 转账前 a+b = 100
- 转帐后 a+b = 100

### I - 隔离性 Isolation

一个事务的执行不能被其他事务干扰。

即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。

### D - 持久性 Durancy

一个事务一旦提交，它对数据库中数据的改变就应该是永久性的。接下来的其他操作或故障不应该对其有任何影响。





## 数据库并发访问冲突问题





### 脏读

读取到其他事务未提交的数据。

### 不可重复读

- 重复读取同一数据时，与之前读取的数据不一致。
- 一个事务提交的数据，可以被另一个事务立即读取。

### 幻读

- 读取到已经被删除的数据。
- 读取不到新插入的数据。





## Mysql 的四种事务隔离级别

事务之间为了避免互相干扰，执行时要进行隔离。也就是A执行时B要等待。但严格的隔离会造成性能的下降。

数据库为了兼顾数据安全和性能，可以在一定程度上允许多个事务并行执行。

Mysql 提供了四种隔离级别从低到高：

- `READ-UNCOMMITTED`
- `READ-COMMITTED`
- `REPEATABLE-READ`
- `SERIALIZABLE`

隔离级别越高数据越安全；越低性能越好，但会造成数据访问的问题：

| 可能引发的问题 | `READ-UNCOMMITTED` | `READ-COMMITTED` | `REPEATABLE-READ` | `SERIALIZABLE` |
| -------------- | ------------------ | ---------------- | ----------------- | -------------- |
| 幻读           | `√`                | `√`              | `√`               | ×              |
| 不可重复读     | `√`                | `√`              | ×                 | ×              |
| 脏读           | `√`                | ×                | ×                 | ×              |





### Mysql 设置隔离级别

```sql
set tx_isolation='read-uncommitted';

set tx_isolation='read-committed';

# repeatable-read 是Mysql默认的隔离级别
set tx_isolation='repeatable-read';

set tx_isolation='serializable';
```

oracle mysql 8 使用 `transaction_isolation` 系统变量：

```sql
set transaction_isolation='read-uncommitted';

set transaction_isolation='read-committed';

# repeatable-read 是Mysql默认的隔离级别
set transaction_isolation='repeatable-read';

set transaction_isolation='serializable';
```





**注意：**`set`设置的变量只对当前会话有效。需要进行全局设置使用 `set global`





### Mysql 隔离级别测试

打开**两个**终端，分别登录数据库。

```shell
# 在终端登录 mysql
mysql -uroot -p

# 切换到你的数据库
mysql> use 数据库名;
```

**测试一**

| 步骤 | 终端A                                      | 终端B                                                        |
| ---- | ------------------------------------------ | ------------------------------------------------------------ |
| 1    | `set tx_isolation='read-uncommitted';`     | `set tx_isolation='read-uncommitted';`                       |
| 2    | `rollback;`                                | `rollback;`                                                  |
| 3    | `begin;`                                   | `begin;`                                                     |
| 4    | `insert into user(username) values('D');`  |                                                              |
| 5    | `update user set username='R' where id=1;` |                                                              |
| 6    |                                            | `select * from user;` 可以读取A未提交的数据，这些数据在真实数据表中并不存在 |
| 7    | `rollback;`                                |                                                              |
| 8    |                                            | `select * from user;` A回滚后，B不能再重复读取这些数据       |

**测试二**

| 步骤 | 终端A                                      | 终端B                                       |
| ---- | ------------------------------------------ | ------------------------------------------- |
| 1    | `set tx_isolation='read-committed';`       | `set tx_isolation='read-committed';`        |
| 2    | `rollback;`                                | `rollback;`                                 |
| 3    | `begin;`                                   | `begin;`                                    |
| 4    | ``                                         | `select * from user;`                       |
| 5    | `insert into user(username) values('E');`  | ``                                          |
| 6    | `update user set username='S' where id=1;` | ``                                          |
| 7    | ``                                         | `select * from user;` 不能读取A未提交的数据 |
| 8    | `commit;`                                  | ``                                          |
| 9    | ``                                         | `select * from user;` A提交后，可以立即读取 |

**测试三**

| 步骤 | 终端A                                      | 终端B                                                        |
| ---- | ------------------------------------------ | ------------------------------------------------------------ |
| 1    | `set tx_isolation='repeatable-read';`      | `set tx_isolation='repeatable-read';`                        |
| 2    | `rollback;`                                | `rollback;`                                                  |
| 3    | `begin;`                                   | `begin;`                                                     |
| 4    | ``                                         | `select * from user;`                                        |
| 5    | `insert into user(username) values('F');`  | ``                                                           |
| 6    | `update user set username='T' where id=1;` | ``                                                           |
| 7    | `commit;`                                  | ``                                                           |
| 8    | ``                                         | `select * from user;` 即使A已经提交，这里也不能读取A已提交的数据。这里读取的结果要和前一次的结果一致 |
| 9    | ``                                         | `update user set password='111';` 可以修改A已提交的数据      |
| 10    | ``                                         | `select * from user;` 修改后这些数据又变成可见的             |

**测试四**

| 步骤 | 终端A                          | 终端B                                                        |
| ---- | ------------------------------ | ------------------------------------------------------------ |
| 1    | `rollback;`                    | `rollback;`                                                  |
| 2    | `begin;`                       | `begin;`                                                     |
| 3    | ``                             | `select * from user;`                                        |
| 4    | `delete from user where id<5;` | ``                                                           |
| 5    | `commit;`                      | ``                                                           |
| 6    | ``                             | `select * from user;` 仍然可以查询到已被A删除的数据          |
| 7    | ``                             | `update user set password='222';` 但是不可能去修改这些已删除的数据 |
| 8    | ``                             | `select * from user;` 现在被删掉的数据还是可见的             |
| 9    | ``                             | `commit;`                                                    |
| 10    | ``                             | `select * from user;` 事务结束后这些数据不再可见             |