import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const modelName = "users";

export default mongoose.models[modelName] ||
  mongoose.model(modelName, userSchema);
