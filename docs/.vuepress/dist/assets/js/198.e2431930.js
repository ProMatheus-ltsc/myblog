(window.webpackJsonp=window.webpackJsonp||[]).push([[198],{1517:function(e,t,a){"use strict";a.r(t);var s=a(65),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"chapter-4-classes-and-interfaces-类和接口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chapter-4-classes-and-interfaces-类和接口"}},[e._v("#")]),e._v(" Chapter 4. Classes and Interfaces（类和接口）")]),e._v(" "),a("h3",{attrs:{id:"item-20-prefer-interfaces-to-abstract-classes-接口优于抽象类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#item-20-prefer-interfaces-to-abstract-classes-接口优于抽象类"}},[e._v("#")]),e._v(" Item 20: Prefer interfaces to abstract classes（接口优于抽象类）")]),e._v(" "),a("p",[e._v("Java has two mechanisms to define a type that permits multiple implementations: interfaces and abstract classes. Since the introduction of default methods for interfaces in Java 8 [JLS 9.4.3], both mechanisms allow you to provide implementations for some instance methods. A major difference is that to implement the type defined by an abstract class, a class must be a subclass of the abstract class. Because Java permits only single inheritance, this restriction on abstract classes severely constrains their use as type definitions.Any class that defines all the required methods and obeys the general contract is permitted to implement an interface, regardless of where the class resides in the class hierarchy.")]),e._v(" "),a("p",[e._v("Java 有两种机制来定义允许多种实现的类型：接口和抽象类。由于 Java 8 [JLS 9.4.3]中引入了接口的默认方法，这两种机制都允许你为一些实例方法提供实现。一个主要区别是，一个类要实现抽象类定义的类型，该类必须是抽象类的子类。因为 Java 只允许单一继承，这种限制对抽象类而言严重制约了它们作为类型定义的使用。任何定义了所有必需的方法并遵守通用约定的类都允许实现接口，而不管该类驻留在类层次结构中何处。")]),e._v(" "),a("p",[a("strong",[e._v("译注：")])]),e._v(" "),a("p",[a("strong",[e._v("1、抽象类的局限：一个类要实现抽象类定义的类型，该类必须是抽象类的子类。因为 Java 只允许单一继承，这种限制对抽象类而言严重制约了它们作为类型定义的使用。")])]),e._v(" "),a("p",[a("strong",[e._v("2、接口的优点：任何定义了所有必需的方法并遵守通用约定的类都允许实现接口，而不管该类驻留在类层次结构中何处。")])]),e._v(" "),a("p",[a("strong",[e._v("Existing classes can easily be retrofitted to implement a new interface.")]),e._v(" All you have to do is to add the required methods, if they don’t yet exist, and to add an implements clause to the class declaration. For example, many existing classes were retrofitted to implement the Comparable, Iterable, and Autocloseable interfaces when they were added to the platform. Existing classes cannot, in general, be retrofitted to extend a new abstract class. If you want to have two classes extend the same abstract class, you have to place it high up in the type hierarchy where it is an ancestor of both classes. Unfortunately,this can cause great collateral damage to the type hierarchy, forcing all descendants of the new abstract class to subclass it, whether or not it is appropriate.")]),e._v(" "),a("p",[a("strong",[e._v("可以很容易地对现有类进行改造，以实现新的接口。")]),e._v(" 你所要做的就是添加所需的方法（如果它们还不存在的话），并向类声明中添加一个 implements 子句。例如，许多现有的类在添加到 JDK 时进行了修改，以实现 Comparable、Iterable 和 Autocloseable 接口。一般来说，现有的类不能被修改以扩展新的抽象类。如果你想让两个类扩展同一个抽象类，你必须把它放在类型层次结构的高层，作为两个类的祖先。不幸的是，这可能会对类型层次结构造成巨大的附带损害，迫使新抽象类的所有后代对其进行子类化，无论它是否合适。")]),e._v(" "),a("p",[a("strong",[e._v("Interfaces are ideal for defining mixins.")]),e._v(" Loosely speaking, a mixin is a type that a class can implement in addition to its “primary type,” to declare that it provides some optional behavior. For example, Comparable is a mixin interface that allows a class to declare that its instances are ordered with respect to other mutually comparable objects. Such an interface is called a mixin because it allows the optional functionality to be “mixed in” to the type’s primary functionality. Abstract classes can’t be used to define mixins for the same reason that they can’t be retrofitted onto existing classes: a class cannot have more than one parent, and there is no reasonable place in the class hierarchy to insert a mixin.")]),e._v(" "),a("p",[a("strong",[e._v("接口是定义 mixin（混合类型）的理想工具。")]),e._v(" 粗略地说，mixin 是类除了「基本类型」之外还可以实现的类型，用于声明它提供了一些可选的行为。例如，Comparable 是一个 mixin 接口，它允许类的实例可以与其他的可相互比较的对象进行排序。这样的接口称为 mixin，因为它允许可选功能「混合」到类型的主要功能中。抽象类不能用于定义 mixin，原因与它们不能被修改到现有类相同：一个类不能有多个父类，而且在类层次结构中没有插入 mixin 的合理位置。")]),e._v(" "),a("p",[a("strong",[e._v("Interfaces allow for the construction of nonhierarchical type frameworks.")]),e._v(" Type hierarchies are great for organizing some things, but other things don’t fall neatly into a rigid hierarchy. For example, suppose we have an interface representing a singer and another representing a songwriter:")]),e._v(" "),a("p",[a("strong",[e._v("接口允许构造非层次化类型框架。")]),e._v(" 类型层次结构对于组织一些事情很好，但是其他事情不能整齐地归入严格的层次结构。例如，假设我们有一个代表歌手的接口和另一个代表词曲作者的接口：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public interface Singer {\n    AudioClip sing(Song s);\n}\n\npublic interface Songwriter {\n    Song compose(int chartPosition);\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br")])]),a("p",[e._v("In real life, some singers are also songwriters. Because we used interfaces rather than abstract classes to define these types, it is perfectly permissible for a single class to implement both Singer and Songwriter. In fact, we can define a third interface that extends both Singer and Songwriter and adds new methods that are appropriate to the combination:")]),e._v(" "),a("p",[e._v("在现实生活中，一些歌手也是词曲作者。因为我们使用接口而不是抽象类来定义这些类型，所以完全允许单个类同时实现歌手和词曲作者。事实上，我们可以定义第三个接口，扩展歌手和词曲作者，并添加适合这种组合的新方法：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public interface SingerSongwriter extends Singer, Songwriter {\n    AudioClip strum();\n    void actSensitive();\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])]),a("p",[e._v("You don’t always need this level of flexibility, but when you do, interfaces are a lifesaver. The alternative is a bloated class hierarchy containing a separate class for every supported combination of attributes. If there are n attributes in the type system, there are 2n possible combinations that you might have to support. This is what’s known as a combinatorial explosion. Bloated class hierarchies can lead to bloated classes with many methods that differ only in the type of their arguments because there are no types in the class hierarchy to capture common behaviors.")]),e._v(" "),a("p",[e._v("你并不总是需要这种级别的灵活性，但是当你需要时，接口就是救星。另一种选择是一个臃肿的类层次结构，它为每个受支持的属性组合包含一个单独的类。如果类型系统中有 n 个属性，那么可能需要支持 2"),a("sup",[e._v("n")]),e._v("种组合。这就是所谓的组合爆炸。臃肿的类层次结构可能导致类也臃肿，其中许多方法只在其参数的类型上有所不同，因为类层次结构中没有类型来捕获公共行为。")]),e._v(" "),a("p",[e._v("Interfaces enable safe, powerful functionality enhancements via the wrapper class idiom (Item 18). If you use abstract classes to define types, you leave the programmer who wants to add functionality with no alternative but inheritance. The resulting classes are less powerful and more fragile than wrapper classes.")]),e._v(" "),a("p",[e._v("通过介绍的包装类，接口能够支持安全、强大的功能增强。如果你使用抽象类来定义类型，那么希望添加功能的程序员除了继承之外别无选择。最终生成的类不如包装类强大，也更脆弱。")]),e._v(" "),a("p",[e._v("When there is an obvious implementation of an interface method in terms of other interface methods, consider providing implementation assistance to programmers in the form of a default method. For an example of this technique, see the removeIf method on page 104. If you provide default methods, be sure to document them for inheritance using the @implSpec Javadoc tag (Item 19).")]),e._v(" "),a("p",[e._v("如果接口方法的实现与其他接口方法类似，那么可以考虑以默认方法的形式为程序员提供实现帮助。有关此技术的示例，请参阅第 104 页的 removeIf 方法。如果提供了默认方法，请使用 "),a("code",[e._v("@implSpec")]),e._v(" 标签，并确保在文档中记录他们的继承关系。")]),e._v(" "),a("p",[e._v("There are limits on how much implementation assistance you can provide with default methods. Although many interfaces specify the behavior of Object methods such as equals and hashCode, you are not permitted to provide default methods for them. Also, interfaces are not permitted to contain instance fields or nonpublic static members (with the exception of private static methods). Finally, you can’t add default methods to an interface that you don’t control.")]),e._v(" "),a("p",[e._v("默认方法为实现提供的帮助有限。尽管许多接口指定了诸如 equals 和 hashCode 等对象方法的行为，但是不允许为它们提供默认方法。此外，接口不允许包含实例字段或非公共静态成员（私有静态方法除外）。最后，你不能向你不控制的接口添加默认方法。")]),e._v(" "),a("p",[e._v("You can, however, combine the advantages of interfaces and abstract classes by providing an abstract skeletal implementation class to go with an interface. The interface defines the type, perhaps providing some default methods, while the skeletal implementation class implements the remaining non-primitive interface methods atop the primitive interface methods. Extending a skeletal implementation takes most of the work out of implementing an interface. This is the Template Method pattern [Gamma95].")]),e._v(" "),a("p",[e._v("但是，你可以通过提供一个抽象骨架实现类来结合接口和抽象类的优点。接口定义了类型，可能提供了一些默认方法，而骨架实现类在基本接口方法之上实现了其余的非基本接口方法。扩展骨架实现需要完成实现接口的大部分工作。这是模板方法模式 [Gamma95]。")]),e._v(" "),a("p",[e._v("By convention, skeletal implementation classes are called AbstractInterface, where Interface is the name of the interface they implement. For example, the Collections Framework provides a skeletal implementation to go along with each main collection interface: AbstractCollection, AbstractSet, AbstractList, and AbstractMap. Arguably it would have made sense to call them SkeletalCollection, SkeletalSet, SkeletalList, and SkeletalMap, but the Abstract convention is now firmly established. When properly designed, skeletal implementations (whether a separate abstract class, or consisting solely of default methods on an interface) can make it very easy for programmers to provide their own implementations of an interface. For example, here’s a static factory method containing a complete, fully functional List implementation atop AbstractList:")]),e._v(" "),a("p",[e._v("按照惯例，骨架实现类称为 AbstractInterface，其中 Interface 是它们实现的接口的名称。例如，Collections Framework 提供了一个骨架实现来配合每个主要的集合接口：AbstractCollection、AbstractSet、AbstractList 和 AbstractMap。可以说，将它们称为 SkeletalCollection、SkeletalSet、SkeletalList 和 SkeletalMap 是有意义的，但 Abstract 的用法现在已经根深蒂固。如果设计得当，骨架实现（无论是单独的抽象类，还是仅仅由接口上的默认方法组成）可以使程序员非常容易地提供他们自己的接口实现。例如，这里有一个静态工厂方法，它在 AbstractList 上包含一个完整的、功能完整的 List 实现：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Concrete implementation built atop skeletal implementation\nstatic List<Integer> intArrayAsList(int[] a) {\n        Objects.requireNonNull(a);\n        // The diamond operator is only legal here in Java 9 and later\n        // If you're using an earlier release, specify <Integer>\n        return new AbstractList<>() {\n            @Override\n            public Integer get(int i) {\n                return a[i]; // Autoboxing (Item 6)\n            }\n\n            @Override\n            public Integer set(int i, Integer val) {\n                int oldVal = a[i];\n                a[i] = val; // Auto-unboxing\n                return oldVal; // Autoboxing\n            }\n\n            @Override\n            public int size() {\n                return a.length;\n            }\n        };\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br")])]),a("p",[e._v("When you consider all that a List implementation does for you, this example is an impressive demonstration of the power of skeletal implementations. Incidentally, this example is an Adapter [Gamma95] that allows an int array to be viewed as a list of Integer instances. Because of all the translation back and forth between int values and Integer instances (boxing and unboxing), its performance is not terribly good. Note that the implementation takes the form of an anonymous class (Item 24).")]),e._v(" "),a("p",[e._v("当你考虑到 List 实现为你做的所有事情时，这个例子是一个令人印象深刻的演示，体现了骨架实现的强大功能。顺便说一句，这个示例是一个 Adapter（适配器）[Gamma95]，它允许将 int 数组视为 Integer 实例的 list。因为在 int 值和 Integer 实例（装箱和拆箱）之间来回转换，所以它的性能不是很好。注意，实现的形式是匿名类。")]),e._v(" "),a("p",[e._v("The beauty of skeletal implementation classes is that they provide all of the implementation assistance of abstract classes without imposing the severe constraints that abstract classes impose when they serve as type definitions. For most implementors of an interface with a skeletal implementation class, extending this class is the obvious choice, but it is strictly optional. If a class cannot be made to extend the skeletal implementation, the class can always implement the interface directly. The class still benefits from any default methods present on the interface itself. Furthermore, the skeletal implementation can still aid the implementor’s task. The class implementing the interface can forward invocations of interface methods to a contained instance of a private inner class that extends the skeletal implementation. This technique, known as simulated multiple inheritance, is closely related to the wrapper class idiom discussed in Item 18. It provides many of the benefits of multiple inheritance, while avoiding the pitfalls.")]),e._v(" "),a("p",[e._v("骨架实现类的美妙之处在于，它们提供了抽象类的所有实现帮助，而不像抽象类作为类型定义时那样受到严格的约束。对于具有骨架实现类的接口的大多数实现来说，扩展这个类是显而易见的选择，但它并不是必需的。如果不能使类扩展骨架实现，则类总是可以直接实现接口。类仍然受益于接口本身的任何默认方法。此外，骨架实现仍然可以帮助实现人员完成任务。实现接口的类可以将接口方法的调用转发给扩展骨架实现的私有内部类的包含实例。这种技术称为模拟多重继承，与讨论的包装类密切相关。它提供了多重继承的许多好处，同时避免了缺陷。")]),e._v(" "),a("p",[e._v("Writing a skeletal implementation is a relatively simple, if somewhat tedious, process. First, study the interface and decide which methods are the primitives in terms of which the others can be implemented. These primitives will be the abstract methods in your skeletal implementation. Next, provide default methods in the interface for all of the methods that can be implemented directly atop the primitives, but recall that you may not provide default methods for Object methods such as equals and hashCode. If the primitives and default methods cover the interface, you’re done, and have no need for a skeletal implementation class. Otherwise, write a class declared to implement the interface, with implementations of all of the remaining interface methods. The class may contain any nonpublic fields ands methods appropriate to the task.")]),e._v(" "),a("p",[e._v("编写一个骨架实现是一个相对简单的过程，尽管有点乏味。首先，研究接口并决定哪些方法是基本方法，以便其他方法可以根据它们实现。这些基本方法将是你的骨架实现中的抽象方法。接下来，在接口中为所有可以直接在基本方法之上实现的方法提供默认方法，但请记住，你可能不会为诸如 equals 和 hashCode 之类的对象方法提供默认方法。如果基本方法和默认方法覆盖了接口，那么就完成了，不需要一个骨架实现类。否则，编写一个声明为实现接口的类，并实现所有剩余的接口方法。该类可能包含任何适合于任务的非公共字段和方法。")]),e._v(" "),a("p",[e._v("As a simple example, consider the Map.Entry interface. The obvious primitives are getKey, getValue, and (optionally) setValue. The interface specifies the behavior of equals and hashCode, and there is an obvious implementation of toString in terms of the primitives. Since you are not allowed to provide default implementations for the Object methods, all implementations are placed in the skeletal implementation class:")]),e._v(" "),a("p",[e._v("作为一个简单的例子，考虑一下 "),a("code",[e._v("Map.Entry")]),e._v(" 接口。最明显的基本方法是 getKey、getValue 和（可选的）setValue。该接口指定了 equals 和 hashCode 的行为，并且在基本方法方面有 toString 的明显实现。由于不允许为对象方法提供默认实现，所有实现都放在骨架实现类中：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// Skeletal implementation class\npublic abstract class AbstractMapEntry<K,V> implements Map.Entry<K,V> {\n\n    // Entries in a modifiable map must override this method\n    @Override public V setValue(V value) {\n        throw new UnsupportedOperationException();\n    }\n\n    // Implements the general contract of Map.Entry.equals\n    @Override public boolean equals(Object o) {\n        if (o == this)\n            return true;\n        if (!(o instanceof Map.Entry))\n            return false;\n        Map.Entry<?,?> e = (Map.Entry) o;\n        return Objects.equals(e.getKey(), getKey()) && Objects.equals(e.getValue(), getValue());\n    }\n\n    // Implements the general contract of Map.Entry.hashCode\n    @Override public int hashCode() {\n        return Objects.hashCode(getKey())^ Objects.hashCode(getValue());\n    }\n\n    @Override public String toString() {\n        return getKey() + "=" + getValue();\n    }\n}\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br"),a("span",{staticClass:"line-number"},[e._v("25")]),a("br"),a("span",{staticClass:"line-number"},[e._v("26")]),a("br"),a("span",{staticClass:"line-number"},[e._v("27")]),a("br")])]),a("p",[e._v("Note that this skeletal implementation could not be implemented in the Map.Entry interface or as a subinterface because default methods are not permitted to override Object methods such as equals, hashCode, and toString.")]),e._v(" "),a("p",[e._v("注意，这个骨架实现不能在 "),a("code",[e._v("Map.Entry")]),e._v(" 接口或子接口中实现，因为不允许默认方法覆盖诸如 equals、hashCode 和 toString 等对象方法。")]),e._v(" "),a("p",[e._v("Because skeletal implementations are designed for inheritance, you should follow all of the design and documentation guidelines in Item 19. For brevity’s sake, the documentation comments were omitted from the previous example, but good documentation is absolutely essential in a skeletal implementation, whether it consists of default methods on an interface or a separate abstract class.")]),e._v(" "),a("p",[e._v("因为骨架实现是为继承而设计的，所以你应该遵循设计和文档指南。为了简洁起见，在前面的示例中省略了文档注释，但是优秀的文档对于骨架实现来说是绝对必要的，不管它是由接口上的默认方法还是单独的抽象类组成。")]),e._v(" "),a("p",[e._v("A minor variant on the skeletal implementation is the simple implementation, exemplified by AbstractMap.SimpleEntry. A simple implementation is like a skeletal implementation in that it implements an interface and is designed for inheritance, but it differs in that it isn’t abstract: it is the simplest possible working implementation. You can use it as it stands or subclass it as circumstances warrant.")]),e._v(" "),a("p",[e._v("骨架实现的一个小变种是简单实现，例如 "),a("code",[e._v("AbstractMap.SimpleEntry")]),e._v("。一个简单的实现就像一个骨架实现，因为它实现了一个接口，并且是为继承而设计的，但是它的不同之处在于它不是抽象的：它是最简单的工作实现。你可以根据它的状态使用它，也可以根据情况对它进行子类化。")]),e._v(" "),a("p",[e._v("To summarize, an interface is generally the best way to define a type that permits multiple implementations. If you export a nontrivial interface, you should strongly consider providing a skeletal implementation to go with it. To the extent possible, you should provide the skeletal implementation via default methods on the interface so that all implementors of the interface can make use of it. That said, restrictions on interfaces typically mandate that a skeletal implementation take the form of an abstract class.")]),e._v(" "),a("p",[e._v("总之，接口通常是定义允许多种实现的类型的最佳方法。如果导出了一个重要的接口，则应该强烈考虑提供一个骨架实现。尽可能地，你应该通过接口上的默认方法提供骨架实现，以便接口的所有实现者都可以使用它。也就是说，对接口的限制通常要求框架实现采用抽象类的形式。")])])}),[],!1,null,null,null);t.default=n.exports}}]);