import {
  deleteComments,
  fetchComments,
  selectComments,
  selectCommentsError,
  selectCommentsLoading,
} from "./CommentsSlice";
import comments from "./CommentsSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("Comment Slice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        comments: comments,
      },
    });
  });

  describe("Initial states", () => {
    it("Should select comments", () => {
      const comments = selectComments(store.getState());
      expect(JSON.stringify(comments)).toBe(JSON.stringify({}));
    });

    it("Should select error", () => {
      const error = selectCommentsError(store.getState());
      expect(error).toBe(false);
    });

    it("Should select loading", () => {
      const loading = selectCommentsLoading(store.getState());
      expect(loading).toBe(false);
    });
  });

  describe("Fetch comments", () => {
    const id = 1;
    const output = [["comment1", "comment2"]];
    const url = "mock.com/url";

    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should fetch comments", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [{}, { data: { children: output } }],
      });

      await store.dispatch(fetchComments({ url, id }));
      const comments = selectComments(store.getState());
      expect(JSON.stringify(comments[id])).toBe(JSON.stringify(output));
    });

    it("Should fetch comments, but server is not ok", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => [{}, { data: { children: output } }],
      });

      await store.dispatch(fetchComments({ url, id }));
      const comments = selectComments(store.getState());
      expect(JSON.stringify(comments)).toBe(JSON.stringify({}));
    });

    it("Should set error to true", async () => {
      fetch.mockRejectedValueOnce({});

      await store.dispatch(fetchComments(url));
      const error = selectCommentsError(store.getState());
      expect(error).toBe(true);
    });
  });

  describe("Delete comments", () => {
    const id = 1;
    const output = [["comment1", "comment2"]];
    const url = "mock.com/url";

    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should delete comments", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [{}, { data: { children: output } }],
      });

      await store.dispatch(fetchComments({ url, id }));
      let comments = selectComments(store.getState());
      expect(JSON.stringify(comments[id])).toBe(JSON.stringify(output));

      store.dispatch(deleteComments(id));
      comments = selectComments(store.getState());
      expect(JSON.stringify(comments)).toBe(JSON.stringify({}));
    });
  });
});
