import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import posts from "../features/PostsSlice/PostsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const setUp = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};
export const setUpRedux = (Component, props) => {
  const store = configureStore({
    reducer: {
      posts: posts,
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
