import database from '../database';
import bcrypt from 'bcryptjs';

const UserSchema = new database.Schema({
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
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

})

export default database.model('User', UserSchema)