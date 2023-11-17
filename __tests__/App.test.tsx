import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

beforeAll(() => {
  jest.useFakeTimers();
});

// Después de tus pruebas, asegúrate de restaurar el temporizador real
afterAll(() => {
  jest.useRealTimers();
});


describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
  });
});