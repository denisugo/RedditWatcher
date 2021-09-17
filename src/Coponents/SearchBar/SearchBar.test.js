import SearchBar from "./SearchBar";
import { findByDataTest, setUp } from "../../utils/testUtils";

describe("SearchBar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp(SearchBar);
  });

  it("should render SearchBar", () => {
    const element = findByDataTest("search-bar", wrapper);
    expect(element.length).toBe(1);
  });
});
