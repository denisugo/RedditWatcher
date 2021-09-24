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

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    loading: false,
    error: false,
  },
  reducers: {
    deleteComments: (store, action) => {
      delete store.comments[action.payload];
    },
  },
  extraReducers: {
    [fetchComments.pending]: (store, action) => {
      store.loading = true;
      store.error = false;
    },
    [fetchComments.fulfilled]: (store, action) => {
      store.loading = false;
      store.error = false;
      store.comments[action.payload.id] = action.payload.data;
    },
    [fetchComments.rejected]: (store, action) => {
      store.loading = false;
      store.error = true;
      // console.log("Error message: ", action.error.message);
    },
  },
});

export const selectComments = (store) => store.comments.comments;
export const selectCommentsLoading = (store) => store.comments.loading;
export const selectCommentsError = (store) => store.comments.error;

export const { deleteComments } = commentsSlice.actions;
export default commentsSlice.reducer;
