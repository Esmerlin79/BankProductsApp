import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductDetailsScreen } from '../ProductDetailsScreen';
import { ProductsContext } from '../../context/ProductContext';

describe('ProductDetailsScreen', () => {
  jest.useFakeTimers()

  const mockProduct = {
    id: '1',
    name: 'Product 1',
    description: 'Description of Product 1',
    logo: 'https://example.com/product1.jpg',
    date_release: '2023-10-27T10:00:00Z',
    date_revision: '2023-10-28T14:30:00Z',
  };

  const mockRoute = {
    params: {
      product: mockProduct,
    },
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <ProductDetailsScreen navigation={{ goBack: jest.fn() } as any} route={mockRoute as any} />
    );

    expect(getByText(`ID: ${mockProduct.id}`)).toBeTruthy();
    expect(getByText(`${mockProduct.name}`)).toBeTruthy();
    expect(getByText(`${mockProduct.description}`)).toBeTruthy();
    expect(getByText('Fecha liberacion')).toBeTruthy();
    expect(getByText('Fecha revision')).toBeTruthy();
  });

  it('shows modal on Delete button press', async () => {
    const { getByTestId, getByText } = render(
      //@ts-ignore
      <ProductsContext.Provider value={{ deleteProduct: jest.fn() }}>
        <ProductDetailsScreen navigation={{ goBack: jest.fn(), navigate: jest.fn() } as any} route={mockRoute as any} />
      </ProductsContext.Provider>
    );

    fireEvent.press(getByText('Eliminar'));
    expect(getByText(`¿Estas seguro de eliminar el producto ${mockProduct.name}?`)).toBeTruthy();
  });

  it('show button Eliminar correctly', async () => {
    const deleteProduct = jest.fn();
    const { getByText } = render(
      <ProductDetailsScreen navigation={{ goBack: jest.fn(), navigate: jest.fn() } as any} route={mockRoute as any} />
    );

    expect(getByText('Eliminar')).toBeTruthy();
  });
});
