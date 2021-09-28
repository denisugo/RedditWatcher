import HomePage from "./HomePage";
import {
  setUp,
  setUpRedux,
  findByDataTest,
  findByDTextChildren,
} from "../../utils/testUtils";

describe("Homepage", () => {
  const output = [
    {
      data: {
        id: 0,
        author: "Jack",
        subreddit_name_prefixed: "r/reddit",
        created: Date.now(),
        title: "The ows are not what they seem",
        selftext: "",
        ups: 120,
        num_comments: 3,
        permalink: "/mock/link",
      },
    },
    {
      data: {
        id: 1,
        author: "Jack",
        subreddit_name_prefixed: "r/reddit",
        created: Date.now(),
        title: "The ows are not what they seem",
        selftext: "",
        ups: 120,
        num_comments: 3,
        permalink: "/mock/link",
      },
    },
  ];
  let wrapper;

  beforeEach(() => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => ({ data: { children: output } }),
    });
    wrapper = setUpRedux(HomePage);
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it("Should render Home Page", () => {
    const element = findByDataTest("homepage", wrapper);
    expect(element.length).toBe(1);
  });

  describe("Integration tests", () => {
    describe("Posts", () => {
      it("Should render mock posts", () => {
        const element = findByDataTest("mock-posts", wrapper);
        expect(element.length).toBe(1);
      });
      it("Should render posts", async () => {
        await new Promise((resolve) => setImmediate(resolve));
        wrapper.update();
        const element = findByDataTest("post", wrapper);
        expect(element.length).toBe(2);
      });
    });

    describe("Subreddits", () => {
      it("Should render Subreddits", () => {
        const element = findByDataTest("subreddits", wrapper);
        expect(element.length).toBe(1);
      });
    });
  });
});
