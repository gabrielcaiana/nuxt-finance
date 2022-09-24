<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>

<template>
  <div class="min-h-screen w-screen bg-zinc-800 pb-6">
    <header class="mb-16 bg-zinc-900 py-5 px-6 md:px-0">
      <div
        class="container m-auto flex max-w-[1100px] items-center justify-between"
      >
        <h1 class="text-xl font-bold text-white md:text-2xl">Caiana Finance</h1>
        <button
          @click="openModal"
          class="rounded-lg bg-green-700 px-4 py-3 font-medium text-white transition-colors hover:bg-green-800"
        >
          Nova transação
        </button>
      </div>
    </header>

    <main class="mx-auto max-w-[1100px] px-6 md:px-0">
      <slot />
    </main>

    <Modal :isOpen="isOpen" @close="closeModal" />
  </div>
</template>
