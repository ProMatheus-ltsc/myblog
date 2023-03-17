# SeataTCC模式-TCC模式介绍
[[TOC]]

## TCC 基本原理

TCC 与 Seata AT 事务一样都是**两阶段事务**，它与 AT 事务的主要区别为：

- **TCC 对业务代码侵入严重**
  每个阶段的数据操作都要自己进行编码来实现，事务框架无法自动处理。
- **TCC 效率更高**
  不必对数据加**全局锁**，允许多个事务同时操作数据。

![a](https://img-blog.csdnimg.cn/2020073022341983.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 第一阶段 Try

以账户服务为例，当下订单时要扣减用户账户金额：

![a](https://img-blog.csdnimg.cn/2020073019240411.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)

假如用户购买 100 元商品，要扣减 100 元。

TCC 事务首先对这100元的扣减金额进行预留，或者说是先冻结这100元：

![a](https://img-blog.csdnimg.cn/20200730192602828.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 第二阶段 Confirm

如果第一阶段能够顺利完成，那么说明“扣减金额”业务（分支事务）最终肯定是可以成功的。当全局事务提交时， TC会控制当前分支事务进行提交，如果提交失败，TC 会反复尝试，直到提交成功为止。

当全局事务提交时，就可以使用冻结的金额来最终实现业务数据操作：

![a](https://img-blog.csdnimg.cn/20200730214849953.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 第二阶段 Cancel

如果全局事务回滚，就把冻结的金额进行解冻，恢复到以前的状态，TC 会控制当前分支事务回滚，如果回滚失败，TC 会反复尝试，直到回滚完成为止。

![a](https://img-blog.csdnimg.cn/2020073021565349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





### 多个事务并发的情况

多个TCC全局事务允许并发，它们执行扣减金额时，只需要冻结各自的金额即可：

![a](https://img-blog.csdnimg.cn/20200730220743117.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center)





## Seata TCC事务模式

Seata 支持 TCC 事务模式，与 AT 模式相同的，也需要以下组件来支持全局事务的控制：

- TC 事务协调器
- TM 事务管理器
- RM 资源管理器

下一节，我们还是以订单业务为例，来演示 Seata 如何实现 TCC 事务。





> [项目源码：](https://gitee.com/benwang6/seata-samples) 