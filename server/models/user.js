import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new Schema();

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User', userSchema);

export {User};