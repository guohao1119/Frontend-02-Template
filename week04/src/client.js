const Request = require('./request')
const parser = require('./parse/parser')

void async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '3000',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed',
      // 'Transfer-Encoding': 'chunked'
    },
    body: {
      name: 'gh'
    }
  })

  let response = await request.send()

  console.log(response)

  response.body = 
  `<html meta=a>
  <head>
    <style>
      body div #myid{
        width:100px;
        background-color: #ff5000;
      }
      body div img {
        width: 30px;
        background-color: #ff1111;
      }
    </style>
  </head>
  <body>
      <div>
        <img id="myid" />
        <img />
      </div>
  </body>
  </html>
  `

  let dom = parser.parseHTML(response.body)
}() // 定义并调用
