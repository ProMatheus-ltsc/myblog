(window.webpackJsonp=window.webpackJsonp||[]).push([[244],{1560:function(e,t,i){"use strict";i.r(t);var n=i(65),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("h2",{attrs:{id:"chapter-9-general-programming-通用程序设计"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#chapter-9-general-programming-通用程序设计"}},[e._v("#")]),e._v(" Chapter 9. General Programming（通用程序设计）")]),e._v(" "),i("h3",{attrs:{id:"item-61-prefer-primitive-types-to-boxed-primitives-基本数据类型优于包装类"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#item-61-prefer-primitive-types-to-boxed-primitives-基本数据类型优于包装类"}},[e._v("#")]),e._v(" Item 61: Prefer primitive types to boxed primitives（基本数据类型优于包装类）")]),e._v(" "),i("p",[e._v("Java has a two-part type system, consisting of primitives, such as int, double, and boolean, and reference types, such as String and List. Every primitive type has a corresponding reference type, called a boxed primitive. The boxed primitives corresponding to int, double, and boolean are Integer, Double, and Boolean.")]),e._v(" "),i("p",[e._v("Java 有一个由两部分组成的类型系统，包括基本类型（如 int、double 和 boolean）和引用类型（如 String 和 List）。每个基本类型都有一个对应的引用类型，称为包装类型。与 int、double 和 boolean 对应的包装类是 Integer、Double 和 Boolean。")]),e._v(" "),i("p",[e._v("As mentioned in Item 6, autoboxing and auto-unboxing blur but do not erase the distinction between the primitive and boxed primitive types. There are real differences between the two, and it’s important that you remain aware of which you are using and that you choose carefully between them.")]),e._v(" "),i("p",[e._v("正如 "),i("RouterLink",{attrs:{to:"/Chapter-2/Chapter-2-Item-6-Avoid-creating-unnecessary-objects.html"}},[e._v("Item-6")]),e._v(" 中提到的，自动装箱和自动拆箱模糊了基本类型和包装类型之间的区别，但不会消除它们。这两者之间有真正的区别，重要的是你要始终意识到正在使用的是哪一种，并在它们之间仔细选择。")],1),e._v(" "),i("p",[e._v("There are three major differences between primitives and boxed primitives. First, primitives have only their values, whereas boxed primitives have identities distinct from their values. In other words, two boxed primitive instances can have the same value and different identities. Second, primitive types have only fully functional values, whereas each boxed primitive type has one nonfunctional value, which is null, in addition to all the functional values of the corresponding primitive type. Last, primitives are more time- and spaceefficient than boxed primitives. All three of these differences can get you into real trouble if you aren’t careful.")]),e._v(" "),i("p",[e._v("基本类型和包装类型之间有三个主要区别。首先，基本类型只有它们的值，而包装类型具有与其值不同的标识。换句话说，两个包装类型实例可以具有相同的值和不同的标识。第二，基本类型只有全功能值，而每个包装类型除了对应的基本类型的所有功能值外，还有一个非功能值，即 null。最后，基本类型比包装类型更节省时间和空间。如果你不小心的话，这三种差异都会给你带来真正的麻烦。")]),e._v(" "),i("p",[e._v("Consider the following comparator, which is designed to represent ascending numerical order on Integer values. (Recall that a comparator’s compare method returns a number that is negative, zero, or positive, depending on whether its first argument is less than, equal to, or greater than its second.) You wouldn’t need to write this comparator in practice because it implements the natural ordering on Integer, but it makes for an interesting example:")]),e._v(" "),i("p",[e._v("考虑下面的比较器，它的设计目的是表示 Integer 值上的升序数字排序。（回想一下，比较器的 compare 方法返回一个负数、零或正数，这取决于它的第一个参数是小于、等于还是大于第二个参数。）你不需要在实际使用中编写这个比较器，因为它实现了 Integer 的自然排序，但它提供了一个有趣的例子：")]),e._v(" "),i("div",{staticClass:"language- line-numbers-mode"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("// Broken comparator - can you spot the flaw?\nComparator<Integer> naturalOrder =(i, j) -> (i < j) ? -1 : (i == j ? 0 : 1);\n")])]),e._v(" "),i("div",{staticClass:"line-numbers-wrapper"},[i("span",{staticClass:"line-number"},[e._v("1")]),i("br"),i("span",{staticClass:"line-number"},[e._v("2")]),i("br")])]),i("p",[e._v("This comparator looks like it ought to work, and it will pass many tests. For example, it can be used with Collections.sort to correctly sort a millionelement list, whether or not the list contains duplicate elements. But the comparator is deeply flawed. To convince yourself of this, merely print the value of naturalOrder.compare(new Integer(42), new Integer(42)). Both Integer instances represent the same value (42), so the value of this expression should be 0, but it’s 1, which indicates that the first Integer value is greater than the second!")]),e._v(" "),i("p",[e._v("这个比较器看起来应该可以工作，它将通过许多测试。例如，它可以与 "),i("code",[e._v("Collections.sort")]),e._v(" 一起使用，以正确地排序一个百万元素的 List，无论该 List 是否包含重复的元素。但这个比较存在严重缺陷。要使自己相信这一点，只需打印 "),i("code",[e._v("naturalOrder.compare(new Integer(42), new Integer(42))")]),e._v(" 的值。两个 Integer 实例都表示相同的值 "),i("code",[e._v("(42)")]),e._v("，所以这个表达式的值应该是 0，但它是 1，这表明第一个 Integer 值大于第二个！")]),e._v(" "),i("p",[e._v("So what’s the problem? The first test in naturalOrder works fine. Evaluating the expression i < j causes the Integer instances referred to by i and j to be auto-unboxed; that is, it extracts their primitive values. The evaluation proceeds to check if the first of the resulting int values is less than the second. But suppose it is not. Then the next test evaluates the expression i==j, which performs an identity comparison on the two object references. If i and j refer to distinct Integer instances that represent the same int value, this comparison will return false, and the comparator will incorrectly return 1, indicating that the first Integer value is greater than the second. "),i("strong",[e._v("Applying the == operator to boxed primitives is almost always wrong.")])]),e._v(" "),i("p",[e._v("那么问题出在哪里呢？naturalOrder 中的第一个测试工作得很好。计算表达式 "),i("code",[e._v("i < j")]),e._v(" 会使 i 和 j 引用的 Integer 实例自动拆箱；也就是说，它提取它们的基本类型值。计算的目的是检查得到的第一个 int 值是否小于第二个 int 值。但假设它不是。然后，下一个测试计算表达式 "),i("code",[e._v("i==j")]),e._v("，该表达式对两个对象引用执行标识比较。如果 i 和 j 引用表示相同 int 值的不同 Integer 实例，这个比较将返回 false，比较器将错误地返回 1，表明第一个整型值大于第二个整型值。"),i("strong",[e._v("将 "),i("code",[e._v("==")]),e._v(" 操作符应用于包装类型几乎都是错误的。")])]),e._v(" "),i("p",[e._v("In practice, if you need a comparator to describe a type’s natural order, you should simply call Comparator.naturalOrder(), and if you write a comparator yourself, you should use the comparator construction methods, or the static compare methods on primitive types (Item 14). That said, you could fix the problem in the broken comparator by adding two local variables to store the primitive int values corresponding to the boxed Integer parameters, and performing all of the comparisons on these variables. This avoids the erroneous identity comparison:")]),e._v(" "),i("p",[e._v("在实际使用中，如果你需要一个比较器来描述类型的自然顺序，你应该简单地调用 "),i("code",[e._v("Comparator.naturalOrder()")]),e._v("，如果你自己编写一个比较器，你应该使用比较器构造方法，或者对基本类型使用静态比较方法（"),i("RouterLink",{attrs:{to:"/Chapter-3/Chapter-3-Item-14-Consider-implementing-Comparable.html"}},[e._v("Item-14")]),e._v("）。也就是说，你可以通过添加两个局部变量来存储基本类型 int 值，并对这些变量执行所有的比较，从而修复损坏的比较器中的问题。这避免了错误的标识比较：")],1),e._v(" "),i("div",{staticClass:"language- line-numbers-mode"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("Comparator<Integer> naturalOrder = (iBoxed, jBoxed) -> {\n    int i = iBoxed, j = jBoxed; // Auto-unboxing\n    return i < j ? -1 : (i == j ? 0 : 1);\n};\n")])]),e._v(" "),i("div",{staticClass:"line-numbers-wrapper"},[i("span",{staticClass:"line-number"},[e._v("1")]),i("br"),i("span",{staticClass:"line-number"},[e._v("2")]),i("br"),i("span",{staticClass:"line-number"},[e._v("3")]),i("br"),i("span",{staticClass:"line-number"},[e._v("4")]),i("br")])]),i("p",[e._v("Next, consider this delightful little program:")]),e._v(" "),i("p",[e._v("接下来，考虑一下这个有趣的小程序：")]),e._v(" "),i("div",{staticClass:"language- line-numbers-mode"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v('public class Unbelievable {\nstatic Integer i;\npublic static void main(String[] args) {\n    if (i == 42)\n        System.out.println("Unbelievable");\n    }\n}\n')])]),e._v(" "),i("div",{staticClass:"line-numbers-wrapper"},[i("span",{staticClass:"line-number"},[e._v("1")]),i("br"),i("span",{staticClass:"line-number"},[e._v("2")]),i("br"),i("span",{staticClass:"line-number"},[e._v("3")]),i("br"),i("span",{staticClass:"line-number"},[e._v("4")]),i("br"),i("span",{staticClass:"line-number"},[e._v("5")]),i("br"),i("span",{staticClass:"line-number"},[e._v("6")]),i("br"),i("span",{staticClass:"line-number"},[e._v("7")]),i("br")])]),i("p",[e._v("No, it doesn’t print Unbelievable—but what it does is almost as strange. It throws a NullPointerException when evaluating the expression i==42. The problem is that i is an Integer, not an int, and like all nonconstant object reference fields, its initial value is null. When the program evaluates the expression i==42, it is comparing an Integer to an int. In nearly every case "),i("strong",[e._v("when you mix primitives and boxed primitives in an operation, the boxed primitive is auto-unboxed.")]),e._v(" If a null object reference is auto-unboxed, you get a NullPointerException. As this program demonstrates, it can happen almost anywhere. Fixing the problem is as simple as declaring i to be an int instead of an Integer.")]),e._v(" "),i("p",[e._v("不，它不会打印出令人难以置信的东西，但它的行为很奇怪。它在计算表达式 "),i("code",[e._v("i==42")]),e._v(" 时抛出 NullPointerException。问题是，i 是 Integer，而不是 int 数，而且像所有非常量对象引用字段一样，它的初值为 null。当程序计算表达式 "),i("code",[e._v("i==42")]),e._v(" 时，它是在比较 Integer 与 int。"),i("strong",[e._v("在操作中混合使用基本类型和包装类型时，包装类型就会自动拆箱")]),e._v("，这种情况无一例外。如果一个空对象引用自动拆箱，那么你将得到一个 NullPointerException。正如这个程序所演示的，它几乎可以在任何地方发生。修复这个问题非常简单，只需将 i 声明为 int 而不是 Integer。")]),e._v(" "),i("p",[e._v("Finally, consider the program from page 24 in Item 6:")]),e._v(" "),i("p",[e._v("最后，考虑 "),i("RouterLink",{attrs:{to:"/Chapter-2/Chapter-2-Item-6-Avoid-creating-unnecessary-objects.html"}},[e._v("Item-6")]),e._v(" 中第 24 页的程序：")],1),e._v(" "),i("div",{staticClass:"language- line-numbers-mode"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v("// Hideously slow program! Can you spot the object creation?\npublic static void main(String[] args) {\n    Long sum = 0L;\n    for (long i = 0; i < Integer.MAX_VALUE; i++) {\n        sum += i;\n    }\n    System.out.println(sum);\n}\n")])]),e._v(" "),i("div",{staticClass:"line-numbers-wrapper"},[i("span",{staticClass:"line-number"},[e._v("1")]),i("br"),i("span",{staticClass:"line-number"},[e._v("2")]),i("br"),i("span",{staticClass:"line-number"},[e._v("3")]),i("br"),i("span",{staticClass:"line-number"},[e._v("4")]),i("br"),i("span",{staticClass:"line-number"},[e._v("5")]),i("br"),i("span",{staticClass:"line-number"},[e._v("6")]),i("br"),i("span",{staticClass:"line-number"},[e._v("7")]),i("br"),i("span",{staticClass:"line-number"},[e._v("8")]),i("br")])]),i("p",[e._v("This program is much slower than it should be because it accidentally declares a local variable (sum) to be of the boxed primitive type Long instead of the primitive type long. The program compiles without error or warning, and the variable is repeatedly boxed and unboxed, causing the observed performance degradation.")]),e._v(" "),i("p",[e._v("这个程序比它预期的速度慢得多，因为它意外地声明了一个局部变量 "),i("code",[e._v("(sum)")]),e._v("，它是包装类型 Long，而不是基本类型 long。程序在没有错误或警告的情况下编译，变量被反复装箱和拆箱，导致产生明显的性能下降。")]),e._v(" "),i("p",[e._v("In all three of the programs discussed in this item, the problem was the same: the programmer ignored the distinction between primitives and boxed primitives and suffered the consequences. In the first two programs, the consequences were outright failure; in the third, severe performance problems.")]),e._v(" "),i("p",[e._v("在本条目中讨论的所有三个程序中，问题都是一样的：程序员忽略了基本类型和包装类型之间的区别，并承担了恶果。在前两个项目中，结果是彻底的失败；第三个例子还产生了严重的性能问题。")]),e._v(" "),i("p",[e._v("So when should you use boxed primitives? They have several legitimate uses. The first is as elements, keys, and values in collections. You can’t put primitives in collections, so you’re forced to use boxed primitives. This is a special case of a more general one. You must use boxed primitives as type parameters in parameterized types and methods (Chapter 5), because the language does not permit you to use primitives. For example, you cannot declare a variable to be of type "),i("code",[e._v("ThreadLocal<int>")]),e._v(", so you must use "),i("code",[e._v("ThreadLocal<Integer>")]),e._v(" instead. Finally, you must use boxed primitives when making reflective method invocations (Item 65).")]),e._v(" "),i("p",[e._v("那么，什么时候应该使用包装类型呢？它们有几个合法的用途。第一个是作为集合中的元素、键和值。不能将基本类型放在集合中，因此必须使用包装类型。这是一般情况下的特例。在参数化类型和方法（Chapter 5）中，必须使用包装类型作为类型参数，因为 Java 不允许使用基本类型。例如，不能将变量声明为 "),i("code",[e._v("ThreadLocal<int>")]),e._v(" 类型，因此必须使用 "),i("code",[e._v("ThreadLocal<Integer>")]),e._v("。最后，在进行反射方法调用时，必须使用包装类型（"),i("RouterLink",{attrs:{to:"/Chapter-9/Chapter-9-Item-65-Prefer-interfaces-to-reflection.html"}},[e._v("Item-65")]),e._v("）。")],1),e._v(" "),i("p",[e._v("In summary, use primitives in preference to boxed primitives whenever you have the choice. Primitive types are simpler and faster. If you must use boxed primitives, be careful! "),i("strong",[e._v("Autoboxing reduces the verbosity, but not the danger, of using boxed primitives.")]),e._v(" When your program compares two boxed primitives with the == operator, it does an identity comparison, which is almost certainly not what you want. When your program does mixed-type computations involving boxed and unboxed primitives, it does unboxing, and "),i("strong",[e._v("when your program does unboxing, it can throw a NullPointerException.")]),e._v(" Finally, when your program boxes primitive values, it can result in costly and unnecessary object creations.")]),e._v(" "),i("p",[e._v("总之，只要有选择，就应该优先使用基本类型，而不是包装类型。基本类型更简单、更快。如果必须使用包装类型，请小心！"),i("strong",[e._v("自动装箱减少了使用包装类型的冗长，但没有减少危险。")]),e._v(" 当你的程序使用 "),i("code",[e._v("==")]),e._v(" 操作符比较两个包装类型时，它会执行标识比较，这几乎肯定不是你想要的。当你的程序执行包含包装类型和基本类型的混合类型计算时，它将进行拆箱，"),i("strong",[e._v("当你的程序执行拆箱时，将抛出 NullPointerException。")]),e._v(" 最后，当你的程序将基本类型装箱时，可能会导致代价高昂且不必要的对象创建。")])])}),[],!1,null,null,null);t.default=r.exports}}]);