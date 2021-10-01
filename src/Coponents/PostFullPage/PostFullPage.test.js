import PostFullPage from "./PostFullPage";
import {
  findByDataTest,
  findByDTextChildren,
  setUp,
  setUpRedux,
} from "../../utils/testUtils";

import { getDate } from "../../utils/utils.js";

describe("PostFullPage", () => {
  const mockImg = "mock/image/path.jpg";
  const testDate = Date.now();

  const post = {
    data: {
      author: "Daniel",
      selftext: "Awesome post here",
      title: "mock title",
      created: testDate,
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
  };

  const dateString = getDate(testDate / 1000);
  const fullName = `${post.user} (${post.subreddit})`;

  let wrapper;

  beforeEach(() => {
    wrapper = setUp(PostFullPage, { post });
  });

  describe("Rendering", () => {
    it("Should render PostFullPage", () => {
      const element = findByDataTest("post-fullpage", wrapper);
      expect(element.length).toBe(1);
    });
  });
  describe("Parameters", () => {
    it("Should render video", () => {
      const element = findByDataTest("video-source", wrapper);
      expect(element.prop("src")).toBe(
        post.data.media.reddit_video.fallback_url
      );
    });

    it("Should render gif", () => {
      post.data.is_video = false;
      wrapper = setUp(PostFullPage, { post });

      const element = findByDataTest("post-image-0", wrapper);
      expect(element.prop("src")).toBe(
        post.data.preview.variants.gif.source.url
      );
    });

    it("Should render two images", () => {
      post.data.is_video = false;
      post.data.preview.variants = null;
      wrapper = setUp(PostFullPage, { post });

      const element1 = findByDataTest("post-image-0", wrapper);
      expect(element1.prop("src")).toBe(post.data.preview.images[0].source.url);

      const element2 = findByDataTest("post-image-1", wrapper);
      expect(element2.prop("src")).toBe(post.data.preview.images[1].source.url);
    });

    it("Should render text", () => {
      post.data.is_video = false;
      post.data.preview = null;
      wrapper = setUp(PostFullPage, { post });

      const element = findByDTextChildren(post.data.selftext, wrapper);
      expect(element.length).toBe(1);
    });

    it("Should render title and date", () => {
      const title = findByDTextChildren(post.data.title, wrapper);
      expect(title.length).toBe(1);

      const date = findByDTextChildren(dateString, wrapper);
      expect(date.length).toBe(1);
    });
  });

  describe("PostFullPage Styling", () => {
    describe("Arrow Up", () => {
      it("Should have default class", () => {
        const element = findByDataTest("arrow-up", wrapper);
        expect(element.prop("className")).toBe("arrow-up arrow-up-default");
      });
      it("Should change classname to hovered when mouseenter", () => {
        let element = findByDataTest("arrow-up", wrapper);
        element.simulate("mouseenter");
        element = findByDataTest("arrow-up", wrapper);

        expect(element.prop("className")).toBe("arrow-up arrow-up-hovered");
      });
      it("Should change classname back to default when mouseleave", () => {
        let element = findByDataTest("arrow-up", wrapper);
        element.simulate("mouseenter");
        element.simulate("mouseleave");
        element = findByDataTest("arrow-up", wrapper);

        expect(element.prop("className")).toBe("arrow-up arrow-up-default");
      });
    });
  });
});
