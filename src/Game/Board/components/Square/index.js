// @flow

import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import './square.css';

type Props = {
  toggle: boolean,
  drop: number,
  style: {},
  value: number | string,
  onClick: () => void
};

export default (props: Props) => (
  <CSSTransition
    in={props.toggle}
    timeout={10}
    classNames={`drop${props.drop}`}
  >
    <button
      className={classnames('square', props.style)}
      onClick={() => props.onClick()}
      type="button"
    >
      {props.value}
    </button>
  </CSSTransition>
);
