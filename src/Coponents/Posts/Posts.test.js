import Posts from "./Posts";
import { findByDataTest, setUpRedux } from "../../utils/testUtils";

describe("Posts", () => {
  const emptyPosts = [];
  const twoPosts = [
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

  it("Should render Posts", () => {
    const wrapper = setUpRedux(Posts, { posts: emptyPosts, isLoading: false });
    const element = findByDataTest("posts", wrapper);
    expect(element.length).toBe(1);
  });
  it("Should render Post components", () => {
    const wrapper = setUpRedux(Posts, { posts: twoPosts, isLoading: false });
    const element = findByDataTest("post", wrapper);
    expect(element.length).toBe(2 * 3); //Should be * by 3 because of Link (Link + LinkAnchor + a)
  });
  it("Should render mock posts", () => {
    const wrapper = setUpRedux(Posts, { posts: emptyPosts, isLoading: true });
    const element = findByDataTest("post", wrapper);
    expect(element.length).toBe(0);

    const mockElement = findByDataTest("mock-posts", wrapper);
    expect(mockElement.length).toBe(1);
  });
  it("Should render error message", () => {
    const wrapper = setUpRedux(Posts, {
      posts: emptyPosts,
      isLoading: false,
      isError: true,
    });
    const element = findByDataTest("post", wrapper);
    expect(element.length).toBe(0);

    const errorElement = findByDataTest("error-message", wrapper);
    expect(errorElement.length).toBe(1);
  });
});
