export default () => {
  const user = useUser()
  return {
    get: async () => {
      const { data } = await useFetch(`api/account/${user.document}`, {
        initialCache: false,
      })
      return data.value
    },
  }
}
