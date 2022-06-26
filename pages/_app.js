import '../styles/globals.css'
import { createContext, useReducer } from 'react';
import StoreProvider from '../store/store-context';
import Header from "../components/header/header.js"

function MyApp({ Component, pageProps }) {
  return ( 
    <StoreProvider>
      {/* <Header /> */}
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
