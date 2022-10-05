import '@testing-library/jest-dom';
// ignore
import { mainStore } from '@/store';
import Settings from '@/templates/Settings';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { popupTemplates } from '../src/mock';

describe('Settings Section Tests', () => {
  // Settings
  it('should select size setting for popup', async () => {
    renderWithContext(<Settings />);
    const smallButton = screen.getAllByText(/Small/i)[0];
    const mediumButton = screen.getAllByText(/Medium/i)[0];
    const largeButton = screen.getAllByText(/Large/i)[0];

    // all buttons are in the document
    expect(smallButton).toBeInTheDocument();
    expect(mediumButton).toBeInTheDocument();
    expect(largeButton).toBeInTheDocument();

    // click
    await act(async () => smallButton.click());
    // is size in from code copy section
    expect(screen.getByText(/"small"/i)).toBeInTheDocument();

    // click
    await act(async () => mediumButton.click());
    // is size in from code copy section
    expect(screen.getByText(/"medium"/i)).toBeInTheDocument();

    // click
    await act(async () => largeButton.click());
    // is size in from code copy section
    expect(screen.getByText(/"large"/i)).toBeInTheDocument();
  });
});

function renderWithContext(element: React.ReactElement) {
  render(
    <Provider store={mainStore({ popupTemplates: { popups: popupTemplates } })}>
      {element}
    </Provider>
  );
  return mainStore({ popupTemplates: { popups: popupTemplates } });
}
