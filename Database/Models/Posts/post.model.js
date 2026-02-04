import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export const PostModel = mongoose.model("Post", postSchema);
