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

export default class Square extends React.Component<Props> {
  render() {
    return (
      <CSSTransition
        in={this.props.toggle}
        timeout={10}
        classNames={'drop' + this.props.drop}
      >
        <button
          className={classnames('square', this.props.style)}
          onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      </CSSTransition>
    );
  }
}
