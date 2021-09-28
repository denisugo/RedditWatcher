import {
  findByDataTest,
  findByDTextChildren,
  setUp,
  setUpRedux,
} from "../../utils/testUtils";
import Subreddit from "./Subreddit";

describe("Subreddit", () => {
  const setSelectedSubreddit = jest.fn();
  const sub = {
    name: "funny",
    subreddit: "r/funny",
    icon: "mock.image",
    selectedSubreddit: false,
    setSelectedSubreddit: setSelectedSubreddit,
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

  describe("Styling", () => {
    it("Should have default class at begining", () => {
      const element = findByDataTest("subreddit", wrapper);
      expect(element.prop("className")).toBe("subreddit subreddit-default");
    });

    it("Should have hovered class when mouse enters and default after mouse leaves", () => {
      let element = findByDataTest("subreddit", wrapper);
      element.simulate("mouseenter");
      element = findByDataTest("subreddit", wrapper);
      expect(element.prop("className")).toBe("subreddit subreddit-hovered");

      element.simulate("mouseleave");
      element = findByDataTest("subreddit", wrapper);
      expect(element.prop("className")).toBe("subreddit subreddit-default");
    });

    it("Should have selected class when onClick", () => {
      let element = findByDataTest("subreddit", wrapper);
      element.simulate("click");

      expect(setSelectedSubreddit.mock.calls.length).toBe(1);
    });
  });
});
