import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export default function CookieBanner () {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(!Cookies.get('acceptedCookiePolicy'))
  }, [])

  const acceptHandler = () => {
    Cookies.set('acceptedCookiePolicy', true)
    setShow(false)
  }

  return (show
    ? (
      <div className="w-full p-5 lg:px-24 fixed bottom-0 bg-gray-700">
        <div className="md:flex items-center -mx-3">
          <div className="md:flex-1 px-3 mb-5 md:mb-0">
            <p className="text-center md:text-left text-white text-s leading-tight md:pr-12">This website uses functional cookies only to enhance the user experience!</p>
          </div>
          <div className="px-3 text-center">
            <button
              id="btn" className="py-2 px-8 bg-green-400 hover:bg-green-500 text-white rounded font-bold text-sm shadow-xl"
              onClick={acceptHandler}>Continue</button>
          </div>
        </div>
      </div>
    )
    : <></>)
}
