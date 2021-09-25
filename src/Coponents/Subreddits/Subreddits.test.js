import {
  findByDataTest,
  findByDTextChildren,
  setUp,
  setUpRedux,
} from "../../utils/testUtils";
import Subreddits from "./Subreddits";

describe("Subreddits", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(Subreddits);
  });

  afterEach(() => {
    wrapper = null;
  });

  it("Should remder Subreddits", () => {
    const element = findByDataTest("subreddits", wrapper);
    expect(element.length).toBe(1);
  });

  describe("Integration test", () => {
    it("Should remder Subreddit components", () => {
      const element = findByDataTest("subreddit", wrapper);
      expect(element.length).toBe(3);

      const subredditComponent = element.first().dive();
      const subreddit = findByDataTest("subreddit", subredditComponent);
      expect(subreddit.length).toBe(1);
    });
  });
});
