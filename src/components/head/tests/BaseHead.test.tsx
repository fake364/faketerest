import { mount } from 'enzyme';
import { expect } from '@jest/globals';
import React from 'react';
import BaseHead from '../BaseHead';

describe('BaseHead', () => {
  it('should render head container properly', () => {
    const component = mount(<BaseHead>Test</BaseHead>);
    expect(component).toMatchSnapshot();
  });
});
