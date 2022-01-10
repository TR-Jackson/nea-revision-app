import PropTypes from 'prop-types'
import CookieBanner from '../components/CookieBanner/CookieBanner'

import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className='h-12'/>
      <Component {...pageProps} />
      <CookieBanner />
    </>
  )
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
