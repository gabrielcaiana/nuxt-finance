import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CardMoney from './index.vue'

describe('CardMoney.vue', () => {
  it('should render the correct component', () => {
    const wrapper = mount(CardMoney, {
      props: {
        title: 'Entrada',
        value: 1000,
      },
    })
    console.log(wrapper.html())

    expect(wrapper.find('#card-money').classes()).toContain('bg-zinc-900')
    expect(wrapper.find('strong').text()).toBe('Entrada')
    expect(wrapper.find('span').text()).toBe('R$ 1000,00')
  })
})
