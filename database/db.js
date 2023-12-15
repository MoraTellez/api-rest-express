import mongoose from "mongoose";

try {
  await mongoose.connect( process.env.URI_MONGO)
  console.log('connection ok')
} catch (error) {
  console.log('error with database' + error)
}