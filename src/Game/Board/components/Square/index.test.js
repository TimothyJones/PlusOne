import React from 'react';
import { shallow } from 'enzyme';
import { CSSTransition } from 'react-transition-group';
import sinon from 'sinon';
import Square from '.';

describe('<Square/>', () => {
  const click = sinon.fake();

  const wrapper = shallow(
    <Square
      toggle
      drop={1}
      style={{ style: true }}
      value={10}
      onClick={click}
    />
  );

  it('Has the provided style', () => {
    expect(wrapper.find('.square.style').exists()).toEqual(true);
  });

  it('gives the right drop to the transition', () => {
    expect(wrapper.find(CSSTransition).prop('classNames')).toEqual('drop1');
  });

  it('Allows the button to be clicked', () => {
    wrapper.find('button').simulate('click');
    expect(click.calledOnce).toEqual(true);
  });

  it('Has the correct label on the button', () => {
    expect(wrapper.find('button').text()).toEqual('10');
  });
});
