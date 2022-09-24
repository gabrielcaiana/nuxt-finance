<template>
  <div class="min-h-screen w-screen bg-zinc-800">
    <header class="mb-16 bg-zinc-900 py-5">
      <div
        class="container m-auto flex max-w-[1100px] items-center justify-between"
      >
        <h1 class="text-2xl font-bold text-white">Nuxt Finance</h1>
        <button
          class="rounded-lg bg-green-700 px-4 py-3 font-medium text-white transition-colors hover:bg-green-800"
        >
          Nova transação
        </button>
      </div>
    </header>
    <main class="mx-auto max-w-[1100px]">
      <slot />
    </main>
  </div>
</template>
