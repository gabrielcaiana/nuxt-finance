export default () => {
  const { apiUrl } = useRuntimeConfig().public

  return {
    create: async (body: any) => {
      const { error } = await useFetch(`${apiUrl}/transactions`, {
        method: 'POST',
        body,
        server: false,
      })
      return error.value
    },

    delete: async (id: string) => {
      const { error } = await useFetch(`${apiUrl}/transactions/${id}`, {
        method: 'DELETE',
        server: false,
      })

      return error.value
    },
  }
}
