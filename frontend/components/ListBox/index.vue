<script setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const selectedItem = ref({ name: 'Selecione a categoria' })
const emit = defineEmits(['change'])
</script>

<template>
  <div class="relative w-full">
    <Listbox v-model="selectedItem">
      <div class="relative mt-1">
        <ListboxButton
          class="text-small w-full flex-1 rounded-lg bg-zinc-800 py-3 px-4 text-left text-white"
        >
          <span class="block truncate">{{ selectedItem.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <icon
              name="ph:arrow-down"
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 mb-4 max-h-[200px] w-full overflow-scroll rounded-md bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              @click="emit('change', selectedItem.id)"
              v-slot="{ active, selected }"
              v-for="item in items"
              :key="item.id"
              :value="item"
              as="template"
              class="last:pb-8"
            >
              <li
                :class="[
                  'relative cursor-pointer select-none py-2 pl-10 pr-4 text-white',
                  active && 'bg-zinc-900',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ item.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600"
                >
                  <icon name="ph:check" class="h-5 w-5" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
