'use strict';

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _parsers = require('./parsers');

var _formatters = require('./formatters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import node module dependencies


// import parser and formater functions


var handleTrainIntent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(conv) {
    var url, res, xmlData, jsonData, _ref2, predictions, alerts, _ref3, predictionText, alertText;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=N&s=5120';
            _context.next = 3;
            return (0, _nodeFetch2.default)(url);

          case 3:
            res = _context.sent;
            _context.next = 6;
            return res.text();

          case 6:
            xmlData = _context.sent;
            _context.next = 9;
            return (0, _parsers.parseXML)(xmlData);

          case 9:
            jsonData = _context.sent;
            _context.next = 12;
            return (0, _parsers.parseJSON)(jsonData);

          case 12:
            _ref2 = _context.sent;
            predictions = _ref2.predictions;
            alerts = _ref2.alerts;
            _context.next = 17;
            return (0, _formatters.formatTrainResponse)(predictions, alerts);

          case 17:
            _ref3 = _context.sent;
            predictionText = _ref3.predictionText;
            alertText = _ref3.alertText;


            console.log(predictionText);
            console.log(alertText);

            conv.close('\n    <speak>\n      ' + predictionText + ' ' + predictionText + '\n    </speak>\n  ');

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function handleTrainIntent(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  handleTrainIntent: handleTrainIntent
};