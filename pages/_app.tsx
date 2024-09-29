// pages/_app.tsx
import '../styles/global.css'
import '../styles/customStyles.css'; 

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
