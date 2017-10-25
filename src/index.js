const request = require('superagent');
const cheerio = require('cheerio');

const authServer = (service, data) => new Promise(async (resolve, reject) => {
  const url = `http://authserver.tjcu.edu.cn/authserver/login?service=${service}`;
  const agent = request.agent();
  const { username, password, captcha } = data;
  const loginPage = await agent.get(url).timeout({
    response: 6000,
  });
  const $ = cheerio.load(loginPage.text);
  const lt = $('[name=lt]').val();
  const dllt = $('[name=dllt]').val();
  const execution = $('[name=execution]').val();
  const _eventId = $('[name=_eventId]').val();
  const rmShown = $('[name=rmShown]').val();
  try {
    const rst = await agent.post(url)
      .type('form')
      .set('Cookie', loginPage.header['set-cookie'])
      .withCredentials()
      .send({
        username,
        password,
        captchaRespon: captcha || 0,
        lt,
        dllt,
        execution,
        _eventId,
        rmShown,
      })
      .redirects(10);
    if (!rst.redirects.length) {
      const msg = cheerio.load(rst.text)('#msg').text();
      resolve({ state: 0, msg });
    }
    resolve({ state: 1, cookies: rst.request.cookies });
  } catch (err) {
    if (err.errno === 'ETIMEDOUT') resolve({ state: 0, msg: '统一登录平台请求超时' });
    reject(err);
  }
});

module.exports = authServer;
