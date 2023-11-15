(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{1511:function(e,s,a){"use strict";a.r(s);var t=a(65),n=Object(t.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"chapter-4-classes-and-interfaces-类和接口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chapter-4-classes-and-interfaces-类和接口"}},[e._v("#")]),e._v(" Chapter 4. Classes and Interfaces（类和接口）")]),e._v(" "),a("h3",{attrs:{id:"item-16-in-public-classes-use-accessor-methods-not-public-fields-在公共类中-使用访问器方法-而不是公共字段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#item-16-in-public-classes-use-accessor-methods-not-public-fields-在公共类中-使用访问器方法-而不是公共字段"}},[e._v("#")]),e._v(" Item 16: In public classes, use accessor methods, not public fields（在公共类中，使用访问器方法，而不是公共字段）")]),e._v(" "),a("p",[e._v("Occasionally, you may be tempted to write degenerate classes that serve no purpose other than to group instance fields:")]),e._v(" "),a("p",[e._v("有时候，可能会编写一些退化类，这些类除了对实例字段进行分组之外，没有其他用途：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Degenerate classes like this should not be public!\nclass Point {\n    public double x;\n    public double y;\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("p",[e._v("Because the data fields of such classes are accessed directly, these classes do not offer the benefits of encapsulation (Item 15). You can’t change the representation without changing the API, you can’t enforce invariants, and you can’t take auxiliary action when a field is accessed. Hard-line object-oriented programmers feel that such classes are anathema and should always be replaced by classes with private fields and public accessor methods (getters) and, for mutable classes, mutators (setters):")]),e._v(" "),a("p",[e._v("因为这些类的数据字段是直接访问的，所以这些类没有提供封装的好处。不改变 API 就不能改变表现形式，不能实现不变量，也不能在访问字段时采取辅助操作。坚持面向对象思维的程序员会认为这样的类是令人厌恶的，应该被使用私有字段和公共访问方法 getter 的类所取代，对于可变类，则是赋值方法 setter：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Encapsulation of data by accessor methods and mutators\nclass Point {\n    private double x;\n    private double y;\n    public Point(double x, double y) {\n        this.x = x;\n        this.y = y;\n    }\n    public double getX() { return x; }\n    public double getY() { return y; }\n    public void setX(double x) { this.x = x; }\n    public void setY(double y) { this.y = y; }\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br")])]),a("p",[e._v("Certainly, the hard-liners are correct when it comes to public classes: if a class is accessible outside its package, provide accessor methods to preserve the flexibility to change the class’s internal representation. If a public class exposes its data fields, all hope of changing its representation is lost because client code can be distributed far and wide.")]),e._v(" "),a("p",[e._v("当然，当涉及到公共类时，强硬派是正确的：如果类可以在包之外访问，那么提供访问器方法来保持更改类内部表示的灵活性。如果一个公共类公开其数据字段，那么改变其表示形式的所有希望都将落空，因为客户端代码可以广泛分发。")]),e._v(" "),a("p",[e._v("However, if a class is package-private or is a private nested class, there is nothing inherently wrong with exposing its data fields—assuming they do an adequate job of describing the abstraction provided by the class. This approach generates less visual clutter than the accessor-method approach, both in the class definition and in the client code that uses it. While the client code is tied to the class’s internal representation, this code is confined to the package containing the class. If a change in representation becomes desirable, you can make the change without touching any code outside the package. In the case of a private nested class, the scope of the change is further restricted to the enclosing class.")]),e._v(" "),a("p",[e._v("但是，如果一个类是包级私有的或者是私有嵌套类，那么公开它的数据字段并没有什么本质上的错误（假设它们能够很好地描述类提供的抽象）。无论是在类定义还是在使用它的客户端代码中，这种方法产生的视觉混乱都比访问方法少。虽然客户端代码与类的内部表示绑定在一起，但这段代码仅限于包含该类的包。如果想要对表示形式进行更改，你可以在不接触包外部任何代码的情况下进行更改。对于私有嵌套类，更改的范围进一步限制在封闭类中。")]),e._v(" "),a("p",[e._v("Several classes in the Java platform libraries violate the advice that public classes should not expose fields directly. Prominent examples include the Point and Dimension classes in the java.awt package. Rather than examples to be emulated, these classes should be regarded as cautionary tales.As described in Item 67, the decision to expose the internals of the Dimension class resulted in a serious performance problem that is still with us today.")]),e._v(" "),a("p",[e._v("Java 库中的几个类违反了公共类不应该直接公开字段的建议。突出的例子包括 "),a("code",[e._v("java.awt")]),e._v(" 包中的 Point 和 Dimension。这些类不应被效仿，而应被视为警示。正如  所述，公开 Dimension 类的内部结构导致了严重的性能问题，这种问题至今仍存在。")]),e._v(" "),a("p",[e._v("While it’s never a good idea for a public class to expose fields directly, it is less harmful if the fields are immutable. You can’t change the representation of such a class without changing its API, and you can’t take auxiliary actions when a field is read, but you can enforce invariants. For example, this class guarantees that each instance represents a valid time:")]),e._v(" "),a("p",[e._v("虽然公共类直接公开字段从来都不是一个好主意，但是如果字段是不可变的，那么危害就会小一些。你不能在不更改该类的 API 的情况下更改该类的表现形式，也不能在读取字段时采取辅助操作，但是你可以实施不变量。例如，这个类保证每个实例代表一个有效的时间：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// Public class with exposed immutable fields - questionable\npublic final class Time {\n    private static final int HOURS_PER_DAY = 24;\n    private static final int MINUTES_PER_HOUR = 60;\n    public final int hour;\n    public final int minute;\n\n    public Time(int hour, int minute) {\n        if (hour < 0 || hour >= HOURS_PER_DAY)\n            throw new IllegalArgumentException("Hour: " + hour);\n        if (minute < 0 || minute >= MINUTES_PER_HOUR)\n            throw new IllegalArgumentException("Min: " + minute);\n        this.hour = hour;\n        this.minute = minute;\n    } ... // Remainder omitted\n}\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br")])]),a("p",[e._v("In summary, public classes should never expose mutable fields. It is less harmful, though still questionable, for public classes to expose immutable fields.It is, however, sometimes desirable for package-private or private nested classes to expose fields, whether mutable or immutable.")]),e._v(" "),a("p",[e._v("总之，公共类不应该公开可变字段。对于公共类来说，公开不可变字段的危害要小一些，但仍然存在潜在的问题。然而，有时候包级私有或私有嵌套类需要公开字段，无论这个类是可变的还是不可变的。")])])}),[],!1,null,null,null);s.default=n.exports}}]);