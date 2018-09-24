import React from 'react';
import { shallow } from 'enzyme';
import ShareCount, { shareCount } from '.';

describe('<ShareCount />', () => {
  it('Contains the right number of share buttons', () => {
    const wrapper = shallow(<ShareCount />);
    expect(wrapper.find('.shareButton').getElements().length).toEqual(5);
  });
});

describe('shareCount inline component', () => {
  describe('with no share counts', () => {
    it('Returns an empty paragraph', () => {
      const wrapper = shallow(shareCount(0));
      expect(wrapper.text()).toEqual('');
    });
  });
  describe('with some share count', () => {
    it('Returns the number', () => {
      const wrapper = shallow(shareCount(1));
      expect(wrapper.text()).toEqual('1');
    });
  });
});
