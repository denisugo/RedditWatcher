import { createSlice } from "@reduxjs/toolkit";
import icons from "../../assets/subredditsIcons";

const subreddits = [
  {
    name: "home",
    subreddit: "r/popular",
    icon: icons.home,
    id: 0,
  },
  {
    name: "Art",
    subreddit: "r/art",
    icon: icons.art,
    id: 1,
  },
  {
    name: "science",
    subreddit: "r/science",
    icon: icons.science,
    id: 2,
  },
];

const subredditSlice = createSlice({
  name: "subreddits",
  initialState: { subreddits: subreddits, selectedSubreddit: "r/popular" },
  reducers: {
    changeSubreddit: (store, action) => {
      store.selectedSubreddit = action.payload;
    },
  },
});

export const selectSubreddits = (store) => store.subreddits.subreddits;
export const selectSelectedSubreddit = (store) =>
  store.subreddits.selectedSubreddit;

export default subredditSlice.reducer;
export const { changeSubreddit } = subredditSlice.actions;
