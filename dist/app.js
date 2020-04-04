"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _morgan = require('morgan'); var _morgan2 = _interopRequireDefault(_morgan);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
const app = _express2.default.call(void 0, );

app.use(_cors2.default.call(void 0, {
  credentials: true,
  origin: process.env.REACT_URL,
}))
app.use(_bodyparser2.default.urlencoded({ extended: false }))
app.use(_express2.default.json());
app.use(_morgan2.default.call(void 0, ":method :url :response-time :status"))
app.use(_routes2.default);

exports. default = app;