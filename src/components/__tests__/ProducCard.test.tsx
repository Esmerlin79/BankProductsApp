import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../ProductCard';

describe('ModalComponent', () => {
  it('ProductCard renders correctly with name and ID', () => {
    const { getByText } = render(<ProductCard name="Test Product" id="123" goToDetails={() => {}} />);
    const productName = getByText('Test Product');
    const productId = getByText('ID: 123');
  
    expect(productName).toBeDefined();
    expect(productId).toBeDefined();
  });
  
  it('ProductCard calls goToDetails on press', () => {
    const mockGoToDetails = jest.fn();
    const { getByTestId } = render(<ProductCard name="Test Product" id="123" goToDetails={mockGoToDetails} />);
    const productCard = getByTestId('product-card');
  
    fireEvent.press(productCard);
    expect(mockGoToDetails).toHaveBeenCalled();
  });
})
