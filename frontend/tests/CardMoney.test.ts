import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CardMoney from '../components/CardMoney.vue'

describe('CardMoney.vue', () => {
  it('should render the correct component', () => {
    const wrapper = mount(CardMoney, {
      props: {
        title: 'Entrada',
        value: 1000,
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
})
