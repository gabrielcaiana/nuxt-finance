<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  value: {
    type: String,
    required: true,
  },

  positive: {
    type: Boolean,
    default: false,
  },
  negative: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    :class="[
      'flex w-full items-start justify-between rounded-lg bg-zinc-900 px-8 py-6',
      positive && ' bg-green-700',
      negative && 'bg-red-700',
    ]"
  >
    <div>
      <strong class="block text-sm font-normal text-gray-200">{{
        title
      }}</strong>
      <span class="block text-2xl font-medium text-gray-100"
        >R$ {{ value }}</span
      >
    </div>
    <icon :size="32" color="rgb(21 128 61)" />
    <slot name="icon" />
  </div>
</template>
