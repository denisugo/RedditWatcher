import Comment from "./Comment";
import {
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils";
import { getDate } from "../../utils/utils";

describe("Comment", () => {
  let wrapper;
  const user = "Gigalord";
  const date = Date.now();
  const content = "It is my first comment on this platform ever";

  beforeEach(() => {
    wrapper = setUp(Comment, { user: user, date: date, content: content });
  });

  it("Should render Comment", () => {
    const element = findByDataTest("comment", wrapper);
    expect(element.length).toBe(1);

    const userNode = findByDTextChildren(user, wrapper);
    expect(userNode.length).toBe(1);
    const dateNode = findByDTextChildren(getDate(date), wrapper);
    expect(dateNode.length).toBe(1);
    const contentNode = findByDTextChildren(content, wrapper);
    expect(contentNode.length).toBe(1);
  });

  it("Should render shadow when mouse enters and stop rendering shadow when mouse leaves", () => {
    let element = findByDataTest("comment", wrapper);
    let style = element.prop("style");
    expect(style).toHaveProperty("boxShadow", null);

    element.simulate("mouseenter");
    element = findByDataTest("comment", wrapper);
    style = element.prop("style");
    expect(style).toHaveProperty("boxShadow", "0 3px 8px #b7e0f7");

    element.simulate("mouseleave");
    element = findByDataTest("comment", wrapper);
    style = element.prop("style");
    expect(style).toHaveProperty("boxShadow", null);
  });
});
