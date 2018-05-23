// @flow

import React from 'react';

import config from '../../config.js';

import './versionnumber.css';

type Props = {};

export default class VersionNumber extends React.Component<Props> {
  render() {
    return (
      <div>
        <div className="bar" />
        <p className="version">v{config.version}</p>
      </div>
    );
  }
}
