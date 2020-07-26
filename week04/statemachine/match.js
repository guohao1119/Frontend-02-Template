/* // 在字符串中找到字符 a
function match(string) {
  for(let c of string) {
    if (c === 'a') {
      return true
    }
  }
  return false
}
console.log(match('I am groot')) */

/* // 在字符串中找到字符 ab
function match(string) {
  let foundA = false
  for (let c of string) {
    if (c === 'a') { // 当前字符是a，则foundA设为true
      foundA = true
    } else if (foundA && c === 'b') { // 已经找到a，且当前是b，则返回true
      return true
    } else { // 当前字符不是a，则将foundA置为false
      foundA = false
    }
  }
  return false
}
console.log(match('I abcm groot')) */

// 在一个字符串中，找到字符 abcdef
/* // 非状态机版本
function match(string) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false
  for (let c of string) {
    if (c === 'a') {
      foundA = true
    } else if (foundA && c === 'b') {
      foundB = true
    } else if (foundB && c === 'c') {
      foundC = true
    } else if (foundC && c === 'd') {
      foundD = true
    } else if (foundD && c === 'e') {
      foundE = true
    } else if (foundE && c === 'f') {
      return true
    } else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }
  return false
}
console.log(match('I am abcdefd')) */

/* // 使用状态机，查找abcdef
function match(string) {
  let state = start
  for (let c of string) {
    state = state(c)
  }
  return state === end
}

function start(c) {
  return c === 'a' ? foundA : start
}
function end(c) {
  return end
}
function foundA(c) {
  return c === 'b' ? foundB : start(c)
}
function foundB(c) {
  return c === 'c' ? foundC : start(c)
}
function foundC(c) {
  return c === 'd' ? foundD : start(c)
}
function foundD(c) {
  return c === 'e' ? foundE : start(c)
}
function foundE(c) {
  return c === 'f' ? end : start(c)
}
console.log(match('I am ababcdefd')) */

/* // 使用状态机处理字符串 abcabx
function match(string) {
  let state = start
  for (let c of string) {
    state = state(c)
  }
  return state === end
}
function start(c) {
  return c === 'a' ? foundA : start
}
function end() {
  return end
}
function foundA(c) {
  return c === 'b' ? foundB : start(c)
}
function foundB(c) {
  return c === 'c' ? foundC : start(c)
}
function foundC(c) {
  return c === 'a' ? foundA2 : start(c)
}
function foundA2(c) {
  return c === 'b' ? foundB2 : start(c)
}
function foundB2(c) {
  // 如果不是x，则判断是否是c，进入foundB中判断
  return c === 'x' ? end : foundB(c)
}
console.log(match('abcabcabx')) */


// 使用状态机处理字符串 abababx
function match(string) {
  let state = start
  for (let c of string) {
    state = state(c)
  }
  return state === end
}
function start(c) {
  return c === 'a' ? foundA : start
}
function end() {
  return end
}
function foundA(c) {
  return c === 'b' ? foundB : start(c)
}
function foundB(c) {
  return c === 'a' ? foundA2 : start(c)
}
function foundA2(c) {
  return c === 'b' ? foundB2 : foundA(c)
}
function foundB2(c) {
  return c === 'a' ? foundA3 : foundB(c)
}
function foundA3(c) {
  return c === 'b' ? foundB3 : foundA2(c)
}
function foundB3(c) {
  return c === 'x' ? end : foundB2(c)
}
console.log(match('abababx'))
