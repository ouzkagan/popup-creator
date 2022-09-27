import { wrapper } from '@/store';
import '@/styles/globals.scss';
import { AppProps } from 'next/app';
import 'prismjs/themes/prism-dark.css';
import { Provider } from 'react-redux';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { store, props } = wrapper.useWrappedStore({ ...pageProps });

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

// export default App;
export default App;
