import React from 'react';
import ReactDOM from 'react-dom';
import Game from './index';

/* global document */

describe('The PlusOne game app', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
