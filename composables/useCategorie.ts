export default () => {
  const { apiUrl } = useRuntimeConfig()

  return {
    get: async () => {
      const { data } = await useFetch(`${apiUrl}/categories`)
      return data.value
    },
  }
}
