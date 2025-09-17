import mongoose from "mongoose"
export const runtime = "nodejs"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mock5"

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined")
}

let cached = (global as any)._mongoose

if (!cached) {
  cached = (global as any)._mongoose = { conn: null as any, promise: null as any }
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn as typeof mongoose
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "mock5",
    } as any)
  }
  cached.conn = await cached.promise
  return cached.conn as typeof mongoose
}


