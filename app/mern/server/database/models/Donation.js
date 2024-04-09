import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  amount: { type: Number, required: true },
  donorName: { type: String }, 
  donorEmail: { type: String },
  transactionId: { type: String },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now },
});


export const Donation = mongoose.model('Donation', donationSchema); 
export default mongoose.model('Donation', donationSchema)

