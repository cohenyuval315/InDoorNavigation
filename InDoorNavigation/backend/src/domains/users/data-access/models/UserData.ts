import { createHash } from 'crypto';
import { hash, verify } from '@node-rs/bcrypt';
import { Schema, model } from 'mongoose';
import userDestinationSchema  from './embedded/UserDestination.js';
import userSettingSchema from './embedded/UserSetting.js';

const userDataSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,
  google: String,
  tokens: Array,
  recentDestinations:[userDestinationSchema],
  settings: {
    type: [userSettingSchema],
    required: true 
  }
}, { 
  timestamps: true,
  autoCreate: true
});

/**
 * Password hash middleware.
 */
userDataSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }

  try {
    if (user.password){
      user.password = await hash(user.password, 10);
      next();
      throw new Error('user doesnt have password field');
    }
  } catch (err:any) {
    next(err);
  }
});

/**
 * Helper method for validating user's password.
 */
userDataSchema.methods.comparePassword = async function comparePassword(candidatePassword:string, cb:any) {
  try {
    cb(null, await verify(candidatePassword, this.password));
  } catch (err:any) {
    cb(err);
  }
};

/**
 * Helper method for getting user's gravatar.
 */
userDataSchema.methods.gravatar = function gravatar(size:number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/00000000000000000000000000000000?s=${size}&d=retro`;
  }
  const md5 = createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const UserData = model('User', userDataSchema);
export default UserData;
