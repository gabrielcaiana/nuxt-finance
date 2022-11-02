export default () => {
  const user = useUser()
  const { apiURL } = useRuntimeConfig()

  return {
    get: async () => {
      const { data } = await useFetch(`${apiURL}/account/${user.document}`, {
        initialCache: false,
      })
      return data.value
    },
  }
}
