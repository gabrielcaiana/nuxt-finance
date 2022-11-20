export default () => {
  const { apiUrl } = useRuntimeConfig()

  return {
    create: async (body) => {
      const { error } = await useFetch(`${apiUrl}/transactions`, {
        method: 'POST',
        body,
        initialCache: false,
        server: false,
      })
      return error.value
    },

    delete: async (id) => {
      const { error } = await useFetch(`${apiUrl}/transactions/${id}`, {
        method: 'DELETE',
        initialCache: false,
        server: false,
      })

      return error.value
    },
  }
}
