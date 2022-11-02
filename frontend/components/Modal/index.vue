<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const { apiURL } = useRuntimeConfig()
const user = useUser()
const { data: categories } = await useFetch(`${apiURL}/categories`)

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

const form = ref({
  description: null,
  amount: null,
  type: null,
  categoriesId: null,
  accountCpf: user.document,
})

const createTransaction = async () => {
  const body = {
    ...form.value,
    amount: parseFloat(form.value.amount),
  }
  const { error } = await useFetch(`${apiURL}/transactions`, {
    method: 'POST',
    body,
    initialCache: false,
  })

  if (error.value) {
    console.log(error)
  } else {
    emit('close')
  }
}
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

                <Icon
                  name="ph:x"
                  class="cursor-pointer"
                  size="24"
                  color="white"
                  @click="emit('close')"
                />
              </div>

              <div class="mt-2 flex flex-col gap-3">
                <input
                  v-model="form.description"
                  class="text-small w-full flex-1 rounded-lg bg-zinc-800 py-3 px-4 text-white placeholder:text-zinc-500"
                  type="text"
                  placeholder="Descrição"
                />
                <input
                  v-model="form.amount"
                  class="text-small w-full flex-1 rounded-lg bg-zinc-800 py-3 px-4 text-white placeholder:text-zinc-500"
                  type="text"
                  placeholder="Valor"
                />

                <ListBox
                  :items="categories"
                  @change="form.categoriesId = $event"
                />

                <div class="flex gap-4">
                  <button
                    @click="form.type = 'deposit'"
                    :class="[
                      'flex w-full justify-center gap-3 rounded-md py-4 text-white',
                      form.type === 'deposit' ? 'bg-green-700' : 'bg-zinc-800',
                    ]"
                  >
                    Entrada
                    <Icon
                      name="ph:arrow-circle-up"
                      size="24"
                      :class="
                        form.type === 'deposit' ? 'white' : 'text-green-700'
                      "
                    />
                  </button>
                  <button
                    @click="form.type = 'expense'"
                    :class="[
                      'flex w-full justify-center gap-3 rounded-md py-4 text-white',
                      form.type === 'expense' ? 'bg-red-700' : 'bg-zinc-800',
                    ]"
                  >
                    Saída
                    <Icon
                      name="ph:arrow-circle-down"
                      size="24"
                      :class="
                        form.type === 'expense' ? 'white' : 'text-red-700'
                      "
                    />
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <button
                  @click="createTransaction"
                  class="w-full rounded-lg bg-green-700 px-4 py-3 font-medium text-white transition-colors hover:bg-green-800"
                >
                  Cadastrar transação
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
