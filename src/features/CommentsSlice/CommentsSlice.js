import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const limit = 4;

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (url) => {
    const response = await fetch(
      `https://www.reddit.com/${url}.json?limit=${limit}`
    );
    if (!response.ok) return [];
    const responseJson = await response.json();
    return responseJson[1].data.children;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (store, action) => {
      store.loading = true;
      store.error = false;
    },
    [fetchComments.fulfilled]: (store, action) => {
      store.loading = false;
      store.error = false;
      store.comments = action.payload;
    },
    [fetchComments.rejected]: (store, action) => {
      store.loading = false;
      store.error = true;
    },
  },
});

export const selectComments = (store) => store.comments.comments;
export const selectCommentsLoading = (store) => store.comments.loading;
export const selectCommentsError = (store) => store.comments.error;

export default commentsSlice.reducer;
