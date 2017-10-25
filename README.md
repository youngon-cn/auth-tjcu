## auth-tjcu
> TJCU authserver simulation

[![npm package](https://img.shields.io/npm/v/auth-tjcu.svg)](https://npmjs.org/package/auth-tjcu)
[![npm downloads](http://img.shields.io/npm/dm/auth-tjcu.svg)](https://npmjs.org/package/auth-tjcu)

### How to install:

``` bash
npm install --save auth-tjcu
// or
yarn add auth-tjcu
```

### Usage:

``` javascript
const authTJCU = require('auth-tjcu');

async function login() {
  const result = await authTJCU('http://j.tjcu.edu.cn/caslogin.jsp', {
    username: 'stuid',
    password: 'pwd',
  })
  console.log(result);
  /*
    resilt will be
    {
      state: 1,
      cookies: 'cookies'
    }
    or
    {
      state: 0,
      msg: 'message'
    }
  */
}
```
