import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../MainPage';
import { SLIDER_THEMES } from '../../../../../common/enums/slider_themes';

jest.useFakeTimers();

describe('MainPage', () => {
  describe('constructor', () => {
    it('should initialize slider circular list', () => {
      const component = shallow(<MainPage />);
      expect(
        (component.instance() as MainPage).state.sliderListNode.value.type
      ).toBe(SLIDER_THEMES.DINNER_IDEA);
    });
  });

  describe('initiateSlider', () => {
    it('should create and save interval', () => {
      const component = shallow(<MainPage />);
      const instance = component.instance() as MainPage;
      instance.initiateSlider();
      component.update();
      expect(instance.state.timer).toBeDefined();
    });

    it('should slide to the next slide on interval callback', () => {
      const component = shallow(<MainPage />);
      const instance = component.instance() as MainPage;
      instance.initiateSlider();
      component.update();
      expect(instance.state.sliderListNode.value.type).toBe(
        SLIDER_THEMES.DINNER_IDEA
      );
      jest.runOnlyPendingTimers();
      component.update();
      expect(instance.state.sliderListNode.value.type).toBe(
        SLIDER_THEMES.NEW_OUTFIT
      );
    });
  });

  describe('componentWillUnmount', () => {
    it('should clear timer', () => {
      const spy = jest.spyOn(global, 'clearInterval');
      const component = shallow(<MainPage />);
      const instance = component.instance() as MainPage;
      instance.componentWillUnmount();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('takeASlide', () => {
    it('should stop and start animation after timeout', () => {
      const component = shallow(<MainPage />);
      const instance = component.instance() as MainPage;
      const spy = jest.fn();
      instance.takeASlide(spy);
      expect(instance.state.isPageSlidingStopped).toBeFalsy();
      jest.runOnlyPendingTimers();
      expect(instance.state.isPageSlidingStopped).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onClickJumpingButtonDown', () => {
    it('should take a slide down and stop interval', () => {
      const component = shallow(<MainPage />);
      const instance = component.instance() as MainPage;
      const spy = jest.spyOn(instance, 'takeASlide');
      instance.onClickJumpingButtonDown();
      jest.runOnlyPendingTimers();
      expect(spy).toHaveBeenCalled();
      expect(instance.state.timer).toBeNull();
    });
  });

  describe('onClickJumpingButtonUp', () => {
    it('should should take a slide up and start interval', () => {
      const component = shallow(<MainPage />);
      const instance = component.instance() as MainPage;
      const spy = jest.spyOn(instance, 'initiateSlider');
      instance.onClickJumpingButtonUp();
      jest.runOnlyPendingTimers();
      expect(spy).toHaveBeenCalled();
    });
  });
});
