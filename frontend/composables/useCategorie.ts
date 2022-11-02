export default () => {
  const { apiURL } = useRuntimeConfig()

  return {
    get: async () => {
      const { data } = await useFetch(`${apiURL}/categories`)
      return data.value
    },
  }
}
