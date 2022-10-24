<script setup>
import {
  PhArrowCircleUp,
  PhArrowCircleDown,
  PhCurrencyDollar,
} from 'phosphor-vue'
import { useUser } from '~/stores/user'

useHead({
  title: 'Início',
})

const { apiURL } = useRuntimeConfig()
const { user } = useUser()

const {
  data: account,
  pending: accountPending,
  error: accountError,
} = await useFetch(`${apiURL}/account/${user.document}`)
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
          <template #icon>
            <PhArrowCircleUp :size="32" class="text-green-700" />
          </template>
        </CardMoney>

        <CardMoney title="Saídas" :value="account.expense">
          <template #icon>
            <PhArrowCircleDown :size="32" class="text-red-700" />
          </template>
        </CardMoney>

        <CardMoney title="Total" :value="account.balance" cardBalance>
          <template #icon>
            <PhCurrencyDollar :size="32" color="white" />
          </template>
        </CardMoney>
      </div>
    </section>

    <section>
      <Search />

      <main v-if="account" class="mt-4 w-full">
        <Table :transactions="account.transactions" />
      </main>
    </section>
  </div>
</template>
