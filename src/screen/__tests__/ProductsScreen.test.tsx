import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductsScreen } from '../ProductsScreen';


describe('ProductsScreen', () => {

  it('renders correctly', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const route = {
        params: {}, 
    };

    const { getByText } = render(
      <ProductsScreen navigation={navigation as any} route={route as any} />
    );
    expect(getByText('BANCO PICHINCHA')).toBeTruthy();
  });


  it('updates search input correctly', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const route = {
        params: {}, 
    };

    const { getByPlaceholderText } = render(
      <ProductsScreen navigation={navigation as any} route={route as any} />
    );

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Texto de búsqueda');

    expect(searchInput.props.value).toBe('Texto de búsqueda');
  });

  it('navigates to ProductRegisterScreen when clicking on the "Agregar" button', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const route = {
        params: {}, 
    };

    const { getByText } = render(
      <ProductsScreen navigation={navigation as any} route={route as any} />
    );
    fireEvent.press(getByText('Agregar'));
    expect(navigation.navigate).toHaveBeenCalledWith('ProductRegisterScreen', {});
  });
});
