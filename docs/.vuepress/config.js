// docs/.vuepress/config.js
module.exports = {
    base: '/matheusblog/', 
    markdown: {
      lineNumbers: true,
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "MyBlog",            
            description: "包含: Java 基础, 前端, JVM, Spring, Spring Boot, Spring Cloud, MySQL, MongoDB, k8s, Linux, Git..."
        }
    },
    themeConfig: {
      nav: [
        {
          text: 'Java',
          ariaLabel: 'Java Menu',
          items: [
            { text: '基础', items: [
              { text: '认识编程', link: '/md/java/basic/helloworld.md' },
            ] },
            { text: '集合', items: [
              { text: '泛型和集合', link: '/md/java/collection/泛型和集合.md' },
              
            ]},
            { text: 'IO', items: [
              { text: 'IO', link: '/md/java/io/IO.md' },
               
            ] },
            { text: '并发编程', items: [
              { text: '多线程', link: '/md/java/thread/多线程.md' },
               
            ] },
            { text: 'JVM', items: [
              { text: 'JVM简介', link: '/md/java/jvm/00虚拟机内存体系与垃圾回收.md' },
               
            ] },
          ]
        },
        {
          text: 'Web基础',
          ariaLabel: 'Web Menu',
          items: [
            { text: 'HTML5', items: [
              { text: 'HTML概述', link: '/md/web/html5/01HTML概述.md' },
            ] },
            { text: 'CSS', items: [
              { text: '基础选择器+字体文本样式', link: '/md/web/css/01基础选择器+字体文本样式.md' },
              
            ]},
            { text: 'JS', items: [
              { text: 'JavaScript基础', link: '/md/web/js/01JavaScript基础.md' },
               
            ] },
            { text: 'VUE', items: [
              { text: 'Vue简介与安装使用', link: '/md/web/vue/02模板语法.md' },
               
            ] },
          ]
        },
        {
          text: '数据库',
          ariaLabel: 'database Menu',
          items: [
            { text: 'MySQL', items: [
              { text: '数据库和表的操作', link: '/md/db/mysql/02数据库和表的操作.md' },
            ] },
            { text: 'MongoDB', items: [
              { text: '数据库和集合基本操作', link: '/md/db/mongodb/01数据库和集合基本操作.md' },
            ] },
          ]
        },
        {
          text: 'SpringFramework',
          ariaLabel: 'SpringFramework Menu',
          items: [
            { text: 'Spring', items: [
              { text: 'Spring概述', link: '/md/spring/spring/Spring概述.md' },
            ] },
            { text: 'SpringBoot', items: [
              { text: 'SpringBoot简介', link: '/md/spring/springboot/SpringBoot简介.md' },
            ] },

          ]
        },
        {
          text: 'DevOps',
          ariaLabel: 'Devops Menu',
          items: [
            { text: 'linux', items: [
              { text: 'CentOS', link: '/md/devops/linux/00 Centos.md' },
            ] },
            { text: 'tools', items: [
              { text: 'VS Code使用', link: '/md/devops/tools/VS Code使用.md' },
            ] },
            { text: 'k8s', items: [
              { text: 'K8s介绍与使用', link: '/md/devops/k8s/01Kubernetes介绍及使用.md' },
            ] },
            

          ]
        },
        { text: 'SpringCloud',link: '/md/springcloud/note.md'},
        {
          text: '开发',
          ariaLabel: 'develop Menu',
          items: [
            { text: '代码质量', items: [
              { text: 'Effective-Java', link: '/md/develop/code-style/effective-java/目录.md' },
              { text: '单元测试', link: '/md/develop/JUnit/01什么是单元测试.md' }
            ] }
          ]
        },
        { text: '架构',link: '/md/arch/分层与模块化.md'},
        {
          text: '其他语言',
          ariaLabel: 'other-languages Menu',
          items: [
            { text: 'Go', items: [
              { text: 'Go语言介绍', link: '/md/other-languages/go/01Go语言介绍.md' },
            ] },
          
          ]
        },
        
      ],
      sidebar: {
        "/md/java/": genSidebarjava(),
        "/md/web/": genSidebarweb(),
        "/md/spring/": genSidebarspring(),
        "/md/springcloud/": genSidebarspringcloud(),
        "/md/arch/": genSidebararch(),
        "/md/devops/": genSidebardevops(),
        "/md/other-languages/": genSidebarotherlanguages(),
        "/md/db/": genSidebardb(),
        "/md/develop/": genSidebardevelop(),

      }
    },
    plugins: [
        [
          ['@vuepress/search', {
            searchMaxSuggestions: 10
          }]
        ],
        [
         'copyright',
          {
            noCopy: true, // 选中的文字将无法被复制
            minLength: 100, // 如果长度超过 100 个字符
          },
        ],
        ['vuepress-plugin-code-copy', true],
    ],
  };


