import React from 'react';
import { mount } from 'enzyme';
import NavigationContainer from '../NavigationContainer';
import { expect } from '@jest/globals';

describe('NavigationContainer', () => {
  it('should render container properly', () => {
    const component = mount(<NavigationContainer>Test</NavigationContainer>);
    expect(component).toMatchSnapshot();
  });
});
