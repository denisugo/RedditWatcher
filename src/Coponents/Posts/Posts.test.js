import Posts from "./Posts";
import { findByDataTest, setUpRedux } from "../../utils/testUtils";

describe("Posts", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUpRedux(Posts);
  });

  it("Should render Posts", () => {
    const element = findByDataTest("posts", wrapper);
    expect(element.length).toBe(1);
  });
});
