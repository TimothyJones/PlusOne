import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false
    };
  }

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
