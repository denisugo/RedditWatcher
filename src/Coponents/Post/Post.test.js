import Post from "./Post.js";
import {
  findByDataTest,
  findByDTextChildren,
  setUp,
  setUpRedux,
} from "../../utils/testUtils";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { getDate } from "../../utils/utils.js";

describe("Post", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUpRedux(Post);
  });

  it("Should render Post", () => {
    const element = findByDataTest("post", wrapper);
    expect(element.length).toBe(1);
  });
});

describe("Post styling", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUpRedux(Post);
  });

  describe("Arrow up", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      let element = findByDataTest("arrow-up", wrapper).first();
      let style = element.prop("style");
      expect(style).toHaveProperty("color", "#706F6F");
      expect(style).toHaveProperty("backgroundColor", null);

      element.simulate("mouseenter");
      element = findByDataTest("arrow-up", wrapper).first();
      style = element.prop("style");
      expect(style).toHaveProperty("color", "#de551f");
      expect(style).toHaveProperty("backgroundColor", "#dfdfdf");

      element.simulate("mouseleave");
      element = findByDataTest("arrow-up", wrapper).first();
      style = element.prop("style");
      expect(style).toHaveProperty("color", "#706F6F");
      expect(style).toHaveProperty("backgroundColor", null);
    });
  });

  describe("Arrow down", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      let element = findByDataTest("arrow-down", wrapper).first();
      let style = element.prop("style");
      expect(style).toHaveProperty("color", "#706F6F");
      expect(style).toHaveProperty("backgroundColor", null);

      element.simulate("mouseenter");
      element = findByDataTest("arrow-down", wrapper).first();
      style = element.prop("style");
      expect(style).toHaveProperty("color", "#de551f");
      expect(style).toHaveProperty("backgroundColor", "#dfdfdf");

      element.simulate("mouseleave");
      element = findByDataTest("arrow-down", wrapper).first();
      style = element.prop("style");
      expect(style).toHaveProperty("color", "#706F6F");
      expect(style).toHaveProperty("backgroundColor", null);
    });
  });

  describe("Comment", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      let element = findByDataTest("comment-button", wrapper);
      let style = element.prop("style");
      expect(style).toHaveProperty("color", "#706F6F");
      expect(style).toHaveProperty("backgroundColor", null);

      element.simulate("mouseenter");
      element = findByDataTest("comment-button", wrapper);
      style = element.prop("style");
      expect(style).toHaveProperty("color", "#de551f");
      expect(style).toHaveProperty("backgroundColor", "#dfdfdf");

      element.simulate("mouseleave");
      element = findByDataTest("comment-button", wrapper);
      style = element.prop("style");
      expect(style).toHaveProperty("color", "#706F6F");
      expect(style).toHaveProperty("backgroundColor", null);
    });
  });
});

describe("Post comments", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUpRedux(Post);
  });

  it("Should NOT show up comments at the begining", () => {
    const element = findByDataTest("comments", wrapper);
    expect(element.length).toBe(0);
  });

  it("Should show up comments when clicking on comment button", () => {
    const button = findByDataTest("comment-button", wrapper).first();
    button.simulate("click");
    // console.log(wrapper.find("Comments").debug());
    // const element = wrapper.find("Comments");
    const element = findByDataTest("comments", wrapper);
    expect(element.length).toBe(2); // Should be 2 because of Comments itself and inner <div> with the same test id
  });
});

describe("Post, passing parameters", () => {
  const mockImg = "mock/image/path.jpg";
  const post = {
    user: "Daniel",
    text: "Awesome post here",
    images: [{ source: { url: mockImg } }],
    twoImages: [{ source: { url: mockImg } }, { source: { url: mockImg } }],
    upvotes: 139,
    comments: 32,
    id: 3,
    subreddit: "r/horror",
    video: "mock/video/path.avi",
  };

  const testDate = Date.now();

  const dateString = getDate(testDate / 1000);

  const fullName = `${post.user} (${post.subreddit})`;

  let wrapper;

  afterEach(() => {
    wrapper = null;
  });

  it("Should render all provided elements (single image)", () => {
    wrapper = setUpRedux(Post, {
      user: post.user,
      date: testDate,
      text: post.text,
      images: post.images,
      upvotes: post.upvotes,
      numOfComments: post.comments,
      subreddit: post.subreddit,
    });

    const user = findByDTextChildren(fullName, wrapper);
    const date = findByDTextChildren(dateString, wrapper);
    const text = findByDTextChildren(post.text, wrapper);
    const image = findByDataTest("post-image-0", wrapper);
    const upvotes = findByDTextChildren(post.upvotes, wrapper);
    const comments = findByDTextChildren(post.comments, wrapper);

    expect(user.length).toBe(1);
    expect(date.length).toBe(1);
    expect(text.length).toBe(1);
    expect(image.length).toBe(1);
    expect(image.prop("src")).toBe(mockImg);
    expect(upvotes.length).toBe(1);
    expect(comments.length).toBe(1);
  });

  it("Should render all provided elements (two images)", () => {
    wrapper = setUpRedux(Post, {
      user: post.user,
      date: testDate,
      text: post.text,
      images: post.twoImages,
      upvotes: post.upvotes,
      numOfComments: post.comments,
      subreddit: post.subreddit,
    });

    const image1 = findByDataTest("post-image-0", wrapper);
    const image2 = findByDataTest("post-image-1", wrapper);

    expect(image1.length).toBe(1);
    expect(image2.length).toBe(1);
    expect(image1.prop("src")).toBe(mockImg);
    expect(image2.prop("src")).toBe(mockImg);
  });

  it("Should render all provided elements (NO image)", () => {
    wrapper = setUpRedux(Post, {
      user: post.user,
      date: testDate,
      text: post.text,
      images: null,
      upvotes: post.upvotes,
      numOfComments: post.comments,
      subreddit: post.subreddit,
    });

    const user = findByDTextChildren(fullName, wrapper);
    const date = findByDTextChildren(dateString, wrapper);
    const text = findByDTextChildren(post.text, wrapper);
    const image = findByDataTest("post-image-0", wrapper);
    const upvotes = findByDTextChildren(post.upvotes, wrapper);
    const comments = findByDTextChildren(post.comments, wrapper);

    expect(user.length).toBe(1);
    expect(date.length).toBe(1);
    expect(text.length).toBe(1);
    expect(image.length).toBe(0);
    expect(upvotes.length).toBe(1);
    expect(comments.length).toBe(1);
  });

  it("Should render all provided elements (single video)", () => {
    wrapper = setUpRedux(Post, {
      user: post.user,
      date: testDate,
      text: post.text,
      images: null,
      upvotes: post.upvotes,
      numOfComments: post.comments,
      subreddit: post.subreddit,
      video: post.video,
    });

    const user = findByDTextChildren(fullName, wrapper);
    const date = findByDTextChildren(dateString, wrapper);
    const text = findByDTextChildren(post.text, wrapper);
    const image = findByDataTest("post-image-0", wrapper);
    const video = findByDataTest("video", wrapper); // Causes error throwing because of "muted attribute"
    const upvotes = findByDTextChildren(post.upvotes, wrapper);
    const comments = findByDTextChildren(post.comments, wrapper);

    expect(user.length).toBe(1);
    expect(date.length).toBe(1);
    expect(text.length).toBe(1);
    expect(image.length).toBe(0);
    expect(video.length).toBe(1);
    expect(upvotes.length).toBe(1);
    expect(comments.length).toBe(1);
  });
});
