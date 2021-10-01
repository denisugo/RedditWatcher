import CommentsFullPage from "./CommentsFullPage";
import {
  setUp,
  findByDataTest,
  findByDTextChildren,
} from "../../utils/testUtils";

describe("CommentsFullPage", () => {
  const comments = [
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
    {
      data: {
        created: Date.now(),
        author: "Mock second author",
        id: 2,
        body: "Mock second text",
        replies: {
          data: {
            children: [
              {
                data: {
                  created: Date.now(),
                  author: "Mock second replied author",
                  id: 22,
                  body: "Mock second replied text",
                },
              },
            ],
          },
        },
      },
    },
  ];

  let wrapper;
  beforeEach(() => {
    wrapper = setUp(CommentsFullPage, { comments });
  });

  it("Should render CommentsFullPAge", () => {
    const element = findByDataTest("comments-fullpage", wrapper);
    expect(element.length).toBe(1);
  });

  it("Should render recursive comments", () => {
    const element1 = findByDataTest("comments-fullpage", wrapper)
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .dive();
    const author1 = findByDTextChildren(comments[0].data.author, element1);
    expect(author1.length).toBe(1);

    const authorreplied1 = findByDTextChildren(
      comments[0].data.replies.data.children[0].data.author,
      element1.childAt(3).childAt(0).childAt(0).dive()
    );
    expect(authorreplied1.length).toBe(1);

    const element2 = findByDataTest("comments-fullpage", wrapper)
      .childAt(0)
      .childAt(1)
      .childAt(0)
      .dive();
    const author2 = findByDTextChildren(comments[1].data.author, element2);
    expect(author2.length).toBe(1);

    const authorreplied2 = findByDTextChildren(
      comments[1].data.replies.data.children[0].data.author,
      element2.childAt(3).childAt(0).childAt(0).dive()
    );
    expect(authorreplied2.length).toBe(1);
  });
});
