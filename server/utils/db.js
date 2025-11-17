import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return
    }

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodshare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
