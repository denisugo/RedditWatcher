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
      expect(style).toHaveProperty("border", "3px solid #706F6F");

      element.simulate("mouseleave");
      element = findByDataTest("search-bar", wrapper);
      style = element.prop("style");
      expect(style).toHaveProperty("border", "none");
    });
  });

  describe("Search result logic", () => {
    let wrapper;
    let element;
    beforeEach(() => {
      wrapper = setUpRedux(SearchBar);
      element = findByDataTest("search-bar", wrapper);
    });

    it("Should render search resuslts after clicking and stop rendering aftre blur", () => {
      let searchResults = findByDataTest("search-results", wrapper);
      element.simulate("focus");
      searchResults = findByDataTest("search-results", wrapper);
      expect(searchResults.length).toBe(1);

      element.simulate("blur");
      searchResults = findByDataTest("search-results", wrapper);
      expect(searchResults.length).toBe(0);
    });
  });
});
