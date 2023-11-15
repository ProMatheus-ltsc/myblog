(window.webpackJsonp=window.webpackJsonp||[]).push([[218],{1538:function(e,t,n){"use strict";n.r(t);var s=n(65),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h2",{attrs:{id:"chapter-6-enums-and-annotations-枚举和注解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#chapter-6-enums-and-annotations-枚举和注解"}},[e._v("#")]),e._v(" Chapter 6. Enums and Annotations（枚举和注解）")]),e._v(" "),n("h3",{attrs:{id:"item-38-emulate-extensible-enums-with-interfaces-使用接口模拟可扩展枚举"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#item-38-emulate-extensible-enums-with-interfaces-使用接口模拟可扩展枚举"}},[e._v("#")]),e._v(" Item 38: Emulate extensible enums with interfaces（使用接口模拟可扩展枚举）")]),e._v(" "),n("p",[e._v("In almost all respects, enum types are superior to the typesafe enum pattern described in the first edition of this book [Bloch01]. On the face of it, one exception concerns extensibility, which was possible under the original pattern but is not supported by the language construct. In other words, using the pattern, it was possible to have one enumerated type extend another; using the language feature, it is not. This is no accident. For the most part, extensibility of enums turns out to be a bad idea. It is confusing that elements of an extension type are instances of the base type and not vice versa. There is no good way to enumerate over all of the elements of a base type and its extensions. Finally, extensibility would complicate many aspects of the design and implementation.")]),e._v(" "),n("p",[e._v("枚举类型几乎在所有方面都优于本书第一版 [Bloch01] 中描述的 typesafe 枚举模式。从表面上看，有一个与可扩展性有关的例外，它在字节码模式下是可能的，但是语言构造不支持。换句话说，使用字节码模式，可以让一个枚举类型扩展另一个枚举类型；但使用语言特性，则不能这样。这并非偶然。因为在大多数情况下，枚举的可扩展性被证明是一个坏主意，主要在于：扩展类型的元素是基类的实例，而基类的实例却不是扩展类型的元素。而且没有一种好方法可以枚举基类及其扩展的所有元素。最后，可扩展性会使设计和实现的许多方面变得复杂。")]),e._v(" "),n("p",[e._v("That said, there is at least one compelling use case for extensible enumerated types, which is operation codes, also known as opcodes. An opcode is an enumerated type whose elements represent operations on some machine, such as the Operation type in Item 34, which represents the functions on a simple calculator. Sometimes it is desirable to let the users of an API provide their own operations, effectively extending the set of operations provided by the API.")]),e._v(" "),n("p",[e._v("也就是说，对于可扩展枚举类型，至少有一个令人信服的用例，即操作码，也称为 opcodes。操作码是一种枚举类型，其元素表示某些机器上的操作，例如 Operation 类，它表示简单计算器上的函数。有时候，我们希望 API 的用户提供自己的操作，从而有效地扩展 API 提供的操作集。")]),e._v(" "),n("p",[e._v("Luckily, there is a nice way to achieve this effect using enum types. The basic idea is to take advantage of the fact that enum types can implement arbitrary interfaces by defining an interface for the opcode type and an enum that is the standard implementation of the interface. For example, here is an extensible version of the Operation type from Item 34:")]),e._v(" "),n("p",[e._v("幸运的是，有一种很好的方法可以使用枚举类型来实现这种效果。其基本思想是利用枚举类型可以实现任意接口这一事实，为 opcode 类型定义一个接口，并为接口的标准实现定义一个枚举。例如，下面是Operation 类的可扩展版本：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('// Emulated extensible enum using an interface\npublic interface Operation {\n    double apply(double x, double y);\n}\n\npublic enum BasicOperation implements Operation {\n    PLUS("+") {\n        public double apply(double x, double y) { return x + y; }\n    },\n    MINUS("-") {\n        public double apply(double x, double y) { return x - y; }\n    },\n    TIMES("*") {\n        public double apply(double x, double y) { return x * y; }\n    },\n    DIVIDE("/") {\n        public double apply(double x, double y) { return x / y; }\n    };\n\n    private final String symbol;\n\n    BasicOperation(String symbol) {\n        this.symbol = symbol;\n    }\n\n    @Override\n    public String toString() {\n        return symbol;\n    }\n}\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br")])]),n("p",[e._v("While the enum type (BasicOperation) is not extensible, the interface type (Operation) is, and it is the interface type that is used to represent operations in APIs. You can define another enum type that implements this interface and use instances of this new type in place of the base type. For example, suppose you want to define an extension to the operation type shown earlier, consisting of the exponentiation and remainder operations. All you have to do is write an enum type that implements the Operation interface:")]),e._v(" "),n("p",[e._v("枚举类型（BasicOperation）是不可扩展的，而接口类型（Operation）是可扩展的，它是用于在 API 中表示操作的接口类型。你可以定义另一个实现此接口的枚举类型，并使用此新类型的实例代替基类型。例如，假设你想定义前面显示的操作类型的扩展，包括求幂和余数操作。你所要做的就是写一个枚举类型，实现操作接口：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('// Emulated extension enum\npublic enum ExtendedOperation implements Operation {\n    EXP("^") {\n        public double apply(double x, double y) {\n            return Math.pow(x, y);\n        }\n    },\n    REMAINDER("%") {\n        public double apply(double x, double y) {\n            return x % y;\n        }\n    };\n\n    private final String symbol;\n\n    ExtendedOperation(String symbol) {\n        this.symbol = symbol;\n    }\n\n    @Override\n    public String toString() {\n        return symbol;\n    }\n}\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br")])]),n("p",[e._v("You can now use your new operations anywhere you could use the basic operations, provided that APIs are written to take the interface type (Operation), not the implementation (BasicOperation). Note that you don’t have to declare the abstract apply method in the enum as you do in a nonextensible enum with instance-specific method implementations (page 162). This is because the abstract method (apply) is a member of the interface (Operation).")]),e._v(" "),n("p",[e._v("现在可以在任何可以使用 Operation 的地方使用新 Operation，前提是编写的 API 采用接口类型（Operation），而不是实现（BasicOperation）。注意，不必像在具有特定于实例的方法实现的非可扩展枚举中那样在枚举中声明抽象 apply 方法（第 162 页）。这是因为抽象方法（apply）是接口（Operation）的成员。")]),e._v(" "),n("p",[n("strong",[e._v("译注：示例如下")])]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("public static void main(String[] args) {\n    Operation op = BasicOperation.DIVIDE;\n    System.out.println(op.apply(15, 3));\n    op=ExtendedOperation.EXP;\n    System.out.println(op.apply(2,5));\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br")])]),n("p",[e._v("Not only is it possible to pass a single instance of an “extension enum” anywhere a “base enum” is expected, but it is possible to pass in an entire extension enum type and use its elements in addition to or instead of those of the base type. For example, here is a version of the test program on page 163 that exercises all of the extended operations defined previously:")]),e._v(" "),n("p",[e._v("不仅可以在需要「基枚举」的任何地方传递「扩展枚举」的单个实例，还可以传入整个扩展枚举类型，并在基类型的元素之外使用或替代基类型的元素。例如，这里是 163 页测试程序的一个版本，它执行了前面定义的所有扩展操作：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('public static void main(String[] args) {\n    double x = Double.parseDouble(args[0]);\n    double y = Double.parseDouble(args[1]);\n    test(ExtendedOperation.class, x, y);\n}\n\nprivate static <T extends Enum<T> & Operation> void test(Class<T> opEnumType, double x, double y) {\n    for (Operation op : opEnumType.getEnumConstants())\n        System.out.printf("%f %s %f = %f%n",x, op, y, op.apply(x, y));\n}\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br")])]),n("p",[e._v("Note that the class literal for the extended operation type (ExtendedOperation.class) is passed from main to test to describe the set of extended operations. The class literal serves as a bounded type token (Item 33). The admittedly complex declaration for the opEnumType parameter ("),n("code",[e._v("<T extends Enum<T> & Operation> Class<T>")]),e._v(") ensures that the Class object represents both an enum and a subtype of Operation, which is exactly what is required to iterate over the elements and perform the operation associated with each one.")]),e._v(" "),n("p",[e._v("注意，扩展 Operation 类型（ExtendedOperation.class）的 class 字面量是从 main 传递到 test 的，以描述扩展 Operation 类型的 Set。class 字面量用作有界类型标记。诚然，opEnumType 参数的复杂声明（"),n("code",[e._v("<T extends Enum<T> & Operation> Class<T>")]),e._v("）确保类对象同时表示枚举和 Operation 的子类型，而这正是遍历元素并执行与每个元素相关的操作所必需的。")]),e._v(" "),n("p",[e._v("A second alternative is to pass a "),n("code",[e._v("Collection<? extends Operation>")]),e._v(", which is a bounded wildcard type (Item 31), instead of passing a class object:")]),e._v(" "),n("p",[e._v("第二个选择是传递一个 "),n("code",[e._v("Collection<? extends Operation>")]),e._v("，它是一个有界通配符类型，而不是传递一个类对象：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('public static void main(String[] args) {\n    double x = Double.parseDouble(args[0]);\n    double y = Double.parseDouble(args[1]);\n    test(Arrays.asList(ExtendedOperation.values()), x, y);\n}\n\nprivate static void test(Collection<? extends Operation> opSet,double x, double y) {\n    for (Operation op : opSet)\n        System.out.printf("%f %s %f = %f%n",x, op, y, op.apply(x, y));\n}\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br")])]),n("p",[e._v("The resulting code is a bit less complex, and the test method is a bit more flexible: it allows the caller to combine operations from multiple implementation types. On the other hand, you forgo the ability to use EnumSet (Item 36) and EnumMap (Item 37) on the specified operations.")]),e._v(" "),n("p",[e._v("生成的代码稍微不那么复杂，test 方法稍微灵活一些：它允许调用者组合来自多个实现类型的操作。另一方面，放弃了在指定操作上使用 EnumSet和 EnumMap的能力。")]),e._v(" "),n("p",[e._v("Both programs shown previously will produce this output when run with command line arguments 4 and 2:")]),e._v(" "),n("p",[e._v("在运行命令行参数 4 和 2 时，前面显示的两个程序都将产生这个输出：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("4.000000 ^ 2.000000 = 16.000000\n4.000000 % 2.000000 = 0.000000\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])]),n("p",[e._v("A minor disadvantage of the use of interfaces to emulate extensible enums is that implementations cannot be inherited from one enum type to another. If the implementation code does not rely on any state, it can be placed in the interface, using default implementations (Item 20). In the case of our Operation example, the logic to store and retrieve the symbol associated with an operation must be duplicated in BasicOperation and ExtendedOperation. In this case it doesn’t matter because very little code is duplicated. If there were a larger amount of shared functionality, you could encapsulate it in a helper class or a static helper method to eliminate the code duplication.")]),e._v(" "),n("p",[e._v("使用接口来模拟可扩展枚举的一个小缺点是实现不能从一个枚举类型继承到另一个枚举类型。如果实现代码不依赖于任何状态，则可以使用默认实现将其放置在接口中。在我们的 Operation 示例中，存储和检索与操作相关的符号的逻辑必须在 BasicOperation 和 ExtendedOperation 中复制。在这种情况下，这并不重要，因为复制的代码非常少。如果有大量的共享功能，可以将其封装在 helper 类或静态 helper 方法中，以消除代码重复。")]),e._v(" "),n("p",[e._v("The pattern described in this item is used in the Java libraries. For example, the java.nio.file.LinkOption enum type implements the CopyOption and OpenOption interfaces.")]),e._v(" "),n("p",[e._v("此项中描述的模式在 Java 库中使用。例如，"),n("code",[e._v("java.nio.file.LinkOption")]),e._v(" 枚举类型实现 CopyOption 和 OpenOption 接口。")]),e._v(" "),n("p",[e._v("In summary, "),n("strong",[e._v("while you cannot write an extensible enum type, you can emulate it by writing an interface to accompany a basic enum type that implements the interface.")]),e._v(" This allows clients to write their own enums (or other types) that implement the interface. Instances of these types can then be used wherever instances of the basic enum type can be used, assuming APIs are written in terms of the interface.")]),e._v(" "),n("p",[e._v("总之，虽然你不能编写可扩展枚举类型，但是你可以通过编写接口来模拟它，以便与实现该接口的基本枚举类型一起使用。这允许客户端编写自己的枚举（或其他类型）来实现接口。假设 API 是根据接口编写的，那么这些类型的实例可以在任何可以使用基本枚举类型的实例的地方使用。")])])}),[],!1,null,null,null);t.default=a.exports}}]);