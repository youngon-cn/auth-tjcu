'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var request = require('superagent');
var cheerio = require('cheerio');

var authServer = function authServer(service, data) {
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var url, agent, username, password, captcha, loginPage, $, lt, dllt, execution, _eventId, rmShown, rst, msg;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = 'http://authserver.tjcu.edu.cn/authserver/login?service=' + service;
              agent = request.agent();
              username = data.username, password = data.password, captcha = data.captcha;
              _context.next = 5;
              return agent.get(url).timeout({
                response: 6000
              });

            case 5:
              loginPage = _context.sent;
              $ = cheerio.load(loginPage.text);
              lt = $('[name=lt]').val();
              dllt = $('[name=dllt]').val();
              execution = $('[name=execution]').val();
              _eventId = $('[name=_eventId]').val();
              rmShown = $('[name=rmShown]').val();
              _context.prev = 12;
              _context.next = 15;
              return agent.post(url).type('form').set('Cookie', loginPage.header['set-cookie']).withCredentials().send({
                username: username,
                password: password,
                captchaRespon: captcha || 0,
                lt: lt,
                dllt: dllt,
                execution: execution,
                _eventId: _eventId,
                rmShown: rmShown
              }).redirects(10);

            case 15:
              rst = _context.sent;

              if (!rst.redirects.length) {
                msg = cheerio.load(rst.text)('#msg').text();

                resolve({ state: 0, msg: msg });
              }
              resolve({ state: 1, cookies: rst.request.cookies });
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](12);

              if (_context.t0.errno === 'ETIMEDOUT') resolve({ state: 0, msg: '统一登录平台请求超时' });
              reject(_context.t0);

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[12, 20]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

module.exports = authServer;