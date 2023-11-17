import React from 'react';
import { render } from '@testing-library/react-native';
import { CustomLoading } from '../CustomLoading';

describe('CustomLoading', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<CustomLoading />);
    
    const loadingContainer = getByTestId('loading-container');
    expect(loadingContainer).toBeDefined();

    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeDefined();
  });
});
