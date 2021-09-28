import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit) => {
    const url = `https://www.reddit.com/${subreddit}.json`;
    const response = await fetch(url);

    let posts;
    if (response.ok) {
      posts = await response.json();
      return posts.data.children;
    } else return [];
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    error: false,
    posts: [],
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.posts = [];
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      // console.log("Error message: ", action.error.message);
    },
  },
});

export const selectPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
