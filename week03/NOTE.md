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





