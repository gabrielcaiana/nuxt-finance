<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  value: {
    type: Number,
    required: true,
  },

  cardBalance: {
    type: Boolean,
    default: false,
  },
})

const convertToRealCurrency = Intl.NumberFormat('pt-BR')
const handleCardBg =
  props.value >= 0 && props.cardBalance
    ? 'bg-green-700'
    : props.value < 0 && props.cardBalance
    ? 'bg-red-700'
    : 'bg-zinc-900'
</script>

<template>
  <div
    id="card-money"
    :class="[
      'flex w-full items-start justify-between rounded-lg px-8 py-6',
      handleCardBg,
    ]"
  >
    <div>
      <strong class="block text-sm font-normal text-gray-200">{{
        title
      }}</strong>
      <span class="block text-2xl font-medium text-gray-100"
        >R$ {{ convertToRealCurrency.format(value) }}</span
      >
    </div>
    <icon :size="32" color="rgb(21 128 61)" />
    <slot name="icon" />
  </div>
</template>
