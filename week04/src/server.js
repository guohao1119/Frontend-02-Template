const http = require('http')

http.createServer((req, res) => {
  let body = []
  req.on('error', err => {
    console.error(err)
  }).on('data', chunk => {
    console.log('chunk', chunk.toString())
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log('body', body)
    // res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<h1>Hello World</h1>\n')
  })
}).listen(3000)

console.log('本地服务器已启动，端口3000')