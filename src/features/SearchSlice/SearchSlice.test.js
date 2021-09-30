import { configureStore } from "@reduxjs/toolkit";
import searchSlice, {
  selectSearchError,
  selectSearchLoading,
  selectSearchResults,
  fetchSearchResults,
} from "./SeacrhSlice";

describe("SearchSlice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        search: searchSlice,
      },
    });
  });

  describe("Initial states", () => {
    it("Should select search results", () => {
      const posts = selectSearchResults(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify([]));
    });
    it("Should select loading", () => {
      const loading = selectSearchLoading(store.getState());
      expect(loading).toBe(false);
    });
    it("Should select error", () => {
      const error = selectSearchError(store.getState());
      expect(error).toBe(false);
    });
  });

  describe("Fetch results", () => {
    const output = [["post1", "post2"]];
    const term = "mock";

    afterEach(() => {
      fetch.resetMocks();
    });

    it("Should fetch results", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: output } }),
      });

      await store.dispatch(fetchSearchResults(term));

      const posts = selectSearchResults(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify(output));

      const error = selectSearchError(store.getState());
      expect(error).toBe(false);

      const loading = selectSearchLoading(store.getState());
      expect(loading).toBe(false);
    });

    it("Should fetch results, but server is not ok", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => ({ data: { children: output } }),
      });
      await store.dispatch(fetchSearchResults(term));
      const posts = selectSearchResults(store.getState());
      expect(JSON.stringify(posts)).toBe(JSON.stringify([]));

      const error = selectSearchError(store.getState());
      expect(error).toBe(false);
    });

    it("Should set error to true", async () => {
      fetch.mockRejectedValueOnce({});

      await store.dispatch(fetchSearchResults(term));
      const error = selectSearchError(store.getState());
      expect(error).toBe(true);
    });
  });
});
