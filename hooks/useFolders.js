import useSWR from 'swr'
import axios from '../lib/axiosConfig'

export default function useFolders () {
  const { data: folders, mutate: mutateFolders } = useSWR(
    '/folder/retrieve',
    axios, { fallback: [] }
  )

  return { folders, mutateFolders }
}
