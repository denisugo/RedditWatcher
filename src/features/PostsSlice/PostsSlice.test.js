import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
} from "./PostsSlice";
import posts from "./PostsSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("PostsSlice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: posts,
      },
    });
  });

  describe("Initial states", () => {
    it("Should select posts", () => {
      const posts = selectPosts(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify([]));
    });
    it("Should select loading", () => {
      const loading = selectPostsLoading(store.getState());
      expect(loading).toBe(false);
    });
    it("Should select error", () => {
      const error = selectPostsError(store.getState());
      expect(error).toBe(false);
    });
  });

  describe("Fetch posts", () => {
    const output = [["post1", "post2"]];
    const subreddit = "r/mock";

    afterEach(() => {
      fetch.resetMocks();
    });

    it("Should fetch new posts", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: output } }),
      });

      await store.dispatch(fetchPosts());
      const posts = selectPosts(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify(output));
    });

    it("Should fetch new posts, but server is not ok", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => ({ data: { children: output } }),
      });
      await store.dispatch(fetchPosts(subreddit));
      const posts = selectPosts(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify([]));
    });

    it("Should set error to true", async () => {
      fetch.mockRejectedValueOnce({});

      await store.dispatch(fetchPosts(subreddit));
      const error = selectPostsError(store.getState());
      expect(error).toBe(true);
    });
  });
});
