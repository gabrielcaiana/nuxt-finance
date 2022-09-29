<script setup>
defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <tbody>
              <tr
                class="cursor-pointer border-2 border-b border-zinc-800 bg-zinc-900"
                v-for="transaction in transactions"
                :key="transaction.id"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {{ transaction.description }}
                </td>
                <td
                  :class="[
                    'whitespace-nowrap px-6 py-4 text-sm',
                    transaction.type === 'deposit'
                      ? 'text-green-500'
                      : 'text-red-500',
                  ]"
                >
                  R$ {{ transaction.amount }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {{ transaction.categories.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {{ new Date(transaction.date).toLocaleDateString('pt-BR') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
