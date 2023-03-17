(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{1438:function(t,a,_){"use strict";_.r(a);var r=_(65),e=Object(r.a)({},(function(){var t=this,a=t.$createElement,_=t._self._c||a;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"分布式事务方案"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#分布式事务方案"}},[t._v("#")]),t._v(" 分布式事务方案")]),t._v(" "),_("p"),_("div",{staticClass:"table-of-contents"},[_("ul",[_("li",[_("a",{attrs:{href:"#什么是分布式事务"}},[t._v("什么是分布式事务")])]),_("li",[_("a",{attrs:{href:"#理论部分"}},[t._v("理论部分")]),_("ul",[_("li",[_("a",{attrs:{href:"#cap"}},[t._v("CAP")])]),_("li",[_("a",{attrs:{href:"#base"}},[t._v("BASE")])])])]),_("li",[_("a",{attrs:{href:"#分布式事务方案"}},[t._v("分布式事务方案")])])])]),_("p"),t._v(" "),_("h2",{attrs:{id:"什么是分布式事务"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#什么是分布式事务"}},[t._v("#")]),t._v(" 什么是分布式事务")]),t._v(" "),_("p",[t._v("首先这是普通事务：")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200725170613657.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center",alt:"事务"}})]),t._v(" "),_("p",[t._v("下面是分布式事务：")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200725170704723.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center",alt:"分布式事务"}})]),t._v(" "),_("p",[t._v("在微服务系统中，每个微服务应用都可能会有自己的数据库，它们首先需要控制自己的本地事务。")]),t._v(" "),_("p",[t._v("一项业务操作可能会调用执行多个微服务。如何保证多个服务执行的多个数据库的操作整体成功或整体失败？这就是分布式事务要解决的问题。")]),t._v(" "),_("h2",{attrs:{id:"理论部分"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#理论部分"}},[t._v("#")]),t._v(" 理论部分")]),t._v(" "),_("p",[t._v("CAP 和 BASE 是对大规模互联网系统分布式实践的理论总结，如果没有实践为基础理论则难以理解。")]),t._v(" "),_("p",[t._v("这里建议先对分布式事务进行实践，之后再来阅读理论来互相印证。")]),t._v(" "),_("h3",{attrs:{id:"cap"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#cap"}},[t._v("#")]),t._v(" CAP")]),t._v(" "),_("p",[t._v("请参考 "),_("a",{attrs:{href:"https://baike.baidu.com/item/CAP%E5%8E%9F%E5%88%99/5712863?fr=aladdin",target:"_blank",rel:"noopener noreferrer"}},[t._v("百度百科 - CAP原则"),_("OutboundLink")],1),t._v("。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200725172611970.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center",alt:"cap"}})]),t._v(" "),_("p",[t._v("在分布式系统中，由于网络原因出现子系统之间无法通信的情况，就会造成分区。一般分布式系统中必须容忍这种情况，那么就需要在A和C之间进行取舍。")]),t._v(" "),_("p",[_("strong",[t._v("在分布式事务中，")])]),t._v(" "),_("ul",[_("li",[t._v("如果保证CP，就意味着要让所有子系统的数据操作要么全部成功，要么全部失败，不允许有不一致的情况发生。但是强一致性会造成性能下降。")]),t._v(" "),_("li",[t._v("如果保证AP，就意味着可以牺牲一定的一致性，允许在各个子系统中存在有的数据操作成功，有的数据操作失败的情况，只要通过后续处理，能够达到最终一致即可。")])]),t._v(" "),_("h3",{attrs:{id:"base"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#base"}},[t._v("#")]),t._v(" BASE")]),t._v(" "),_("p",[t._v("请参考 "),_("a",{attrs:{href:"https://baike.baidu.com/item/CAP%E5%8E%9F%E5%88%99/5712863?fr=aladdin#4",target:"_blank",rel:"noopener noreferrer"}},[t._v("百度百科 - BASE"),_("OutboundLink")],1)]),t._v(" "),_("h2",{attrs:{id:"分布式事务方案-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#分布式事务方案-2"}},[t._v("#")]),t._v(" 分布式事务方案")]),t._v(" "),_("p",[t._v("分布式事务有以下解决方案：")]),t._v(" "),_("ul",[_("li",[t._v("XA")]),t._v(" "),_("li",[_("strong",[t._v("TCC")])]),t._v(" "),_("li",[_("strong",[t._v("Seata 框架 AT 事务")])]),t._v(" "),_("li",[t._v("SAGA")]),t._v(" "),_("li",[_("strong",[t._v("可靠消息最终一致性")])]),t._v(" "),_("li",[t._v("最大努力通知")])]),t._v(" "),_("p",[t._v("后面我们会对 "),_("code",[t._v("Seata 框架 AT 事务")]),t._v("、"),_("code",[t._v("TCC")]),t._v(" 和 "),_("code",[t._v("可靠消息最终一致性")]),t._v(" 三个方案进行实践。")])])}),[],!1,null,null,null);a.default=e.exports}}]);