class TrunkedBodyParser {
  constructor() {
    this.WATING_LENGTH = 0
    this.WATING_LENGTH_LINE_END = 1
    this.READING_TRUNK = 2
    this.WATING_NEW_LINE = 3
    this.WATING_NEW_LINE_END = 4
    this.length = 7
    this.content = []
    this.isFinshed = false
    this.current = this.WATING_LENGTH
  }
  receiveChar(char) {
    if (this.current === this.WATING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinshed = true
        }
        this.current = this.WATING_LENGTH_LINE_END
      } else {
        this.length *= 16
        this.length += parseInt(char, 16)
        // this.length++
      }
    } else if (this.current === this.WATING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char)
      this.length--
      if (this.length === 0) {
        this.current = this.WATING_NEW_LINE
      }
    } else if (this.current === this.WATING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WATING_NEW_LINE_END
      }
    } else if (this.current === this.WATING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WATING_LENGTH
      }
    }
  }
}

module.exports = TrunkedBodyParser