import SearchBar from "./SearchBar";
import { findByDataTest, setUp, setUpRedux } from "../../utils/testUtils";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  describe("Initial state", () => {
    let wrapper;
    let element;
    beforeEach(() => {
      wrapper = setUpRedux(SearchBar);
      element = findByDataTest("search-bar", wrapper);
    });

    it("Should render SearchBar", () => {
      expect(element.length).toBe(1);
    });
    it("Should NOT render search results", () => {
      const searchResults = findByDataTest("search-results", wrapper);
      expect(searchResults.length).toBe(0);
    });
  });

  describe("Styling", () => {
    let wrapper;
    let element;
    beforeEach(() => {
      wrapper = setUpRedux(SearchBar);
      element = findByDataTest("search-bar", wrapper);
    });

    it("should have NO border at the begining", () => {
      const style = element.prop("style");

      expect(style).toHaveProperty("border", "none");
    });

    it("should have border after mouse enter and have NO border after mouse leaves", () => {
      element.simulate("mouseenter");
      element = findByDataTest("search-bar", wrapper);
      let style = element.prop("style");
      expect(style).toHaveProperty("border", "3px solid #E09E43");

      element.simulate("mouseleave");
      element = findByDataTest("search-bar", wrapper);
      style = element.prop("style");
      expect(style).toHaveProperty("border", "none");
    });
  });

  describe("Search result logic", () => {
    describe("Fetching search results", () => {
      const output = [
        {
          data: {
            id: 1,
            icon_img: null,
            display_name_prefixed: "mock",
          },
        },
        {
          data: {
            id: 2,
            icon_img: null,
            display_name_prefixed: "mock",
          },
        },
      ];

      afterEach(() => {
        fetch.resetMocks();
      });

      it("Should render search resuslts after focus and change", async () => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: () => ({ data: { children: output } }),
        });

        const wrapper = setUpRedux(SearchBar);
        const element = findByDataTest("search-bar", wrapper);

        element.simulate("focus");
        element
          .find("input")
          .simulate("change", { target: { name: "term", value: "art" } });

        const mockSearchResults = findByDataTest(
          "mock-search-results",
          wrapper
        );
        expect(mockSearchResults.length).toBe(1);

        await new Promise((resolve) => setImmediate(resolve));
        wrapper.update();

        const searchResults = findByDataTest("search-results", wrapper);
        expect(searchResults.length).toBe(1);
      });

      // it("Should render error message", async () => {
      //   fetch.mockRejectedValueOnce();

      //   const wrapper = setUpRedux(SearchBar);
      //   const element = findByDataTest("search-bar", wrapper);

      //   element.simulate("focus");
      //   element
      //     .find("input")
      //     .simulate("change", { target: { name: "term", value: "art" } });

      //   await new Promise((resolve) => setImmediate(resolve));
      //   wrapper.update();

      //   const error = findByDataTest("search-error", wrapper);
      //   expect(error.length).toBe(1);
      // });
    });
  });
});
