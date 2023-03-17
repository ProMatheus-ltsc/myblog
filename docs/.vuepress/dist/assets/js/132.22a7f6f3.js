(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{1448:function(s,a,t){"use strict";t.r(a);var e=t(65),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"elasticsearch-docker搭建es"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#elasticsearch-docker搭建es"}},[s._v("#")]),s._v(" Elasticsearch-Docker搭建ES")]),s._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#关闭防火墙"}},[s._v("关闭防火墙")])]),t("li",[t("a",{attrs:{href:"#安装docker"}},[s._v("安装Docker")])]),t("li",[t("a",{attrs:{href:"#下载-elastic-search-镜像"}},[s._v("下载 Elastic Search 镜像")])]),t("li",[t("a",{attrs:{href:"#集群部署结构"}},[s._v("集群部署结构")])]),t("li",[t("a",{attrs:{href:"#准备虚拟网络和挂载目录"}},[s._v("准备虚拟网络和挂载目录")])]),t("li",[t("a",{attrs:{href:"#设置-max-map-count"}},[s._v("设置 maxmapcount")])]),t("li",[t("a",{attrs:{href:"#启动-elasticsearch-集群"}},[s._v("启动 Elasticsearch 集群")])])])]),t("p"),s._v(" "),t("h2",{attrs:{id:"关闭防火墙"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关闭防火墙"}},[s._v("#")]),s._v(" 关闭防火墙")]),s._v(" "),t("p",[s._v("后面我们要使用多个端口，为了避免繁琐的开放端口操作，我们关掉防火墙")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 关闭防火墙")]),s._v("\nsystemctl stop firewalld.service\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 禁用防火墙")]),s._v("\nsystemctl disable firewalld.service\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"安装docker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装docker"}},[s._v("#")]),s._v(" 安装Docker")]),s._v(" "),t("p",[s._v("我们使用 Docker 来运行 Elasticsearch，首先安装 Docker，参考下面笔记：")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://promatheus-ltsc.github.io/matheusblog/md/devops/docker/02Docker%E5%AE%89%E8%A3%85%E5%AE%9E%E8%B7%B5.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker笔记"),t("OutboundLink")],1),s._v(")")]),s._v(" "),t("h2",{attrs:{id:"下载-elastic-search-镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#下载-elastic-search-镜像"}},[s._v("#")]),s._v(" 下载 Elastic Search 镜像")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull elasticsearch:7.9.3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"集群部署结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#集群部署结构"}},[s._v("#")]),s._v(" 集群部署结构")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201024193959184.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center",alt:"a"}})]),s._v(" "),t("p",[s._v("在一台服务器上，使用Docker部署三个ES容器组成的集群")]),s._v(" "),t("h2",{attrs:{id:"准备虚拟网络和挂载目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#准备虚拟网络和挂载目录"}},[s._v("#")]),s._v(" 准备虚拟网络和挂载目录")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建虚拟网络")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" network create es-net\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# node1 的挂载目录")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p -m "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" /var/lib/es/node1/plugins\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p -m "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" /var/lib/es/node1/data\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# node2 的挂载目录")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p -m "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" /var/lib/es/node2/plugins\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p -m "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" /var/lib/es/node2/data\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# node3 的挂载目录")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p -m "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" /var/lib/es/node3/plugins\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p -m "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" /var/lib/es/node3/data\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("h2",{attrs:{id:"设置-max-map-count"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置-max-map-count"}},[s._v("#")]),s._v(" 设置 max_map_count")]),s._v(" "),t("p",[s._v("必须修改系统参数 "),t("code",[s._v("max_map_count")]),s._v("，否则 Elasticsearch 无法启动：")]),s._v(" "),t("p",[s._v("在 "),t("code",[s._v("/etc/sysctl.conf")]),s._v(" 文件中添加 "),t("code",[s._v("vm.max_map_count=262144")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vm.max_map_count=262144'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v("/etc/sysctl.conf\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("strong",[s._v("需要重启服务器！")])]),s._v(" "),t("p",[t("strong",[s._v("确认参数配置：")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /etc/sysctl.conf\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"启动-elasticsearch-集群"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动-elasticsearch-集群"}},[s._v("#")]),s._v(" 启动 Elasticsearch 集群")]),s._v(" "),t("p",[s._v("node1：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -d "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --restart"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("always "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --net es-net "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9200")]),s._v(":9200 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9300")]),s._v(":9300 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /var/lib/es/node1/plugins:/usr/share/elasticsearch/plugins "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /var/lib/es/node1/data:/usr/share/elasticsearch/data "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e node.name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e node.master"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e network.host"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e discovery.seed_hosts"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1,node2,node3 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e cluster.initial_master_nodes"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e cluster.name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("es-cluster "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ES_JAVA_OPTS=-Xms256m -Xmx256m"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  elasticsearch:7.9.3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br")])]),t("p",[s._v("环境变量说明：")]),s._v(" "),t("table",[t("thead",[t("tr",[t("th",[s._v("环境变量")]),s._v(" "),t("th",[s._v("说明")])])]),s._v(" "),t("tbody",[t("tr",[t("td",[s._v("node.name")]),s._v(" "),t("td",[s._v("节点在集群中的唯一名称")])]),s._v(" "),t("tr",[t("td",[s._v("node.master")]),s._v(" "),t("td",[s._v("可已被选举为主节点")])]),s._v(" "),t("tr",[t("td",[s._v("network.host")]),s._v(" "),t("td",[s._v("当前节点的地址")])]),s._v(" "),t("tr",[t("td",[s._v("discovery.seed_hosts")]),s._v(" "),t("td",[s._v("集群中其他节点的地址列表")])]),s._v(" "),t("tr",[t("td",[s._v("cluster.initial_master_nodes")]),s._v(" "),t("td",[s._v("候选的主节点地址列表")])]),s._v(" "),t("tr",[t("td",[s._v("cluster.name")]),s._v(" "),t("td",[s._v("集群名")])]),s._v(" "),t("tr",[t("td",[s._v("ES_JAVA_OPTS")]),s._v(" "),t("td",[s._v("java虚拟机参数")])])])]),s._v(" "),t("p",[s._v("参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html")]),s._v(" "),t("p",[s._v("node2：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -d "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node2 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --restart"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("always "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --net es-net "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9201")]),s._v(":9200 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9301")]),s._v(":9300 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /var/lib/es/node2/plugins:/usr/share/elasticsearch/plugins "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /var/lib/es/node2/data:/usr/share/elasticsearch/data "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e node.name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node2 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e node.master"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e network.host"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node2 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e discovery.seed_hosts"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1,node2,node3 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e cluster.initial_master_nodes"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e cluster.name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("es-cluster "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ES_JAVA_OPTS=-Xms256m -Xmx256m"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  elasticsearch:7.9.3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br")])]),t("p",[s._v("node3：")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -d "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node3 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --restart"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("always "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --net es-net "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9202")]),s._v(":9200 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9302")]),s._v(":9300 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /var/lib/es/node3/plugins:/usr/share/elasticsearch/plugins "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -v /var/lib/es/node3/data:/usr/share/elasticsearch/data "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e node.name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node3 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e node.master"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e network.host"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node3 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e discovery.seed_hosts"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1,node2,node3 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e cluster.initial_master_nodes"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("node1 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e cluster.name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("es-cluster "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  -e "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ES_JAVA_OPTS=-Xms256m -Xmx256m"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  elasticsearch:7.9.3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br")])]),t("h1",{attrs:{id:"查看启动结果结果"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查看启动结果结果"}},[s._v("#")]),s._v(" 查看启动结果结果")]),s._v(" "),t("p",[t("a",{attrs:{href:"http://192.168.64.181:9200/",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://192.168.64.181:9200"),t("OutboundLink")],1)]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210414100129180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center",alt:"a"}})]),s._v(" "),t("p",[s._v("http://192.168.64.181:9200/_cat/nodes")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210414100202838.png#pic_center",alt:"a"}})]),s._v(" "),t("h1",{attrs:{id:"chrome浏览器插件-elasticsearch-head"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#chrome浏览器插件-elasticsearch-head"}},[s._v("#")]),s._v(" chrome浏览器插件：elasticsearch-head")]),s._v(" "),t("p",[s._v("elasticsearch-head 项目提供了一个直观的界面，可以很方便地查看集群、分片、数据等等。elasticsearch-head最简单的安装方式是作为 chrome 浏览器插件进行安装。")]),s._v(" "),t("ol",[t("li",[s._v("在 elasticsearch-head 项目仓库中下载 chrome 浏览器插件\nhttps://github.com/mobz/elasticsearch-head/raw/master/crx/es-head.crx")]),s._v(" "),t("li",[s._v("将文件后缀改为 zip")]),s._v(" "),t("li",[s._v("解压缩")]),s._v(" "),t("li",[s._v("在 chrome 浏览器中选择“更多工具”–“扩展程序”")]),s._v(" "),t("li",[s._v("在“扩展程序”中确认开启了“开发者模式”")]),s._v(" "),t("li",[s._v("点击“加载已解压的扩展程序”")]),s._v(" "),t("li",[s._v("选择前面解压的插件目录")]),s._v(" "),t("li",[s._v("在浏览器中点击 elasticsearch-head 插件打开 head 界面，并连接 http://192.168.64.181:9200/")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201024222440713.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODMwNTQ0MA==,size_16,color_FFFFFF,t_70#pic_center",alt:"a"}})])])}),[],!1,null,null,null);a.default=n.exports}}]);