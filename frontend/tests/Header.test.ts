import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Header from '../components/Header.vue'

describe('Header.vue', () => {
  it('render the correct component', () => {
    const wrapper = mount(Header)
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.find('h1').text()).toBe('Finanças')
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('button').text()).toBe('Nova transação')
  })

  it('render the correct modal', async () => {
    const wrapper = mount(Header)
    expect(wrapper.vm.isOpen).toBeFalsy()
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.isOpen).toBeTruthy()
  })
})
