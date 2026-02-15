import React from 'react';
import { shallow } from 'enzyme';
import VersionNumber from '.';
import config from '../../config';

describe('<VersionNumber />', () => {
  it('Renders the version number', () => {
    const wrapper = shallow(<VersionNumber />);
    expect(wrapper.find('.version').text()).toEqual(`${config.version}`);
  });
});
