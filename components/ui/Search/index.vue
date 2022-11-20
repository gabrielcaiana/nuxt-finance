<script setup></script>

<template>
  <div class="mt-12 flex flex-col gap-4 md:flex-row">
    <input
      class="text-small flex-1 rounded-lg bg-zinc-900 py-3 px-4 text-white placeholder:text-zinc-500"
      type="search"
      placeholder="Busque uma transação"
    />
    <button
      class="flex flex-row-reverse items-center justify-center gap-3 rounded-lg border border-white px-4 py-3 font-medium text-white transition-colors"
    >
      Buscar
      <Icon name="ph:magnifying-glass" size="24" color="white" />
    </button>
  </div>
</template>
