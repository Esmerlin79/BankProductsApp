import React from 'react';
import { render, fireEvent, } from '@testing-library/react-native';
import { CustomTextInput } from '../CustomTextInput';
import theme from '../../themes/theme';


describe('CustomTextInput', () => {
  it('CustomTextInput renders correctly', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput
        placeholder="Enter text"
        value=""
        onChange={(value) => {}}
        errorInput={false}
        disabled={false}
      />
    );
  
    const input = getByPlaceholderText('Enter text');
    expect(input).toBeDefined();
  });
  
  it('CustomTextInput handles onChange correctly', () => {
    const handleChange = jest.fn();
  
    const { getByPlaceholderText } = render(
      <CustomTextInput
        placeholder="Enter text"
        value=""
        onChange={handleChange}
        errorInput={false}
        disabled={false}
      />
    );
  
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New value');
    expect(handleChange).toHaveBeenCalledWith('New value');
  });
  
  it('CustomTextInput renders error message when errorInput is true', () => {
    const { getByText } = render(
      <CustomTextInput
        placeholder="Enter text"
        value=""
        onChange={(value) => {}}
        errorInput={true}
        messageError="Invalid input"
        disabled={false}
      />
    );
  
    const errorMessage = getByText('Invalid input');
    expect(errorMessage).toBeDefined();
  });
  
  it('CustomTextInput applies correct styles for disabled state', () => {
    const { getByTestId } = render(
      <CustomTextInput
        placeholder="Enter text"
        value=""
        onChange={(value) => {}}
        errorInput={false}
        disabled={true}
      />
    );
  
    const input = getByTestId('input');
    expect(input.props.style[2].backgroundColor).toBe(theme.darkGrey);
  });
})
