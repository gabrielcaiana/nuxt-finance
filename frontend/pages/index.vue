<script setup>
import {
  PhArrowCircleUp,
  PhArrowCircleDown,
  PhCurrencyDollar,
  PhMagnifyingGlass,
} from 'phosphor-vue'

const { data: transactions } = await useFetch(
  'http://localhost:3333/transactions'
)
</script>

<template>
  <div>
    <section>
      <div class="flex flex-col justify-between gap-4 md:flex-row">
        <div
          class="flex w-full items-start justify-between rounded-lg bg-zinc-900 px-8 py-6"
        >
          <div>
            <strong class="block text-sm text-gray-400">Entradas</strong>
            <span class="block text-2xl font-medium text-gray-100"
              >R$ 17.400,00</span
            >
          </div>
          <PhArrowCircleUp :size="32" color="rgb(21 128 61)" />
        </div>

        <div
          class="flex w-full items-start justify-between rounded-lg bg-zinc-900 px-8 py-6"
        >
          <div>
            <strong class="block text-sm text-gray-400">Saídas</strong>
            <span class="block text-2xl font-medium text-gray-100"
              >R$ 17.400,00</span
            >
          </div>
          <PhArrowCircleDown :size="32" color="rgb(239 68 68)" />
        </div>

        <div
          class="flex w-full items-start justify-between rounded-lg bg-green-700 px-8 py-6"
        >
          <div>
            <strong class="block text-sm text-gray-100">Total</strong>
            <span class="block text-2xl font-medium text-gray-100"
              >R$ 17.400,00</span
            >
          </div>
          <PhCurrencyDollar :size="32" color="white" />
        </div>
      </div>
    </section>

    <section>
      <header class="mt-12 flex flex-col gap-4 md:flex-row">
        <input
          class="text-small flex-1 rounded-lg bg-zinc-900 py-3 px-4 text-white placeholder:text-zinc-500"
          type="text"
          placeholder="Busque uma transação"
        />
        <button
          class="flex flex-row-reverse items-center justify-center gap-3 rounded-lg border border-white px-4 py-3 font-medium text-white transition-colors"
        >
          Buscar
          <PhMagnifyingGlass :size="24" color="white" />
        </button>
      </header>

      <main class="mt-4 w-full">
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
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-white"
                      >
                        {{ transaction.description }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-red-500"
                      >
                        - R$ {{ transaction.amount }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-white"
                      >
                        {{ transaction.categories.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-white"
                      >
                        {{ transaction.data }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>
