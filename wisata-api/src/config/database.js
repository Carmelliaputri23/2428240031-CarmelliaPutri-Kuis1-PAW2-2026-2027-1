
import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export default mongoose
