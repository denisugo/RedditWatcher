import {
  setUp,
  setUpRedux,
  findByDataTest,
  findByDTextChildren,
} from "./utils/testUtils";
import App from "./App";
import { mountToJson } from "enzyme-to-json";

describe("App", () => {
  const path =
    "/r/news/comments/pz4tiq/infowars_host_alex_jones_is_responsible_for/";
  describe("Render", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setUpRedux(App, undefined, "/");
    });

    it("Should render HomePage", () => {
      const component = findByDataTest("homepage", wrapper);
      expect(component.length).toBe(1);

      const searchbar = findByDataTest("search-bar", wrapper);
      expect(searchbar.length).toBe(1);

      const footer = findByDataTest("footer", wrapper);
      expect(footer.length).toBe(1);

      //   wrapper = mountToJson(wrapper);
      //   expect(wrapper).toMatchSnapshot();
      //   expect(wrapper.debug()).toMatchSnapshot();
    });

    it("Should render PostPage", () => {
      wrapper = setUpRedux(App, undefined, path);
      const component = findByDataTest("postpage", wrapper);
      expect(component.length).toBe(1);

      const searchbar = findByDataTest("search-bar", wrapper);
      expect(searchbar.length).toBe(1);

      const footer = findByDataTest("footer", wrapper);
      expect(footer.length).toBe(1);

      //   expect(wrapper.debug()).toMatchSnapshot();
    });
  });

  describe("Home Page Rendering", () => {
    let output = {
      data: {
        author: "Daniel",
        selftext: "Awesome post here",
        title: "mock title",
        created: Date.now(),
        ups: 139,
        num_comments: 32,
        id: 3,
        subreddit_name_prefixed: "r/horror",
        is_video: false,
        permalink:
          "/r/news/comments/pz4tiq/infowars_host_alex_jones_is_responsible_for/",
        preview: {
          images: [
            { source: { url: "mock.jpg" } },
            { source: { url: "mock2.jpg" } },
          ],
        },
      },
    };

    let wrapper;

    beforeEach(() => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: [output] } }),
      });
      wrapper = setUpRedux(App, undefined, "/");
    });

    it("Should change subreddit by clicking on it", async () => {
      const component = findByDataTest("homepage", wrapper);

      expect(component.length).toBe(1);

      const subreddit = findByDataTest("subreddit", wrapper);
      expect(subreddit.length).not.toBe(0);

      const mockPosts = findByDataTest("mock-posts", wrapper);
      expect(mockPosts.length).not.toBe(0);

      await new Promise((res) => setImmediate(res));
      wrapper.update();

      const errorMessage = findByDataTest("error-message", wrapper);
      expect(errorMessage.length).toBe(0);

      const post = findByDataTest("post", wrapper);
      expect(post.length).not.toBe(0);

      const output2 = {
        data: {
          author: "Daniel",
          selftext: "Awesome post here",
          title: "second reddit",
          created: Date.now(),
          ups: 139,
          num_comments: 32,
          id: 3,
          subreddit_name_prefixed: "r/horror",
          is_video: false,
          preview: {
            images: [
              { source: { url: "mock.jpg" } },
              { source: { url: "mock2.jpg" } },
            ],
          },
        },
      };
      //   console.log(subreddit.at(2).debug());

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: [output2] } }),
      });
      subreddit.at(2).simulate("click");
      await new Promise((res) => setImmediate(res));
      wrapper.update();
      const secondSubredditPost = findByDTextChildren(
        output2.data.title,
        wrapper
      );
      expect(secondSubredditPost).not.toBe(0);

      //   expect(wrapper.debug()).toMatchSnapshot();
    });

    it("Should change subreddit by selecting it in searchbar", async () => {
      const component = findByDataTest("homepage", wrapper);
      expect(component.length).toBe(1);

      const mockPosts = findByDataTest("mock-posts", wrapper);
      expect(mockPosts.length).not.toBe(0);

      await new Promise((res) => setImmediate(res));
      wrapper.update();

      const searchbar = findByDataTest("search-bar", wrapper);
      expect(searchbar.length).toBe(1);

      const output2 = [
        {
          data: {
            id: 1,
            icon_img: null,
            display_name_prefixed: "mock",
          },
        },
        {
          data: {
            id: 2,
            icon_img: null,
            display_name_prefixed: "mock",
          },
        },
      ];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: output2 } }),
      });

      searchbar.simulate("focus");
      searchbar
        .find("input")
        .simulate("change", { target: { name: "term", value: "art" } });

      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();

      const searchResult = findByDataTest("search-result", wrapper);
      expect(searchResult.length).not.toBe(0);

      const output3 = {
        data: {
          author: "Daniel",
          selftext: "Awesome post here",
          title: "second reddit",
          created: Date.now(),
          ups: 139,
          num_comments: 32,
          id: 3,
          subreddit_name_prefixed: "r/horror",
          is_video: false,
          preview: {
            images: [
              { source: { url: "mock.jpg" } },
              { source: { url: "mock2.jpg" } },
            ],
          },
        },
      };
      //   console.log(subreddit.at(2).debug());

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: [output3] } }),
      });

      searchResult.at(1).simulate("click");
      await new Promise((res) => setImmediate(res));
      wrapper.update();

      const secondSubredditPost = findByDTextChildren(
        output3.data.title,
        wrapper
      );
      expect(secondSubredditPost).not.toBe(0);

      //   expect(wrapper.debug()).toMatchSnapshot();
    });

    it("Should show up comments after clicking on comments button", async () => {
      const component = findByDataTest("homepage", wrapper);
      expect(component.length).toBe(1);

      const mockPosts = findByDataTest("mock-posts", wrapper);
      expect(mockPosts.length).not.toBe(0);

      await new Promise((res) => setImmediate(res));
      wrapper.update();

      const post = findByDataTest("post", wrapper);
      expect(post.length).not.toBe(0);

      const commentButton = findByDataTest("comment-button", wrapper);
      expect(post.length).not.toBe(0);

      const output2 = [
        {
          data: {
            id: 1,
            author: "Gigalord",
            created: Date.now(),
            body: "Nice post, man",
          },
        },
      ];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [{}, { data: { children: output2 } }],
      });

      commentButton.first().simulate("click");

      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();

      const comment = findByDTextChildren(output2[0].data.body, wrapper);
      expect(comment.length).not.toBe(0);

      //   expect(wrapper.debug()).toMatchSnapshot();
    });

    it("Should redirect to post page after clicking on a post", async () => {
      const component = findByDataTest("homepage", wrapper);
      expect(component.length).toBe(1);

      const mockPosts = findByDataTest("mock-posts", wrapper);
      expect(mockPosts.length).not.toBe(0);

      await new Promise((res) => setImmediate(res));
      wrapper.update();

      const post = findByDataTest("post", wrapper);
      expect(post.length).not.toBe(0);
      expect(post.first().prop("to")).toBe(output.data.permalink);

      //   expect(wrapper.debug()).toMatchSnapshot();
      //   const output2 = [
      //     [
      //       {
      //         data: {
      //           author: "Daniel",
      //           selftext: "Awesome post here",
      //           title: "mock title",
      //           created: Date.now(),
      //           ups: 139,
      //           num_comments: 32,
      //           id: 3,
      //           subreddit_name_prefixed: "r/horror",
      //           is_video: true,
      //           media: { reddit_video: { fallback_url: "mock/video/path.avi" } },
      //           preview: {
      //             variants: { gif: { source: { url: "mock.gif" } } },
      //             images: [
      //               { source: { url: "mock.jpg" } },
      //               { source: { url: "mock2.jpg" } },
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //     [
      //       {
      //         data: {
      //           created: Date.now(),
      //           author: "Mock author",
      //           id: 1,
      //           body: "Mock text",
      //           replies: {
      //             data: {
      //               children: [
      //                 {
      //                   data: {
      //                     created: Date.now(),
      //                     author: "Mock replied author",
      //                     id: 11,
      //                     body: "Mock replied text",
      //                   },
      //                 },
      //               ],
      //             },
      //           },
      //         },
      //       },
      //     ],
      //   ];
      //   fetch.mockResolvedValueOnce({
      //     ok: true,
      //     json: () => [
      //       { data: { children: output2[0] } },
      //       { data: { children: output2[1] } },
      //     ],
      //   });

      //   post.first().simulate("click");

      //   wrapper.instance().history.replace(output.data.permalink);
      //   await new Promise((resolve) => setImmediate(resolve));
      //   wrapper.update();
      //   const postPage = findByDataTest("postpage", wrapper);
      //   expect(postPage.length).toBe(1);

      //   const comment = findByDTextChildren(output2[0].data.body, wrapper);
      //   expect(comment.length).not.toBe(0);
    });
  });

  describe("Post Page Rendering", () => {
    let output = {
      data: {
        author: "Daniel",
        selftext: "Awesome post here",
        title: "mock title",
        created: Date.now(),
        ups: 139,
        num_comments: 32,
        id: 3,
        subreddit_name_prefixed: "r/horror",
        is_video: false,
        permalink:
          "/r/news/comments/pz4tiq/infowars_host_alex_jones_is_responsible_for/",
        preview: {
          images: [
            { source: { url: "mock.jpg" } },
            { source: { url: "mock2.jpg" } },
          ],
        },
      },
    };

    let wrapper;

    beforeEach(() => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: [output] } }),
      });
      wrapper = setUpRedux(App, undefined, path);
    });

    it("Should change subreddit by selecting it in searchbar", async () => {
      const component = findByDataTest("postpage", wrapper);
      expect(component.length).toBe(1);

      const searchbar = findByDataTest("search-bar", wrapper);
      expect(searchbar.length).toBe(1);

      const output2 = [
        {
          data: {
            id: 1,
            icon_img: null,
            display_name_prefixed: "mock",
          },
        },
        {
          data: {
            id: 2,
            icon_img: null,
            display_name_prefixed: "mock",
          },
        },
      ];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => ({ data: { children: output2 } }),
      });

      searchbar.simulate("focus");
      searchbar
        .find("input")
        .simulate("change", { target: { name: "term", value: "art" } });

      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();

      const searchResult = findByDataTest("search-result", wrapper);
      expect(searchResult.length).not.toBe(0);
      expect(searchResult.first().prop("to")).toBe("/");

      //   expect(wrapper.debug()).toMatchSnapshot();
      //   const output3 = {
      //     data: {
      //       author: "Daniel",
      //       selftext: "Awesome post here",
      //       title: "second reddit",
      //       created: Date.now(),
      //       ups: 139,
      //       num_comments: 32,
      //       id: 3,
      //       subreddit_name_prefixed: "r/horror",
      //       is_video: false,
      //       preview: {
      //         images: [
      //           { source: { url: "mock.jpg" } },
      //           { source: { url: "mock2.jpg" } },
      //         ],
      //       },
      //     },
      //   };

      //   fetch.mockResolvedValueOnce({
      //     ok: true,
      //     json: () => ({ data: { children: [output3] } }),
      //   });

      //   searchResult.at(1).simulate("click");
      //   await new Promise((res) => setImmediate(res));
      //   wrapper.update();

      //   const secondSubredditPost = findByDTextChildren(
      //     output3.data.title,
      //     wrapper
      //   );
      //   expect(secondSubredditPost).not.toBe(0);
    });
  });
});
