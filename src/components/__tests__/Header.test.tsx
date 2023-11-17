import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from '../Header';

describe('Header', () => {
  it('Header renders correctly with title', () => {
    const { getByText } = render(<Header title="Test Title" showArrowLeft={false} />);
    const titleText = getByText('Test Title');
    expect(titleText).toBeDefined();
  });
  
  it('Header renders correctly with back arrow', () => {
    const mockOnBack = jest.fn();
    const { getByTestId } = render(
      <Header title="Test Title" showArrowLeft={true} onBack={mockOnBack} />
    );
    const backArrow = getByTestId('back-arrow');
    expect(backArrow).toBeDefined();
  
    fireEvent.press(backArrow);
    expect(mockOnBack).toHaveBeenCalled();
  });
  
  it('Header does not render back arrow when showArrowLeft is false', () => {
    const { queryByTestId } = render(<Header title="Test Title" showArrowLeft={false} />);
    const backArrow = queryByTestId('back-arrow');
    expect(backArrow).toBeNull();
  });
})
