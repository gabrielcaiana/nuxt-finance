<script setup>
import {
  PhArrowCircleUp,
  PhArrowCircleDown,
  PhCurrencyDollar,
} from 'phosphor-vue'

const {
  data: transactions,
  peding: transactionsPending,
  error: transactionsError,
} = await useFetch('http://localhost:3333/transactions')

const {
  data: account,
  pending: accountPending,
  error: accountError,
} = await useFetch('http://localhost:3333/account/45075141854')
</script>

<template>
  <div>
    <section>
      <span
        class="block py-6 text-center text-xl text-white"
        v-if="accountPending"
        >Carregando ...</span
      >
      <span
        class="block py-6 text-center text-xl text-red-500"
        v-else-if="accountError"
        >{{ accountError }}</span
      >
      <div v-else class="flex flex-col justify-between gap-4 md:flex-row">
        <CardMoney title="Entradas" :value="account.deposit">
          <template v-slot:icon>
            <PhArrowCircleUp :size="32" color="rgb(21 128 61)" />
          </template>
        </CardMoney>

        <CardMoney title="Saídas" :value="account.expense">
          <template v-slot:icon>
            <PhArrowCircleDown :size="32" color="rgb(239 68 68)" />
          </template>
        </CardMoney>

        <CardMoney title="Total" :value="account.balance" cardBalance>
          <template v-slot:icon>
            <PhCurrencyDollar :size="32" color="white" />
          </template>
        </CardMoney>
      </div>
    </section>

    <section>
      <Search />

      <main class="mt-4 w-full">
        <span
          class="block py-6 text-center text-xl text-white"
          v-if="transactionsPending"
          >Carregando ...</span
        >
        <span
          class="block py-6 text-center text-xl text-red-500"
          v-else-if="transactionsError"
          >{{ transactionsError }}</span
        >
        <Table v-else :transactions="transactions" />
      </main>
    </section>
  </div>
</template>
