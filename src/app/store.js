import { configureStore } from "@reduxjs/toolkit";
import posts from "../features/PostsSlice/PostsSlice";
import comments from "../features/CommentsSlice/CommentsSlice";

export const store = configureStore({
  reducer: {
    posts: posts,
    comments: comments,
  },
});
