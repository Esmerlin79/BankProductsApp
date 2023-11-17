import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CustomDatePicker } from '../CustomDatePicker';

describe('CustomDatePicker', () => {
  it('renders correctly with a default value', () => {
    const { getByText } = render(
      <CustomDatePicker
        value="2023-12-31T00:00:00.000Z" 
        onChange={() => {}}
      />
    );

    const formattedDate = getByText('30/12/2023'); 
    expect(formattedDate).toBeDefined();
  });

  it('calls onChange when date is changed', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <CustomDatePicker
        value="2023-12-31T00:00:00.000Z" 
        onChange={mockOnChange}
      />
    );

    fireEvent.press(getByTestId('datePicker'));
    await waitFor(() => {
      fireEvent(getByTestId('datePicker'), 'change', { nativeEvent: { timestamp: Date.now() } });
    });
  });

  it('displays an error message when there is an error', () => {
    const { getByText } = render(
      <CustomDatePicker
        value=""
        errorInput
        messageError="Fecha inválida"
        onChange={() => {}}
      />
    );

    const errorMessage = getByText('Fecha inválida');
    expect(errorMessage).toBeDefined();
  });
});
