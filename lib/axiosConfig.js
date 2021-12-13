import axios from 'axios'
import Router from 'next/router'

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? 'https://nea-revision-app.vercel.app/api'
      : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : 'http://localhost:3000/api'
})

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    switch (error.response.status) {
    case 401:
      Router.push('/auth')
      break
    case 404:
      Router.push('/')
      break
    default:
      return Promise.reject(error)
    }
  }
)

export default axiosInstance
