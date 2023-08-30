(window.webpackJsonp=window.webpackJsonp||[]).push([[271],{1621:function(v,_,t){"use strict";t.r(_);var e=t(65),a=Object(e.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"vim查找替换"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vim查找替换"}},[v._v("#")]),v._v(" Vim查找替换")]),v._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#字符的替换及撤销-undo操作"}},[v._v("字符的替换及撤销(Undo操作)")])]),t("li",[t("a",{attrs:{href:"#快速缩进"}},[v._v("快速缩进")])]),t("li",[t("a",{attrs:{href:"#查找"}},[v._v("查找")])])])]),t("p"),v._v(" "),t("h2",{attrs:{id:"字符的替换及撤销-undo操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字符的替换及撤销-undo操作"}},[v._v("#")]),v._v(" 字符的替换及撤销(Undo操作)")]),v._v(" "),t("h4",{attrs:{id:"替换和撤销-undo-命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#替换和撤销-undo-命令"}},[v._v("#")]),v._v(" 替换和撤销(Undo)命令")]),v._v(" "),t("p",[v._v("替换和 Undo 命令都是针对普通模式下的操作：")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("命令")]),v._v(" "),t("th",[v._v("说明")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[t("code",[v._v("r")]),v._v("+<待替换字母>")]),v._v(" "),t("td",[v._v("将游标所在字母替换为指定字母")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("R")])]),v._v(" "),t("td",[v._v("连续替换，直到按下 "),t("code",[v._v("Esc")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("cc")])]),v._v(" "),t("td",[v._v("替换整行，即删除游标所在行，并进入插入模式")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("cw")])]),v._v(" "),t("td",[v._v("替换一个单词，即删除一个单词，并进入插入模式")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("C")]),v._v("(大写)")]),v._v(" "),t("td",[v._v("替换游标以后至行末")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("~")])]),v._v(" "),t("td",[v._v("反转游标所在字母大小写")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("{n}u")])]),v._v(" "),t("td",[v._v("撤销一次或 n 次操作")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("U")]),v._v("(大写)")]),v._v(" "),t("td",[v._v("撤销当前行的所有修改")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("Ctrl+r")])]),v._v(" "),t("td",[v._v("redo，即撤销 undo 的操作")])])])]),v._v(" "),t("p",[v._v("然后依次进行如下操作")]),v._v(" "),t("ul",[t("li",[v._v("输入 "),t("code",[v._v("fa")]),v._v(" 跳转到第一个 "),t("code",[v._v("a")]),v._v(" 字符")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("r")]),v._v(" 并且输入 b，a 字符被 b 字符替换（实用）")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("R")]),v._v(" 替换字符，输入新字符串，输入完按 ESC 回到普通模式（实用）")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("cc")]),v._v(" 替换整行字符，输入新字符串，输入完按 ESC 回到普通模式")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("cw")]),v._v(" 替换一个英文字(word)，输入完按 ESC 回到普通模式（实用）")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("~")]),v._v("，翻转游标所在字符的大小写")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("C")]),v._v(" 替换至行尾，即游标所在处以后的字都会被替换，输入完按 ESC 回到普通模式")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("u")]),v._v(" 撤销上一次的操作")]),v._v(" "),t("li",[v._v("输入 "),t("code",[v._v("2G")]),v._v("，跳转到 2 行")])]),v._v(" "),t("h2",{attrs:{id:"快速缩进"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#快速缩进"}},[v._v("#")]),v._v(" 快速缩进")]),v._v(" "),t("ul",[t("li",[v._v("普通模式下输入 "),t("code",[v._v("15G")]),v._v("，跳转到 15 行")]),v._v(" "),t("li",[v._v("普通模式下输入 "),t("code",[v._v(">>")]),v._v(" 整行将向右缩进（使用，用于格式化代码超爽）")]),v._v(" "),t("li",[v._v("普通模式下输入 "),t("code",[v._v("<<")]),v._v(" 整行向左回退")]),v._v(" "),t("li",[v._v("普通模式下输入 "),t("code",[v._v(":")]),v._v(" 进入命令行模式下对 "),t("code",[v._v("shiftwidth")]),v._v(" 值进行设置可以控制缩进和回退的字符数")])]),v._v(" "),t("h4",{attrs:{id:"shiftwidth-命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shiftwidth-命令"}},[v._v("#")]),v._v(" shiftwidth 命令")]),v._v(" "),t("p",[t("code",[v._v("shiftwidth")]),v._v(" 命令是指上一节 "),t("code",[v._v(">>")]),v._v(" 命令产生的缩进（可以简写成"),t("code",[v._v("sw")]),v._v("），普通模式下输入 "),t("code",[v._v(":")]),v._v(" 进入命令行模式下对 "),t("code",[v._v("shiftwidth")]),v._v(" 值进行设置可以控制缩进和回退的字符数。")]),v._v(" "),t("p",[v._v("获取目前的设定值：")]),v._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[v._v(":set shiftwidth?\n")])]),v._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[v._v("1")]),t("br")])]),t("p",[v._v("设置缩进为 10 个字符：")]),v._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[v._v(":set "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[v._v("shiftwidth")]),t("span",{pre:!0,attrs:{class:"token operator"}},[v._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[v._v("10")]),v._v("\n")])]),v._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[v._v("1")]),t("br")])]),t("p",[v._v("输入 "),t("code",[v._v("ESC")]),v._v(" 回到普通模式，再次尝试 "),t("code",[v._v(">>")]),v._v(" 看缩进量是否变化。")]),v._v(" "),t("h4",{attrs:{id:"调整文本位置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#调整文本位置"}},[v._v("#")]),v._v(" 调整文本位置")]),v._v(" "),t("p",[v._v("命令行模式下输入 "),t("code",[v._v(":ce")]),v._v("(center)命令使本行内容居中：")]),v._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[v._v(":ce\n")])]),v._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[v._v("1")]),t("br")])]),t("p",[v._v("命令行模式下输入 "),t("code",[v._v(":ri")]),v._v("(right)命令使本行文本靠右：")]),v._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[v._v(":ri\n")])]),v._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[v._v("1")]),t("br")])]),t("p",[v._v("命令行模式下输入 "),t("code",[v._v("le")]),v._v("(left)命令使本行内容靠左：")]),v._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[v._v(":le\n")])]),v._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[v._v("1")]),t("br")])]),t("h2",{attrs:{id:"查找"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查找"}},[v._v("#")]),v._v(" 查找")]),v._v(" "),t("h4",{attrs:{id:"快速查找"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#快速查找"}},[v._v("#")]),v._v(" 快速查找")]),v._v(" "),t("p",[v._v("普通模式下输入 "),t("code",[v._v("/")]),v._v(" 然后键入需要查找的字符串，按回车后就会进行查找。"),t("code",[v._v("?")]),v._v(" 与"),t("code",[v._v("/")]),v._v(" 功能相同，只不过 "),t("code",[v._v("?")]),v._v(" 是向上而 "),t("code",[v._v("/")]),v._v(" 是向下查找。")]),v._v(" "),t("p",[v._v("进入查找之后，输入 "),t("code",[v._v("n")]),v._v(" 和 "),t("code",[v._v("N")]),v._v(" 可以继续查找。"),t("code",[v._v("n")]),v._v(" 是查找下一个内容，"),t("code",[v._v("N")]),v._v(" 查找上一个内容。")])])}),[],!1,null,null,null);_.default=a.exports}}]);