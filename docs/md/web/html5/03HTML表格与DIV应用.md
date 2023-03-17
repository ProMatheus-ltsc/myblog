# HTML表格与DIV应用

[[TOC]]

## 创建表格

表格由 `<table>` 标签来定义。每个表格均有若干行（由 `<tr>` 标签定义），每行被分割为若干单元格（由 `<td>` 标签定义）。字母 td 指表格数据（table data），即数据单元格的内容。数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等。

我们先来创建一个简单的表格：

```html
<table>
  <tr>
    <td>第一行第一列</td>
    <td>第一行第二列</td>
  </tr>
  <tr>
    <td>第二行第一列</td>
    <td>第二行第二列</td>
  </tr>
</table>
```

![1](../imges/h3.1.png)

你是否发现好像缺了点什么？这个表格为什么没有边框呢？接下来让我们为它添加一个 `border` 属性再来看看效果。

```html
<table border="1">
  <tr>
    <td>第一行第一列</td>
    <td>第一行第二列</td>
  </tr>
  <tr>
    <td>第二行第一列</td>
    <td>第二行第二列</td>
  </tr>
</table>
```

在浏览器显示效果为：

![1](../imges/h3.2.png)

## 完善表格

#### caption 元素定义表格标题

表格一般都有标题，在 HTML 中表格标题通过 `<caption>` 定义。

```html
<table border="1" width="300px" height="150px">
  <caption>
    表格标题
  </caption>
  <tr>
    <td>第一行第一列</td>
    <td>第一行第二列</td>
  </tr>
  <tr>
    <td>第二行第一列</td>
    <td>第二行第二列</td>
  </tr>
</table>
```

![1](../imges/h3.3.png)

#### 给表格添加表头

表格的表头使用 `<th>` 标签进行定义，表头通常用于列名字。

```html
<table border="1" width="300px" height="150px">
  <caption>
    支出表
  </caption>
  <tr>
    <th>支出</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>32</td>
    <td>买苹果</td>
  </tr>
  <tr>
    <td>24</td>
    <td>买饮料</td>
  </tr>
</table>
```

![1](../imges/h3.5.png)

#### 表格与单元格的属性

表格的其他常用属性：

![1](../imges/h3.6.png)

注意：其余属性的使用和 `border` 类似，只需要在 `table` 标签中添加属性即可，大家可以尝试着使用。

#### 单元格跨行和跨列

绘制表格的时候，我们常常需要合并单元格，而在 HTML 中提供了 colspan（合并列）和 rowspan（合并行）属性来帮助我们实现这一效果。

> colspan 又称跨列，rowspan 又称跨行。

```html
<table border="1" width="300px" height="150px">
  <h3>单元跨两列</h3>
  <tr>
    <th>姓名</th>
    <th colspan="2">电话</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>344 22 112</td>
    <td>211 32 123</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>433 31 212</td>
    <td>234 21 654</td>
  </tr>
</table>

<table border="1" cellspacing="0">
  <h3>单元跨两行</h3>
  <tr>
    <th>姓名</th>
    <td>张三</td>
  </tr>
  <tr>
    <th rowspan="2">电话</th>
    <td>344 22 112</td>
  </tr>
  <tr>
    <td>234 21 654</td>
  </tr>
</table>
```

在浏览器中显示效果为：

![图片描述](../imges/h3.7.png)

注：设置 `rowspan="2"` 表示合并该列上的两个单元格，同样的我们可以通过设置 `colspan` 来合并行，快动手试试吧。合并之前，我们可以如例子般，先把所有的单元格都写出来，然后找出哪些单元格需要合并的，在第一个单元格内设置 `rowspan` 或者 `colspan`，并将其他多余的单元格代码删除。

## div设置

在网页中可以使用很多个 div，在网页制作中，使用 div 可以将网页中的任何元素布局到网页中的任何位置。

语法：

```html
<div style="样式设置"><div></div></div>
```

#### div 和 table 的区别

div 布局：

```html
<div style="width:100%;border:1px solid #d4d4d4">
  <div style="background-color:pink">实验楼</div>
  <div style="background-color:skyblue">实验楼</div>
</div>
```

table 布局：

```html
<table style="width:100%;border:1px solid #d4d4d4">
  <tr>
    <td style="background-color:pink">实验楼</td>
  </tr>
  <tr>
    <td style="background-color:skyblue">实验楼</td>
  </tr>
</table>
```

两个布局的最终效果：

![1](../imges/h3.8.png)

同样的效果，使用 div 布局能比表格更加灵活，但是我们需要根据不同的场景使用不同的布局方式，现在我们来看看两种布局的优缺点。

table 元素布局：

- 优点：

1. 理解比较简单。
2. 不同的浏览器看到的效果一般相同。

- 缺点：

1. 显示样式和数据绑定在一起。
2. 布局的时候灵活度不高。
3. 一个页面可能会有大量的 table 元素，代码冗余度高。
4. 增加带宽。
5. 搜索引擎不喜欢这样的布局。

div 元素布局：

- 优点：

1. 符合 W3C 标准。
2. 搜索引擎更加友好。
3. 样式的调整更加方便，内容和样式的分离，使页面和样式的调整变得更加方便。
4. 节省代宽，代码冗余度低。
5. 表现和结构分离，在团队开发中更容易分工合作而减少相互关联性。
