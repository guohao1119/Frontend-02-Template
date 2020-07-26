const TrunkedBodyParser = require('./trunked-body-parser')

class ResponseParser {
  constructor() {
    this.WATING_STATUS_LINE = 0 // 状态栏
    this.WATING_STATUS_LINE_END = 1 // 状态栏结束
    this.WATING_HEADER_NAME = 2 // header name
    this.WATING_HEADER_SPACE = 3 // 空格
    this.WATING_HEADER_VALUE = 4 // header value
    this.WATING_HEADER_LINE_END = 5 // header行结束
    this.WATING_HEADER_BLOCK_END = 6 // header块结束
    this.WATING_BODY = 7 // 请求体

    this.current = this.WATING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinshed
  }
  get response () {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    console.log('----')
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receive(str) {
    // 根据传进来的请求数据字符串，逐字符解析
    for (let i = 0; i < str.length; i++) {
      this.receiveChar(str.charAt(i))
    }
  }
  // 利用状态机进行字符解析
  receiveChar(char) {
    if (this.current === this.WATING_STATUS_LINE) { // 状态行开始
      if (char === '\r') { // 如果是\r说明是状态行结束
        this.current = this.WATING_STATUS_LINE_END
      } else { // 否则将字符加入状态行字符串中
        this.statusLine += char
      }
    } else if (this.current === this.WATING_STATUS_LINE_END) { // 状态行结束
      if (char === '\n') {
        this.current = this.WATING_HEADER_NAME
      }
    } else if (this.current === this.WATING_HEADER_NAME) { // 
      if (char === ':') { // 
        this.current = this.WATING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WATING_HEADER_BLOCK_END
        // header结束的时候开始处理body
        console.log(this.headers['Transfer-Encoding'])
        // if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser()
        // }
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WATING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WATING_HEADER_VALUE
      }
    } else if (this.current === this.WATING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WATING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WATING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WATING_HEADER_NAME
      }
    } else if (this.current === this.WATING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WATING_BODY
      }
    } else if (this.current === this.WATING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }
}

module.exports = ResponseParser