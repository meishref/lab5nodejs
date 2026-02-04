import { CommentModel } from "../../Database/Models/Comments/comment.model.js";

export const createComment = async (req, res) => {
  const comment = await CommentModel.create({
    content: req.body.content,
    post: req.body.post,
    user: req.userId
  });
  res.json(comment);
};

export const getMyComments = async (req, res) => {
  const comments = await CommentModel.find({ user: req.userId }).populate("user").populate("post");
  res.json(comments);
};
