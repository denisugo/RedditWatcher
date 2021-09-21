import SearchBar from "./SearchBar";
import { findByDataTest, setUp } from "../../utils/testUtils";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  let wrapper;
  let element;
  beforeEach(() => {
    wrapper = setUp(SearchBar);
    element = findByDataTest("search-bar", wrapper);
  });

  it("should render SearchBar", () => {
    expect(element.length).toBe(1);
  });
});

describe("SearchBar styling", () => {
  afterAll(cleanup);

  beforeEach(() => {
    render(<SearchBar />);
  });

  it("should have NO border at the begining", () => {
    const element = screen.getByTestId("search-bar");
    const style = window.getComputedStyle(element).border;

    expect(style).toBe("");
  });

  it("should have border after mouse enter", () => {
    const element = screen.getByTestId("search-bar");

    fireEvent.mouseEnter(screen.getByTestId("search-bar"));
    const style = window.getComputedStyle(element).border;
    expect(style).toBe("3px solid #706f6f");
  });

  it("should NOT have border after mouse leave", () => {
    const element = screen.getByTestId("search-bar");

    fireEvent.mouseEnter(screen.getByTestId("search-bar"));
    fireEvent.mouseLeave(screen.getByTestId("search-bar"));
    const style = window.getComputedStyle(element).border;
    expect(style).toBe("");
  });
});

// describe("SearchBar styling", () => {
//   afterEach(cleanup);

//   let wrapper;
//   beforeEach(() => {
//     wrapper = render(<SearchBar />);
//   });

//   it("should have NO border at the begining", () => {
//     const wrapper = render(<SearchBar />);
//     expect(wrapper.asFragment(<SearchBar />)).toMatchSnapshot();
//   });

//   it("should have border after mouse enter event and not have after mouse leave", () => {
//     fireEvent.mouseEnter(screen.getByTestId("search-bar"));
//     expect(wrapper.asFragment(<SearchBar />)).toMatchSnapshot();

//     fireEvent.mouseLeave(screen.getByTestId("search-bar"));
//     expect(wrapper.asFragment(<SearchBar />)).toMatchSnapshot();
//   });
// });
