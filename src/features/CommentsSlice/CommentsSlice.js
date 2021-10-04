import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const limit = 5;

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ url, id }) => {
    const response = await fetch(
      `https://www.reddit.com/${url}.json?limit=${limit}`
    );
    // console.log("response:", response);
    if (!response.ok) return {};
    const responseJson = await response.json();
    return { id: id, data: responseJson[1].data.children };
  }
);
export const fetchPostWithComments = createAsyncThunk(
  "comments/fetchPostWithComments",
  async (url) => {
    const response = await fetch(`https://www.reddit.com/${url}.json`);

    if (!response.ok) return { post: undefined, comments: undefined };
    const responseJson = await response.json();
    return {
      post: responseJson[0].data.children[0],
      comments: responseJson[1].data.children,
    };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    postWithComments: { post: undefined, comments: undefined },
    comments: {},
    loading: false,
    error: false,
  },
  reducers: {
    deleteComments: (state, action) => {
      delete state.comments[action.payload];
    },
    deletePostWithComments: (state, action) => {
      delete state.postWithComments.post;
      delete state.postWithComments.comments;
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.comments[action.payload.id] = action.payload.data;
    },
    [fetchComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      // console.log("Error message: ", action.error.message);
    },

    [fetchPostWithComments.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [fetchPostWithComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.postWithComments.post = action.payload.post;
      state.postWithComments.comments = action.payload.comments;
    },
    [fetchPostWithComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      // console.log("Error message: ", action.error.message);
    },
  },
});

export const selectComments = (state) => state.comments.comments;
export const selectCommentsLoading = (state) => state.comments.loading;
export const selectCommentsError = (state) => state.comments.error;

export const selectPostWithComments = (state) =>
  state.comments.postWithComments;

export const { deleteComments, deletePostWithComments } = commentsSlice.actions;
export default commentsSlice.reducer;
