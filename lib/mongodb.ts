// lib/mongodb.ts

import mongoose, { Connection } from 'mongoose'

interface CachedConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Initialize cached connection object
const cached: CachedConnection = {
  conn: null,
  promise: null,
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable')
}

async function dbConnect(): Promise<typeof mongoose> {
  try {
    // If we have an existing connection, return mongoose instance
    if (cached.conn) {
      return mongoose
    }

    // If we don't have a promise to connect yet, create one
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        connectTimeoutMS: 10000, // 10 seconds timeout
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 30000,
      }

      cached.promise = mongoose.connect(MONGODB_URI!, opts)
    }

    // Wait for connection
    cached.conn = await cached.promise

    // Verify connection status
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection failed')
    }

    return cached.conn
  } catch (error) {
    cached.promise = null
    throw error instanceof Error
      ? error
      : new Error('Failed to connect to MongoDB')
  }
}

export default dbConnect
