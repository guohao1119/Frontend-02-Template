学习笔记

### 表达式

#### 1 语法树和优先级

```
语法结构中设置了不同的优先级，在构建语法树时，会根据优先级进行构建
```

#### 优先级

##### Member

```js
a.b // a.b取出来的是引用类型  a是对象，b是key
a[b]
foo`string`
super.b
super['b']
new.target
new Foo()  // 带括号的new
```

##### New

```js
new Foo // 不带括号，优先级低于 new Foo()
```

##### Call

```js
foo()
super()
foo()['b']
foo().b
foo()`abc`
```

##### Update

```js
a++
a--
--a
++a
```

##### Unary

```js
delete a.b
void foo()
typeof a
+a
-a
~a
!a
await a
```

##### Exponental

```
**
3 ** 2 ** 3 // 从右向左计算
```

##### Multiplicative

```
* / %
```

##### Additive

```
+ -
```

##### Shift

```
<< >> >>>
```

##### RelationShip

```
< > <= >= instanceof
in
```

##### Equality

```
== != === !==
```

##### Bitwise

```
& ^ | 按位与 异或 按位或
```

##### Logical

```
&& ||
```

##### Conditional

```
? :
```

#### 2 类型转换 Type Convertion

![https://github.com/guohao1119/Frontend-02-Template/blob/master/week03/typeconvertion.png]()

##### 拆箱 Unboxing

```
ToPrimitive
toString / valueOf
Symbol.toPrimitive
```

##### 装箱 Boxing

| 类型    | 对象                    | 值          |
| ------- | ----------------------- | ----------- |
| Number  | new Number(1)           | 1           |
| String  | new String('a')         | 'a'         |
| Boolean | new Boolean(true)       | true        |
| Symbol  | new Object(Symbol('a')) | Symbol('a') |

#### 3 语句

```
简单语句
复合语句
声明
```

Completion Record

```
记录代码执行完成后返回的结果
if (x === 1) return true
// 可能返回true，也可能返回undefined

[[type]]: normal, break, continue, return, throw
[[value]]: 返回值
[[target]]: label  break/continue可能和label交互

```

##### 简单语句

```
ExpressionStatement
EmptyStatement		;
DebuggerStatement	debugger;
ThrowStatement
ContinueStatement
BreakStatement
ReturnStatement
```

##### 复合语句

```
BlockStatement {}
IfStatement
SwitchStatement
IterationStatement
	while
	do while
	for 
	for in
	for of
WithStatement
LabelledStatement
TryStatement
	try {
	
	} catch() {
	
	} finally {
	
	}
```

##### 声明

```
FunctionDeclaration
GeneratorDeclaration
AsyncFunctionDeclaration
AsyncGeneratorDeclaration
VariableStatement		var
ClassDeclaration
LexicalDeclaration	const let
```

##### 预处理 pre-process

```
js引擎会在代码执行之前先进行解析，将变量声明提前。在执行时才进行赋值
```

##### 作用域

```
变量有效的代码范围
```

#### 4 结构化

##### 宏任务和微任务

```
JS执行粒度
	宏任务
	微任务
	函数调用
	语句/声明
	表达式
	直接量/变量/this
事件循环
	获取代码 -> 执行 -> 等待新代码
```

##### 函数调用

```
代码执行时形成一个执行上下文栈 Execution Context Stack

栈顶元素 Running Execution Context
执行上下文包含了7中元素
	code evaluation state
	Function
	Script or Module
	Generator
	Realm // 内置对象
	LexicalEnvironment
		this
		new.target
		super
		变量
	VariableEnvironment
		var
```

