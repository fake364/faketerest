import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../Layout';
import * as redux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}));

describe('Layout', () => {
  it('should display Auth navigation if user is logged in', () => {
    const mockState = { metadata: { isLoggedIn: true } };
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(mockState));
    const wrapper = shallow(<Layout>Text</Layout>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display Common navigation if user is not logged in', () => {
    const mockState = { metadata: { isLoggedIn: false } };
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(mockState));
    const wrapper = shallow(<Layout>Text</Layout>);
    expect(wrapper).toMatchSnapshot();
  });
});
