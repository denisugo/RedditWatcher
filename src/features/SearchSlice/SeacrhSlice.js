import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const limit = 5;

// No rejected handling
// Timestamp is used for detecting of correct order of fetch results
export const fetchSearchResults = createAsyncThunk(
  "seacrh/fetchSearchResults",
  async (term) => {
    const timestamp = Date.now();
    let data = [];
    try {
      const url = `https://www.reddit.com/search/.json?q=${term}&type=sr&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) return { data, timestamp };
      const results = await response.json();
      data = results.data.children;
    } catch (error) {}
    return { data, timestamp };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    error: false,
    loading: false,
    timestamp: 0,
  },
  extraReducers: {
    [fetchSearchResults.pending]: (state, action) => {
      state.error = false;
      state.loading = true;
      state.searchResults = [];
    },
    [fetchSearchResults.fulfilled]: (state, action) => {
      state.loading = false;
      if (state.timestamp < action.payload.timestamp) {
        state.error = false;
        state.searchResults = action.payload.data;
        state.timestamp = action.payload.timestamp;
      }

      // else if (state.error !== true) {
      //   state.error = false;
      //   state.searchResults = action.payload.data;
      //   state.timestamp = action.payload.timestamp;
      // }
    },
    [fetchSearchResults.rejected]: (state, action) => {
      // state.error = true;
      // state.loading = false;
      // state.searchResults = [];
      // state.timestamp = action.payload.timestamp;
    },
  },
});

export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;
