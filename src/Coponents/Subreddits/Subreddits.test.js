import {
  findByDataTest,
  findByDTextChildren,
  setUp,
  setUpRedux,
} from "../../utils/testUtils";
import Subreddits from "./Subreddits";
import icons from "../../assets/subredditsIcons";

const subreddits = [
  {
    name: "home",
    subreddit: "r/popular",
    icon: icons.home,
    id: 0,
  },
  {
    name: "Art",
    subreddit: "r/art",
    icon: icons.art,
    id: 1,
  },
  {
    name: "science",
    subreddit: "r/science",
    icon: icons.science,
    id: 2,
  },
];

describe("Subreddits", () => {
  const subs = {
    subreddits: subreddits,
    setSelectedSubreddit: jest.fn(),
    selectedSubreddit: subreddits[0].subreddit,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = setUp(Subreddits, subs);
  });

  afterEach(() => {
    wrapper = null;
  });

  it("Should remder Subreddits", () => {
    const element = findByDataTest("subreddits", wrapper);
    expect(element.length).toBe(1);
  });

  describe("Integration test", () => {
    it("Should render Subreddit components", () => {
      const element = findByDataTest("subreddit", wrapper);
      expect(element.length).toBe(3);

      const subredditComponent = element.first().dive();
      const subreddit = findByDataTest("subreddit", subredditComponent);
      expect(subreddit.length).toBe(1);
      expect(subreddit.prop("className")).toBe("subreddit subreddit-selected");
    });
  });
});
