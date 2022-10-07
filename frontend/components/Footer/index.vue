<script setup>
import { computed } from 'vue'
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <span class="block pt-8 text-center text-gray-300"
    >© {{ year }} Desenvolvido por Gabriel Caiana</span
  >
</template>
