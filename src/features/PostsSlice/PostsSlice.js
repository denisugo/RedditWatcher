import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://www.reddit.com/r/popular.json";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(url);

  let posts;
  if (response.ok) {
    posts = await response.json();
    return posts.data.children;
  } else return [];
});

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

export const selectPosts = (store) => store.posts.posts;
export const selectPostsLoading = (store) => store.posts.loading;
export const selectPostsError = (store) => store.posts.error;

export default postsSlice.reducer;
