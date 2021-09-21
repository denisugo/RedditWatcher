import { shallow } from "enzyme";

export const setUp = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

export const findByDataTest = (attr, wrapper) => {
  const element = wrapper.find(`[data-testid='${attr}']`);
  return element;
};
