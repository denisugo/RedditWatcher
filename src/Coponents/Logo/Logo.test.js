import Logo from "./Logo";
import { findByDataTest, setUp } from "../../utils/testUtils";

describe("Logo", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp(Logo);
  });

  it("should render logo", () => {
    const element = findByDataTest("logo", wrapper);
    expect(element.length).toBe(1);
  });
});
