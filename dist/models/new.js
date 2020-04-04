"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database'); var _database2 = _interopRequireDefault(_database);
var _mongoosepaginate = require('mongoose-paginate'); var _mongoosepaginate2 = _interopRequireDefault(_mongoosepaginate);
var _slugify = require('slugify'); var _slugify2 = _interopRequireDefault(_slugify);

const newSchema = new _database2.default.Schema({
  title: {
    type: String,
    required: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  eye: {
    type: String,
  },
  markdown: {
    type: String,
    required: true
  },
  pictureUrl: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String
  }
});
newSchema.plugin(_mongoosepaginate2.default);
newSchema.pre('validate', function(next){
  if(this.title){
    this.slug = _slugify2.default.call(void 0, this.title, {
      lower: true,
      strict: true
    })
  }
  if(this.markdown)
  next();
})

exports. default = _database2.default.model('New', newSchema);