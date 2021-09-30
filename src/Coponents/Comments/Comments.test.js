import Comments from "./Comments";
import { findByDataTest, setUp, setUpRedux } from "../../utils/testUtils";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

describe("Comments", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUpRedux(Comments);
  });

  it("Should render Comments", () => {
    const element = findByDataTest("comments", wrapper);
    expect(element.length).toBe(1);
  });
});

describe("Comments fetching", () => {
  const url = "/r/antimasker_gets_owned/";
  const id = 1;
  const output = [
    {
      data: {
        id: 1,
        author: "Gigalord",
        created: Date.now(),
        body: "Nice post, man",
      },
    },
  ];

  afterEach(() => {
    fetch.resetMocks();
  });

  it("Should fetch comments", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => [{}, { data: { children: output } }],
    });

    const wrapper = setUpRedux(Comments, { url: url, id: id });

    const mockComments = findByDataTest("mock-comments", wrapper);
    expect(mockComments.length).toBe(1);

    await new Promise((resolve) => setImmediate(resolve));

    wrapper.update();

    const element = findByDataTest("comment", wrapper);

    expect(element.length).not.toBe(0);
  });

  it("Should fetch comments", async () => {
    fetch.mockRejectedValueOnce();

    const wrapper = setUpRedux(Comments, { url: url, id: id });

    await new Promise((resolve) => setImmediate(resolve));

    wrapper.update();

    const error = findByDataTest("comments-error", wrapper);

    expect(error.length).toBe(1);
  });
});
