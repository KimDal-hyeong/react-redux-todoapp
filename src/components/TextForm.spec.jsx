import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import TextForm from './TextForm';

describe('<TextForm />', () => {
  const mockClassName = 'mock-class-name';
  const mockPlaceholder = 'mock-title';
  const mockValue = 'mock-value';
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<TextForm
      className={mockClassName}
      placeholder={mockPlaceholder}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClose when press Enter', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<TextForm
      placeholder={mockPlaceholder}
      onSubmit={onSubmit}
    />);
    const input = wrapper.find('input').at(0);

    input.simulate('keypress', {
      key: 'Enter',
      target: {
        value: mockValue
      }
    });

    expect(onSubmit.mock.calls.length).toBe(1);
  });
});