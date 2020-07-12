### 学习笔记

### 第2周 学习方法和构建知识体系

#### 1 JS语言通识

##### 1 范用语言分类方法

```
按语法分类：
	非形式语言	中文、英文
	形式语言	乔姆斯基谱系（上下包含）
		0型	无限制文法
			? ::= ?
		1型	上下文相关文法
			?<A>?::=?<B>?
		2型	上下文无关文法
			<A>::=?  左右没有关联，右侧经过一系列处理得当左侧
		3型	正则文法 （可以使用正则表达式表示所有文法）
			<A>::=<A>? // 正确
			<A>::=?<A> // 错误

2 ** 1 ** 2  // 2
```

##### 2 产生式（BNF）

```
用尖括号括起来的名称来表示语法结构名
	分为基础结构（终结符）和复合结构（非终结符）
	
引号和中间的字符表示终结符
可以有括号
*表示重复多次
|表示或
+表示至少出现一次

<MultiplicativeExpression> ::= <Number>|<MultiplicativeExpression>"*"<Number>|<MultiplicativeExpression>"/"<Number>

<AddtiveExpression> ::= <MultiplicativeExpression>|<AddtiveExpression>"+"<MultiplicativeExpression>|<AddtiveExpression>"-"<MultiplicativeExpression>|"("<AddtiveExpression>")"
```

##### 3 现代语言的分类

```
根据用途
	数据描述语言	JSON，HTML，XML，SQL，CSS
	编程语言	C，C++，JAVA，C#，Python，Ruby，Perl，JS，go, Clojure
根据表达方式
	声明式语言		JSON，HTML，XML，SQL，CSS,Clojure
	命令型语言		C，C++，JAVA，C#，Python，Ruby，Perl，JS，go
```

##### 4 编程语言的性质

```
图灵完备性	（一切可计算的问题都能计算，这样的虚拟机或者编程语言就叫图灵完备的）
	命令式----图灵机
		goto
		if和while
	声明式----lambda
		递归
		
动态与静态
	动态
		在用户的设备/在线服务器上
		产品实际运行时
		Runtime
	静态
		在程序员的设备上
		产品开发时
		Compiletime

类型系统
	动态类型系统与静态类型系统
	强类型与弱类型
		类型转换的形式（是否自动进行类型转换）
	符合类型
		结构体
		函数签名
	子类型
	泛型
		逆变、协变
```

##### 5 一般命令式变成语言的设计方式

```
Atom 原子级
	关键字、直接量
Expression 表达式
	Atom
	Operator
	Punctuator
Statement	语句
	Expression
	Keyword
	Punctuator
Structure	结构化
	Function
	Class
	Process
	Namespace
Program
	Program
	Module
	Package
	Library
	
语法 --> 语义 -->  运行时
```

##### 6 Atom 原子

```
Grammar 语法
	literal 字面值
	identifier 标识
	keywords 关键字
	whitespace	空格
	line terminator 行终结符

Runtime 运行时
	types 类型
	execution context 执行上下文
```

#### 2 JS类型

##### 1 Types 数据类型

```
Number	String	Boolean	Null	Undefined	Symbol	Object	BigInt
```

##### 2 Number

```
IEEE 754
Double Float 双精度浮点型
Sign 1				符号位，0表示正数，1表示负数
Exponent 11		指数位
Fraction 52		精度位
```

##### 3 String

```
Character		字符
Code Point	码点  a 对应 97
Encoding		编码方式
	ASCII
	Unicode
		UTF8， UTF16
	GB
		GB2312
		GBK
	ISO-8859
语法：
	"abc"
	'abc'
	`abc`
```

##### 4 Null Undefined

```
null表示定义了，值为空
undefined表示未定义

null是关键字，不可重新赋值
undefined是全局变量
可以使用void 0定义一个undefined
```

#### 3 对象

##### 1 Object

```
对象、类
界门纲目科属种

对象：
	identifier 标识符
	state 状态 
	behavior	行为
	
设计对象的原则：行为改变状态（一定是改变对象自身的状态吗？那对象之间如何产生关联呢？）
```

##### 2 JS中的Object

```
Symbol，作为object的属性值，可以实现对对象属性的访问权限控制

数据属性 data property
	[[value]]	// 存储的具体值
	writable	// 是否可写
	enumerable // 是否可枚举
	configurable // 是否可改变
访问器属性 accessor property
	get
	set
	enumerable
	configurable
	
```

##### 3 原型和原型链

```
JavaScript使用原型描述对象之间的关系
当访问对象的属性时，如果当前对象没有找到，就会在对象的原型中找，直到找到或者原型为null为止
对象有原型，原型还有原型，形成原型链
```

##### 4 object的api

```
1 {} . []  Object.defineProperty
2 Object.create Object.setPrototypeOf  Object.getPrototypeOf
3 new class extends
4 new function prototype
```

##### 5 function

```
typeof of funcXX === 'funtion'
```



##### 本周小结

```
本周主要学习了编程语言的一些通识性概念，对编程语言的设计、分类等知识有所理解，对JS的类型区分、类型判断、类型转换、类和类型的区别、类与对象的关系、JS中的特殊对象等知识有了更深入的理解。在字符串的编码格式这块理解的还不是很好，需要再查阅资料和编写示例代码进行验证，从而真正掌握
```





























