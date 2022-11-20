export default () => {
  return {
    get: async () => {
      const { data } = await useFetch(`api/categories`)
      return data.value
    },
  }
}
