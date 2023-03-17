# 项目基础go语言API
[[TOC]]

## 结构体

Go 的结构体 是各个字段字段的类型的集合。这在组织数据时非常有用。

```go
// Go 的_结构体_ 是各个字段字段的类型的集合。
// 这在组织数据时非常有用。

package main

import "fmt"

// 这里的 `person` 结构体包含了 `name` 和 `age` 两个字段。
type person struct {
    name string
    age  int
}

func main() {

    // 使用这个语法创建了一个新的结构体元素。
    fmt.Println(person{"Bob", 20})

    // 你可以在初始化一个结构体元素时指定字段名字。
    fmt.Println(person{name: "Alice", age: 30})

    // 省略的字段将被初始化为零值。
    fmt.Println(person{name: "Fred"})

    // `&` 前缀生成一个结构体指针。
    fmt.Println(&person{name: "Ann", age: 40})

    // 使用点来访问结构体字段。
    s := person{name: "Sean", age: 50}
    fmt.Println(s.name)

    // 也可以对结构体指针使用`.` - 指针会被自动解引用。
    sp := &s
    fmt.Println(sp.age)

    // 结构体是可变的。
    sp.age = 51
    fmt.Println(sp.age)
}
```

## 结构体中方法

Go 支持在结构体类型中定义方法 。

```go
// Go 支持在结构体类型中定义_方法_ 。

package main

import "fmt"

type rect struct {
    width, height int
}

// 这里的 `area` 方法有一个_接收器类型_ `rect`。
func (r *rect) area() int {
    return r.width * r.height
}

// 可以为值类型或者指针类型的接收器定义方法。这里是一个
// 值类型接收器的例子。
func (r rect) perim() int {
    return 2*r.width + 2*r.height
}

func main() {
    r := rect{width: 10, height: 5}

    // 这里我们调用上面为结构体定义的两个方法。
    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())

    // Go 自动处理方法调用时的值和指针之间的转化。你可以使
    // 用指针来调用方法来避免在方法调用时产生一个拷贝，或者
    // 让方法能够改变接受的数据。
    rp := &r
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
}
```



## 正则表达式

Go 提供内置的[正则表达式](http://zh.wikipedia.org/wiki/正则表达式)。这里是 Go 中基本的正则相关功能的例子。

```go
package main

import "bytes"
import "fmt"
import "regexp"

func main() {

    // 这个测试一个字符串是否符合一个表达式。
    match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
    fmt.Println(match)

    // 上面我们是直接使用字符串，但是对于一些其他的正则任
    // 务，你需要 `Compile` 一个优化的 `Regexp` 结构体。
    r, _ := regexp.Compile("p([a-z]+)ch")

    // 这个结构体有很多方法。这里是类似我们前面看到的一个
    // 匹配测试。
    fmt.Println(r.MatchString("peach"))

    // 这是查找匹配字符串的。
    fmt.Println(r.FindString("peach punch"))

    // 这个也是查找第一次匹配的字符串的，但是返回的匹配开
    // 始和结束位置索引，而不是匹配的内容。
    fmt.Println(r.FindStringIndex("peach punch"))

    // `Submatch` 返回完全匹配和局部匹配的字符串。例如，
    // 这里会返回 `p([a-z]+)ch` 和 `([a-z]+) 的信息。
    fmt.Println(r.FindStringSubmatch("peach punch"))

    // 类似的，这个会返回完全匹配和局部匹配的索引位置。
    fmt.Println(r.FindStringSubmatchIndex("peach punch"))

    // 带 `All` 的这个函数返回所有的匹配项，而不仅仅是首
    // 次匹配项。例如查找匹配表达式的所有项。
    fmt.Println(r.FindAllString("peach punch pinch", -1))

    // `All` 同样可以对应到上面的所有函数。
    fmt.Println(r.FindAllStringSubmatchIndex(
        "peach punch pinch", -1))

    // 这个函数提供一个正整数来限制匹配次数。
    fmt.Println(r.FindAllString("peach punch pinch", 2))

    // 上面的例子中，我们使用了字符串作为参数，并使用了
    // 如 `MatchString` 这样的方法。我们也可以提供 `[]byte`
    // 参数并将 `String` 从函数命中去掉。
    fmt.Println(r.Match([]byte("peach")))

    // 创建正则表示式常量时，可以使用 `Compile` 的变体
    // `MustCompile` 。因为 `Compile` 返回两个值，不能用于常量。
    r = regexp.MustCompile("p([a-z]+)ch")
    fmt.Println(r)

    // `regexp` 包也可以用来替换部分字符串为其他值。
    fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))

    // `Func` 变量允许传递匹配内容到一个给定的函数中，
    in := []byte("a peach")
    out := r.ReplaceAllFunc(in, bytes.ToUpper)
    fmt.Println(string(out))
}
```



##  JSON

Go 提供内置的 JSON 编解码支持，包括内置或者自定义类型与 JSON 数据之间的转化。

```go
package main

