import Header from "./Header";
import { findByDataTest, setUp } from "../../utils/testUtils";

describe("Header", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(Header);
  });

  it("Should render Header", () => {
    const element = findByDataTest("header", wrapper);
    expect(element.length).toBe(1);
  });
});
