import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import axios from '../lib/axiosConfig'

export default function useUser ({
  redirectTo = false,
  redirectIfFound = false
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR('/user', axios)

  useEffect(() => {
    if (!redirectTo || user === undefined) {
      return
    }
    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}

// https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/useUser.js
