import { AppProps } from 'next/app'
import Head from 'next/head'
import { SiteLayout } from '../components/layout/SiteLayout'

import '../styles/tailwind.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to ui!</title>
      </Head>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  )
}

export default CustomApp
