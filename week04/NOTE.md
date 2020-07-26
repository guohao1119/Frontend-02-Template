学习笔记

#### 1 浏览器渲染步骤

从url转到bitmap

```
url
	 http
	------> html
							 parse
							------> dom
													css computing
												 ------> dom with css
												 											layout
												 										 --------> dom with position
												 										 													  render
												 										 													 --------> bitmap
```

#### 2 有限状态机

每个状态都是一个机器

```
在每个机器里，可以做计算、存储、输出
所有的机器接收的输入是一致的
机器本身没有状态（纯函数）
```

每一个机器知道下一个状态

```
每个机器都有确定的下一个状态（Moore状态机）
每个机器根据输入决定下一个状态（Mealy状态机）
```

js中的状态机

```
// 每个函数是一个状态
function state(input) { // 函数参数就是输入
	// 在函数中，可以自由编写代码，处理每个状态的逻辑
	return next // 返回值作为下一个状态
}

// 调用
while(input) {
	// 获取输入
	state = state(input) // 把状态机的返回值作为下一个状态
}
```

#### 3 HTTP协议解析

##### 1 网络协议分层模型

```
1 应用层： HTTP
2 传输层： TCP
```

##### 2 HTTP协议

```
分为请求Request和响应Response
```

##### 3 请求 Request

```
状态行 status line
		请求方法 / 协议名称/协议版本
		POST / HTTP/1.1
请求头 headers
	key: value
	HOST: 127.0.0.1
	Content-Type: application/x-www-form-urlencoded
	
请求体 body
	name=gh&password=123
```

##### 4 响应Response

```
状态行 status line
	协议名称/版本号 状态码 消息
	HTTP/1.1 200 OK
响应头 headers
	Content-Type: text/html
	Connection: keep-alive

响应体 body
	<html><body>hello world </body></html>
```

#### 4 HTML解析

##### 1 利用状态机将html字符串解析成dom

```
html标准中已经将html的状态定义好了，一共80个状态
针对一段html字符串，按照其中的一些特殊标识，进行词法和语法分析，解析出一个dom树
```

##### 2 解析标签

```
开始标签 <head>
结束标签 </head>
自封闭标签 <input />
监测到标签结束时，提交token
```

##### 3 解析属性

```
双括号
单括号
无括号
监测到属性结束时，将属性添加到标签的token上
```

##### 4 将标签构建为dom树

```
利用栈结构，进行标签配对处理
 1 遇到开始标签时创建dom元素并入栈，遇到结束标签时出栈
 2 遇到自封闭标签时入栈后立即出栈
 3 任何元素的父元素是它入栈前的栈顶元素
```

##### 5 文本节点的处理

```
文本节点与自封闭标签处理类似，入栈后就出栈
连续的多个文本节点需要合并到一起
```



#### 5 本周小结

```
1 学习了如何通过状态机进行问题分析和解决，如何处理状态转移
2 学习了浏览器如何接收http请求，处理，并构建对应的响应数据的过程
3 学习了浏览器如何对一个完整的html字符串进行解析，构建出dom树结构的过程
```

