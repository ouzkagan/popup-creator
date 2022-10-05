import '@testing-library/jest-dom';
// ignore
import Home from '@/pages/index';
import { mainStore } from '@/store';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { popupTemplates } from '../src/mock';

describe('Home Page', () => {
  it('renders Home page with store', () => {
    // console.log(Home);
    renderWithContext(<Home />);
    // check if all sections are rendered
    expect(screen.getByText(/choose your template/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit your content/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings and Code/i)).toBeInTheDocument();
  });
  // Template
  it('should select another template', async () => {
    renderWithContext(<Home />);
    const popupSelectButton = screen.getByTestId('select-template-POPUP_001');
    expect(popupSelectButton).toBeInTheDocument();
    // CLICK THE SELECT TEMPLATE BUTTON
    await act(async () => popupSelectButton.click());
    expect(screen.getByText(/"popup_001"/i)).toBeInTheDocument();
    const popupSelectButton2 = screen.getByTestId('select-template-POPUP_002');
    expect(popupSelectButton2).toBeInTheDocument();
    // CLICK THE SELECT TEMPLATE BUTTON
    await act(async () => popupSelectButton2.click());
    expect(screen.getByText(/"popup_002"/i)).toBeInTheDocument();
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
