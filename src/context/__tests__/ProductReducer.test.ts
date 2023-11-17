/**
 * @jest-environment jsdom
*/ 
import { renderHook, act } from '@testing-library/react';
import { productReducer } from '../ProductReducer';
import { ProductState } from '../ProductProvider';
import { useReducer } from 'react';

describe('productReducer', () => {
  it('handles LOADING PRODUCT action correctly', () => {
    const initialState: ProductState = {
      products: [],
      loading: false,
    };

    const { result } = renderHook(() => useReducer(productReducer, initialState));

    act(() => {
      result.current[1]({ type: 'LOADING PRODUCT', payload: true });
    });

    expect(result.current[0].loading).toEqual(true);
  });

  it('handles LOAD PRODUCTS action correctly', () => {
    const initialState: ProductState = {
      products: [],
      loading: false,
    };

    const sampleProducts = [{ id: '1', name: 'Product 1' }];

    const { result } = renderHook(() => useReducer(productReducer, initialState));

    act(() => {
        //@ts-ignore
      result.current[1]({ type: 'LOAD PRODUCTS', payload: sampleProducts });
    });

    expect(result.current[0].products).toEqual(sampleProducts);
  });

  it('handles CREATE PRODUCT action correctly', () => {
    const initialState: ProductState = {
      products: [],
      loading: false,
    };

    const newProduct = { id: '2', name: 'Product 2' };

    const { result } = renderHook(() => useReducer(productReducer, initialState));

    act(() => {
        //@ts-ignore
      result.current[1]({ type: 'CREATE PRODUCT', payload: newProduct });
    });

    expect(result.current[0].products).toEqual([newProduct]);
  });

  it('handles UPDATE PRODUCT action correctly', () => {
    const initialState: ProductState = {
      //@ts-ignore
      products: [{ id: '1', name: 'Product 1' }], 
      loading: false,
    };

    const updatedProduct = { id: '1', name: 'Updated Product 1' };

    const { result } = renderHook(() => useReducer(productReducer, initialState));

    act(() => {
      //@ts-ignore
      result.current[1]({ type: 'UPDATE PRODUCT', payload: updatedProduct });
    });

    expect(result.current[0].products).toEqual([updatedProduct]);
  });

  it('handles DELETE PRODUCT action correctly', () => {
    const initialState: ProductState = {
      //@ts-ignore
      products: [{ id: '1', name: 'Product 1' }],
      loading: false,
    };

    const productIdToDelete = '1';

    const { result } = renderHook(() => useReducer(productReducer, initialState));

    act(() => {
      result.current[1]({ type: 'DELETE PRODUCT', payload: productIdToDelete });
    });

    expect(result.current[0].products).toEqual([]);
  });

});
