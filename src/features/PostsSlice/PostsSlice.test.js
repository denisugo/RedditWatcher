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

    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should fetch new posts", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: output } }),
      });

      //   const posts = fetchPosts();
      //   const payload = (await posts(jest.fn(() => {}))).payload;

      //   console.log(payload);
      //   expect(posts).toBe(2);

      //   store.dispatch(fetchPosts()).then(() => {
      //     const posts = selectPosts(store.getState());

      //     return expect(JSON.stringify(posts)).toBe(JSON.stringify(output));
      //   });

      await store.dispatch(fetchPosts());
      const posts = selectPosts(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify(output));
    });

    it("Should fetch new posts, but server is not ok", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => ({ data: { children: output } }),
      });
      await store.dispatch(fetchPosts());
      const posts = selectPosts(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify([]));
    });

    it("Should set error to true", async () => {
      fetch.mockRejectedValueOnce({});

      await store.dispatch(fetchPosts());
      const posts = selectPosts(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify([]));
    });
  });
});
