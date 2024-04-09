import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  createdDate: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema); // Export the model
export default mongoose.model('User', userSchema)