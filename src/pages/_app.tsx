import '../css/tailwind.css'
import * as React from 'react'
import Head from 'next/head'

interface FunctionComponent {
  Component: React.FunctionComponent
  pageProps: Record<string, unknown>
}

const App: React.FunctionComponent<FunctionComponent> = ({ Component, pageProps }) => {
  return (
    <div className="antialiased bg-gray-900 min-h-screen">
      <Head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#FFE81F" />
        <title>The Shoppies: Movie awards for entrepreneurs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full min-h-screen py-32 flex items-center justify-center">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default App
