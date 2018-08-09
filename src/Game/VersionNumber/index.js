// @flow

import React from 'react';

import config from '../../config';

import './versionnumber.css';

export default () => (
  <div>
    <div className="bar" />
    <p className="version">v{config.version}</p>
  </div>
);
