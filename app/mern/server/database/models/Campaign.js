
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

const campaignSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  imageUrl: { type: String },
  youtubeUrl: { type: String },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  donations: [donationSchema],
  createdDate: { type: Date, default: Date.now },
});


export const Campaign = mongoose.model('Campaign', campaignSchema); // Export the model
export default mongoose.model('Campaign', campaignSchema)