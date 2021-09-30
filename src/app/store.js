import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/PostsSlice/PostsSlice";
import commentsSlice from "../features/CommentsSlice/CommentsSlice";
import subredditsSlice from "../features/SubredditsSlice/SubredditsSlice";
import seacrhSlice from "../features/SearchSlice/SeacrhSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    comments: commentsSlice,
    subreddits: subredditsSlice,
    search: seacrhSlice,
  },
});
