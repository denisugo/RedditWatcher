import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const limit = 5;

export const fetchSearchResults = createAsyncThunk(
  "seacrh/fetchSearchResults",
  async (term) => {
    const url = `https://www.reddit.com/search/.json?q=${term}&type=sr&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const results = await response.json();
    return results.data.children;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    error: false,
    loading: false,
  },
  extraReducers: {
    [fetchSearchResults.pending]: (state, action) => {
      state.error = false;
      state.loading = true;
      state.searchResults = [];
    },
    [fetchSearchResults.fulfilled]: (state, action) => {
      state.loading = false;
      if (state.error !== true) {
        state.error = false;
        state.searchResults = action.payload;
      }
    },
    [fetchSearchResults.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.searchResults = [];
    },
  },
});

export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;
