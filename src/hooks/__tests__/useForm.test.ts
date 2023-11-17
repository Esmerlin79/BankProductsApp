/**
 * @jest-environment jsdom
*/ 
import { renderHook, act, waitFor } from '@testing-library/react';
import { useForm } from '../useForm';

describe('useForm', () => {
  it('should update state with setFormValue', () => {
    const initialState = {
      id: '',
      name: '',
      description: '',
      logo: '',
      releaseDate: '',
      reviewDate: '',
    };

    const { result } = renderHook(() => useForm(initialState));

    const newFormState = {
      id: 'newId',
      name: 'newName',
      description: 'newDescription',
      logo: 'newLogo',
      releaseDate: '2023-11-01',
      reviewDate: '2024-11-01',
    };

    act(() => {
      result.current.setFormValue(newFormState);
    });

    expect(result.current.id).toBe('newId');
    expect(result.current.name).toBe('newName');
  });
});
