<script setup>
import {
  PhArrowCircleUp,
  PhArrowCircleDown,
  PhCurrencyDollar,
} from 'phosphor-vue'

const { data: transactions } = await useFetch(
  'http://localhost:3333/transactions'
)
</script>

<template>
  <div>
    <section>
      <div class="flex flex-col justify-between gap-4 md:flex-row">
        <CardMoney title="Entredas" value="2.000,00">
          <template v-slot:icon>
            <PhArrowCircleUp :size="32" color="rgb(21 128 61)" />
          </template>
        </CardMoney>

        <CardMoney title="Saídas" value="400,00">
          <template v-slot:icon>
            <PhArrowCircleDown :size="32" color="rgb(239 68 68)" />
          </template>
        </CardMoney>

        <CardMoney title="Total" value="1.600,00" negative>
          <template v-slot:icon>
            <PhCurrencyDollar :size="32" color="white" />
          </template>
        </CardMoney>
      </div>
    </section>

    <section>
      <Search />

      <main class="mt-4 w-full">
        <Table :transactions="transactions" />
      </main>
    </section>
  </div>
</template>
