import { AppProps } from 'next/app'
import Head from 'next/head'
import { NavigationLink } from '../components/layout/site-layout/Header'
import { SiteLayout } from '../components/layout/SiteLayout'

import '../styles/tailwind.css'

// const isSSR = typeof window === "undefined"

const navigationLinks: Array<NavigationLink> = [
  { name: 'Project', href: '#' },
  { name: 'Team', href: '#' },
  { name: 'About', href: '#' },
]

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to ui!</title>
      </Head>
      <SiteLayout navigationLinks={navigationLinks}>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  )
}

export default CustomApp
