import useSWR from 'swr'
import axios from '../lib/axiosConfig'
import Cookies from 'js-cookie'

export default function useFolders () {
  const { data: folders, mutate: mutateFolders } = useSWR(
    '/folder/retrieve',
    !!Cookies.get('jwt') && axios, { fallback: [] }
  )

  return { folders, mutateFolders }
}
