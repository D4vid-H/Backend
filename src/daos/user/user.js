import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: false },
  avatar: { type: String, required: false },
  address: { type: String, required: false },
  celphone: { type: Number, required: false },
  name: { type: String, required: false },
  age: { type: Number, required: false },
});

const User = mongoose.model("user", userSchema);

export default User;