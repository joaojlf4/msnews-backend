"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _news = require('./news'); var _news2 = _interopRequireDefault(_news);
var _users = require('./users'); var _users2 = _interopRequireDefault(_users);
const router = _express.Router.call(void 0, );

router.use('/news', _news2.default);
router.use('/users', _users2.default);

exports. default = router;