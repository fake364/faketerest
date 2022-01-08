import React from 'react';
import { mount } from 'enzyme';
import BaseLink from './BaseLink';

describe('BaseLink component', () => {
	it('should render properly with default props', () => {
		const component = mount(
			<BaseLink href={'/test'}>Test component</BaseLink>
		);
		expect(component).toMatchSnapshot();
	});

	it('should render properly with classname', () => {
		const component = mount(
			<BaseLink className="test-class" href={'/test'}>
				Test component
			</BaseLink>
		);
		expect(component).toMatchSnapshot();
	});
});
