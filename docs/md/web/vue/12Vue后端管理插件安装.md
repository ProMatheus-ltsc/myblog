# Vue后端管理插件安装
[[TOC]]
## 0.下载node.js

1).官网下载

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210120211255417.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

如果是window7系统: 下载安装13的版本 URL: https://nodejs.org/dist/latest-v13.x/

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210510183445632.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).安装node.js
之后一路下一步安装即可.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210120211333642.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

3).检查node js版本

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210120211449669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)


4).检查NPM版本号

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210120212144440.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

5).切换淘宝NPM库

1).`npm install -g cnpm --registry=https://registry.npm.taobao.org`

方式2:
2).`npm config set registry https://registry.npm.taobao.org` (建议使用第二种)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210120212333238.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

6).检查镜像配置是否生效 `npm config list`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210120212427196.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

7).安装VUE和客户端

命令: `npm install -g @vue/cli --force`

等待安装完成之后即可.

## 1 报错说明

1).如果报错如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210512122422574.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

方案1) .删除用户目录下的文件,之后重新安装. (删除文件 不要删除目录)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210512122529422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

方案2): 执行卸载命令 `npm uninstall -g @vue/cli` 之后重新安装

## 2 初始化VUE项目

### 2.1 初始化UI工程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126182745624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 2.2 选择VUE 创建项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126183203977.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 2.3 选择项目

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126183258264.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

选择:手动

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126183408421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 2.4选择功能

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126183458788.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126183600186.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

选择ESLint+ StandardConfig

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126183856344.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

项目创建之后效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126184358870.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

## 3 初始化项目

### 3.1 安装插件

选择如图所示的插件进行安装

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126184740952.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

1).安装成功之后会提示配置插件 选择手动导入

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126185003740.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.2 安装axios依赖

1).点击依赖项

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210510203338116.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2).安装运行依赖

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126185336427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.3 添加依赖项

#### 3.3.1 问题描述

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210128194928569.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.3.2 安装开发依赖 less-loader

安装开发依赖 less-loader
npm install less-loader@5.0.0 版本太高不适用
在VUE项目的根目录启动执行安装命令

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511202855196.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.3.3安装开发依赖 less

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210419213657966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.4 安装运行时依赖 富文本编辑器

1. 通过客户端的方式安装
   有时候可能比较慢,所以需要提前安装
   源码网址: https://github.com/surmon-china/vue-quill-editor#readme
   组件名称: vue-quill-editor

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210416101153752.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

   2.方式2 通过命令安装

   命令: `npm install vue-quill-editor --save`

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210416105812534.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

安装之后的效果:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210416105208230.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.4.0 关闭ESLint校验

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210601210949591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.4.1 添加依赖方式

在main.js中添加该操作

```java
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

```

#### 3.4.2 添加html 实现页面展现

```javascript
 <el-tab-pane label="商品详情" name="4">
            <!-- 定义富文本编辑器-->
            <quill-editor ref="myQuillEditor" v-model="addItemForm.itemDesc" />

          </el-tab-pane>
```

效果展现

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210416141854461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

设置富文本编辑器宽度

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210416144412933.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.5 安装运行依赖 echars插件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210416220431915.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

```java
<template>
  <div>
    <!-- 定义卡片视图 -->
    <el-card>
      <el-row>
        <el-col><h1>数据统计</h1></el-col>
      </el-row>

     <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
     <div id="main" style="width: 100%;height:600px;"></div>

    </el-card>

  </div>
</template>

<script>
  /* 导入echarts组件 */
  import * as echarts from 'echarts';


  export default {
    data() {
      return {

      }
    },
    created(){

    },
    //当页面dom对象初始化之后执行
    mounted(){
      var myChart = echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
</style>
```

### 3.6 VUE中环境配置

在根目录中创建文件 vue.config.js 文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021041819363486.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

2.添加环境配置

```java
module.exports = {
  //配置项目开发时 是否使用esLint 进行校验. 学习时配置为false 为了高效的学习,开发时配置为true 力求专业
  lintOnSave: false,

  //实现多环境配置
  chainWebpack: config => {

    //定义生产环境的配置
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })

    //定义开发环境的配置
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })

  }
}
```

### 3.7 VUE项目打包

方式有2种, 方式1: 通过express插件将项目打包

命令: 1. `npm init -y`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418195920612.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

命令2: `npm i express -S`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210418200150191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

命令3: 编辑app.js

```javascript
const express = require('express')

const app = express()

app.use(express.static('./dist'))
app.listen(8090, () => {
	console.log("服务启动localhost:8090")
})

```

启动命令:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210419135907637.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

访问测试:

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021041914004684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.8 VUE项目优化

#### 3.8.1 编辑生产环境配置

```javascript
module.exports = {
  //配置项目开发时 是否使用esLint 进行校验. 学习时配置为false 为了高效的学习,开发时配置为true 力求专业
  lintOnSave: false,

  //实现多环境配置
  chainWebpack: config => {

    //定义生产环境的配置
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      //通过externals 加载外部CDN资源 被修饰的包不会被添加
      config.set('externals',{
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios:  'axios',
        'vue-quill-editor': 'VueQuillEditor',
         echarts:  'echarts'

      })
    })

    //定义开发环境的配置
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })

  }
}
```

#### 3.8.2 引入CDN配置

```javascript
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
		
		
		<!-- 引入样式表 -->
		<link href="https://cdn.staticfile.org/quill/1.3.6/quill.bubble.min.css" rel="stylesheet">
		<link href="https://cdn.staticfile.org/quill/1.3.6/quill.core.min.css" rel="stylesheet">
		<link href="https://cdn.staticfile.org/quill/1.3.6/quill.snow.min.css" rel="stylesheet">
		<link href="https://cdn.staticfile.org/element-ui/2.15.1/theme-chalk/index.min.css" rel="stylesheet">
		
		
		<!-- 引入其他JS -->
		<script src="https://cdn.staticfile.org/quill/1.3.6/quill.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.6/dist/vue-quill-editor.js"></script>
		<script src="https://cdn.staticfile.org/vue/2.6.9/vue.min.js"></script>
		<script src="https://cdn.staticfile.org/vue-router/3.5.1/vue-router.min.js"></script>
		<script src="https://cdn.staticfile.org/axios/0.21.1/axios.min.js"></script>
		<script src="https://cdn.staticfile.org/echarts/5.1.0/echarts.min.js"></script>
		<script src="https://cdn.staticfile.org/element-ui/2.15.1/index.min.js"></script>
		
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

#### 3.8.3 CDN网址

网址: http://www.staticfile.org/

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210419141130339.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.8.4 优化后的结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210419141210680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

### 3.9 实现路由懒加载

#### 3.9.1 添加插件包

插件名称: babel/plugin-syntax-dynamic-import

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210419142159431.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.9.2 添加JS文件

文件名称: @babel/plugin-syntax-dynamic-import

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210419142730989.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

#### 3.9.3 配置路由懒加载

官网地址: https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
语法结构:

![在这里插入图片描述](https://img-blog.csdnimg.cn/202104191432457.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE2ODA0ODQ3,size_16,color_FFFFFF,t_70)

```javascript
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```