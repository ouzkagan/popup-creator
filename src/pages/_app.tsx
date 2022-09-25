import '@/styles/globals.scss';
import 'prismjs/themes/prism-dark.css';

import { AppProps } from 'next/app';
function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
