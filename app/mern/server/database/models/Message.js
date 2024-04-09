import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who sent the message
  message: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});


export const Message = mongoose.model('Message', messageSchema); // Export the model
export default mongoose.model('Message', messageSchema)