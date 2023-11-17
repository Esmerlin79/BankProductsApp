import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomButton } from '../CustomButton'; 

describe('CustomButton', () => {
  it('should render correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText, getByTestId } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} backgroundColor="blue" color="white" />
    );

    const buttonText = getByText('Test Button');
    expect(buttonText).toBeTruthy();

    const buttonContainer = getByTestId('custom-button-container');
    const { backgroundColor } = buttonContainer.props.style;

    expect(backgroundColor).toBe('blue');
    fireEvent.press(buttonContainer);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
