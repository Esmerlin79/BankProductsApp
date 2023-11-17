/**
 * @jest-environment jsdom
*/ 
import { renderHook, act, waitFor } from '@testing-library/react';
import useProductRegister from '../useProductRegister'; 

const mockProductsContext = {
  verifyProductId: jest.fn(),
  createProduct: jest.fn(),
  editProduct: jest.fn(),
};

jest.mock('../useForm', () => ({
  useForm: jest.fn().mockReturnValue({
    form: {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      logo: 'mockLogo',
      releaseDate: '2023-12-31',
      reviewDate: '2024-10-31',
    },
    setFormValue: jest.fn(),
    onChange: jest.fn(),
  }),
}));

describe('useProductRegister', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show the correct data', async () => {
    const { result } = renderHook(() => useProductRegister(null, mockProductsContext as any));

    expect(result.current.form.id).toBe('mockId');
    expect(result.current.form.name).toBe('mockName');
    expect(result.current.form.logo).toBe('mockLogo');
    expect(result.current.form.description).toBe('mockDescription');
    expect(result.current.form.releaseDate).toBe('2023-12-31');
    expect(result.current.form.reviewDate).toBe('2024-10-31');
  });

  it('the function should be called to update logo', () => {
    const { result } = renderHook(() => useProductRegister(null, mockProductsContext as any));
    
     act(() => {
        result.current.onChange('mockLogo2', 'logo');
    });

    expect(result.current.onChange).toHaveBeenCalled();
  });
});
