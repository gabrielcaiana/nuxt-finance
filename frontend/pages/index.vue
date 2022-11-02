<script setup>
useHead({
  title: 'Início',
})

const account = ref(null)

const refreshAccount = async () => {
  account.value = await useTransactions().get()
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
