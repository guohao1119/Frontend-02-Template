const net = require('net')
const ResponseParser = require('./response-parser')

class Request {
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser()

      if (connection) {
        connection.write(this.toString())
      } else {
        // 创建TCP连接 连接服务器地址127.0.0.1:3000
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          console.log(this.toString())
          connection.write(this.toString())
        })
      }
      // 监听数据
      connection.on('data', data => {
        // 在parser中处理数据
        console.log(data.toString())
        parser.receive(data.toString())
        // console.log(parser, 'parser.isFinshed')
        if (parser.isFinshed) {
          resolve(parser.response)
          connection.end()
        }
      })
      // 监听错误
      connection.on('error', err => {
        reject(err)
        connection.end()
      })
    })
  }
  toString() {
    // 注意格式
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
  }
}

module.exports = Request