import express from "express";
import { dbConnect } from "./Database/dbConnect.js";

import "./Database/Models/User/user.model.js";
import "./Database/Models/Posts/post.model.js";
import "./Database/Models/Comments/comment.model.js";

import userRoutes from "./Modules/User/user.routes.js";

import { globalErrorHandler } from "./Middlewares/error.middleware.js";

const app = express();
app.use(express.json());

await dbConnect();

app.use(postRoutes);
app.use(commentRoutes);
app.use(userRoutes);

app.use(globalErrorHandler);

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
