export default () => {
  return {
    create: async (body) => {
      const { error } = await useFetch(`api/transactions`, {
        method: 'POST',
        body,
        initialCache: false,
      })
      return error.value
    },

    delete: async (id) => {
      const { error } = await useFetch(`api/transactions/${id}`, {
        method: 'DELETE',
        initialCache: false,
      })

      return error.value
    },
  }
}
