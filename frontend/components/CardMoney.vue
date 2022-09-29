<script setup>
defineProps({
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
</script>

<template>
  <div
    :class="[
      'flex w-full items-start justify-between rounded-lg px-8 py-6',
      value >= 0 && cardBalance
        ? ' bg-green-700'
        : value < 0 && cardBalance
        ? 'bg-red-700'
        : 'bg-zinc-900',
    ]"
  >
    <div>
      <strong class="block text-sm font-normal text-gray-200">{{
        title
      }}</strong>
      <span class="block text-2xl font-medium text-gray-100"
        >R$ {{ value.toFixed(2).replace('.', ',') }}</span
      >
    </div>
    <icon :size="32" color="rgb(21 128 61)" />
    <slot name="icon" />
  </div>
</template>
