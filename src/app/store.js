import { configureStore } from "@reduxjs/toolkit";
import posts from "../features/PostsSlice/PostsSlice";

export const store = configureStore({
  reducer: {
    posts: posts,
  },
});
