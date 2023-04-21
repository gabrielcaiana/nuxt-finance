export default () => {
  const { apiUrl } = useRuntimeConfig().public

  return {
    get: async () => {
      const { data } = await useFetch(`${apiUrl}/categories`)
      return data.value
    },
  }
}
