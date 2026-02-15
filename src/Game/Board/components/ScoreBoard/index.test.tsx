import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ScoreBoard from '.';

describe('<ScoreBoard />', () => {
  describe('with an initial current score', () => {
    const reset = sinon.fake();

    const wrapper = shallow(
      <ScoreBoard
        highScore={10}
        currentScore={6}
        currentScoreReachedBy={100}
        globalHighScore={12}
        canMove
        onReset={reset}
      />
    );

    it('claims the current score is reached by everyone', () => {
      expect(wrapper.find('.reachedBy').text()).toEqual('reached by everyone');
    });

    it('Allows the reset button to be clicked', () => {
      wrapper.find('button').simulate('click');
      expect(reset.calledOnce).toEqual(true);
    });
  });
  describe('with a higher current score', () => {
    const reset = sinon.fake();

    const wrapper = shallow(
      <ScoreBoard
        highScore={10}
        currentScore={7}
        currentScoreReachedBy={100}
        globalHighScore={12}
        canMove
        onReset={reset}
      />
    );
    it('claims the current score is reached the correct number of times', () => {
      expect(wrapper.find('.reachedBy').text()).toEqual('reached 100 times');
    });
  });
});
