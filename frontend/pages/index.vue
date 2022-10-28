<script setup>
import { ref } from 'vue'
import { useUser } from '~/stores/user'

useHead({
  title: 'Início',
})

const { apiURL } = useRuntimeConfig()
const { user } = useUser()
const account = ref(null)

async function refreshAccount() {
  const { data } = await useFetch(`${apiURL}/account/${user.document}`)
  account.value = data.value
  console.log(account.value)
}

refreshAccount()
</script>

<template>
  <div v-if="account">
    <section>
      <div class="flex flex-col justify-between gap-4 md:flex-row">
        <CardMoney title="Entradas" :value="account.deposit">
          <template #icon>
            <Icon name="ph:arrow-circle-up" size="32" class="text-green-700" />
          </template>
        </CardMoney>

        <CardMoney title="Saídas" :value="account.expense">
          <template #icon>
            <Icon name="ph:arrow-circle-down" size="32" class="text-red-700" />
          </template>
        </CardMoney>

        <CardMoney title="Total" :value="account.balance" cardBalance>
          <template #icon>
            <Icon name="ph:currency-dollar" size="32" color="white" />
          </template>
        </CardMoney>
      </div>
    </section>

    <section>
      <Table
        :transactions="account.transactions"
        @refresh:account="refreshAccount"
      />
    </section>
  </div>
</template>