function genSidebarjava(){
    return [
        {
            title: "Java基础",
            collapsable: false,
            sidebarDepth: 0, 
            children: [
                "basic/helloworld.md",
                "basic/1Java开发环境配置.md",
                "basic/2变量,常量与运算符.md",
                "basic/3Java流程控制.md",
                "basic/4数组.md",
                "basic/5输入输出.md",
                "basic/6面向对象编程.md",
                "basic/7接口与继承.md",
                "basic/8API基础.md",
                "basic/9Lambda.md",
                "basic/10异常.md",
                "basic/11网络编程.md",
                "basic/12JDBC.md",
                "basic/13反射.md",
                "basic/14正则表达式.md",
                "basic/15二进制.md",
                "basic/16QRCode.md",
            ]
        },
        {
          title: "集合",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "collection/泛型和集合.md",
          ]
         },
         {
          title: "IO",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "io/IO.md",

          ]
         },
         {
          title: "并发编程",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "thread/多线程.md",
             
          ]
         },
         {
          title: "JVM",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "jvm/00虚拟机内存体系与垃圾回收.md",
              "jvm/01JVM最佳实践.md",
              "jvm/12Java内存区域详解.md",
          ]
         },
        
    ];
}

function genSidebarweb(){
  return [
      {
          title: "HTML5",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "html5/01HTML概述.md",
              "html5/02HTML常用标签.md",
              "html5/03HTML表格与DIV应用.md",
              "html5/04HTML表单.md",
              "html5/05HTML图像与框架.md",
              "html5/06HTML5简介.md",
              "html5/07HTML5表单.md",
              "html5/08HTML5 Canvas API.md",
              "html5/09 HTML5 视频音频与拖放.md",
              "html5/10 HTML5 Web Storage和文件上传.md",
          ]
      },
      {
        title: "HTTP",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "http/Http协议.md",
        ]
      },
      {
        title: "CSS",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "css/01基础选择器+字体文本样式.md",
            "css/02选择器进阶+背景相关属性+元素显示模式+三大特性.md",
            "css/03盒子模型.md",
            "css/04浮动.md",
            "css/05定位+装饰.md",
            
        ]
      },
      {
        title: "js",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "js/01JavaScript基础.md",
            "js/02JavaScript关键特性.md",
            "js/03JSON.md",
            "js/04WebAPI.md",
            "js/05值类型和引用类型以及异常.md",
            "js/06面向对象编程.md",
            "js/07函数进阶.md",
          ]
      },
      {
        title: "VUE",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "vue/02模板语法.md",
            "vue/03计算属性和侦听属性与过滤器.md",
            "vue/04class与style绑定.md",
            "vue/05条件与循环渲染.md",
            "vue/06事件处理.md",
            "vue/07表单处理.md",
            "vue/08组件.md",
            "vue/09过渡与动画.md",
            "vue/10Vue进阶引导.md",
            "vue/11Element.md",
             ]
        },
      
  ];
}
function genSidebarspring(){
  return [
      {
          title: "Maven",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "maven/03Maven pom.xml常用配置.md",
          ]
      },
      {
        title: "Spring",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "spring/Spring概述.md",
            "spring/Spring入门案例.md",
            "spring/IoC控制反转.md",
            "spring/DI依赖注入.md",
            "spring/Bean工厂.md",
            "spring/AOP面向切面编程.md",
            "spring/事务控制.md",
            "spring/注解大全.md",
            "spring/Spring设计模式.md",
        ]
      },
      {
        title: "SpringBoot",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "springboot/SpringBoot简介.md",
 
        ]
      },
  ];
}
function genSidebarspringcloud(){
  return [
      {
          title: "SpringCloud",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "note.md",
          ]
      },
      {
        title: "消息队列",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "mq/01RabbitMQ.md",
            "mq/02SpringBoot整合.md",
            "mq/03消息队列对比.md",
            "mq/04RocketMQ.md",
            "mq/05使用RocketMQ原生API收发消息代码样例.md",
            "mq/06Springboot整合RocetMQ收发消息样例.md",
        ]
      },
  ];
}
function genSidebararch(){
  return [
      {
          title: "架构",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "分层与模块化.md",
          ]
      },
  ];
}
function genSidebardevops(){
  return [
      {
          title: "工具",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "tools/VS Code使用.md",
              "tools/Notebook.md",
              "tools/硬件设置.md",
              "tools/网页扒手.md",
              
              
              
          ]
      },
      {
        title: "Git",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "tools/git/01 基本用法.md",
            "tools/git/02 Github快速上手.md",
            "tools/git/03 Git分支操作.md",
            "tools/git/04 多人协作GitHub部分.md",
            "tools/git/05 多人协作Git部分.md",
            "tools/git/06 Git tag和GitHub releases.md",
        ]
      },
      {
        title: "Vim",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "tools/vim/01 Vim快速入门.md",
            "tools/vim/02Vim文档编辑.md",
            "tools/vim/03Vim查找替换.md",
            "tools/vim/04Vim高级功能.md",
        ]
      },
      {
        title: "Linux",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "linux/00 Centos.md",
            "linux/01 编辑c.md",
            "linux/03 TCP_IP命令.md",
            "linux/04 基本概念及操作.md",
            "linux/05 用户及文件权限管理.md",
            "linux/06 Linux 目录结构及文件基本操作.md",
            "linux/07 环境变量与文件查找.md",
            "linux/08  文件打包与解压缩.md",
            "linux/09 文件系统操作与磁盘管理.md",
            "linux/10 Linux下的帮助命令.md",
            "linux/11 Linux任务计划crontab.md",
            "linux/12 命令执行顺序控制与管道.md",
            "linux/13简单的文本处理.md",
            "linux/14数据流重定向.md",
            "linux/15正则表达式基础.md",
            "linux/16Linux下软件安装.md",
            "linux/17Linux进程概念.md",
            "linux/18Linux进程管理.md",
            "linux/19Linux日志系统.md",
        ]
      },
      {
        title: "Bash",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "docker/bash/01bash介绍与入门.md",
            "docker/bash/02bash特殊字符.md",
            "docker/bash/03变量与参数.md",
            "docker/bash/04基本运算符.md",
            "docker/bash/05流程控制.md",
            "docker/bash/06函数.md",
            "docker/bash/07Shell脚本实现Linux系统监控.md",
        ]
      }
  ];
}
function genSidebarotherlanguages(){
  return [
      {
          title: "Go",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "go/01Go语言介绍.md",
              "go/02Go语言基础.md",
              "go/03Go语言顺序编程.md",
              "go/04面向对象编程.md",
              "go/05并发编程.md",
              "go/06词频统计综合案例.md",
              "go/07IDE及环境配置.md",
              "go/08数组与切片.md",
              "go/09栈与栈的应用.md",
              "go/10七大设计原则.md",
              "go/11简单工厂与抽象工厂.md",
              "go/12go相对Java的优势.md",
              "go/13快速开始一个Go程序.md",
          ]
      },
      {
        title: "Go并发服务器框架Zinx入门",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "go/basic-project/00项目基础go语言API.md",
            "go/basic-project/01Zinx课程大纲.md",
            "go/basic-project/02实现Server模块.md",
            "go/basic-project/03实现链接封装业务与业务绑定.md",
            "go/basic-project/04实现基础路由模块.md",
            "go/basic-project/05全局配置.md",
            "go/basic-project/06消息封装.md",
            "go/basic-project/07多路由模式.md",
            "go/basic-project/08读写分离.md",
            "go/basic-project/09实现工作池.md",
            "go/basic-project/10实现链接控制.md",
            "go/basic-project/11连接属性设置.md",
            "go/basic-project/12Web基础知识介绍.md",
            "go/basic-project/13ChitCha论坛.md",
        ]
      },

  ];
}
function genSidebardb(){
  return [
      {
          title: "MySQL",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "mysql/02数据库和表的操作.md",
              "mysql/03SQL的约束.md",
              "mysql/04SELECT语句详解.md",
              "mysql/05表内数据操作.md",
              "mysql/06其他操作.md",
              "mysql/07基础函数.md",
              "mysql/09创建数据库脚本.md",
              "mysql/10MySQL高性能优化规范建议.md",
              "mysql/11一千行MySQL命令.md",
              "mysql/01MySQL本地事务和事务隔离级别.md"
              
          ]
      },
      {
        title: "MongoDB",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "mongodb/01数据库和集合基本操作.md",
            "mongodb/02数据查询.md",
            "mongodb/03文档基本操作.md",
            "mongodb/04查询,索引与聚合.md",
            "mongodb/05高级查询与索引.md",
  
        ]
      },
  ];
}
function genSidebardevelop(){
  return [
      {
          title: "JUnit",
          collapsable: false,
          sidebarDepth: 0, 
          children: [
              "JUnit/01什么是单元测试.md",
              "JUnit/02第一个单元测试.md",
          ]
      },
      
      {
        title: "Effective-Java",
        collapsable: false,
        sidebarDepth: 0, 
        children: [
            "code-style/effective-java/目录.md",
            
        ]
    },
  ];
}
