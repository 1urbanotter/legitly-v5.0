// models/User.ts

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Document, Model, model, models, Schema } from 'mongoose'

interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  comparePassword(password: string): Promise<boolean>
  generateToken(): string
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash)
}

UserSchema.methods.generateToken = function (): string {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  })
}

// Check if the model exists before creating a new one
const User = models.User || model<IUser>('User', UserSchema)

export default User as Model<IUser>
