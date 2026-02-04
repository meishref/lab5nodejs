import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  isConfirmed: {
    type: Boolean,
    default: false
  },

  confirmEmailToken: String
});

export const UserModel = mongoose.model("User", userSchema);
