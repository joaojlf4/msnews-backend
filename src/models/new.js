import database from '../database';
import mongoosePaginate from 'mongoose-paginate';
import slugify from 'slugify';

const newSchema = new database.Schema({
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
newSchema.plugin(mongoosePaginate);
newSchema.pre('validate', function(next){
  if(this.title){
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    })
  }
  if(this.markdown)
  next();
})

export default database.model('New', newSchema);