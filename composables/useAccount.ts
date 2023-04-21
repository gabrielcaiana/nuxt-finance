export default () => {
  const user = useUser()
  const { apiUrl } = useRuntimeConfig().public

  return {
    get: async () => {
      const { data } = await useFetch(`${apiUrl}/account/${user.document}`)
      return data.value
    },
  }
}
