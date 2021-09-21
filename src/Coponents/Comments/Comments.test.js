import Comments from "./Comments";
import { findByDataTest, setUp } from "../../utils/testUtils";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

describe("Post", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp(Comments);
  });

  it("Should render Comments", () => {
    const element = findByDataTest("comments", wrapper);
    expect(element.length).toBe(1);
  });
});
