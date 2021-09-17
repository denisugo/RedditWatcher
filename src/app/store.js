import { configureStore } from "@reduxjs/toolkit";

const posts = (store, action) => {
  return null;
};

export const store = configureStore({
  reducer: {
    posts: posts,
  },
});