import "encoding/json"
import "fmt"
import "os"

// 下面我们将使用这两个结构体来演示自定义类型的编码和解
// 码。
type Response1 struct {
    Page   int
    Fruits []string
}
type Response2 struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
}

func main() {

    // 首先我们来看一下基本数据类型到 JSON 字符串的编码
    // 过程。这里是一些原子值的例子。
    bolB, _ := json.Marshal(true)
    fmt.Println(string(bolB))

    intB, _ := json.Marshal(1)
    fmt.Println(string(intB))

    fltB, _ := json.Marshal(2.34)
    fmt.Println(string(fltB))

    strB, _ := json.Marshal("gopher")
    fmt.Println(string(strB))

    // 这里是一些切片和 map 编码成 JSON 数组和对象的例子。
    slcD := []string{"apple", "peach", "pear"}
    slcB, _ := json.Marshal(slcD)
    fmt.Println(string(slcB))

    mapD := map[string]int{"apple": 5, "lettuce": 7}
    mapB, _ := json.Marshal(mapD)
    fmt.Println(string(mapB))

    // JSON 包可以自动的编码你的自定义类型。编码仅输出可
    // 导出的字段，并且默认使用他们的名字作为 JSON 数据的
    // 键。
    res1D := &Response1{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res1B, _ := json.Marshal(res1D)
    fmt.Println(string(res1B))

    // 你可以给结构字段声明标签来自定义编码的 JSON 数据键
    // 名称。在上面 `Response2` 的定义可以作为这个标签这个
    // 的一个例子。
    res2D := &Response2{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res2B, _ := json.Marshal(res2D)
    fmt.Println(string(res2B))

    // 现在来看看解码 JSON 数据为 Go 值的过程。这里
    // 是一个普通数据结构的解码例子。
    byt := []byte(`{"num":6.13,"strs":["a","b"]}`)

    // 我们需要提供一个 JSON 包可以存放解码数据的变量。这里
    // 的 `map[string]interface{}` 将保存一个 string 为键，
    // 值为任意值的map。
    var dat map[string]interface{}

    // 这里就是实际的解码和相关的错误检查。
    if err := json.Unmarshal(byt, &dat); err != nil {
        panic(err)
    }
    fmt.Println(dat)

    // 为了使用解码 map 中的值，我们需要将他们进行适当的类
    // 型转换。例如这里我们将 `num` 的值转换成 `float64`
    // 类型。
    num := dat["num"].(float64)
    fmt.Println(num)

    // 访问嵌套的值需要一系列的转化。
    strs := dat["strs"].([]interface{})
    str1 := strs[0].(string)
    fmt.Println(str1)

    // 我们也可以解码 JSON 值到自定义类型。这个功能的好处就
    // 是可以为我们的程序带来额外的类型安全加强，并且消除在
    // 访问数据时的类型断言。
    str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := &Response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)
    fmt.Println(res.Fruits[0])

    // 在上面的例子中，我们经常使用 byte 和 string 作为使用
    // 标准输出时数据和 JSON 表示之间的中间值。我们也可以和
    // `os.Stdout` 一样，直接将 JSON 编码直接输出至 `os.Writer`
    // 流中，或者作为 HTTP 响应体。
    enc := json.NewEncoder(os.Stdout)
    d := map[string]int{"apple": 5, "lettuce": 7}
    enc.Encode(d)
}
```

##  数字解析

从字符串中解析数字在很多程序中是一个基础常见的任务，在 Go 中是这样处理的。

```go
package main

// 内置的 `strconv` 包提供了数字解析功能。
import "strconv"
import "fmt"

func main() {

    // 使用 `ParseFloat` 解析浮点数，这里的 `64` 表示表示解
    // 析的数的位数。
    f, _ := strconv.ParseFloat("1.234", 64)
    fmt.Println(f)

    // 在使用 `ParseInt` 解析整形数时，例子中的参数 `0` 表
    // 示自动推断字符串所表示的数字的进制。`64` 表示返回的
    // 整形数是以 64 位存储的。
    i, _ := strconv.ParseInt("123", 0, 64)
    fmt.Println(i)

    // `ParseInt` 会自动识别出十六进制数。
    d, _ := strconv.ParseInt("0x1c8", 0, 64)
    fmt.Println(d)

    // `ParseUint` 也是可用的。
    u, _ := strconv.ParseUint("789", 0, 64)
    fmt.Println(u)

    // `Atoi` 是一个基础的 10 进制整型数转换函数。
    k, _ := strconv.Atoi("135")
    fmt.Println(k)

    // 在输入错误时，解析函数会返回一个错误。
    _, e := strconv.Atoi("wat")
    fmt.Println(e)
}
```



## URL 解析

URL 提供了一个[统一资源定位方式](http://adam.heroku.com/past/2010/3/30/urls_are_the_uniform_way_to_locate_resources/)。这里了解一下 Go 中是如何解析 URL 的。

```go
package main

import "fmt"
import "net/url"
import "strings"

func main() {

    // 我们将解析这个 URL 示例，它包含了一个 scheme，
    // 认证信息，主机名，端口，路径，查询参数和片段。
    s := "postgres://user:pass@host.com:5432/path?k=v#f"

    // 解析这个 URL 并确保解析没有出错。
    u, err := url.Parse(s)
    if err != nil {
        panic(err)
    }

    // 直接访问 scheme。
    fmt.Println(u.Scheme)

    // `User` 包含了所有的认证信息，这里调用 `Username`
    // 和 `Password` 来获取独立值。
    fmt.Println(u.User)
    fmt.Println(u.User.Username())
    p, _ := u.User.Password()
    fmt.Println(p)

    // `Host` 同时包括主机名和端口信息，如过端口存在的话，
    // 使用 `strings.Split()` 从 `Host` 中手动提取端口。
    fmt.Println(u.Host)
    h := strings.Split(u.Host, ":")
    fmt.Println(h[0])
    fmt.Println(h[1])

    // 这里我们提出路径和查询片段信息。
    fmt.Println(u.Path)
    fmt.Println(u.Fragment)

    // 要得到字符串中的 `k=v` 这种格式的查询参数，可以使
    // 用 `RawQuery` 函数。你也可以将查询参数解析为一个
    // map。已解析的查询参数 map 以查询字符串为键，对应
    // 值字符串切片为值，所以如何只想得到一个键对应的第
    // 一个值，将索引位置设置为 `[0]` 就行了。
    fmt.Println(u.RawQuery)
    m, _ := url.ParseQuery(u.RawQuery)
    fmt.Println(m)
    fmt.Println(m["k"][0])
}
```

## 读文件

读写文件在很多程序中都是必须的基本任务。首先我们看看一些读文件的例子。

```go
package main

import (
    "bufio"
    "fmt"
    "io"
    "io/ioutil"
    "os"
)

// 读取文件需要经常进行错误检查，这个帮助方法可以精简下面
// 的错误检查过程。
func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {

    // 也许大部分基本的文件读取任务是将文件内容读取到
    // 内存中。
    dat, err := ioutil.ReadFile("/tmp/dat")
    check(err)
    fmt.Print(string(dat))

    // 你经常会想对于一个文件是怎么读并且读取到哪一部分
    // 进行更多的控制。对于这个任务，从使用 `os.Open`
    // 打开一个文件获取一个 `os.File` 值开始。
    f, err := os.Open("/tmp/dat")
    check(err)

    // 从文件开始位置读取一些字节。这里最多读取 5 个字
    // 节，并且这也是我们实际读取的字节数。
    b1 := make([]byte, 5)
    n1, err := f.Read(b1)
    check(err)
    fmt.Printf("%d bytes: %s\n", n1, string(b1))

    // 你也可以 `Seek` 到一个文件中已知的位置并从这个位置开
    // 始进行读取。
    o2, err := f.Seek(6, 0)
    check(err)
    b2 := make([]byte, 2)
    n2, err := f.Read(b2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\n", n2, o2, string(b2))

    // `io` 包提供了一些可以帮助我们进行文件读取的函数。
    // 例如，上面的读取可以使用 `ReadAtLeast` 得到一个更
    // 健壮的实现。
    o3, err := f.Seek(6, 0)
    check(err)
    b3 := make([]byte, 2)
    n3, err := io.ReadAtLeast(f, b3, 2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\n", n3, o3, string(b3))

    // 没有内置的回转支持，但是使用 `Seek(0, 0)` 实现。
    _, err = f.Seek(0, 0)
    check(err)

    // `bufio` 包实现了带缓冲的读取，这不仅对有很多小的读
    // 取操作的能提升性能，也提供了很多附加的读取函数。
    r4 := bufio.NewReader(f)
    b4, err := r4.Peek(5)
    check(err)
    fmt.Printf("5 bytes: %s\n", string(b4))

    // 任务结束后要关闭这个文件（通常这个操作应该在 `Open`
    // 操作后立即使用 `defer` 来完成）。
    f.Close()

}
```



## 写文件

Go 写文件和我们前面看过的读操作有着相似的方式。

```go
package main

import (
    "bufio"
    "fmt"
    "io/ioutil"
    "os"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {

    // 开始，这里是展示如写入一个字符串（或者只是一些
    // 字节）到一个文件。
    d1 := []byte("hello\ngo\n")
    err := ioutil.WriteFile("/tmp/dat1", d1, 0644)
    check(err)

    // 对于更细粒度的写入，先打开一个文件。
    f, err := os.Create("/tmp/dat2")
    check(err)

    // 打开文件后，习惯立即使用 defer 调用文件的 `Close`
    // 操作。
    defer f.Close()

    // 你可以写入你想写入的字节切片
    d2 := []byte{115, 111, 109, 101, 10}
    n2, err := f.Write(d2)
    check(err)
    fmt.Printf("wrote %d bytes\n", n2)

    // `WriteString` 也是可用的。
    n3, err := f.WriteString("writes\n")
    fmt.Printf("wrote %d bytes\n", n3)

    // 调用 `Sync` 来将缓冲区的信息写入磁盘。
    f.Sync()

    // `bufio` 提供了和我们前面看到的带缓冲的读取器一
    // 样的带缓冲的写入器。
    w := bufio.NewWriter(f)
    n4, err := w.WriteString("buffered\n")
    fmt.Printf("wrote %d bytes\n", n4)

    // 使用 `Flush` 来确保所有缓存的操作已写入底层写入器。
    w.Flush()

}
```



##  行过滤器

一个*行过滤器* 在读取标准输入流的输入，处理该输入，然后将得到一些的结果输出到标准输出的程序中是常见的一个功能。`grep` 和 `sed` 是常见的行过滤器。

这里是一个使用 Go 编写的行过滤器示例，它将所有的输入文字转化为大写的版本。你可以使用这个模式来写一个你自己的 Go 行过滤器。

```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {

    // 对 `os.Stdin` 使用一个带缓冲的 scanner，让我们可以
    // 直接使用方便的 `Scan` 方法来直接读取一行，每次调用
    // 该方法可以让 scanner 读取下一行。
    scanner := bufio.NewScanner(os.Stdin)

    for scanner.Scan() {
        // `Text` 返回当前的 token，现在是输入的下一行。
        ucl := strings.ToUpper(scanner.Text())

        // 写出大写的行。
        fmt.Println(ucl)
    }

    // 检查 `Scan` 的错误。文件结束符是可以接受的，并且
    // 不会被 `Scan` 当作一个错误。
    if err := scanner.Err(); err != nil {
        fmt.Fprintln(os.Stderr, "error:", err)
        os.Exit(1)
    }
}
```

