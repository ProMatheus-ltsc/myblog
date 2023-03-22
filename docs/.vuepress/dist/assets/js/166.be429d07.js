(window.webpackJsonp=window.webpackJsonp||[]).push([[166],{1483:function(e,t,n){"use strict";n.r(t);var a=n(65),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h2",{attrs:{id:"chapter-11-concurrency-并发"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#chapter-11-concurrency-并发"}},[e._v("#")]),e._v(" Chapter 11. Concurrency（并发）")]),e._v(" "),n("h3",{attrs:{id:"item-82-document-thread-safety-文档应包含线程安全属性"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#item-82-document-thread-safety-文档应包含线程安全属性"}},[e._v("#")]),e._v(" Item 82: Document thread safety（文档应包含线程安全属性）")]),e._v(" "),n("p",[e._v("How a class behaves when its methods are used concurrently is an important part of its contract with its clients. If you fail to document this aspect of a class’s behavior, its users will be forced to make assumptions. If these assumptions are wrong, the resulting program may perform insufficient synchronization (Item 78) or excessive synchronization (Item 79). In either case, serious errors may result.")]),e._v(" "),n("p",[e._v("类在其方法并发使用时的行为是其与客户端约定的重要组成部分。如果你没有记录类在这一方面的行为，那么它的用户将被迫做出假设。如果这些假设是错误的，生成的程序可能缺少足够的同步（"),n("RouterLink",{attrs:{to:"/Chapter-11/Chapter-11-Item-78-Synchronize-access-to-shared-mutable-data.html"}},[e._v("Item-78")]),e._v("）或过度的同步（"),n("RouterLink",{attrs:{to:"/Chapter-11/Chapter-11-Item-79-Avoid-excessive-synchronization.html"}},[e._v("Item-79")]),e._v("）。无论哪种情况，都可能导致严重的错误。")],1),e._v(" "),n("p",[e._v("You may hear it said that you can tell if a method is thread-safe by looking for the synchronized modifier in its documentation. This is wrong on several counts. In normal operation, Javadoc does not include the synchronized modifier in its output, and with good reason. "),n("strong",[e._v("The presence of the synchronized modifier in a method declaration is an implementation detail, not a part of its API.")]),e._v(" It does not reliably indicate that a method is thread-safe.")]),e._v(" "),n("p",[e._v("你可能听说过，可以通过在方法的文档中查找 synchronized 修饰符来判断方法是否线程安全。这个观点有好些方面是错误的。在正常操作中，Javadoc 的输出中没有包含同步修饰符，这是有原因的。方法声明中 synchronized 修饰符的存在是实现细节，而不是其 API 的一部分。"),n("strong",[e._v("它不能可靠地表明方法是线程安全的。")])]),e._v(" "),n("p",[e._v("Moreover, the claim that the presence of the synchronized modifier is sufficient to document thread safety embodies the misconception that thread safety is an all-or-nothing property. In fact, there are several levels of thread safety. "),n("strong",[e._v("To enable safe concurrent use, a class must clearly document what level of thread safety it supports.")]),e._v(" The following list summarizes levels of thread safety. It is not exhaustive but covers the common cases:")]),e._v(" "),n("p",[e._v("此外，声称 synchronized 修饰符的存在就足以记录线程安全性，这个观点是对线程安全性属性的误解，认为要么全有要么全无。实际上，线程安全有几个级别。"),n("strong",[e._v("要启用安全的并发使用，类必须清楚地记录它支持的线程安全级别。")]),e._v(" 下面的列表总结了线程安全级别。它并非详尽无遗，但涵盖以下常见情况：")]),e._v(" "),n("ul",[n("li",[n("strong",[e._v("Immutable")]),e._v(" —Instances of this class appear constant. No external synchronization is necessary. Examples include String, Long, and BigInteger (Item 17).")])]),e._v(" "),n("p",[e._v("不可变的。这个类的实例看起来是常量。不需要外部同步。示例包括 String、Long 和 BigInteger（"),n("RouterLink",{attrs:{to:"/Chapter-4/Chapter-4-Item-17-Minimize-mutability.html"}},[e._v("Item-17")]),e._v("）。")],1),e._v(" "),n("ul",[n("li",[n("strong",[e._v("Unconditionally thread-safe")]),e._v(" —Instances of this class are mutable, but the class has sufficient internal synchronization that its instances can be used concurrently without the need for any external synchronization. Examples include AtomicLong and ConcurrentHashMap.")])]),e._v(" "),n("p",[e._v("无条件线程安全。该类的实例是可变的，但是该类具有足够的内部同步，因此无需任何外部同步即可并发地使用该类的实例。例如 AtomicLong 和 ConcurrentHashMap。")]),e._v(" "),n("ul",[n("li",[n("strong",[e._v("Conditionally thread-safe")]),e._v(" —Like unconditionally thread-safe, except that some methods require external synchronization for safe concurrent use. Examples include the collections returned by the Collections.synchronized wrappers, whose iterators require external synchronization.")])]),e._v(" "),n("p",[e._v("有条件的线程安全。与无条件线程安全类似，只是有些方法需要外部同步才能安全并发使用。示例包括 Collections.synchronized 包装器返回的集合，其迭代器需要外部同步。")]),e._v(" "),n("ul",[n("li",[n("strong",[e._v("Not thread-safe")]),e._v(" —Instances of this class are mutable. To use them concurrently, clients must surround each method invocation (or invocation sequence) with external synchronization of the clients’ choosing. Examples include the general-purpose collection implementations, such as ArrayList and HashMap.")])]),e._v(" "),n("p",[e._v("非线程安全。该类的实例是可变的。要并发地使用它们，客户端必须使用外部同步来包围每个方法调用（或调用序列）。这样的例子包括通用的集合实现，例如 ArrayList 和 HashMap。")]),e._v(" "),n("ul",[n("li",[n("strong",[e._v("Thread-hostile")]),e._v(" —This class is unsafe for concurrent use even if every method invocation is surrounded by external synchronization. Thread hostility usually results from modifying static data without synchronization. No one writes a thread-hostile class on purpose; such classes typically result from the failure to consider concurrency. When a class or method is found to be thread-hostile, it is typically fixed or deprecated. The generateSerialNumber method in Item 78 would be thread-hostile in the absence of internal synchronization, as discussed on page 322.")])]),e._v(" "),n("p",[e._v("线程对立。即使每个方法调用都被外部同步包围，该类对于并发使用也是不安全的。线程对立通常是由于在不同步的情况下修改静态数据而导致的。没有人故意编写线程对立类；此类通常是由于没有考虑并发性而导致的。当发现类或方法与线程不相容时，通常将其修复或弃用。"),n("RouterLink",{attrs:{to:"/Chapter-11/Chapter-11-Item-78-Synchronize-access-to-shared-mutable-data.html"}},[e._v("Item-78")]),e._v(" 中的 generateSerialNumber 方法在没有内部同步的情况下是线程对立的，如第 322 页所述。")],1),e._v(" "),n("p",[e._v("These categories (apart from thread-hostile) correspond roughly to the thread safety annotations in Java Concurrency in Practice, which are Immutable, ThreadSafe, and NotThreadSafe [Goetz06, Appendix A]. The unconditionally and conditionally thread-safe categories in the above taxonomy are both covered under the ThreadSafe annotation.")]),e._v(" "),n("p",[e._v("这些类别（不包括线程对立类）大致对应于《Java Concurrency in Practice》中的线程安全注解，分别为 Immutable、ThreadSafe 和 NotThreadSafe [Goetz06, Appendix A]。上面分类中的无条件线程安全和有条件的线程安全都包含在 ThreadSafe 注解中。")]),e._v(" "),n("p",[e._v("Documenting a conditionally thread-safe class requires care. You must indicate which invocation sequences require external synchronization, and which lock (or in rare cases, locks) must be acquired to execute these sequences. Typically it is the lock on the instance itself, but there are exceptions. For example, the documentation for Collections.synchronizedMap says this:")]),e._v(" "),n("p",[e._v("在文档中记录一个有条件的线程安全类需要小心。你必须指出哪些调用序列需要外部同步，以及执行这些序列必须获得哪些锁（在极少数情况下是锁）。通常是实例本身的锁，但也有例外。例如，"),n("code",[e._v("Collections.synchronizedMap")]),e._v(" 的文档提到：")]),e._v(" "),n("p",[e._v("It is imperative that the user manually synchronize on the returned map when iterating over any of its collection views:")]),e._v(" "),n("p",[e._v("当用户遍历其集合视图时，必须手动同步返回的 Map：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("Map<K, V> m = Collections.synchronizedMap(new HashMap<>());\nSet<K> s = m.keySet(); // Needn't be in synchronized block\n...\nsynchronized(m) { // Synchronizing on m, not s!\n    for (K key : s)\n        key.f();\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br")])]),n("p",[e._v("Failure to follow this advice may result in non-deterministic behavior.")]),e._v(" "),n("p",[e._v("不遵循这个建议可能会导致不确定的行为。")]),e._v(" "),n("p",[e._v("The description of a class’s thread safety generally belongs in the class’s doc comment, but methods with special thread safety properties should describe these properties in their own documentation comments. It is not necessary to document the immutability of enum types. Unless it is obvious from the return type, static factories must document the thread safety of the returned object, as demonstrated by Collections.synchronizedMap (above).")]),e._v(" "),n("p",[e._v("类的线程安全的描述通常属于该类的文档注释，但是具有特殊线程安全属性的方法应该在它们自己的文档注释中描述这些属性。没有必要记录枚举类型的不变性。除非从返回类型可以明显看出，否则静态工厂必须记录返回对象的线程安全性，正如 "),n("code",[e._v("Collections.synchronizedMap")]),e._v(" 所演示的那样。")]),e._v(" "),n("p",[e._v("When a class commits to using a publicly accessible lock, it enables clients to execute a sequence of method invocations atomically, but this flexibility comes at a price. It is incompatible with high-performance internal concurrency control, of the sort used by concurrent collections such as ConcurrentHashMap. Also, a client can mount a denial-of-service attack by holding the publicly accessible lock for a prolonged period. This can be done accidentally or intentionally.")]),e._v(" "),n("p",[e._v("当一个类使用公共可访问锁时，它允许客户端自动执行一系列方法调用，但是这种灵活性是有代价的。它与诸如 ConcurrentHashMap 之类的并发集合所使用的高性能内部并发控制不兼容。此外，客户端可以通过长时间持有可公开访问的锁来发起拒绝服务攻击。这可以是无意的，也可以是有意的。")]),e._v(" "),n("p",[e._v("To prevent this denial-of-service attack, you can use a private lock object instead of using synchronized methods (which imply a publicly accessible lock):")]),e._v(" "),n("p",[e._v("为了防止这种拒绝服务攻击，你可以使用一个私有锁对象，而不是使用同步方法（隐含一个公共可访问的锁）：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// Private lock object idiom - thwarts denial-of-service attack\nprivate final Object lock = new Object();\npublic void foo() {\n    synchronized(lock) {\n        ...\n    }\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br")])]),n("p",[e._v("Because the private lock object is inaccessible outside the class, it is impossible for clients to interfere with the object’s synchronization. In effect, we are applying the advice of Item 15 by encapsulating the lock object in the object it synchronizes.")]),e._v(" "),n("p",[e._v("因为私有锁对象在类之外是不可访问的，所以客户端不可能干扰对象的同步。实际上，我们通过将锁对象封装在它同步的对象中，是在应用 "),n("RouterLink",{attrs:{to:"/Chapter-4/Chapter-4-Item-15-Minimize-the-accessibility-of-classes-and-members.html"}},[e._v("Item-15")]),e._v(" 的建议。")],1),e._v(" "),n("p",[e._v("Note that the lock field is declared final. This prevents you from inadvertently changing its contents, which could result in catastrophic unsynchronized access (Item 78). We are applying the advice of Item 17, by minimizing the mutability of the lock field. "),n("strong",[e._v("Lock fields should always be declared final.")]),e._v(" This is true whether you use an ordinary monitor lock (as shown above) or a lock from the java.util.concurrent.locks package.")]),e._v(" "),n("p",[e._v("注意，lock 字段被声明为 final。这可以防止你无意中更改它的内容，这可能导致灾难性的非同步访问（"),n("RouterLink",{attrs:{to:"/Chapter-11/Chapter-11-Item-78-Synchronize-access-to-shared-mutable-data.html"}},[e._v("Item-78")]),e._v("）。我们正在应用 "),n("RouterLink",{attrs:{to:"/Chapter-4/Chapter-4-Item-17-Minimize-mutability.html"}},[e._v("Item-17")]),e._v(" 的建议，最小化锁字段的可变性。"),n("strong",[e._v("Lock 字段应该始终声明为 final。")]),e._v(" 无论使用普通的监视器锁（如上所示）还是 "),n("code",[e._v("java.util.concurrent")]),e._v(" 包中的锁，都是这样。")],1),e._v(" "),n("p",[e._v("The private lock object idiom can be used only on unconditionally thread-safe classes. Conditionally thread-safe classes can’t use this idiom because they must document which lock their clients are to acquire when performing certain method invocation sequences.")]),e._v(" "),n("p",[e._v("私有锁对象用法只能在无条件的线程安全类上使用。有条件的线程安全类不能使用这种用法，因为它们必须在文档中记录，在执行某些方法调用序列时要获取哪些锁。")]),e._v(" "),n("p",[e._v("The private lock object idiom is particularly well-suited to classes designed for inheritance (Item 19). If such a class were to use its instances for locking, a subclass could easily and unintentionally interfere with the operation of the base class, or vice versa. By using the same lock for different purposes, the subclass and the base class could end up “stepping on each other’s toes.” This is not just a theoretical problem; it happened with the Thread class [Bloch05, Puzzle 77].")]),e._v(" "),n("p",[e._v("私有锁对象用法特别适合为继承而设计的类（"),n("RouterLink",{attrs:{to:"/Chapter-4/Chapter-4-Item-19-Design-and-document-for-inheritance-or-else-prohibit-it.html"}},[e._v("Item-19")]),e._v("）。如果这样一个类要使用它的实例进行锁定，那么子类很容易在无意中干扰基类的操作，反之亦然。通过为不同的目的使用相同的锁，子类和基类最终可能「踩到对方的脚趾头」。这不仅仅是一个理论问题，它就发生在 Thread 类中 [Bloch05, Puzzle 77]。")],1),e._v(" "),n("p",[e._v("To summarize, every class should clearly document its thread safety properties with a carefully worded prose description or a thread safety annotation. The synchronized modifier plays no part in this documentation. Conditionally thread-safe classes must document which method invocation sequences require external synchronization and which lock to acquire when executing these sequences. If you write an unconditionally thread-safe class, consider using a private lock object in place of synchronized methods. This protects you against synchronization interference by clients and subclasses and gives you more flexibility to adopt a sophisticated approach to concurrency control in a later release.")]),e._v(" "),n("p",[e._v("总之，每个类都应该措辞严谨的描述或使用线程安全注解清楚地记录其线程安全属性。synchronized 修饰符在文档中没有任何作用。有条件的线程安全类必须记录哪些方法调用序列需要外部同步，以及在执行这些序列时需要获取哪些锁。如果你编写一个无条件线程安全的类，请考虑使用一个私有锁对象来代替同步方法。这将保护你免受客户端和子类的同步干扰，并为你提供更大的灵活性，以便在后续的版本中采用复杂的并发控制方式。")])])}),[],!1,null,null,null);t.default=s.exports}}]);