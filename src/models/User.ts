import mongoose, { Schema, Document, Model } from 'mongoose';
import { Role } from '@/types/user';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'HR_MANAGER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'EMPLOYEE'],
      default: 'EMPLOYEE',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation in Next.js hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;