(window.webpackJsonp=window.webpackJsonp||[]).push([[221],{1541:function(e,t,a){"use strict";a.r(t);var n=a(65),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"chapter-6-enums-and-annotations-枚举和注解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chapter-6-enums-and-annotations-枚举和注解"}},[e._v("#")]),e._v(" Chapter 6. Enums and Annotations（枚举和注解）")]),e._v(" "),a("h3",{attrs:{id:"item-41-use-marker-interfaces-to-define-types-使用标记接口定义类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#item-41-use-marker-interfaces-to-define-types-使用标记接口定义类型"}},[e._v("#")]),e._v(" Item 41: Use marker interfaces to define types（使用标记接口定义类型）")]),e._v(" "),a("p",[e._v("A marker interface is an interface that contains no method declarations but merely designates (or “marks”) a class that implements the interface as having some property. For example, consider the Serializable interface (Chapter 12). By implementing this interface, a class indicates that its instances can be written to an ObjectOutputStream (or “serialized”).")]),e._v(" "),a("p",[e._v("标记接口是一种不包含任何方法声明的接口，它只是指定（或「标记」）一个类，该类实现了具有某些属性的接口。例如，考虑 Serializable 接口（Chapter 12）。通过实现此接口，表示类的实例可以写入 ObjectOutputStream（或「序列化」）。")]),e._v(" "),a("p",[e._v("You may hear it said that marker annotations (Item 39) make marker interfaces obsolete. This assertion is incorrect. Marker interfaces have two advantages over marker annotations. First and foremost, "),a("strong",[e._v("marker interfaces define a type that is implemented by instances of the marked class; marker annotations do not.")]),e._v(" The existence of a marker interface type allows you to catch errors at compile time that you couldn’t catch until runtime if you used a marker annotation.")]),e._v(" "),a("p",[e._v("你可能听过一个说法：标记接口已经过时，更好的方式是标记注解。这个言论是错误的。与标记注解相比，标记接口有两个优点。首先，"),a("strong",[e._v("标记接口定义的类型由标记类的实例实现；标记注解不会。")]),e._v(" 标记接口类型的存在允许你在编译时捕获错误，如果你使用标记注解，则在运行时才能捕获这些错误。")]),e._v(" "),a("p",[e._v("Java’s serialization facility (Chapter 6) uses the Serializable marker interface to indicate that a type is serializable. The ObjectOutputStream.writeObject method, which serializes the object that is passed to it, requires that its argument be serializable. Had the argument of this method been of type Serializable, an attempt to serialize an inappropriate object would have been detected at compile time (by type checking). Compile-time error detection is the intent of marker interfaces, but unfortunately, the ObjectOutputStream.write API does not take advantage of the Serializable interface: its argument is declared to be of type Object, so attempts to serialize an unserializable object won’t fail until runtime.")]),e._v(" "),a("p",[e._v("Java 的序列化工具（Chapter 6）使用 Serializable 标记接口来表明一个类是可序列化的。"),a("code",[e._v("ObjectOutputStream.writeObject")]),e._v(" 方法序列化传递给它的对象，它要求其参数是可序列化的。假设该方法的参数类型是 Serializable，那么在编译时（通过类型检查）就会检测到对不合适的对象进行序列化的错误。编译时错误检测是使用标记接口的目的，但不幸的是，"),a("code",[e._v("ObjectOutputStream.writeObject")]),e._v(" 没有利用 Serializable 接口：它的参数被声明为 Object 类型，因此，如果尝试序列化一个不可序列化对象，直到运行时才会提示失败。")]),e._v(" "),a("p",[a("strong",[e._v("译注 1：原文 "),a("code",[e._v("ObjectOutputStream.write")]),e._v(" 有误，该方法的每种重载仅支持 int 类型和 byte[]，应修改为 "),a("code",[e._v("ObjectOutputStream.writeObject")]),e._v("，其源码如下：")])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public final void writeObject(Object obj) throws IOException {\n    if (enableOverride) {\n        writeObjectOverride(obj);\n        return;\n    }\n    try {\n        writeObject0(obj, false);\n    } catch (IOException ex) {\n        if (depth == 0) {\n            writeFatalException(ex);\n        }\n        throw ex;\n    }\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br")])]),a("p",[a("strong",[e._v("译注 2：使用 ObjectOutputStream.writeObject 的例子")])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public class BaseClass implements Serializable {\n    private final int id;\n    private final String name;\n\n    public BaseClass(int id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n\n    @Override\n    public String toString() {\n        return "id=" + id + ", name=\'" + name + \'\\\'\';\n    }\n}\n\npublic class Main {\n    private void Out() throws IOException {\n        BaseClass obj = new BaseClass(1, "Mark");\n        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(new File("out.txt")))) {\n            out.writeObject(obj);\n        }\n    }\n\n    private void In() throws IOException, ClassNotFoundException {\n        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(new File("out.txt")))) {\n            BaseClass obj = (BaseClass) in.readObject();\n            System.out.println(obj);\n        }\n    }\n}\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br"),a("span",{staticClass:"line-number"},[e._v("25")]),a("br"),a("span",{staticClass:"line-number"},[e._v("26")]),a("br"),a("span",{staticClass:"line-number"},[e._v("27")]),a("br"),a("span",{staticClass:"line-number"},[e._v("28")]),a("br"),a("span",{staticClass:"line-number"},[e._v("29")]),a("br"),a("span",{staticClass:"line-number"},[e._v("30")]),a("br")])]),a("p",[a("strong",[e._v("Another advantage of marker interfaces over marker annotations is that they can be targeted more precisely.")]),e._v(" If an annotation type is declared with target ElementType.TYPE, it can be applied to any class or interface. Suppose you have a marker that is applicable only to implementations of a particular interface. If you define it as a marker interface, you can have it extend the sole interface to which it is applicable, guaranteeing that all marked types are also subtypes of the sole interface to which it is applicable.")]),e._v(" "),a("p",[a("strong",[e._v("标记接口相对于标记注解的另一个优点是可以更精确地定位它们。")]),e._v(" 如果注解类型使用 "),a("code",[e._v("@Target(ElementType.TYPE)")]),e._v(" 声明，它可以应用于任何类或接口。假设你有一个只适用于特定接口来实现的标记。如果将其定义为标记接口，则可以让它扩展其适用的惟一接口，确保所有标记的类型也是其适用的惟一接口的子类型。")]),e._v(" "),a("p",[e._v("Arguably, the Set interface is just such a restricted marker interface. It is applicable only to Collection subtypes, but it adds no methods beyond those defined by Collection. It is not generally considered to be a marker interface because it refines the contracts of several Collection methods, including add, equals, and hashCode. But it is easy to imagine a marker interface that is applicable only to subtypes of some particular interface and does not refine the contracts of any of the interface’s methods. Such a marker interface might describe some invariant of the entire object or indicate that instances are eligible for processing by a method of some other class (in the way that the Serializable interface indicates that instances are eligible for processing by ObjectOutputStream).")]),e._v(" "),a("p",[e._v("可以说，Set 接口就是这样一个受限的标记接口。它只适用于 Collection 的子类，但是除了 Collection 定义的方法之外，它不添加任何方法。它通常不被认为是一个标记接口，因为它细化了几个 Collection 方法的约定，包括 add、equals 和 hashCode。但是很容易想象一个标记接口只适用于某些特定接口的子类，而不细化任何接口方法的约定。这样的标记接口可能描述整个对象的某个不变量，或者表明实例能够利用其他类的方法进行处理（就像 Serializable 接口能够利用 ObjectOutputStream 进行处理一样）。")]),e._v(" "),a("p",[a("strong",[e._v("The chief advantage of marker annotations over marker interfaces is that they are part of the larger annotation facility.")]),e._v(" Therefore, marker annotations allow for consistency in annotation-based frameworks.")]),e._v(" "),a("p",[a("strong",[e._v("相对于标记接口，标记注解的主要优势是它们可以是其他注解功能的一部分。")]),e._v(" 因此，标记注解能够与基于使用注解的框架保持一致性。")]),e._v(" "),a("p",[e._v("So when should you use a marker annotation and when should you use a marker interface? Clearly you must use an annotation if the marker applies to any program element other than a class or interface, because only classes and interfaces can be made to implement or extend an interface. If the marker applies only to classes and interfaces, ask yourself the question “Might I want to write one or more methods that accept only objects that have this marking?” If so, you should use a marker interface in preference to an annotation. This will make it possible for you to use the interface as a parameter type for the methods in question, which will result in the benefit of compile-time type checking. If you can convince yourself that you’ll never want to write a method that accepts only objects with the marking, then you’re probably better off using a marker annotation. If, additionally, the marking is part of a framework that makes heavy use of annotations, then a marker annotation is the clear choice.")]),e._v(" "),a("p",[e._v("那么什么时候应该使用标记注解，什么时候应该使用标记接口呢？显然，如果标记应用于类或接口之外的任何程序元素，则必须使用标记注解，因为只有类和接口才能实现或扩展接口。如果标记只适用于类和接口，那么可以问自己这样一个问题：「我是否可以编写一个或多个方法，只接受具有这种标记的对象？」如果是这样，你应该使用标记接口而不是标记注解。这将使你能够将接口用作相关方法的参数类型，这将带来编译时类型检查的好处。如果你确信自己永远不会编写只接受带有标记的对象的方法，那么最好使用标记注解。此外，如果框架大量使用注解，那么标记注解就是明确的选择。")]),e._v(" "),a("p",[e._v("In summary, marker interfaces and marker annotations both have their uses. If you want to define a type that does not have any new methods associated with it, a marker interface is the way to go. If you want to mark program elements other than classes and interfaces or to fit the marker into a framework that already makes heavy use of annotation types, then a marker annotation is the correct choice. "),a("strong",[e._v("If you find yourself writing a marker annotation type whose target is ElementType.TYPE, take the time to figure out whether it really should be an annotation type or whether a marker interface would be more appropriate.")])]),e._v(" "),a("p",[e._v("总之，标记接口和标记注解都有各自的用途。如果你想要定义一个没有与之关联的新方法的类型，可以使用标记接口。如果你希望标记类和接口之外的程序元素，或者将标记符放入已经大量使用注解类型的框架中，那么标记注解就是正确的选择。如果你发现自己编写的标记注解类型有 "),a("code",[e._v("@Target(ElementType.TYPE)")]),e._v(" 声明（"),a("strong",[e._v("译注：意在说明既可以用标记注解，也可以用标记接口的情况")]),e._v("），那么请花时间弄清楚究竟应该用注解类型，还是标记接口更合适。")]),e._v(" "),a("p",[e._v("In a sense, this item is the inverse of Item 22, which says, “If you don’t want to define a type, don’t use an interface.” To a first approximation, this item says, “If you do want to define a type, do use an interface.”")]),e._v(" "),a("p",[e._v("从某种意义上说，本条目与的说法相反，也就是说，「如果不想定义类型，就不要使用接口。」，与本条目应用场景适应的说法是，「如果你确实想定义类型，那么就要使用接口。」")])])}),[],!1,null,null,null);t.default=s.exports}}]);