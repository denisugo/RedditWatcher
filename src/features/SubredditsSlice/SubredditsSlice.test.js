import { configureStore } from "@reduxjs/toolkit";
import subredditsSlice, {
  changeSubreddit,
  selectSubreddits,
  selectSelectedSubreddit,
} from "./SubredditsSlice";

describe("Subreddit Slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        subreddits: subredditsSlice,
      },
    });
  });

  it("Should select all subreddits and selected subreddit", () => {
    const subreddits = selectSubreddits(store.getState());
    expect(subreddits.length).not.toBe(0);

    const selectedSubbreddit = selectSelectedSubreddit(store.getState());
    expect(selectedSubbreddit).not.toBeUndefined();
  });

  it("Should change selected subreddit", () => {
    const anotherSubreddit = "r/mock";
    store.dispatch(changeSubreddit(anotherSubreddit));

    const selectedSubbreddit = selectSelectedSubreddit(store.getState());
    expect(selectedSubbreddit).toBe(anotherSubreddit);
  });
});
