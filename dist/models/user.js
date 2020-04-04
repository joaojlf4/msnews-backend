"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database'); var _database2 = _interopRequireDefault(_database);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const UserSchema = new _database2.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
});

UserSchema.pre('save', async function(next){
  const hash = await _bcryptjs2.default.hash(this.password, 10);
  this.password = hash;

})

exports. default = _database2.default.model('User', UserSchema)