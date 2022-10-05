import '@testing-library/jest-dom';
// ignore
import Home from '@/pages/index';
import { mainStore } from '@/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { popupTemplates } from '../src/mock';
describe('Pages', () => {
  it('renders Home page with store', () => {
    // console.log(Home);
    renderWithContext(<Home />);
    // check if all components are rendered
  });
});

function renderWithContext(element: React.ReactElement) {
  render(
    <Provider store={mainStore({ popupTemplates: { popups: popupTemplates } })}>
      {element}
    </Provider>
  );
}
