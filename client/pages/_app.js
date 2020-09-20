import { AuthProvider } from '../contexts/auth'
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp;