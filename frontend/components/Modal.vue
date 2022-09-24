<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { PhX } from 'phosphor-vue'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex justify-between">
                <DialogTitle
                  as="h3"
                  class="mb-6 text-xl font-medium leading-6 text-white"
                >
                  Nova transação
                </DialogTitle>

                <PhX
                  class="cursor-pointer"
                  :size="24"
                  color="white"
                  @click="emit('close')"
                />
              </div>
              <div class="mt-2 flex flex-col gap-3">
                <input
                  class="text-small w-full flex-1 rounded-lg bg-zinc-800 py-3 px-4 text-white placeholder:text-zinc-500"
                  type="text"
                  placeholder="Descrição"
                />
                <input
                  class="text-small w-full flex-1 rounded-lg bg-zinc-800 py-3 px-4 text-white placeholder:text-zinc-500"
                  type="text"
                  placeholder="Valor"
                />
                <input
                  class="text-small w-full flex-1 rounded-lg bg-zinc-800 py-3 px-4 text-white placeholder:text-zinc-500"
                  type="text"
                  placeholder="Data"
                />
                <input
                  class="text-small w-full flex-1 rounded-lg bg-zinc-800 py-3 px-4 text-white placeholder:text-zinc-500"
                  type="text"
                  placeholder="Categoria"
                />
              </div>

              <div class="mt-4">
                <button
                  @click="emit('close')"
                  class="w-full rounded-lg bg-green-700 px-4 py-3 font-medium text-white transition-colors hover:bg-green-800"
                >
                  Nova transação
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
