const mongoose = require("mongoose");

const globalWithMongoose = global;

let cached = globalWithMongoose.mongoose;
if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log("Database already connected.");
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set");
    }
    cached.promise = mongoose
      .connect(uri, {
        dbName: "pictoblogs",
      })
      .then((mongooseInstance) => {
        console.log("Database connected successfully.");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("Database connection failed:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectToDatabase };