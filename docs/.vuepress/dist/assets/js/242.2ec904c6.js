(window.webpackJsonp=window.webpackJsonp||[]).push([[242],{1560:function(e,t,a){"use strict";a.r(t);var n=a(65),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"chapter-9-general-programming-通用程序设计"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chapter-9-general-programming-通用程序设计"}},[e._v("#")]),e._v(" Chapter 9. General Programming（通用程序设计）")]),e._v(" "),a("h3",{attrs:{id:"item-59-know-and-use-the-libraries-了解并使用库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#item-59-know-and-use-the-libraries-了解并使用库"}},[e._v("#")]),e._v(" Item 59: Know and use the libraries（了解并使用库）")]),e._v(" "),a("p",[e._v("Suppose you want to generate random integers between zero and some upper bound. Faced with this common task, many programmers would write a little method that looks something like this:")]),e._v(" "),a("p",[e._v("假设你想要生成 0 到某个上界之间的随机整数。面对这个常见任务，许多程序员会编写一个类似这样的小方法：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Common but deeply flawed!\nstatic Random rnd = new Random();\nstatic int random(int n) {\n    return Math.abs(rnd.nextInt()) % n;\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("p",[e._v("This method may look good, but it has three flaws. The first is that if n is a small power of two, the sequence of random numbers will repeat itself after a fairly short period. The second flaw is that if n is not a power of two, some numbers will, on average, be returned more frequently than others. If n is large, this effect can be quite pronounced. This is powerfully demonstrated by the following program, which generates a million random numbers in a carefully chosen range and then prints out how many of the numbers fell in the lower half of the range:")]),e._v(" "),a("p",[e._v("这个方法看起来不错，但它有三个缺点。首先，如果 n 是小的平方数，随机数序列会在相当短的时间内重复。第二个缺陷是，如果 n 不是 2 的幂，那么平均而言，一些数字将比其他数字更频繁地返回。如果 n 很大，这种效果会很明显。下面的程序有力地证明了这一点，它在一个精心选择的范围内生成 100 万个随机数，然后打印出有多少个数字落在范围的下半部分：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public static void main(String[] args) {\n    int n = 2 * (Integer.MAX_VALUE / 3);\n    int low = 0;\n    for (int i = 0; i < 1000000; i++)\n        if (random(n) < n/2)\n    low++;\n    System.out.println(low);\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br")])]),a("p",[e._v("If the random method worked properly, the program would print a number close to half a million, but if you run it, you’ll find that it prints a number close to 666,666. Two-thirds of the numbers generated by the random method fall in the lower half of its range!")]),e._v(" "),a("p",[e._v("如果 random 方法工作正常，程序将输出一个接近 50 万的数字，但是如果运行它，你将发现它输出一个接近 666666 的数字。随机方法生成的数字中有三分之二落在其范围的下半部分！")]),e._v(" "),a("p",[e._v("The third flaw in the random method is that it can, on rare occasions, fail catastrophically, returning a number outside the specified range. This is so because the method attempts to map the value returned by rnd.nextInt() to a non-negative int by calling Math.abs. If nextInt() returns Integer.MIN_VALUE, Math.abs will also return Integer.MIN_VALUE, and the remainder operator (%) will return a negative number, assuming n is not a power of two. This will almost certainly cause your program to fail, and the failure may be difficult to reproduce.")]),e._v(" "),a("p",[e._v("random 方法的第三个缺陷是，在极少数情况下会返回超出指定范围的数字，这是灾难性的结果。这是因为该方法试图通过调用 "),a("code",[e._v("Math.abs")]),e._v(" 将 "),a("code",[e._v("rnd.nextInt()")]),e._v(" 返回的值映射到非负整数。如果 "),a("code",[e._v("nextInt()")]),e._v(" 返回整数。"),a("code",[e._v("Integer.MIN_VALUE")]),e._v("、"),a("code",[e._v("Math.abs")]),e._v(" 也将返回整数。假设 n 不是 2 的幂，那么 "),a("code",[e._v("Integer.MIN_VALUE")]),e._v(" 和求模运算符 "),a("code",[e._v("(%)")]),e._v(" 将返回一个负数。几乎肯定的是，这会导致你的程序失败，并且这种失败可能难以重现。")]),e._v(" "),a("p",[e._v("To write a version of the random method that corrects these flaws, you’d have to know a fair amount about pseudorandom number generators, number theory, and two’s complement arithmetic. Luckily, you don’t have to do this— it’s been done for you. It’s called Random.nextInt(int). You needn’t concern yourself with the details of how it does its job (although you can study the documentation or the source code if you’re curious). A senior engineer with a background in algorithms spent a good deal of time designing, implementing, and testing this method and then showed it to several experts in the field to make sure it was right. Then the library was beta tested, released, and used extensively by millions of programmers for almost two decades. No flaws have yet been found in the method, but if a flaw were to be discovered, it would be fixed in the next release. "),a("strong",[e._v("By using a standard library, you take advantage of the knowledge of the experts who wrote it and the experience of those who used it before you.")])]),e._v(" "),a("p",[e._v("要编写一个 random 方法来纠正这些缺陷，你必须对伪随机数生成器、数论和 2 的补码算法有一定的了解。幸运的是，你不必这样做（这是为你而做的成果）。它被称为 "),a("code",[e._v("Random.nextInt(int)")]),e._v("。你不必关心它如何工作的（尽管如果你感兴趣，可以研究文档或源代码）。一位具有算法背景的高级工程师花了大量时间设计、实现和测试这种方法，然后将其展示给该领域的几位专家，以确保它是正确的。然后，这个库经过 beta 测试、发布，并被数百万程序员广泛使用了近 20 年。该方法还没有发现任何缺陷，但是如果发现了缺陷，将在下一个版本中进行修复。"),a("strong",[e._v("通过使用标准库，你可以利用编写它的专家的知识和以前使用它的人的经验。")])]),e._v(" "),a("p",[e._v("As of Java 7, you should no longer use Random. For most uses, "),a("strong",[e._v("the random number generator of choice is now ThreadLocalRandom.")]),e._v(" It produces higher quality random numbers, and it’s very fast. On my machine, it is 3.6 times faster than Random. For fork join pools and parallel streams, use SplittableRandom.")]),e._v(" "),a("p",[e._v("从 Java 7 开始，就不应该再使用 Random。在大多数情况下，"),a("strong",[e._v("选择的随机数生成器现在是 ThreadLocalRandom。")]),e._v(" 它能产生更高质量的随机数，而且速度非常快。在我的机器上，它比 Random 快 3.6 倍。对于 fork 连接池和并行流，使用 SplittableRandom。")]),e._v(" "),a("p",[e._v("A second advantage of using the libraries is that you don’t have to waste your time writing ad hoc solutions to problems that are only marginally related to your work. If you are like most programmers, you’d rather spend your time working on your application than on the underlying plumbing.")]),e._v(" "),a("p",[e._v("使用这些库的第二个好处是，你不必浪费时间为那些与你的工作无关的问题编写专门的解决方案。如果你像大多数程序员一样，那么你宁愿将时间花在应用程序上，而不是底层管道上。")]),e._v(" "),a("p",[e._v("A third advantage of using standard libraries is that their performance tends to improve over time, with no effort on your part. Because many people use them and because they’re used in industry-standard benchmarks, the organizations that supply these libraries have a strong incentive to make them run faster. Many of the Java platform libraries have been rewritten over the years, sometimes repeatedly, resulting in dramatic performance improvements. A fourth advantage of using libraries is that they tend to gain functionality over time. If a library is missing something, the developer community will make it known, and the missing functionality may get added in a subsequent release.")]),e._v(" "),a("p",[e._v("使用标准库的第三个优点是，随着时间的推移，它们的性能会不断提高，而你无需付出任何努力。由于许多人使用它们，而且它们是在行业标准基准中使用的，所以提供这些库的组织有很强的动机使它们运行得更快。多年来，许多 Java 平台库都被重新编写过，有时甚至是反复编写，从而带来了显著的性能改进。使用库的第四个好处是，随着时间的推移，它们往往会获得新功能。如果一个库丢失了一些东西，开发人员社区会将其公布于众，并且丢失的功能可能会在后续版本中添加。")]),e._v(" "),a("p",[e._v("A final advantage of using the standard libraries is that you place your code in the mainstream. Such code is more easily readable, maintainable, and reusable by the multitude of developers.")]),e._v(" "),a("p",[e._v("使用标准库的最后一个好处是，可以将代码放在主干中。这样的代码更容易被开发人员阅读、维护和复用。")]),e._v(" "),a("p",[e._v("Given all these advantages, it seems only logical to use library facilities in preference to ad hoc implementations, yet many programmers don’t. Why not? Perhaps they don’t know the library facilities exist. "),a("strong",[e._v("Numerous features are added to the libraries in every major release, and it pays to keep abreast of these additions.")]),e._v(" Each time there is a major release of the Java platform, a web page is published describing its new features. These pages are well worth reading [Java8-feat, Java9-feat]. To reinforce this point, suppose you wanted to write a program to print the contents of a URL specified on the command line (which is roughly what the Linux curl command does). Prior to Java 9, this code was a bit tedious, but in Java 9 the transferTo method was added to InputStream. Here is a complete program to perform this task using this new method:")]),e._v(" "),a("p",[e._v("考虑到所有这些优点，使用库工具而不选择专门的实现似乎是合乎逻辑的，但许多程序员并不这样做。为什么不呢？也许他们不知道库的存在。"),a("strong",[e._v("在每个主要版本中，都会向库中添加许多特性，了解这些新增特性是值得的。")]),e._v(" 每次发布 Java 平台的主要版本时，都会发布一个描述其新特性的 web 页面。这些页面非常值得一读 [Java8-feat, Java9-feat]。为了强调这一点，假设你想编写一个程序来打印命令行中指定的 URL 的内容（这大致是 Linux curl 命令所做的）。在 Java 9 之前，这段代码有点乏味，但是在 Java 9 中，transferTo 方法被添加到 InputStream 中。这是一个使用这个新方法执行这项任务的完整程序：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Printing the contents of a URL with transferTo, added in Java 9\npublic static void main(String[] args) throws IOException {\n    try (InputStream in = new URL(args[0]).openStream()) {\n        in.transferTo(System.out);\n    }\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])]),a("p",[e._v("The libraries are too big to study all the documentation [Java9-api], but "),a("strong",[e._v("every programmer should be familiar with the basics of java.lang, java.util, and java.io, and their subpackages.")]),e._v(" Knowledge of other libraries can be acquired on an as-needed basis. It is beyond the scope of this item to summarize the facilities in the libraries, which have grown immense over the years.")]),e._v(" "),a("p",[e._v("库太大，无法学习所有文档 [Java9-api]，但是 "),a("strong",[e._v("每个程序员都应该熟悉 "),a("code",[e._v("java.lang")]),e._v("、"),a("code",[e._v("java.util")]),e._v(" 和 "),a("code",[e._v("java.io")]),e._v(" 的基础知识及其子包。")]),e._v(" 其他库的知识可以根据需要获得。概述库中的工具超出了本项目的范围，这些工具多年来已经发展得非常庞大。")]),e._v(" "),a("p",[e._v("Several libraries bear special mention. The collections framework and the streams library (Items 45–48) should be part of every programmer’s basic toolkit, as should parts of the concurrency utilities in java.util.concurrent. This package contains both high-level utilities to simplify the task of multithreaded programming and low-level primitives to allow experts to write their own higher-level concurrent abstractions. The highlevel parts of java.util.concurrent are discussed in Items 80 and 81.")]),e._v(" "),a("p",[e._v("有几个图书馆值得一提。collections 框架和 streams 库（可参看 Item 45-48）应该是每个程序员的基本工具包的一部分，"),a("code",[e._v("java.util.concurrent")]),e._v(" 中的并发实用程序也应该是其中的一部分。这个包既包含高级的并发工具来简化多线程的编程任务，还包含低级别的并发基本类型，允许专家们自己编写更高级的并发抽象。"),a("code",[e._v("java.util.concurrent")]),e._v(" 的高级部分，在 "),a("RouterLink",{attrs:{to:"/Chapter-11/Chapter-11-Item-80-Prefer-executors,-tasks,-and-streams-to-threads.html"}},[e._v("Item-80")]),e._v(" 和 "),a("RouterLink",{attrs:{to:"/Chapter-11/Chapter-11-Item-81-Prefer-concurrency-utilities-to-wait-and-notify.html"}},[e._v("Item-81")]),e._v(" 中讨论。")],1),e._v(" "),a("p",[e._v("Occasionally, a library facility can fail to meet your needs. The more specialized your needs, the more likely this is to happen. While your first impulse should be to use the libraries, if you’ve looked at what they have to offer in some area and it doesn’t meet your needs, then use an alternate implementation. There will always be holes in the functionality provided by any finite set of libraries. If you can’t find what you need in Java platform libraries, your next choice should be to look in high-quality third-party libraries, such as Google’s excellent, open source Guava library [Guava]. If you can’t find the functionality that you need in any appropriate library, you may have no choice but to implement it yourself.")]),e._v(" "),a("p",[e._v("有时，类库工具可能无法满足你的需求。你的需求越专门化，发生这种情况的可能性就越大。虽然你的第一个思路应该是使用这些库，但是如果你已经了解了它们在某些领域提供的功能，而这些功能不能满足你的需求，那么可以使用另一种实现。任何有限的库集所提供的功能总是存在漏洞。如果你在 Java 平台库中找不到你需要的东西，你的下一个选择应该是寻找高质量的第三方库，比如谷歌的优秀的开源 Guava 库 [Guava]。如果你无法在任何适当的库中找到所需的功能，你可能别无选择，只能自己实现它。")]),e._v(" "),a("p",[e._v("To summarize, don’t reinvent the wheel. If you need to do something that seems like it should be reasonably common, there may already be a facility in the libraries that does what you want. If there is, use it; if you don’t know, check. Generally speaking, library code is likely to be better than code that you’d write yourself and is likely to improve over time. This is no reflection on your abilities as a programmer. Economies of scale dictate that library code receives far more attention than most developers could afford to devote to the same functionality.")]),e._v(" "),a("p",[e._v("总而言之，不要白费力气重新发明轮子。如果你需要做一些看起来相当常见的事情，那么库中可能已经有一个工具可以做你想做的事情。如果有，使用它；如果你不知道，检查一下。一般来说，库代码可能比你自己编写的代码更好，并且随着时间的推移可能会得到改进。这并不反映你作为一个程序员的能力。规模经济决定了库代码得到的关注要远远超过大多数开发人员所能承担的相同功能。")])])}),[],!1,null,null,null);t.default=r.exports}}]);