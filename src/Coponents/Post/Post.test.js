import Post from "./Post.js";
import { findByDataTest, setUp } from "../../utils/testUtils";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { Simulate } from "react-dom/test-utils";
import Comments from "../Comments/Comments.js";

describe("Post", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp(Post);
  });

  it("Should render Post", () => {
    const element = findByDataTest("post", wrapper);
    expect(element.length).toBe(1);
  });
});

describe("Post styling", () => {
  afterAll(cleanup);

  beforeEach(() => {
    render(<Post />);
  });

  describe("Arrow up", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      const element = screen.getByTestId("arrow-up");
      let style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");

      fireEvent.mouseEnter(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(222, 85, 31)");

      fireEvent.mouseLeave(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");
    });
  });

  describe("Arrow down", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      const element = screen.getByTestId("arrow-down");
      let style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");

      fireEvent.mouseEnter(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(222, 85, 31)");

      fireEvent.mouseLeave(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");
    });
  });

  describe("Comment", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      const element = screen.getByTestId("comment-button");
      let style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");

      fireEvent.mouseEnter(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(222, 85, 31)");

      fireEvent.mouseLeave(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");
    });
  });
});

describe("Post comments", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp(Post);
  });

  it("Should NOT show up comments at the begining", () => {
    const element = findByDataTest("comments", wrapper);
    expect(element.length).toBe(0);
  });

  it("Should show up comments when clicking on comment button", () => {
    const button = findByDataTest("comment-button", wrapper);
    button.simulate("click");
    const element = wrapper.find("Comments").dive();
    expect(element.length).toBe(1);
  });
});
