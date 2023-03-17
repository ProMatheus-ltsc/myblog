# VScode使用
[[TOC]]

## 1、VS Code使用

### 启动VS code
启动 VS Code 环境之后，你可以看到它的默认界面，大致分为 3 部分：

代码文件浏览区：左边的区域将用于组织项目的文件结构，你可以在此区域创建各种类型的代码文件和文件夹。
代码文件编辑区：当你双击打开相应的代码文件之后，将会呈现在编辑区域。你可以在此区域编辑代码，编辑后的代码会实时保存。
Linux 终端：因为 VS Code 本身是运行在 Linux 容器环境中，所以下方的区域是一个 Linux 终端。你可以通过终端运行命令，执行编译、运行代码等操作。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20210819-1629359641073)

菜单由顶栏固定显示的形式改为了点击按钮显示。点击左上角三条横线的图标可以显示完整的菜单栏。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20210819-1629359681280)


如果你发现界面没有菜单按钮，可能是因为被意外隐藏了，此时可以在侧边工具栏点击右键，选择显示菜单，就可以正确显示菜单按钮。如果出现其他图标按钮消失的情况，处理方式也类似。


![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20210819-1629359699934)

环境下方默认显示 Linux 终端，如果你的环境没有显示，可以点击菜单按钮，选择终端，新终端打开。或者按下键盘快捷键 ctrl + shift + ` （数字键 1 左侧的按键）也可以直接打开。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20210819-1629359712359)

### 安装插件

如果要安装你自己需要的插件，可以在搜索栏中输入名称或者 ID 搜索对应的插件，然后点击插件搜索里的安装或者详细信息的在 Remote 上安装按钮即可。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20210819-1629359829352)

**部分插件安装/卸载后可能需要重载环境才能生效，请留意右下角的提示信息。**
### 复制粘贴问题

如果你的键盘存在 insert 按键（笔记本一般在右上角，可能需要组合 Fn 键之类的功能键使用），你也可以使用 Shift + insert 键粘贴。
### 文件上传与下载
实验中，如果需要运行已有项目或者继续之前没有完成的项目，我们可以在终端 Terminal 中使用` wget `或者 `git `命令获取代码。
另外，VS Code 也支持上传本地项目压缩包或者文件夹，无需点击任何按钮，只需要将文件或文件夹从你本地直接拖动到 VS Code 文件浏览区域即可。

请勿一次性上传超过 50M 的压缩包或者包含非常多子文件的文件夹，否则可能导致环境卡死。

在 VS Code 中如果需要下载代码文件到本地，只需要选中要下载的文件夹或者代码文件，右键选择下载，就可以下载到本地。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20210819-1629363509619)

### 快捷键
|快捷键|功能|
|---|---|
|ctrl+F5|开始执行不调试|
|ctrl+F|搜索和替换文件|
|ctrl+shift+F|搜索所有文件|
|ctrl+Tab|切换文件|
|ctrl+s|保存|
|ctrl+z|撤销|
|ctrl+y|重做|
|ctrl+shift+N|新建项目|
|ctrl+shift+A|新建项|

### VS2010常用调试技术
#### 断点
移动光标到指定行按F9即可添加断点
通过菜单》调试》窗口》断点或者直接按Alt+F9即可调出选项卡
#### 单步和监控
F10、 F11，前者是一次一个语句的执行，或者可以看出一行；而后者如果出现能进入的子过程，那么就会进入子过程。
#### 调用堆栈
Alt+7或者调试》窗口》调用堆栈
## C/C++示例项目
我们需要先在代码文件浏览区中通过右键 New File 创建一个名为 hello.c 的 C 语言文件。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645153533664)

然后，在编辑区域键入以下 C 代码，代码会自动保存。
```
#include<stdio.h>
int main()
{
    printf("Hello, World.");
    return 0;
}
```

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645153573250)

如果想要执行上方的 C 语言代码，需要先编译代码。编译代码需要用到 Linux 终端，接下来在终端中输入以下命令。
```
gcc -o hello hello.c
```
注意参数是小写字母 o，不是数字 0。单击回车，这时目录下会生成了一个名为 hello 的文件，这是 C 语言程序编译后得到的可执行程序。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645153614962)

接下来，我们就可以在终端中执行文件，注意执行的是编译之后的文件：
```
./hello
```
执行完之后，就可以看到刚刚编写 C 语言文件的输出了。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645153664096)

## 前端示例项目
首先，在代码文件浏览区中通过右键 New File 创建一个名为 `hello.html `的 HTML 文件，然后在编辑区域输入以下 HTML 代码：

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645154676773)

```
<!DOCTYPE html>
<html>
  <head>
    <title>欢迎来到 HTML 的世界</title>
  </head>
  <body>
    <p>WebIDE 示例教学项目.</p>
  </body>
</html>
```
![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645154705780)

代码会自动保存。此时，如果希望预览刚刚编写的 HTML 页面效果，可以单击编辑器页面右上角的预览图标打开。

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645154732258)

除了预览按钮，你还可以：选择代码文件 → 右键 → Open With → Preview 打开预览：

![图片描述](https://dn-simplecloud.shiyanlou.com/courses/uid1486098-20220218-1645154761217)

你可以看到，右侧的 HTML 页面已经可以展示出来了。如果后续编辑和修改代码，预览页面也会动态更新。
