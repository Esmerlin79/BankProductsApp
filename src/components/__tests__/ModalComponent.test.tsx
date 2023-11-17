import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ModalComponent } from '../ModalComponent';

describe('ModalComponent', () => {
    jest.useFakeTimers()

    it('ModalComponent renders correctly with title', () => {
        const { getByText } = render(
             <ModalComponent isVisible={true} title="Test Modal" onConfirm={() => {}} onClose={() => {}} />
        );
        
        const modalTitle = getByText('Test Modal');

        expect(modalTitle).toBeDefined();
    });

    it('ModalComponent calls onClose on close button press', () => {
        const mockOnClose = jest.fn();
        const { getByTestId } = render(
        <ModalComponent isVisible={true} title="Test Modal" onConfirm={() => {}} onClose={mockOnClose} />
        );
        const closeButton = getByTestId('close-button');
        fireEvent.press(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });
})

