import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ProductRegisterScreen } from '../ProductRegisterScreen';
import useProductRegister from '../../hooks/useProductRegister'; 

jest.mock('../../hooks/useProductRegister');

describe('ProductRegisterScreen', () => {
  let mockUseProductRegister: jest.Mock;

  const handleCreateOrUpdateProduct = jest.fn();
  const clearForm = jest.fn();

  beforeEach(() => {
    mockUseProductRegister = useProductRegister as jest.Mock;
    mockUseProductRegister.mockReturnValue({
      form: { id: 'mockId', name: '', description: '', logo: '', releaseDate: '', reviewDate: '' },
      isLoading: false,
      onChange: jest.fn(),
      isProductIdValid: false,
      isReleaseDateValid: false,
      handleReleaseChange: jest.fn(),
      clearForm: clearForm,
      handleCreateOrUpdateProduct: handleCreateOrUpdateProduct,
    });
  });

  const mockRoute = {
    params: {
      product: null, 
    },
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <ProductRegisterScreen navigation={{ pop: jest.fn() } as any} route={mockRoute as any} />
    );

    expect(getByText('BANCO PICHINCHA')).toBeTruthy();
    expect(getByText('Formulario de Registro')).toBeTruthy();
    expect(getByText('ID')).toBeTruthy();
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('Descripcion')).toBeTruthy();
    expect(getByText('Logo')).toBeTruthy();
    expect(getByText('Fecha Liberación')).toBeTruthy();
    expect(getByText('Fecha Revisión')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
    expect(getByText('Reiniciar')).toBeTruthy();
  });

  it('calls handleCreateOrUpdateProduct on "Enviar" button press', async () => {
    const { getByText } = render(
      <ProductRegisterScreen navigation={{ pop: jest.fn() } as any} route={mockRoute as any} />
    );

    const sendButton = getByText('Enviar');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(mockUseProductRegister.mock.results[0].value.handleCreateOrUpdateProduct).toHaveBeenCalled();
    });
  });

  it('calls clearForm on "Reiniciar" button press', () => {
    const { getByText } = render(
      <ProductRegisterScreen navigation={{ pop: jest.fn() } as any} route={mockRoute as any} />
    );
  
    const resetButton = getByText('Reiniciar');
    fireEvent.press(resetButton);
  
    expect(mockUseProductRegister.mock.results[0].value.clearForm).toHaveBeenCalled();
  });

});