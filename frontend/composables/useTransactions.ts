export default () => {
  const user = useUser()
  const { apiURL } = useRuntimeConfig()

  const configs = {
    initialCache: false,
  }

  return {
    get: async () => {
      const { data } = await useFetch(`${apiURL}/account/${user.document}`, {
        ...configs,
      })
      return data.value
    },
  }
}
