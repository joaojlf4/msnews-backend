"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _userController = require('../controllers/userController'); var _userController2 = _interopRequireDefault(_userController);
const router = _express.Router.call(void 0, );

router.post('/', _userController2.default.create)
router.post('/authenticate', _userController2.default.authenticate)

exports. default = router;