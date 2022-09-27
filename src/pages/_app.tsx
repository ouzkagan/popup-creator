import '@/styles/globals.scss';
import 'prismjs/themes/prism-dark.css';
import { wrapper } from '../store/';

import { AppProps } from 'next/app';
function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

// export default App;
export default wrapper.withRedux(App);
