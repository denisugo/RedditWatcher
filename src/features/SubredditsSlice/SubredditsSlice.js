import { createSlice } from "@reduxjs/toolkit";
import subreddits from "./SubredditsData";

const subredditSlice = createSlice({
  name: "subreddits",
  initialState: { subreddits: subreddits, selectedSubreddit: "r/popular" },
  reducers: {
    changeSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
  },
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectSelectedSubreddit = (state) =>
  state.subreddits.selectedSubreddit;

export default subredditSlice.reducer;
export const { changeSubreddit } = subredditSlice.actions;
