export default () => {
  const { apiURL } = useRuntimeConfig()

  return {
    create: async (body) => {
      const { error } = await useFetch(`${apiURL}/transactions`, {
        method: 'POST',
        body,
        initialCache: false,
      })
      return error.value
    },

    delete: async (id) => {
      const { error } = await useFetch(`${apiURL}/transactions/${id}`, {
        method: 'DELETE',
        initialCache: false,
      })

      return error.value
    },
  }
}
