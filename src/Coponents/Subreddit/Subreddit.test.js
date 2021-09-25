import {
  findByDataTest,
  findByDTextChildren,
  setUp,
  setUpRedux,
} from "../../utils/testUtils";
import Subreddit from "./Subreddit";

describe("Subreddit", () => {
  const sub = {
    name: "funny",
    subreddit: "r/funny",
    icon: "mock.image",
  };

  let wrapper;
  beforeEach(() => {
    wrapper = setUp(Subreddit, sub);
  });

  it("Should render Subreddit with all properties", () => {
    const element = findByDataTest("subreddit", wrapper);
    expect(element.length).toBe(1);

    const icon = findByDataTest("icon", wrapper);
    expect(icon.length).toBe(1);
    expect(icon.prop("src")).toBe(sub.icon);

    const subredditName = findByDTextChildren(sub.name, wrapper);
    expect(subredditName.length).toBe(1);
  });
});
