import { mount, shallow } from 'enzyme';
import { expect, jest } from '@jest/globals';
import React from 'react';
import BackgroundImages from '../BackgroundImages';
import CommonUtils from '../../../../../common/utils/creation-utils/arrays/common';

jest.mock('next/image', () => (props) => <div {...props} />);

describe('LoginBackImages', () => {
  beforeEach(() => {
    jest
      .spyOn(CommonUtils, 'arrayOfImagesByType')
      .mockReturnValue(['1', '2', '3']);
  });

  it('should render container properly', async () => {
    const component = await shallow(<BackgroundImages>Test</BackgroundImages>);
    expect(component).toMatchSnapshot();
  });

  it('should set body overflow to hidden', async () => {
    await mount(<BackgroundImages>Test</BackgroundImages>);
    expect(document.body.style.overflow).toBe('hidden');
  });
});
