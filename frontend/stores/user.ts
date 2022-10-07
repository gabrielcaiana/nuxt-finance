import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => {
    return {
      user: {
        name: 'Gabriel',
        document: '45075141854',
      },
    }
  },
})
