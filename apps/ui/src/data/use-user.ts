import useSWR from 'swr'
// import userFetcher from '../libs/api-user'

/*
export default function useUser() {
  const { data, mutate, error } = useSWR('/auth/sign-in', userFetcher)

  const loading = !data && !error
  const loggedOut = error && error.status === 403

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  }
}
*/
