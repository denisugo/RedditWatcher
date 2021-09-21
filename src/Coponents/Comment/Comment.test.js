import Comment from "./Comment";
import { findByDataTest, setUp } from "../../utils/testUtils";

describe("Comment", () => {
  let wrapper;
  const user = "Gigalord";
  const date = "12.11.2000";
  const content = "It is my first comment on this platform ever";

  beforeEach(() => {
    wrapper = setUp(Comment, { user: user, date: date, content: content });
  });

  it("Should render Comment", () => {
    const element = findByDataTest("comment", wrapper);
    expect(element.length).toBe(1);
  });
});
