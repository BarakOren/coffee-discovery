import '../styles/globals.css'
import { createContext, useReducer } from 'react';
import StoreProvider from '../store/store-context';
import Logo from '../components/logo/logo';

function MyApp({ Component, pageProps }) {
  return ( 
    <StoreProvider>
      <Logo /> 
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
