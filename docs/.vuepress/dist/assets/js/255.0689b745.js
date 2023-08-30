(window.webpackJsonp=window.webpackJsonp||[]).push([[255],{1573:function(s,a,e){"use strict";e.r(a);var r=e(65),t=Object(r.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"docker服务基本操作"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker服务基本操作"}},[s._v("#")]),s._v(" Docker服务基本操作")]),s._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#查看docker状态"}},[s._v("查看Docker状态")])]),e("li",[e("a",{attrs:{href:"#停止docker服务"}},[s._v("停止docker服务")])]),e("li",[e("a",{attrs:{href:"#启动docker服务"}},[s._v("启动docker服务")])]),e("li",[e("a",{attrs:{href:"#设置docker开机自启"}},[s._v("设置Docker开机自启")])]),e("li",[e("a",{attrs:{href:"#禁用docker开机自启"}},[s._v("禁用Docker开机自启")])]),e("li",[e("a",{attrs:{href:"#重新启动docker服务"}},[s._v("重新启动Docker服务")])]),e("li",[e("a",{attrs:{href:"#查看docker信息"}},[s._v("查看Docker信息")])]),e("li",[e("a",{attrs:{href:"#docker镜像加速"}},[s._v("Docker镜像加速")])]),e("li",[e("a",{attrs:{href:"#总结-summary"}},[s._v("总结（Summary)")])])])]),e("p"),s._v(" "),e("h2",{attrs:{id:"查看docker状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看docker状态"}},[s._v("#")]),s._v(" 查看Docker状态")]),s._v(" "),e("p",[s._v("查看docker是否启动了,是否是运行状态.")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("systemctl status "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("例如:")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://img-blog.csdnimg.cn/829d3cdec1194ac9893f570836402a6b.png",alt:"在这里插入图片描述"}})]),s._v(" "),e("h2",{attrs:{id:"停止docker服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#停止docker服务"}},[s._v("#")]),s._v(" 停止docker服务")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("systemctl stop docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"启动docker服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#启动docker服务"}},[s._v("#")]),s._v(" 启动docker服务")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v(" systemctl start docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"设置docker开机自启"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#设置docker开机自启"}},[s._v("#")]),s._v(" 设置Docker开机自启")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("systemctl enable docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"禁用docker开机自启"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#禁用docker开机自启"}},[s._v("#")]),s._v(" 禁用Docker开机自启")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("systemctl disable docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"重新启动docker服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重新启动docker服务"}},[s._v("#")]),s._v(" 重新启动Docker服务")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v(" systemctl restart docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"查看docker信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看docker信息"}},[s._v("#")]),s._v(" 查看Docker信息")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("docker info\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("查看docker info中具体key的信息,例如:")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" info "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Docker Root Dir:'")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"docker镜像加速"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker镜像加速"}},[s._v("#")]),s._v(" Docker镜像加速")]),s._v(" "),e("p",[s._v("由于国内网络问题，需要配置加速器来加速。修改配置文件 /etc/docker/daemon.json")]),s._v(" "),e("p",[s._v("下面命令直接生成文件 daemon.json")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('cat <<EOF > /etc/docker/daemon.json\n{\n  "registry-mirrors": [\n    "https://docker.mirrors.ustc.edu.cn",\n    "http://hub-mirror.c.163.com"\n  ],\n  "max-concurrent-downloads": 10,\n  "log-driver": "json-file",\n  "log-level": "warn",\n  "log-opts": {\n    "max-size": "10m",\n    "max-file": "3"\n    },\n  "data-root": "/var/lib/docker"\n}\nEOF\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br")])]),e("p",[s._v("说明：在执行如上指令时，保证你的登录用户为root管理员用户,并且设置好以后重启docker服务.")]),s._v(" "),e("h2",{attrs:{id:"总结-summary"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结-summary"}},[s._v("#")]),s._v(" 总结（Summary)")]),s._v(" "),e("p",[s._v("本小节重点讲解了Docker服务的启动，停止，重启、镜像加速、查看docker信息等基本操作。")])])}),[],!1,null,null,null);a.default=t.exports}}]);