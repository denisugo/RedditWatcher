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

  let wrapper;

  beforeEach(() => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => [{}, { data: { children: output } }],
    });

    wrapper = setUpRedux(Comments, { url: url, id: id });
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it("Should fetch comments", async () => {
    await new Promise((resolve) => setImmediate(resolve));

    wrapper.update();
    // console.log(wrapper.debug());

    const element = findByDataTest("comment", wrapper);

    expect(element.length).not.toBe(0);
  });
});
