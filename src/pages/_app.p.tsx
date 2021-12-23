import type { AppProps } from 'next/app'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'

import '/styles/globals.scss'
import '/styles/variables.scss'
import '/styles/modal-global.css'

function getLibrary(provider: any) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
