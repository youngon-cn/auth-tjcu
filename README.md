## auth-tjcu
> TJCU authserver simulation

[![NPM](https://nodei.co/npm/auth-tjcu.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/auth-tjcu/)

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
