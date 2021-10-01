import PostPage from "./PostPage";
import {
  setUp,
  setUpRedux,
  findByDataTest,
  findByDTextChildren,
} from "../../utils/testUtils";

describe("PostPage", () => {
  const output = [
    [
      {
        data: {
          author: "Daniel",
          selftext: "Awesome post here",
          title: "mock title",
          created: Date.now(),
          ups: 139,
          num_comments: 32,
          id: 3,
          subreddit_name_prefixed: "r/horror",
          is_video: true,
          media: { reddit_video: { fallback_url: "mock/video/path.avi" } },
          preview: {
            variants: { gif: { source: { url: "mock.gif" } } },
            images: [
              { source: { url: "mock.jpg" } },
              { source: { url: "mock2.jpg" } },
            ],
          },
        },
      },
    ],
    [
      {
        data: {
          created: Date.now(),
          author: "Mock author",
          id: 1,
          body: "Mock text",
          replies: {
            data: {
              children: [
                {
                  data: {
                    created: Date.now(),
                    author: "Mock replied author",
                    id: 11,
                    body: "Mock replied text",
                  },
                },
              ],
            },
          },
        },
      },
    ],
  ];

  afterEach(() => {
    fetch.resetMocks();
  });

  it("Should render post and comments", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => [
        { data: { children: output[0] } },
        { data: { children: output[1] } },
      ],
    });
    const wrapper = setUpRedux(PostPage);
    const mock = findByDataTest("mock-post-comments", wrapper);
    expect(mock.length).toBe(1);

    await new Promise((resolve) => setImmediate(resolve));
    wrapper.update();

    const post = findByDataTest("post-fullpage", wrapper);
    expect(post.length).toBe(1);

    const comments = findByDataTest("comments-fullpage", wrapper);
    expect(comments.length).toBe(1);
  });

  it("Should render error message", async () => {
    fetch.mockRejectedValueOnce();

    const wrapper = setUpRedux(PostPage);
    await new Promise((resolve) => setImmediate(resolve));
    wrapper.update();

    const error = findByDataTest("post-comments-error", wrapper);
    expect(error.length).toBe(1);
  });
});
