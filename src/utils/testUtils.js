import { shallow, mount } from "enzyme";

import { Provider } from "react-redux";
import posts from "../features/PostsSlice/PostsSlice";
import comments from "../features/CommentsSlice/CommentsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const setUp = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};
export const setUpRedux = (Component, props) => {
  const store = configureStore({
    reducer: {
      posts: posts,
      comments: comments,
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

  return wrapper;
  // return wrapper.childAt(0).dive();
};

export const findByDataTest = (attr, wrapper) => {
  const element = wrapper.find(`[data-testid='${attr}']`);
  return element;
};
export const findByDTextChildren = (text, wrapper) => {
  const element = wrapper.find({ children: text });
  return element;
};
