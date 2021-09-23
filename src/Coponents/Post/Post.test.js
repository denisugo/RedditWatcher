import Post from "./Post.js";
import { findByDataTest, setUp } from "../../utils/testUtils";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { Simulate } from "react-dom/test-utils";
import Comments from "../Comments/Comments.js";
import { getDate } from "../../utils/utils.js";

describe("Post", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp(Post);
  });

  it("Should render Post", () => {
    const element = findByDataTest("post", wrapper);
    expect(element.length).toBe(1);
  });
});

describe("Post styling", () => {
  afterAll(cleanup);

  beforeEach(() => {
    render(<Post />);
  });

  describe("Arrow up", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      const element = screen.getByTestId("arrow-up");
      let style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");

      fireEvent.mouseEnter(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(222, 85, 31)");

      fireEvent.mouseLeave(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");
    });
  });

  describe("Arrow down", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      const element = screen.getByTestId("arrow-down");
      let style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");

      fireEvent.mouseEnter(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(222, 85, 31)");

      fireEvent.mouseLeave(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");
    });
  });

  describe("Comment", () => {
    it("Should change color to red while mouseenter and change it back after mouseleave", () => {
      const element = screen.getByTestId("comment-button");
      let style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");

      fireEvent.mouseEnter(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(222, 85, 31)");

      fireEvent.mouseLeave(element);
      style = window.getComputedStyle(element).color;

      expect(style).toBe("rgb(112, 111, 111)");
    });
  });
});

describe("Post comments", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp(Post);
  });

  it("Should NOT show up comments at the begining", () => {
    const element = findByDataTest("comments", wrapper);
    expect(element.length).toBe(0);
  });

  it("Should show up comments when clicking on comment button", () => {
    const button = findByDataTest("comment-button", wrapper);
    button.simulate("click");
    const element = wrapper.find("Comments").dive();
    expect(element.length).toBe(1);
  });
});

describe("Post, passing parameters", () => {
  afterAll(cleanup);

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

  const dateString = getDate(testDate);

  const fullName = `${post.user} (${post.subreddit})`;

  it("Should render all provided elements (single image)", () => {
    render(
      <Post
        user={post.user}
        date={testDate}
        text={post.text}
        images={post.images}
        upvotes={post.upvotes}
        comments={post.comments}
        subreddit={post.subreddit}
      />
    );

    const user = screen.queryByText(fullName);
    const date = screen.queryByText(dateString);
    const text = screen.queryByText(post.text);
    const image = screen.queryByTestId("post-image-0");
    const upvotes = screen.queryByText(post.upvotes.toString());
    const comments = screen.queryByText(post.comments.toString());

    expect(user).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockImg);
    expect(upvotes).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
  });

  it("Should render all provided elements (two images)", () => {
    render(
      <Post
        user={post.user}
        date={testDate}
        text={post.text}
        images={post.twoImages}
        upvotes={post.upvotes}
        comments={post.comments}
        subreddit={post.subreddit}
      />
    );

    const image1 = screen.queryByTestId("post-image-0");
    const image2 = screen.queryByTestId("post-image-1");

    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
    expect(image1.src).toContain(mockImg);
    expect(image2.src).toContain(mockImg);
  });

  it("Should render all provided elements (NO image)", () => {
    render(
      <Post
        user={post.user}
        date={testDate}
        text={post.text}
        images={null}
        upvotes={post.upvotes}
        comments={post.comments}
        subreddit={post.subreddit}
      />
    );

    const user = screen.queryByText(fullName);
    const date = screen.queryByText(dateString);
    const text = screen.queryByText(post.text);
    const image = screen.queryByTestId("post-image-0");
    const upvotes = screen.queryByText(post.upvotes.toString());
    const comments = screen.queryByText(post.comments.toString());

    expect(user).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
    expect(upvotes).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
  });

  it("Should render all provided elements (single video)", () => {
    render(
      <Post
        user={post.user}
        date={testDate}
        text={post.text}
        images={null}
        upvotes={post.upvotes}
        comments={post.comments}
        subreddit={post.subreddit}
        video={post.video}
      />
    );

    const user = screen.queryByText(fullName);
    const date = screen.queryByText(dateString);
    const text = screen.queryByText(post.text);
    const image = screen.queryByTestId("post-image-0");
    // Causes error throwing because of "muted attribute"
    const video = screen.queryByTestId("video");

    const upvotes = screen.queryByText(post.upvotes.toString());
    const comments = screen.queryByText(post.comments.toString());

    expect(user).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(upvotes).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
  });
});
