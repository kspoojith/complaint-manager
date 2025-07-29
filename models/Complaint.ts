import mongoose, { Schema, Document } from 'mongoose';

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: 'Product' | 'Service' | 'Support';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Resolved';
  dateSubmitted: Date;
  userEmail?: string;
  adminNotes?: string;
  resolvedDate?: Date;
}

const ComplaintSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a complaint title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: {
      values: ['Product', 'Service', 'Support'],
      message: 'Category must be Product, Service, or Support',
    },
  },
  priority: {
    type: String,
    required: [true, 'Please select a priority'],
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: 'Priority must be Low, Medium, or High',
    },
  },
  status: {
    type: String,
    required: [true, 'Please provide a status'],
    enum: {
      values: ['Pending', 'In Progress', 'Resolved'],
      message: 'Status must be Pending, In Progress, or Resolved',
    },
    default: 'Pending',
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  userEmail: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  adminNotes: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, 'Admin notes cannot be more than 500 characters'],
  },
  resolvedDate: {
    type: Date,
    required: false,
  },
});

// Index for better query performance
ComplaintSchema.index({ status: 1, priority: 1, dateSubmitted: -1 });

export default mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema);