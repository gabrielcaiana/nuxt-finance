<template>
  <div class="min-h-screen w-screen bg-zinc-800 pb-6">
    <Header />

    <main class="mx-auto max-w-[1100px] px-6 md:px-0">
      <slot />
    </main>

    <Footer />
  </div>
</template>
