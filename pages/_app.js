import PropTypes from 'prop-types'
import CookieBanner from '../components/CookieBanner/CookieBanner'

import Navbar from '../components/Navbar'
import '../styles/globals.css'

// Required by next.js, function is the root of the web app
function RevisionApp ({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className='h-12'/>
      <Component {...pageProps} />
      <CookieBanner />
    </>
  )
}

export default RevisionApp

RevisionApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
