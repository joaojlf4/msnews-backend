"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _newController = require('../controllers/newController'); var _newController2 = _interopRequireDefault(_newController);
var _auth = require('../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = _express.Router.call(void 0, );

router.get('/', _newController2.default.index);
router.post('/', _auth2.default, _newController2.default.store);
router.put('/:id', _auth2.default, _newController2.default.update);
router.delete('/:id', _auth2.default, _newController2.default.delete);

exports. default = router;