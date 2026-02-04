import { PostModel } from "../../Database/Models/Posts/post.model.js";

export const createPost = async (req, res) => {
  const post = await PostModel.create({ ...req.body, user: req.userId });
  res.json(post);
};

export const getMyPosts = async (req, res) => {
  const posts = await PostModel.find({ user: req.userId }).populate("user");
  res.json(posts);
};

export const updatePost = async (req, res) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  res.json(post);
};

export const deletePost = async (req, res) => {
  await PostModel.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: "Deleted" });
};
