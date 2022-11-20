export default () => {
  const user = useUser()
  const { apiUrl } = useRuntimeConfig()

  return {
    get: async () => {
      const { data } = await useFetch(`${apiUrl}/account/${user.document}`, {
        initialCache: false,
      })
      return data.value
    },
  }
}
